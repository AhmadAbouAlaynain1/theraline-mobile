import React from "react";
import { View, Text } from "react-native";
import useAuthStore from "../../hooks/stores/useAuthStore";
import Button from "../buttons/Button";
import { useConfirmAppointment } from "../../hooks/mutations/appointment/useConfirmAppointment";
import { useRejectAppointment } from "../../hooks/mutations/appointment/useRejectAppointment";

function AppointmentCell({ appointment }: { appointment: any }) {
  console.log(appointment);
  const appointmentId = appointment._id;
  const { user } = useAuthStore();
  const { mutate: confirmAppointment, isLoading: confirming } =
    useConfirmAppointment();
  const { mutate: rejectAppointment, isLoading: rejecting } =
    useRejectAppointment();
  console.log(user);
  return (
    <View className="rounded-2xl bg-white p-6 shadow-2xl">
      {user === "DOCTOR" ? (
        <View className="flex flex-col gap-4">
          <View className=" flex flex-row justify-between">
            <Text className="text-xl font-bold">Appointment</Text>
            <Text className="text-base text-gray-600">
              {appointment.start_date.split("T")[0]}
            </Text>
          </View>
          <Text className="mb-6 w-full text-base text-gray-600">
            {appointment.patient.fullName}
          </Text>
        </View>
      ) : (
        <View>
          <View className="flex flex-col gap-4">
            <View className=" flex flex-row justify-between">
              <Text className="text-xl font-bold">Appointment</Text>
              <Text className="text-base text-gray-600">
                {appointment.start_date.split("T")[0]}
              </Text>
            </View>
            <Text className="w-full  text-base text-gray-600">
              Doctor Name: {appointment.doctor.fullName}
            </Text>
            <View className="flex flex-row justify-around gap-6">
              <Button
                classNames="w-[40%] h-16 p-2 bg-green-500"
                loading={confirming}
                onPress={() => {
                  confirmAppointment({
                    appointment_id: appointmentId,
                  });
                }}>
                Confirm
              </Button>

              <Button
                classNames="w-[40%] h-16 p-2 bg-red-500"
                loading={rejecting}
                onPress={() => {
                  rejectAppointment({
                    appointment_id: appointmentId,
                  });
                }}>
                Reject
              </Button>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

export default AppointmentCell;
