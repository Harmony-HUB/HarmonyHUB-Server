import express from "express";
import verifyRefreshToken from "../middleware/verifyRefreshToken";

const router = express.Router();

router.post("/refresh", verifyRefreshToken);

module.exports = router;
