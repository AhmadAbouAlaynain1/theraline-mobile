import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { accessClient } from "../../../utils/axios/axios";

export type Message = {
  _id: string;
  text: string;
  user_id: string;
  send_at: Date;
  sentByMe: boolean;
  username: string;
};

export type GetMessages = {
  docs: Message[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: false;
  hasNextPage: true;
  prevPage: null;
  nextPage: number;
};

const getMessages = (chatId: string): Promise<AxiosResponse<GetMessages>> => {
  return accessClient.get(`/message/${chatId}/chat`);
};

const useGetMessages = ({ chatId }: { chatId: string }) => {
  return useQuery({
    queryKey: ["chatMessages", chatId],
    select: (data) =>
      data.data.docs.sort((a, b) => {
        if (a.send_at < b.send_at) {
          return -1;
        }
        if (a.send_at > b.send_at) {
          return 1;
        }
        return 0;
      }),
    refetchInterval: 1000,
    queryFn: () => getMessages(chatId),
    enabled: !!chatId,
  });
};

export default useGetMessages;
