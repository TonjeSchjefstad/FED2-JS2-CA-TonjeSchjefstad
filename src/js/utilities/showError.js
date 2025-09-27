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
    <div class="error-message">
      <h2>${title}</h2>
      <p>${message}</p>
      <div class="error-actions">
        ${showReloadButton ? `<button id="try-again-btn" class="primary-button">Try Again</button>` : ""}
        ${showBackButton ? `<button id="back-btn" class="secondary-button">Back</button>` : ""}
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