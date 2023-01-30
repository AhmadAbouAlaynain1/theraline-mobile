import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar as RNStatusBar,
} from "react-native";

type SafeViewProps = {
  children: React.ReactNode;
  classNames?: string;
};

const SafeView = ({ children, classNames }: SafeViewProps) => {
  return (
    <SafeAreaView
      className={`flex-1 ${classNames}`}
      style={styles.rootContainer}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
  },
});

export default SafeView;
