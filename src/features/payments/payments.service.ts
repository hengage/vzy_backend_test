import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "../../config";
import { IUserDocument, getStripeId } from "../users";
import { HandleException } from "../../handleException";
import { ICardPaymentMethod } from "./payments.interface";

class PaymentsService {
  public stripe: Stripe;
  public secretKey: string;

  constructor(secret: string) {
    this.secretKey = secret;
    this.stripe = new Stripe(this.secretKey);
  }

  public async createCustomer(user: Partial<IUserDocument>) {
    const customer = await this.stripe.customers.create({
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      metadata: { _id: user._id as string },
    });

    return customer;
  }

  private async createPaymentMethod(card: ICardPaymentMethod) {
    /* Cannot directly send card numbers  to the Stripe but i'll levave this here 
    as reference.
    The recommended way to create payment method using card is to do it 
    on the client-side, for the purpose of being PCI compliant
    */
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: "card",
      card,
    });

    return paymentMethod;
  }

  public async createPaymentIntent(userId: string, amount: number, card: any) {
    console.log({ amount });
    try {
      const user = await getStripeId(userId);
      /* 
       Create a PaymentIntent for the customer

       Use of payment method instead of card number as adviced by stripe
       https://stripe.com/docs/testing
       https://support.stripe.com/questions/enabling-access-to-raw-card-data-apis
       */
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amount * 100,
        currency: "usd",
        customer: user?.stripeId,
        description: "Payment for your product/service",
        payment_method: "pm_card_visa",
      });

      return paymentIntent;
    } catch (error: any) {
      console.error("Error creating PaymentIntent:", error);
      throw new HandleException(error.staus, error.message);
    }
  }
}

export const paymentsService = new PaymentsService(`${STRIPE_SECRET_KEY}`);
