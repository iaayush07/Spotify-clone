import axios from "axios";

const API_BASE = "https://api.spotify.com/v1";

export async function getBrowseCategories(token: string) {
  const res = await axios.get(`${API_BASE}/browse/categories?limit=1`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
