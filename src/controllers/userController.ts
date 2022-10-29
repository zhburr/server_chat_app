import { Request, Response } from "express";
import httpStatus from "http-status";
import UserService from "../services/user.service";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/helpers";
import bcrypt from "bcrypt";
import userService from "../services/user.service";
import { User } from "../utils/types";

export const register = catchAsync(async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;
  const userNameExist: User = await UserService.userExists({ userName });
  if (userNameExist) {
    return sendResponse(
      res,
      httpStatus.OK,
      null,
      false,
      "User name already exist"
    );
  }
  const emailExist: User = await UserService.userExists({ email });
  if (emailExist) {
    return sendResponse(res, httpStatus.OK, null, false, "Email already exist");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const user: User = await userService.userCreate({
    userName,
    email,
    password: hashPassword,
  });

  return sendResponse(
    res,
    httpStatus.OK,
    {
      userName: user.userName,
      email: user.email,
      avatar: user.avatar,
      _id: user._id,
    },
    true
  );
});
