import useAuthStore from "../stores/useAuthStore";

export const useAuth = () => {
  const {
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
    setUser,
    user,
  } = useAuthStore();

  const login = (email: string, password: string) => {
    // Axios login and set data to store
  };

  const logout = () => {
    setAccessToken("");
    setRefreshToken("");
    setUser({});
  };

  const register = (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string
  ) => {
    // Axios register and set data to store
  };

  return { login, logout, register };
};
