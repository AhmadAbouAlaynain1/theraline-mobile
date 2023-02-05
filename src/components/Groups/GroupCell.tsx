import React from "react";
import { Image, View, Text, Pressable } from "react-native";

const GroupCell = ({
  id,
  name,
  description,
  time,
  unreadMessages,
  image,
  navigation,
}: any) => {
  return (
    <Pressable
      className="p-4 flex flex-row gap-2 h-28 w-full justify-between bg-white rounded-2xl "
      onPress={() => {
        console.log("Pressed");
        navigation.navigate("groupChat", { id });
      }}>
      <Image
        className="w-[20%] h-full rounded-[40%] self-center"
        source={require("../../../assets/bgAuth.png")}
      />
      <View className="flex flex-col justify-between w-[60%]">
        <Text className="font-bold">Group Name</Text>
        <Text className="text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, nobis!
        </Text>
      </View>
      <View className="flex flex-col justify-between items-center">
        <Text className="text-gray-400 text-center">12:14pm</Text>
        <View className=" bg-primary w-8 rounded-[50%]">
          <Text className="text-center text-white text-xl">12</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default GroupCell;
