import express from "express";
import { registerUser, getUserInfo } from "./controllers/userController";
import authenticateJWT from "./middleware/authenticateJWT";

const router = express.Router();

router.post("/", registerUser);
router.get("/", authenticateJWT, getUserInfo);

export default router;
