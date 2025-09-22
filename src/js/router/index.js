import { initializeNavigation } from "../ui/global/navBar.js";

export default async function router(pathname = location.hash.slice(1) || "/") {
  const cleanPath = pathname.split("?")[0].replace(/\/+$/, "") + "/";

  const routes = {
    "/": () => import("./views/home.js"),
    "/auth/login/": () => import("./views/login.js"),
    "/auth/register/": () => import("./views/register.js"),
    "/post/": () => import("./views/post.js"),
    "/post/edit/": () => import("./views/postEdit.js"),
    "/post/create/": () => import("./views/postCreate.js"),
    "/profile/": () => import("./views/profile.js"),
    "/profile/edit/": () => import("./views/profileEdit.js"),
  };

  const load = routes[cleanPath] || (() => import("./views/notFound.js"));

  try {
    const module = await load();
    if (typeof module.default === "function") {
      module.default(navigate);
      initializeNavigation();
    } else {
      console.error("View module does not export a default function:", module);
    }
  } catch (err) {
    console.error("Error loading view:", err);
  }
}

export function navigate(path) {
  location.hash = path;
}

window.addEventListener("hashchange", () => {
  router(location.hash.slice(1));
});
