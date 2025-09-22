import { createPost } from "../../api/post/create.js";
import { navigate } from "../../router/index.js";
import { showMessage } from "../../utilities/showMessage.js";

export async function onCreatePost(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formFields = Object.fromEntries(formData);

  if (!formFields.title || !formFields.body) {
    showMessage("please fill in both title and body fields");
    return;
  }

  const postData = {
    title: formFields.title.trim(),
    body: formFields.body.trim(),
  };

  if (formFields.tags && formFields.tags.trim()) {
    postData.tags = formFields.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
  }
  if (formFields.media && formFields.media.trim()) {
    const mediaUrl = formFields.media.trim();

    if (mediaUrl.startsWith("http://") || mediaUrl.startsWith("https://")) {
      postData.media = {
        url: mediaUrl,
        alt: formFields.mediaAlt?.trim() || "",
      };
    } else {
      showMessage("Media URL must start with http:// or https://");
      return;
    }
  }

  try { 
    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.textContent = "Creating...";
    submitButton.disabled = true;

    await createPost(postData);

    showMessage("Post created successfully!");

    setTimeout(() => {
      navigate("/post");
    }, 1000);
  } catch (error) {
    console.error("Failed to create post:", error);
    showMessage(`Failed to create post: ${error.message}`);

    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.textContent = "Create Post";
    submitButton.disabled = false;
  }
}
