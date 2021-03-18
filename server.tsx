
import express from 'express';
import React from 'react';
import ReactDOM, { renderToString } from "react-dom/server";
import { readFileSync } from 'fs';
import { StaticRouter } from 'react-router-dom';
import { App } from './frontend/app';
import { join } from 'path';

import { app } from './backend/server';

const template = readFileSync('./template.html').toString();
const firstNames = readFileSync('./assets/place-names.txt').toString().split("\n").filter(x => x.trim().length>0);
const lastNames = readFileSync('./assets/last-names.txt').toString().split("\n").filter(x=>x.trim().length>0);

function generateName() {
    let ifirstName = Math.floor(Math.random() * firstNames.length);
    let ilastName = Math.floor(Math.random() * lastNames.length);
    return firstNames[ifirstName] + " " + lastNames[ilastName];
}

function generateNames(count : number) {
    let names = new Set<String>();
    for (let i = 0; i < count; i++) {
        names.add(generateName());
    }
    return Array.from(names);
}

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
app.get("/app/?*", (req, res) => {
    // const ctx = {};
    // const path = req.url.split("/app")[1];
    // const jsx = (
    //     <StaticRouter location={path} context={ctx}>
    //         <App />
    //      </StaticRouter>
    // );
    // const html = generateHtml(renderToString(jsx));
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(template);
});

const port = process.env.PORT || '8080';
app.listen(port);
console.log(`Server listening at port ${port}!!`);
