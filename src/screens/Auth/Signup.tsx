import React from "react";
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import AuthLayout from "../../components/Auth/AuthLayout";
import Logo from "../../components/General/Logo";
import SafeView from "../../components/General/SafeView";
import { z } from "zod";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../components/Buttons/Button";

const signUpSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type signUpValues = z.infer<typeof signUpSchema>;

const Signup = ({ navigation }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpValues>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit: SubmitHandler<signUpValues> = (data) => {
    console.log(data);
  };

  return (
    <AuthLayout>
      <SafeView>
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View className="flex-1 flex-col justify-between items-center pt-[40] pb-[40]">
            <View className="flex flex-col gap-5 w-[80%]">
              <View
                className=" p-4  flex flex-col space-y-4 rounded-xl"
                style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
                <View className=" space-y-1">
                  <Text className="text-white text-xl font-semibold">
                    First Name
                  </Text>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        className="bg-white px-2 h-14 text-xl rounded-xl"
                      />
                    )}
                    name="firstName"
                  />
                  {errors.firstName && (
                    <Text className="text-rose-400">
                      {errors.firstName?.message}
                    </Text>
                  )}
                </View>
                <View className=" space-y-1">
                  <Text className="text-white text-xl font-semibold">
                    Last Name
                  </Text>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        className="bg-white px-2 h-14 text-xl rounded-xl"
                      />
                    )}
                    name="lastName"
                  />
                  {errors.lastName && (
                    <Text className="text-rose-400">
                      {errors.lastName?.message}
                    </Text>
                  )}
                </View>
                <View className=" space-y-1">
                  <Text className="text-white text-xl font-semibold">
                    Email
                  </Text>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        className="bg-white px-2 h-14  text-xl rounded-xl"
                        textContentType="emailAddress"
                      />
                    )}
                    name="email"
                  />
                  {errors.email && (
                    <Text className="text-rose-400">
                      {errors.email?.message}
                    </Text>
                  )}
                </View>
                <View className="space-y-1">
                  <Text className="text-white text-xl font-semibold">
                    Password
                  </Text>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        textContentType="password"
                        secureTextEntry={true}
                        className="bg-white px-2 h-14 text-xl rounded-xl"
                      />
                    )}
                    name="password"
                  />
                  {errors.password && (
                    <Text className="text-rose-400">
                      {errors.password?.message}
                    </Text>
                  )}
                </View>
                <View className="space-y-1">
                  <Text className="text-white text-xl font-semibold">
                    Confirm Password
                  </Text>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        textContentType="password"
                        secureTextEntry={true}
                        className="bg-white px-2 h-14 text-xl rounded-xl"
                      />
                    )}
                    name="confirmPassword"
                  />
                  {errors.confirmPassword && (
                    <Text className="text-rose-400">
                      {errors.confirmPassword?.message}
                    </Text>
                  )}
                </View>
              </View>
              <Text className="font-bold text-xl text-white text-center">
                Sign up as a patient
              </Text>
              <View className="text-white text-center  flex-row justify-center">
                <Text className="text-white text-center">
                  Already have an account?
                </Text>
                <Pressable
                  onPress={() => {
                    navigation.navigate("signin");
                  }}>
                  <Text className="text-primaryLight text-center">Sign in</Text>
                </Pressable>
              </View>
            </View>
            <Button
              classNames="bg-primary self-stretch rounded-xl mx-auto w-[80%]"
              textClassNames="text-white text-2xl font-bold"
              onPress={handleSubmit(onSubmit)}>
              Log in
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeView>
    </AuthLayout>
  );
};

export default Signup;
