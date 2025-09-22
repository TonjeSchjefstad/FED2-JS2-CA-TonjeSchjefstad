import { API_SOCIAL_PROFILES, API_KEY } from "../constants.js";
import { getFromLocalStorage } from "../../utilities/localStorage.js";

export async function fetchUserProfile(username) {
  try {
    const accessToken = getFromLocalStorage("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
    };

    const url = username.includes("?")
      ? `${API_SOCIAL_PROFILES}/${username}`
      : `${API_SOCIAL_PROFILES}/${username}`;

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch profile: ${response.status} ${response.statusText}`
      );
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}

export async function fetchUserPosts(username) {
  try {
    const accessToken = getFromLocalStorage("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
    };

    const response = await fetch(
      `${API_SOCIAL_PROFILES}/${username}/posts?_owner=true`,
      fetchOptions
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user posts: ${response.status} ${response.statusText}`
      );
    }

    const json = await response.json();

    return (json.data || []).map((post) => ({
      ...post,
      author: { name: username },
    }));
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error;
  }
}

export function getCurrentUser() {
  const user = getFromLocalStorage("user");
  if (!user || !user.name) {
    throw new Error("No user information found in localStorage");
  }
  return user;
}

export async function followUser(username) {
  try {
    const accessToken = getFromLocalStorage("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const fetchOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      `${API_SOCIAL_PROFILES}/${username}/follow`,
      fetchOptions
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Follow error response:", errorText);
      throw new Error(
        `Failed to follow user: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Error in followUser API function:", error);
    throw error;
  }
}

export async function unfollowUser(username) {
  try {
    const accessToken = getFromLocalStorage("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const fetchOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      `${API_SOCIAL_PROFILES}/${username}/unfollow`,
      fetchOptions
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Unfollow error response:", errorText);
      throw new Error(
        `Failed to unfollow user: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Error in unfollowUser API function:", error);
    throw error;
  }
}

export async function isFollowing(username) {
  try {
    const currentUser = getCurrentUser();

    if (!currentUser || !currentUser.name) {
      return false;
    }

    const accessToken = getFromLocalStorage("accessToken");
    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
    };

    const response = await fetch(
      `${API_SOCIAL_PROFILES}/${currentUser.name}?_following=true`,
      fetchOptions
    );

    if (!response.ok) {
      console.warn("Failed to fetch following status");
      return false;
    }

    const json = await response.json();
    const following = json.data.following || [];
    return following.some((user) => user.name === username);
  } catch (error) {
    console.error("Error checking following status:", error);
    return false;
  }
}
