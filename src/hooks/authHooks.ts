import { useMutation, useQuery } from "@tanstack/react-query";
import AuthAPI, { type LoginPayload, type RegisterPayload } from "../api/auth";

export const useGetMyProfile = ({ enabled = true } = {}) => {
  return useQuery({
    queryKey: ["me"],
    queryFn: AuthAPI.getMe,
    retry: false,
    enabled,
    staleTime: 1000 * 60 * 5,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: LoginPayload) => AuthAPI.login(payload),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => AuthAPI.register(payload),
  });
};
