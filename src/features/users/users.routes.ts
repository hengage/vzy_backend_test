import { Router } from "express";
import { userRegistrationController } from "./users.controller";

class UsersRoutes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`/`, userRegistrationController);
  }
}

export const usersRoutes = new UsersRoutes();
