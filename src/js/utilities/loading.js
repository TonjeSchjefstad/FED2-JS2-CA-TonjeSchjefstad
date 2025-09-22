export function showLoading(selector, message = "Loading...") {
  const element = document.querySelector(selector);
  if (element) {
    element.innerHTML = `
      <div class="loading">
        <div class="loading-spinner"></div>
        <p>${message}</p>
      </div>
    `;
  }
}

