import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Private from "./private/Private";
import Articles from "./articles/Articles";
import Groups from "./groups/Groups";
import Appointments from "./appoitnment/Appointments";

function TabBarIcon({ color, size, route }: any) {
  if (route.name === "groups") {
    return <FontAwesome name="group" size={size} color={color} />;
  }
  if (route.name === "articles") {
    return <MaterialIcons name="article" size={size} color={color} />;
  }
  if (route.name === "private") {
    return <Ionicons name="chatbox" size={size} color={color} />;
  }
  if (route.name === "appointments") {
    return <Ionicons name="stats-chart-outline" size={size} color={color} />;
  }
}

const Tab = createBottomTabNavigator();
function Home() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        // Bottom Bar background color
        tabBarStyle: {
          backgroundColor: "#00353E",
          borderTopColor: "#fff",
        },
        tabBarActiveTintColor: "#91E5F6",
        tabBarInactiveTintColor: "#4FA5B6",
        // Bottom Bar Icon
        tabBarIcon: ({ size, color }) => TabBarIcon({ size, color, route }),
      })}>
      <Tab.Screen name="groups" component={Groups} />
      <Tab.Screen name="articles" component={Articles} />
      <Tab.Screen name="private" component={Private} />
      <Tab.Screen name="appointments" component={Appointments} />
    </Tab.Navigator>
  );
}

export default Home;
