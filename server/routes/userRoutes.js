import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import {
  profile,
  updatePassword,
  updateProfile,
} from "../controllers/userController.js";
import ExpressValidation from "express-joi-validation";
import {
  changePasswordSchema,
  updateProfileSchema,
} from "../validateSchemas.js";

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

export const userRoutes = router;
