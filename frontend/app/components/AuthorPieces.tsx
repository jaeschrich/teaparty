import React from 'react';
import { useParams } from 'react-router';
import { SubmissionView } from '../submissions';
import { observer } from 'mobx-react-lite';
import { Submission } from '../state';

export const AuthorPieces = observer(({ submissions } : { submissions: Submission[] }) => {

    const { id } = useParams<{ id : string }>();
    const subs = submissions.filter((sub: any) => sub.author.id === id)
    const heading = (subs.length)?(<h1>{subs[0].authorName}'s Submissions</h1>):"";
    let nodes = subs.map((sub: any) => 
            <SubmissionView key={sub.id} value={sub} />);   

    return (
        
        <div>
            {heading}
            <div style={{ borderTop: "0.1rem solid #CCC" }}>
                {nodes}
            </div>
        </div>
        
    )
});
