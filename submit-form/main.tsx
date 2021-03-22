import React from 'react';
import { hydrate, render } from 'react-dom';
import { App } from './components/App';
import './submit.css'

let app = document.getElementById("app");
if (process.env.NODE_ENV == "production") {
    hydrate(<App />, app);
} else render(<App />, app);