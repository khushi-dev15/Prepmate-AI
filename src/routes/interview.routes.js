import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { startInterview, submitAnswer,getResult  } from "../controllers/interview.controller.js";

const router = express.router();

router.post("/start", protect, startInterview);
router.post("/submit-answer", protect , submitAnswer);
router.get("/result/:interviewId",protect, getResult);

export default router;