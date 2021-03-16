import { Document } from "mongoose"

export interface IUser extends Document {
  name: string
  password: string
  role: number
}