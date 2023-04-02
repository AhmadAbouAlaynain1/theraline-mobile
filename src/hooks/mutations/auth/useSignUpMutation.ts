import { useMutation } from "@tanstack/react-query";
import { accessClient } from "../../../utils/axios/axios";

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
  return accessClient.post("/auth/signup", {
    email,
    password,
    firstName,
    lastName,
    confirmPassword,
  });
};

export const useSignUpMutation = () =>
  useMutation({
    mutationFn: signUpUser,
    onError: (error) => {
      console.log(error);
    },
  });
