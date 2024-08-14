import express from "express";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import awardsRouter from "./controllers/awards";
import { MONGODB_URI } from "./utils/config";

void mongoose.connect(MONGODB_URI!);

app.use(cors());
app.use(express.json());

app.use("/api/awards", awardsRouter);

export default app;
