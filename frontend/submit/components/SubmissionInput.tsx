import { STATES } from 'mongoose';
import React, { useRef, Dispatch } from 'react';
import { Action } from '../reducer';
import { Submission } from '../state';
import '../styles/SubmissionInput'
import { FileInput } from './FileInput';
import { observer } from 'mobx-react-lite';
import { action } from 'mobx';

export const SubmissionInput = observer(({ value } : { value: Submission }) => {
    const handleSubmit = (ev: any) => {
        ev.preventDefault();
        value.save();
    };

    return (<form 
                onSubmit={handleSubmit} 
                className="submission-input" 
                style={{display: "flex", flexDirection: 'column', alignItems: "center", gap: "2rem"}}>
        <div role="group">
            <label htmlFor="title">Title</label>
            <input required 
                value={value.title} 
                onChange={action((ev) => {
                    value.title = ev.target.value;
                })} 
                type="text" name="title" placeholder="Title of Piece" />
        </div>
        <div role="group">
            <label htmlFor="category">File</label>
            <FileInput value={value} />
        </div>
        <textarea 
            name="comment"
            placeholder="Optional Artistic comments on piece (medium, location, context, etc.)" 
            value={value.comment} onChange={action((ev) => {
                value.comment = ev.target.value;
            })}></textarea>
        <div role="group">
            <button type="submit" className="red-button" onClick={action((ev) => {
                ev.preventDefault();
                value.destroy();
            })}>Delete</button>
            <button type="submit" disabled={!value.file}>Save</button>
        </div>
    </form>);
});