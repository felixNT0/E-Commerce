export type IUser = {
  id: string;
  isLoggedIn?: false;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role?: string;
  dateOfBirth: string;
};
