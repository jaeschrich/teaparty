import { Router } from "express"
import { getUsers, addUser, updateUser, deleteUser } from "../controllers/user"
import { postSub , voteSub, getAllSub ,getVSSubBetweenDates,getVSSubmissionsByName,postVotingSession, postContent} from "../controllers/submissions";

/* Don't handle / or /app. Leave those routes for the main server file. */
const router: Router = Router()


router.get("/users", getUsers);
router.post("/add-user", addUser);
router.put("/edit-user/:id", updateUser);
router.delete("/delete-user/:id", deleteUser);

// getContent// post content Author routes to work on

router.post("/post-voting-session", postVotingSession); // works


//{
//    "id_content": "606d13bd25e16c4aab03bf79",
//    "comments": "Im submitting, hope I win ",
//    "author": "606493fdda9c019ab13eeb13",
//    "voting_session":"605542933ee7a7b2fc911d09"
//}
router.post("/post-sub", postSub);  // works

router.post("/vote-sub/:id", voteSub);
router.post("/post-content", postContent); //works
router.get("/all-sub", getAllSub);

//{
//    "start_date": "1980-7-14",
//    "end_date": "2025-9-9"
//}
router.get("/voting-session-between-dates",  getVSSubBetweenDates);//works


router.get("/vs-name" , getVSSubmissionsByName);//works


export default router
