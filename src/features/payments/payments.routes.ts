import { Router } from "express";

import { authMiddleware } from "../../middleware";
import { createPaymentsIntentController } from "./payments.controller";
import { stripeWebhook } from "./webhook";

class PaymentsRoutes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`/webhook`, stripeWebhook);

    this.router.use(authMiddleware);

    this.router.post(`/payment-intent`, createPaymentsIntentController);
  }
}

export const paymentsRoutes = new PaymentsRoutes();
