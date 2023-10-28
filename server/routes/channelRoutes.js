import express from "express";
import ExpressValidator from "express-joi-validation";
import { channelDetailsSchema } from "../validateSchemas.js";
import {
  getChannelDetails,
  getChannels,
} from "../controllers/channelController.js";

const router = express.Router();

const validator = ExpressValidator.createValidator({});

router
  .route("/:channelId")
  .get(validator.params(channelDetailsSchema), getChannelDetails);

router.route("/").get(getChannels);

export const channelRoutes = router;
