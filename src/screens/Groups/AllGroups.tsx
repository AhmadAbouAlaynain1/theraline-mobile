import React from "react";
import { View, FlatList } from "react-native";
import GroupCell from "../../components/groups/GroupCell";

const mockData = [
  {
    id: 1,
    name: "Group 1",
    lastMessage:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, nobis!",
    time: "12:14pm",
    unreadMessages: 12,
    image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
  },
  {
    id: 2,
    name: "Group 2",
    lastMessage:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, nobis!",
    time: "12:14pm",
    unreadMessages: 12,
    image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
  },
  {
    id: 3,
    name: "Group 3",
    lastMessage:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, nobis!",
    time: "12:14pm",
    unreadMessages: 12,
    image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
  },
];

function ItemSeperator() {
  return <View className="h-4" />;
}

function AllGroups({ navigation }: any) {
  return (
    <View className="m-4 flex items-center">
      <FlatList
        className="min-h-full"
        directionalLockEnabled
        data={mockData}
        renderItem={({ item }) => (
          <GroupCell {...item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={ItemSeperator}
      />
    </View>
  );
}

export default AllGroups;
