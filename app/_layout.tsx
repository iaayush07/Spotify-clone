import { fetchSpotifyToken } from "@/core/auth/authSlice";
import { store, type AppDispatch } from "@/core/store/store";
import { Stack } from "expo-router";
import { ReactNode, useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";

export const unstable_settings = {
  initialRouteName: "home",
};

function Bootstrap() {
  const dispatch = useDispatch<AppDispatch>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function init() {
      await dispatch(fetchSpotifyToken());
      setLoaded(true); // ✅ mark initialization complete
    }
    init();
  }, [dispatch]);

  return null;
}

export default function RootLayout({ children }: { children: ReactNode }) {
  console.log("root layout");

  return (
    <Provider store={store}>
      <Bootstrap />
      <Stack screenOptions={{ headerShown: false }} />
    </Provider>
  );
}
