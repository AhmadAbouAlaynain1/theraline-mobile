import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from "@tanstack/react-query";

import { useAppState } from "./src/hooks/queries/AppQuery/useAppState";
import { useOnlineManager } from "./src/hooks/queries/AppQuery/useOnlineManager";
import { AppStateStatus } from "react-native";
import { useNotification } from "./src/hooks/notifications/useNotification";
import * as Notifications from "expo-notifications";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signin from "./src/screens/Auth/Signin";
import Signup from "./src/screens/Auth/Signup";
import useAuthStore from "./src/hooks/stores/useAuthStore";
import Home from "./src/screens/Home";
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

const Stack = createNativeStackNavigator();

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useNotification();
  useOnlineManager();
  useAppState(onAppStateChange);

  const { isAuthenticated } = useAuthStore((state) => state);

  return (
    <>
      <StatusBar style="auto" />
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={() => {
                return { headerShown: false };
              }}>
              {!isAuthenticated ? (
                <>
                  <Stack.Screen name="signin" component={Signin} />
                  <Stack.Screen name="signup" component={Signup} />
                </>
              ) : (
                <>
                  <Stack.Screen name="home" component={Home} />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </QueryClientProvider>
    </>
  );
}
