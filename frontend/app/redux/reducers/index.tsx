import * as types from '../../types/types';
import { combineReducers } from "redux";
import *  as actions from '../actions/actions';
import axios from "axios";


const init: types.ITeaPartyState  = {
    vs: [],
    user:  new types.User("","","","","","",[],[],[]),
    submissions: []
};

const PATH = ""

const postVS = (state:types.ITeaPartyState, name:string, startingDate: Date, endingDate: Date, role: Number): types.ITeaPartyState =>{
    let newState: types.ITeaPartyState= { ...state }; 
    
    let post = axios.post(PATH+'/post-vs', {
        name: name,
        starting_date: startingDate,
        ending_date: endingDate,
    }).then(response => {
        newState.vs = response.data;
    });

    
    return newState;
      
}

const close_open_vs = (state:types.ITeaPartyState, voting_session:string, closed: boolean, role : Number): types.ITeaPartyState =>{
    let newState: types.ITeaPartyState= { ...state }; 
    
    let post = axios.put(PATH+'close_open_vs', {
        voting_session: voting_session,
        closed: closed
    }).then(response => {
        newState.vs = response.data;
    });
    return newState; 
}

const vote_sub = (state:types.ITeaPartyState, vote: Number, voting_session:string, voter_id:string, sub_id:string): types.ITeaPartyState =>{
    let newState: types.ITeaPartyState= { ...state }; 
    
    let post = axios.post(PATH+'vote-sub', {
        voting_session: voting_session,
        closed: closed
    }).then(response => {
        newState.vs = response.data;
    });

 
    return newState; 
}

const vs_between_dates = (state:types.ITeaPartyState, start_date:string, end_date:string): types.ITeaPartyState =>{
    let newState: types.ITeaPartyState= { ...state }; 
    
    let post = axios.put(PATH+'voting-session-between-dates', {
        start_date: start_date,
        end_date: end_date
    }).then(response => {
        newState.vs = response.data;
    });
    
    return newState; 
}


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

function TeaPartyReducer(state: types.ITeaPartyState| undefined, action: types.TeaPartyActions): types.ITeaPartyState {

    if( state === undefined){
        return init;
    }

    switch (action.type) {
        case types.ActionTypes.POST_VS: return postVS(state,action.payload.name,action.payload.starting_date, action.payload.ending_date, action.payload.role);
        case types.ActionTypes.CLOSE_OPEN_VS: return close_open_vs(state,action.payload.voting_session,action.payload.closed, action.payload.role);
        case types.ActionTypes.VOTE_SUB: return vote_sub(state,action.payload.vote,action.payload.voting_session,action.payload.voter_id,action.payload.sub_id);
        case types.ActionTypes.VS_BETWEEN_DATES: return vs_between_dates(state, action.payload.start_date,action.payload.end_date)
        //case VS_NAME:
        //case REQUEST_EDIT:
        //case POST_EDIT:
        default:
            return state
              
    }
}

export const reducer = combineReducers({
    submissionView,
    TeaPartyReducer
});