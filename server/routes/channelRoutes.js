import express from "express";
import ExpressValidator from "express-joi-validation";
import { channelDetailsSchema } from "../validateSchemas.js";
import {
  followChannel,
  getChannelDetails,
  getChannels,
  getFollowedChannel,
  unfollowChannel,
} from "../controllers/channelController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

const validator = ExpressValidator.createValidator({});

router.put(
  "/follow/:channelId",
  isAuthenticatedUser,
  validator.params(channelDetailsSchema),
  followChannel
);

router.put(
  "/unfollow/:channelId",
  isAuthenticatedUser,
  validator.params(channelDetailsSchema),
  unfollowChannel
);

router.get("/followed", isAuthenticatedUser, getFollowedChannel);

router
  .route("/:channelId")
  .get(validator.params(channelDetailsSchema), getChannelDetails);

router.route("/").get(getChannels);

export const channelRoutes = router;
