import { Request, Response } from "express";
import httpStatus from "http-status";
import UserService from "../services/user.service";
import { catchAsync } from "../utils/catchAsync";
import bcrypt from "bcrypt";
import userService from "../services/user.service";
import { User } from "../utils/types";
import {
  generateJwtRefreshToken,
  generateJwtToken,
  sendResponse,
} from "../services/shared.service";

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
  const token: string = generateJwtToken(user, "2h");
  const refreshToken: string = generateJwtRefreshToken(user, "1y");

  return sendResponse(
    res,
    httpStatus.OK,
    {
      userName: user.userName,
      email: user.email,
      avatar: user.avatar,
      _id: user._id,
      token,
      refreshToken,
    },
    true
  );
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { userName, password } = req.body;
  const userExist: User = await UserService.userExists({ userName });

  if (!userExist) {
    return sendResponse(
      res,
      httpStatus.OK,
      null,
      false,
      "User name does not exist"
    );
  }

  const comparePassword = await bcrypt.compare(password, userExist.password!);
  if (!comparePassword) {
    return sendResponse(res, httpStatus.OK, null, false, "Incorrect password");
  }
  const token: string = generateJwtToken(userExist, "2h");
  const refreshToken: string = generateJwtRefreshToken(userExist, "1y");
  return sendResponse(
    res,
    httpStatus.OK,
    {
      userName: userExist.userName,
      email: userExist.email,
      avatar: userExist.avatar,
      _id: userExist._id,
      token,
      refreshToken,
    },
    true
  );
});
