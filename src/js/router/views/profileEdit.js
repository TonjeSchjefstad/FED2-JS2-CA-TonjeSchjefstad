import { initializeProfileEdit } from "../../ui/profile/update.js";
import { authGuard } from "../../utilities/authGuard.js";

export default function profileEditView(navigate) {
  if (!authGuard()) {
    console.error("Not logged in — sending user to login page.");
    navigate("/auth/login"); 
    return;
  }

  const app = document.getElementById("app");
  app.innerHTML = `
     <section id="profile-edit-form" class="edit-profile-section"></section>
  `;
  initializeProfileEdit(navigate);
}