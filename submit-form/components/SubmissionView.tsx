import React, { Dispatch } from 'react';
import { Submission } from '../types/Submission';
import { Action } from '../reducer';
import { ConfirmClick } from './ConfirmClick';
import { SubmissionInfo } from './SubmissionInfo';
import '../styles/SubmissionView.css'

export function SubmissionView({ state, dispatch }: { state: Submission; dispatch: Dispatch<Action>; }) {
    return (
        <div role="region" className="submission" key={state.key}>
            <SubmissionInfo value={state} />
            <div role="group" className="controls">
                <div style={{ display: "flex", flexDirection: "row" }}>
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
                            });
                        }} />
                </div>
                <div><button onClick={(ev) => {
                    ev.preventDefault();
                    dispatch({
                        type: 'update-submission',
                        payload: {
                            oldValue: state,
                            newValue: { ...state, editing: true }
                        }
                    });
                }}>Edit</button></div>
            </div>

        </div>
    );
}
