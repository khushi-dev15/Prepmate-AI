import express from "express";
import userRoutes from "./routes/user.routes.js";
import dotenv from "dotenv"

dotenv.config();


const app = express();
app.use(express.json());

app.use("/user",userRoutes);

export default app;