import { IVotingSession} from "../types/types"
import { model, Schema } from "mongoose"

const votingSessionSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    opening_date: {
      type: Date,
      required: true,
    },
    closing_date: {
      type: Date,
      required: true,
    },
    submissions_array:[
        {
          sub_id: {type: String, required: true},
          count: {type: Number, required: true}
        }],
    resubmissions_array:
    [
      {
      sub_id: {type: String, required: true},
      comment_from_editor: {type: String, required: true},
      comment_from_author: {type: String, required: false},
      new_link: {type: String, required: false},
      resubmitted: {type: Boolean, required: false}
      }
    ],
    
    closed: {
      type: Boolean,
      required: true,
    }
  },
  { timestamps: true }
)

export default model<IVotingSession>("VotingSession", votingSessionSchema)
