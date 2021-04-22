import express, { json, Router } from 'express';
import { join } from 'path';
import { nanoid } from 'nanoid';
import { rm } from 'fs/promises';
import { Submission, SubmissionFile, acceptMap } from '../shared/StorageTypes';
import { upload, db, getSubmissions, getUserById, setStatement, removeSubmission, updateSubmission, createSubmission, getSubmission } from './storage';
import { extract } from '../shared';

export const router = Router();

router.get('/', (req, res) => {
    res.sendFile(join(__dirname, '..', 'views', 'submit.html'));
});

router.get('/state', async (req: any, res) => {
    let subs = (await getSubmissions(req.session.user.id)).map(extract({
        title: true, 
        category: true, 
        comment: true, 
        id: true, 
        file: {
            originalname: 'filename'
        }
    }));
    let user: any = await getUserById(req.session.user.id);
    let ob = {
        submissions: subs,
        statement: user.statement 
    };

    res.json(ob);
});

router.put('/statement', async (req: any, res) => {
    await setStatement(req.session.user.id, req.body.statement);
    res.send();
})

router.put('/item', upload.single('file'), async (req:any, res) => {
    let id = req.body.id;
    let sub = await getSubmission(id);
    if (req.file) {
        if (sub) {
            await rm(sub.file.path);
            await removeSubmission(id);
            id = nanoid();
            sub = undefined;
        }
    }

    if (sub) {
        sub = await updateSubmission(id,  {
            id,
            author: req.session.user.id,
            category: req.body.category,
            title: req.body.title,
            comment: req.body.comment, 
        });
    } else {
        sub = await createSubmission({
            id,
            file: req.file,
            author: req.session.user.id,
            category: req.body.category,
            title: req.body.title,
            comment: req.body.comment,
        });
    }
    res.send({ id, filename: sub.file.originalname });
});

router.delete('/item', async (req, res) => {
    let id = req.body.id;
    let sub = await getSubmission(id);

    if (sub) {
        await rm(sub.file.path);
        await removeSubmission(id);
        res.send({ id });
    } else res.status(500).send({ id })
});