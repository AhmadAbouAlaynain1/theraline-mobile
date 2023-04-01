import React from "react";
import { Text, View, ImageBackground } from "react-native";
import { Slot, Stack } from "expo-router";

const image = { uri: "https://reactjs.org/logo-og.png" };

const AuthLayout = () => {
  return (
    <ImageBackground source={image} className="flex-1">
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      />
    </ImageBackground>
  );
};

export default AuthLayout;
