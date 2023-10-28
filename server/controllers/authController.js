import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Channel } from "../models/Channel.js";
import { User } from "../models/User.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { sendToken } from "../utils/sendJwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return next(
      new ErrorHandler(400, "Password and confirm password must be same")
    );
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(
      new ErrorHandler(409, "You are already registered with this email")
    );
  }

  // user = await User.create({ username, email: email.toLowerCase(), password });
  user = await new User({ username, email: email.toLowerCase(), password });
  const channel = await new Channel({ owner: user._id });
  user.channel = channel._id;

  await user.save();
  await channel.save();

  sendToken(user, 201, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() }).select(
    "+password"
  );
  if (!user) {
    return next(new ErrorHandler(401, "Invalid email or password"));
  }

  const passwordMatched = await user.comparePassword(password);
  if (!passwordMatched) {
    return next(new ErrorHandler(401, "Invalid email or password"));
  }

  sendToken(user, 200, res);
});
