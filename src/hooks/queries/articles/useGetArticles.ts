import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { accessClient } from "../../../utils/axios/axios";

const getArticles = (): Promise<
  AxiosResponse<{
    docs: {
      _id: string;
      title: string;
      date: string;
      content: string;
      author: {
        name: string;
        image: string;
      };
    }[];
  }>
> => {
  return accessClient.get("/articles/get_articles");
};

export const useGetArticles = () => {
  return useQuery({
    queryKey: ["articles"],
    select: (data) => {
      console.log(data);
      return data.data.docs;
    },
    queryFn: getArticles,
    refetchInterval: 2000,
  });
};
