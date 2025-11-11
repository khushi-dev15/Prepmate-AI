import InterviewModel from "../Models/interview.model.js"
import {generateQuestions,evaluateAnswer, generateFinalFeedback} from "../services/gemini.services.js";

export const startInterview = async (req, res) => {
  try {
    const { jobTitle, interviewType } = req.body;

    let technicalQuestions = [];
    let hrQuestions = [];

    if (interviewType.toLowerCase() === "technical") {
      technicalQuestions = await generateQuestions(jobTitle, "technical");
      hrQuestions = await generateQuestions(jobTitle, "hr");
    }

    else {
      hrQuestions = await generateQuestions(jobTitle, "non-technical");
    }

    const allQuestions = [...technicalQuestions, ...hrQuestions];

    const interview = await Interview.create({
      user: req.user._id,
      jobTitle,
      interviewType,
      questions: allQuestions.map((q, index) => ({
        questionText: q,
        roundType:
          interviewType.toLowerCase() === "technical"
            ? index < 5
              ? "technical"
              : "hr"
            : "non-technical"
      }))
    });

    res.status(201).json({
      message: "Interview started successfully",
      interviewId: interview._id,
      questions: allQuestions
    });
  } catch (error) {
    console.error("❌ Error in startInterview:", error);
    res.status(500).json({ message: "Error starting interview" });
  }
};
export const submitAnswer = async (req, res) => {
  try {
    const { interviewId, questionIndex, answer } = req.body;
    const interview = await Interview.findById(interviewId);

    if (!interview)
      return res.status(404).json({ message: "Interview not found" });

    const question = interview.questions[questionIndex];
    if (!question)
      return res.status(404).json({ message: "Invalid question index" });

    const evaluation = await evaluateAnswer(question.questionText, answer);

    question.userAnswer = answer;
    question.aiFeedback = evaluation.feedback;
    question.score = evaluation.score;
    await interview.save();

    res.json({
      message: "Answer evaluated successfully",
      feedback: evaluation.feedback,
      score: evaluation.score
    });
  } catch (error) {
    console.error("❌ Error in submitAnswer:", error);
    res.status(500).json({ message: "Error evaluating answer" });
  }
};
export const getResult = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const interview = await Interview.findById(interviewId);

    if (!interview)
      return res.status(404).json({ message: "Interview not found" });

    // Separate rounds
    const techQuestions = interview.questions.filter(
      (q) => q.roundType === "technical"
    );
    const hrQuestions = interview.questions.filter(
      (q) => q.roundType === "hr" || q.roundType === "non-technical"
    );

    const techScore = techQuestions.length
      ? techQuestions.reduce((a, q) => a + (q.score || 0), 0) /
        techQuestions.length
      : 0;

    const hrScore = hrQuestions.length
      ? hrQuestions.reduce((a, q) => a + (q.score || 0), 0) /
        hrQuestions.length
      : 0;

    const overallScore =
      (techScore + hrScore) /
      (techQuestions.length && hrQuestions.length ? 2 : 1);

    const suggestions = await generateFinalFeedback(interview.questions);

    interview.overallScore = overallScore;
    interview.aiSuggestions = suggestions;
    interview.status = "completed";
    await interview.save();

    res.json({
      message: "Interview completed successfully",
      technicalScore: techScore,
      hrScore,
      overallScore,
      suggestions
    });
  } catch (error) {
    console.error("❌ Error in getResult:", error);
    res.status(500).json({ message: "Error fetching results" });
  }
};