import { Schema, model } from "mongoose";
import { IUserDocument } from "./users.interface";
import { USER_ACCOUNT_STATUS, USER_PAYMENT_STATUS } from "../../constants";
import {  encryptValue, toLowerCaseSetter } from "../../utils";

const userSchema = new Schema<IUserDocument>(
  {
    firstName: {
      type: String,
      required: true,
      set: toLowerCaseSetter,
    },
    lastName: {
      type: String,
      required: true,
      set: toLowerCaseSetter,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      set: toLowerCaseSetter,
    },
    password: { type: String, required: true },
    stripeId: {type: String, unique: true},
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

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await encryptValue(this.password);
    } catch (error: any) {
      return next(error);
    }
  }
});


export const User = model<IUserDocument>("User", userSchema);
