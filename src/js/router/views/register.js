import { onRegisterFormSubmit } from "../../ui/auth/register.js";

export default function registerView(navigate) { 
  const app = document.getElementById("app");

  app.innerHTML = `
    <section class="landing-main">
        <div class="register-container">
          <section class="register-section">
            <h1 class="h1-register">Register</h1>
            <form name="register" id="register-form">
              <div>
                <label for="name">Username</label>
                <input id="name" type="text" placeholder="Your username" name="name" required title="Please enter a username using only letters and numbers" />
              </div>

              <div>
                <label for="email">Email</label>
                <input id="email" type="email" placeholder="example@stud.noroff.com" name="email" required
                  title="Please enter a valid noroff.no or stud.noroff.no address" />
              </div>

              <div>
                <label for="password">Password</label>
                <input type="password" name="password" placeholder="Your password" id="password" required minlength="8" autocomplete="new-password" />
              </div>

              <button class="primary-button" id="register-button">Register</button>
              <a href="#/auth/login">
                <p class="register-p">Already have an account? <strong> Login! </strong></p>
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

  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", onRegisterFormSubmit); 
  }

  const loginLink = document.getElementById("login-link");
  if (loginLink) {
    loginLink.addEventListener("click", (e) => {
      e.preventDefault();
      import("../../router/index.js").then((module) => {
        module.default("/auth/login/");
      });
    });
  }
}