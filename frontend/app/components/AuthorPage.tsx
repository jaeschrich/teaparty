import React from 'react';
import { SubmissionView } from '../submissions';

export function AuthorPage({ name } : { name: string }) {
    return (<div>
        <p>{name}'s page</p>
        {/* <SubmissionView /> -- use this to display each submission */}
    </div>)
}