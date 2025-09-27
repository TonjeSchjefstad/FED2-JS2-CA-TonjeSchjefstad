import router from "./router/index.js";
import { initializeNavigation } from "./ui/global/navBar.js";

if (!location.hash) {
  location.hash = "/";
}

document.addEventListener("DOMContentLoaded", () => {
  const initialPath = location.hash.slice(1) || "/";
  router(initialPath);
  initializeNavigation();
});
