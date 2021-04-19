
import { Router } from 'express';
import { join } from 'path';

type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    UFID: string;
    pronouns: string;
    type: "staff"|"author"|"editor"|"eic";
}

export const usersTable: {[key: string]: User} = {
    '1': {
        id: '1',
        name: 'Staff McStaffyface',
        email: "staff@ufl.edu",
        password: "test",
        pronouns: "they/them",
        type: "staff",
        UFID: "00000000"
    },
    '2': {
        id: '2',
        name: 'Aidan Thomas',
        email: "author@ufl.edu",
        password: "test",
        pronouns: "he/they",
        type: 'author',
        UFID: "11111111"
    }
};
