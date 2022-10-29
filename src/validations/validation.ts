import Joi, { ObjectSchema } from "joi";

export const validateRegisterUser = {
  body: Joi.object().keys({
    userName: Joi.string().min(3).required(),
    email: Joi.string().required(),
    password: Joi.string().min(8).max(20).required(),
  }),
};

// export const validateUpdateProfile = {
//   params: Joi.object().keys({
//     id: Joi.string().required()
//   }),
//   body: Joi.object().keys({
//     type: Joi.string().allow('').max(6),
//   })
// };

// export const deleteProfile = {
//   params: Joi.object().keys({
//     id: Joi.string().required()
//   })
// };
