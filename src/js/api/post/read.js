import { API_SOCIAL_POSTS, API_KEY } from "../constants.js";
import { getFromLocalStorage } from "../../utilities/localStorage.js";

export async function fetchPosts() {
  try {
    const accessToken = getFromLocalStorage("accessToken");

    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
    };

    const response = await fetch(`${API_SOCIAL_POSTS}?_author=true`, fetchOptions);

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export async function fetchPostById(id) {
  try {
    const accessToken = getFromLocalStorage("accessToken");
    if (!accessToken) {
      throw new Error("No access token found. Please log in.");
    }
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch post: ${response.status} ${response.statusText}`
      );
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}
