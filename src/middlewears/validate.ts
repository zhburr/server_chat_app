import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import httpStatus from "http-status";
import { pick } from "../utils/pick";
import { sendResponse } from "../services/shared.service";

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
      return next(sendResponse(res, httpStatus.OK, null, false, errorMessage));
    }
    Object.assign(req, value);
    return next();
  };
