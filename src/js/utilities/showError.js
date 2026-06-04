import { navigate } from "../router/index.js";

export function showError(message, options = {}) {
  const {
    containerSelector = "main",
    title = "Something went wrong",
    showBackButton = true,
    showReloadButton = true,
    backRoute = "/post",
  } = options;

  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = `
    <div class="max-w-lg mx-auto mt-12 p-8 text-center bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-red-600 mb-4">${title}</h2>
      <p class="text-gray-700 mb-6">${message}</p>
      <div class="flex justify-center gap-4">
        ${
          showReloadButton
            ? `<button id="try-again-btn" class="px-20 py-4 bg-button text-secondary-text font-semibold rounded-xl shadow-md border-none cursor-pointer transition-colors duration-300 hover:bg-button-hovered">Try Again</button>`
            : ""
        }
        ${
          showBackButton
            ? `<button id="back-btn" class="px-20 py-4 bg-white border border-button text-button font-semibold rounded-xl shadow-md cursor-pointer transition-colors duration-300 hover:bg-button hover:text-secondary-text">Back</button>`
            : ""
        }
      </div>
    </div>
  `;

  if (showReloadButton) {
    document.getElementById("try-again-btn")?.addEventListener("click", () => {
      window.location.reload();
    });
  }

  if (showBackButton) {
    document.getElementById("back-btn")?.addEventListener("click", () => {
      navigate(backRoute);
    });
  }
}
