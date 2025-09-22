import router from "./router/index.js";
import { initializeNavigation } from "./ui/global/navBar.js";

await router(window.location.pathname);

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeNavigation);
} else {
    initializeNavigation();
}