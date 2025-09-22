import { initializeProfilePage } from "../../ui/profile/read.js";
import { authGuard } from "../../utilities/authGuard.js";
import { PostOverlay } from "../../components/postOverlay.js";

export default function profileView(navigate) {
    const app = document.getElementById("app");

    if (!authGuard()) {
        console.error("Not logged in — sending user to login page.");
        navigate("/auth/login/"); 
        return;
    }

    const existingOverlay = document.getElementById("post-overlay");
    if (existingOverlay) {
        existingOverlay.remove();
        console.log("Removed existing overlay");
    }

    const postOverlay = new PostOverlay();

    app.innerHTML = `
        <section id="profile-info">
          <div class="loading">Loading profile...</div>
        </section>

        <section id="user-posts">
          <div class="loading">Loading posts...</div>
        </section>
    `;

    initializeProfilePage(postOverlay);
}
