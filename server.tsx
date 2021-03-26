
import express from 'express';
import React from 'react';
import ReactDOM, { renderToString } from "react-dom/server";
import { readFileSync } from 'fs';
import { access, mkdir, stat } from 'fs/promises';
import { StaticRouter } from 'react-router-dom';
import { App } from './frontend/app';
import { join, extname } from 'path';
import low from 'lowdb';
import validator from 'validator';
import FileAsync from 'lowdb/adapters/FileAsync';
import { randomBytes } from "crypto";

// import { app } from './backend/server';
import { readFile } from 'fs/promises';
import { generateNames } from './shared/generateNames';
import multer from 'multer';
import { queries } from '@testing-library/dom';

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
const storage = multer.diskStorage({
    destination: async function(req, file, cb) {
        let authorPrefix = req.body.UFID.split('').filter((c: any) => c in "0123456789".split('')).join('');
        let path = join(__dirname, 'data', 'files', authorPrefix);
        stat(path)
        .then(st => {
            if (!st.isDirectory()) {
                return Promise.reject();
            }
        }).catch((e) => {
            return mkdir(path)
        }).then(() => {
            cb(null, path)
        })
    },
    filename: function(req, file, cb) {
        cb(null, (randomBytes(8).toString('hex')) + extname(file.originalname));
    }
});
const adapter = new FileAsync<DatabaseSchema>('data/db.json');

export async function main() {
    // const db = await low(adapter);
    // const generateHtml = (reactDom : string) => template.join(reactDom);
    app.use('/dist', express.static(join(__dirname, "/dist")));
    app.use('/assets/twemoji/', express.static(join(__dirname, "/assets", "twemoji")));
    app.use('/assets/svg/', express.static(join(__dirname, "/assets", "svg")));

    app.get('/', (req, res) => {
        res.redirect("/app");
    })
    app.get('/names', (req, res) => {
        const qcount = (req.query.count || '1').toString();
        const count = parseInt(qcount);
        res.writeHead(200, {"Content-type": "text/json"});
        res.end(JSON.stringify(generateNames(count)));
    })

    const upload = multer({ storage });

    app.post('/submit', upload.array('files'), async (req : any, res) => {
        // console.log(req.body);
        let filesMap : { [key:string]: SubmittedFile } = {};

        for (let i = 0; i < req.files.length; i++) {
            const item = req.files[i];
            const title = req.body.titles[i];
            filesMap[title] = {
                originalname: item.originalname,
                title: title,
                destination: item.destination,
                mimetype: item.mimetype,
                encoding: item.encoding,
                size: item.size,
                filename: item.filename,
                path: item.path,
                category: req.body.categories[i],
                commentary: req.body.comments[i]
            }
        }
        // db  .get('submissions')
        //     .push({ files: files,  })
        res.sendFile(join(__dirname, 'views', 'submit.html'));
    });

    app.get("/submit", async (req, res) => {
        res.sendFile(join(__dirname, "views", "submit.html"));
    })

    app.get("/submitted", async (req, res) => {
        res.sendFile(join(__dirname, "views", "submitted.html"));
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
        res.sendFile(join(__dirname, "views", "index.html"))
    });
    // db.defaults({ submissions: [], users: [] });
    return app;
}

if (require.main === module) {
    main().then((app: any) => {
        const port = process.env.PORT || '8080';
        app.listen(port);
        console.log(`Server listening at port ${port}!!`); 
    }).catch((e: Error) => {
        console.log(e.message);
        process.exit(1)
    })
}