import React from "react";
import { TextInput, Image, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GroupChat from "./GroupChat";
import AllGroups from "./AllGroups";

const GroupStack = createNativeStackNavigator();

const Groups = () => {
  const [search, setSearch] = React.useState("");
  const insets = useSafeAreaInsets();
  return (
    <GroupStack.Navigator>
      <GroupStack.Screen
        name="allGroups"
        component={AllGroups}
        options={{
          header: () => (
            <SafeAreaView
              className="flex flex-row justify-between mx-4 items-center"
              style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
              }}>
              <TextInput
                placeholder="Search..."
                value={search}
                onChangeText={(text) => setSearch(text)}
                className="w-[80%] p-4 shadow-lg border-gray-100 bg-white "
                style={{
                  borderRadius: 10,
                }}
              />
              <Image
                className="w-12 h-12"
                style={{
                  borderRadius: 50,
                }}
                source={{
                  uri: "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
                }}
              />
            </SafeAreaView>
          ),
        }}
      />
      <GroupStack.Screen
        name="groupChat"
        component={GroupChat}
        options={({ route }: any) => ({ title: route.params.name })}
      />
    </GroupStack.Navigator>
  );
};

export default Groups;
