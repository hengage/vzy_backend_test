import { NextFunction, Request, Response } from "express";

import  jwt  from "jsonwebtoken";

import { JWT_SECRET_KEY } from "../config";
import { HTTP_STATUS_CODES } from "../constants";

const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.headers.authorization?.split(" ")[1] || req.body.token;

    if (!token) {
      return res
        .status(HTTP_STATUS_CODES.BAD_REQUEST)
        .json({ message: "Token not provided" });
    }

    try {
      const decoded = jwt.verify(token, `${JWT_SECRET_KEY}`);
      (req as any).user = decoded;
      next();
    } catch (error: any) {
      return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({ message: error.message });
    }
  };

  export {
    authMiddleware
  }