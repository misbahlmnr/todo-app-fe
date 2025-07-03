import { useGetMyProfile } from "./authHooks";

export const useAuth = () => {
  const token = localStorage.getItem("token");

  const enabledToFetch = !!token;

  const {
    data: user,
    isLoading,
    isError,
  } = useGetMyProfile({ enabled: enabledToFetch });

  return {
    user,
    isLoading,
    isError,
    isAuthenticated: !!user && !isError,
  };
};
