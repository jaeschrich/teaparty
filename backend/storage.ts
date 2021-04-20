import multer from 'multer';
import { nanoid } from 'nanoid';
import { join, extname } from 'path';
import { stat, mkdir } from 'fs/promises';
import low from 'lowdb';
import { createPassword } from './accounts';
import { Submission, User, SubmissionFile, VoteType } from '../shared/StorageTypes';
import FileSync from 'lowdb/adapters/FileSync';
import { allNamesRandomized } from '../shared/generateNames';

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

type UserType = "author"|""

export async function createUser({ email, password, UFID, pronouns, type }: { email: string, password: string, UFID: string, pronouns: string, name: string, type: UserType }) {
    const id = nanoid();
    UFID = UFID.split('').filter((c: any) => c in "0123456789".split('')).join('');
    const seqID = db.get('users-seqID').value();
    db.set('users-seqID', seqID + 1).write();

    let user = {
        id, email, UFID, pronouns, type, 
        password: createPassword(password),
        statement: "", 
        seqID
    }
    db.get('users').push(user).write();
    return user;
}

export async function getUserById(id: string) {
    return db.get('users').find({ id }).value();
}

export async function getUserByEmail(email: string) {
    return db.get('users').find({ email }).value();
}

export async function getSubmissions(id?: string|undefined) {
    if (id) {
        return db.get('submissions').filter({ author: id }).value();
    } else return db.get('submissions').value();
}

export async function getSubmission(id: string, by: string = "id") {
    return db.get('submissions').find({ [by]: id }).value();
}

export async function createSubmission({ id, file, author, category, title, comment } : { 
    file: Express.Multer.File,
    author: string,
    id: string,
    category: string,
    title: string,
    comment: string   
}) {
    let sub = {
        id, file, author, category, title, comment,
        votes: {}
    }
    db.get('submissions').push(sub).write();
    return sub;
}

export async function updateSubmission(id: string, sub: any) {
    db.get('submissions').find({ id }).update((old: any) => {
        let keys = Object.keys(sub);
        let newObject = Object.assign({}, old);
        for (let key of keys) {
            if (key in sub) {
                newObject[key] = sub[key];
            }
        }
        return newObject;
    }).write();
    return db.get('submissions').find({ id })
}

export async function setVote(subID: string, userID: string, vote: VoteType) {
    db.get('submissions').find({ id : subID }).set(`votes.${userID}`, vote).write();
}

export async function setStatement(id: string, statement: string) {
    db.get('users').find({ id }).assign({ statement }).write();
}

export async function removeSubmission(id: string) {
    db.get('submissions').remove({ id }).write();
}

export async function getPennameFor(id: string) {
    let seqID = db.get('users').find({ id }).value().seqID;
    return pennames.get(`names.${seqID}`).value();
}

type Schema = {
    submissions: Submission[],
    users: User,
    files: SubmissionFile[],
    pseudos: {
        user: string; // id
        value: string;
    }
}

export const db: any = low(new FileSync<any>(join(__dirname, '..', 'data', 'db.json'), {
    defaultValue: {
        users: [
          {
            "id": "Lrfq6OQ4u08g9bFykmDzX",
            "name": "Staff Stafferstein",
            "email": "staff@ufl.edu",
            "password": {
              "salt": "3c55c67f221f892b",
              "hash": "4c001ac14a428459a7708310af4329d13bde4e78583cc737547bf62351a9735a"
            },
            "pronouns": "they/them",
            "statement": "",
            "type": "staff",
            "UFID": "00000000",
            "seqID": 0
          },
          {
            "id": "6pubF8s1zVIXzPmS-1rRu",
            "name": "Author Authorson",
            "email": "author@ufl.edu",
            "password": {
              "salt": "2eb16dca9d1a45b1",
              "hash": "69f465272b33daf68b13186607f6cdd12a5208ed19386408ecea27a26a4dc169"
            },
            "pronouns": "he/they",
            "statement": "I am the default author",
            "type": "author",
            "UFID": "11111111",
            "seqID": 1
          }
        ],
        submissions: [],
        sessions: [],
        "users-seqID": 2,
        "pennames": []
    }
}));

export const pennames = low(new FileSync(join(__dirname, '..', 'data', 'pennames.json'), {
    defaultValue: {
        names: []
    },
    serialize: (ob) => JSON.stringify(ob)
}));

if (pennames.get('names').value().length === 0) {
    pennames.set('names', allNamesRandomized()).write();
}

export const upload = multer({ storage });