/* eslint-disable @typescript-eslint/no-misused-promises */
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import express from "express";
import AdminUser from "../models/adminUser";
import { SECRET } from "../utils/config";
import User from "../models/user";

const loginRouter = express.Router();

interface user {
  username: string;
  password: string;
}

// Login with username and password
loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body as user;

  let user = await AdminUser.findOne({ username });
  let role = "admin";
  if (user === null) {
    user = await User.findOne({ username });
    role = "user";
  }
  // If user does not exist, don't check for password
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!user || !passwordCorrect) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  // Create a token, contains username, user id, and digital signature
  const userForToken = {
    username: user.username,
    id: user._id,
    role: role,
  };

  let token;
  if (role === "admin") {
    token = jwt.sign(userForToken, SECRET!, { expiresIn: 60 * 60 });
  } else {
    token = jwt.sign(userForToken, SECRET!);
  }

  response.status(200).send({
    token,
    username: user.username,
    name: user.name,
  });
  return;
});

export default loginRouter;
