import express from "express";

import { enrollUser } from "../Controller/enrollController.js";

const router = express.Router();

router.post("/", enrollUser);

export default router;
