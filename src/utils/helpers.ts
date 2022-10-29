import { Response } from "express";
import httpStatus from "http-status";

export const isAlphaNumeric = (str: any) => {
  const specialChars = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
  return !specialChars.test(str.toString());
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
