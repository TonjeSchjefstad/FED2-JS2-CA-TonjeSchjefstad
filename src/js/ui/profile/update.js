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
    <div class="max-w-[calc(100%-40px)] mx-auto mt-8 mb-5 px-5 pt-2.5 pb-16 bg-card rounded-2xl shadow-md md:max-w-2xl">
      <form id="profile-update-form">
        <h1 class="text-center text-3xl pt-10 font-bold text-primary-text mb-5">Edit Profile</h1>
        <div class="mb-6">
          <label for="bio" class="block mb-2 font-medium text-sm text-primary-text">Bio</label>
          <textarea 
            id="bio" 
            name="bio" 
            maxlength="160" 
            placeholder="Tell people about yourself..."
            rows="4"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-button resize-y"
          >${profile.bio || ""}</textarea>
        </div>

        <div class="mb-6">
          <label for="avatar-url" class="block mb-2 font-medium text-sm text-primary-text">Avatar URL</label>
          <input 
            type="url" 
            id="avatar-url" 
            name="avatar-url" 
            placeholder="https://example.com/image.jpg"
            value="${profile.avatar?.url || ""}"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-button"
          >
        </div>

        <div class="text-right">
          <button 
            type="submit" 
            id="save-button" 
            class="w-full mt-5 px-6 py-4 bg-button text-secondary-text font-semibold rounded-xl shadow-md border-none cursor-pointer transition-colors duration-300 hover:bg-button-hover"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
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
    showMessage("Profile updated successfully!", "success");
    navigate("/profile");
  } catch (error) {
    console.error("Profile update failed:", error);
    showMessage(
      error.message || "Failed to update profile. Please try again.",
      "error"
    );
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
