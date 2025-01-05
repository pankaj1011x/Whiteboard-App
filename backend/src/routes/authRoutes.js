import { Router } from "express";
import {
  forgotPassword,
  resetPassword,
  signinController,
  signupController,
} from "../controllers/authControllers.js";
export const authRouter = Router();

authRouter.post("/signup", signupController);
authRouter.post("/signin", signinController);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);
