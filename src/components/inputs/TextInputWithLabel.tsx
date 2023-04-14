import React from "react";
import { TextInput, View, Text, TextInputProps } from "react-native";
import { cn } from "../../utils/utilFns";

type TextInputWithLabelProps = {
  errorMessage?: string;
  labelClassNames?: string;
  errorClassNames?: string;
  labelText?: string;
} & TextInputProps;

function TextInputWithLabel(props: TextInputWithLabelProps) {
  const {
    errorMessage,
    labelClassNames,
    errorClassNames,
    labelText,
    ...inputProps
  } = props;
  return (
    <View className="my-1 space-y-1">
      <Text
        className={cn(" text-xl font-semibold text-white", labelClassNames)}>
        {labelText}
      </Text>
      <TextInput
        {...inputProps}
        className="h-12 rounded-2xl bg-white px-2 text-xl"
      />
      {errorMessage && (
        <Text className={cn("text-rose-400", errorClassNames)}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
}

TextInputWithLabel.defaultProps = {
  errorMessage: "",
  labelClassNames: "",
  errorClassNames: "",
  labelText: "",
};

export default TextInputWithLabel;
