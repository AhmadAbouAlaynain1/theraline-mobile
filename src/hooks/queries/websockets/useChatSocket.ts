import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { io } from "socket.io-client";
import { refreshToken } from "../../../utils/axios/axios";
import useAuthStore from "../../stores/useAuthStore";

const baseURL = "https://theraline.onrender.com";

export const useChatSocket = () => {
  const queryClient = useQueryClient();
  const { setAccessToken, setRefreshToken, accessToken } =
    useAuthStore.getState();
  React.useEffect(() => {
    let websocket = io(`${baseURL}/chat?accessToken=${accessToken}`);

    // log when the connection is established
    websocket.on("connect", () => {
      console.log("connected");
    });

    // refresh token if error occurs
    websocket.on("error", async (error) => {
      console.log(error);
      const accessTokens = await refreshToken();
      setAccessToken(accessTokens.access_token);
      setRefreshToken(accessTokens.refresh_token);
      websocket = io(
        `${baseURL}/chat?accessToken=${accessTokens.access_token}`,
      );
    });

    websocket.on("newMessage", (data) => {
      console.log("Received message from server:", data);
    });

    return () => {
      websocket.close();
    };
  }, [queryClient, setRefreshToken, setAccessToken, accessToken]);
};
