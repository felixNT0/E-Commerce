import { LoginPayload } from "@/types/auth";
import { mutator } from "@/util/axios";
import { endpoints } from "@/util/endpoints";
import { queryKeys } from "@/util/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

export function useLogin() {
  const queryClient = useQueryClient();
  const { data, isPending, mutateAsync, error, isError } = useMutation<
    Response,
    any,
    LoginPayload
  >({
    mutationFn: async (body: LoginPayload) =>
      await mutator<Response>({
        url: endpoints.auth.login,
        data: body,
        method: "POST",
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.root });
    },
  });

  return useMemo(
    () => ({
      loginData: data,
      loginLoading: isPending,
      login: mutateAsync,
      loginError: error,
      isError,
    }),
    [isPending, data, mutateAsync]
  );
}

// export function useRegister() {
//   const queryClient = useQueryClient();

//   const {data, isPending, mutateAsync} = useMutation<
//     Response,
//     any,
//     RegisterPayload
//   >({
//     mutationFn: async (body: RegisterPayload) =>
//       await mutator({
//         url: endpoints.auth.register,
//         data: body,
//         method: 'POST',
//       }),

//     onSuccess: () => {
//       queryClient.invalidateQueries({queryKey: queryKeys.user.root});
//     },
//   });

//   return useMemo(
//     () => ({
//       registerData: data,
//       registerLoading: isPending,
//       register: mutateAsync,
//     }),
//     [isPending, data, mutateAsync],
//   );
// }

// export function useUpdateBio() {
//   const queryClient = useQueryClient();

//   const {data, isPending, mutateAsync} = useMutation<
//     Response,
//     any,
//     UpdateBioPayload
//   >({
//     mutationFn: async (body: UpdateBioPayload) =>
//       await mutator({
//         url: endpoints.auth.updateBio,
//         data: body,
//         method: 'POST',
//       }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({queryKey: queryKeys.user.root});
//     },
//   });

//   return useMemo(
//     () => ({
//       updateBioData: data,
//       updateBioLoading: isPending,
//       updateBio: mutateAsync,
//     }),
//     [isPending, data, mutateAsync],
//   );
// }

// export function useUpdateLocation() {
//   const queryClient = useQueryClient();

//   const {data, isPending, mutateAsync} = useMutation<
//     Response,
//     any,
//     UpdateLocationPayload
//   >({
//     mutationFn: async (body: UpdateLocationPayload) =>
//       await mutator({
//         url: endpoints.auth.updateLocation,
//         data: body,
//         method: 'POST',
//       }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({queryKey: queryKeys.user.root});
//     },
//   });

//   return useMemo(
//     () => ({
//       updateLocationData: data,
//       updateLocationLoading: isPending,
//       updateLocation: mutateAsync,
//     }),
//     [isPending, data, mutateAsync],
//   );
// }

// export function useUpdateProfessionalRecord() {
//   const queryClient = useQueryClient();

//   const {data, isPending, mutateAsync} = useMutation<
//     Response,
//     any,
//     UpdateProfessionalRecordPayload
//   >({
//     mutationFn: async (body: UpdateProfessionalRecordPayload) =>
//       await mutator({
//         url: endpoints.auth.updateProfessionalRecord,
//         data: body,
//         method: 'POST',
//       }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({queryKey: queryKeys.user.root});
//     },
//   });

//   return useMemo(
//     () => ({
//       updateProfessionalRecordData: data,
//       updateProfessionalRecordLoading: isPending,
//       updateProfessionalRecord: mutateAsync,
//     }),
//     [isPending, data, mutateAsync],
//   );
// }

// export function useResetPassword() {
//   const {data, isPending, mutateAsync} = useMutation<
//     any,
//     any,
//     ResetPasswordPayload
//   >({
//     mutationFn: async (body: ResetPasswordPayload) =>
//       await mutator({
//         url: endpoints.auth.resetPassword,
//         data: body,
//         method: 'POST',
//       }),
//   });

//   return useMemo(
//     () => ({
//       resetPasswordData: data,
//       resetPasswordLoading: isPending,
//       resetPassword: mutateAsync,
//     }),
//     [isPending, data, mutateAsync],
//   );
// }

// export function useVerifyOTP() {
//   const {data, isPending, mutateAsync} = useMutation<
//     any,
//     any,
//     VerifyOTPPayload
//   >({
//     mutationFn: async (body: VerifyOTPPayload) =>
//       await mutator({
//         url: endpoints.auth.verifyOTP,
//         data: body,
//         method: 'POST',
//       }),
//   });

//   return useMemo(
//     () => ({
//       verifyOTPData: data,
//       verifyOTPLoading: isPending,
//       verifyOTP: mutateAsync,
//     }),
//     [isPending, data, mutateAsync],
//   );
// }

// export function useForgotPassword() {
//   const {data, isPending, mutateAsync} = useMutation<
//     any,
//     any,
//     ForgotPasswordPayload
//   >({
//     mutationFn: async (body: ForgotPasswordPayload) =>
//       await mutator({
//         url: endpoints.auth.forgotPassword,
//         data: body,
//         method: 'POST',
//       }),
//   });

//   return useMemo(
//     () => ({
//       forgotPasswordData: data,
//       forgotPasswordLoading: isPending,
//       forgotPassword: mutateAsync,
//     }),
//     [isPending, data, mutateAsync],
//   );
// }
