import { getFromLocalStorage } from "./localStorage.js";
import { navigate } from "../router/index.js";
import { showMessage } from "./showMessage.js";

export function authGuard() {
  
  const accessToken = getFromLocalStorage("accessToken");
  const loggedIn = localStorage.getItem("loggedIn");

  const isAuthenticated = accessToken && loggedIn === "true";

  if (!isAuthenticated) {
    showMessage("You must be logged in to access this page.", "error");
    navigate("/auth/login/");
    return false;
  }

  return true;
}