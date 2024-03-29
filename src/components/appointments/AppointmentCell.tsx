import React from "react";
import { View, Text, ScrollView } from "react-native";
import { format } from "date-fns";
import useAuthStore from "../../hooks/stores/useAuthStore";
import Button from "../buttons/Button";
import { useConfirmAppointment } from "../../hooks/mutations/appointment/useConfirmAppointment";
import { useRejectAppointment } from "../../hooks/mutations/appointment/useRejectAppointment";
import { useEmailAppointmentMutation } from "../../hooks/mutations/appointment/useEmailAppointment";

function AppointmentCell({ appointment }: { appointment: any }) {
  console.log(appointment);
  const appointmentId = appointment._id;
  const { user } = useAuthStore();
  const { mutate: confirmAppointment, isLoading: confirming } =
    useConfirmAppointment();
  const { mutate: rejectAppointment, isLoading: rejecting } =
    useRejectAppointment();
  const { mutate: emailAppointment } = useEmailAppointmentMutation();

  console.log(user);
  return (
    <ScrollView className="rounded-2xl bg-white p-6 shadow-2xl">
      {user === "DOCTOR" ? (
        <View className="flex flex-col gap-4">
          <View className=" flex flex-row justify-between">
            <Text className="text-xl font-bold">{appointment.title}</Text>
            <Text className="text-base text-gray-600">
              {appointment.start_date.split("T")[0]}
            </Text>
          </View>
          <Text className="text-base text-gray-600">
            Patient Name: {appointment.patient.fullName}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text className="text-base text-gray-600">
              Starts:{" "}
              {new Date(appointment.start_date).toDateString()
                ? format(new Date(appointment.start_date), "p")
                : format(new Date(appointment.start_date), "PP")}
            </Text>
            <Text className="text-base text-gray-600">
              Ends:{" "}
              {new Date(appointment.end_date).toDateString()
                ? format(new Date(appointment.end_date), "p")
                : format(new Date(appointment.end_date), "PP")}
            </Text>
          </View>
          <Text className="mb-6 w-full text-base text-gray-600">
            Status: {appointment.status}
          </Text>
        </View>
      ) : (
        <View>
          <View className="flex flex-col gap-4">
            <View className=" flex flex-row justify-between">
              <Text className="text-xl font-bold">{appointment.title}</Text>
              <Text className="text-base text-gray-600">
                {appointment.start_date.split("T")[0]}
              </Text>
            </View>
            <Text className="w-full  text-base text-gray-600">
              Doctor Name: {appointment.doctor.fullName}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text className="text-base text-gray-600">
                Starts:{" "}
                {new Date(appointment.start_date).toDateString()
                  ? format(new Date(appointment.start_date), "p")
                  : format(new Date(appointment.start_date), "PP")}
              </Text>
              <Text className="text-base text-gray-600">
                Ends:{" "}
                {new Date(appointment.end_date).toDateString()
                  ? format(new Date(appointment.end_date), "p")
                  : format(new Date(appointment.end_date), "PP")}
              </Text>
            </View>
            <Text className="mb-6 w-full text-base text-gray-600">
              Status: {appointment.status}
            </Text>
            {appointment.status === "CREATED" ? (
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
            ) : (
              <View className="flex flex-row justify-around gap-6">
                <Button
                  classNames="w-[40%] h-16 p-2 bg-green-500"
                  loading={confirming}
                  onPress={() => {
                    emailAppointment({
                      appointmentId: appointmentId.toString(),
                    });
                  }}>
                  Export
                </Button>
              </View>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

export default AppointmentCell;
