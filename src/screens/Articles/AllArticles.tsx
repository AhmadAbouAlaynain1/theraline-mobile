import React from "react";
import { Text, View, Pressable } from "react-native";

const mockArticles = [
  {
    id: 1,
    author: "Author 1",
    time: "12:14pm",
    title: "Article 1",
    content: "Article 1 content",
  },
  {
    id: 2,
    author: "Author 2",
    time: "12:14pm",
    title: "Article 2",
    content: "Article 2 content",
  },
  {
    id: 3,
    author: "Author 3",
    time: "12:14pm",
    title: "Article 3",
    content: "Article 3 content",
  },
];

const mockFilters = ["All", "Top", "Trending"];

const AllArticles = ({ navigation }: any) => {
  const [filter, setFilter] = React.useState("All");
  return (
    <View className="flex flex-1 w-full">
      {/* Render Filter Tags here can be pressed and changes filter state */}
      <View className=" flex-row gap-4 items-center justify-center m-1">
        {mockFilters.map((item, index) => {
          return (
            <Pressable
              className={`${
                filter === item ? "bg-primary" : "bg-primaryLight"
              } p-2 `}
              style={{
                borderRadius: 5,
              }}
              key={index}
              onPress={() => setFilter(item)}>
              <Text>{item}</Text>
            </Pressable>
          );
        })}
      </View>
      <View className="flex flex-col gap-4">
        {/* Render Articles here */}
        {mockArticles.map((item, index) => {
          return (
            <Pressable
              className="p-4 bg-white"
              key={index}
              onPress={() => navigation.navigate("article", { item })}>
              <View className="flex flex-row items-start justify-between">
                <View className="flex flex-col gap-2">
                  <Text className="text-xl font-bold">{item.title}</Text>
                  <Text>{item.author}</Text>
                </View>

                <Text className="text-xs text-gray-500">{item.time}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default AllArticles;
