import {
  fetchUserProfile,
  fetchUserPosts,
  getCurrentUser,
  isFollowing,
  followUser,
  unfollowUser,
} from "../../api/profile/read.js";
import { handleDeletePost } from "../post/delete.js";
import { showMessage } from "../../utilities/showMessage.js";
import { showLoading } from "../../utilities/loading.js";
import { navigate } from "../../router/index.js";
import { showError } from "../../utilities/showError.js";

export async function initializeProfilePage(postOverlay) {
  try {
    showLoading("#profile-info", "Loading profile...");
    document.querySelector("#user-posts").innerHTML = "";

    const hash = window.location.hash;
    const query = hash.includes("?") ? hash.split("?")[1] : "";
    const params = new URLSearchParams(query);
    const viewedName = params.get("name");
    const currentUser = getCurrentUser();
    const isOwnProfile = !viewedName || viewedName === currentUser.name;
    const profileNameToLoad = isOwnProfile ? currentUser.name : viewedName;

    const [profile, posts] = await Promise.all([
      fetchUserProfile(profileNameToLoad),
      fetchUserPosts(profileNameToLoad),
    ]);

    renderProfile(profile, posts, currentUser, isOwnProfile, postOverlay);
  } catch (error) {
    console.error("Error initializing profile page:", error);
    showError(error.message || "Failed to load profile information");
  }
}

function renderProfile(profile, posts, currentUser, isOwnProfile, postOverlay) {
  renderProfileInfo(profile, currentUser, isOwnProfile);
  renderUserPosts(posts, currentUser, postOverlay);
}

function renderProfileInfo(profile, currentUser, isOwnProfile) {
  const profileContainer = document.querySelector("#profile-info");
  profileContainer.innerHTML = "";

  const avatar = document.createElement("div");
  avatar.className = "flex-shrink-0 relative";

  if (profile.avatar && profile.avatar.url) {
    const img = document.createElement("img");
    img.src = profile.avatar.url;
    img.alt = `${profile.name} avatar`;
    img.className =
      "w-30 h-30 rounded-full object-cover border-4 border-button shadow-lg md:w-[150px] md:h-[150px]";
    avatar.appendChild(img);
  } else {
    const placeholder = document.createElement("div");
    placeholder.className =
      "w-30 h-30 rounded-full flex items-center justify-center bg-button text-white text-4xl font-bold md:w-[150px] md:h-[150px]";
    placeholder.textContent = profile.name.charAt(0).toUpperCase();
    avatar.appendChild(placeholder);
  }

  const details = document.createElement("div");
  details.className = "flex-1 min-w-0 flex flex-col items-center";

  const name = document.createElement("h1");
  name.className =
    "m-0 mb-2 text-2xl font-bold text-primary-text leading-tight md:text-3xl";
  name.textContent = profile.name;
  details.appendChild(name);

  const bio = document.createElement("p");
  bio.className = profile.bio
    ? "text-primary-text m-0 mb-6 leading-relaxed text-base p-4 bg-gray-100 rounded-lg"
    : "italic text-primary-text m-0 mb-6 bg-transparent p-0";
  bio.textContent = profile.bio || "No bio added yet";
  details.appendChild(bio);

  const stats = createStatsSection(profile);
  details.appendChild(stats);

  const actionButton = createActionButton(profile, currentUser, isOwnProfile);
  details.appendChild(actionButton);

  const header = document.createElement("div");
  header.className = `
    flex flex-col items-center text-center gap-8 rounded-xl
    ${isOwnProfile ? "mt-14 md:mt-10" : "mt-30 md:mt-30"}
    mb-4
  `;
  header.appendChild(avatar);
  header.appendChild(details);

  profileContainer.appendChild(header);
}

function createStatsSection(profile) {
  const stats = document.createElement("div");
  stats.className = "flex gap-8";

  const statsData = [
    { number: profile._count?.posts || 0, label: "Posts" },
    {
      number: profile._count?.followers || 0,
      label: "Followers",
      id: "followers-count",
    },
    { number: profile._count?.following || 0, label: "Following" },
  ];

  statsData.forEach((stat) => {
    const statItem = document.createElement("div");
    statItem.className =
      "text-center py-1 px-2 rounded-lg bg-gray-100 min-w-[60px] md:py-2 md:px-4 md:min-w-[80px]";

    const number = document.createElement("span");
    number.className =
      "block text-xl font-medium text-button mb-1 md:text-3xl md:font-bold";
    number.textContent = stat.number;
    if (stat.id) number.id = stat.id;

    const label = document.createElement("span");
    label.className =
      "block text-xs text-primary-text uppercase tracking-wider md:text-sm";
    label.textContent = stat.label;

    statItem.appendChild(number);
    statItem.appendChild(label);
    stats.appendChild(statItem);
  });

  return stats;
}

function createActionButton(profile, currentUser, isOwnProfile) {
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "mt-8";

  const button = document.createElement("button");

  if (isOwnProfile) {
    button.className =
      "w-full px-20 py-3 bg-button text-secondary-text font-semibold rounded-xl shadow-md border-none cursor-pointer transition-colors duration-300 hover:bg-button-hover";
    button.textContent = "Edit Profile";
    button.onclick = () => navigate("/profile/edit/");
  } else {
    button.className =
      "py-3.5 px-12 text-sm border-none rounded-xl cursor-pointer bg-button text-white transition-colors duration-200 hover:bg-button-hover";
    button.id = "follow-button";
    updateFollowButton(button, profile, currentUser);
  }

  buttonContainer.appendChild(button);
  return buttonContainer;
}

async function updateFollowButton(button, targetProfile, currentUser) {
  try {
    const following = await isFollowing(targetProfile.name);

    button.textContent = following ? "Unfollow" : "Follow";
    button.className = following
      ? "py-3.5 px-12 text-sm border-none rounded-xl cursor-pointer bg-button-hover text-white transition-colors duration-200 hover:bg-button-active"
      : "py-3.5 px-12 text-sm border-none rounded-xl cursor-pointer bg-button text-white transition-colors duration-200 hover:bg-button-hover";
    button.disabled = false;

    button.onclick = async () => {
      try {
        button.disabled = true;
        button.textContent = "Loading...";

        if (following) {
          await unfollowUser(targetProfile.name);
          showMessage(`You unfollowed ${targetProfile.name}`, "success");
        } else {
          await followUser(targetProfile.name);
          showMessage(`You are now following ${targetProfile.name}`, "success");
        }

        updateFollowerCount(!following);
        updateFollowButton(button, targetProfile, currentUser);
      } catch (error) {
        console.error("Detailed error in button click:", error);
        showMessage(
          "Failed to update follow status. Please try again.",
          "error"
        );
        button.disabled = false;
        button.textContent = following ? "Unfollow" : "Follow";
      }
    };
  } catch (error) {
    console.error("Error setting up follow button:", error);
    button.textContent = "Error";
    button.disabled = true;
  }
}

function updateFollowerCount(isNowFollowing) {
  const followersCountEl = document.querySelector("#followers-count");
  if (followersCountEl) {
    const currentCount = parseInt(followersCountEl.textContent);
    followersCountEl.textContent = isNowFollowing
      ? currentCount + 1
      : currentCount - 1;
  }
}

function renderUserPosts(posts, currentUser, postOverlay) {
  const postsContainer = document.querySelector("#user-posts");
  postsContainer.innerHTML = "";

  if (!posts || posts.length === 0) {
    const noPostsDiv = document.createElement("div");
    noPostsDiv.className = "text-center text-primary-text my-8";
    noPostsDiv.innerHTML = `
      <h2 class="text-2xl font-bold mb-2">No Posts Yet</h2>
      <p>This user hasn't created any posts yet.</p>
    `;
    postsContainer.appendChild(noPostsDiv);
    return;
  }

  const title = document.createElement("h2");
  title.className =
    "text-center text-2xl my-8 text-primary-text font-logo font-bold";
  title.textContent = "Shared moments";
  postsContainer.appendChild(title);

  const postsGrid = document.createElement("div");
  postsGrid.className =
    "grid grid-cols-1 gap-6 mb-48 px-5 md:grid-cols-2 lg:grid-cols-3";

  posts.forEach((post) => {
    const postElement = createPostElement(post, currentUser, postOverlay);
    postsGrid.appendChild(postElement);
  });

  postsContainer.appendChild(postsGrid);
}

function createPostElement(post, currentUser, postOverlay) {
  const isAuthor =
    currentUser?.name === post?.owner ||
    currentUser?.name === post?.author?.name;

  const postDiv = document.createElement("div");
  postDiv.className =
    "border border-gray-300 rounded-[40px] p-5 mb-4 bg-white cursor-pointer break-words hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 md:p-8";
  postDiv.dataset.postId = post.id;

  const content = document.createElement("div");

  const title = document.createElement("h3");
  title.className = "my-0 mb-2.5 text-xl text-primary-text font-bold";
  title.textContent = post.title;
  content.appendChild(title);

  const body = document.createElement("p");
  body.className = "text-gray-600 leading-relaxed mb-4 break-words";
  body.textContent = post.body;
  content.appendChild(body);

  if (post.media?.url) {
    const mediaDiv = document.createElement("div");
    const img = document.createElement("img");
    img.src = post.media.url;
    img.alt = post.media.alt || "Post image";
    img.className = "w-full h-full object-cover max-h-[350px] rounded-2xl";
    img.loading = "lazy";
    mediaDiv.appendChild(img);
    content.appendChild(mediaDiv);
  }

  postDiv.appendChild(content);

  if (isAuthor) {
    const actions = document.createElement("div");
    actions.className = "flex gap-4 mt-4";

    const editBtn = document.createElement("button");
    editBtn.className =
      "py-3 px-6 text-base font-semibold text-white bg-button border-none rounded-lg cursor-pointer transition-colors duration-300 hover:bg-button-hover";
    editBtn.textContent = "Edit";
    editBtn.onclick = () => navigate(`/post/edit/?id=${post.id}`);

    const deleteBtn = document.createElement("button");
    deleteBtn.className =
      "py-3 px-6 text-base font-semibold text-white bg-red-600 border-none rounded-lg cursor-pointer transition-colors duration-300 hover:bg-red-700";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => handleDeletePost(post.id, post.title);

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    postDiv.appendChild(actions);
  }

  postDiv.addEventListener("click", (e) => {
    if (e.target.closest("button")) return;
    postOverlay.open(post);
  });

  return postDiv;
}
