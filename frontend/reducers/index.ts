import { combineReducers } from "redux";


export function submissionView(state = { names: [], scrollLeft: 0 }, action: any) {
    switch(action.type) {
        case 'FETCH_NAMES':
            return { names: action.payload, scrollLeft: state.scrollLeft };
        case 'submission-view/store-scroll-pos':
            return { names: state.names, scrollLeft: action.payload };
        default:
            return state;
    }
}

export const reducer = combineReducers({
    submissionView
});