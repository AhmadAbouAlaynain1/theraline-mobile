import React from "react";
import { Text } from "react-native";

const GroupChat = ({ route }: any) => {
  return <Text>{route.params.id}</Text>;
};

export default GroupChat;
