const express = require("express");
const verifyRefreshToken = require("../../middleware/verifyRefreshToken");

const router = express.Router();

router.post("/refresh", verifyRefreshToken);

module.exports = router;
