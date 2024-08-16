import express from "express";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import awardsRouter from "./controllers/awards";
import { errorHandler } from "./utils/middleware";
import { MONGODB_URI } from "./utils/config";
import adminUserRouter from "./controllers/admin";
import loginRouter from "./controllers/login";

void mongoose.connect(MONGODB_URI!);

app.use(cors());
app.use(express.json());

app.use("/api/awards", awardsRouter);

app.use("/api/admin", adminUserRouter);

app.use("/api/login", loginRouter);

app.use(errorHandler);

export default app;
