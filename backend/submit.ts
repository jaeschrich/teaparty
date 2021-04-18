import express, { Router } from 'express';
import { join } from 'path';
import { nanoid } from 'nanoid';
import { rm } from 'fs/promises';
import { Submission, SubmissionFile, acceptMap } from '../shared/SubmissionTypes';
import { upload } from './storage';

const fileTable: {[key: string]: SubmissionFile} = {};
const submissionsTable: {[key: string]: Submission}  = {};
let submissions = {};

export const router = Router();

router.get('/', (req, res) => {
    res.sendFile(join(__dirname, '..', 'views', 'submit.html'));
});

router.get('/items', (req, res) => {
    res.json(Object.values(submissions));
});

router.post('/item', (req, res) => {
    console.log(req.body)
});

router.patch('/item/:id', (req, res) => {
    const id = req.params.id;
    submissionsTable[id] = {
        id,
        file: req.body.fileID,
        category: req.body.category,
        title: req.body.title,
        author: "FAKE_AUTHOR_ID",
        comment: req.body.comment
    };
    res.json(submissionsTable[id]);
});

router.delete('/item/:id', async (req, res) => {
    if (submissionsTable[req.params.id]) {
        let entry = submissionsTable[req.params.id];
        delete fileTable[entry.file]; // TODO: remove file from HD too
    }
    delete submissionsTable[req.params.id];
    res.send({ id: req.params.id });
});

router.post('/file', upload.single('file'), (req, res) => {
    let id = nanoid();
    fileTable[id] = {
        ...req.file
    }
    res.send({ id, filename: req.file.originalname });
});

router.delete('/file/:id', async (req, res) => {
    // super dangerous but it should be ok, because the path comes from multer
    await rm(fileTable[req.params.id].path);
    delete fileTable[req.params.id];
    res.send({ id: req.params.id });
});

router.post('/', (req, res) => {
    for (let sub of req.body) {
        let id = nanoid();
        submissionsTable[id] = {
            id,
            ...sub
        };
        console.log(submissionsTable[id]);
    }
    res.send({ redirectTo: "/submitted" });
});