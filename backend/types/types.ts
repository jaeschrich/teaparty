import { Document } from "mongoose"

export interface IUser extends Document {
  name: string,
  password: string,
  role: number,
  penName: string,
  intro: string,
  content: [
    {
      link: String,
      comment: String,
    }],
  submissions: Array<string>,
  requested_edit_submissions:Array<string>,
  submissions_array_vote:Array<string>,
  vote_log:Array<String> // submission, vote

}

export interface Content {
  author_id: string,
  comment: string,
  link: string,
}


export interface ISubmission extends Document {
  id_content: string,
  author:  string,
  comments:  string,
  accepted: number, // 0 - not reviewed / 1 - rejected / 2 accepted
  voting_session:  string,
}

export interface IVotingSession extends Document {
  name: string,
  opening_date: Date,
  closing_date: Date,
  submissions_array: [
    {
      sub_id: String,
      count: number,
    }],
}


export interface IContent extends Document {
  author_id: string,
  comment: Date,
  link: Date,
}

export class Vote {
  _id: string;
  count: number;

  constructor(
      _id: string,
      count: number
  ){
    this._id = _id;
    this.count = count;
  }
}


