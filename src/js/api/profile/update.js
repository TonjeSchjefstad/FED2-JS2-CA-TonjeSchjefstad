import { API_SOCIAL_PROFILES, API_KEY } from "../constants.js";
import { validateProfileData } from "../../utilities/validators.js";
import {
  getFromLocalStorage,
  addToLocalStorage,
} from "../../utilities/localStorage.js";

export async function updateUserProfile(username, profileData) {
  try {
    const { isValid, errors } = validateProfileData(profileData);
    if (!isValid) {
      throw new Error(`Invalid profile data: ${errors.join(", ")}`);
    }

    const accessToken = getFromLocalStorage("accessToken");
    if (!accessToken) {
      throw new Error("No access token found");
    }

    const cleanedData = {};

    if (
      profileData.avatar &&
      profileData.avatar.url &&
      profileData.avatar.url.trim()
    ) {
      cleanedData.avatar = {
        url: profileData.avatar.url.trim(),
        alt: profileData.avatar.alt?.trim() || `${username} avatar`,
      };
    }

    if (
      profileData.banner &&
      profileData.banner.url &&
      profileData.banner.url.trim()
    ) {
      cleanedData.banner = {
        url: profileData.banner.url.trim(),
        alt: profileData.banner.alt || `${username} banner`,
      };
    }

    if (profileData.bio !== null && profileData.bio.trim() !== "") {
      cleanedData.bio = profileData.bio.trim();
    }

    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify(cleanedData),
    };

    const response = await fetch(
      `${API_SOCIAL_PROFILES}/${username}`,
      fetchOptions
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `Failed to update profile: ${response.status} ${response.statusText}`
      );
    }

    const json = await response.json();

    const currentUser = getFromLocalStorage("user");
    if (currentUser && currentUser.name === username) {
      const updatedUser = { ...currentUser, ...json.data };
      addToLocalStorage("user", updatedUser);
    }

    return json.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}
