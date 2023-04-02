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
  const { setAccessToken, setRefreshToken, setIsAuthenticated } =
    useAuthStore();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAccessToken(data.data.accessToken);
      setRefreshToken(data.data.refreshToken);
      setIsAuthenticated(true);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
