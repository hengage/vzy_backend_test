import { Request, Response } from "express";

import { generateJWTToken, handleErrorResponse } from "../../utils";
import {
  getUserProfileRepo,
  loginRepo,
  updateProfileRepo,
  userRegistrationRepo,
} from "./users.repo";
import { HTTP_STATUS_CODES } from "../../constants";
import { checkEmailIsTaken, checkPhoneNumberIsTaken } from "./users.service";
import {
  validateLogin,
  validateRegistration,
  validateUpdateProfile,
} from "./users.validation";

const userRegistrationController = async (req: Request, res: Response) => {
  try {
    await validateRegistration(req.body);

    await Promise.all([
      checkPhoneNumberIsTaken(req.body.phoneNumber),
      checkEmailIsTaken(req.body.email),
    ]);

    const user = await userRegistrationRepo(req.body);
    res.status(HTTP_STATUS_CODES.CREATED).json({
      success: true,
      data: { user },
    });
  } catch (error: any) {
    handleErrorResponse(res, false, error);
  }
};

const loginController = async (req: Request, res: Response) => {
  try {
    await validateLogin(req.body);

    const user = await loginRepo(req.body);
    const jwtPayload = { _id: user._id };
    const accessToken = generateJWTToken(jwtPayload, "1m");

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      data: { user, accessToken },
    });
  } catch (error: any) {
    handleErrorResponse(res, false, error);
  }
};

const getUserProfileController = async (req: Request, res: Response) => {
  const userid = (req as any).user._id;

  try {
    const user = await getUserProfileRepo(userid);
    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      data: { user },
    });
  } catch (error: any) {
    handleErrorResponse(res, false, error);
  }
};

const updateProfileController = async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  try {
    await validateUpdateProfile(req.body);

    const user = await updateProfileRepo(userId, req.body);
    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      data: { user },
    });
  } catch (error: any) {
    handleErrorResponse(res, false, error);
  }
};

export {
  userRegistrationController,
  loginController,
  updateProfileController,
  getUserProfileController,
};
