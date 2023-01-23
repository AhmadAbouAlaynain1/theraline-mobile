import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateCreator, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { PersistOptions } from "zustand/middleware";

interface IAuthState {
  accessToken: string;
  refreshToken: string;
  setAccessToken: (newToken: string) => void;
  setRefreshToken: (newToken: string) => void;
  user: any;
  setUser: (newUser: any) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (newIsAuthenticated: boolean) => void;
}

type MyPersist = (
  config: StateCreator<IAuthState>,
  options: PersistOptions<IAuthState>
) => StateCreator<IAuthState>;

const useAuthStore = create<IAuthState>(
  (persist as MyPersist)(
    (set) => ({
      accessToken: "empty",

      refreshToken: "empty",

      setAccessToken: (newToken) => set({ accessToken: newToken }),

      setRefreshToken: (newToken) => set({ refreshToken: newToken }),

      user: {},
      setUser: (newUser) => set({ user: newUser }),
      isAuthenticated: false,
      setIsAuthenticated: (newIsAuthenticated) =>
        set({ isAuthenticated: newIsAuthenticated }),
    }),

    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;
