import { registerUser } from "../../api/auth/register.js";
import { navigate } from "../../router/index.js";
import { showMessage } from "../../utilities/showMessage.js";

export async function onRegisterFormSubmit(event) {

  event.preventDefault();

  const formData = new FormData(event.target);
  const formFields = Object.fromEntries(formData);

  try {
    await registerUser(formFields);
    showMessage("Registration successful! Redirecting to login...");
    setTimeout(() => {
      navigate("/auth/login");
    }, 1000);
  } catch (error) {
    console.error("register failed", error);
    showMessage("Registration failed. Please try again.");
  }
}