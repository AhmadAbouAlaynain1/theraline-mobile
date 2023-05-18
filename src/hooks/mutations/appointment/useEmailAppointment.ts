import { useMutation } from "@tanstack/react-query";
import { accessClient } from "../../../utils/axios/axios";

const emailAppointment = async ({
  appointmentId,
}: {
  appointmentId: string;
}) => {
  return accessClient.post(`/appointment/${appointmentId}/export_appointment`);
};

export const useEmailAppointmentMutation = () => {
  return useMutation({
    mutationFn: emailAppointment,
    onError: (error) => {
      console.log(error);
    },
  });
};
