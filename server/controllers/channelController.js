import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Channel } from "../models/Channel.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";

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

  const streamUrl = "http";
  const isOnline = false;

  res.status(200).json({
    success: true,
    channel: {
      _id,
      title,
      description,
      avatar,
      owner,
      streamUrl,
      isOnline,
    },
  });
});

export const getChannels = catchAsyncErrors(async (req, res, next) => {
  const channels = await Channel.find({ isActive: true })
    .select("title avatar owner")
    .populate("owner", "username");

  const modifiedChannels = channels.map((channel) => {
    return {
      _id: channel._id,
      title: channel.title,
      avatar: channel.avatar,
      username: channel.owner.username,
      isOnline: false,
    };
  });

  res.status(200).json({
    success: true,
    channels: modifiedChannels,
  });
});
