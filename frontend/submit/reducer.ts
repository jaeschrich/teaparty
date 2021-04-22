import { Submission } from "./types/Submission";

export type AppState = {
    name: { value: string, isValid: boolean };
    email: { value: string, isValid: boolean };
    UFID: { value: string, isValid: boolean };
    statement: { value: string, isValid: boolean };
    submissions: Submission[];
    error: string|null;
}

export function intoFormData(state : AppState) : any {
    let data = {
        'statement': state.statement.value,
        'submissions': state.submissions
    };
    return data;
}

export type Action = {
    type: "set-name"|"set-email"|"set-statement"|"add-submission"|"delete-submission"|"update-submission";
    payload: any;
}

export const emptyState : AppState = {
    name: {value: "", isValid: false},
    email: {value: "", isValid: false},
    UFID: {value: "", isValid: false},
    statement: {value: "", isValid: false},
    submissions: [],
    error: null
}

export function isValidState(state : AppState):boolean {
    let editing = state.submissions.filter(x=>x.editing).length > 0;
    let validInputs = state.statement.isValid;

    return (!editing) && validInputs && state.submissions.length > 0;
}

export function reducer(state : AppState, action: any) : AppState {
    switch(action.type) {
        case 'set-name':
            return { ...state, name: action.payload };
        case 'set-email':
            return { ...state, email: action.payload };
        case 'set-statement':
            return { ...state, statement: action.payload };
        case 'set-ufid' : {
            return { ...state, UFID: action.payload };
        }    
        case 'add-submission': {
            const newSub: Submission = {
                category: "",
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
