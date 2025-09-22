import { showMessage } from "../../utilities/showMessage.js";

export async function handleDeletePost(postId, postTitle, onSuccess) {
  if (!confirm(`Are you sure you want to delete "${postTitle}"?`)) {
    return false;
  }

  try {
    const { deletePost } = await import("../../api/post/delete.js");
    await deletePost(postId);

    const postElement = document.querySelector(`[data-post-id="${postId}"]`);
    if (postElement) {
      postElement.remove();
    }

    showMessage("Post deleted successfully", "success");

    if (onSuccess && typeof onSuccess === "function") {
      onSuccess(postId);
    }

    return true;
  } catch (error) {
    console.error("Delete failed:", error);
    showMessage("Failed to delete post. Please try again.", "error");
    return false;
  }
}

export function createDeleteButton(post, onSuccess) {
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-post-button";
  deleteBtn.textContent = "Delete";
  
  deleteBtn.onclick = () => handleDeletePost(post.id, post.title, onSuccess);
  
  return deleteBtn;
}

