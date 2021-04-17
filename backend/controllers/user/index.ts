import { Response, Request } from "express"
import { IUser } from "../../types/types"
import User from "../../models/user"


const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] = await User.find().select(['-password'])
    res.status(200).json({ users })
  } catch (error) {
    throw error
  }
}

const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user : IUser[] = await User.find({email: req.body.email}, function (err:any, results:any) {
      if (!results) { 
        res.status(200).json({message:"User not found", error: err})
      }
      else {
        res.status(200).json({user})
      }
    })

    res.status(200).json({ user })

  } catch (error) {
    res.status(400).json({error})
    throw error
  }
}


// Should import hashPassword functionality 
const addUser = async (req: Request, res: Response): Promise<void> => {
    try {

      const body = req.body as Pick<IUser, "name" | "password" | "role" | "penName" | "email">
      const user: IUser= new User({
        name: body.name,
        password: body.password,
        role: body.role,
        penName: body.penName,
        intro: "",
        content: [],
        submissions: [],
        requested_edit_submissions: [],
        vote_log: [],
        email: body.email
      })
  
      const newUser: IUser = await user.save()

      const allUsers: IUser[] = await User.find()
  
      res
        .status(201)
        .json({ message: "User added", user: newUser, users: allUsers })
    } catch (error) {
      res
      .status(400)
      .json({error })
      throw error
    }
  }

const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const updateUser: IUser | null = await User.findByIdAndUpdate(
        { _id: req.body._id },
        req.body
      )
      const allUsers: IUser[] = await User.find()
      res.status(200).json({
        message: "User updated",
        user: updateUser,
        users: allUsers,
      })
    } catch (error) {
      res.status(400).json({error})
      throw error
    }
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedUser: IUser | null = await User.findByIdAndRemove(
        req.params.id
      )
      const allUsers: IUser[] = await User.find()
      res.status(200).json({
        message: "User deleted",
        user: deletedUser,
        todos: allUsers,
      })
    } catch (error) {
      throw error
    }
  }
  
  export { getUsers, getUser, addUser, updateUser, deleteUser, }


  