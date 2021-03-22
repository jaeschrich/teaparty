import { Submission } from "./types/Submission";

export type AppState = {
    name: string;
    email: string;
    UFID: string;
    statement: string;
    submissions: Submission[];
    error: string|null;
}

export function intoFormData(state : AppState) : FormData {
    let data = new FormData();
    data.append('name', state.name);
    data.append('email', state.email);
    data.append('statement', state.statement);
    data.append('UFID', state.UFID);
    for (let sub of state.submissions) {
        data.append('titles', sub.title);
        data.append('categories', sub.category);
        data.append('comments', sub.comment);
    }
    for (let sub of state.submissions) {
        data.append('files', sub.file!);
    }

    return data;
}

export type Action = {
    type: "set-name"|"set-email"|"set-statement"|"add-submission"|"delete-submission"|"update-submission";
    payload: any;
}

export const emptyState : AppState = {
    name: "",
    email: "",
    UFID: "",
    statement: "",
    submissions: [],
    error: null
}

export function reducer(state : AppState, action: any) : AppState {
    switch(action.type) {
        case 'set-name':
            return { ...state, name: action.payload };
        case 'set-email':
            return { ...state, email: action.payload };
        case 'set-statement':
            return { ...state, statement: action.payload };
        case 'add-submission': {
            const newSub: Submission = {
                category: "prose",
                key: new Date().toISOString(),
                file: null,
                title: "",
                comment: "",
                editing: true
            }
            return { ...state, submissions: [newSub].concat(state.submissions) }
        }
        case 'delete-submission': {
            let subs = state.submissions.filter(x => x !== action.payload);
            return { ...state, submissions: subs };
        }
        case 'set-ufid' : {
            return { ...state, UFID: action.payload };
        }
        case 'update-submission': {
            let subs = state.submissions.slice();
            let index = state.submissions.indexOf(action.payload.oldValue);
            subs[index] = action.payload.newValue;
            return { ...state, submissions: subs };
        }
        case 'set-error': {
            return { ...state, error: action.payload }
        }
        default:
            return state;
    }
}