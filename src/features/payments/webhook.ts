import { Request, Response } from "express";
import { Stripe } from "stripe";
import { HTTP_STATUS_CODES } from "../../constants";
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from "../../config";

const stripeWebhook = async (req: Request, res: Response) => {
  const stripe = new Stripe(`${STRIPE_SECRET_KEY}`);
  const endpointSecret = `${STRIPE_WEBHOOK_SECRET}`;

  const sig = req.headers["stripe-signature"];

  if (typeof sig !== "string") {
    console.error("Invalid Stripe Signature");
    return res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .send("Invalid Stripe Signature");
  }
  let event;

  try {
    if (!sig) {
      console.error();
    }
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log("Payment succesful", paymentIntent);
        // Fulfill the order
        break;
      case "payment_intent.payment_failed":
        const paymentFailedIntent = event.data.object;
        // I would normally Notify the customer that their payment has failed
        console.error("payment failed", paymentFailedIntent);
        break;
      // Handle other event types as needed
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error: any) {
    console.error("Webhook Error:", error.message);
    // This would normally be sent to a log in real scenario
  }
};

export { stripeWebhook };
