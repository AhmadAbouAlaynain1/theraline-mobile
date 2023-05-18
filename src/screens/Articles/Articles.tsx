import React from "react";
import { TextInput, Image, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AllArticles from "./AllArticles";
import Article from "./Article";
import LogoutImage from "../../components/general/LogoutImage";

const ArticlesStack = createNativeStackNavigator();

function Header({ insets, search, setSearch }: any) {
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
        onChangeText={(text) => {
          setSearch(text);
        }}
        className="w-[80%] border-gray-100 bg-white p-4 shadow-lg "
        style={{
          borderRadius: 10,
        }}
      />
      <LogoutImage />
    </SafeAreaView>
  );
}

function Articles() {
  const [search, setSearch] = React.useState("");
  const insets = useSafeAreaInsets();
  return (
    <ArticlesStack.Navigator>
      <ArticlesStack.Screen
        name="allArticles"
        component={AllArticles}
        options={{
          header: () =>
            Header({
              search,
              setSearch,
              insets,
            }),
        }}
      />
      <ArticlesStack.Screen
        name="article"
        component={Article}
        options={() => ({ title: "Article" })}
      />
    </ArticlesStack.Navigator>
  );
}

export default Articles;
