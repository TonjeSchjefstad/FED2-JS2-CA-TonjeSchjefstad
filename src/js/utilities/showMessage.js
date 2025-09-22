export function showMessage(message, type = "info", duration = 3000) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = message;
  
  messageDiv.style.cssText = `
    position: fixed; 
    top: 20px; 
    right: 20px; 
    padding: 1rem 2rem;
    border-radius: 8px; 
    color: white; 
    z-index: 10000; 
    font-weight: 500;
    background: ${getBackgroundColor(type)};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: slideIn 0.3s ease-out;
  `;

  document.body.appendChild(messageDiv);
  
  setTimeout(() => {
    messageDiv.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => messageDiv.remove(), 300);
  }, duration);
}

function getBackgroundColor(type) {
  switch (type) {
    case "success":
      return "#10b981";
    case "error":
      return "#ef4444";
    case "warning":
      return "#f59e0b";
    default:
      return "#3b82f6";
  }
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