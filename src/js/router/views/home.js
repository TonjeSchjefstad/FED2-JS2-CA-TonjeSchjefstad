export default function homeView(routerNavigate) {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section class="landing-main">
      <div class="welcome-container">
        <section class="welcome-section">
          <h1 class="h1-welcome-small">Welcome to</h1>
          <h1 class="h1-welcome-big">Pulse</h1>
          <p class="welcome-p">
            Share the moments you never want to forget with the friends who matter most.
          </p>
          <div class="button-section">
            <button id="login-button" class="primary-button">Login</button>
            <button id="signup-button" class="secondary-button">Sign Up</button>
          </div>
        </section>
        <section class="slogan-section">
          <h2 class="slogan-thin">Feel the</h2>
          <h2 class="slogan-thick">moment</h2>
        </section>
      </div>
    </section>
  `;

  document.getElementById("login-button")?.addEventListener("click", () => {
    routerNavigate("/auth/login");
  });

  document.getElementById("signup-button")?.addEventListener("click", () => {
    routerNavigate("/auth/register");
  });
}
