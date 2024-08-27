/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import Author from "../models/author";

const authorsRouter = express.Router();

authorsRouter.get("/", async (_request, response) => {
  const authors = await Author.find({}).populate([
    { path: "awards", select: "award" },
    { path: "manga", select: "title" },
  ]);
  Author.updateMany({});
  response.json(authors);
});

export default authorsRouter;
