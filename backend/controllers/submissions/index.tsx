import { Response, Request } from "express"
import { ISubmission, IUser} from "../../types/types"
import Submission from "../../models/submission"
import User from "../../models/user"
import { IVotingSession} from "../../types/types"
import VotingSession from "../../models/voting_session"; // VotingSession -> VS
import { submissionView } from "frontend/app/redux/reducers"
import { truncate } from "fs/promises"

/*
export interface VotingSessionModel extends ISubmission
*/
const getVSSubmissionsByName = async (req: Request, res: Response): Promise<void> => {
  try {

    const body = req.body as any;
    const vs: IVotingSession[] = await VotingSession.find({ name: body.name});
    res.status(200).json({vs})

  }catch (error) {
    res.status(200).json({error})
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



//{
//    "id_content": "606d13bd25e16c4aab03bf79",
//    "comments": "Im submitting, hope I win ",
//    "author": "606493fdda9c019ab13eeb13",
//    "voting_session":"605542933ee7a7b2fc911d09"
//}

const postSub = async (req: Request, res: Response): Promise<void> => { 
    try {
        const body = req.body as Pick<ISubmission, "author" | "comments" | "voting_session" | "link"| "category"| "title">
        const submission: ISubmission = new Submission({
        author: body.author,
        comments: body.comments,
        link: body.link,
        category: body.category,
        title: body.title,
        accepted: 0,
        voting_session: body.voting_session})
      
        const newSubmission: ISubmission = await submission.save()
      
        const updatedUser = await User.findOneAndUpdate({_id:body.author},
        {$push: {submissions: newSubmission._id}});

        //const foundSubmission : ISubmission = await Submission.find({id_content: body.id_content, comments: body.comments });

        const UpdatedVotingSession = await VotingSession.findOneAndUpdate(
        { _id: submission.voting_session }, 
        { $push: { submissions_array: {sub_id: newSubmission._id , count: 0 } }}
      );
      console.log("Updated voting session");
      //const allUsers: IUser[] = await Voting.find()

      res.status(201).json({UpdatedVotingSession})
    } 
    catch (error) {
      res.status(400).json(error)
      throw error
  }
}

//{
//   "sub_id": "607273c0af82a917bc2591be",
//   "vote": 1,
//   "voting_session": "605542933ee7a7b2fc911d09",
//   "voter":"606493fdda9c019ab13eeb13"
//}

const voteSub = async (req: Request, res: Response): Promise<void> => { // vote / voting_session / sub_id / user
    // Also works to edit vote
    try {
      const vote = req.body.vote;
      const voting_session = req.body.voting_session ;
      const sub_id = req.body.sub_id;
      const voter = req.body.voter;

      const pullout = await User.findOneAndUpdate(
        { _id: voter },
        { $pull: { "vote_log": { "submission": sub_id } } });
      const UpdateUser = await User.findOneAndUpdate({ _id: voter},{ $addToSet: { vote_log: {submission:sub_id, vote: vote} }});

      const updatedVotingClass =  await VotingSession.findOneAndUpdate(
        {_id: voting_session, "submissions_array.sub_id" : sub_id} , 
        {$inc : {"submissions_array.$.count" : vote} },{new: true});

      res.status(200).json({ updatedVotingClass})
    } catch (error) {
      res.status(200).json({error})
      throw error
    }
}


const deleteSub = async (req: Request, res: Response): Promise<void> => {
  try {
    const newList = await VotingSession.findOneAndUpdate(
      { _id: req.body.vs_id}, 
      { $pull: {"submissions_array": { "sub_id": req.body.sub_id }}},{new: true});

    const newUser = await User.findOneAndUpdate(
        { _id: req.body.author_id}, 
        { $pull: {"submissions": { "sub_id": req.body.sub_id }}},{new: true});
    
    res.status(200).json({
      message: "Voting updated",
      voting_session:  newList,
      updated_user: newUser
    })
  } catch (error) {
    res.status(200).json({error})
    throw error
  }
}

//const deleteContent = async (req: Request, res: Response): Promise<void> => {
//  try {
//
//    const newUser = await User.findOneAndUpdate(
//        { _id: req.body.author_id}, 
//        { $pull: {"content": { "_id": req.body.content_id }}},{new: true});
//    
//    res.status(200).json({
//      message: "Voting updated",
//      updated_user: newUser
//    })
//  } catch (error) {
//    res.status(200).json({error})
//    throw error
//  }
//}

const getAllSub = async (res: Response): Promise<void> => { 
  try {
 
    const submission: ISubmission[] = await Submission.find()
    res.status(200).json({ submission})

  } catch (error) {
    res.status(200).json({error})
    throw error
  }
}

const requestEdit = async (req: Request, res: Response): Promise<void> => { 
  try {

      const updatedUser = await User.findOneAndUpdate( { _id: req.body.author }, 
        { $push: { requested_edit_submissions: {sub_id: req.body.sub_id, comments: req.body.comments, resubmitted: false, new_link:"" } }});
      
      //  {_id:req.body.author},
      //{$push: {requested_edit_submissions: {sub_id: req.body.sub_id, comments: req.body.comment}}});

      //const foundSubmission : ISubmission = await Submission.find({id_content: body.id_content, comments: body.comments });

      const updatedVotingSession = await VotingSession.findOneAndUpdate(
      { _id: req.body.voting_session }, 
      { $push: { resubmissions_array:  {sub_id: req.body.sub_id, comment_from_editor: req.body.comments, comment_from_author: req.body.comment_from_author, new_link: "", resubmitted: false}}});

    console.log("Updated voting session");
    //const allUsers: IUser[] = await Voting.find()

    res.status(201).json({ message: "Submission Posted", votingSession: updatedVotingSession, author: updatedUser})
  } 
  catch (error) {
    res.status(400).json(error)
    throw error
  }
}

const postEdit = async (req: Request, res: Response): Promise<void> => { // 
  try {
      
      const updatedUser = await User.findOneAndUpdate( { _id: req.body.author, }, 
        { $set: {"requested_edit_submissions.$[el].new_link": req.body.link, "requested_edit_submissions.$[el].submitted": true }},
        { 
          arrayFilters: [{ "el.sub_id": req.body.sub_id }],
          new: true
        }
      );

      const updatedVotingSession = await VotingSession.findOneAndUpdate(
        { _id: req.body.voting_session }, 
        { $set: { "resubmissions_array.$[el].new_link": req.body.new_link, "resubmissions_array.$[el].comment_from_author": req.body.comment_from_author, 
                   "resubmissions_array.$[el].resubmitted":true}}, 
        { 
          arrayFilters: [{ "el.sub_id": req.body.sub_id }],
          new: true
        });


      console.log("Updated voting session");

    res.status(201).json({ message: "Submission Posted", votingSession: updatedVotingSession, author: updatedUser})
  } 
  catch (error) {
    res.status(400).json(error)
    throw error
  }
}

const close_open_vs = async (req: Request, res: Response): Promise<void> => { // 
  try {
      
      const updatedVotingSession = await VotingSession.findOneAndUpdate(
        { _id: req.body.voting_session }, 
        { $set: { "closed": req.body.closed}}, 
        );

      console.log("Updated voting session");

    res.status(201).json({ message: "Submission Posted", votingSession: updatedVotingSession})
  } 
  catch (error) {
    res.status(400).json(error)
    throw error
  }
}

export { getAllSub, postSub, voteSub, requestEdit, postEdit,
         getVSSubBetweenDates, getVSSubmissionsByName,
         postVotingSession, deleteSub, close_open_vs}



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