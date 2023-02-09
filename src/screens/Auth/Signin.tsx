import React from "react";
import {
  Text,
  View,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AuthLayout from "../../components/Auth/AuthLayout";
import SafeView from "../../components/General/SafeView";
import Logo from "../../components/General/Logo";
import Button from "../../components/Buttons/Button";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../../hooks/mutations/auth/useLoginMutation";

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type signInValues = z.infer<typeof signInSchema>;

const Signin = ({ navigation }: any) => {
  const { mutate: login } = useLoginMutation();

  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm<signInValues>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<signInValues> = (data) => {
    console.log(data);
    login(data, {
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <AuthLayout>
      <SafeView>
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View className="flex-1 flex-col justify-between items-center pt-[40] pb-[40] ">
            <View className="flex-col gap-5">
              <Logo />
              <Text className="text-white text-center text-5xl font-bold">
                Hello
              </Text>
            </View>

            <View className="flex flex-col gap-5 w-[80%]">
              <View
                className=" p-4  flex flex-col space-y-4 rounded-xl"
                style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
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
                        className="bg-white px-2 h-12 text-xl rounded-xl"
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
                <View className=" space-y-1">
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
                        className="bg-white px-2 h-12 text-xl rounded-xl"
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
              </View>
              <Text className="font-bold text-xl text-white text-center">
                Log in as a Doctor or Patient
              </Text>
              <View className="text-white text-center  flex-row justify-center">
                <Text className="text-white text-center">
                  Are you a patient?{" "}
                </Text>
                <Pressable
                  onPress={() => {
                    navigation.navigate("signup");
                  }}>
                  <Text className="text-primaryLight text-center">Sign up</Text>
                </Pressable>
              </View>
            </View>
            <Button
              classNames="bg-primary self-stretch rounded-xl w-[80%] mx-auto"
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

export default Signin;
