import { authGuard } from "../../utilities/authGuard.js";
import { initializePostEdit } from "../../ui/post/update.js";

export default function postEdit(navigate) {
  const params = new URLSearchParams(location.hash.split("?")[1]);
  const postId = params.get("id");
  const app = document.getElementById("app");

  app.innerHTML = `
    <form class="max-w-[calc(100%-40px)] mx-auto my-5 mt-20 px-5 pt-12 pb-16 bg-card rounded-2xl shadow-md md:max-w-3xl" name="edit-post" id="edit-post-form">
  <h1 class="text-center text-3xl font-bold text-primary-text mb-5">Edit Post</h1>
  
  <div class="mb-5">
    <label for="title" class="block mb-2 font-medium text-sm text-primary-text">Title</label>
    <input 
      type="text" 
      id="title" 
      name="title" 
      placeholder="Enter Post Title" 
      required 
      class="w-full p-4 bg-white border border-primary-text rounded-xl focus:outline-none focus:border-button"
    />
  </div>

  <div class="mb-5">
    <label for="body" class="block mb-2 font-medium text-sm text-primary-text">Content</label>
    <textarea 
      id="body" 
      name="body" 
      placeholder="body" 
      rows="5" 
      required
      class="w-full p-4 bg-white border border-primary-text rounded-xl focus:outline-none focus:border-button resize-y"
    ></textarea>
  </div>

  <div class="mb-5">
    <label for="media" class="block mb-2 font-medium text-sm text-primary-text">Image URL</label>
    <input 
      type="text" 
      name="media" 
      id="media" 
      placeholder="https://example.com/image.jpg"
      class="w-full p-4 bg-white border border-primary-text rounded-xl focus:outline-none focus:border-button"
    />
  </div>

  <button 
    type="submit" 
    class="w-full mt-2.5 px-6 py-4 bg-button text-secondary-text font-semibold rounded-xl shadow-md border-none cursor-pointer transition-colors duration-300 hover:bg-button-hover"
  >
    Edit Post
  </button>
</form>
  `;

  if (authGuard()) {
    initializePostEdit(postId);
  } else {
    console.warn("Unauthorized access to post edit view");
  }
}
