import { Request, Response } from "express";
import { handleErrorResponse } from "../../utils";
import { userRegistrationRepo } from "./users.repo";
import { HTTP_STATUS_CODES } from "../../constants";

const userRegistrationController = async (req: Request, res: Response) => {
  try {
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
