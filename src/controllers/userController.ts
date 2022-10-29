import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../utils/catchAsync";

export const register = catchAsync(async (req: Request, res: Response) => {
  console.log(req);
  return res.status(httpStatus.OK).json(req.body);
});
