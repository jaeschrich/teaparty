import { SIGBUS } from 'node:constants';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Link, useParams, useLocation } from 'react-router-dom';
import { getNames } from './redux/actions/getNames';
import { SubmissionsView, VotingPanel } from './submissions';
import './app.css';
import { saveScroll } from './hooks/saveScroll';
import { VotingStats } from './components/VotingStats';
import { IndividualVotes } from './components/IndividualVotes';
import {ViewIndividualVote} from './components/ViewIndividualVote';

import { AuthorPieces } from './components/AuthorPieces';
import { State, Submission } from './state';
import { observer } from 'mobx-react-lite';

export const App = observer((props : any) => { 
    let names : any = useSelector<any>(state => state.submissionView.names);
    const [ state ] = useState(new State([]));
    useEffect(() => {
        state.load();
    }, [])
    let dispatch = useDispatch();
    if (names.length < 100) dispatch(getNames(100));

    return (<>
        <nav role="doc-toc">
            <Link to="/">Home</Link>
            <Link to="/submissions">Submissions</Link>
        </nav>
        <Switch>
            <Route path="/voting-statistics">
                <div role="main" aria-label="Voting Statistics">
                    <VotingStats submissions={state.submissions} />
                </div>
            </Route>
            <Route path="/voting-statistics-individual">
                <div role="main" aria-label="Individual Voting Statistics">
                    <IndividualVotes submissions={state.submissions} />
                </div>
            </Route>
            <Route path="/view-individual">
                <div role="main" aria-label="Voting Statistics">
                    {/* <ViewIndividualVote /> */}
                </div>
            </Route> 
            <Route path="/submissions">
                    <SubmissionsView scrollState={useState(0)} submissions={state.submissions}></SubmissionsView>
            </Route>
            <Route path="/view-submission/:id">
                <ViewSubmissionContent submissions={state.submissions} />
            </Route> 
            <Route path="/view-author/:id">
                <div role="main" aria-label="View Author">
                    <AuthorPieces submissions={state.submissions} />
                </div>
            </Route>
            <Route path="/">
                <div role="main" aria-label="App Content">
                    <p>Tea Party Homepage :)</p>
                </div>
            </Route>
        </Switch>
        </>);
});

const ViewSubmissionContent = observer(({ submissions } : { submissions: Submission[] }) => {
    const { id } = useParams<{ id : string }>();
    let sub;
    let subsearch = submissions.filter((x) => x.id === id);
    if (subsearch.length === 0) return (<p>Unknown Submission!</p>);
    else sub = subsearch[0];

    return(<div role="main" aria-label="App Content" >
        <div style={{ padding: "1rem" }}>
            
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap-reverse"}}>
                <h1 style={{fontSize: "16pt"}}>&ldquo;{sub.title}&rdquo; by <Link to={`/view-author/${sub.author.id}`}>{sub.authorName}</Link></h1>
                <h2 style={{fontFamily: "Lemon Milk"}}>{sub.category}</h2>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <label style={{ fontFamily: "Lemon Milk"}}>Vote</label>
                <VotingPanel  value={sub} />
            </div>
            <div>
                {(sub.comment.length > 0)?(<div style={{ marginBottom: "1rem", marginLeft: "auto", marginRight: "auto", border: "0.1rem solid #CCC", padding: "1rem" }}>
                    <label style={{fontWeight: 'bold', fontFamily: "Lemon Milk"}}>Author's Notes</label>
                    <p>{sub.comment}</p>
                    
                </div>):""}
                

            </div>

        </div>
        <iframe style={{width: "100%", height: "70vh"}} src={`/api/submission-file/${id}`}></iframe>
    </div>);
});