import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  res.send("This is register route");
});

export const login = catchAsyncErrors(async (req, res, next) => {
  res.send("This is login route");
});
