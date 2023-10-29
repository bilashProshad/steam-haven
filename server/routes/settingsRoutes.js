import express from "express";
import ExpressValidation from "express-joi-validation";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import {
  changeChannelPassword,
  getChannelSettings,
  updateChannelSettings,
} from "../controllers/settingsController.js";
import {
  changePasswordSchema,
  channelSettingsSchema,
} from "../validateSchemas.js";

const router = express.Router();
const validator = ExpressValidation.createValidator({});

router.get("/channel", isAuthenticatedUser, getChannelSettings);
router.put(
  "/channel",
  isAuthenticatedUser,
  validator.body(channelSettingsSchema),
  updateChannelSettings
);
router.patch(
  "/password",
  isAuthenticatedUser,
  validator.body(changePasswordSchema),
  changeChannelPassword
);

export const settingsRoutes = router;
