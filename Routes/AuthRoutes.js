import { registerAdmin, loginAdmin } from "../Controller/AuthController/AuthController.js";
import express from "express";

const AuthRouter = express.Router();

AuthRouter.route("/signup").post(registerAdmin);
AuthRouter.route("/login").post(loginAdmin);

export default AuthRouter;  