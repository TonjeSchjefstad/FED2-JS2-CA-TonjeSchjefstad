import { initializeProfilePage } from "../../ui/profile/read.js";
import { authGuard } from "../../utilities/authGuard.js";
import { PostOverlay } from "../../components/postOverlay.js";

export default function profileView(navigate) {
  const app = document.getElementById("app");

  if (!authGuard()) {
    console.error("Not logged in — sending user to login page.");
    navigate("/auth/login");
    return;
  }

  const existingOverlay = document.getElementById("post-overlay");
  if (existingOverlay) {
    existingOverlay.remove();
  }

  const postOverlay = new PostOverlay();

  app.innerHTML = `
    <section id="profile-info">
      <div class="text-center p-8 text-gray-600">
        <div class="border-4 border-gray-200 border-t-button rounded-full w-8 h-8 animate-spin mx-auto mb-4"></div>
        <p class="m-0 text-sm">Loading profile...</p>
      </div>
    </section>

    <section id="user-posts">
      <div class="text-center p-8 text-gray-600">
        <div class="border-4 border-gray-200 border-t-button rounded-full w-8 h-8 animate-spin mx-auto mb-4"></div>
        <p class="m-0 text-sm">Loading posts...</p>
      </div>
    </section>
  `;

  initializeProfilePage(postOverlay);
}
