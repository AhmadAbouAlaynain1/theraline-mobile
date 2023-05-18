import { StatusBar } from "expo-status-bar";
import { Platform, AppStateStatus } from "react-native";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAppState } from "./src/hooks/queries/AppQuery/useAppState";
import { useOnlineManager } from "./src/hooks/queries/AppQuery/useOnlineManager";

import { useNotification } from "./src/hooks/notifications/useNotification";
import Signin from "./src/screens/auth/Signin";
import Signup from "./src/screens/auth/Signup";
import useAuthStore from "./src/hooks/stores/useAuthStore";
import Home from "./src/screens/Home";

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

export default function App() {
  useNotification();
  useOnlineManager();
  useAppState(onAppStateChange);

  const { isAuthenticated } = useAuthStore((state) => state);

  return (
    <>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="auto" />
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={() => ({ headerShown: false })}>
              {!isAuthenticated ? (
                <>
                  <Stack.Screen name="signin" component={Signin} />
                  <Stack.Screen name="signup" component={Signup} />
                </>
              ) : (
                <Stack.Screen name="home" component={Home} />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </QueryClientProvider>
    </>
  );
}
