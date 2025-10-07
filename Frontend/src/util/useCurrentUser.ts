import { IUser } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "./axios";

// Backend user type
// export interface IUser {
//   userName: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   password?: string;
//   passwordConfirm?: string;
//   role?: string;
//   dateOfBirth?: string;
// }

export const useCurrentUser = () => {
  return useQuery<IUser[], Error>({
    queryKey: ["currentUser"],
    queryFn: () => fetcher<IUser[]>("/auth/users"),
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
