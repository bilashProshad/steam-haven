export const sendToken = async (user, statusCode, res) => {
  const token = user.getAccessJWT();

  user = user.toObject();
  delete user.password;

  const tokenOptions = {
    httpOnly: process.env.NODE_ENV === "development" ? false : true,
    secure: process.env.NODE_ENV === "development" ? false : true,
    samesite: process.env.NODE_ENV === "development" ? false : "none",
    maxAge: 1000 * 60 * 60 * 24 * process.env.COOKIE_EXPIRE,
  };

  res.cookie("token", token, tokenOptions).status(statusCode).json({
    success: true,
    user,
  });
};
