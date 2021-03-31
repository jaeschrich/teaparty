import { IVotingSession , Vote} from "../types/types"
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
    submissions_array:{
      type: Array,
      required: false
    },
  },
  { timestamps: true }
)

export default model<IVotingSession>("VotingSession", votingSessionSchema)
