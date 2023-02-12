import { useMutation } from "@tanstack/react-query";
import { accessClient } from "../../../utils/axios/axios";
import useAuthStore from "../../stores/useAuthStore";

const signUpUser = async ({
  email,
  password,
  firstName,
  lastName,
  confirmPassword,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
}) => {
  console.log("REACHED HERE");
  return accessClient.post("/auth/signup", {
    email,
    password,
    firstName,
    lastName,
    confirmPassword,
  });
};

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: signUpUser,
    onError: (error) => {
      console.log(error);
    },
  });
};
