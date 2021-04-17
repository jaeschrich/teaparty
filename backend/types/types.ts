import { Document } from "mongoose"

export interface IUser extends Document {
  name: string,
  password: string,
  role: number,
  email: string,
  penName: string,
  intro: string,
  content: [
    {
      link: String,
      comment: String,
    }],
  submissions: Array<string>,
  requested_edit_submissions:[
  {
    sub_id: String, 
    comments: String,
  }],
  vote_log:[{
    submission: String,
    vote: number,
  }] // submission, vote

}

export interface Content {
  author_id: string,
  comment: string,
  link: string,
}


export interface ISubmission extends Document {
  author: string,
  comments: string,
  accepted: number, // 0 - not reviewed / 1 - rejected / 2 accepted
  voting_session:  string,
  link: string,
  title: string,
  category: string,
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
  resubmissions_array: [
    {
      sub_id: String,
      comments: String,
    }]
}



