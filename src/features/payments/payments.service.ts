import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "../../config";
import { IUserDocument } from "../users";

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

    return customer
  }
}

export const paymentsService = new PaymentsService(`${STRIPE_SECRET_KEY}`);
