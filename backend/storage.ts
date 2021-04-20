import multer from 'multer';
import { nanoid } from 'nanoid';
import { join, extname } from 'path';
import { stat, mkdir } from 'fs/promises';
import low from 'lowdb';
import { createPassword } from './accounts';
import { Submission, User, SubmissionFile } from '../shared/StorageTypes';

const Memory: low.AdapterSync = require('lowdb/adapters/Memory');

export const storage = multer.diskStorage({
    destination: function(req: any, file, cb) {
        let authorPrefix = req.session.user.UFID;
        let path = join(__dirname, '..', 'data', 'files', authorPrefix + "_" + req.session.user.id);
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
    filename: function(req, file: any, cb) {
        file.id = nanoid();
        cb(null, file.id + extname(file.originalname));
    }
});

type Schema = {
    submissions: Submission[],
    users: User,
    files: SubmissionFile[],
    pseudos: {
        user: string; // id
        value: string;
    }
}

export const db: any = low(new Memory<Schema>(""));

db.set('users', [
    {
        id: '1',
        name: 'Staff McStaffyface',
        email: "staff@ufl.edu",
        password: createPassword("test"),
        pronouns: "they/them",
        statement: "",
        type: "staff",
        UFID: "00000000"
    },
    {
        id: '2',
        name: 'Aidan Thomas',
        email: "author@ufl.edu",
        password: createPassword("test"),
        pronouns: "he/they",
        statement: "",
        type: 'author',
        UFID: "11111111"
    }
]).write();
db.set('submissions', []).write();

export const upload = multer({ storage });