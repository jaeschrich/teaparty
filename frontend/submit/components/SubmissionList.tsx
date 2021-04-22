import React, { Dispatch } from 'react';
import { SubmissionInput } from './SubmissionInput';
import { Submission, Submissions } from '../state';
import { Action } from '../reducer';
import { SubmissionView } from "./SubmissionView";
import { observer } from 'mobx-react-lite';

export const SubmissionList = observer(({ submissions } : { submissions: Submissions }) => {
    return (<>
        {submissions.submissions.map((sub) => {
            if (sub.editing) {
                return (<SubmissionInput key={sub.id} value={sub} />);
            } else {
                return (<SubmissionView key={sub.id} value={sub} />);
            }
        })}
    </>);
});