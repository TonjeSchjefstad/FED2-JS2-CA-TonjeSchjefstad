export function showMessage(message, type = "info", duration = 3000) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = message;

  document.body.appendChild(messageDiv);
  
  setTimeout(() => {
    messageDiv.style.animation = "slideOut 0.3s ease-out";
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