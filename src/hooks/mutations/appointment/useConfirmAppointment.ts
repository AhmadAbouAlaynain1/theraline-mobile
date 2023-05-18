import { useMutation, useQueryClient } from "@tanstack/react-query";
import { accessClient } from "../../../utils/axios/axios";

const confirmAppointment = async ({
  appointment_id,
}: {
  appointment_id: string;
}) => {
  return accessClient.patch(
    `/appointment/${appointment_id}/confirm_appointment`,
  );
};

export const useConfirmAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: confirmAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
