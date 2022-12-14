import { User } from "../utils/types";
import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateJwtToken = (user: User, expires: string): string => {
  const token: string = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY!, {
    expiresIn: expires,
  });

  return token;
};

export const generateJwtRefreshToken = (
  user: User,
  expires: string
): string => {
  const token: string = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_TOKEN_KEY!,
    {
      expiresIn: expires,
    }
  );

  return token;
};

export const verifyRefreshToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_KEY!);
    return { user: decoded };
  } catch (error) {
    return false;
  }
};

export function sendResponse(
  res: Response,
  status: number,
  body: any,
  succeed: boolean,
  message?: string
) {
  let _data = {
    Content: body,
    Succeed: succeed,
  };
  if (!succeed) {
    Object.assign(_data, { message });
  }
  return res.status(status).json(_data);
}
