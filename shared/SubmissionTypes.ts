// massive hack
// we're going to store the files table in memory rather create a new db collection
export type SubmissionFile = {
    originalname : string, 
    encoding : string, 
    mimetype : string, 
    size : number, 
    destination : string, 
    filename : string, 
    path : string,
}

export type Submission = { 
    file: string; // id
    author: string; // id
    category: "prose"|"poetry"|"visual-art"|"photography";
    id: string;
    title: string;
    comment: string;
}

export const acceptMap : { [key: string] : string } = ({
    "prose": ".doc,.docx,.pdf,.txt",
    "poetry": ".doc,.docx,.pdf,.txt",
    "photography": ".jpg,.jpeg,.png,.gif",
    "visual-art": ".jpg,.jpeg,.png,.gif"
});
