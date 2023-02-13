import React from "react";
import { Pressable, Text } from "react-native";

type ButtonProps = {
  classNames?: string;
  textClassNames?: string;
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  borderRadius?: number;
};

const Button = ({
  disabled,
  children,
  classNames,
  onPress,
  textClassNames,
  borderRadius,
}: ButtonProps) => {
  return (
    <Pressable
      className={`p-3 ${classNames}`}
      style={{
        borderRadius: borderRadius ? borderRadius : 10,
      }}
      onPress={onPress}
      disabled={disabled}>
      <Text className={`text-center ${textClassNames}`}>{children}</Text>
    </Pressable>
  );
};

export default Button;
