import React, { Dispatch, useEffect, useReducer, useRef, useState } from 'react';
import { Placeholder } from '../../../shared/generateNames';
import teaEmoji from '../../../assets/svg/tea-emoji.svg';
import { State } from '../state';
import { SubmissionList } from './SubmissionList';
import { observer } from 'mobx-react-lite';
import { action } from 'mobx';

const state  = new State();

export const App = observer(() => {
    const [fake, setFake] = useState(new Placeholder());
    useEffect(() => {
        state.load();
    }, [])
    const handleSubmit = (ev: any) => {
        ev.preventDefault();
        ev.stopPropagation();

        state.submit();
    }; 

    let message = (<>Submit to<img 
            style={{ verticalAlign: "bottom" }} alt="TEA" src={teaEmoji} /></>);

    let buttonClass = "green-button";

    if (!state.valid) {
        message = <>Editing...</>;
        buttonClass = "";
    }

    return (<>
        <div id="toolbar" style={{display: "flex", justifyContent: "space-between"}}> 
            <button onClick={handleSubmit} 
                id="submit"
                style={{ width: "20ch" }}
                className={buttonClass}
                disabled={!state.valid}>
                <span style={{ textAlign: "center" }}>{message}</span></button>

            <button style={{ marginLeft: "auto" }} onClick={(ev) => {
                ev.preventDefault();
                state.submissions.addSubmission();
            }}
                onContextMenu={(ev) => {
                    ev.preventDefault();
                    setFake(fake.next);
                }}
            >Add Item</button>
        </div>
        <div id="form" style={{display: "flex", maxHeight: "80vh", height: "100%", gap: "1rem"}} >
            <div role="group" style={{ flexDirection: "column", justifySelf: "flex-end" }}>
                <label htmlFor="artist-statement">Personal Statement</label>
                <textarea required
                    value={state.statement} onChange={action(ev => {
                        state.statement = ev.target.value
                    })}
                    placeholder={fake.text} name="artist-statement"></textarea>
            </div>
            <div role="region" id="submissions" style={{ display: "flex", flexDirection: "column", overflowY: "scroll", scrollbarWidth: "thin", gap: "1rem"}}>
                <SubmissionList submissions={state.submissions} />
            </div>
        </div>
    </>);
});