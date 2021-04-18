
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

// import { app } from './backend/server';
import { readFile } from 'fs/promises';
import { generateNames } from './shared/generateNames';
import multer from 'multer';
import { queries } from '@testing-library/dom';
import passport, { authenticate } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import session from 'express-session';
import { storage } from './backend/storage';
import { router as submitRouter } from './backend/submit';
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

passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password"}, (username, password, done) => {
    console.log("hi")
    return done(null, { username, password, type: "staff" })
}));

passport.serializeUser((user, done) => {
    // return done(null, user.id);
})

passport.deserializeUser((id, done) => {
    // find user by id
})

export async function main() {
    // const db = await low(adapter);
    // const generateHtml = (reactDom : string) => template.join(reactDom)
    // app.set('views', join(__dirname, "views"));
    // app.set('view engine', 'jsx');
    // app.engine('jsx', createEngine());
    app.use(urlencoded({ extended: false }));
    app.use(session({ secret: "very secret indeed", resave: true, saveUninitialized: true }));
    app.use(passport.initialize());
    app.use(passport.session());
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
        res.end(JSON.stringify(generateNames(count)));
    })

    const upload = multer({ storage });

    app.get('/login', (req, res) => {
        res.sendFile(join(__dirname, "views", "login.html"))
    })

    app.post('/login', passport.authenticate('local', { session: false }), (req : any, res) => {
        console.log(req.user)
        return res.redirect("/app");
    })

    app.get('/create-account', (req, res) => {
        res.sendFile(join(__dirname, "views", "create-account.html"))
    })

    app.post('/create-account', (req, res) => {
        // req.body contains info for account
    })

    app.get('/logout', (req, res) => {
        res.sendFile(join(__dirname, "views", "logout.html"))
    })

    app.use('/submit', submitRouter);

    // app.post('/submit', upload.array('files'), async (req : any, res) => {
    //     // console.log(req.body);
    //     let filesMap : { [key:string]: SubmittedFile } = {};

    //     for (let i = 0; i < req.files.length; i++) {
    //         const item = req.files[i];
    //         const title = req.body.titles[i];
    //         filesMap[title] = {
    //             originalname: item.originalname,
    //             title: title,
    //             destination: item.destination,
    //             mimetype: item.mimetype,
    //             encoding: item.encoding,
    //             size: item.size,
    //             filename: item.filename,
    //             path: item.path,
    //             category: req.body.categories[i],
    //             commentary: req.body.comments[i]
    //         }
    //     }
    //     // db  .get('submissions')
    //     //     .push({ files: files,  })
    //     res.sendFile(join(__dirname, 'views', 'submitted.html'));
    // });

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