import React from 'react';
import { useParams } from 'react-router';
import { SubmissionView } from '../submissions';

export function AuthorPage({  } : {  }) {
    const { name } = useParams<{ name : string }>();
    return (<div>
        <p>{name}'s page</p>
        {/* <SubmissionView /> -- use this to display each submission */}
    </div>)
}