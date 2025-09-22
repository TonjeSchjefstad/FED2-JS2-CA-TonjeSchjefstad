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

export async function initializeProfilePage(postOverlay) {
  try {
    showLoading("#profile-info", "Loading profile...");
    document.querySelector("#user-posts").innerHTML = ""; 

    const params = new URLSearchParams(window.location.search);
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
  avatar.className = "profile-avatar";

  if (profile.avatar && profile.avatar.url) {
    const img = document.createElement("img");
    img.src = profile.avatar.url;
    img.alt = `${profile.name} avatar`;
    img.className = "avatar-image";
    avatar.appendChild(img);
  } else {
    const placeholder = document.createElement("div");
    placeholder.className = "avatar-placeholder";
    placeholder.textContent = profile.name.charAt(0).toUpperCase();
    avatar.appendChild(placeholder);
  }

  const details = document.createElement("div");
  details.className = "profile-details";

  const name = document.createElement("h1");
  name.className = "profile-name";
  name.textContent = profile.name;
  details.appendChild(name);

  const bio = document.createElement("p");
  bio.className = profile.bio ? "profile-bio" : "profile-bio no-bio";
  bio.textContent = profile.bio || "No bio added yet";
  details.appendChild(bio);

  const stats = createStatsSection(profile);
  details.appendChild(stats);

  const actionButton = createActionButton(profile, currentUser, isOwnProfile);
  details.appendChild(actionButton);

  const header = document.createElement("div");
  header.className = "profile-header";
  header.appendChild(avatar);
  header.appendChild(details);

  profileContainer.appendChild(header);
}

function createStatsSection(profile) {
  const stats = document.createElement("div");
  stats.className = "profile-stats";

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
    statItem.className = "stat-item";

    const number = document.createElement("span");
    number.className = "stat-number";
    number.textContent = stat.number;
    if (stat.id) number.id = stat.id;

    const label = document.createElement("span");
    label.className = "stat-label";
    label.textContent = stat.label;

    statItem.appendChild(number);
    statItem.appendChild(label);
    stats.appendChild(statItem);
  });

  return stats;
}

function createActionButton(profile, currentUser, isOwnProfile) {
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "profile-actions";

  const button = document.createElement("button");

  if (isOwnProfile) {
    button.className = "primary-button";
    button.textContent = "Edit Profile";
    button.onclick = () => (navigate("/profile/edit/"));
  } else {
    button.className = "follow-button";
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
      ? "follow-button following"
      : "follow-button not-following";
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
        showMessage("Failed to update follow status. Please try again.", "error");
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
    noPostsDiv.className = "no-posts";
    noPostsDiv.innerHTML = `
      <h2>No Posts Yet</h2>
      <p>This user hasn't created any posts yet.</p>
    `;
    postsContainer.appendChild(noPostsDiv);
    return;
  }

  const title = document.createElement("h2");
  title.className = "posts-title";
  title.textContent = "Shared moments";
  postsContainer.appendChild(title);

  const postsGrid = document.createElement("div");
  postsGrid.className = "profile-posts-grid";

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
  postDiv.className = "post-item";
  postDiv.dataset.postId = post.id;

  const content = document.createElement("div");
  content.className = "post-content";

  const title = document.createElement("h3");
  title.className = "post-title";
  title.textContent = post.title;
  content.appendChild(title);

  const body = document.createElement("p");
  body.textContent = post.body;
  content.appendChild(body);

  if (post.media?.url) {
    const mediaDiv = document.createElement("div");
    mediaDiv.className = "post-media";
    const img = document.createElement("img");
    img.src = post.media.url;
    img.alt = post.media.alt || "Post image";
    img.loading = "lazy";
    mediaDiv.appendChild(img);
    content.appendChild(mediaDiv);
  }

  postDiv.appendChild(content);

  if (isAuthor) {
    const actions = document.createElement("div");
    actions.className = "post-actions";

    const editBtn = document.createElement("button");
    editBtn.className = "edit-post-button";
    editBtn.textContent = "Edit";
    editBtn.onclick = () =>
      navigate(`/post/edit/?id=${post.id}`);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-post-button";
    deleteBtn.textContent = "Delete";

    deleteBtn.onclick = () => handleDeletePost(post.id, post.title);

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    postDiv.appendChild(actions);
  }

  postDiv.addEventListener("click", (e) => {
    if (e.target.closest("button") || e.target.closest(".post-actions")) return;
    postOverlay.open(post);
  });

  return postDiv;
}

function showError(message) {
  document.querySelector("#profile-info").innerHTML = `
    <div class="error-message">
      <h2>Error Loading Profile</h2>
      <p>${message}</p>
       <button id="try-again-btn" class="primary-button">Try Again</button>
    </div>
  `;

  const tryAgainBtn = document.getElementById("try-again-btn");
  if (tryAgainBtn) {
    tryAgainBtn.addEventListener("click", () => {
      window.location.reload(); 
    });
  }
}

