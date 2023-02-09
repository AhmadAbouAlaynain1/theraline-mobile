import React from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  Platform,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import SafeView from "../../components/General/SafeView";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";

const mockMessages = [
  {
    id: 1,
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, nobis!",
    time: "12:14pm",
    isMe: true,
  },
  {
    id: 2,
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, nobis!",
    time: "12:14pm",
    isMe: false,
  },
  {
    id: 3,
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, nobis!",
    time: "12:14pm",
    isMe: true,
  },
  {
    id: 4,
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, nobis!",
    time: "12:14pm",
    isMe: false,
  },
];

const GroupChat = ({ route }: any) => {
  const [text, setText] = React.useState("");
  const [messages, setMessages] = React.useState(mockMessages);
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={100}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex flex-1 flex-col justify-end items-end ">
      <View className="w-full flex-1">
        {/* Flat List With Messages inside */}
        <FlatList
          className="w-full h-full"
          contentContainerStyle={{
            height: "100%",
            justifyContent: "flex-start",
            flexDirection: "column-reverse",
          }}
          directionalLockEnabled={true}
          data={messages}
          renderItem={({ item }) => (
            <View
              className={`w-full flex flex-row p-4 ${
                item.isMe ? "justify-end" : "justify-start"
              }`}>
              <View
                className={`flex w-[65%] flex-col p-2 rounded-lg ${
                  item.isMe ? "bg-primaryLight" : "bg-primary"
                } `}>
                {!item.isMe && (
                  <Text className="font-bold text-white">John</Text>
                )}
                <View className="flex-row">
                  <Text
                    className={`w-8/12 ${
                      item.isMe ? "text-black" : "text-white"
                    }`}>
                    {item.message}
                  </Text>
                  <Text
                    className={`${item.isMe && "text-right"} font-light ${
                      item.isMe ? "text-black" : "text-white"
                    } mt-auto w-4/12`}>
                    {item.time}
                  </Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View className="h-4" />}
        />
      </View>
      <View className="w-full h-16 flex p-2 flex-row items-center justify-center">
        <TextInput
          className="w-[80%] p-3 bg-white rounded-xl"
          value={text}
          placeholder="Type a message..."
          onChangeText={(text) => setText(text)}
        />

        <Pressable
          className="w-[20%] flex items-center"
          onPress={() => {
            console.log("New Message Sent");
          }}>
          <FontAwesome name="arrow-circle-right" size={50} color="#00D2F6" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default GroupChat;
