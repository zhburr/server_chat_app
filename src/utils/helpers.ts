import { Response } from "express";

export const isAlphaNumeric = (str: any) => {
  const specialChars = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
  return !specialChars.test(str.toString());
};
