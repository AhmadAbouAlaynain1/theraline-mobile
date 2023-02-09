import React from "react";
import { Text, View, TextInput, Image, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GroupChat from "./GroupChat";
import AllGroups from "./AllGroups";
import SafeView from "../../components/General/SafeView";

const GroupStack = createNativeStackNavigator();

const Groups = () => {
  const [search, setSearch] = React.useState("");
  return (
    <GroupStack.Navigator>
      <GroupStack.Screen
        name="allGroups"
        component={AllGroups}
        options={{
          header: () => (
            <SafeAreaView className="flex flex-row justify-between mx-4">
              <TextInput
                placeholder="Search..."
                value={search}
                onChangeText={(text) => setSearch(text)}
                className="w-[80%] p-4 shadow-lg border-gray-100 bg-white rounded-xl"
              />
              <Image
                className="w-12 h-12 rounded-[50%]"
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

/*header: () => {
            return (
              <View className="flex flex-row p-4 justify-between ">
                <TextInput
                  placeholder="Search..."
                  value={search}
                  onChangeText={(text) => setSearch(text)}
                  className="w-[80%] p-4 shadow-lg border-gray-100 bg-white rounded-xl"
                />
                <Image
                  className="w-12 h-12 rounded-[50%]"
                  source={{
                    uri: "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
                  }}
                />
              </View>
            );}*/
