export default function notFoundView(navigate) {
  const app = document.getElementById("app");

  app.innerHTML = `
      <section class="flex justify-center items-center min-h-screen text-center bg-gray-50">
      <div class="max-w-lg p-8 rounded-lg">
        <h1 class="text-9xl m-0 text-red-500 font-bold">404</h1>
        <h2 class="text-3xl my-2 text-primary-text font-semibold">Page Not Found</h2>
        <p class="text-base mb-8 text-gray-600">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <div class="flex justify-center gap-4">
          <button 
            class="px-20 py-4 bg-button text-secondary-text font-semibold rounded-xl shadow-md border-none cursor-pointer transition-colors duration-300 hover:bg-button-hover" 
            id="go-home"
          >
            Go Home
          </button>
          <button 
            class="px-20 py-4 bg-white border border-button text-button font-semibold rounded-xl shadow-md cursor-pointer transition-colors duration-300 hover:bg-button hover:text-secondary-text" 
            id="go-back"
          >
            Go Back
          </button>
        </div>
      </div>
    </section>
`;

  const goHomeButton = document.getElementById("go-home");
  const goBackButton = document.getElementById("go-back");

  if (goHomeButton) {
    goHomeButton.addEventListener("click", () => {
      navigate("/");
    });
  }

  if (goBackButton) {
    goBackButton.addEventListener("click", () => {
      window.history.back();
    });
  }
}
