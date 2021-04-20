import React, { MouseEventHandler, useCallback, useEffect, useLayoutEffect, useRef } from 'react';

import './submissions.css';
import voteYesSvg from '../../assets/svg/vote-yes.svg';
import voteNoSvg from '../../assets/svg/vote-no.svg';
import zipFaceSvg from '../../assets/twemoji/1f910.svg';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveScroll } from './hooks/saveScroll';
import { Submission } from './state';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';


export const SubmissionsView = observer((props : { scrollState: any, submissions: Submission[] }) => {
    const ref = saveScroll(props.scrollState);
    let nodes = props.submissions.map((sub: any) => <SubmissionView key={sub.id} value={sub} />)
    return (
    <div role="main" aria-label="Submission" ref={ref}>
        {nodes}
    </div>);
})

export const SubmissionView = observer(({ value }: { value: Submission }) => { 
    return (<div className="submission">
        <span><Link to={`/view-submission/${value.id}`}>&ldquo;{value.title}&rdquo;</Link> by <Link to={`/view-author/${value.author.id}`}> {value.authorName}</Link></span>
        <VotingPanel value={value} />
    </div>)
});

export const VotingPanel = observer(({ value } : { value: Submission }) => {
    const voteYes = action((ev: any) => {
        ev.stopPropagation();
        value.setVote('yes')
    })
    const voteNo = action((ev: any) => {
        ev.stopPropagation();
        value.setVote("no")
    });
    const voteAbstain = action((ev: any) => {
        ev.stopPropagation();
        value.setVote("abstain");
    });
    return (
        <div role="group" className="voting-panel">
            <VoteYesButton onClick={voteYes} selected={value.vote === "yes" }/>
            <VoteNoButton onClick={voteNo} selected={value.vote === "no"} />
            <VoteAbstainButton onClick={voteAbstain} selected={value.vote === "abstain"}/>
        </div>
    );
});

// adapted from twemoji 2611
function VoteYesButton({ onClick, selected } : { onClick : MouseEventHandler, selected: boolean }) {
    let style:any = {};
    if (selected) style.backgroundColor = "#000";

    return (<button onClick={onClick} title="Vote Yes" style={style}>
        <img src={voteYesSvg} />
    </button>);
}

// adapted from twemoji 274e
function VoteNoButton({ onClick, selected } : { onClick : MouseEventHandler, selected: boolean }) {
    let style:any = {};
    if (selected) style.backgroundColor = "#000";
    return (
        <button style={style} onClick={onClick} title="Vote No">
            <img src={voteNoSvg} />
         </button>);
}

function VoteAbstainButton({ onClick, selected } : { onClick : MouseEventHandler, selected: boolean }) {
    let style:any = {};
    if (selected) style.backgroundColor = "#000";
    return (
        <button style={style} onClick={onClick} title="Abstain from Voting"><img src={zipFaceSvg} /></button>
    );
}