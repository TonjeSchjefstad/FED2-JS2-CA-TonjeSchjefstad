import { API_AUTH_LOGIN } from "../constants.js";

/**
 * Logs in a user with the provided credentials and returns the response data.
 * @param {Object} userDetails - The user credentials for login.
 * @param {string} userDetails.email- The users email.
 * @param {string} userDetails.password - The users password.
 * @returns {Promise<Object>} The response data containing user information and access token.
 * @throws Will throw an error if the login request fails.
 */

export async function loginUser(userDetails) {
  try {
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(API_AUTH_LOGIN, fetchOptions);

    if (!response.ok) {
      throw new Error(`Login failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}
