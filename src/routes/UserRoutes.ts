import { Router } from "express";
import UserController from "../controllers/UserController";
import AuthMiddlewares from "../middlewares/src/middlewares/AuthMiddlewares";

const UserRouter = Router();

UserRouter.post("/api/user", UserController.createUser);

UserRouter.get("/api/users", AuthMiddlewares.userHasToken, UserController.listUsers);

UserRouter.patch("/api/user/:id", UserController.updateUser);

UserRouter.delete("/api/user/:id", UserController.deleteUser);

export default UserRouter;