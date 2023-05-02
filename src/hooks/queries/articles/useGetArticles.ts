import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { accessClient } from "../../../utils/axios/axios";

const getArticles = async (): Promise<
  AxiosResponse<{
    docs: {
      _id: string;
      title: string;
      date: Date;
      content: string;
    }[];
  }>
> => {
  const res = await accessClient.get("/articles/get_articles");
  return res.data;
};

export const useGetArticles = () => {
  return useQuery({
    queryKey: ["articles"],
    select: (data) => data.data.docs,
    queryFn: getArticles,
  });
};
