const loginForm = document.querySelector("#loginForm");
const loginUser = document.querySelector("#loginUser");


async function submitHandler(e) {
  e.preventDefault();
  console.log(loginUser.value);
  try {
    await fetch(`/api/login?username=${loginUser.value}`);

    window.location.href = "/";
  } catch (err) {
    console.log(err);
  }
}


loginForm.addEventListener("submit", submitHandler);

