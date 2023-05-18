import React from "react";
import { Text, View, FlatList } from "react-native";
import ArticleItem from "../../components/articles/ArticleItem";
import { useGetArticles } from "../../hooks/queries/articles/useGetArticles";

function AllArticles({ navigation }: any) {
  const {
    data: articlesData,
    isLoading: articlesLoading,
    isError: articleError,
  } = useGetArticles();

  if (articlesLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (articleError) {
    return (
      <View>
        <Text>Error...</Text>
      </View>
    );
  }

  return (
    <View className="mx-4 mt-4 flex  flex-1">
      <View className="flex flex-col gap-6">
        <FlatList
          directionalLockEnabled
          data={articlesData}
          renderItem={({ item }) => (
            <ArticleItem item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item._id.toString()}
        />
      </View>
    </View>
  );
}

export default AllArticles;
