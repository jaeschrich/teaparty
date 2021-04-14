import { IUser } from "../types/types"
import { model, Schema } from "mongoose"




const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      required: true, // 0 author / 1 staff / 2 editor / editor-in-chief
    },
    penName: {
      type: String,
      required: true,
    },
    intro: {
      type: String,
      required: false
    },
    content: [
      {
        link: {type: String, required: true},
        comment: {type: String, required: true}
      }]
    , 
    submissions: {
      type: Array,
      required: false
    },
    requested_edit_submissions: {
      type: Array,
      required: false
    },
    vote_log : [ {
      submission: {type: String, required: true},
      vote: {type: Number, required: true}
    }]
  },
  { timestamps: true }
)

export default model<IUser>("User", userSchema)



//vote_log:Array<[String,number]> // submission, vote
//accept_reject_array: Array<string>

