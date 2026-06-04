import { onLoginFormSubmit } from "../../ui/auth/login.js";

export default function loginView(navigate) {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section class="flex flex-col md:flex-row md:min-h-screen w-full">
      <section class="flex flex-col justify-center gap-5 mx-10 pt-40 md:pt-40 mb-24 md:w-1/2 md:px-24 md:py-5">
      <a href="#/" 
        class="text-primary-text text-sm hover:underline flex items-center gap-1 w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </a>
        <h1 class="text-4xl font-heading font-bold mb-2.5 text-primary-text md:text-5xl">Login</h1>
        <form name="login" id="login-form" class="flex flex-col gap-5">
          <div class="flex flex-col gap-1">
            <label for="email" class="text-primary-text">Email</label>
            <input 
              id="email" 
              type="email" 
              placeholder="example@stud.noroff.com" 
              name="email" 
              required 
              class=" p-3 bg-card border border-primary-text rounded-xl max-w-80"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="password" class="text-primary-text">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              placeholder="your password" 
              required 
              class=" p-3 bg-card border border-primary-text rounded-xl max-w-80"
            />
          </div>
          <button 
            type="submit" 
            class=" max-w-80 px-6 py-3 bg-button text-white font-semibold rounded-lg hover:bg-button-hovered active:bg-button-active transition-colors" 
            id="login-button"
          >
            Login
          </button>
          <a href="#/auth/register">
            <p class="m-0 text-primary-text">Don't have an account? <strong>Sign Up!</strong></p>
          </a>
        </form>
      </section>

      <section 
        class="h-80 p-5 text-center flex flex-col justify-center items-center bg-cover bg-center md:w-1/2 md:h-screen"
        style="background-image: url('/images/background.webp');"
      >
        <h2 class="text-3xl font-extralight text-slogan tracking-widest md:text-6xl md:mt-2">Feel the</h2>
        <h2 class="text-3xl font-bold text-slogan tracking-widest  md:text-6xl ">moment</h2>
      </section>
    </section>
  `;

  const form = document.forms.login;
  if (form) {
    form.addEventListener("submit", onLoginFormSubmit);
  } else {
    console.error(
      "Login form not found! Check your HTML has name='login' or id='login-form'"
    );
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
