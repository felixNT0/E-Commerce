import { IUser } from "@/types/user";

const getCurrentUser = (users: IUser[]): IUser | undefined => {
  const token = localStorage.getItem("token");
  if (!token) return undefined;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log("Decoded token payload:", payload); // 👈 add this
    const userId =
      payload[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
    const email =
      payload[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ];

    const foundUser = users.find(
      (u) => u.id === userId || u.userName === userId
    );
    return foundUser ? { ...foundUser, email } : undefined;
  } catch (err) {
    console.error("Failed to decode token:", err);
    return undefined;
  }
};
export { getCurrentUser };
