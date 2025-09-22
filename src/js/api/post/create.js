import { API_SOCIAL_POSTS, API_KEY } from "../constants.js";
import { getFromLocalStorage } from "../../utilities/localStorage.js";

/**
 * Creates a new post on the server with the provided post data.
  * @param {Object} postData - The data for the new post.
  * @param {string} postData.title - The title of the post.
  * @param {string} postData.body - The body content of the post.
  * @param {string} [postData.image] - The image URL for the post.
 * @returns {Promise<Object>} Returns the created post data from the server.
 * @throws Will throw an error if the post creation fails.
 */

export async function createPost(postData) {
  try {
    const accessToken = getFromLocalStorage("accessToken");

    if (!accessToken) {
      throw new Error("No access token found. Please login first");
    }

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify(postData),
    };

    const response = await fetch(API_SOCIAL_POSTS, fetchOptions);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `failed to create post: ${response.status} - ${
          errorData.message || "unknown error"
        }`
      );
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("error creating post", error);
    throw error;
  }
}
