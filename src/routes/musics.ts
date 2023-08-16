import express from "express";
import authenticateJWT from "./middleware/authenticateJWT";
import getUserFiles from "./controllers/musicsController";

const router = express.Router();

router.get("/", authenticateJWT, getUserFiles);

export default router;
