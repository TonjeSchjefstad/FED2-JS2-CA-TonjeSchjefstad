import { API_KEY } from "./constants";
import { getFromLocalStorage } from "../utilities/localStorage.js";

export function getHeaders(includeJson = false) {
  const accessToken = getFromLocalStorage("accessToken");

  if (!accessToken) {
    throw new Error("Access token is missing. Please log in.");
  }

  const headers = new Headers();
  headers.append("Athorization", `Bearer ${accessToken}`);
  headers.append("X-Noroff-API-Key", API_KEY);

  if (includeJson) {
    headers.append("Content-Type", "application/json");
  }

  return headers;
}
