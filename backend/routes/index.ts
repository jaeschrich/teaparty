import { Router } from "express"
import { getUsers, addUser, updateUser, deleteUser } from "../controllers/user"
import { postSub , voteSub, getAllSub ,getVSSubBetweenDates,getVSSubmissionsByName,postVotingSession, requestEdit, postEdit, deleteSub, close_open_vs} from "../controllers/submissions"
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

router.post("/vote-sub", voteSub);

router.get("/voting-session-between-dates",  getVSSubBetweenDates);
router.get("/vs-name" , getVSSubmissionsByName);

router.post("/requestEdit", requestEdit);
router.put("/postEdit", postEdit);

router.put("/close_open_vs",close_open_vs)

// getContent of Author

export default router