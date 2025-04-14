const form = document.getElementById("form");
const firstname_input = document.getElementById("firstname-input");
const email_input = document.getElementById("email-input");
const password_input = document.getElementById("password-input");
const repeat_password_input = document.getElementById("repeat-password-input");
const error_message = document.getElementById("error-message");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Always prevent default submission

  let errors = [];

  if (firstname_input && firstname_input.value !== undefined) {
    // If we have a firstname input with a value, then we are in the signup
    errors = getSignupFormErrors(
      firstname_input.value,
      email_input.value,
      password_input.value,
      repeat_password_input.value
    );
  } else {
    // If we don't have a firstname input then we are in the login
    errors = getLoginFormErrors(email_input.value, password_input.value);
  }

  if (errors.length > 0) {
    // If there are any errors
    error_message.innerText = errors.join(". ");
  } else {
    if (firstname_input && firstname_input.value !== undefined) {
      // SIGNUP FORM LOGIC
      // Save user details to localStorage upon successful registration
      const userData = {
        firstname: firstname_input.value,
        email: email_input.value,
        password: password_input.value,
      };

      // Store the current user data
      localStorage.setItem("currentUser", JSON.stringify(userData));

      // Store in users array (for keeping track of all registered users)
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      existingUsers.push(userData);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      error_message.innerText = "Thanks for Registration";
      alert("Thanks for Registration");
      window.location.href = "login.html";
    } else {
      // LOGIN FORM LOGIC
      const users = JSON.parse(localStorage.getItem("users")) || [];
      console.log("Retrieved users from localStorage:", users);

      const matchedUser = users.find(
        (user) =>
          user.email === email_input.value &&
          user.password === password_input.value
      );

      console.log("Email input:", email_input.value);
      console.log("Password input:", password_input.value);
      console.log("Matched user:", matchedUser);

      if (matchedUser) {
        // Login successful
        localStorage.setItem("currentUser", JSON.stringify(matchedUser));
        error_message.innerText = ""; // Clear any error messages
        alert("Login successful!");
        window.location.href = "dashboard.html"; // Make sure this file exists
        return; // Add this to prevent further execution
      } else {
        // Login failed
        error_message.innerText = "Invalid email or password";
      }
    }
  }
});

function getSignupFormErrors(firstname, email, password, repeatPassword) {
  let errors = [];

  if (firstname === "" || firstname == null) {
    errors.push("Firstname is required");
    firstname_input.parentElement.classList.add("incorrect");
  }
  if (email === "" || email == null) {
    errors.push("Email is required");
    email_input.parentElement.classList.add("incorrect");
  } else {
    // Check if email is already registered
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (existingUsers.some((user) => user.email === email)) {
      errors.push("Email already registered");
      email_input.parentElement.classList.add("incorrect");
    }
  }
  if (password === "" || password == null) {
    errors.push("Password is required");
    password_input.parentElement.classList.add("incorrect");
  }
  if (password.length < 8) {
    errors.push("Password must have at least 8 characters");
    password_input.parentElement.classList.add("incorrect");
  }
  if (password !== repeatPassword) {
    errors.push("Password does not match repeated password");
    password_input.parentElement.classList.add("incorrect");
    repeat_password_input.parentElement.classList.add("incorrect");
  }

  return errors;
}

function getLoginFormErrors(email, password) {
  let errors = [];

  if (email === "" || email == null) {
    errors.push("Email is required");
    email_input.parentElement.classList.add("incorrect");
  }
  if (password === "" || password == null) {
    errors.push("Password is required");
    password_input.parentElement.classList.add("incorrect");
  }

  return errors;
}

const allInputs = [
  firstname_input,
  email_input,
  password_input,
  repeat_password_input,
].filter((input) => input != null);

allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.parentElement.classList.contains("incorrect")) {
      input.parentElement.classList.remove("incorrect");
      error_message.innerText = "";
    }
  });
});

function testLoginCredentials(email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  console.log("All users:", users);

  const foundUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (foundUser) {
    console.log("Credentials valid for user:", foundUser);
    return true;
  } else {
    console.log("No matching user found for these credentials");
    return false;
  }
}
