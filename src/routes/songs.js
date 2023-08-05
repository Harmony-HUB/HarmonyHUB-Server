const express = require("express");
const { authenticateJWT } = require("../../middleware/authenticateJWT");
const getUserFiles = require("../controllers/songsController");

const router = express.Router();

router.get("/", authenticateJWT, getUserFiles);

module.exports = router;
