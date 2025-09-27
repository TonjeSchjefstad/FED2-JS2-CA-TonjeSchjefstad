import { onCreatePost } from "../../ui/post/create.js";
import { authGuard } from "../../utilities/authGuard.js";

export default function postCreate(navigate) {
  if (!authGuard()) return;

  const app = document.getElementById("app");
  app.innerHTML = `
    <form class="create-post" name="create-post" id="create-post-form">
      <h1>Create Post</h1>
      <div>
        <label for="title">Title</label>
        <input type="text" id="title" name="title" placeholder="Enter Post Title" required />
      </div>

      <div>
        <label for="body">Content</label>
        <textarea id="body" name="body" placeholder="body" rows="5" required> </textarea>
      </div>

      <div>
        <label for="media">Image Url</label>
        <input type="text" name="media" id="media" placeholder="https://example.com/image.jpg" />
      </div>

      <button type="submit" class="primary-button">Create Post</button>
    </form>
  `;

  const form = document.getElementById("create-post-form");
  if (form) {
    form.addEventListener("submit", onCreatePost);
  } else {
    console.error("Create post form not found");
  }
}
