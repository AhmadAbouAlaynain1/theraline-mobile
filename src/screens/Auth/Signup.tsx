import React from "react";
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { z } from "zod";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import AuthLayout from "../../components/auth/AuthLayout";
import SafeView from "../../components/general/SafeView";
import Button from "../../components/buttons/Button";
import { useSignUpMutation } from "../../hooks/mutations/auth/useSignUpMutation";

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

type SignUpValues = z.infer<typeof signUpSchema>;

function Signup({ navigation }: any) {
  const [signUpError, setSignUpError] = React.useState<string | null>(null);
  const { mutate: signup, isLoading: isSigningUp } = useSignUpMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({
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
  const onSubmit: SubmitHandler<SignUpValues> = (data) => {
    signup(data, {
      onSuccess() {
        navigation.navigate("signin");
      },
      onError(error) {
        if (error instanceof AxiosError) {
          setSignUpError(error?.response?.data.message);
        }
      },
    });
  };

  return (
    <AuthLayout>
      <SafeView>
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View className="flex-1 flex-col items-center justify-between py-[40]">
            <View className="flex w-[80%] flex-col gap-5">
              <View
                className=" flex  flex-col space-y-4 p-4  "
                style={{
                  borderRadius: 10,
                  backgroundColor: "rgba(0,0,0,0.2)",
                }}>
                <View className=" space-y-1">
                  <Text className="text-xl font-semibold text-white">
                    First Name
                  </Text>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        className="h-14 bg-white px-2 text-xl  "
                        style={{
                          borderRadius: 10,
                        }}
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
                  <Text className="text-xl font-semibold text-white">
                    Last Name
                  </Text>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        className="h-14 bg-white px-2 text-xl  "
                        style={{
                          borderRadius: 10,
                        }}
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
                  <Text className="text-xl font-semibold text-white">
                    Email
                  </Text>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        className="h-14 bg-white px-2  text-xl  "
                        style={{
                          borderRadius: 10,
                        }}
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
                  <Text className="text-xl font-semibold text-white">
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
                        secureTextEntry
                        className="h-14 bg-white px-2 text-xl  "
                        style={{
                          borderRadius: 10,
                        }}
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
                  <Text className="text-xl font-semibold text-white">
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
                        secureTextEntry
                        className="h-14 bg-white px-2 text-xl  "
                        style={{
                          borderRadius: 10,
                        }}
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
                <Text className="text-center text-rose-400">{signUpError}</Text>
              </View>
              <Text className="text-center text-xl font-bold text-white">
                Sign up as a patient
              </Text>
              <View className="flex-row justify-center  text-center text-white">
                <Text className="text-center text-white">
                  Already have an account?
                </Text>
                <Pressable
                  onPress={() => {
                    navigation.navigate("signin");
                  }}>
                  <Text className="text-center text-primaryLight">Sign Up</Text>
                </Pressable>
              </View>
            </View>
            <Button
              disabled={isSigningUp}
              classNames="w-[80%]"
              loading={isSigningUp}
              onPress={handleSubmit(onSubmit)}>
              Log in
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeView>
    </AuthLayout>
  );
}

export default Signup;
