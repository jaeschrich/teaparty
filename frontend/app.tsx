import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

export function App( ) { 
    return (
        <Switch>
            <Route path="/craig">
                <p role="heading">Hello Craig!</p>
            </Route>
            <Route path="/">
                <p role="heading">Hello Tea Party!</p>
                <Link to="/craig">craig</Link>
            </Route>
        </Switch>);
}