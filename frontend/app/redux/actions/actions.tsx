import { action } from 'typesafe-actions';
import *  as types from '../../types/types';
  

export function postVS(name:string, starting_date: Date, ending_date: Date, role: Number) {
    return action(types.ActionTypes.POST_VS, { 
            name,
            starting_date,
            ending_date, 
            role
    });
}


export function close_open_vs(voting_session:string, closed: boolean, role: number) {
    return action(types.ActionTypes.CLOSE_OPEN_VS, { 
        voting_session,
        closed,
        role
    });
}

export function vote_sub(vote: Number, voting_session:string, voter_id:string, sub_id:string) {
    return action(types.ActionTypes.VOTE_SUB, { 
        vote,
        voting_session,
        voter_id,
        sub_id
    });
}

export function vs_between_dates(start_date:string, end_date:string) {
    return action(types.ActionTypes.VS_BETWEEN_DATES, { 
        start_date,
        end_date,
    });
}











