import { Router } from "express"
import { getUsers, addUser, updateUser, deleteUser } from "../controllers/user"

/*
Don't handle / or /app. Leave those routes for the main server file.
*/
const router: Router = Router()

router.get("/users", getUsers);
router.post("/add-user", addUser);

router.put("/edit-user/:id", updateUser);

router.delete("/delete-user/:id", deleteUser);

export default router