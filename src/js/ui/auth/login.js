import { loginUser } from "../../api/auth/login.js";
import { addToLocalStorage } from "../../utilities/localStorage.js";
import { navigate } from "../../router/index.js";
import { showMessage } from "../../utilities/showMessage.js";

export async function onLoginFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formFields = Object.fromEntries(formData);

  try {
    const json = await loginUser(formFields);
    const accessToken = json.data.accessToken;

    addToLocalStorage("accessToken", accessToken);
    localStorage.setItem("loggedIn", "true");
    addToLocalStorage("user", json.data);

    showMessage("Login successful!", "success");


    setTimeout(() => {
      navigate("/post/");
      import("../../ui/global/navBar.js").then((module) => {
        module.initializeNavigation();
      });
    }, 1000);
  } catch (error) {
    console.error("login failed", error);
    showMessage("Login failed. Please check your credentials and try again.", "error");
  }
}
