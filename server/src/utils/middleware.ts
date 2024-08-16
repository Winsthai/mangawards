import jwt from "jsonwebtoken";
import { ErrorRequestHandler, RequestHandler } from "express";
import { SECRET } from "./config";

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  _request,
  response,
  next
) => {
  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: "inputted `username` must be unique" });
  }

  next(error);
  return;
};

export const adminConfirmation: RequestHandler = (request, _response, next) => {
  let token: string;

  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    token = authorization.replace("Bearer ", "");

    const decodedToken = jwt.verify(token, SECRET!) as jwt.JwtPayload;

    if (!decodedToken.id) {
      next(jwt.JsonWebTokenError);
    }
  } else {
    next(jwt.JsonWebTokenError);
  }

  next();
};
