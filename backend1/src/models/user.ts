import { IUser } from "../types/user"
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
      required: true,
    },
  },
  { timestamps: true }
)

export default model<IUser>("User", userSchema)