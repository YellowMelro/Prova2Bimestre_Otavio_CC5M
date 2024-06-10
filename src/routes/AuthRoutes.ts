import { Router } from "express";
import AuthController from "../controllers/AuthController";

const AuthRouter = Router();

AuthRouter.post("/api/auth/signin", AuthController.signIn);

AuthRouter.post("/api/auth/signup", AuthController.signUp);

export default AuthRouter;