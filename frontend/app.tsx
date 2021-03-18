import { SIGBUS } from 'node:constants';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Link, useParams } from 'react-router-dom';
import { getNames } from './actions/getNames';
import { SubmissionsView, Submission } from './submissions';
import './app.css';

const subs : Submission[] = []

for(let i = 0; i < 100; i++) {
    subs.push({ title: `Piece ${i}`, author: "Craig Cregbert" });
}

export function App(props : any) { 
    let state : any = useSelector<any>(state => state);
    console.log(state);
    let submissions : Submission[] = state.names.map((n, i) => ({ title: `Piece ${i}`, author: n }));
    let dispatch = useDispatch();
    if (state.names.length < 100) dispatch(getNames(100));
    return (<>
        <nav role="doc-toc">
            <Link to="/">Home</Link>
            <Link to="/submissions">Submissions</Link>
        </nav>
        <div role="main" aria-label="App Content">
            <Switch>
                <Route path="/submissions">
                    <SubmissionsView submissions={submissions}></SubmissionsView>
                </Route>
                <Route path="/view-submission/:name">
                    <ViewSubmissionContent />
                </Route> 
                <Route path="/">
                    <p>Tea Party Homepage :)</p>
                </Route>
            </Switch>
        </div>
        </>);
}

function ViewSubmissionContent() {
    const { name } = useParams<{ name : string }>();
    return <p>Viewing {name}!</p>;
}