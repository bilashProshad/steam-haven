import express from "express";
import ExpressValidation from "express-joi-validation";
import { login, logout, register } from "../controllers/authController.js";
import { loginSchema, registerSchema } from "../validateSchemas.js";

const router = express.Router();

const validator = ExpressValidation.createValidator({});

router.route("/register").post(validator.body(registerSchema), register);

router.route("/login").post(validator.body(loginSchema), login);

router.route("/logout").get(logout);

export const authRoutes = router;
