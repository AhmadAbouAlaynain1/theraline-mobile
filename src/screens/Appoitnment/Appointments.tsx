import React from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGetAppointments } from "../../hooks/queries/appointments/useGetAppointments";
import AppointmentCell from "../../components/appointments/AppointmentCell";

function ItemSeperator() {
  return <View className="h-6" />;
}

function Appointments() {
  const insets = useSafeAreaInsets();
  const { data: appointments, isLoading, isError } = useGetAppointments();

  if (isLoading) {
    return (
      <SafeAreaView
        style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView
        style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}>
        <Text>Error...</Text>
      </SafeAreaView>
    );
  }

  console.log(appointments);

  return (
    <SafeAreaView
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}>
      {appointments.length === 0 ? (
        <View className="flex h-full items-center justify-center">
          <Text className="text-2xl">No Appointments</Text>
        </View>
      ) : (
        <FlatList
          className="min-h-full w-full"
          directionalLockEnabled
          data={appointments}
          renderItem={({ item }) => <AppointmentCell appointment={item} />}
          keyExtractor={(item) => item._id.toString()}
          ItemSeparatorComponent={ItemSeperator}
          contentContainerStyle={{
            marginHorizontal: 20,
            paddingTop: 10,
          }}
        />
      )}
    </SafeAreaView>
  );
}

export default Appointments;
