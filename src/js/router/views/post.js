import { fetchPosts } from "../../api/post/read.js";
import { PostOverlay } from "../../components/postOverlay.js";
import { showLoading } from "../../utilities/loading.js";
import { setupLazyLoading } from "../../utilities/lazyloading.js";

export default function postView(navigate) {
  const app = document.getElementById("app");

  const postOverlay = new PostOverlay();

  app.innerHTML = `
    <div class="mx-5 my-8">
  <div class="text-center">
    <h1 class="font-logo font-bold text-3xl md:text-4xl mb-0 text-primary-text">Feel the Moment</h1>
    <p class="text-base mb-1 text-primary-text md:text-lg">Where memories become connection.</p>
  </div>

  <div class="flex justify-center my-5">
    <input 
      type="text" 
      class="w-4/5 max-w-2xl px-4 py-2.5 border border-button rounded-full text-base bg-card text-primary-text text-center focus:outline-none focus:border-button focus:shadow-[0_0_5px_rgba(107,144,128,0.5)] hover:border-button" 
      id="post-search" 
      placeholder="Search posts" 
    />
  </div>

  <div id="display-container" class="mb-5"></div>
</div>
  `;

  const displayContainer = document.querySelector("#display-container");

  let allPosts = [];

  function generatePosts(posts) {
    displayContainer.innerHTML = "";

    if (!posts || posts.length === 0) {
      displayContainer.innerHTML =
        "<p class='text-center text-gray-600'>No posts found.</p>";
      return;
    }

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const postContainer = document.createElement("div");
      postContainer.className =
        "border border-gray-300 rounded-[40px] p-5 mb-4 bg-white cursor-pointer break-words hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 md:p-8";

      if (post.author) {
        const authorSection = document.createElement("div");
        authorSection.className =
          "flex items-center gap-2.5 mb-4 pb-2.5 border-b border-gray-200";

        const profileUrl = `/profile/?name=${post.author.name}`;

        if (post.author.avatar && post.author.avatar.url) {
          const avatarLink = document.createElement("a");
          avatarLink.href = profileUrl;

          const avatar = document.createElement("img");
          avatar.src = post.author.avatar.url;
          avatar.alt = `${post.author.name || "User"} avatar`;
          avatar.className =
            "w-8 h-8 rounded-full object-cover md:w-10 md:h-10";

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
        nameLink.className =
          "font-medium text-gray-800 hover:text-button md:font-semibold";

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
        title.className = "my-0 mb-2.5 text-xl text-primary-text font-bold";
        contentSection.appendChild(title);
      }

      if (post.body) {
        const body = document.createElement("p");
        body.textContent = post.body;
        body.className = "text-gray-600 leading-relaxed mb-4 break-words";
        contentSection.appendChild(body);
      }

      if (post.media && post.media.url) {
        const media = document.createElement("img");
        media.src = post.media.url;
        media.alt = post.media.alt || "Post image";
        media.className =
          "w-full h-full object-cover max-h-[350px] rounded-2xl";
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
        "<p class='text-center text-red-600'>Failed to load posts. Please try again.</p>";
    }
  }

  main();
}
