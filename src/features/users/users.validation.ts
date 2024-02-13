import joi from "joi";
import { IRegisterUser } from "./users.interface";
import { HTTP_STATUS_CODES } from "../../constants";
import { HandleException } from "../../handleException";

const validateRegistration = async (payload: IRegisterUser) => {
  const schema = joi.object({
    firstName: joi.string().label("First name").required(),
    lastName: joi.string().label("Last name").required(),
    phoneNumber: joi.string().label("Phone number").required(),
    email: joi.string().email().label("Email").required(),
    password: joi.string().label("Password").required(),
  });

  const { error } = schema.validate(payload, {
    allowUnknown: false,
    abortEarly: false,
  });

  if (error) {
    throw new HandleException(HTTP_STATUS_CODES.BAD_REQUEST, error.message);
  }
  return;
};

const validateLogin = async (payload: { email: string; password: string }) => {
  const schema = joi.object({
    email: joi.string().email().label("Email").required(),
    password: joi.string().label("Password").required(),
  });

  const { error } = schema.validate(payload, {
    allowUnknown: false,
    abortEarly: false,
  });

  if (error) {
    throw new HandleException(HTTP_STATUS_CODES.BAD_REQUEST, error.message);
  }
  return;
};

export { validateRegistration, validateLogin };
