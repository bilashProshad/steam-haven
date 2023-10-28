import jwt from "jsonwebtoken";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { User } from "../models/User.js";

export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler(401, "Please login to access this resource"));
  }

  const decodedData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);

  req.user = await User.findById(decodedData._id).select("username email");

  next();
});
