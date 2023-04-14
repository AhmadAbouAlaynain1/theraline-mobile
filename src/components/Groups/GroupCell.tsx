import React from "react";
import { Image, View, Text, Pressable } from "react-native";

const bgImage = require("../../../assets/bgAuth.png");

function GroupCell({ id, name, navigation }: any) {
  const dataToSend = {
    id,
    name,
  };
  return (
    <Pressable
      className="flex h-28 w-full flex-row justify-between gap-2 bg-white p-4 "
      style={{
        borderRadius: 30,
        overflow: "hidden",
      }}
      onPress={() => {
        console.log("Pressed");
        navigation.navigate("groupChat", dataToSend);
      }}>
      <Image
        className="h-full w-[20%]  self-center "
        style={{
          borderRadius: 50,
        }}
        source={bgImage}
      />
      <View className="flex w-[60%] flex-col justify-between">
        <Text className="font-bold">Group Name</Text>
        <Text className="text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, nobis!
        </Text>
      </View>
      <View className="flex flex-col items-center justify-between">
        <Text className="text-center text-gray-400">12:14pm</Text>
        <View
          className=" w-8 bg-primary "
          style={{
            borderRadius: 50,
          }}>
          <Text className="text-center text-xl text-white">12</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default GroupCell;
