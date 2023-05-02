import { useMutation, useQueryClient } from "@tanstack/react-query";
import { accessClient } from "../../../utils/axios/axios";

const rejectAppointment = async ({
  appointment_id,
}: {
  appointment_id: string;
}) => {
  return accessClient.post(
    `/appointment/${appointment_id}/confirm_appointment`,
  );
};

export const useRejectAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rejectAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
