import { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import { accessClient } from "../../../utils/axios/axios";

const getAvailableUsers = (): Promise<
  AxiosResponse<
    {
      _id: string;
      email: string;
      firstName: string;
      lastName: string;
    }[]
  >
> => {
  return accessClient.get(`/groups/user_convo`);
};

export const useGetAvailableUsers = () => {
  return useQuery({
    queryKey: ["availableUsers"],
    select: (data) => data.data,
    queryFn: getAvailableUsers,
  });
};
