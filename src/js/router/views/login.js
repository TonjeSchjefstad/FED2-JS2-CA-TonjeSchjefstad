import { onLoginFormSubmit } from "../../ui/auth/login.js";

export default function loginView(navigate) {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section class="landing-main">
      <div class="login-container">
        <section class="login-section">
          <h1 class="h1-login">Login</h1>
          <form name="login" id="login-form">
            <div>
              <label for="email">Email</label>
              <input id="email" type="email" placeholder="example@stud.noroff.com" name="email" required />
            </div>
            <div>
              <label for="password">Password</label>
              <input type="password" name="password" id="password" placeholder="your password" required />
            </div>
            <button type="submit" class="primary-button" id="login-button">Login</button>
            <a href="#/auth/register">
              <p class="login-p">Don't have an account? <strong> Sign Up! </strong></p>
            </a>
          </form>
        </section>
        <section class="slogan-section">
          <h2 class="slogan-thin">Feel the</h2>
          <h2 class="slogan-thick">moment</h2>
        </section>
      </div>
    </section>
  `;

  const form = document.forms.login;
  if (form) {
    form.addEventListener("submit", onLoginFormSubmit);
  } else {
    console.error("Login form not found! Check your HTML has name='login' or id='login-form'");
  }

  const registerLink = document.getElementById("register-link");
  if (registerLink) {
    registerLink.addEventListener("click", (e) => {
      e.preventDefault();
      import("../../router/index.js").then((module) => {
        module.default("/auth/register/");
      });
    });
  }
}

