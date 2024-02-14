import { Request, Response } from "express";
import { handleErrorResponse } from "../../utils";
import { paymentsService } from "./payments.service";
import { HTTP_STATUS_CODES } from "../../constants";

const createPaymentsIntentController = async (req: Request, res: Response) => {
  const userId = (req as any).user._id;

  try {
    const paymentIntent = await paymentsService.createPaymentIntent(
      userId,
      req.body.amount,
      req.body.description
    );
    res.status(HTTP_STATUS_CODES.CREATED).json({
      success: true,
      data: { paymentIntent },
    });
  } catch (error: any) {
    handleErrorResponse(res, false, error);
  }
};

export { createPaymentsIntentController };
