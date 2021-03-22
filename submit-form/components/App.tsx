import React, { useEffect, useReducer } from 'react';
import teaEmoji from '../../assets/svg/tea-emoji.svg';
import { useFakeName } from '../hooks/placeholder';
import { AppState, emptyState, intoFormData, reducer } from '../reducer';
import { SubmissionList } from './SubmissionList';

export function App() {
    const [fake, nextFake] = useFakeName();
    const [state, dispatch] = useReducer(reducer, emptyState, (x: AppState) => {
        let s: AppState = JSON.parse(localStorage.getItem('form-state') || 'false') || x;
        s.submissions.forEach(x => x.editing = true);
        s.error = null;
        return s;
    });

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

    const editing = state.submissions.filter(x => x.editing).length > 0;

    const canSubmit = (state.name)
        && (state.email)
        && (state.statement)
        && (state.submissions.length > 0)
        && !editing;

    let message = (<>Submit to<img 
            style={{ verticalAlign: "bottom" }} alt="TEA" src={teaEmoji} /></>);

    let buttonClass = "green-button";
    if (!canSubmit) {
        message = <>Editing...</>;
        buttonClass = "";
    }

    return (<>
        <div id="file-input-toolbar">
            <button onClick={handleSubmit}
                id="submit"
                style={{ width: "20ch" }}
                className={buttonClass}
                disabled={!canSubmit}>
                <span style={{ textAlign: "center" }}>{message}</span></button>

            <button style={{ marginLeft: "auto" }} onClick={(ev) => {
                ev.preventDefault();
                dispatch({
                    type: 'add-submission'
                });
            }}
                onContextMenu={(ev) => {
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
                    <div role="group" style={{ flexDirection: "column", justifySelf: "flex-end" }}>
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

                <SubmissionList dispatch={dispatch} state={state.submissions} />
            </div>

        </div>
    </>);
}
