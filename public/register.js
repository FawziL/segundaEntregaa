const buttonLogin = document.querySelector("#Login")
const registerForm = document.querySelector("#registerForm")

function goToLogin() {
  console.log("Hola");
  window.location.href = "/login";

}
buttonLogin.addEventListener("click", goToLogin);


function submitHandler(e) {
  e.preventDefault();

}
registerForm.addEventListener("submit", submitHandler);
