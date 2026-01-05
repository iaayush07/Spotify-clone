import * as AuthSession from "expo-auth-session";

export const spotifyConfig = {
  clientId: process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID!,
  scopes: [
    "user-read-email",
    "user-read-private",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-library-read",
  ],
  redirectUri: AuthSession.makeRedirectUri(),
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};
