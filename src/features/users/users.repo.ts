import { HTTP_STATUS_CODES } from "../../constants";
import { HandleException } from "../../handleException";
import { compareValues } from "../../utils";
import { User } from "./user.model";
import { IRegisterUser, IUserDocument } from "./users.interface";

const userRegistrationRepo = async (payload: IRegisterUser) => {
  const { firstName, lastName, phoneNumber, email, password } = payload;

  const user = await User.create({
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
  });

  return {
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    email: user.email,
  };
};

const loginRepo = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;

  const user = await User.findOne({ email }).select("email password").lean();

  if (user && (await compareValues(password, user.password))) {
    return { _id: user._id };
  } else {
    throw new HandleException(
      HTTP_STATUS_CODES.BAD_REQUEST,
      "Invalid email or password"
    );
  }
};

const updateProfileRepo = async (
  userId: string,
  payload: Partial<IUserDocument>
) => {
  const select = Object.keys(payload);
  if (select.length === 0) {
    throw new HandleException(
      HTTP_STATUS_CODES.BAD_REQUEST,
      "Plese provide a field to update"
    );
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: payload,
    },
    { new: true }
  ).select(select);

  return user;
};

export { userRegistrationRepo, loginRepo, updateProfileRepo };
