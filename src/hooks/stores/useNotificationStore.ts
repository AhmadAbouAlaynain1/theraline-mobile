import AsyncStorage from "@react-native-async-storage/async-storage";
import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { PersistOptions, createJSONStorage } from "zustand/middleware";

interface NotificationState {
  expoPushToken: any;
  setExpoPushToken: (newToken: any) => void;
  notification: any;
  setNotification: (newNotification: any) => void;
}
type MyPersist = (
  config: StateCreator<NotificationState>,
  options: PersistOptions<NotificationState>
) => StateCreator<NotificationState>;

const useNotificationStore = create<NotificationState>(
  (persist as MyPersist)(
    (set) => ({
      expoPushToken: "empty",
      setExpoPushToken: (newToken: any) => set({ expoPushToken: newToken }),
      notification: {},
      setNotification: (newNotification: any) =>
        set({ notification: newNotification }),
    }),
    {
      name: "async-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useNotificationStore;
