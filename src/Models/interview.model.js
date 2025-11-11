import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    questionText:{
        type:String,
        required:true
    },
    userAnswer:{
        type:String
    },
    aiFeedback:{
        type:String
    },
    score:{
        type:Number,
        default:0
    },
    roundType: {
  type: String,
  enum: ["technical", "hr", "non-technical"],
  default: "technical"
}

});

const interviewSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    jobTitle: {
      type: String,
      required: true
    },
    interviewType: {
      type: String,
      enum: ["HR", "Technical"],
      required: true
    },
    questions: [questionSchema],
    overallScore: {
      type: Number,
      default: 0
    },
    aiSuggestions: {
      type: String // Gemini’s final feedback after all questions
    },
    status: {
      type: String,
      enum: ["in-progress", "completed"],
      default: "in-progress"
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model("Interview", interviewSchema);