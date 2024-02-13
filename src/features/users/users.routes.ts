import { Router } from "express";
import {
  loginController,
  userRegistrationController,
} from "./users.controller";

class UsersRoutes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`/`, userRegistrationController);
    this.router.post("/login", loginController);
  }
}

export const usersRoutes = new UsersRoutes();
