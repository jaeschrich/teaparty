import React, {Component} from 'react';
import { SubmissionsView, SubmissionView, Submission} from '../submissions';
import {subs} from '../app';
import { saveScroll } from '../hooks/saveScroll'; /*possibly not needed */
import PropTypes from 'prop-types'; /*also possibly not needed */
import { submissionView } from '../reducers';

import Tabs from 'react-bootstrap/Tabs' /*first attempt at getting tabs to work, bootstrap installation gave me errors */
import './VotingStats.css';
import './index.js';

import { Route, Switch, Link, useParams, useLocation } from 'react-router-dom';
import { VotingStats } from './VotingStats';
import { IndividualVotes } from './IndividualVotes';
import {MouseEventHandler} from 'react';

import { Pie } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';

export class ViewIndividualVote extends Component {
    render() {
        return(
            <div>
                <p><Link to="/voting-statistics" className = "btn btn-primary">Overall Votes</Link></p>
                <p><Link to="/voting-statistics-individual" className = "btn btn-primary">Individual Votes</Link></p>
                <canvas id="myChart" width="1" height="1">
                    
                </canvas>
                <Pie
                        data={{
                            labels: ['Yes', 'No', 'Abstain'],
                            datasets: [
                            {
                                data: [2, 1, 1],
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
                        height={300}
                        width={300}
                    />
            </div>    
        )
    }
}