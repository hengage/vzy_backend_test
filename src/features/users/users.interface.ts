import { Document } from "mongoose";
import { USER_ACCOUNT_STATUS, USER_PAYMENT_STATUS } from "../../constants";

export interface IUserDocument extends Document {
    _id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
    email: string;
    stripeId: string;
    paymentStatus: USER_PAYMENT_STATUS;
    accountStatus: USER_ACCOUNT_STATUS;
}

export interface IRegisterUser {
    firstName: string;  
    lastName: string;
    phoneNumber: string;
    password: string;
    email: string;
}