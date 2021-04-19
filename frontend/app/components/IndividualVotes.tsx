import React, {Component} from 'react';
import { SubmissionsView, SubmissionView, Submission} from '../submissions';
import {subs} from '../app';
import { submissionView } from '../reducers';

import { Route, Switch, Link, useParams, useLocation } from 'react-router-dom';
import {MouseEventHandler} from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export class IndividualVotes extends Component {

    render() {
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
                <p>{this.ViewSubmitted(subs)}</p>

                
                
            </div>
        )
    }

    

    Submitted(props: { value: Submission }) {
        return (<div className="submission">
                <span><Link to={`/view-submission/${props.value.title}`}>&ldquo;{props.value.title}&rdquo;</Link></span>
                <div role="group">
                    {/* <viewGraph onClick={() => <Link to='/submit'></Link>} /> */}
                    <Link to="/view-individual">Graph</Link>
                    {/* <button onClick={viewGraph}> + </button> */}
                </div>
            </div>
        )
    }

    ViewSubmitted(props : any) {
        let nodes = subs.map((sub: any) => <this.Submitted key={sub.title+sub.author} value={sub} />).slice(0,5);
        return (
            nodes
        );
    }
}



function viewGraph() {
    console.log('button pressed')
    
    
}

    