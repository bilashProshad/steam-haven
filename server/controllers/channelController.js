import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Channel } from "../models/Channel.js";
import { User } from "../models/User.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";

export const followChannel = catchAsyncErrors(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { channelId } = req.params;

  const channel = await Channel.findByIdAndUpdate(
    channelId,
    {
      $addToSet: { followers: userId },
    },
    { new: true }
  );
  if (!channel) {
    return next(new ErrorHandler(404, "Channel not found."));
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $addToSet: { followedChannels: channelId },
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    user,
    channel,
    message: "Channel followed successfully",
  });
});

export const unfollowChannel = catchAsyncErrors(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { channelId } = req.params;

  const channel = await Channel.findByIdAndUpdate(
    channelId,
    {
      $pull: { followers: userId },
    },
    { new: true }
  );
  if (!channel) {
    return next(new ErrorHandler(404, "Channel not found."));
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $pull: { followedChannels: channelId },
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    user,
    channel,
    message: "Channel followed successfully",
  });
});

export const getFollowedChannel = catchAsyncErrors(async (req, res, next) => {
  const { _id: userId } = req.user;

  const channels = await Channel.find({ followers: userId }).populate(
    "owner",
    "username"
  );

  res.status(200).json({
    success: true,
    channels,
  });
});

export const getChannelDetails = catchAsyncErrors(async (req, res, next) => {
  const { channelId } = req.params;

  const channel = await Channel.findById(channelId).populate(
    "owner",
    "username"
  );

  if (!channel || !channel.isActive) {
    return next(new ErrorHandler(404, "Channel not found"));
  }

  const { _id, title, description, owner, avatar } = channel;
  const numberOfFollowers = channel.followers.length;

  const streamUrl = "http";
  const isOnline = false;
  let following = false;

  const { token } = req.cookies;

  if (!token) {
    return res.status(200).json({
      success: true,
      channel: {
        _id,
        title,
        description,
        avatar,
        owner,
        numberOfFollowers,
        following,
        streamUrl,
        isOnline,
      },
    });
  }

  const decodedData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
  const isFollowedUser = await Channel.findOne({
    _id: channelId,
    followers: decodedData._id,
  });
  following = !!isFollowedUser;

  res.status(200).json({
    success: true,
    channel: {
      _id,
      title,
      description,
      avatar,
      owner,
      numberOfFollowers,
      following,
      streamUrl,
      isOnline,
    },
  });
});

export const getChannels = catchAsyncErrors(async (req, res, next) => {
  const channels = await Channel.find({ isActive: true })
    .select("title thumbnail owner")
    .populate("owner", "username avatar");

  res.status(200).json({
    success: true,
    channels,
  });
});
