import express from "express";
import authenticateJWT from "../middleware/authenticateJWT";
const getUserFiles = require("../controllers/songsController");

const router = express.Router();

router.get("/", authenticateJWT, getUserFiles);

module.exports = router;
