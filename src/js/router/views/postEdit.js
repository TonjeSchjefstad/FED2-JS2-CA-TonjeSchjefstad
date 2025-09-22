import { authGuard } from "../../utilities/authGuard.js";
import { initializePostEdit } from "../../ui/post/update.js";


export default function postEdit(navigate) {

  const app = document.getElementById("app");
  app.innerHTML = `
    <form class="edit-post" name="edit-post" id="edit-post-form">
      <h1>Edit Post</h1>
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

      <button type="submit" class="primary-button">Edit Post</button>
    </form>
  `;

  if (authGuard()) {
    initializePostEdit(); 
  } else {
    console.warn("Unauthorized access to post edit view");
  }
}
