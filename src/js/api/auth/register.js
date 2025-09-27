import { API_AUTH_REGISTER } from "../constants.js";

/**
 * Registers a new user with the provided details.
 * @param {Object} userDetails - The user details for registration.
 * @param {string} userDetails.name - The user's full name.
 * @param {string} userDetails.email - The user's email address.
 * @param {string} userDetails.password - The user's password.
 * @returns {Promise<Object>} Returns the server's response data if the registration succeeds.
 * @throws Will throw an error if the registration request fails.
 */

export async function registerUser(userDetails) {
  try {
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(API_AUTH_REGISTER, fetchOptions);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Register API error:", errorText);
      throw new Error(`Failed to register user: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}
