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
import { AxiosError } from "axios";

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Please enter your password" }),
});

type signInValues = z.infer<typeof signInSchema>;

const Signin = ({ navigation }: any) => {
  const { mutate: login } = useLoginMutation();
  const [signInError, setSignInError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

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
    setIsSubmitting(true);
    login(data, {
      onSuccess: () => {
        setIsSubmitting(false);
        setSignInError(null);
      },
      onError: (error) => {
        setIsSubmitting(false);
        console.log(error);
        if (error instanceof AxiosError) {
          setSignInError(error?.response?.data.message);
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
          <View className="flex-1 flex-col justify-between items-center pt-[40] pb-[40] ">
            <View className="flex-col gap-5">
              <Logo />
              <Text className="text-white text-center text-5xl font-bold">
                Hello
              </Text>
            </View>

            <View className="flex flex-col gap-5 w-[80%]">
              <View
                className=" p-4  flex flex-col space-y-4 "
                style={{
                  backgroundColor: "rgba(0,0,0,0.2)",
                  borderRadius: 20,
                }}>
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
                        className="bg-white px-2 h-12 text-xl "
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
                        className="bg-white px-2 h-12 text-xl "
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
                <Text className="text-rose-400">{signInError}</Text>
              </View>
              <Text className="font-bold text-xl text-white text-center">
                Log in as a Doctor or Patient
              </Text>
              <View className="text-white text-center flex-row justify-center">
                <Text className="text-white text-center">
                  Are you a patient?
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
              classNames={`${
                isSubmitting ? "bg-primaryLight" : "bg-primary"
              } self-stretch w-[80%] mx-auto`}
              disabled={isSubmitting}
              textClassNames="text-white text-2xl font-bold"
              onPress={handleSubmit(onSubmit)}>
              {isSubmitting ? "Loading..." : "Log in"}
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeView>
    </AuthLayout>
  );
};

export default Signin;
