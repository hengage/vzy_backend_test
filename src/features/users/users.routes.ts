import { Router } from "express";
import {
  getUserProfileController,
  loginController,
  updateProfileController,
  userRegistrationController,
} from "./users.controller";
import { authMiddleware } from "../../middleware";

class UsersRoutes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`/`, userRegistrationController);
    this.router.post("/login", loginController);

    this.router.use(authMiddleware);
    this.router.route("/").get(getUserProfileController);
    this.router.patch("/", updateProfileController);
  }
}

export const usersRoutes = new UsersRoutes();
