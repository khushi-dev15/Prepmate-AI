import config from "../config/config";
import {GoogleGenerativeAI} from "@google/generative-ai"

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({model: "gemini-1.5pro"});

export const generateQuestions = async (jobTitle, interviewType)=>{
    const prompt = `You are an AI interviewer for job preparation. 
  Generate 5 ${interviewType} interview questions for the role of "${jobTitle}".
  Keep them concise, realistic, and role-specific.with suggestions after anser from user,
  Output only questions as a numbered list.
  `;

  const result = await model.generateContent(prompt);
  const text = result.text();
  const questions = text.split("\n").filter((q) => q.trim() !=="");
  return questions;
}

export const evaluateAnswer = async (questions,answer) =>{
    const prompt = `
    question: "${question}"
    candidates Answer: "${answer}
    Evaluate teh answer  in context  of a professional interview.
    Give:
     - A brief feedback (2 lines)
  - A score from 0 to 10
   Return output strictly in JSON like:
  {"feedback": "...", "score": number}
  `;
  const result = await model.generateContent(prompt);
  const text = reqult.response.text();

  const clean = text.replace(/```json| ```/g,"").trim();
  const parsed  = JSON.parse(clean);
  return parsed
}

export const generateFinalFeedback = async (answers) => {
  const answerSummary = answers
    .map((a, i) => `Q${i + 1}: ${a.questionText}\nUser: ${a.userAnswer}\nScore: ${a.score}`)
    .join("\n\n");

  const prompt = `
  Here is a summary of the candidate's interview performance:
  ${answerSummary}

  Now analyze this and provide:
  - Overall performance summary (2 lines)
  - 3 personalized improvement suggestions
  - A final readiness level (e.g., "Ready", "Almost Ready", "Needs Practice")

  Format output in plain text, no JSON.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
};
