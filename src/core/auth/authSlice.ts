// src/store/slices/authSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Buffer } from "buffer";

// Use your Expo environment variables
const CLIENT_ID = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET!;
const TOKEN_URL = "https://accounts.spotify.com/api/token";

export const fetchSpotifyToken = createAsyncThunk(
  "auth/fetchSpotifyToken",
  async () => {
    const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
      "base64"
    );

    const response = await axios.post(
      TOKEN_URL,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data; // { access_token, token_type, expires_in }
  }
);

interface AuthState {
  accessToken: string;
  expiresIn: number;
  status: "idle" | "loading" | "success" | "failed";
}

const initialState: AuthState = {
  accessToken: "",
  expiresIn: 0,
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpotifyToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSpotifyToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token; // string token
        state.expiresIn = action.payload.expires_in;
        state.status = "success";
      })
      .addCase(fetchSpotifyToken.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default authSlice.reducer;
