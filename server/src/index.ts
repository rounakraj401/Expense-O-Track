import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // ✅ Load variables from .env

const app: Express = express();
const port = process.env.PORT || 3001;
const mongoURI: string = process.env.MONGO_URI || "";
const allowedOrigins = [
  "http://localhost:5173",
  "https://expense-o-track.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// ✅ Handle preflight requests
app.options("*", cors());
app.use(express.json());

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ CONNECTED TO MONGODB!"))
  .catch((err) => console.error("❌ Failed to Connect to MongoDB:", err));

app.use("/financial-records", financialRecordRouter);

app.listen(port, () => {
  console.log(`🚀 Server Running on Port ${port}`);
});
