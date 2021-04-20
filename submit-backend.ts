import express, { Router } from 'express';
import { join } from 'path';
import html from './shared/html';
import { upload } from './backend/storage';
import { nanoid } from 'nanoid';
import { rm } from 'fs/promises';
import { Submission, SubmissionFile, acceptMap } from './shared/StorageTypes';

const fileTable: {[key: string]: SubmissionFile} = {};
const submissionsTable: {[key: string]: Submission}  = {};
let submissions = {};

export const router = Router();

router.post('/', (req, res) => {

})

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

router.post('/file', upload.single('file'), (req: any, res) => {
    fileTable[req.file.id] = {
        ...req.file
    };
    
    res.send({ id: req.file.id, filename: req.file.filename });
});

router.delete('/file/:id', async (req, res) => {
    console.log(fileTable[req.params.id]);
    await rm(fileTable[req.params.id].path); // super dangerous but it should be ok, because the path comes from multer
    delete fileTable[req.params.id];
    res.send({ id: req.params.id });
});