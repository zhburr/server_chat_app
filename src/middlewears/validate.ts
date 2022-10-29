import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import httpStatus from "http-status";
import { pick } from "../utils/pick";
import { ApiError } from "../utils/ApiError";

export const validate =
  <T extends {}>(schema: T) =>
  (req: Request, res: Response, next: NextFunction) => {
    const validSchema = pick(schema, ["params", "query", "body"] as Array<
      keyof T
    >);

    const object = pick(req, Object.keys(validSchema) as Array<keyof Request>);
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: "key" }, abortEarly: false })
      .validate(object);

    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(", ");
      return next(new ApiError(httpStatus.FORBIDDEN, errorMessage));
    }
    Object.assign(req, value);
    return next();
  };
