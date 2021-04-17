import React, { MouseEventHandler, useCallback, useEffect, useLayoutEffect, useRef } from 'react';

import './submissions.css';
import voteYesSvg from '../../assets/svg/vote-yes.svg';
import voteNoSvg from '../../assets/svg/vote-no.svg';
import zipFaceSvg from '../../assets/twemoji/1f910.svg';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveScroll } from './hooks/saveScroll';

export type Submission = { title: string, author: string }

export function SubmissionsView(props : any) {
    const ref = saveScroll(props.scrollState);
    let nodes = props.submissions.map((sub: any) => <SubmissionView key={sub.title+sub.author} value={sub} />)
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
        <span><Link to={`/view-submission/${props.value.title}`}>&ldquo;{props.value.title}&rdquo;</Link> by <Link to={`/view-author/${props.value.author}`}> {props.value.author}</Link></span>
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
        <img src={voteYesSvg} />
    </button>);
}

// adapted from twemoji 274e
function VoteNoButton({ onClick } : { onClick : MouseEventHandler }) {
    return (
        <button onClick={onClick} title="Vote No">
            <img src={voteNoSvg} />
         </button>);
}

function VoteAbstainButton({ onClick } : { onClick : MouseEventHandler }) {
    return (
        <button onClick={onClick} title="Abstain from Voting"><img src={zipFaceSvg} /></button>
    );
}