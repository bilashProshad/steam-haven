import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/User.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { sendToken } from "../utils/sendJwtToken.js";
import cloudinary from "cloudinary";

export const profile = catchAsyncErrors(async (req, res, next) => {
  const user = User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const { username, email } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { username, email },
    { new: true }
  );
  if (!user) {
    return next(new ErrorHandler(404, "User not found"));
  }

  res.status(200).json({ success: true, user });
});

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;

  const { oldPassword, newPassword, confirmPassword } = req.body;

  const userData = await User.findById(user._id).select("+password");

  if (newPassword !== confirmPassword) {
    return next(
      new ErrorHandler(400, "New password and Confirm password must be same.")
    );
  }

  const passwordMatched = await userData.comparePassword(oldPassword);
  if (!passwordMatched) {
    return next(new ErrorHandler(400, "Invalid password. Please try again."));
  }

  userData.password = newPassword;

  await userData.save();

  sendToken(userData, 200, res);
});

export const updateAvatar = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user.avatar && user.avatar.public_id) {
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
  }

  const b64 = Buffer.from(req.file.buffer).toString("base64");
  let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

  const uploadedAvatar = await cloudinary.v2.uploader.upload(dataURI, {
    resource_type: "image",
    folder: "steam-haven/image",
    width: 250,
    crop: "scale",
  });

  user.avatar = {
    public_id: uploadedAvatar.public_id,
    url: uploadedAvatar.secure_url,
  };

  await user.save();

  res.status(200).json({
    success: true,
    user,
  });
});
