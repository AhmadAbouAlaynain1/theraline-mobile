import { useMutation, useQueryClient } from "@tanstack/react-query";
import { accessClient } from "../../../utils/axios/axios";

const sendMessage = async ({
  text,
  chatId,
}: {
  text: string;
  chatId: string;
}) => {
  return accessClient.post(`/message/${chatId}/send_message`, {
    text,
  });
};

export const useSendMessage = ({ chatId }: { chatId: string }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatMessages", chatId] });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
