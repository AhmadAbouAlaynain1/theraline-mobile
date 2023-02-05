import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Reports from "./Reports/Reports";
import Private from "./Private/Private";
import Articles from "./Articles/Articles";
import Groups from "./Groups/Groups";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import SafeView from "../components/General/SafeView";

const Tab = createBottomTabNavigator();
const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          headerShown: false,
          // Bottom Bar background color
          tabBarStyle: {
            backgroundColor: "#00353E",
            borderTopColor: "#fff",
          },
          tabBarActiveTintColor: "#91E5F6",
          tabBarInactiveTintColor: "#4FA5B6",
          // Bottom Bar Icon
          tabBarIcon: ({ focused, color, size }: any) => {
            if (route.name === "groups") {
              return <FontAwesome name={"group"} size={size} color={color} />;
            } else if (route.name === "articles") {
              return (
                <MaterialIcons name={"article"} size={size} color={color} />
              );
            } else if (route.name === "private") {
              return <Ionicons name={"chatbox"} size={size} color={color} />;
            } else if (route.name === "reports") {
              return (
                <Ionicons
                  name={"stats-chart-outline"}
                  size={size}
                  color={color}
                />
              );
            }
          },
        };
      }}>
      <Tab.Screen name="groups" component={Groups} />
      <Tab.Screen name="articles" component={Articles} />
      <Tab.Screen name="private" component={Private} />
      <Tab.Screen name="reports" component={Reports} />
    </Tab.Navigator>
  );
};

export default Home;
