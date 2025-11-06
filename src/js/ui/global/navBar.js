import { onLogout } from "../auth/logout.js";
import { navigate } from "../../router/index.js";

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
  return `
    <a href="${item.href}" class="nav-item flex flex-col items-center no-underline text-primary-text transition-all duration-200 py-2 px-4 rounded-xl min-w-[60px] hover:bg-button-hover hover:text-secondary-text">
      <svg class="w-6 h-6 mb-1 stroke-current fill-none" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${item.icon}
      </svg>
      <span class="text-xs mt-1">${item.label}</span>
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
    <header class="flex justify-between items-center fixed top-0 left-0 right-0 bg-white p-2.5 z-[1001]">
      <div class="fixed top-5 left-5 z-[1001]">
        <span class="relative font-logo text-3xl font-bold p-2.5 -top-2.5 z-10 text-button-hover md:p-5 md:top-2.5">${navigationData.logo.text}</span>
      </div>

      <div class="ml-auto">
        <button class="flex items-center relative bg-button text-white py-2.5 px-8 rounded-lg ml-auto mr-4 z-[9999] cursor-pointer shadow-md font-semibold text-base border-none transition-colors duration-300 hover:bg-button-hover" id="logout-button">
          <span>${navigationData.logout.label}</span>
        </button>
      </div>

      <nav class="hidden md:block md:fixed md:top-0 md:left-0 md:right-0 md:bg-primary-bg md:py-3 md:z-10">
        <div class="flex justify-around items-center max-w-[500px] mx-auto px-5">
          ${topNavItems}
        </div>
      </nav>

      <nav class="block fixed bottom-0 left-0 right-0 bg-card border-t border-gray-300 shadow-[0_-2px_6px_rgba(0,0,0,0.1)] z-[1000] pt-2 pb-5 md:hidden">
        <div class="flex justify-around items-center max-w-[500px] mx-auto px-5">
          ${bottomNavItems}
        </div>
      </nav>
    </header>
  `;
}

export function initializeNavigation() {
  const currentPath = location.hash.slice(1) || "/";

  const authenticatedPages = [
    "/post/",
    "/post/create/",
    "/post/edit/",
    "/profile/",
    "/profile/edit/",
  ];
  const shouldShowNav = authenticatedPages.includes(currentPath);

  if (!shouldShowNav) {
    const mainElement = document.getElementById("app");
    if (mainElement) {
      mainElement.classList.remove("top-20");
    }
    return;
  }

  const loggedIn = localStorage.getItem("loggedIn") === "true";
  if (!loggedIn) {
    const mainElement = document.getElementById("app");
    if (mainElement) {
      mainElement.classList.remove("top-20");
    }
    return;
  }

  const mainElement = document.getElementById("app");
  if (mainElement) {
    mainElement.classList.add("top-20");
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
      navigate(targetRoute);
    });
  });
}
