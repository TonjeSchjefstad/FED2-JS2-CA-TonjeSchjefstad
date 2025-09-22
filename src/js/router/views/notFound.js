export default function notFoundView(navigate) {
  const app = document.getElementById("app");

  app.innerHTML = `
  <section class="not-found-section">
    <div class="not-found-container">
      <h1 class="not-found-title">404</h1>
      <h2 class="not-found-subtitle">Page Not Found</h2>
      <p class="not-found-message">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <div class="not-found-actions">
        <button class="primary-button" id="go-home">Go Home</button>
        <button class="secondary-button" id="go-back">Go Back</button>
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