import React from "react";
import { Pressable, Text } from "react-native";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../utils/utilFns";

const buttonVariants = cva("flex h-fit items-center justify-center", {
  variants: {
    variant: {
      default:
        "bg-primary text-white hover:bg-slate-700 dark:bg-slate-50 dark:text-slate-900",
      disabled: "bg-primary-light text-gray-500",
    },
    size: {
      full: "p-4",
      sm: "px-2",
      lg: "px-8",
    },
    fill: {
      true: "w-full",
      false: "w-fit",
    },
    rounded: {
      circle: "rounded-full",
      rounded: "rounded-2xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "full",
    fill: true,
    rounded: "rounded",
  },
});

const textVariants = cva("text-center text-xl font-bold text-white");

type ButtonProps = {
  classNames?: string;
  textClassNames?: string;
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
} & VariantProps<typeof buttonVariants> &
  VariantProps<typeof textVariants>;

function Button({
  disabled,
  children,
  classNames,
  onPress,
  textClassNames,
  size,
  variant,
  loading,
}: ButtonProps) {
  return (
    <Pressable
      className={cn(buttonVariants({ variant, size }), classNames)}
      onPress={onPress}
      disabled={disabled}>
      <Text className={cn(textVariants(), textClassNames)}>
        {loading ? "Loading..." : children}
      </Text>
    </Pressable>
  );
}

Button.defaultProps = {
  disabled: false,
  classNames: "",
  textClassNames: "",
  loading: false,
};

export default Button;
