import { useMutation } from "@tanstack/react-query";
import { accessClient } from "../../../utils/axios/axios";

const signUpUser = async ({
  email,
  password,
  firstName,
  lastName,
  expoToken,
  image,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  expoToken: string | undefined;
  image: string | undefined;
}) => {
  return accessClient.post("/auth/signup", {
    email,
    password,
    firstName,
    lastName,
    expoToken,
    image,
  });
};

export const useSignUpMutation = () =>
  useMutation({
    mutationFn: signUpUser,
    onError: (error) => {
      console.log(error);
    },
  });
