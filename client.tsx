import React from 'react';
import { hydrate, render } from 'react-dom';
import { App } from './frontend/app';
import { BrowserRouter as Router } from 'react-router-dom';
import { mode } from './config';

import './client.css';
const method = (mode === "development") ? render : hydrate;
const root = document.getElementById("root");

const jsx = (<Router><App /></Router>)
method(jsx, root);