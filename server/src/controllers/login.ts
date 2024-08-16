import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import express from "express";
import AdminUser from "../models/adminUser";
import { SECRET } from "../utils/config";

const loginRouter = express.Router();

interface user {
  username: string;
  password: string;
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
loginRouter.post("/admin", async (request, response) => {
  const { username, password } = request.body as user;

  const user = await AdminUser.findOne({ username });
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
  };

  const token = jwt.sign(userForToken, SECRET!, { expiresIn: 60 * 60 });

  response.status(200).send({
    token,
    username: user.username,
    name: user.name,
  });
  return;
});

export default loginRouter;
