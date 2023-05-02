import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { accessClient } from "../../../utils/axios/axios";

const getArticles = async (
  article_id: string,
): Promise<
  AxiosResponse<{
    _id: string;
    title: string;
    date: Date;
    content: string;
  }>
> => {
  const res = await accessClient.get(`/articles/article/${article_id}`);
  return res.data;
};

export const useGetArticles = ({ article_id }: { article_id: string }) => {
  return useQuery({
    queryKey: ["articles", article_id],
    select: (data) => data.data,
    queryFn: () => getArticles(article_id),
  });
};
