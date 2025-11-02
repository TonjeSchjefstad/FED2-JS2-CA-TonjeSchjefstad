export default function homeView(routerNavigate) {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section class="flex flex-col md:flex-row md:h-screen md:absolute md:-top-24 md:left-0 md:right-0 md:z-10">
      <section class="flex flex-col items-center justify-center px-4 py-12 md:w-1/2 md:px-5">
        <div class="flex flex-col items-center">
          <h1 class="text-3xl font-bold text-primary-text mb-3 md:text-4xl">Welcome to</h1>
          <h1 class="text-6xl font-bold font-logo text-primary-text my-0 md:text-7xl">Pulse</h1>
          <p class="text-lg text-primary-text text-center my-8 mx-12 max-w-xs md:text-xl md:max-w-sm">
            Share the moments you never want to forget with the friends who matter most.
          </p>
          <div class="flex flex-col gap-5 mt-5 mb-24 w-full max-w-xs">
            <button 
              id="login-button" 
              class="w-full px-6 py-3 bg-button text-white font-semibold rounded-lg hover:bg-button-hover active:bg-button-active transition-colors"
            >
              Login
            </button>
            <button 
              id="signup-button" 
              class="w-full px-6 py-3 bg-white text-button font-semibold rounded-lg border-2 border-button hover:bg-button-hover hover:text-white transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
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

  document.getElementById("login-button")?.addEventListener("click", () => {
    routerNavigate("/auth/login");
  });

  document.getElementById("signup-button")?.addEventListener("click", () => {
    routerNavigate("/auth/register");
  });
}
