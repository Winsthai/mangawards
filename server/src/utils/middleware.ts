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
      .json({ error: "inputted `title` must be unique" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  } else if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "SyntaxError") {
    return response
      .status(400)
      .send({ error: "entered information is not of JSON type" });
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
