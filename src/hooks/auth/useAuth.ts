import useAuthStore from "../stores/useAuthStore";

export const useAuth = () => {
  const {
    setAccessToken,
    setRefreshToken,
    setUser,

    setIsAuthenticated,
  } = useAuthStore();

  const login = (email: string, password: string) => {
    // Axios login and set data to store
  };

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
    phone: string
  ) => {
    // Axios register and set data to store
  };

  return { login, logout, register };
};
