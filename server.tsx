
import express from 'express';
import React from 'react';
import ReactDOM, { renderToString } from "react-dom/server";
import { readFileSync } from 'fs';
import { StaticRouter } from 'react-router-dom';
import { App } from './frontend/app';
import { join } from 'path';
import low from 'lowdb';
import FileAsync from 'lowdb/adapters/FileAsync';

// import { app } from './backend/server';
import { readFile } from 'fs/promises';
import { generateNames } from './shared/generateNames';
import multer from 'multer';

type SubmittedFile = {
    originalname : string, 
    title: string,
    encoding : string, 
    mimetype : string, 
    size : string, 
    destination : string, 
    filename : string, 
    path : string,
    category: string,
    commentary: string
}

type DatabaseSchema = {
    submissions: any[],
    users: Map<String, {
        name: string,
        alias: string,
        email: string
    }>
    usedNames: string[], // keys are fake, values are real
}

const app = express();
const adapter = new FileAsync<DatabaseSchema>('data/db.json');

async function main() {
    const db = await low(adapter);
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

    const upload = multer({ dest : './data/files', preservePath: true });

    app.post('/submit', upload.array('portfolio-files'), async (req : any, res) => {
        console.log(req.body);
        let filesMap : { [key:string]: SubmittedFile } = {};

        for (let i = 0; i < req.files.length; i++) {
            const item = req.files[i];
            const title = req.body.title[i];
            filesMap[title] = {
                originalname: item.originalname,
                title: title,
                destination: item.destination,
                mimetype: item.mimetype,
                encoding: item.encoding,
                size: item.size,
                filename: item.filename,
                path: item.path,
                category: req.body.category[i],
                commentary: req.body.comments[i]
            }
        }
        console.log(filesMap );
        // db  .get('submissions')
        //     .push({ files: files,  })
        res.sendFile(join(__dirname, 'dist', 'submit-form', 'submitted.html'));
    });

    app.get("/submit", async (req, res) => {
        res.sendFile(join(__dirname, "dist", "submit-form", "submit.html"));
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
        res.sendFile(join(__dirname, "dist", "frontend", "index.html"))
    });
    db.defaults({ submissions: [], users: [] });
    return app;
}
main().then(app => {
    const port = process.env.PORT || '8080';
    app.listen(port);
    console.log(`Server listening at port ${port}!!`); 
});
