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
      className="p-4 flex flex-row gap-2 h-28 w-full justify-between bg-white "
      style={{
        borderRadius: 30,
        overflow: "hidden",
      }}
      onPress={() => {
        console.log("Pressed");
        navigation.navigate("groupChat", dataToSend);
      }}>
      <Image
        className="w-[20%] h-full  self-center "
        style={{
          borderRadius: 50,
        }}
        source={bgImage}
      />
      <View className="flex flex-col justify-between w-[60%]">
        <Text className="font-bold">Group Name</Text>
        <Text className="text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, nobis!
        </Text>
      </View>
      <View className="flex flex-col justify-between items-center">
        <Text className="text-gray-400 text-center">12:14pm</Text>
        <View
          className=" bg-primary w-8 "
          style={{
            borderRadius: 50,
          }}>
          <Text className="text-center text-white text-xl">12</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default GroupCell;
