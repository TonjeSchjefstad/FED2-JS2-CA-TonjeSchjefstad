export function showLoading(selector, message = "Loading...") {
  const element = document.querySelector(selector);
  if (element) {
    element.innerHTML = `
      <div class="text-center p-8 text-gray-600">
        <div class="border-4 border-gray-200 border-t-button rounded-full w-8 h-8 animate-spin mx-auto mb-4"></div>
        <p class="m-0 text-sm">${message}</p>
      </div>
    `;
  }
}
