const express = require("express");
const { authenticateJWT } = require("../../middleware/authenticateJWT");

const router = express.Router();

router.get("/", authenticateJWT, (req, res) => {
  res.json({ message: "보호된 경로에 액세스" });
});

module.exports = router;
