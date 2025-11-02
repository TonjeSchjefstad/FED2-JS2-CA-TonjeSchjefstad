import { onLoginFormSubmit } from "../../ui/auth/login.js";

export default function loginView(navigate) {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section class="flex flex-col md:flex-row md:h-screen md:absolute md:-top-24 md:left-0 md:right-0 md:z-10">
      <section class="flex flex-col justify-center gap-5 mx-10 my-5 mb-24 md:w-1/2 md:px-24 md:py-5">
        <h1 class="text-4xl font-bold mb-2.5 text-primary-text md:text-5xl">Login</h1>
        <form name="login" id="login-form" class="flex flex-col gap-5">
          <div class="flex flex-col gap-1">
            <label for="email" class="text-primary-text">Email</label>
            <input 
              id="email" 
              type="email" 
              placeholder="example@stud.noroff.com" 
              name="email" 
              required 
              class="w-auto p-4 bg-card border border-primary-text rounded-xl"
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
              class="w-auto p-4 bg-card border border-primary-text rounded-xl"
            />
          </div>
          <button 
            type="submit" 
            class="w-full px-6 py-3 bg-button text-white font-semibold rounded-lg hover:bg-button-hover active:bg-button-active transition-colors" 
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
        style="background-image: url('/public/images/background.webp');"
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
