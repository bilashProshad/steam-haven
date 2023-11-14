import express from "express";
import ExpressValidation from "express-joi-validation";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import {
  getChannelSettings,
  updateChannelSettings,
  updateThumbnail,
} from "../controllers/settingsController.js";
import { channelSettingsSchema } from "../validateSchemas.js";
import { upload } from "../cloudinary/index.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";

const router = express.Router();
const validator = ExpressValidation.createValidator({});

router.get("/channel", isAuthenticatedUser, getChannelSettings);
router.put(
  "/channel",
  isAuthenticatedUser,
  validator.body(channelSettingsSchema),
  updateChannelSettings
);
router.put(
  "/thumbnail",
  isAuthenticatedUser,
  catchAsyncErrors(upload.single("image")),
  updateThumbnail
);

export const settingsRoutes = router;
