/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import Award, { IAward } from "../models/award";
import { adminConfirmation } from "../utils/middleware";
import { toDescription } from "../utils/parseAward";

const awardsRouter = express.Router();

// Get all awards
awardsRouter.get("/", async (request, response, next) => {
  const title = request.query.titles;
  const basic = request.query.basic;

  let awards;
  try {
    if (title) {
      awards = await Award.find({}).select("award");
    } else if (basic) {
      awards = await Award.find({}).select(["-manga", "-description"]);
    } else {
      awards = await Award.find({}).populate({
        path: "manga",
        select: "title",
      });
    }

    Award.updateMany({});
    response.json(awards);
  } catch (error) {
    next(error);
  }
});

// Get award by id
awardsRouter.get("/:id", async (request, response, next) => {
  const id = request.params.id;

  let award = null;

  try {
    award = await Award.findById(id).populate({
      path: "manga",
      select: "title",
    });
    response.json(award);
  } catch (error) {
    next(error);
  }
});

// Add a new award
awardsRouter.post("/", adminConfirmation, async (request, response, next) => {
  try {
    // Ensure body is of correct type
    const body = request.body as IAward;

    const award = new Award({
      award: body.award,
      description: body.description,
      country: body.country,
      sponsor: body.sponsor,
      manga: [],
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

// Delete an award by id
awardsRouter.delete(
  "/:id",
  adminConfirmation,
  async (request, response, next) => {
    try {
      const result = await Award.findByIdAndDelete(request.params.id);
      response.status(204).json(result);
    } catch (error) {
      next(error);
    }
  }
);

export default awardsRouter;
