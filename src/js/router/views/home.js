export default function homeView(routerNavigate) {
    const app = document.getElementById("app");
    app.textContent = ""; 

    const section = document.createElement("section");
    section.className = "landing-main";

    const container = document.createElement("div");
    container.className = "welcome-container";

    const welcomeSection = document.createElement("section");
    welcomeSection.className = "welcome-section";

    const h1Small = document.createElement("h1");
    h1Small.className = "h1-welcome-small";
    h1Small.textContent = "Welcome to";

    const h1Big = document.createElement("h1");
    h1Big.className = "h1-welcome-big";
    h1Big.textContent = "Pulse";

    const p = document.createElement("p");
    p.className = "welcome-p";
    p.textContent = "Share the moments you never want to forget with the friends who matter most.";

    const buttonSection = document.createElement("div");
    buttonSection.className = "button-section";

    const loginButton = document.createElement("button");
    loginButton.className = "primary-button";
    loginButton.textContent = "Login";
    loginButton.addEventListener("click", () => routerNavigate("/auth/login"));

    const signUpButton = document.createElement("button");
    signUpButton.className = "secondary-button";
    signUpButton.textContent = "Sign Up";
    signUpButton.addEventListener("click", () => routerNavigate("/auth/register"));

    buttonSection.append(loginButton, signUpButton);
    welcomeSection.append(h1Small, h1Big, p, buttonSection);

    const sloganSection = document.createElement("section");
    sloganSection.className = "slogan-section";
    sloganSection.innerHTML = `
        <h2 class="slogan-thin">Feel the</h2>
        <h2 class="slogan-thick">moment</h2>
    `;

    container.append(welcomeSection, sloganSection);
    section.appendChild(container);
    app.appendChild(section);
}