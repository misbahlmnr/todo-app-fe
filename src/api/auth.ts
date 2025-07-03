import { axiosInstance } from "../utils";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

const AuthAPI = {
  login: (payload: LoginPayload) => axiosInstance.post("/auth/login", payload),
  register: (payload: RegisterPayload) =>
    axiosInstance.post("/auth/register", payload),
  getMe: () => axiosInstance.get("/profile/me"),
};

export default AuthAPI;
