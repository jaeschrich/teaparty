
export type Submission = {
    file: File|null;
    title: string;
    comment: string;
    category: string;
    key: string;
    editing: boolean;
}


export const acceptMap : { [key: string] : string } = ({
    "prose": ".doc,.docx,.pdf,.txt",
    "poetry": ".doc,.docx,.pdf,.txt",
    "photography": ".jpg,.jpeg,.png,.gif",
    "visual-art": ".jpg,.jpeg,.png,.gif"
});

const accept = acceptMap[state.category];
