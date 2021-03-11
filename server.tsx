
import express from 'express';
import React from 'react';
import ReactDOM, { renderToString } from "react-dom/server";
import { readFileSync } from 'fs';
import { StaticRouter } from 'react-router-dom';
import { App } from './frontend/app';
import { join, parse } from 'path';
import { mode } from './config';

const app = express();


const template = readFileSync('./template.html').toString().split('$body');
const generateHtml = (reactDom : string) => template.join(reactDom);

app.use('/dist', express.static(join(__dirname, "/dist")));

app.get("/*", (req, res) => {
    // const ctx = {};
    // const path = req.url.split("/app")[1];
    // const jsx = (
    //     <StaticRouter location={path} context={ctx}>
    //         <App />
    //      </StaticRouter>
    // );
    // const html = generateHtml(renderToString(jsx));
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(template.join(''));
});

function startServer() {
    app.listen(8000);
    console.log("Server listening at port 8000!");
}


if (mode === "development") {
    const Bundler = require("parcel-bundler");
    const entryFile = join(__dirname, 'client.tsx');
    const bundler = new Bundler(entryFile);
    bundler.bundle().then(() => {
        startServer();
    })
} else startServer();

