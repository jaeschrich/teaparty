import { Submission } from '../state';
import React from 'react';
import '../styles/SubmissionInfo.css'
import { observer } from 'mobx-react-lite';

export const SubmissionInfo = observer(({ value } : { value : Submission }) => {
    const comment = (value.comment.length < 50) ? value.comment : value.comment.slice(0, 50) + "...";

    return (<div className="submission-info">
        <div className="submission-info-header">
            <span arial-label="title">&ldquo;{value.title}&rdquo;</span>
            <span aria-label="category">{value.category}</span>
        </div>
        <p aria-label="file name">{value.file!.filename}</p>
        {(comment.length>0)?(<div className="submission-info-comment"><span>{comment}</span></div>):null}
    </div>)
});