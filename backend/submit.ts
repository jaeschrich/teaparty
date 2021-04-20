import express, { json, Router } from 'express';
import { join } from 'path';
import { nanoid } from 'nanoid';
import { rm } from 'fs/promises';
import { Submission, SubmissionFile, acceptMap } from '../shared/StorageTypes';
import { upload, db } from './storage';
import { extract, extractFrom } from '../shared';

// const fileTable: {[key: string]: SubmissionFile} = {};
// const submissionsTable: {[key: string]: Submission}  = {};
// let statementTable: {[key: string]: string} = {};

export const router = Router();

router.get('/', (req, res) => {
    res.sendFile(join(__dirname, '..', 'views', 'submit.html'));
});

router.get('/state', (req: any, res) => {
    let subs = db.get('submissions').filter({ author: req.session.user.id }).map(extract({
        title: true, 
        category: true, 
        comment: true, 
        id: true, 
        file: {
            originalname: 'filename'
        }
    }));
    let user: any = db.get('users').find({ id: req.session.user.id });
    let ob = {
        submissions: subs.value(),
        statement: user.value().statement 
    };
    console.log(JSON.stringify(ob, null, 2))

    res.json(ob);
});

router.put('/statement', (req: any, res) => {
    db.get('users').find({ id: req.session.user.id }).assign({ statement: req.body.statement }).write();
    res.send();
})

router.put('/item', upload.single('file'), async (req:any, res) => {
    let id = req.body.id;
    const sub = db.get('submissions').find({ id });
    if (req.file) {
        if (sub.value()) {
            await rm(sub.value().file.path);
            db.get('submissions').remove({ id }).write();
            id = nanoid();
        }
    }

    if (sub.value()) {
        sub.update((x: any) => {
            return {
                id,
                file: x.file,
                author: req.session.user.id,
                category: req.body.category,
                title: req.body.title,
                comment: req.body.comment       
            }
        }).write();
    } else {
        db.get('submissions').push({
            id,
            file: req.file,
            author: req.session.user.id,
            category: req.body.category,
            title: req.body.title,
            comment: req.body.comment       
        }).write();
    }
    console.log(sub.value())
    res.send({ id, filename: sub.value().file.originalname });
});

router.delete('/item', async (req, res) => {
    let id = req.body.id;
    const sub = db.get('submissions').find({ id });
    if (sub.value()) {
        await rm(sub.value().file.path);
        db.get('submissions').remove({ id }).write();
        res.send({ id });
    } else res.status(500).send({ id })
});