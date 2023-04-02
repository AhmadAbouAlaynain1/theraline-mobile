import React from "react";
import { ImageBackground } from "react-native";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const bgImage = require("../../../assets/bgAuth.png");

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <ImageBackground className="flex-1" source={bgImage}>
      {children}
    </ImageBackground>
  );
}

export default AuthLayout;
