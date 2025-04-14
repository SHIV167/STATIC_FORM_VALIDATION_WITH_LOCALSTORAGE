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
    // Store user data in localStorage
    const userData = {
      name: name,
      email: email,
      password: password, // Note: Storing passwords in localStorage is not secure for production
      registeredAt: new Date().toISOString(),
    };

    // Check if users array exists in localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Add new user
    users.push(userData);

    // Save back to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Also store current user for session management
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        name: name,
        email: email,
      })
    );

    alert("Registration successful!");

    // Redirect to login page
    window.location.href = "login.html";
  }
}
