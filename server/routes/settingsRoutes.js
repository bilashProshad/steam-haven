import express from "express";
import ExpressValidation from "express-joi-validation";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import {
  getChannelSettings,
  updateChannelSettings,
} from "../controllers/settingsController.js";
import { channelSettingsSchema } from "../validateSchemas.js";

const router = express.Router();
const validator = ExpressValidation.createValidator({});

router.get("/channel", isAuthenticatedUser, getChannelSettings);
router.put(
  "/channel",
  isAuthenticatedUser,
  validator.body(channelSettingsSchema),
  updateChannelSettings
);

export const settingsRoutes = router;
