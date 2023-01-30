import React from "react";
import { Pressable, Text } from "react-native";

type ButtonProps = {
  classNames?: string;
  textClassNames?: string;
  children: React.ReactNode;
  onPress: () => void;
};

const Button = ({
  children,
  classNames,
  onPress,
  textClassNames,
}: ButtonProps) => {
  return (
    <Pressable className={`p-3 ${classNames}`} onPress={onPress}>
      <Text className={`text-center ${textClassNames}`}>{children}</Text>
    </Pressable>
  );
};

export default Button;
