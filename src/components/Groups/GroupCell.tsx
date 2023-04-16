import React from "react";
import { Image, View, Text, Pressable } from "react-native";
import { Chat } from "../../hooks/queries/chats/useGetChats";

function GroupCell({ chat, navigation }: { chat: Chat; navigation: any }) {
  const imageURL = chat.groupImage;
  const dataToSend = {
    chatId: chat._id,
    chatName: chat.name,
  };
  return (
    <Pressable
      className="flex h-28 w-full flex-row justify-between gap-2 bg-white p-4 "
      style={{
        borderRadius: 30,
        overflow: "hidden",
      }}
      onPress={() => {
        navigation.navigate("groupChat", dataToSend);
      }}>
      {imageURL ? (
        <Image
          className="h-[70] w-[70]  self-center "
          style={{
            borderRadius: 70 / 2,
          }}
          source={{
            uri: imageURL,
          }}
        />
      ) : (
        <View
          className="h-[70] w-[70] bg-gray-200 "
          style={{
            borderRadius: 70 / 2,
          }}
        />
      )}

      <View className="flex w-[55%] flex-col  ">
        <Text className="font-bold">{chat.name}</Text>
        <Text className="mt-2 text-gray-400">
          {chat.latestMessage?.text
            ? chat.latestMessage.text
            : "Start your chat here"}
        </Text>
      </View>
      <View className="flex flex-col items-center justify-between">
        <Text className="text-center text-gray-400">
          {chat.latestMessage?.send_at
            ? new Date(chat.latestMessage.send_at).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })
            : ""}
        </Text>
      </View>
    </Pressable>
  );
}

export default GroupCell;
