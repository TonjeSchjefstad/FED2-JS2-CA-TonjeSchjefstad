import { navigate } from "../../router/index.js";

export function onLogout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("accessToken"); 
  localStorage.removeItem("user");      
  
  document.querySelector("header")?.remove();
  
  navigate("/"); 
}