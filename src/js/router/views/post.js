import { fetchPosts } from "../../api/post/read.js";
import { PostOverlay } from "../../components/postOverlay.js";
import { showLoading } from "../../utilities/loading.js";
import { setupLazyLoading } from "../../utilities/lazyloading.js";

export default function postView(navigate) {
  const app = document.getElementById("app");

  const postOverlay = new PostOverlay();

  app.innerHTML = `
    <div class="feed-header">
      <h1 class="h1-feed">Feel the Moment</h1>
      <p class="subtitle">Where memories become connection.</p>
    </div>

    <div class="search-container">
      <input type="text" class="search-bar" id="post-search" placeholder="Search posts" />
    </div>

    <div id="display-container"></div>
  `;

const displayContainer = document.querySelector("#display-container");

let allPosts = [];

function generatePosts(posts) {
  displayContainer.innerHTML = "";

  if (!posts || posts.length === 0) {
    displayContainer.innerHTML = "<p>No posts found.</p>";
    return;
  }

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const postContainer = document.createElement("div");
    postContainer.classList.add("post-item");

    if (post.author) {
      const authorSection = document.createElement("div");
      authorSection.classList.add("post-author");

      const profileUrl = `/profile/?name=${post.author.name}`;

      if (post.author.avatar && post.author.avatar.url) {
        const avatarLink = document.createElement("a");
        avatarLink.href = profileUrl;

        const avatar = document.createElement("img");
        avatar.src = post.author.avatar.url;
        avatar.alt = `${post.author.name || "User"} avatar`;
        avatar.classList.add("author-avatar");

        avatarLink.appendChild(avatar);

        avatarLink.addEventListener("click", (e) => {
        e.preventDefault();
        navigate(profileUrl);
      });

        authorSection.appendChild(avatarLink);
      }

      const nameLink = document.createElement("a");
      nameLink.href = profileUrl;
      nameLink.textContent = post.author.name || "Anonymous";
      nameLink.classList.add("author-name");

      nameLink.addEventListener("click", (e) => {
      e.preventDefault();
      navigate(profileUrl);
    });

      authorSection.appendChild(nameLink);

      postContainer.appendChild(authorSection);
    }

    const contentSection = document.createElement("div");
    contentSection.classList.add("post-content");

    if (post.title) {
      const title = document.createElement("h2");
      title.textContent = post.title;
      title.classList.add("post-title");
      contentSection.appendChild(title);
    }

    if (post.body) {
      const body = document.createElement("p");
      body.textContent = post.body;
      body.classList.add("post-body");
      contentSection.appendChild(body);
    }

    if (post.media && post.media.url) {
      const media = document.createElement("img");
      media.src = post.media.url;
      media.alt = post.media.alt || "Post image";
      media.classList.add("post-media");
      media.loading = "lazy";
      media.onerror = function () {
        this.style.display = "none";
      };
      contentSection.appendChild(media);
    }

    postContainer.appendChild(contentSection);

    postContainer.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      postOverlay.open(post);
    });

    displayContainer.appendChild(postContainer);
  }
}

const postSearch = document.getElementById("post-search");

if (postSearch) {
  postSearch.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = allPosts.filter((post) => {
      const title = post.title?.toLowerCase() || "";
      const body = post.body?.toLowerCase() || "";
      return title.includes(query) || body.includes(query);
    });
    generatePosts(filtered);
  });
}

async function main() {
  try {
    showLoading("#display-container", "Loading posts...");
    
    const posts = await fetchPosts();
    allPosts = posts;
    generatePosts(posts);
    setupLazyLoading();
  } catch (error) {
    console.error("Error fetching posts:", error);
    displayContainer.innerHTML =
      "<p>Failed to load posts. Please try again.</p>";
  }
}

main();

}
