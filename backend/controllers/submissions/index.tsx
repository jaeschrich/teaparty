import { Response, Request } from "express"
import { ISubmission, IContent, IUser} from "../../types/types"
import Submission from "../../models/submission"
import Content from "../../models/content"

import User from "../../models/user"

import { IVotingSession, Vote } from "../../types/types"
import VotingSession from "../../models/voting_session"; // VotingSession -> VS

const getAllSub = async (res: Response): Promise<void> => { 
  try {
 
    const submission: ISubmission[] = await Submission.find()
    res.status(200).json({ submission})
  } catch (error) {
    throw error
  }
}
/*
export interface VotingSessionModel extends ISubmission
*/
const getVSSubmissionsByName = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as any;
    const vs: IVotingSession[] = await VotingSession.find({ name: body.name});
    res.status(200).json({vs})
  }catch (error) {
    throw error
  }
}

const getVSSubBetweenDates = async (req: Request, res: Response): Promise<void> => {
  try {

      const body = req.body as any; // start date // end_date
      const response: IVotingSession[] = await VotingSession.find({ //query today up to tonight
         createdAt: {
      $gte: body.start_date, //Date (2012 , 7 , 14)
      $lt: body.end_date
      }});
      
      console.log(response);
      res.status(200).json({response})
       
    }catch (error) {
     
    throw error
  }
}

const postVotingSession = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = req.body as Pick<IVotingSession, "name" | "opening_date" | "closing_date">
      const vs: IVotingSession = new VotingSession({
        name: body.name,
        opening_date: body.opening_date,
        closing_date: body.closing_date,
        submissions_array: [],
      })

      const vs_post : IVotingSession = await vs.save()
      res.status(200).json({vs_post})
    } catch (error) {
      throw error
    }
  }



const postContent = async (req: Request, res: Response): Promise<void> => { // Not done
  try {
    console.log("Starting request..")
    
      const body = req.body as Pick<IContent,  "author_id" | "comment" | "link">
      const content = {
      link: String(body.link),
      comment: String(body.comment)
    }

    console.log("Finding User ...")
    let result = await User.findById(body.author_id);
    console.log("Found User")
    result?.content.push(content);

    //const newContent: IContent = await content.save()

    //const updatedUser = await User.findOneAndUpdate({_id:body.author_id},
    // {$push: {content: content}});
    //const allUsers: IUser[] = await Voting.find()

    res.status(201).json({ message: "Content Posted", user: result})
  } catch (error) {
    throw error
  }
}

//const getAllSubAuthor 

const postSub = async (req: Request, res: Response): Promise<void> => { // Not done
    try {
      
        const body = req.body as Pick<ISubmission, "id_content" | "author" | "comments" | "accepted"| "voting_session"| "link">
        const submission: ISubmission = new Submission({
        id_content: body.id_content,
        password: body.author,
        comments: body.comments,
        accepted: 0,
        voting_Session: body.voting_session,
        link: body.link
      })
  
      const newSubmission: ISubmission = await submission.save()
      const vote: Vote = {_id:submission._id, count:0};

      const UpdatedVotingSession = VotingSession.update(
        { _id: submission.voting_session }, 
        { $push: { submissions_array: vote } },
    );
      //const allUsers: IUser[] = await Voting.find()
  
      res
        .status(201)
        .json({ message: "Submission Posted", votingSession: UpdatedVotingSession, submission: newSubmission})
    } catch (error) {
      throw error
    }
  }

const voteSub = async (req: Request, res: Response): Promise<void> => {// id_sub / id_vs / vote
    try {
      const vote = req.body.vote;
      let vs_toUpdate = await VotingSession.find({_id: "id"}).exec();

     // var index =  vs_toUpdate.submissions_array.map(function(e:any) { return e._id; }).indexOf(req.body.id_sub);
     
      const updatedVotingClass: IVotingSession = await VotingSession.update({'items._id': req.body.id_sub}, {'$set': {
        '$inc': {'items.$.vote': vote }}
      });

      res.status(200).json({
        message: "Voting updated",
        sub:  updatedVotingClass,
      })
    } catch (error) {
      throw error
    }
}

export { getAllSub, postSub, voteSub, getVSSubBetweenDates, getVSSubmissionsByName, postVotingSession,postContent  }


   // const updatedVotingClass: ISubmission | null = await Submission.findByIdAndUpdate(
     //  { _id: id },
     //   {vote: vote}
     // )

    // const {
    //  params: { id },
    //  body,
    //} = req

    //id


