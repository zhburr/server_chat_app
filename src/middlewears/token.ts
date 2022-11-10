import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import { sendResponse } from "../services/shared.service";

const config = process.env;

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return sendResponse(
      res,
      httpStatus.UNAUTHORIZED,
      null,
      false,
      "A token is required for authentication"
    );
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY!);
    Object.assign(req.body, { user: decoded });
  } catch (err) {
    return sendResponse(
      res,
      httpStatus.FORBIDDEN,
      null,
      false,
      "Invalid Token"
    );
  }
  return next();
};
