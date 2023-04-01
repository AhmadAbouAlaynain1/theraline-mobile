import React from "react";
import { Text, SafeAreaView } from "react-native";
import { Link } from "expo-router";

const Home = () => {
  return (
    <SafeAreaView>
      <Text>Hello World</Text>
      <Link href="/auth/signIn">Go to Sign In</Link>
      <Link href="/home">Go to Home</Link>
      <Link href="/home/test">Go to test</Link>
    </SafeAreaView>
  );
};

export default Home;
