import { useGetFeaturedPlaylistsQuery } from "@/core/api/apiSlice";
import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const { data, error, isLoading } = useGetFeaturedPlaylistsQuery();
  if (isLoading)
    return <Text style={styles.message}>Loading playlists...</Text>;
  if (error)
    return <Text style={styles.message}>Error fetching playlists</Text>;

  const playlists = data?.playlists?.items || [];

  return (
    <FlatList
      data={playlists}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.card}>
          {item.images[0]?.url && (
            <Image source={{ uri: item.images[0].url }} style={styles.image} />
          )}
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.owner}>By: {item.owner.display_name}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: {
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: "#1e1e1e",
    padding: 12,
  },
  image: { width: "100%", height: 150, borderRadius: 8, marginBottom: 8 },
  title: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  owner: { color: "#aaa", fontSize: 12, marginTop: 4 },
  message: { color: "#fff", fontSize: 16, padding: 20, textAlign: "center" },
});
