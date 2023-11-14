import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Channel } from "../models/Channel.js";
import cloudinary from "cloudinary";

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
    )
      .select("-messages -updatedAt")
      .populate("owner", "username");

    return res.status(200).json({
      success: true,
      channel,
    });
  }
);

export const updateThumbnail = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;

  const channel = await Channel.findOne({ owner: user._id })
    .select("-updatedAt -messages")
    .populate("owner", "username");

  if (channel.thumbnail && channel.thumbnail.public_id) {
    const imageId = channel.thumbnail.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
  }

  const b64 = Buffer.from(req.file.buffer).toString("base64");
  let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

  const uploadedThumbnail = await cloudinary.v2.uploader.upload(dataURI, {
    resource_type: "image",
    folder: "steam-haven/thumbnail",
    crop: "scale",
  });

  channel.thumbnail = {
    public_id: uploadedThumbnail.public_id,
    url: uploadedThumbnail.secure_url,
  };

  await channel.save();

  return res.status(200).json({
    success: true,
    channel,
  });
});
