import { HTTP_STATUS_CODES } from "../../constants";
import { HandleException } from "../../handleException";
import { User } from "./user.model";

const checkEmailIsTaken = async (email: string) => {
  const emailTaken = await User.findOne({ email }).select("email").lean();

  if (emailTaken) {
    throw new HandleException(
      HTTP_STATUS_CODES.CONFLICT,
      "An account already exists with the same email"
    );
  }
};

const checkPhoneNumberIsTaken = async (phoneNumber: string) => {
  const emailTaken = await User.findOne({ phoneNumber })
    .select("phoneNumber")
    .lean();

  if (emailTaken) {
    throw new HandleException(
      HTTP_STATUS_CODES.CONFLICT,
      "An account already exists with the same phone number"
    );
  }
};

export { checkEmailIsTaken, checkPhoneNumberIsTaken };
