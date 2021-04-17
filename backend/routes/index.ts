import { Router } from "express"
import { getUsers, addUser, updateUser, deleteUser } from "../controllers/user"
import { postSub , voteSub, getAllSub ,getVSSubBetweenDates,getVSSubmissionsByName,postVotingSession, requestEdit, deleteContent, deleteSub} from "../controllers/submissions"
/*
Don't handle / or /app. Leave those routes for the main server file.
*/
const router: Router = Router()

router.get("/users", getUsers);
router.get("/user", getUsers);
router.post("/add-user", addUser);
router.put("/edit-user/", updateUser);
router.delete("/delete-user/", deleteUser);

router.post("/post-voting-session", postVotingSession);

router.post("/post-sub", postSub);   
router.put("/delete-sub", deleteSub);
router.post("/delete-content", deleteContent); 

router.post("/vote-sub", voteSub);

router.get("/voting-session-between-dates",  getVSSubBetweenDates);
router.get("/vs-name" , getVSSubmissionsByName);

router.get("/requestEdit", requestEdit);

// getContent of Author

export default router