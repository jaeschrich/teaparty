import { submissionView } from 'frontend/reducers';
import { ExecOptionsWithStringEncoding } from 'node:child_process';
import React, { cloneElement, Dispatch, FormEventHandler, MouseEventHandler, ReactElement, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { hydrate, render } from 'react-dom';
import { SubmissionInput } from './SubmissionInput';
import teaEmoji from './tea-emoji.svg';
import { Submission } from './types';
import { useFakeName } from './placeholder';
import { AppState, emptyState, intoFormData, reducer } from './reducer';


function App() {
    const [ fake, nextFake ] = useFakeName();
    const [ state, dispatch ] = useReducer(reducer, emptyState, (x: AppState) => {
        let s : AppState = JSON.parse(localStorage.getItem('form-state') || 'false') || x;
        s.submissions.forEach(x => x.editing = true);
        s.error = null;
        return s;
    });

    useEffect(() => {
        localStorage.setItem('form-state', JSON.stringify(state));
    }, [ state ]);

    const handleSubmit = (ev : any) => {
        ev.preventDefault();
        ev.stopPropagation();

        if (state.submissions.length === 0) {
            dispatch({
                type: 'set-error',
                payload: "You must upload at least one piece."
            });
            return;
        }

        if (state.submissions.filter(x=>x.editing).length > 0) {
            dispatch({
                type: 'set-error',
                payload: "You must finishing saving everything!"
            });
            return;       
        }
        
        fetch('/submit', {
            method: 'POST',
            body: intoFormData(state)
        }).then(x => (window.location as any) = "/submitted")
    }

    const editing = state.submissions.filter(x=>x.editing).length>0;

    const canSubmit = (state.name) 
                && (state.email) 
                && (state.statement) 
                && (state.submissions.length > 0) 
                && !editing;

    let message = (<>Submit to<img style={{verticalAlign :"bottom"}} alt="TEA" src={teaEmoji} /></>)
        
    let buttonClass = "";
    if (!canSubmit) {
        message = <>Editing...</>;
        buttonClass = "";
    }
    if (editing) {

    }

    const errorMessage = (state.error) ? (
        <span className="error" role="region">
            <span className="error-badge">Error:</span>
            <span className="error-body">{state.error}</span>
        </span>) : undefined;

    return (<>
        <div id="file-input-toolbar">
            <button onClick={handleSubmit} 
                id="submit"
                style={{width: "20ch"}}
                className={buttonClass} 
                disabled={!canSubmit}>
                    <span style={{textAlign: "center"}}>{message}</span></button>

            {/* <h1 role="doc-title" 
                title="Right click me to see more names!"
                onContextMenu={ (ev) => {
                    ev.preventDefault();
                    nextFake();
                }}>Submit to <a href="https://www.tealiteraryandartsmagazine.com/">TEA</a>
            </h1> */}
            {errorMessage}
            <button style={{marginLeft: "auto"}} onClick={(ev) => {
                ev.preventDefault();
                dispatch({
                    type: 'add-submission'
                })
            }}
            onContextMenu={ (ev) => {
                ev.preventDefault();
                nextFake();
            }}
            >Add Item</button>
                </div>
        <div id="form">
            <div id="id-form">
            <form className="form">
                <div role="group">
                    <label htmlFor="name">Name </label>
                    <input required type="text" name="name"
                        value={state.name} onChange={(ev) => dispatch({ 
                            type: 'set-name',
                            payload: ev.target.value
                        })}
                        placeholder={fake.name + " (for example)"} />
                </div>
                <div role="group">
                    <label htmlFor="UFL Email">Email </label>
                    <input required type="email"
                            value={state.email} onChange={(ev) => dispatch({ 
                                type: 'set-email',
                                payload: ev.target.value.trim()
                            })}
                        name="email" placeholder={fake.email} 
                        pattern=".+@ufl.edu" title="Please provide a UFL e-mail address" />
                </div>
                <div role="group">
                    <label htmlFor="UFID">UFID </label>
                    <input required type="text" maxLength={8} minLength={8}
                            value={state.UFID} onChange={(ev) => dispatch({ 
                                type: 'set-ufid',
                                payload: ev.target.value
                            })}
                        name="UFID" placeholder={"00000000"} 
                        pattern="[0-9]{8}"
                        title="Please provide your UFID, no spaces or dashes." />
                </div>
                <div role="group" style={{flexDirection: "column", justifySelf: "flex-end"}}>
                    <label htmlFor="artist-statement">Personal Statement</label>
                    <textarea required 
                        value={state.statement} onChange={(ev) => dispatch({ 
                            type: 'set-statement',
                            payload: ev.target.value
                        })}
                        placeholder={fake.text} name="artist-statement"></textarea>

                </div>
            </form>
            </div>
            <div role="region" id="file-input-area" className="form">

                <SubmissionsView dispatch={dispatch} state={state.submissions} />
            </div>

        </div>
        </>);
}

function SubmissionsView({ state, dispatch } : { state: Submission[], dispatch : Dispatch<Action>}) {
    return (<>
        {state.map((sub, index) => {
            if (sub.editing) {
                return (<SubmissionInput key={sub.key} state={sub} dispatch={dispatch} />);
            } else {
                return (<SubmissionView key={sub.key} state={sub} dispatch={dispatch}  />);
            }
        })}
    </>);
}

function SubmissionView({ state, dispatch } : { state: Submission, dispatch: Dispatch<Action> }) { 
    const comment = (state.comment.length < 50) ? state.comment : state.comment.slice(0,50) + "...";
    return (
        <div role="region" className="submission" key={state.key}>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Comment</th>
                        <th>File</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>&ldquo;{state.title}&rdquo;</td>
                        <td>{state.category}</td>
                        <td>{comment}</td>
                        <td>{state.file!.name}</td>
                    </tr>
                </tbody>
            </table>
            <div role="group" className="controls">
                <div style={{display: "flex", flexDirection: "row"}}>
                    <ConfirmClick 
                        initial={<button className="red-button">Delete</button>}
                        accept={<button className="red-button">Confirm?</button>}
                        reject={<button>Cancel</button>} 
                        onClick={(ev) => {
                            ev.preventDefault();
                            ev.stopPropagation();
                            dispatch({
                                type: 'delete-submission',
                                payload: state
                            })
                        } }/>
                </div>
                <div><button onClick={(ev) => {
                    ev.preventDefault();
                    dispatch({
                        type: 'update-submission',
                        payload: {
                            oldValue: state,
                            newValue: { ...state, editing: true }
                        }
                    })
                }}>Edit</button></div>
            </div>

        </div>
    );
}

function ConfirmClick({ initial, accept, reject, onClick } : { onClick: MouseEventHandler, initial : ReactElement, accept: ReactElement, reject: ReactElement }) {
    const [ conf, setConf ] = useState(false);
    if (!conf) {
        return cloneElement(initial, { onClick: (ev: MouseEvent) => {
            ev.preventDefault();
            ev.stopPropagation();
            setConf(true)
        } });
    } else {
        return <>
            {cloneElement(accept, { onClick: (ev:any) => {
                setConf(false);
                onClick(ev);
            } })}
            {cloneElement(reject, { onClick: (ev:MouseEvent)=> {
                ev.preventDefault();
                ev.stopPropagation();
                setConf(false);
            }})}
        </>
    }
}
type FileInputProps = {
    state: [ Submission, (x: Submission) => void ];
}

let app = document.getElementById("app");
if (process.env.PRODUCTION == '1') {
    hydrate(<App />, app);
} else render(<App />, app);