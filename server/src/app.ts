import mongoose from "mongoose";
import { MONGODB_URI } from "./utils/config";
import createServer from "./utils/server";

void mongoose.connect(MONGODB_URI!);

const app = createServer();

export default app;
