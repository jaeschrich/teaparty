
/*import React from 'react';*/
import React, {Component} from 'react';
import { SubmissionsView, SubmissionView} from '../submissions';
import { saveScroll } from '../hooks/saveScroll'; /*possibly not needed */
import PropTypes from 'prop-types'; /*also possibly not needed */

import Tabs from 'react-bootstrap/Tabs' /*first attempt at getting tabs to work, bootstrap installation gave me errors */
import './VotingStats.css';

import { Route, Switch, Link, useParams, useLocation } from 'react-router-dom';
import { IndividualVotes } from './IndividualVotes';
import {MouseEventHandler} from 'react';

import { Pie } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';
import { observer } from 'mobx-react-lite';
import { Submission } from '../state';
import { VoteType } from '../../../shared/StorageTypes';

const vote = {
    yes: 2,
    no: 1,
    abstain: 1,
};

//overall voting stats page first

export const VotingStats = observer(({ submissions } : { submissions: Submission[] }) => {
    const allVotes = submissions.flatMap(x => {
        let keys = Object.keys(x.votes);
        return keys.map(k => x.votes[k]);
    });


    let data = [0,0,0];
    for (let vote of allVotes) {
        if (vote === VoteType.yes) data[0] += 1;
        else if (vote === VoteType.no) data[1] += 1;
        else if (vote === VoteType.abstain) data[2] += 1;
    }
    const pie = (data[0] || data[1] || data[2]) ? (
        <Pie
        data={{
            labels: ['Yes', 'No', 'Abstain'],
            datasets: [
            {
                label: 'Number of votes',
                data,
                backgroundColor: [
                'rgba(0, 125, 0, 0.2)',
                'rgba(195, 0, 0, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                'rgba(0, 255, 0, 1)',
                'rgba(255, 0, 0, 1)',
                'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
            ],
        }}
        height= {1}
        width={1}
    />) : (<span>No Votes Yet!</span>);

    let nodes = submissions.map((sub: any) => <SubmissionView key={sub.title+sub.author} value={sub} />).slice(0,5)
    return(
        <div>
            <h1>Voting Statistics Page  - Overall</h1>

            <p>Total Votes: {allVotes.length}</p>

            <div className="chart-container">{pie}</div>
            
        </div>
    );
});