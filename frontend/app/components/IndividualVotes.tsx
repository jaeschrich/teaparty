import React, {Component} from 'react';
import { Submission } from '../state';
import { SubmissionsView, SubmissionView} from '../submissions';
// import {subs} from '../app';
// import { submissionView } from '../reducers';

import { Route, Switch, Link, useParams, useLocation } from 'react-router-dom';
import {MouseEventHandler} from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';


const Submitted = observer(({ value} : {value : Submission}) => {
    return (<div className="submission">
            <span><Link to={`/view-submission/${value.title}`}>&ldquo;{value.title}&rdquo;</Link></span>
            <div role="group">
                {/* <viewGraph onClick={() => <Link to='/submit'></Link>} /> */}
                <Link to="/view-individual">Graph</Link>
                {/* <button onClick={viewGraph}> + </button> */}
            </div>
        </div>
    )
});

export const IndividualVotes = observer(({ submissions }: { submissions: Submission[] }) => {
    const { id } = useParams<{ id: string }>();
    let nodes = submissions.filter(x => x.author.id === id).map((sub: any) => <Submitted key={sub.id} value={sub} />).slice(0,5);

    return(
        <div>
            <h1>Voting Statistics Page  - Individual</h1>
            <Link to="/voting-statistics" className = "btn btn-primary">Overall Votes</Link>
            <div>
                {/* {nodes.concat(<Button>Button!</Button>)} */}
                {/* {nodes} */}
                {/* {nodes2.forEach((sub: any) => sub.author = subs.concat(<Button></Button>))} */}
            </div>
            {/*COMMENT THIS OUT FOR NOW, DONT WANT TO SEE NODES WHILE TESTING ACCORDION vvvvv*/}
            {nodes}
        </div>
    );
});