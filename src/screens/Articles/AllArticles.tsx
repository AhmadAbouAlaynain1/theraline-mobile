import React from "react";
import { Text, View, Pressable, FlatList } from "react-native";
import ArticleItem from "../../components/articles/ArticleItem";

const mockArticles = [
  {
    id: 1,
    author: "Author 1",
    time: "12:14pm",
    title: "Article 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in.",
  },
  {
    id: 2,
    author: "Author 2",
    time: "12:14pm",
    title: "Article 2",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in.",
  },
  {
    id: 3,
    author: "Author 3",
    time: "12:14pm",
    title: "Article 3",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in.",
  },
  {
    id: 4,
    author: "Author 4",
    time: "12:14pm",
    title: "Article 4",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in.",
  },
  {
    id: 5,
    author: "Author 5",
    time: "12:14pm",
    title: "Article 5",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in.",
  },
];

const mockFilters = ["All", "Top", "Trending"];

function AllArticles({ navigation }: any) {
  const [filter, setFilter] = React.useState("All");
  return (
    <View className="flex w-full flex-1">
      {/* Render Filter Tags here can be pressed and changes filter state */}
      <View className=" mt-1 mb-2 flex-row items-center justify-center gap-4">
        {mockFilters.map((item) => (
          <Pressable
            className={`${
              filter === item ? "bg-primary" : "bg-primaryLight"
            } p-2 `}
            style={{
              borderRadius: 5,
            }}
            key={item}
            onPress={() => setFilter(item)}>
            <Text>{item}</Text>
          </Pressable>
        ))}
      </View>
      <View className="flex flex-col gap-4">
        {/* Map through Mock Articles in a FlatList with Article Item for every component  */}
        <FlatList
          directionalLockEnabled
          data={mockArticles}
          renderItem={({ item }) => (
            <ArticleItem item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}

export default AllArticles;