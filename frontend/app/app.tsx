import { SIGBUS } from 'node:constants';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Link, useParams, useLocation } from 'react-router-dom';
import { getNames } from './redux/actions/getNames';
import { SubmissionsView, Submission } from './submissions';
import './app.css';
import { saveScroll } from './hooks/saveScroll';
import { VotingStats } from './components/VotingStats';
import { AuthorPieces } from './components/AuthorPieces';
import { AuthorPage } from './components/AuthorPage';

export const subs : Submission[] = []

for(let i = 0; i < 100; i++) {
    subs.push({ title: `Piece ${i}`, author: "Craig Cregbert" });
}

export function App(props : any) { 
    let names : any = useSelector<any>(state => state.submissionView.names);
    let submissions : Submission[] = names.map((n : any, i : any) => ({ title: `Piece ${i}`, author: n }));
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
                    <VotingStats />
                </div>
            </Route>
            <Route path="/submissions">
                    <SubmissionsView scrollState={useState(0)} submissions={submissions}></SubmissionsView>
            </Route>
            <Route path="/view-submission/:name">
                <ViewSubmissionContent />
            </Route> 
            <Route path="/view-author/:name">
                <div role="main" aria-label="View Author">
                    <AuthorPieces name="fake name for now" />
                </div>
            </Route>
            <Route path="/author/:name">
                <div role="main" aria-label="View Author">
                    <AuthorPage name="fake name for now" />
                </div>
            </Route>
            <Route path="/">
                <div role="main" aria-label="App Content">
                    <p>Tea Party Homepage :)</p>
                </div>
            </Route>
        </Switch>
        </>);
}

function ViewSubmissionContent() {
    const { name } = useParams<{ name : string }>();
    return( <>
        <p>Viewing {name}!</p>
        <iframe style={{width: "100%", height: "100%"}} src="/dist/northanger-abbey.pdf"></iframe>
    </>);
}