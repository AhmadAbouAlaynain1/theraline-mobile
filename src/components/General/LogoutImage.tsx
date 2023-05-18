import { Image, Pressable } from "react-native";
import useAuthStore from "../../hooks/stores/useAuthStore";

function LogoutImage() {
  const { setAccessToken, setRefreshToken, setIsAuthenticated, setUser } =
    useAuthStore();

  return (
    <Pressable
      onPress={() => {
        setAccessToken("empty");
        setRefreshToken("empty");
        setIsAuthenticated(false);
        setUser({});
      }}>
      <Image
        className="h-12 w-12"
        style={{
          borderRadius: 50,
        }}
        source={{
          uri: "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
        }}
      />
    </Pressable>
  );
}

export default LogoutImage;
