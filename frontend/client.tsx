import { hydrate, render } from 'react-dom';
import React from 'react';
import { App } from './app';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { reducer } from './reducers';
import { promiseMiddlware } from './promise-middleware';
import TeaSymbol from '../assets/twemoji/1f375.svg';
import PartyPopper from '../assets/twemoji/1f389.svg';
import './client.css';

const middlewareEnhancer = applyMiddleware(promiseMiddlware);
export const store = createStore(reducer, middlewareEnhancer);
const root = document.getElementById("root");
const jsx = (<>
  <span role="doc-title" aria-label="Tea Party" aria-placeholder="Tea Party">
      <img src={TeaSymbol} alt="🍵" />
      <img src={PartyPopper} alt="🎉" />
  </span>
  <Provider store={store}><Router basename="/app/"><App /></Router></Provider>
</>);

if (process.env.NODE_ENV !== 'production') { // Or, `process.env.NODE_ENV !== 'production'`
  // Only runs in development and will be stripped from production build.
  render(jsx, root);
} else hydrate(jsx, root);