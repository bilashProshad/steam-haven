import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/User.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { sendToken } from "../utils/sendJwtToken.js";

export const profile = catchAsyncErrors(async (req, res, next) => {
  const user = User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const { username, email } = req.body;

  const user = User.findByIdAndUpdate(
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
