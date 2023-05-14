import { useMutation } from "@tanstack/react-query";
import { accessClient } from "../../../utils/axios/axios";

const createConversation = (data: { users_id: string[] }) => {
  return accessClient.post("/groups/create_convo", data);
};

export const useCreateConveration = () => {
  return useMutation({
    mutationFn: createConversation,

    onError: (error) => {
      console.log(error);
    },
  });
};
