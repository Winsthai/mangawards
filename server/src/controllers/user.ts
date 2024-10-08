/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import Manga from "../models/manga";
import { parseMangaId } from "../utils/parseManga";
import { userConfirmation } from "../utils/middleware";

const userRouter = express.Router();

interface newUser {
  username: string;
  password: string;
}

// Get existing user by id
userRouter.get("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;

    const user = await User.findById(id).populate([
      { path: "starredManga", select: "title" },
    ]);

    response.json(user);
  } catch (error) {
    next(error);
  }
});

// Create a new user
userRouter.post("/", async (request, response, next) => {
  try {
    // Ensure body is of correct type
    const { username, password } = request.body as newUser;

    if (password.length < 3) {
      return response.status(400).json({ error: "password is too short" });
    }

    // Check if admin with that username exists already
    /* const check = await AdminUser.find({ username: username });
    if (check === undefined || check.length !== 0) {
      const error = new Error("E11000 duplicate key error");
      error.name = "MongoServerError";
      throw error;
    } */

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      passwordHash,
      starredManga: [],
    });

    const savedUser = await user.save();
    response.status(201).json(savedUser);
    return;
  } catch (error) {
    next(error);
    return;
  }
});

// Add a manga to list of user's starred manga
userRouter.post("/:id", userConfirmation, async (request, response, next) => {
  try {
    const id = request.params.id;

    const mangaId = parseMangaId(request.body);

    // Check that manga exists
    const manga = await Manga.findById(mangaId);

    if (!manga) {
      response.status(400).json({ error: "manga id does not exist" });
      return;
    }

    const user = await User.findById(id);

    if (!user) {
      response.status(400).json({ error: "user id does not exist" });
      return;
    }

    if (user.starredManga.includes(manga._id)) {
      response.status(400).json({ error: "that manga is already starred" });
      return;
    }

    user.starredManga.push(manga._id);

    const savedUser = await user.save();

    response.status(200).json(savedUser);
  } catch (error) {
    next(error);
  }
});

// Delete manga from a list of user's starred manga
userRouter.put(
  "/:id/removeManga",
  userConfirmation,
  async (request, response, next) => {
    try {
      const id = request.params.id;

      const mangaId = parseMangaId(request.body);

      // Check that manga exists
      const manga = await Manga.findById(mangaId);

      if (!manga) {
        response.status(400).json({ error: "manga id does not exist" });
        return;
      }

      const user = await User.findById(id);

      if (!user) {
        response.status(400).json({ error: "user id does not exist" });
        return;
      }

      if (!user.starredManga.includes(manga._id)) {
        response.status(400).json({ error: "that manga is not starred" });
        return;
      }

      user.starredManga = user.starredManga.filter(
        (id) => !id.equals(manga._id)
      );

      const savedUser = await user.save();

      response.status(200).json(savedUser);
    } catch (error) {
      next(error);
    }
  }
);

export default userRouter;
