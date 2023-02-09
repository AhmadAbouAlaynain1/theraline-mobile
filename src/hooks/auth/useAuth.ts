import useAuthStore from "../stores/useAuthStore";
import { useLoginMutation } from "../mutations/auth/useLoginMutation";

export const useAuth = () => {
  const {
    setAccessToken,
    setRefreshToken,
    setUser,

    setIsAuthenticated,
  } = useAuthStore();

  const logout = () => {
    setAccessToken("");
    setRefreshToken("");
    setUser({});
    setIsAuthenticated(false);
  };

  const register = (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
  ) => {
    // Axios register and set data to store
  };

  return { logout, register };
};
