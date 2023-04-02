import React from "react";
import { View, Text, Pressable } from "react-native";

type ArticleItemProps = {
  item: any;
  navigation: any;
};

function ArticleItem({ item, navigation }: ArticleItemProps) {
  return (
    <Pressable
      className="p-4 bg-white my-4 mx-2 flex gap-2"
      style={{
        borderRadius: 15,
      }}
      onPress={() => navigation.navigate("article", { item })}>
      <View className="flex flex-row items-start justify-between">
        <View className="flex flex-col ">
          <Text className="text-xl font-bold ">{item.title}</Text>
          <Text className="text-gray-600">{item.author}</Text>
        </View>

        <Text className="text-xs text-gray-500">{item.time}</Text>
      </View>
      <View>
        <Text>{item.content}</Text>
      </View>
    </Pressable>
  );
}

export default ArticleItem;
