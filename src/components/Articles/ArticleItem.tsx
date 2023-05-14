import React from "react";
import { View, Text, Pressable } from "react-native";

type ArticleItemProps = {
  item: {
    _id: string;
    title: string;
    date: string;
    content: string;
    author: {
      name: string;
      image: string;
    };
  };
  navigation: any;
};

function ArticleItem({ item, navigation }: ArticleItemProps) {
  return (
    <Pressable
      className="my-4 mx-2 flex gap-2 bg-white p-4"
      style={{
        borderRadius: 15,
      }}
      onPress={() => navigation.navigate("article", { item })}>
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-col ">
          <Text className="text-xl font-bold ">{item.title}</Text>
        </View>

        <Text className="text-xl text-gray-500">
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>
      <View>
        <Text className="text-base text-gray-500 ">By: {item.author.name}</Text>
      </View>
    </Pressable>
  );
}

export default ArticleItem;
