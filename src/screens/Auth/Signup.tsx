import React from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { z } from "zod";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import * as ImagePicker from "expo-image-picker";
import AuthLayout from "../../components/auth/AuthLayout";
import SafeView from "../../components/general/SafeView";
import Button from "../../components/buttons/Button";
import { useSignUpMutation } from "../../hooks/mutations/auth/useSignUpMutation";
import TextInputWithLabel from "../../components/inputs/TextInputWithLabel";
import useNotificationStore from "../../hooks/stores/useNotificationStore";

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
  const { expoPushToken } = useNotificationStore();
  const [signUpError, setSignUpError] = React.useState<string | null>(null);
  const [image, setImage] = React.useState<string | undefined>(undefined);

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
    const dataToSend = {
      ...data,
      expoToken: expoPushToken,
      image,
    };
    console.log(dataToSend);

    signup(dataToSend, {
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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.canceled) {
      const base64Img = `data:image/jpg;base64,${result.assets?.[0].base64}`;
      setImage(base64Img);
    }
  };

  const removeImage = () => {
    setImage(undefined);
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
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInputWithLabel
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      errorMessage={errors.firstName?.message}
                      labelText="First Name"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="lastName"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInputWithLabel
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      errorMessage={errors.lastName?.message}
                      labelText="Last Name"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInputWithLabel
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      errorMessage={errors.email?.message}
                      labelText="Email"
                      textContentType="emailAddress"
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
                      secureTextEntry
                      textContentType="password"
                      errorMessage={errors.password?.message}
                      labelText="Password"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInputWithLabel
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      secureTextEntry
                      textContentType="password"
                      errorMessage={errors.confirmPassword?.message}
                      labelText="Confirm Password"
                    />
                  )}
                />
                <Button
                  classNames="mt-4"
                  onPress={image ? removeImage : pickImage}
                  fill={false}
                  textClassNames="text-base font-semi">
                  {image ? "Remove Image" : "Upload Profile Image"}
                </Button>
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
                  <Text className="text-center text-primaryLight">Sign In</Text>
                </Pressable>
              </View>
            </View>
            <Button
              disabled={isSigningUp}
              classNames="w-[80%]"
              loading={isSigningUp}
              onPress={handleSubmit(onSubmit)}>
              Sign up
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeView>
    </AuthLayout>
  );
}

export default Signup;
