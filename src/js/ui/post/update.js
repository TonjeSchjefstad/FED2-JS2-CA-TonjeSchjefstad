import { updatePost } from "../../api/post/update.js";
import { validatePostData } from "../../utilities/validators.js";
import { fetchPostById } from "../../api/post/read.js";
import { showMessage } from "../../utilities/showMessage.js";
import { navigate } from "../../router/index.js";

export function getPostIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

export function populateForm(post) {
  const titleInput = document.getElementById("title");
  const bodyInput = document.getElementById("body");
  const mediaInput = document.getElementById("media");

  if (titleInput) {
    titleInput.value = post.title || "";
  }

  if (bodyInput) {
    bodyInput.value = post.body || "";
  }

  if (mediaInput) {
    mediaInput.value = post.media ? post.media.url : "";
  }
}

export async function onUpdatePost(event) {
  event.preventDefault();

  const submitButton = event.target.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;

  try {
    submitButton.disabled = true;
    submitButton.textContent = "Updating...";

    const postId = getPostIdFromUrl();
    if (!postId) {
      throw new Error("Post ID is missing in the URL");
    }

    const formData = new FormData(event.target);
    const postData = {
      title: formData.get("title")?.trim() || "",
      body: formData.get("body")?.trim() || "",
      media: formData.get("media")?.trim() || "",
    };

    const validation = validatePostData(postData);
    if (!validation.isValid) {
      showMessage(validation.errors.join(". "), "error");
      return;
    }

    await updatePost(postId, postData);
    showMessage("Post updated successfully!", "success");

    setTimeout(() => {
      navigate("/post/");
    }, 1500);
  } catch (error) {
    console.error("Failed to update post:", error);
    showMessage(`Failed to update post: ${error.message}`, "error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
}

function showError(message) {
  const main = document.querySelector("main");
  if (!main) return;

  main.innerHTML = `
    <div class="error-message">
      <p>${message}</p>
      <button id="try-again-btn">Try Again</button>
      <button id="back-btn">Back</button>
    </div>
  `;

  document.getElementById("try-again-btn")?.addEventListener("click", () => {
    location.reload();
  });

  document.getElementById("back-btn")?.addEventListener("click", () => {
    navigate("/post/");
  });
}

export async function initializePostEdit() {
  try {
    const postId = getPostIdFromUrl();

    if (!postId) {
      throw new Error(
        "No post ID provided in URL. Please access this page from a post edit link."
      );
    }

    const form = document.getElementById("edit-post-form");
    if (form) {
      const inputs = form.querySelectorAll("input, textarea, button");
      inputs.forEach((input) => (input.disabled = true));
    }

    const post = await fetchPostById(postId);

    populateForm(post);

    if (form) {
      const inputs = form.querySelectorAll("input, textarea, button");
      inputs.forEach((input) => (input.disabled = false));

      form.addEventListener("submit", onUpdatePost);
    }
  } catch (error) {
    console.error("Error initializing post edit:", error);
    showError(error.message || "Failed to load post for editing");
  }
}
