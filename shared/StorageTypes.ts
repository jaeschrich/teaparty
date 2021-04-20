// massive hack
// we're going to store the files table in memory rather create a new db collection

export type PasswordEntry = {
    hash: string;
    salt: string;
}

export type SubmissionFile = {
    originalname : string, 
    encoding : string, 
    mimetype : string, 
    size : number, 
    destination : string, 
    filename : string, 
    path : string
}

export enum SubmissionCategory {
    prose = "prose",
    poetry = "poetry",
    visualArt = "visual-art",
    photography = "photography"
}

export enum VoteType {
    yes = "yes",
    no = "no",
    abstain = "abstain"
}

export enum UserType {
    staff = "staff",
    author = "author",
    editor = "editor",
    eic = "editor-in-chief"
}

export type Submission = { 
    author: string; // id
    category: SubmissionCategory;
    id: string;
    title: string;
    comment: string;
    file: SubmissionFile,
    votes: { [id: string]: VoteType }
}

export type User = {
    id: string;
    name: string;
    email: string;
    password: PasswordEntry
    UFID: string;
    pronouns: string;
    type: UserType;
    statement: string;
}


export const acceptMap : { [key: string] : string } = ({
    [SubmissionCategory.prose]: ".doc,.docx,.pdf,.txt",
    [SubmissionCategory.poetry]: ".doc,.docx,.pdf,.txt",
    [SubmissionCategory.photography]: ".jpg,.jpeg,.png,.gif",
    [SubmissionCategory.visualArt]: ".jpg,.jpeg,.png,.gif"
});
