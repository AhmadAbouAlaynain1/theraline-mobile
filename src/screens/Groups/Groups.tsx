import React from "react";
import { TextInput, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GroupChat from "./GroupChat";
import AllGroups from "./AllGroups";
import LogoutImage from "../../components/general/LogoutImage";

const GroupStack = createNativeStackNavigator();

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

function Groups() {
  const [search, setSearch] = React.useState("");
  const insets = useSafeAreaInsets();
  return (
    <GroupStack.Navigator>
      <GroupStack.Screen
        name="allGroups"
        component={AllGroups}
        options={{
          header: () =>
            Header({
              setSearch,
              search,
              insets,
            }),
        }}
      />
      <GroupStack.Screen
        name="groupChat"
        component={GroupChat}
        options={({ route }: any) => ({ title: route.params.name })}
      />
    </GroupStack.Navigator>
  );
}

export default Groups;
