import express, { json, Router } from 'express';
import { join } from 'path';
import { nanoid } from 'nanoid';
import { rm } from 'fs/promises';
import { Submission, SubmissionFile, acceptMap } from '../shared/SubmissionTypes';
import { upload } from './storage';

const fileTable: {[key: string]: SubmissionFile} = {};
const submissionsTable: {[key: string]: Submission}  = {};
let statementTable: {[key: string]: string} = {};

export const router = Router();

router.get('/', (req, res) => {
    res.sendFile(join(__dirname, '..', 'views', 'submit.html'));
});

router.get('/state', (req: any, res) => {
    let ob = {
        submissions: Object.values(submissionsTable).filter(item => item.author === req.session.user.id).map(({ title, category, comment, file, id }) => {
                        return {
                            title, category, comment, id, 
                            file: { value: file, filename: fileTable[file].originalname }
                        }
                    }),
        statement: statementTable[req.session.user.id] || ""
    };
    console.log(statementTable)

    res.json(ob);
});

router.put('/statement', (req: any, res) => {
    statementTable[req.session.user.id] = req.body.statement;
    res.send();
})

router.put('/item', upload.single('file'), async (req:any, res) => {
    const id = req.body.id;
    const fileID = req.body.file || nanoid();
    if (req.file) {
        if (fileTable[fileID]) await rm(fileTable[fileID].path);
        fileTable[fileID] = req.file;
    }
    let file = { value: fileID, filename: fileTable[fileID].originalname };

    if (!fileTable[fileID]) res.status(500).send({ error: "invalid" })
    submissionsTable[id] = {
        id,
        file: fileID,
        author: req.session.user.id,
        category: req.body.category,
        title: req.body.title,
        comment: req.body.comment
    };
    res.send({ id, file });
});

router.delete('/item', async (req, res) => {
    console.log(req.body, submissionsTable)
    let id = req.body.id;
    if (submissionsTable[id]) {
        let entry = submissionsTable[id];
        await rm(fileTable[entry.file].path);
        delete fileTable[entry.file]; // TODO: remove file from HD too
    }
    delete submissionsTable[id];
    res.send({ id });
});