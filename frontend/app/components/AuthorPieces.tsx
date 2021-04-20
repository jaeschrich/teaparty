import React from 'react';
import { useParams } from 'react-router';
import { SubmissionView } from '../submissions';
import { observer } from 'mobx-react-lite';
import { Submission } from '../state';

export const AuthorPieces = observer(({ submissions } : { submissions: Submission[] }) => {

    //Note: Need connection from backend to set the name to the page and pull his/her art pieces from database

    const { id } = useParams<{ id : string }>();
    const heading = (submissions.length)?(<h1>{submissions[0].authorName}'s Submissions</h1>):"";
    let nodes = submissions.map((sub: any) => 
            <SubmissionView key={sub.id} value={sub} />);
    
    //May need to make a different Array.map function to only have the pieces and not the author

    return (
        
        <div>
            {heading}
            <div style={{ borderTop: "0.1rem solid #CCC" }}>
                {nodes}
            </div>
            {/* <p>{nodes}</p> */}
            {/* <SubmissionView /> -- use this to display each submission */}
        </div>
        
    )
});
