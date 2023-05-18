import React from "react";
import { useWindowDimensions, ScrollView } from "react-native";
import RenderHtml from "react-native-render-html";

function Article({ navigation, route }: any) {
  const data = route.params;
  const { width } = useWindowDimensions();
  navigation.setOptions({ title: data.item.title });
  console.log(data.item.content);
  const source = {
    html: data.item.content,
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <RenderHtml contentWidth={width} source={source} />
    </ScrollView>
  );
}

export default Article;
