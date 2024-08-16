/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import AdminUser from "../models/adminUser";
import bcrypt from "bcryptjs";

const adminUserRouter = express.Router();

interface newAdminUser {
  name: string;
  username: string;
  password: string;
}

adminUserRouter.post("/", async (request, response, next) => {
  try {
    // Ensure body is of correct type
    const { username, name, password } = request.body as newAdminUser;

    if (password.length < 3) {
      return response.status(400).json({ error: "password is too short" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new AdminUser({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();
    response.status(201).json(savedUser);
    return;
  } catch (error) {
    next(error);
    return;
  }
});

export default adminUserRouter;
