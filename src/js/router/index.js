

export default async function router(pathname = window.location.pathname) {
  
  pathname = pathname.replace(/\/+$/, "") + "/";

  const routes = {
    "/": () => import("./views/home.js"),
    "/index.html": () => import("./views/home.js"),
    "/auth/login/": () => import("./views/login.js"),
    "/auth/register/": () => import("./views/register.js"),
    "/post/": () => import("./views/post.js"),
    "/post/edit/": () => import("./views/postEdit.js"),
    "/post/create/": () => import("./views/postCreate.js"),
    "/profile/": () => import("./views/profile.js"),
    "/profile/edit/": () => import("./views/profileEdit.js"),
  };


  const load = routes[pathname] || (() => import("./views/notFound.js"));

  try {
    const module = await load();
    if (typeof module.default === "function") {
      module.default(navigate);
    } else {
      console.error("View module does not export a default function:", module);
    }
  } catch (err) {
    console.error("Error loading view:", err);
  }
}

export function navigate(path) {
  history.pushState({}, "", path);
  const url = new URL(path, window.location.origin);
  router(url.pathname);
}

window.addEventListener("popstate", () => {
  router(window.location.pathname);

});
