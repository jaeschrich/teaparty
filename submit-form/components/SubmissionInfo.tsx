import { Submission } from '../types/Submission';
import React from 'react';
import '../styles/SubmissionInfo.css'

export function SubmissionInfo({ value } : { value : Submission }) {
    const comment = (value.comment.length < 50) ? value.comment : value.comment.slice(0, 50) + "...";

    return (<div className="submission-info">
        <div className="submission-info-header">
            <span arial-label="title">&ldquo;{value.title}&rdquo;</span>
            <span aria-label="category">{value.category}</span>
        </div>
        <p aria-label="file name">{value.file!.name}</p>
        <div className="submission-info-comment"><span>{comment}</span></div>
    </div>)
}