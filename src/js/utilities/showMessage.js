/**
 * Displays a temporary message on the screen.
 * Creates a div element, sets its content and style based on the type of message.
 * @param {string} message - The message to display
 * @param {"success" | "error" | "warning" | "info"} [type="info"] - The type of message, which determines its styling.
 * @param {number} [duration=3000] - Duration before the message disappears.
 * @returns {void}
 */

export function showMessage(message, type = "info", duration = 3000) {
  const messageDiv = document.createElement("div");

  const typeClasses = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-amber-500",
    info: "bg-blue-500",
  };

  messageDiv.className = `fixed top-5 right-5 px-8 py-4 rounded-lg text-white z-[10000] font-medium shadow-lg transition-all duration-300 ${typeClasses[type]}`;
  messageDiv.textContent = message;

  messageDiv.style.opacity = "0";
  messageDiv.style.transform = "translateY(-10px)";

  document.body.appendChild(messageDiv);

  requestAnimationFrame(() => {
    messageDiv.style.opacity = "1";
    messageDiv.style.transform = "translateY(0)";
  });

  setTimeout(() => {
    messageDiv.style.opacity = "0";
    messageDiv.style.transform = "translateY(-10px)";
    setTimeout(() => messageDiv.remove(), 300);
  }, duration);
}

export function showSuccess(message) {
  showMessage(message, "success");
}

export function showError(message) {
  showMessage(message, "error");
}

export function showWarning(message) {
  showMessage(message, "warning");
}

export function showInfo(message) {
  showMessage(message, "info");
}
