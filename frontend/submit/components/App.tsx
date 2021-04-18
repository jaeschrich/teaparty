import React, { Dispatch, useEffect, useReducer, useRef, useState } from 'react';
import { Placeholder } from 'shared/generateNames';
import teaEmoji from '../../../assets/svg/tea-emoji.svg';
import { nextPlaceholder } from '../hooks/placeholder';
import { Action, AppState, emptyState, intoFormData, isValidState, reducer } from '../reducer';
import { SubmissionList } from './SubmissionList';

export function App() {
    const [fake, setFake] = useState(new Placeholder());
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
        <div style={{display: "flex", justifyContent: "space-between"}}>
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
                    setFake(fake.next);
                }}
            >Add Item</button>
        </div>
        <div id="form" style={{display: "flex", maxHeight: "80vh", height: "100%", gap: "1rem"}}>
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
            <div role="region" id="submissions">
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