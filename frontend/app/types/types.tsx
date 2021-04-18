
import { ActionType } from 'typesafe-actions';
import * as actions from '../redux/actions/actions';

export interface ITeaPartyState {
    vs: Array<Voting_Session> //
    user: User
    submissions: Array<Submission>
}

export class User {
    id: string;
    name: string;
    password?: string;
    email: string;
    penName: string;
    intro: string;
    submissions: Array<string>;
    requested_edit_submissions: Array<[string,string,string,string,boolean]>;
    vote_log: Array<[String,String]>;


    constructor(id:string, name: string,em: string, pass: string, penName: string, intro:string, submissions:Array<string>, requested_edit_submissions:Array<[string,string,string,string,boolean]>,vote_log:Array<[String,String]>) {
        this.id =id;
        this.name = name;
        this.email = em;
        this.password = pass;
        this.penName = penName
        this.intro = intro;
        this.submissions = submissions;
        this.requested_edit_submissions = requested_edit_submissions;
        this.vote_log = vote_log;
    }
}

export class Submission {
    author: string;
    comments: string;
    accepted: Number;
    voting_sessions: string;
    link: string;
    title: string;
    category: string;

    constructor( author: string,
        comments: string,
        accepted: Number,
        voting_sessions: string,
        link: string,
        title: string,
        category: string) {
            this.author = author;
            this.comments = comments;
            this.accepted = accepted;
            this.voting_sessions = voting_sessions;
            this.link = link;
            this.title = title;
            this.category= category;
    }
}

export class Voting_Session {
    name: string;
    opening_date: Date;
    closing_date: Date;
    submissions_array: Array<[sub_id: string, count: Number]>;
    resubmissions_array: Array<[sub_id: string, comment_from_editor:string, comment_from_author:string,newLink:string,resubmitted:Boolean]> ;
    closed: string;

    
    constructor( name: string,
        opening_date: Date,
        closing_date: Date,
        submission_array: Array<[sub_id: string, count: Number]>,
        resubmissions_array: Array<[sub_id: string, comment_from_editor:string, comment_from_author:string,newLink:string,resubmitted:Boolean]>,
        closed: string) {
            this.name = name ;
            this.opening_date = opening_date;
            this.closing_date = closing_date;
            this.submissions_array = submission_array;
            this.resubmissions_array = resubmissions_array;
            this.closed = closed;
    }
}

export enum ActionTypes{
    POST_VS = 'POST_VS',
    CLOSE_OPEN_VS = 'CLOSE_OPEN_VS',
    VOTE_SUB = 'VOTE_SUB',
    VS_BETWEEN_DATES = 'VS_BETWEEN_DATES',
    VS_NAME = 'VS_NAME',
    REQUEST_EDIT = 'REQUEST_EDIT',
    POST_EDIT ='POST_EDIT'
}

export type TeaPartyActions = ActionType<typeof actions>;