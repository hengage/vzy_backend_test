import { Router } from "express";

import { authMiddleware } from "../../middleware";
import { createPaymentsIntentController } from "./payments.controller";

class PaymentsRoutes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(authMiddleware);

    this.router.post(`/payment-intent`, createPaymentsIntentController);
  }
}

export const paymentsRoutes = new PaymentsRoutes();
