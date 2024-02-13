import { User } from "./user.model";
import { IRegisterUser } from "./users.interface";

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

export { userRegistrationRepo };
