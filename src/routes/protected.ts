import { Request, Response } from "express";

import express from "express";
import authenticateJWT from "../middleware/authenticateJWT";

const router = express.Router();

router.get("/", authenticateJWT, (req: Request, res: Response) => {
  res.json({ message: "보호된 경로에 액세스" });
});

module.exports = router;
