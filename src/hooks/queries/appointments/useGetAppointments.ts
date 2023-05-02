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
    select: (data) => data.data.docs,
    queryFn: getAppointments,
  });
};
