import React from "react";
import { ImageBackground } from "react-native";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <ImageBackground
      className="flex-1"
      source={require("../../../assets/bgAuth.png")}>
      {children}
    </ImageBackground>
  );
};

export default AuthLayout;
