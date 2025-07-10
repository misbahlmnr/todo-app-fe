import { beforeEach, describe, expect, it, vi } from "vitest";
import AuthAPI from "../../api/auth";
import { axiosInstance } from "../../utils";

vi.mock("../utils", () => ({
  axiosInstance: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe("Auth API Test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call GET /profile/me endpoint", () => {
    AuthAPI.getMe();
    expect(axiosInstance.get).toHaveBeenCalledWith("/profile/me");
  });

  it("should call POST /auth/login endpoint", () => {
    const payload = { email: "email", password: "password" };
    AuthAPI.login(payload);
    expect(axiosInstance.post).toHaveBeenCalledWith("/auth/login", payload);
  });

  it("should call POST /auth/register endpoint", () => {
    const payload = { name: "name", email: "email", password: "password" };
    AuthAPI.register(payload);
    expect(axiosInstance.post).toHaveBeenCalledWith("/auth/register", payload);
  });
});
