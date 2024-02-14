import { Router } from "express";
import { stripeWebhook } from "../webhook";
import express from "express";

class WebHookRoutes {
  public router: Router;
  constructor() {
    this.router = Router();

    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route("/").post(
        express.raw({ type: "application/json" }),
        
        stripeWebhook
        );
  }
}

export const webHookRoutes = new WebHookRoutes();
