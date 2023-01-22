import { useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";

export function useAppState(onChange: (status: AppStateStatus) => void) {
  useEffect(() => {
    const unsub = AppState.addEventListener("change", onChange);
    return () => {
      unsub.remove();
    };
  }, [onChange]);
}
