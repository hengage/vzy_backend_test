# VZY Backend Test

## Features
- User registration and authentication
- Update user records/profile
- Payments with stripe
- Error handling

## Architecture 
A component-based architecture, with each components(significant faeture) it's own logic and data access(services in this case),
and business modules. Vastly reduces great chnaces of a tightly coupled 'spaghetti' system.

## Payments Service

This project integrates with Stripe for handling payments. The `PaymentsService` class encapsulates functionality related to creating customers, payment methods, and payment intents. 
Additionally, it follows best practices recommended by Stripe to ensure PCI compliance and secure handling of sensitive payment information

### Steps
1. Create customer
To handle payments, a Stripe customer is created based on user details. It returns a response
with a customer id which is saved to the user's records.

2. Create Payment Intent
Create a payment intent for a specified user, amount, and description. This method handles PCI compliance by using payment methods instead of direct card numbers.

### Creating payment methods for a user
 The creation of payment methods using card details is recommended to be performed on the client-side to comply with PCI standards. 
 The provided method, `createPaymentmethod` is kept for reference. 
- [Stripe Testing Documentation](https://stripe.com/docs/testing)
- [Enabling Access to Raw Card Data APIs](https://support.stripe.com/questions/enabling-access-to-raw-card-data-apis)

 Otherwise payment method should be created before or when a payment intent is created

### Webhook Handling
The server listens for a webhook from stripe, When a payment intent is successful (payment_intent.succeeded), the webhook
updates the payment status for the corresponding customer.


## Error handling
There are two error handling methods: 

### Custom Error Handling
  Extends the built-in javascript Error class. This provides a structured way of
  handling errors. 

  To use this custom error handling method, instantiate the `HandleException` class with the desired status code, error message, and an optional flag indicating whether it should be treated as an HTTP error:

```typescript
import { HandleException } from "../path/to/handleException";

const error = new HandleException(404, 'Not Found', true);
throw error;
```

Although I would normally leave out the optional boolean param
```typescript
throw new HandleException(403, 'Your error message';
```
  
### Centralized Error Handling
  A more general error handling, used in liason with the custom error handler,
  with a dedicated 404 middleware.

  

## Running the app
First, install the dependencies 
`npm install`

Then build 
`npm run build`

Start the server: `npm start`

The server is directly run on node. In an enterprise app, I would normally run the server 
with PM2 to benefit from its robust process management capabilities and automatic restart features.
