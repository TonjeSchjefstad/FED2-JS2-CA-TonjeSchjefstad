import { fetchUserProfile, getCurrentUser } from "../../api/profile/read.js";
import { updateUserProfile } from "../../api/profile/update.js";
import { validateProfileData } from "../../utilities/validators.js";
import { navigate } from "../../router/index.js";
import { showMessage } from "../../utilities/showMessage.js";

export function renderEditForm(profile) {
  const formContainer = document.querySelector("#profile-edit-form");
  if (!formContainer) {
    console.error("Form container (#profile-edit-form) not found");
    return;
  }

  formContainer.innerHTML = `
    <form id="profile-update-form" class="profile-form">
      <h1>Edit Profile</h1>
      <div class="form-group">
        <label for="bio">Bio</label>
        <textarea 
          id="bio" 
          name="bio" 
          maxlength="160" 
          placeholder="Tell people about yourself..."
          rows="4"
        >${profile.bio || ""}</textarea>
      </div>

      <div class="form-group">
        <label for="avatar-url">Avatar URL</label>
        <input 
          type="url" 
          id="avatar-url" 
          name="avatar-url" 
          placeholder="https://example.com/image.jpg"
          value="${profile.avatar?.url || ""}"
        >
      </div>

      <div class="form-actions">
        <button type="submit" id="save-button" class="primary-button">
          Save Changes
        </button>
      </div>
    </form>
  `;
}

export function addFormEventListeners() {
  const form = document.getElementById("profile-update-form");
  const bioTextarea = document.getElementById("bio");
  const bioCount = document.getElementById("bio-count");

  if (!form) return;

  if (bioTextarea && bioCount) {
    bioTextarea.addEventListener("input", () => {
      const currentLength = bioTextarea.value.length;
      bioCount.textContent = currentLength;
      bioCount.parentElement.classList.toggle(
        "over-limit",
        currentLength > 160
      );
    });
  }

  form.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const saveButton = document.getElementById("save-button");
  const originalButtonText = saveButton.textContent;
  saveButton.disabled = true;
  saveButton.textContent = "Saving...";

  try {
    const currentUser = getCurrentUser();
    const formData = new FormData(event.target);

    const profileData = {
      bio: formData.get("bio")?.trim() || null,
      avatar: null,
    };

    const avatarUrl = formData.get("avatar-url")?.trim();
    const avatarAlt = formData.get("avatar-alt")?.trim();
    if (avatarUrl) {
      profileData.avatar = {
        url: avatarUrl,
        alt: avatarAlt || `${currentUser.name} avatar`,
      };
    }

    const validation = validateProfileData(profileData);
    if (!validation.isValid) {
      showMessage(validation.errors.join(". "));
      return;
    }

    await updateUserProfile(currentUser.name, profileData);
    showMessage("Profile updated successfully!");
    navigate ("/profile");
  } catch (error) {
    console.error("Profile update failed:", error);
    showMessage(error.message || "Failed to update profile. Please try again.");
  } finally {
    saveButton.disabled = false;
    saveButton.textContent = originalButtonText;
  }
}

export async function initializeProfileEdit() {
  try {
    const currentUser = getCurrentUser();
    const profile = await fetchUserProfile(currentUser.name);
    renderEditForm(profile);
    addFormEventListeners();
  } catch (error) {
    console.error("Error initializing profile edit:", error);
    showMessage(error.message || "Failed to load profile for editing");
  }
}

