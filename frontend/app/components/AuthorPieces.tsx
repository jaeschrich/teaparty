import React from 'react';
import { useParams } from 'react-router';
import { SubmissionView } from '../submissions';
import {subs} from '../app';

export function AuthorPieces(props : any) {

    //Note: Need connection from backend to set the name to the page and pull his/her art pieces from database

    const { name } = useParams<{ name : string }>();
    let nodes = subs.map((sub: any) => <SubmissionView key={sub.title+sub.author} value={sub} />).slice(0,5);
    
    //May need to make a different Array.map function to only have the pieces and not the author

    return (
        
        <div>
            <h2>{name}'s Art Pieces</h2>
            {nodes}

            {/* <p>{nodes}</p> */}
            {/* <SubmissionView /> -- use this to display each submission */}
        </div>
        
    )
}

