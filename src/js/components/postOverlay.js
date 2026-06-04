import { navigate } from "../router/index.js";

export class PostOverlay {
  constructor() {
    this.overlay = null;
    this.overlayBody = null;
    this.overlayClose = null;
    this.init();
  }

  init() {
    if (document.getElementById("post-overlay")) {
      this.overlay = document.getElementById("post-overlay");
      this.overlayBody = document.getElementById("overlay-body");
      this.overlayClose = document.getElementById("overlay-close");
    } else {
      this.createOverlayHTML();
    }

    this.bindEvents();
  }

  createOverlayHTML() {
    const overlayHTML = `
      <div id="post-overlay" class="hidden fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-[1000]">
        <div class="bg-white p-8 rounded-2xl w-11/12 max-w-lg relative">
          <span id="overlay-close" class="absolute top-5 right-5 bg-transparent border-none text-3xl cursor-pointer text-gray-800 hover:text-button">&times;</span>
          <div id="overlay-body"></div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", overlayHTML);

    this.overlay = document.getElementById("post-overlay");
    this.overlayBody = document.getElementById("overlay-body");
    this.overlayClose = document.getElementById("overlay-close");
  }

  bindEvents() {
    if (this.overlayClose) {
      this.overlayClose.addEventListener("click", () => {
        this.close();
      });
    }

    if (this.overlay) {
      this.overlay.addEventListener("click", (e) => {
        if (e.target === this.overlay) {
          this.close();
        }
      });
    }
  }

  createAuthorSection(author) {
    const authorName = author && author.name ? author.name : "Anonymous";
    const authorAvatar =
      author && author.avatar && author.avatar.url ? author.avatar.url : "";
    const profileUrl = `/profile/?name=${authorName}`;

    const overlayAuthor = document.createElement("div");
    overlayAuthor.className =
      "flex items-center gap-2.5 mb-4 pb-2.5 border-b border-gray-200";

    if (authorAvatar) {
      const avatarLink = document.createElement("a");
      avatarLink.href = profileUrl;

      const avatarImg = document.createElement("img");
      avatarImg.src = authorAvatar;
      avatarImg.alt = authorName + " avatar";
      avatarImg.className = "w-8 h-8 rounded-full object-cover md:w-10 md:h-10";

      avatarLink.appendChild(avatarImg);

      avatarLink.addEventListener("click", (e) => {
        e.preventDefault();
        this.close();
        navigate(profileUrl);
      });

      overlayAuthor.appendChild(avatarLink);
    }

    const nameLink = document.createElement("a");
    nameLink.href = profileUrl;
    nameLink.textContent = authorName;
    nameLink.className =
      "font-medium text-gray-800 no-underline md:font-semibold hover:text-button";

    nameLink.addEventListener("click", (e) => {
      e.preventDefault();
      this.close();
      navigate(profileUrl);
    });

    overlayAuthor.appendChild(nameLink);

    return overlayAuthor;
  }

  createPostContent(post) {
    const contentContainer = document.createElement("div");

    const title = document.createElement("h2");
    title.textContent = post.title || "Untitled";
    title.className = "text-2xl mt-0 mb-2.5 text-primary-text font-bold";
    contentContainer.appendChild(title);

    const body = document.createElement("p");
    body.textContent = post.body || "";
    body.className = "text-gray-600 leading-relaxed mb-4 break-words mt-0";
    contentContainer.appendChild(body);

    if (post.media && post.media.url) {
      const mediaImg = document.createElement("img");
      mediaImg.src = post.media.url;
      mediaImg.alt = post.media.alt || "Post image";
      mediaImg.className =
        "w-full h-full object-cover max-h-[350px] rounded-2xl";

      mediaImg.onerror = function () {
        this.style.display = "none";
      };

      contentContainer.appendChild(mediaImg);
    }

    return contentContainer;
  }

  open(post) {
    if (!post || !this.overlayBody) return;

    this.overlayBody.innerHTML = "";

    const authorSection = this.createAuthorSection(post.author);
    this.overlayBody.appendChild(authorSection);

    const postContent = this.createPostContent(post);
    this.overlayBody.appendChild(postContent);

    this.overlay.classList.remove("hidden");
  }

  close() {
    if (this.overlay) {
      this.overlay.classList.add("hidden");
    }
  }
}
