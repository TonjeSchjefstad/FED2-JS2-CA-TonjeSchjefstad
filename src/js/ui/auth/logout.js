import { navigate } from "../../router/index.js";
import { showMessage } from "../../utilities/showMessage.js";

export function onLogout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("accessToken"); 
  localStorage.removeItem("user");      
  
  document.querySelector("header")?.remove();

  showMessage("You’ve been logged out successfully.", "success");
  
  navigate("/"); 
}