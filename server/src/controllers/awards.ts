/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import Award, { IAward } from "../models/award";

const awardsRouter = express.Router();

awardsRouter.get("/", async (_request, response) => {
  const awards = await Award.find({});
  response.json(awards);
});

awardsRouter.post("/", async (request, response, next) => {
  try {
    // Ensure body is of correct type
    const body = request.body as IAward;

    const award = new Award({
      award: body.award,
      country: body.country,
      sponsor: body.sponsor,
    });

    const savedAward = await award.save();

    response.status(201).json(savedAward);
  } catch (error) {
    next(error);
  }
});

export default awardsRouter;
