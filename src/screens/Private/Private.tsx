import React from "react";
import { TextInput, Image, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AllPrivate from "./AllPrivate";
import PrivateChat from "./PrivateChat";
import LogoutImage from "../../components/general/LogoutImage";

const PrivateStack = createNativeStackNavigator();

function Header({ search, setSearch, insets }: any) {
  return (
    <SafeAreaView
      className="mx-4 flex flex-row items-center justify-between"
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}>
      <TextInput
        placeholder="Search..."
        value={search}
        onChangeText={(text) => setSearch(text)}
        className="w-[80%] border-gray-100 bg-white p-4 shadow-lg "
        style={{
          borderRadius: 10,
        }}
      />
      <LogoutImage />
    </SafeAreaView>
  );
}

function Private() {
  const [search, setSearch] = React.useState("");
  const insets = useSafeAreaInsets();
  return (
    <PrivateStack.Navigator>
      <PrivateStack.Screen
        name="allPrivate"
        component={AllPrivate}
        options={{
          header: () =>
            Header({
              setSearch,
              search,
              insets,
            }),
        }}
      />
      <PrivateStack.Screen
        name="privateChat"
        component={PrivateChat}
        options={({ route }: any) => ({ title: route.params.name })}
      />
    </PrivateStack.Navigator>
  );
}

export default Private;
