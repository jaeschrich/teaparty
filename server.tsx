
import express, { json, urlencoded } from 'express';
import React from 'react';
import ReactDOM, { renderToString } from "react-dom/server";
import { readFileSync } from 'fs';
import { access, mkdir, stat } from 'fs/promises';
import { StaticRouter } from 'react-router-dom';
// import { App } from './frontend/app/app';
import { join, extname } from 'path';
import low from 'lowdb';
import validator from 'validator';
import FileAsync from 'lowdb/adapters/FileAsync';
import { randomBytes } from "crypto";

import { app as backend } from './backend/server';
import { readFile } from 'fs/promises';
import { generateNames } from './shared/generateNames';
import multer from 'multer';
import { queries } from '@testing-library/dom';
import session from 'express-session';
import { storage, db } from './backend/storage';
import { router as submitRouter } from './backend/submit';
import { checkPassword, createPassword } from './backend/accounts';
import { nanoid } from 'nanoid';
// import { createEngine } from 'express-react-views';

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


const app = express();

export async function main() {

    const auth = (types: string[] = ["author", "staff", "editor", "eic"]) => (req: any, res: any, next: any) => {
        if (req.session.user) {
            console.log(types, req.session.user.type)
            if (types.indexOf(req.session.user.type) === -1) return res.redirect("/login")
            next();
        } else {
            return res.redirect("/login")
        }
    }
    // const db = await low(adapter);
    // const generateHtml = (reactDom : string) => template.join(reactDom)
    // app.set('views', join(__dirname, "views"));
    // app.set('view engine', 'jsx');
    // app.engine('jsx', createEngine());
    app.use(urlencoded({ extended: false }));
    app.use(json());
    app.use(session({
        secret: 'tea partyyy',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, httpOnly: false }
    }))
    app.use(session({ secret: "very secret indeed", resave: true, saveUninitialized: true }));
    app.use(backend);
    app.use('/dist', express.static(join(__dirname, "/dist")));
    app.use('/assets/twemoji/', express.static(join(__dirname, "/assets", "twemoji")));
    app.use('/assets/svg/', express.static(join(__dirname, "/assets", "svg")));
    app.use('/assets/js/', express.static(join(__dirname, "/assets", "js")));
    app.use('/assets/LemonMilk/', express.static(join(__dirname, "/assets", "LemonMilk")));
    app.get('/', (req, res) => {
        res.redirect("/app");
    })
    app.get('/names', (req, res) => {
        const qcount = (req.query.count || '1').toString();
        const count = parseInt(qcount);
        res.writeHead(200, {"Content-type": "text/json"});
        let names = generateNames(count).map(([first, last]) => `${first} ${last}`);
        res.end(JSON.stringify(names));
    })

    // const upload = multer({ storage });

    app.get('/login', (req, res) => {
        res.sendFile(join(__dirname, "views", "login.html"))
    })

    app.post('/login', (req : any, res, next) => {
        let search = db.get('users').find({ email: req.body.email });
        if (search.value() && checkPassword(req.body.password, search.value().password)) {
            req.session.user = search.value()
            if (["staff", "editor", "eic"].indexOf(req.session.user.type) >= 0) return res.redirect("/app");
            return res.redirect("/submit");
        } else {
            return res.redirect("/login");
        }
    });

    app.get('/create-account', (req, res) => {
        res.sendFile(join(__dirname, "views", "create-account.html"))
    })

    app.post('/create-account', (req: any, res) => {
        let id = nanoid();
        let user = {
            id, 
            email: req.body.email, 
            password: createPassword(req.body.password), 
            UFID: req.body.UFID.split('').filter((c: any) => c in "0123456789".split('')).join(''),
            pronouns: req.body.pronouns, 
            name: req.body.name,
            type: "author",
            statement: ""
        }
        db.get('users').push(user).write()
        req.session.user = user;
        if (["staff", "editor", "eic"].indexOf(req.session.user.type) >= 0) return res.redirect("/app");
        return res.redirect("/submit");    
    });

    app.get('/logout', (req, res) => {
        res.sendFile(join(__dirname, "views", "logout.html"))
    })

    app.use('/submit', auth(), submitRouter);

    app.get("/submitted", async (req, res) => {
        res.sendFile(join(__dirname, "views", "submitted.html"));
    })

    app.get("/app/?*", auth(["staff", "editor", "eic"]), (req, res) => {
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