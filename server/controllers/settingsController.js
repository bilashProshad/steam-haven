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

    const { description, title } = req.body;

    const channel = await Channel.findByIdAndUpdate(
      user.channel,
      {
        title,
        description,
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
