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
      <div id="post-overlay" class="hidden">
        <div class="overlay-content">
          <span id="overlay-close" class="close-button">&times;</span>
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
    overlayAuthor.classList.add("overlay-author");

    if (authorAvatar) {
      const avatarLink = document.createElement("a");
      avatarLink.href = profileUrl;

      const avatarImg = document.createElement("img");
      avatarImg.src = authorAvatar;
      avatarImg.alt = authorName + " avatar";
      avatarImg.classList.add("overlay-author-avatar");

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
    nameLink.classList.add("overlay-author-name");

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
    title.classList.add("overlay-h2");
    contentContainer.appendChild(title);

    const body = document.createElement("p");
    body.textContent = post.body || "";
    contentContainer.appendChild(body);

    if (post.media && post.media.url) {
      const mediaImg = document.createElement("img");
      mediaImg.src = post.media.url;
      mediaImg.alt = post.media.alt || "Post image";
      mediaImg.classList.add("post-media");

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
