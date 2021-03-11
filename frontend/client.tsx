import { hydrate, render } from 'react-dom';
import React from 'react';
import { App } from './app';
import { BrowserRouter as Router } from 'react-router-dom';
import './client.css';

const root = document.getElementById("root");
const jsx = (<Router basename="/app/"><App /></Router>);

if (process.env.NODE_ENV !== 'production') { // Or, `process.env.NODE_ENV !== 'production'`
  // Only runs in development and will be stripped from production build.
  render(jsx, root);
} else hydrate(jsx, root);