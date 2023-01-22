import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  StatusBar as RNStatusBar,
  Platform,
  SafeAreaView,
} from "react-native";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from "@tanstack/react-query";
import { useAppState } from "./src/hooks/queries/AppQuery/useAppState";
import { useOnlineManager } from "./src/hooks/queries/AppQuery/useOnlineManager";
import { AppStateStatus } from "react-native";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export default function App() {
  useOnlineManager();
  useAppState(onAppStateChange);
  return (
    <>
      <StatusBar style="auto" />
      <QueryClientProvider client={queryClient}>
        <SafeAreaView className="flex-1 bg-white" style={styles.rootContainer}>
          <Text>Open up App.tsx to start working on your app!</Text>
        </SafeAreaView>
      </QueryClientProvider>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
  },
});
