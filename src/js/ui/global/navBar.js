import { onLogout } from "../auth/logout.js";

const navigationData = {
  logo: {
    text: "Pulse",
  },

  logout: {
    label: "Logout",
    icon: `<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16,17 21,12 16,7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>`,
  },

  desktopItems: [
    {
      href: "/post/",
      label: "Feed",
      icon: `<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9,22 9,12 15,12 15,22" />`,
      isCreate: false,
    },

    {
      href: "/post/create/",
      label: "Create",
      icon: `<circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />`,
      isCreate: true,
    },

    {
      href: "/profile/",
      label: "Profile",
      icon: `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />`,
      isCreate: false,
    },
  ],

  mobileItems: [
    {
      href: "/post/",
      label: "Feed",
      icon: `<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9,22 9,12 15,12 15,22" />`,
      isCreate: false,
    },

    {
      href: "/post/create/",
      label: "Create",
      icon: `<circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />`,
      isCreate: true,
    },

    {
      href: "/profile/",
      label: "Profile",
      icon: `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />`,
      isCreate: false,
    },
  ],
};

export function createNavItem(item) {
  const createClass = item.isCreate ? " create" : "";
  return `
    <a href="${item.href}" class="nav-item${createClass}">
      <svg class="nav-icon" viewBox="0 0 24 24">
        ${item.icon}
      </svg>
      <span class="nav-label">${item.label}</span>
    </a>
  `;
}

export function createNavigation() {
  const topNavItems = navigationData.desktopItems
    .map((item) => createNavItem(item))
    .join("");

  const bottomNavItems = navigationData.mobileItems
    .map((item) => createNavItem(item))
    .join("");

  return `
    <header>
      <div class="logo-container">
        <a href="${"#"}" class="logo-name">${navigationData.logo.text}</a>
      </div>

      <div class="logout-container">
        <button class="logout-button" id="logout-button">

          <span class="logout-label">${navigationData.logout.label}</span>
        </button>
      </div>

      <nav class="top-nav">
        <div class="nav-container">
          ${topNavItems}
        </div>
      </nav>

      <nav class="bottom-nav">
        <div class="nav-container">
          ${bottomNavItems}
        </div>
      </nav>
    </header>
     `;
}

export function initializeNavigation() {
  const currentPath = window.location.pathname;

  const authenticatedPages = [
    "/post/",
    "/post/create/",
    "/post/edit/",
    "/profile/",
    "/profile/edit.html/",
  ];
  const shouldShowNav = authenticatedPages.includes(currentPath);

  if (!shouldShowNav) {
    return;
  }

  const loggedIn = localStorage.getItem("loggedIn") === "true";
  if (!loggedIn) {
    return;
  }

  const navHTML = createNavigation();
  const existingHeader = document.querySelector("header");

  if (existingHeader) {
    existingHeader.outerHTML = navHTML;
  } else {
    document.body.insertAdjacentHTML("afterbegin", navHTML);
  }

  const logoutBtn = document.getElementById("logout-button");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();

      onLogout();

      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
    });
  }

  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      const targetRoute = item.getAttribute("href");

      window.history.pushState({}, "", targetRoute);

      import("../../router/index.js").then((module) => {
        module.default(targetRoute);
      });
    });
  });
}
