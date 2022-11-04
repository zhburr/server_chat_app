import Joi, { ObjectSchema } from "joi";

export const validateRegisterUser = {
  body: Joi.object().keys({
    userName: Joi.string().min(3).required(),
    email: Joi.string().required(),
    password: Joi.string().min(8).max(20).required(),
  }),
};

export const validateLoginUser = {
  body: Joi.object().keys({
    userName: Joi.string().min(3).required(),
    password: Joi.string().min(8).max(20).required(),
  }),
};
