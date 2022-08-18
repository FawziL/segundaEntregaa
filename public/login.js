const loginForm = document.querySelector("#loginForm");
const loginUser = document.querySelector("#loginUser");
const buttonRegister = document.querySelector("#Register")
const loginPassword = document.querySelector("#loginPasswordUser")


async function submitHandler(e) {
  e.preventDefault();
  console.log(loginPassword.value)
  console.log(loginUser.value);
  try {
    await fetch(`/api/login?username=${loginUser.value}`);

    window.location.href = "/";
  } catch (err) {
    console.log(err);
  }
}
loginForm.addEventListener("submit", submitHandler);

function goToRegister() {
  console.log(loginUser.value);
  window.location.href = "/register";

}
buttonRegister.addEventListener("click", goToRegister);




