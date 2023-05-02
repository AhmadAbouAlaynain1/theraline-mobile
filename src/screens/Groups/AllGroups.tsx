import React from "react";
import { View, FlatList, Text } from "react-native";
import GroupCell from "../../components/groups/GroupCell";
import useGetChats from "../../hooks/queries/chats/useGetChats";

function ItemSeperator() {
  return <View className="h-6" />;
}

function AllGroups({ navigation }: any) {
  const { data: groups, isLoading, isError } = useGetChats();

  if (isLoading) {
    return (
      <View className="flex h-full items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }
  if (isError) {
    return (
      <View className="flex h-full items-center justify-center">
        <Text>An Error has occured</Text>
      </View>
    );
  }

  console.log(groups);

  return (
    <View className="m-4 flex items-center">
      {groups.length === 0 ? (
        <View className="flex h-full items-center justify-center">
          <Text className="text-2xl">No Groups</Text>
        </View>
      ) : (
        <FlatList
          className="min-h-full w-full"
          directionalLockEnabled
          data={groups.filter((group) => group.groupType === "GROUP")}
          renderItem={({ item }) => (
            <GroupCell chat={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item._id.toString()}
          ItemSeparatorComponent={ItemSeperator}
        />
      )}
    </View>
  );
}

export default AllGroups;
