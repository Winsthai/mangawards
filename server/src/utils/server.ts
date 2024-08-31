import express from "express";
import cors from "cors";
import awardsRouter from "../controllers/awards";
import { errorHandler } from "../utils/middleware";
import adminUserRouter from "../controllers/admin";
import loginRouter from "../controllers/login";
import mangaRouter from "../controllers/manga";
import authorsRouter from "../controllers/authors";

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/api/awards", awardsRouter);

  app.use("/api/manga", mangaRouter);

  app.use("/api/authors", authorsRouter);

  app.use("/api/admin", adminUserRouter);

  app.use("/api/login", loginRouter);

  app.use(errorHandler);

  return app;
};

export default createServer;
