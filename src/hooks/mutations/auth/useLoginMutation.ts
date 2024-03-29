import { useMutation } from "@tanstack/react-query";
import { accessClient } from "../../../utils/axios/axios";
import useAuthStore from "../../stores/useAuthStore";

const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => accessClient.post("/auth/signin", { email, password });

export const useLoginMutation = () => {
  const { setAccessToken, setRefreshToken, setIsAuthenticated, setUser } =
    useAuthStore();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAccessToken(data.data.access_token);
      setRefreshToken(data.data.refresh_token);
      setIsAuthenticated(true);
      setUser(data.data.role);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
