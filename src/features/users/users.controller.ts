import { Request, Response } from "express";
import { handleErrorResponse } from "../../utils";
import { userRegistrationRepo } from "./users.repo";
import { HTTP_STATUS_CODES } from "../../constants";
import { checkEmailIsTaken, checkPhoneNumberIsTaken } from "./users.service";
import { validateRegistration } from "./users.validation";

const userRegistrationController = async (req: Request, res: Response) => {
  try {
    await validateRegistration(req.body)

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

export { userRegistrationController };
