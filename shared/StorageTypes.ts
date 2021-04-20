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

export type Submission = { 
    
    author: string; // id
    category: "prose"|"poetry"|"visual-art"|"photography";
    id: string;
    title: string;
    comment: string;
    file: SubmissionFile
}

export type User = {
    id: string;
    name: string;
    email: string;
    password: PasswordEntry
    UFID: string;
    pronouns: string;
    type: "staff"|"author"|"editor"|"eic";
    statement: string;
}



export const acceptMap : { [key: string] : string } = ({
    "prose": ".doc,.docx,.pdf,.txt",
    "poetry": ".doc,.docx,.pdf,.txt",
    "photography": ".jpg,.jpeg,.png,.gif",
    "visual-art": ".jpg,.jpeg,.png,.gif"
});
