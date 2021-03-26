import React, { Dispatch, useEffect, useReducer, useRef, useState } from 'react';
import teaEmoji from '../../assets/svg/tea-emoji.svg';
import { nextPlaceholder } from '../hooks/placeholder';
import { Action, AppState, emptyState, intoFormData, isValidState, reducer } from '../reducer';
import { SubmissionList } from './SubmissionList';

export function App() {
    const [fake, setFake] = useState(nextPlaceholder());
    const [state, dispatch] = useReducer(reducer, emptyState, (x: AppState) => {
        let s: AppState = JSON.parse(localStorage.getItem('form-state') || 'false') || x;
        s.submissions.forEach(x => x.editing = true);
        s.error = null;
        return s;
    });

    const formRef = useRef<any>(null);

    useEffect(() => {
        localStorage.setItem('form-state', JSON.stringify(state));
    }, [state]);

    const handleSubmit = (ev: any) => {
        ev.preventDefault();
        ev.stopPropagation();

        console.log('submit event')
        ev.target.disabled = true;

        ev.target.textContent = "Submitting..."
        fetch('/submit', {
            method: 'POST',
            body: intoFormData(state)
        }).then(x => (window.location as any) = "/submitted");
    };

    let message = (<>Submit to<img 
            style={{ verticalAlign: "bottom" }} alt="TEA" src={teaEmoji} /></>);

    let buttonClass = "green-button";
    let valid = isValidState(state);

    if (!valid) {
        message = <>Editing...</>;
        buttonClass = "";
    }

    return (<>
        <div id="file-input-toolbar">
            <button onClick={handleSubmit}
                id="submit"
                style={{ width: "20ch" }}
                className={buttonClass}
                disabled={!valid}>
                <span style={{ textAlign: "center" }}>{message}</span></button>

            <button style={{ marginLeft: "auto" }} onClick={(ev) => {
                ev.preventDefault();
                dispatch({
                    type: 'add-submission'
                });
            }}
                onContextMenu={(ev) => {
                    ev.preventDefault();
                    setFake(nextPlaceholder(fake));
                }}
            >Add Item</button>
        </div>
        <div id="form">
            <div id="id-form">
                <form className="form" ref={formRef}>
                    <div role="group">
                        <label htmlFor="name">Name </label>
                        <input required type="text" name="name"
                            value={state.name.value} onChange={(ev) => dispatch({
                                type: 'set-name',
                                payload: {
                                    value: ev.target.value,
                                    isValid: ev.target.validity.valid
                                }
                            })}
                            placeholder={fake.name + " (for example)"} />
                    </div>
                    <div role="group">
                        <label htmlFor="UFL Email">Email </label>
                        <input required type="email"
                            value={state.email.value} onChange={(ev) => dispatch({
                                type: 'set-email',
                                payload: {
                                    value: ev.target.value.trim(),
                                    isValid: ev.target.validity.valid
                                }
                            })}
                            name="email" placeholder={fake.email}
                            pattern=".+@ufl.edu" title="Please provide a UFL e-mail address" />
                    </div>
                    <div role="group">
                        <label htmlFor="UFID">UFID </label>
                        <input required type="text" maxLength={8} minLength={8}
                            value={state.UFID.value} onChange={(ev) => dispatch({
                                type: 'set-ufid',
                                payload: {
                                    value: ev.target.value,
                                    isValid: ev.target.validity.valid
                                }
                            })}
                            name="UFID" placeholder={"00000000"}
                            pattern="[0-9]{8}"
                            title="Please provide your UFID, no spaces or dashes." />
                    </div>
                    <div role="group" style={{ flexDirection: "column", justifySelf: "flex-end" }}>
                        <label htmlFor="artist-statement">Personal Statement</label>
                        <textarea required
                            value={state.statement.value} onChange={(ev) => dispatch({
                                type: 'set-statement',
                                payload: {
                                    value: ev.target.value,
                                    isValid: ev.target.validity.valid
                                }                            })}
                            placeholder={fake.text} name="artist-statement"></textarea>

                    </div>
                </form>
            </div>
            <div role="region" id="file-input-area" className="form">

                <SubmissionList dispatch={dispatch} state={state.submissions} />
            </div>

        </div>
    </>);
}

function InputGroup({ label, dispatch, input } : { label: string, dispatch: Dispatch<any>, input: any }) {
    let name = input.props.name;
    let newInput = React.cloneElement(input, {
        required: true,
        onChange: (ev:any) => {
            dispatch({
                type: `set-${name}` ,
                payload: {
                    value: ev.target.value,
                    isValid: ev.target.validity.valid
                }
            })
        }
    })
    input.props.name;
    return (<div role="group" className="">
        <label className="lemon-milk" htmlFor={name}>{label} </label>
        {newInput}
        </div>);
}