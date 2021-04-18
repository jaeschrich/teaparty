import React, {Component} from 'react';
import { SubmissionsView, SubmissionView, Submission} from '../submissions';
import {subs} from '../app';
import { submissionView } from '../reducers';

import { Route, Switch, Link, useParams, useLocation } from 'react-router-dom';
import {MouseEventHandler} from 'react';

export class IndividualVotes extends Component {
    render() {
        let nodes = subs.map((sub: any) => <SubmissionView key={sub.title+sub.author} value={sub} />).slice(0,5)
        return(
            <div>
                <h1>Individual Votes</h1>
                <Link to="/voting-statistics" className = "btn btn-primary">Overall Votes</Link>
                {nodes}
            </div>
        )
    }
}