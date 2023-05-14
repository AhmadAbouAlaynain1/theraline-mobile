import React from "react";
import {
  Text,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import AuthLayout from "../../components/auth/AuthLayout";
import SafeView from "../../components/general/SafeView";
import Logo from "../../components/general/Logo";
import Button from "../../components/buttons/Button";
import { useLoginMutation } from "../../hooks/mutations/auth/useLoginMutation";
import TextInputWithLabel from "../../components/inputs/TextInputWithLabel";

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Please enter your password" }),
});

type SignInValues = z.infer<typeof signInSchema>;

function Signin({ navigation }: any) {
  const { mutate: login, isLoading: isSigningIn } = useLoginMutation();
  const [signInError, setSignInError] = React.useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInValues> = (data) => {
    login(data, {
      onSuccess: () => {
        setSignInError(null);
      },
      onError: (error) => {
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
          <View className="flex-1 flex-col items-center justify-between py-[40]">
            <View className="flex-col items-center gap-5">
              <Logo />
              <Text className="text-center text-5xl font-bold text-white">
                Welcome Back
              </Text>
            </View>

            <View className="flex w-[80%] flex-col gap-5">
              <View
                className="flex flex-col gap-4 p-4 "
                style={{
                  backgroundColor: "rgba(0,0,0,0.2)",
                  borderRadius: 20,
                }}>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInputWithLabel
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      labelText="Email"
                      errorMessage={
                        errors.email ? errors.email?.message : undefined
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInputWithLabel
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      textContentType="password"
                      secureTextEntry
                      labelText="Password"
                      errorMessage={
                        errors.password ? errors.password?.message : undefined
                      }
                    />
                  )}
                />
                <Text className="text-rose-400">{signInError}</Text>
              </View>
              <Text className="text-center text-xl font-bold text-white">
                Log in as a Doctor or Patient
              </Text>
              <View className="flex-row justify-center text-center text-white">
                <Text className="text-center text-white">
                  Are you a patient?
                </Text>
                <Pressable
                  onPress={() => {
                    navigation.navigate("signup");
                  }}>
                  <Text className="text-center text-primaryLight">Sign up</Text>
                </Pressable>
              </View>
            </View>

            <Button
              variant={isSigningIn ? "disabled" : "default"}
              disabled={isSigningIn}
              classNames="w-[80%]"
              loading={isSigningIn}
              onPress={handleSubmit(onSubmit)}>
              Log in
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeView>
    </AuthLayout>
  );
}

export default Signin;
