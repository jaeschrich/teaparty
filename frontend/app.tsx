import { SIGBUS } from 'node:constants';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Link, useParams, useLocation } from 'react-router-dom';
import { getNames } from './actions/getNames';
import { SubmissionsView, Submission } from './submissions';
import './app.css';
import { saveScroll } from './hooks/saveScroll';

const subs : Submission[] = []

for(let i = 0; i < 100; i++) {
    subs.push({ title: `Piece ${i}`, author: "Craig Cregbert" });
}

export function App(props : any) { 
    let names : any = useSelector<any>(state => state.submissionView.names);
    let submissions : Submission[] = names.map((n, i) => ({ title: `Piece ${i}`, author: n }));
    let dispatch = useDispatch();
    if (names.length < 100) dispatch(getNames(100));

    return (<>
        <nav role="doc-toc">
            <Link to="/">Home</Link>
            <Link to="/submissions">Submissions</Link>
        </nav>
        <Switch>
            <Route path="/submissions">
                    <SubmissionsView scrollState={useState(0)} submissions={submissions}></SubmissionsView>
            </Route>
            <Route path="/view-submission/:name">
                <div role="main" aria-label="App Content">
                    <ViewSubmissionContent />
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
    return <p>Viewing {name}!</p>;
}