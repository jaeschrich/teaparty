

export function reducer(state = { names: [] }, action : any) {
    switch(action.type) {
        case 'FETCH_NAMES':
            return { names: action.payload };
        default:
            return state;
    }
}