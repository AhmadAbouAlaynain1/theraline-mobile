import React from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  Platform,
  Pressable,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import useGetMessages from "../../hooks/queries/chats/useGetMessages";
import { useSendMessage } from "../../hooks/mutations/groups/useSendMessage";

function ItemSeperator() {
  return <View className="h-1" />;
}

function GroupChat({ route, navigation }: any) {
  const { chatId, chatName } = route.params;
  navigation.setOptions({ title: chatName });
  const {
    data: messages,
    isLoading,
    isError,
  } = useGetMessages({
    chatId,
  });
  const { mutate: sendMessage } = useSendMessage({
    chatId,
  });

  const [textMessage, setTextMessage] = React.useState("");
  const flatListRef = React.useRef<FlatList>(null);

  if (isLoading) {
    return (
      <View className="flex h-full items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex h-full items-center justify-center">
        <Text>An Error has occured</Text>
      </View>
    );
  }
  if (!messages) {
    return (
      <View>
        <Text>Start your conversation!</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={100}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex flex-1 flex-col items-end justify-end ">
      <View className="w-full flex-1">
        {/* Flat List With Messages inside */}
        <FlatList
          ref={flatListRef}
          onContentSizeChange={() => {
            flatListRef.current?.scrollToEnd({
              animated: true,
            });
          }}
          className="h-full w-full"
          directionalLockEnabled
          data={messages}
          renderItem={({ item }) => (
            <View
              className={`flex w-full flex-row p-4 ${
                item.sentByMe ? "justify-end" : "justify-start"
              }`}>
              <View
                className={`flex w-[65%] flex-col p-2 ${
                  item.sentByMe ? "bg-primaryLight" : "bg-primary"
                } `}
                style={{
                  borderRadius: 10,
                }}>
                {!item.sentByMe && (
                  <Text className="font-bold text-white">{item.username}</Text>
                )}
                <View className="flex-row">
                  <Text
                    className={`w-6/12 ${
                      item.sentByMe ? "text-black" : "text-white"
                    }`}>
                    {item.text}
                  </Text>
                  <Text
                    className={`${item.sentByMe && "text-right"} font-light ${
                      item.sentByMe ? "text-black" : "text-white"
                    } mt-auto w-6/12`}>
                    {item.send_at
                      ? new Date(item.send_at).toLocaleString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                          day: "numeric",
                          month: "short",
                        })
                      : ""}
                  </Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item._id.toString()}
          ItemSeparatorComponent={ItemSeperator}
        />
      </View>
      <View className="flex h-16 w-full flex-row items-center justify-center p-2">
        <TextInput
          className="w-[80%] bg-white p-3 "
          style={{
            borderRadius: 10,
          }}
          value={textMessage}
          placeholder="Type a message..."
          onChangeText={(text) => setTextMessage(text)}
        />

        <Pressable
          className="flex w-[20%] items-center"
          onPress={() => {
            sendMessage({ text: textMessage, chatId });
            setTextMessage("");
          }}>
          <FontAwesome name="arrow-circle-right" size={50} color="#00D2F6" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

export default GroupChat;
