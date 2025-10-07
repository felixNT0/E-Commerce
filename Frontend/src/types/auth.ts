export type LoginPayload = {
  email: string;
  password: string;
};

// ADDED CODE (matches backend response structure):
export type LoginResponse = {
  token: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userName: string;
  dateOfBirth: string;
  role?: string;
};

export type RegisterResponse = {
  token: string;
};
