
/*import React from 'react';*/
import React, {Component} from 'react';
import { SubmissionsView, SubmissionView, Submission} from '../submissions';
import {subs} from '../app';
import { saveScroll } from '../hooks/saveScroll'; /*possibly not needed */
import PropTypes from 'prop-types'; /*also possibly not needed */
import { submissionView } from '../reducers';

import Tabs from 'react-bootstrap/Tabs' /*first attempt at getting tabs to work, bootstrap installation gave me errors */
import './VotingStats.css';
// import './Tabs.jsx';
import './index.js';

import { Route, Switch, Link, useParams, useLocation } from 'react-router-dom';
import { IndividualVotes } from './IndividualVotes';
import {MouseEventHandler} from 'react';

import { Pie } from 'react-chartjs-2';

//overall voting stats page first


// export class Tabs extends Component {
//   static propTypes = {
//     children: PropTypes.instanceOf(Array).isRequired,
//   }

//   constructor(props) {
//     super(props);

//     this.state = {
//       activeTab: this.props.children[0].props.label,
//     };
//   }

//   onClickTabItem = (tab) => {
//     this.setState({ activeTab: tab });
//  }

// }


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

                {/* <button>Individual Votes</button> <button onClick={this.handleClick}>+</button> */}

                <p>Total Votes: {this.findTotalVotes()}</p>
                <p>Yes: {this.findDegreeYes()} degrees</p>
                <p>No: {this.findDegreeNo()} degrees</p>
                <p>Abstain: {this.findDegreeAbstain()} degrees</p>

                <div>
                    {/* <button onClick={() => <Link to='/voting-statistics-individual'></Link>}>Ind Test</button> */}
                    <Link to="/voting-statistics-individual" className = "btn btn-primary">Individual Votes</Link>
                </div>
                
                {/* <Pie
                    data ={
                        {
                            this.vote.yes
                        }}
                
                /> */}
                    
                {/* <div className="pie"></div> */}
                {/* <Tabs>hello?</Tabs> */}

                {}

                {this.sneakySneakyFunction()}
                {/* <p>{this.SubmissionsView(this.vote.Submission)}</p> */}
                {/* <SubmissionsView submissions={subs}/> 
                    iterate through the nodes and just show name and title
                */}
                {/* {nodes} */}
            </div>
        );
    }

    handleClick = () => {
        console.log('button clicked');
    }

    createGraph() {
        
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

    findDegreeYes() {
        return(
            //this.vote.pieceName
            Math.round((this.vote.yes / this.findTotalVotes()) * 360) 
        )
    }

    findDegreeNo() {
        return(
            //this.vote.pieceName
            Math.round((this.vote.no / this.findTotalVotes()) * 360) 
        )
    }

    findDegreeAbstain() {
        return(
            //this.vote.pieceName
            Math.round((this.vote.abstain / this.findTotalVotes()) * 360) 
        )
    }

    sneakySneakyFunction() {
        console.log('Help me I\'m trapped')
    }
}


/* THIS IS THE ORIGINAL VERSION DO NOT DELETE
IF THINGS GO WRONG, DELETE EVERYTHING ELSE AND
REINSTATE THIS VERSION HERE
export function VotingStats() {
    return (<>
        <div>Voting Stats!</div>
        
    </>)
} 
*/