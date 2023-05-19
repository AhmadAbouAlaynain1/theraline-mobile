import { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import { accessClient } from "../../../utils/axios/axios";

const getAppointments = (): Promise<
  AxiosResponse<{
    docs: {
      _id: string;
      patient_id: string;
      doctor_id: string;
      start_date: Date;
      end_date: Date;
      status: string;
    }[];
  }>
> => {
  return accessClient.get(`/appointment/doctor/appointment`);
};

export const useGetAppointments = () => {
  return useQuery({
    queryKey: ["appointments"],
    select: (data) => {
      // Return by most recent date
      return data.data.docs
        .sort((a, b) => {
          return Number(b.start_date) - Number(a.start_date);
        })
        .reverse();
    },
    queryFn: getAppointments,
    refetchInterval: 2000,
  });
};
