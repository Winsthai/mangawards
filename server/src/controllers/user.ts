/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import AdminUser from "../models/adminUser";

const userRouter = express.Router();

interface newUser {
  username: string;
  password: string;
}

// Get existing user by id
userRouter.get("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;

    const user = await User.findById(id)
      .populate([{ path: "starredManga", select: "title" }])
      .select("-passwordHash");

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
    const check = await AdminUser.find({ username: username });
    if (check === undefined || check.length !== 0) {
      const error = new Error("E11000 duplicate key error");
      error.name = "MongoServerError";
      throw error;
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      passwordHash,
      starredManga: [],
      completedManga: [],
    });

    const savedUser = await user.save();
    response.status(201).json(savedUser);
    return;
  } catch (error) {
    next(error);
    return;
  }
});

export default userRouter;
