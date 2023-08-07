import express from "express";
import registerUser from "./controllers/userController";

const router = express.Router();

router.post("/", registerUser);

export default router;
