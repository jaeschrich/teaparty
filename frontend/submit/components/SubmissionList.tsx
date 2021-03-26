import React, { Dispatch } from 'react';
import { SubmissionInput } from './SubmissionInput';
import { Submission } from '../types/Submission';
import { Action } from '../reducer';
import { SubmissionView } from "./SubmissionView";

export function SubmissionList({ state, dispatch }: { state: Submission[]; dispatch: Dispatch<Action>; }) {
    return (<>
        {state.map((sub, index) => {
            if (sub.editing) {
                return (<SubmissionInput key={sub.key} state={sub} dispatch={dispatch} />);
            } else {
                return (<SubmissionView key={sub.key} state={sub} dispatch={dispatch} />);
            }
        })}
    </>);
}
