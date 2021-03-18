
import express from 'express';
import React from 'react';
import ReactDOM, { renderToString } from "react-dom/server";
import { readFileSync } from 'fs';
import { StaticRouter } from 'react-router-dom';
import { App } from './frontend/app';
import { join } from 'path';

import { app } from './backend/server';
import { readFile } from 'fs/promises';
import { generateNames } from './shared/generateNames';

// const generateHtml = (reactDom : string) => template.join(reactDom);

app.use('/dist', express.static(join(__dirname, "/dist")));
app.get('/', (req, res) => {
    res.redirect("/app");
})
app.get('/names', (req, res) => {
    const qcount = (req.query.count || '1').toString();
    const count = parseInt(qcount);
    res.writeHead(200, {"Content-type": "text/json"});
    res.end(JSON.stringify(generateNames(count)));
})
app.get("/submit", async (req, res) => {
    res.sendFile(join(__dirname, "dist", "submit.html"));
})
app.get("/app/?*", (req, res) => {
    // const ctx = {};
    // const path = req.url.split("/app")[1];
    // const jsx = (
    //     <StaticRouter location={path} context={ctx}>
    //         <App />
    //      </StaticRouter>
    // );
    // const html = generateHtml(renderToString(jsx));
    res.sendFile(join(__dirname, "dist", "index.html"))
});

const port = process.env.PORT || '8080';
app.listen(port);
console.log(`Server listening at port ${port}!!`);
