import React, { MouseEventHandler, useCallback, useEffect, useLayoutEffect, useRef } from 'react';

import './submissions.css';
import ThumbsUp from '../assets/twemoji/2611.svg';
import ThumbsDown from '../assets/twemoji/274e.svg';2
import ZipFace from '../assets/twemoji/1f910.svg';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveScroll } from './hooks/saveScroll';

export type Submission = { title: string, author: string }

export function SubmissionsView(props : any) {
    const ref = saveScroll(props.scrollState);
    let nodes = props.submissions.map(sub => <SubmissionView key={sub.title+sub.author} value={sub} />)
    return (
    <div role="main" aria-label="Submission" ref={ref}>
        {nodes}
    </div>);
}

export function SubmissionView(props: { value: Submission }) {
    const dispatch = useDispatch();
    const voteYes = (ev: any) => {
        ev.stopPropagation();
        dispatch({ type: 'vote/yes', payload: props.value });
    }
    const voteNo = (ev: any) => {
        ev.stopPropagation();
        dispatch({ type: 'vote/no', payload: props.value });
    };
    const voteAbstain = (ev: any) => {
        ev.stopPropagation();
        dispatch({ type: 'vote/abstain', payload: props.value });
    };
 
    return (<div className="submission">
        <span><Link to={`/view-submission/${props.value.title}`}>&ldquo;{props.value.title}&rdquo;</Link> by {props.value.author}</span>
        <div role="group">
            <VoteYesButton onClick={voteYes} />
            <VoteNoButton onClick={voteNo} />
            <VoteAbstainButton onClick={voteAbstain} />
        </div>
    </div>)
}

// adapted from twemoji 2611
function VoteYesButton({ onClick } : { onClick : MouseEventHandler }) {
    return (<button onClick={onClick} title="Vote Yes">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
            <path fill="green" d="M36 32c0 2.209-1.791 4-4 4H4c-2.209 0-4-1.791-4-4V4c0-2.209 1.791-4 4-4h28c2.209 0 4 1.791 4 4v28z"/>
            <path fill="#BBDDF5" d="M29.28 6.362c-1.156-.751-2.704-.422-3.458.736L14.936 23.877l-5.029-4.65c-1.014-.938-2.596-.875-3.533.138-.937 1.014-.875 2.596.139 3.533l7.209 6.666c.48.445 1.09.665 1.696.665.673 0 1.534-.282 2.099-1.139.332-.506 12.5-19.27 12.5-19.27.751-1.159.421-2.707-.737-3.458z"/>
        </svg>
    </button>);
}

// adapted from twemoji 274e
function VoteNoButton({ onClick } : { onClick : MouseEventHandler }) {
    return (
        <button onClick={onClick} title="Vote No">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
                <path fill="red" d="M36 32c0 2.209-1.791 4-4 4H4c-2.209 0-4-1.791-4-4V4c0-2.209 1.791-4 4-4h28c2.209 0 4 1.791 4 4v28z"/>
                <path fill="#FFF" d="M21.529 18.006l8.238-8.238c.977-.976.977-2.559 0-3.535-.977-.977-2.559-.977-3.535 0l-8.238 8.238-8.238-8.238c-.976-.977-2.56-.977-3.535 0-.977.976-.977 2.559 0 3.535l8.238 8.238-8.258 8.258c-.977.977-.977 2.559 0 3.535.488.488 1.128.732 1.768.732s1.28-.244 1.768-.732l8.258-8.259 8.238 8.238c.488.488 1.128.732 1.768.732s1.279-.244 1.768-.732c.977-.977.977-2.559 0-3.535l-8.24-8.237z"/>
            </svg>       
         </button>);
}

function VoteAbstainButton({ onClick } : { onClick : MouseEventHandler }) {
    return (
        <button onClick={onClick} title="Abstain from Voting"><ZipFace /></button>

    );
}