import { Response, Request } from "express"
import { ISubmission, IContent, IUser} from "../../types/types"
import Submission from "../../models/submission"
import Content from "../../models/content"

import User from "../../models/user"

import { IVotingSession, Vote } from "../../types/types"
import VotingSession from "../../models/voting_session"; // VotingSession -> VS
import { submissionView } from "frontend/app/reducers"

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
      res.status(200).json({error})
      throw error;
  }
}

const postVotingSession = async (req: Request, res: Response): Promise<void> => {
    try {
      const body 
      = req.body as Pick<IVotingSession, "name" | "opening_date" | "closing_date">
      const vs: IVotingSession = new VotingSession({
        name: body.name,
        opening_date: body.opening_date,
        closing_date: body.closing_date,
        submissions_array: [],
      })
      
      const vs_post : IVotingSession = await vs.save()
      res.status(200).json({vs_post})

    } catch (error) {
      res.status(400).json({error})
      throw error
    }
  }


//{
//    "author_id":"607262497f7e421397e91543",
//    "comment": "The man in the mirror",
//    "link": "www.michaeljackson.com"
//}

const postContent = async (req: Request, res: Response): Promise<void> => { 

  try {
      console.log("Starting request..")
    
      const body = req.body as Pick<IContent,  "author_id" | "comment" | "link">
      const content = {
      link: String(body.link),
      comment: String(body.comment)

    }


    const updatedUser = await User.findOneAndUpdate({_id:body.author_id},
     {$push: {content: content}});
    

    res.status(201).json({ message: "Content Posted", user: updatedUser}) // might not reflect change, but it does change in database

  } catch (error) {
    res.status(400).json({error})
    throw error
  }
}


//{
//    "id_content": "606d13bd25e16c4aab03bf79",
//    "comments": "Im submitting, hope I win ",
//    "author": "606493fdda9c019ab13eeb13",
//    "voting_session":"605542933ee7a7b2fc911d09"
//}
const postSub = async (req: Request, res: Response): Promise<void> => { 
    try {
      
        const body = req.body as Pick<ISubmission, "id_content" | "author" | "comments" | "voting_session">
        const submission: ISubmission = new Submission({
        id_content: body.id_content,
        author: body.author,
        comments: body.comments,
        accepted: 0,
        voting_session: body.voting_session,
      })
      
      const newSubmission: ISubmission = await submission.save()
      console.log(newSubmission._id);
      
      const updatedUser = await User.findOneAndUpdate({_id:body.author},
        {$push: {submissions: newSubmission._id}});

      //const foundSubmission : ISubmission = await Submission.find({id_content: body.id_content, comments: body.comments });

      const UpdatedVotingSession = await VotingSession.findOneAndUpdate(
        { _id: submission.voting_session }, 
        { $push: { submissions_array: {sub_id: newSubmission._id , count:0 } }}
      );
      console.log("Updated voting session");
      //const allUsers: IUser[] = await Voting.find()
  
      res.status(201).json({ message: "Submission Posted", votingSession: UpdatedVotingSession, submission: newSubmission})
    } catch (error) {
      res.status(400).json(error)
      throw error
    }
  }

//{
//   "sub_id": "607273c0af82a917bc2591be",
//   "vote": 1,
//   "voting_session": "605542933ee7a7b2fc911d09",
//   "user":"606493fdda9c019ab13eeb13"
//}

const voteSub = async (req: Request, res: Response): Promise<void> => { // vote / voting_session / sub_id / user
    // Also works to edit vote
    try {
      const vote = req.body.vote;
      const voting_session = req.body.voting_session ;
      const sub_id = req.body.sub_id;
      const voter = req.body.user;

      const pullout = await User.findOneAndUpdate(
        { _id: voter },
        { $pull: { "vote_log": { "submission": sub_id } } });
      const UpdateUser = await User.findOneAndUpdate({ _id: voter},{ $addToSet: { vote_log: {submission:sub_id, vote: vote} }});

      const updatedVotingClass =  await VotingSession.findOneAndUpdate(
        {_id: voting_session, "submissions_array.sub_id" : sub_id} , 
        {$inc : {"submissions_array.$.count" : vote} },{new: true});

      res.status(200).json({
        message: "Voting updated",
        sub:  updatedVotingClass,
      })
    } catch (error) {
      res.status(200).json({error})
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


//db.col_name.update({name :"name_for_match"},{$addToSet :  { videoId : "video_id_value"}})