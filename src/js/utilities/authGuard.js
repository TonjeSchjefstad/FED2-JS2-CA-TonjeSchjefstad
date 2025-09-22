import { getFromLocalStorage } from "./localStorage.js";

export function authGuard() {
  
  const accessToken = getFromLocalStorage("accessToken");
  const loggedIn = localStorage.getItem("loggedIn");

  if (accessToken && loggedIn === "true") {
    return true;
  }

  return false;
}