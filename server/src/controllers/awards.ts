/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import Award, { IAward } from "../models/award";
import { adminConfirmation } from "../utils/middleware";
import { toDescription } from "../utils/parseAward";

const awardsRouter = express.Router();

awardsRouter.get("/", async (_request, response) => {
  const awards = await Award.find({});
  Award.updateMany({});
  response.json(awards);
});

awardsRouter.post("/", adminConfirmation, async (request, response, next) => {
  try {
    // Ensure body is of correct type
    const body = request.body as IAward;

    const award = new Award({
      award: body.award,
      description: body.description,
      country: body.country,
      sponsor: body.sponsor,
    });

    const savedAward = await award.save();

    response.status(201).json(savedAward);
  } catch (error) {
    next(error);
  }
});

// Update an award's description
awardsRouter.put(
  "/:id/description",
  adminConfirmation,
  async (request, response, next) => {
    try {
      const id = request.params.id;

      const body = toDescription(request.body);

      const result = await Award.findByIdAndUpdate(id, { description: body });

      response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

export default awardsRouter;
