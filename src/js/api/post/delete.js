import { API_SOCIAL_POSTS, API_KEY } from "../constants.js";
import { getFromLocalStorage } from "../../utilities/localStorage.js";

export async function deletePost(Id) {
  try {
    const accessToken = getFromLocalStorage("accessToken");

    if (!accessToken) {
      throw new Error("No access token found. Please log in.");
    }

    if (!Id) {
      throw new Error("Post ID is required to delete a post.");
    }

    const fetchOptions = {
      method: "DELETE",
      headers: {
        "X-Noroff-API-Key": API_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await fetch(`${API_SOCIAL_POSTS}/${Id}`, fetchOptions);

    if (!response.ok) {
      let errorMessage = `Error: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (_) {}
      throw new Error(errorMessage);
    }

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      const json = await response.json();
      return json.data || { success: true };
    }

    return { message: "Post deleted successfully." };
  } catch (error) {
    console.error("Failed to delete post:", error);
    throw error;
  }
}
