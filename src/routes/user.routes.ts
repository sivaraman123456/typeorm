import { Router } from "express";
import register from "../controllers/register";
import login from "../controllers/login";
import { validation } from "../middlewares/vaalidation";
import authorization from "../middlewares/authorization"
import verify from "../controllers/verify";
const router=Router()
console.log("routersssss");

router.post("/register",validation,register)
router.post("/login",login)
router.get("/verify",authorization,verify)


export default router;