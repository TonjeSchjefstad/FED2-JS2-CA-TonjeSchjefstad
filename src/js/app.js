import router from "./router/index.js";
import { initializeNavigation } from "./ui/global/navBar.js";

document.addEventListener("DOMContentLoaded", () => {
  const initialPath = location.hash.slice(1) || "/";
  router(initialPath);
  initializeNavigation();
});
