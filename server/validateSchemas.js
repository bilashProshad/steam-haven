import Joi from "joi";

// auth validate schemas
export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  password: Joi.string().min(6).max(12).required(),
  confirmPassword: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(12).required(),
});
