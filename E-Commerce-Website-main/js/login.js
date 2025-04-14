const loginForm = document.getElementById("auth_form");
const submitButton = document.getElementById("form_submit");

submitButton.addEventListener("click", validateForm);

function validateForm(e) {
  e.preventDefault();
  console.log("Form Initiated");
  errorValidation();
}

function errorValidation() {
  const name = document.getElementById("form-name").value.trim();
  const email = document.getElementById("form-email").value.trim();
  const password = document.getElementById("form-password").value.trim();

  let isValid = true;

  // Name validation
  if (name === "") {
    document.getElementById("name-error").textContent = "Name is required";
    isValid = false;
  } else {
    document.getElementById("name-error").textContent = "";
  }

  // Email validation
  if (email === "") {
    document.getElementById("email-error").textContent = "Email is required";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    document.getElementById("email-error").textContent = "Invalid email format";
    isValid = false;
  } else {
    document.getElementById("email-error").textContent = "";
  }

  // Password validation
  if (password === "") {
    document.getElementById("password-error").textContent =
      "Password is required";
    isValid = false;
  } else if (password.length < 6) {
    document.getElementById("password-error").textContent =
      "Password must be at least 6 characters";
    isValid = false;
  } else {
    document.getElementById("password-error").textContent = "";
  }

  if (isValid) {
    alert("Form is valid and ready to be submitted!");
    loginForm.submit(); // you can remove this line if you want to handle submission via AJAX
  }
}
