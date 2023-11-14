import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import {
  profile,
  updateAvatar,
  updatePassword,
  updateProfile,
} from "../controllers/userController.js";
import ExpressValidation from "express-joi-validation";
import {
  changePasswordSchema,
  updateProfileSchema,
} from "../validateSchemas.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { upload } from "../cloudinary/index.js";

const router = express.Router();
const validator = ExpressValidation.createValidator({});

router.route("/me").get(isAuthenticatedUser, profile);
router
  .route("/me")
  .put(isAuthenticatedUser, validator.body(updateProfileSchema), updateProfile);
router
  .route("/password")
  .patch(
    isAuthenticatedUser,
    validator.body(changePasswordSchema),
    updatePassword
  );
router
  .route("/avatar")
  .put(
    isAuthenticatedUser,
    catchAsyncErrors(upload.single("image")),
    updateAvatar
  );

export const userRoutes = router;
