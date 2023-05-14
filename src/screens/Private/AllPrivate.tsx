import React from "react";
import { View, FlatList, Text, Modal, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import useGetChats from "../../hooks/queries/chats/useGetChats";
import PrivateCell from "../../components/groups/PrivateCell";
import Button from "../../components/buttons/Button";
import { useGetAvailableUsers } from "../../hooks/queries/chats/useGetAvailableUsers";
import { useCreateConveration } from "../../hooks/mutations/groups/useCreateConversation";

function ItemSeperator() {
  return <View className="h-6" />;
}

function AllPrivate({ navigation }: any) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([]);
  const { data: privateChats, isLoading, isError } = useGetChats();
  const {
    data: availableUsers,
    isLoading: usersLoading,
    isError: usersError,
  } = useGetAvailableUsers();
  const { mutate: createConversation, isLoading: createConversationLoading } =
    useCreateConveration();

  if (isLoading || usersLoading) {
    return (
      <View className="flex h-full items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }
  if (isError || usersError) {
    return (
      <View className="flex h-full items-center justify-center">
        <Text>An Error has occured</Text>
      </View>
    );
  }

  console.log("privateChats", privateChats);

  return (
    <>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View className="flex h-full bg-gray-100">
          <Pressable
            className="ml-auto mr-2 "
            onPress={() => {
              setModalVisible(false);
            }}>
            <AntDesign name="closecircleo" size={36} color="black" />
          </Pressable>
          {
            // If there are selected users, show the button to create the chat
            selectedUsers.length > 0 ? (
              <Button
                fill={false}
                classNames="my-4 w-[90%] ml-auto mr-auto"
                disabled={createConversationLoading}
                loading={createConversationLoading}
                onPress={() => {
                  createConversation(
                    {
                      users_id: selectedUsers,
                    },
                    {
                      onSuccess: () => {
                        setModalVisible(false);
                        setSelectedUsers([]);
                      },
                    },
                  );
                }}>
                Create Chat
              </Button>
            ) : null
          }
          <View className="m-4 flex items-center">
            {availableUsers.length === 0 ? (
              <View className="flex h-full items-center justify-center">
                <Text className="text-2xl">No Available Users</Text>
              </View>
            ) : (
              <FlatList
                className="min-h-full w-full"
                directionalLockEnabled
                data={availableUsers}
                renderItem={({ item }) => (
                  <Pressable
                    className={`flex flex-row justify-between rounded-xl bg-white p-4 shadow-md ${
                      selectedUsers.includes(item._id) ? "bg-blue-200" : ""
                    }`}
                    onPress={() => {
                      // If the user is already selected, remove them from the list, otherwise add them
                      if (selectedUsers.includes(item._id)) {
                        setSelectedUsers(
                          selectedUsers.filter((user) => user !== item._id),
                        );
                      } else {
                        setSelectedUsers([item._id]);
                      }
                    }}>
                    <Text className="text-xl">
                      {item.firstName} {item.lastName}
                    </Text>
                    {
                      // If the user is already selected, show a checkmark
                      selectedUsers.includes(item._id) ? (
                        <AntDesign
                          name="checkcircleo"
                          size={24}
                          color="black"
                          className="absolute right-4"
                        />
                      ) : null
                    }
                  </Pressable>
                )}
                keyExtractor={(item) => item._id.toString()}
                ItemSeparatorComponent={ItemSeperator}
              />
            )}
          </View>
        </View>
      </Modal>
      <View className="m-4 flex items-center">
        <Button
          fill={false}
          classNames="mb-4"
          textClassNames=""
          onPress={() => {
            setModalVisible(true);
          }}>
          Create New Conversation
        </Button>

        {privateChats.length === 0 ? (
          <View className="flex h-full items-center justify-center">
            <Text className="text-2xl">No Private Chats</Text>
          </View>
        ) : (
          <FlatList
            className="min-h-full w-full"
            directionalLockEnabled
            data={privateChats.filter((chat) => chat.groupType === "PRIVATE")}
            renderItem={({ item }) => (
              <PrivateCell chat={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item._id.toString()}
            ItemSeparatorComponent={ItemSeperator}
          />
        )}
      </View>
    </>
  );
}

export default AllPrivate;
