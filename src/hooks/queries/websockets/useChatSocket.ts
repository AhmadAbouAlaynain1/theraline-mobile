import { io } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import useAuthStore from "../../stores/useAuthStore";
import { refreshToken } from "../../../utils/axios/axios";

const baseURL = "https://theraline.onrender.com";

export const useChatSocket = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const { accessToken, setAccessToken, setRefreshToken } =
      useAuthStore.getState();
    const websocket = io(`${baseURL}/chat?accessToken=${accessToken}`);

    // log when the connection is established
    websocket.on("connect", () => {
      console.log("Websocket connected");
    });

    // refresh token if error occurs
    websocket.on("error", async (error) => {
      console.log(`Websocket: ${error}`);
      const accessTokens = await refreshToken();
      setAccessToken(accessTokens.access_token);
      setRefreshToken(accessTokens.refresh_token);
    });

    websocket.on("newMessage", (data) => {
      console.log("Received message from server:", data);

      queryClient.invalidateQueries({
        queryKey: ["chats"],
      });
      queryClient.invalidateQueries({
        queryKey: ["chatMessages"],
      });
    });

    return () => {
      websocket.close();
    };
  }, [queryClient]);
};
