import router from "./js/router/index.js";
import { initializeNavigation } from "./js/ui/global/navigation.js";

await router(window.location.pathname);

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        initializeNavigation();
    });

} else {
    initializeNavigation();
}