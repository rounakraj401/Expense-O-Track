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
  "http://localhost:5173",                       // local frontend
  "https://expense-o-track.vercel.app"           // deployed frontend
];


app.use(express.json());
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ CONNECTED TO MONGODB!"))
  .catch((err) => console.error("❌ Failed to Connect to MongoDB:", err));

app.use("/financial-records", financialRecordRouter);

app.listen(port, () => {
  console.log(`🚀 Server Running on Port ${port}`);
});
