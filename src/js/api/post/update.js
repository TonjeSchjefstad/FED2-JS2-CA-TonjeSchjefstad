import { API_SOCIAL_POSTS, API_KEY } from "../constants.js";
import { getFromLocalStorage } from "../../utilities/localStorage.js";
import { validatePostData, isValidUrl } from "../../utilities/validators.js";

export async function updatePost(id, { title, body, media }) {
  try {
    const accessToken = getFromLocalStorage("accessToken");
    if (!accessToken) {
      throw new Error("No access token found");
    }

    if (!id) {
      throw new Error("Post ID is required for updating a post");
    }

    const {isValid, errors} = validatePostData({ title, body, media });
    if (!isValid) {
      throw new Error(`Invalid post data: ${errors.join(", ")}`);
    }

    const postData = {};

    if (!title || title.trim().length === 0) {
      throw new Error("Title is required");
    }

    postData.title = title.trim();

    if (body && body.trim().length > 0) {
      postData.body = body.trim();
    }

    if (media) {
      if (typeof media === "string" && media.trim()) {
        if (isValidUrl(media.trim())) {
          postData.media = { url: media.trim(), alt: "Post image" };
        } else {
          throw new Error("Media must be a valid URL");
        }
      } else if (media.url && media.url.trim()) {
        if (isValidUrl(media.url.trim())) {
          postData.media = {
            url: media.url.trim(),
            alt: media.alt || "Post image",
          };
        } else {
          throw new Error("Media URL must be valid");
        }
      }
    }

    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify(postData),
    };

    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, fetchOptions);

    if (!response.ok) {
      let errorMessage = `Error: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (e) {
        console.warn("Could not parse error response as JSON:", e);
      }
      throw new Error(errorMessage);
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Failed to update post:", error);
    throw error;
  }
}

