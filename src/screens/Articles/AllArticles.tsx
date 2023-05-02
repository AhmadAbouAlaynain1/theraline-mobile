import React from "react";
import { Text, View, FlatList } from "react-native";
import ArticleItem from "../../components/articles/ArticleItem";
import { useGetArticles } from "../../hooks/queries/articles/useGetArticles";

function AllArticles({ navigation }: any) {
  const {
    data: articles,
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

  console.log(articles);

  return (
    <View className="mx-4 mt-4 flex  flex-1">
      <View className="flex flex-col gap-6">
        {/* Map through Mock Articles in a FlatList with Article Item for every component  */}
        <FlatList
          directionalLockEnabled
          data={articles}
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
