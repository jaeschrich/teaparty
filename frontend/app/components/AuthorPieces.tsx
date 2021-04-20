import React, { MouseEventHandler } from 'react';
import voteYesSvg from '../../../assets/svg/vote-yes.svg'
import voteNoSvg from '../../../assets/svg/vote-no.svg';
import zipFaceSvg from '../../../assets/twemoji/1f910.svg';
import { useParams } from 'react-router';
<<<<<<< Updated upstream
import { SubmissionView } from '../submissions';
import { observer } from 'mobx-react-lite';
import { Submission } from '../state';
=======
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Submission } from '../submissions';
import {subs} from '../app';
>>>>>>> Stashed changes

export const AuthorPieces = observer(({ submissions } : { submissions: Submission[] }) => {

    //Note: Need connection from backend to set the name to the page and pull his/her art pieces from database

<<<<<<< Updated upstream
    const { id } = useParams<{ id : string }>();
    const heading = (submissions.length)?(<h1>{submissions[0].authorName}'s Submissions</h1>):"";
    let nodes = submissions.map((sub: any) => 
            <SubmissionView key={sub.id} value={sub} />);
=======
    const { name } = useParams<{ name : string }>();
    let nodes = subs.map((sub: any) => <ViewSubmitted key={sub.title+sub.author} value={sub} />).slice(0,5);
>>>>>>> Stashed changes
    
    //May need to make a different Array.map function to only have the pieces and not the author

    return (
        
        <div>
<<<<<<< Updated upstream
            {heading}
            <div style={{ borderTop: "0.1rem solid #CCC" }}>
                {nodes}
            </div>
            {/* <p>{nodes}</p> */}
            {/* <SubmissionView /> -- use this to display each submission */}
        </div>
=======
            <h2>{name}'s Art Pieces</h2>
            {/* {nodes} */}
            <p><ViewSubmitted subs /></p>
>>>>>>> Stashed changes
        
        </div>
    )
<<<<<<< Updated upstream
});
=======
}

function ViewSubmitted(props : any) {
    let nodes = subs.map((sub: any) => <Submitted key={sub.title+sub.author} value={sub} />).slice(0,5);
    return (
    //<div role="main" aria-label="Submission">
        <p>{nodes}</p>
    //</div>
    );
}

function Submitted(props: { value: Submission }) {
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
        <span><Link to={`/view-submission/${props.value.title}`}>&ldquo;{props.value.title}&rdquo;</Link></span>
        <div role="group">
            <VoteYesButton onClick={voteYes} />
            <VoteNoButton onClick={voteNo} />
            <VoteAbstainButton onClick={voteAbstain} />
        </div>
    </div>)
}

function VoteYesButton({ onClick } : { onClick : MouseEventHandler }) {
    return (<button onClick={onClick} title="Vote Yes">
        <img src={voteYesSvg} />
    </button>);
}

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
>>>>>>> Stashed changes
