import React, { useRef, Dispatch } from 'react';
import { Action } from '../reducer';
import { Submission, acceptMap } from '../types/Submission';

export function SubmissionInput({ state, dispatch } : { state: Submission, dispatch: Dispatch<Action> }) {
    const fileRef = useRef<any>(null);

    const handleSubmit = (ev: any) => {
        ev.preventDefault();
        dispatch({
            type: 'update-submission',
            payload: {
                oldValue: state,
                newValue: { ...state, file: fileRef.current!.files[0], editing: false }
            }
        })
    };
    const accept = acceptMap[state.category];

    return (<form onSubmit={handleSubmit} className="submission-input form">
        <div role="group">
            <label htmlFor="title">Title</label>
            <input required 
                value={state.title} 
                onChange={(ev) => dispatch({ 
                    type: 'update-submission', 
                    payload: {
                        oldValue: state,
                        newValue: { ...state, title: ev.target.value }
                    } 
                })} 
                type="text" name="title" placeholder="Title of Piece" />
        </div>
        <div role="group" style={{flexDirection: "row", justifyContent: "space-between"}}>
            <label htmlFor="category">Submission Category</label>
            <select required
                value={state.category} 
                onChange={(ev) => dispatch({ 
                    type: 'update-submission', 
                    payload: {
                        oldValue: state,
                        newValue: { ...state, category: ev.target.value }
                    } 
                })} 
                name="category">
                <option value="prose">Prose</option>
                <option value="poetry">Poetry</option>
                <option value="visual-art">Visual Art</option>
                <option value="photography">Photography</option>
            </select>
        </div>
        <div role="group"  style={{flexDirection: "row", justifyContent: "space-between"}}>
            <label htmlFor="file">File</label>
            <input required ref={fileRef} type="file" name="file" accept={accept} />
        </div>
        <textarea 
            name="comment"
            placeholder="Optional Artistic comments on piece (medium, location, context, etc.)" 
            value={state.comment} onChange={
            (ev) => dispatch({ 
                type: 'update-submission', 
                payload: {
                    oldValue: state,
                    newValue: { ...state, comment: ev.target.value }
                } 
            })
        }></textarea>
        <div role="group" style={{flexDirection: "row", gap: "1rem"}}>
            <button type="submit" className="red-button" onClick={(ev) => {
                ev.preventDefault();
                dispatch({
                    type: 'delete-submission',
                    payload: state
                })
            }}>Delete</button>
            <button type="submit">Save</button>
        </div>

    </form>);
}

