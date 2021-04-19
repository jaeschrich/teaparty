import React, { Dispatch } from 'react';
import { Action } from '../reducer';
import { ConfirmClick } from './ConfirmClick';
import { SubmissionInfo } from './SubmissionInfo';
import '../styles/SubmissionView.css'
import { Submission } from '../state';
import {action} from 'mobx';
import { observer } from 'mobx-react-lite';

export const SubmissionView = observer(({ value }: { value: Submission }) => {
    return (
        <div role="region" className="submission">
            <SubmissionInfo value={value} />
            <div role="group" className="controls">
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <ConfirmClick
                        initial={<button className="red-button">Delete</button>}
                        accept={<button className="red-button">Confirm?</button>}
                        reject={<button>Cancel</button>}
                        onClick={action((ev) => {
                            ev.preventDefault();
                            ev.stopPropagation();
                            value.destroy();
                        })} />
                </div>
                <div><button onClick={action((ev) => {
                    ev.preventDefault();
                    value.editing = true;
                })}>Edit</button></div>
            </div>

        </div>
    );
})
