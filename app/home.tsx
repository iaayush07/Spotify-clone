import { RootState } from "@/core/store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function Home() {
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [statusMsg, setStatusMsg] = useState<string>("");
  const masked = token ? `${token.slice(0, 8)}…${token.slice(-6)}` : "(none)";

  useEffect(() => {
    if (!token) return; // wait until token exists

    async function fetchPlaylists() {
      try {
        setStatusMsg("Calling Spotify…");
        const res = await axios.get(
          "https://api.spotify.com/v1/browse/new-releases?offset=5&limit=10",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPlaylists(res.data);
        setStatusMsg(
          `OK • fetched ${
            res.data.playlists?.total ?? res.data.playlists?.items?.length ?? 0
          } playlists`
        );
      } catch (err: any) {
        const code = err?.response?.status;
        const text = err?.response?.statusText;
        setStatusMsg(`Error • ${code ?? ""} ${text ?? ""}`.trim());
      }
    }

    fetchPlaylists();
  }, [token]); // 🔑 only runs when token exists

  console.log(playlists, "playlists");

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#121212" }}>
      <Text style={{ color: "#1DB954", fontSize: 22, marginBottom: 16 }}>
        Featured Playlists
      </Text>
      <Text style={{ color: "#9ca3af", marginBottom: 8 }}>Token: {masked}</Text>
      {!!statusMsg && (
        <Text style={{ color: "#e5e7eb", marginBottom: 12 }}>{statusMsg}</Text>
      )}
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{ color: "#fff", marginBottom: 10 }}>{item.name}</Text>
        )}
      />
    </View>
  );
}
