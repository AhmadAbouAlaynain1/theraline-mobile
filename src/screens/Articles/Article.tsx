import React from "react";
import { View, useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";

function Article({ route }: any) {
  const data = route.params;
  const { width } = useWindowDimensions();
  console.log(data.item.content);
  const source = {
    html: data.item.content,
  };

  return (
    <View className="flex-1 bg-white p-4">
      <RenderHtml contentWidth={width} source={source} />
    </View>
  );
}

export default Article;
