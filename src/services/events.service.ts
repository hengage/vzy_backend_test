import { EventEmitter } from "events";
import { paymentsService } from "../features/payments";
import { addStripeId } from "../features/users";

const eventEmitter = new EventEmitter();

export const emitEvent = (eventName: string, message: any) => {
  console.log({ eventMessage: message });

  eventEmitter.emit(eventName, message);
};

eventEmitter.on("create-stripe-customer", async (data) => {
  console.log({ eventData: data });

  try {
    const customer = await paymentsService.createCustomer(data)
    await addStripeId(customer.id)
    
  } catch (error: any) {
    console.log({ error });
  }
});
