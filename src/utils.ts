import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "./config";
import { HTTP_STATUS_CODES } from "./constants";
import { Response } from "express";

function toLowerCaseSetter(value: string): string {
  return value?.toLowerCase();
}

async function encryptValue(value: string): Promise<string> {
  const saltRounds = 10;
  const hashedValue = await bcrypt.hash(value, saltRounds);
  return hashedValue;
}

async function compareValues(plainValue: string, hashValue: string) {
  return bcrypt.compare(plainValue, hashValue);
}

function generateJWTToken(payload: any, expiresIn: string): string {
  return jwt.sign(payload, `${JWT_SECRET_KEY}`, { expiresIn });
}

function handleErrorResponse(
  res: Response,
  success: boolean,
  error: any
) {
  console.log({ error: { status: error.status, message: error.message } });

  const errorMessage =
    (error.status && error.status >= 500) || error.status === undefined
      ? "Server error"
      : error.message;

  res.status(error.status || HTTP_STATUS_CODES.SERVER_ERROR).json({
    success,
    message: errorMessage,
  });
}

export {
  toLowerCaseSetter,
  encryptValue,
  compareValues,
  generateJWTToken,
  handleErrorResponse,
};
