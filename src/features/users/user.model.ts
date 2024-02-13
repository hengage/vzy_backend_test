import { Schema, model } from "mongoose";
import { IUserDocument } from "./users.interface";
import { USER_ACCOUNT_STATUS, USER_PAYMENT_STATUS } from "../../constants";

const userSchema = new Schema<IUserDocument>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    paymentStatus: {
      type: String,
      enum: Object.values(USER_PAYMENT_STATUS),
      default: USER_PAYMENT_STATUS.UNPAID,
    },
    accountStatus: {
      type: String,
      enum: Object.values(USER_ACCOUNT_STATUS),
      default: USER_ACCOUNT_STATUS.ACTIVE,
    },
  },
  { timestamps: true }
);

export const User = model<IUserDocument>("User", userSchema);
