import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Channel } from "../models/Channel.js";
import { User } from "../models/User.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { sendToken } from "../utils/sendJwtToken.js";

export const getChannelSettings = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;

  const channel = await Channel.findOne({ owner: user._id })
    .select("-messages -updatedAt")
    .populate("owner", "username");

  return res.status(200).json({
    success: true,
    channel,
  });
});

export const updateChannelSettings = catchAsyncErrors(
  async (req, res, next) => {
    const user = req.user;

    const { username, description, title, avatar } = req.body;

    if (user.username !== username) {
      await User.findByIdAndUpdate(user._id, { username });
    }

    const channel = await Channel.findByIdAndUpdate(
      user.channel,
      {
        title,
        description,
        avatar,
        isActive: true,
      },
      { new: true }
    ).populate("owner", "username");

    return res.status(200).json({
      success: true,
      channel,
    });
  }
);
