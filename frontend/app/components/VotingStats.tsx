
/*import React from 'react';*/
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
import { IndividualVotes } from './IndividualVotes';
import {MouseEventHandler} from 'react';

import { Pie } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';

//overall voting stats page first

export class VotingStats extends Component {
    vote = {
        yes: 2,
        no: 1,
        abstain: 1,
        //pieceName: ["Piece 1"]
        // Submission : {
        //     title: 'title',
        //     author: 'author'
        // }
    };

    
    render() {
        let nodes = subs.map((sub: any) => <SubmissionView key={sub.title+sub.author} value={sub} />).slice(0,5)
        return(
            <div>
                <span>{this.printHeader()}</span>

                <p>Total Votes: {this.findTotalVotes()}</p>

                <div>
                    <Link to="/voting-statistics-individual" className = "btn btn-primary">Individual Votes</Link>
                    
                </div>

                <div className="style">
                    {this.createGraph()}
                </div>
            </div>
        );
    }
    
    createGraph() {
        return(
            <div>
                <div>
                <Pie
                    data={{
                        labels: ['Yes', 'No', 'Abstain'],
                        datasets: [
                        {
                            // label: 'Number of votes',
                            data: [this.vote.yes, this.vote.no, this.vote.abstain],
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
                    height={100}
                    width={100}
                />
                </div>
                
            </div>
        );
    }

    printHeader() {
        return(
        <h1>Voting Statistics Page  - Overall</h1>
        )
    }

    findTotalVotes() {
        return(
            //this.vote.pieceName
            this.vote.yes + this.vote.no + this.vote.abstain
        )
    }
}