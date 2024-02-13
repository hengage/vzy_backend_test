import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "./config";

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
  
  export {
    toLowerCaseSetter,
    encryptValue,
    compareValues,
    generateJWTToken,
  };