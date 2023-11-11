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

// user profile schemas
export const updateProfileSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  email: Joi.string().email().required(),
});

export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().min(6).max(12).required(),
  newPassword: Joi.string().min(6).max(12).required(),
  confirmPassword: Joi.string().min(6).max(12).required(),
});

// channel schemas
export const channelDetailsSchema = Joi.object({
  channelId: Joi.string().required(),
});

export const channelSettingsSchema = Joi.object({
  description: Joi.string().min(10).max(200).required(),
  title: Joi.string().min(3).max(40).required(),
});
