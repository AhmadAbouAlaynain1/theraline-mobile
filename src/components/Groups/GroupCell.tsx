/* eslint-disable no-nested-ternary */
import React from "react";
import { Image, View, Text, Pressable } from "react-native";
import { format } from "date-fns";
import { Chat } from "../../hooks/queries/chats/useGetChats";

function GroupCell({ chat, navigation }: { chat: Chat; navigation: any }) {
  const imageURL = chat.groupImage;
  const dataToSend = {
    chatId: chat._id,
    chatName: chat.name,
  };
  return (
    <Pressable
      className="flex h-28 w-full flex-row justify-start  bg-white p-4 "
      style={{
        borderRadius: 30,
        overflow: "hidden",
      }}
      onPress={() => {
        navigation.navigate("groupChat", dataToSend);
      }}>
      {imageURL ? (
        <Image
          className="h-[80] w-[80]  self-center "
          style={{
            borderRadius: 80 / 2,
          }}
          source={{
            uri: imageURL,
          }}
        />
      ) : (
        <View
          className="h-[80] w-[80] bg-gray-200 "
          style={{
            borderRadius: 80 / 2,
          }}
        />
      )}

      <View className="mx-2 flex flex-col">
        <Text className="font-bold">{chat.name}</Text>
        <Text className="mt-2 text-gray-400">
          {chat.latestMessage?.text
            ? chat.latestMessage.text
            : "Start your chat here"}
        </Text>
      </View>
      <View className="ml-auto flex flex-col items-center ">
        <Text className="text-center text-gray-400">
          {chat.latestMessage?.send_at
            ? new Date(chat.latestMessage.send_at).toDateString()
              ? format(new Date(chat.latestMessage.send_at), "p")
              : format(new Date(chat.latestMessage.send_at), "PP")
            : ""}
        </Text>
      </View>
    </Pressable>
  );
}

export default GroupCell;
