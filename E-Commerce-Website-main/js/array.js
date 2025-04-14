//alert("Form Initiated");
const loginForm = document.getElementById("auth_form");
const submitButton = document.getElementById("form_submit");

function validateForm(e) {
  alert("Form Initiated");
  const errors = errorValidation("error", "error_message");
  //console.log(e.target);
  e.preventDefault();

  // If there are no errors, submit the form
  if (errors.length === 0) {
    //loginForm.submit();
    console.log("Form validated successfully!");
  } else {
    console.log("Form has errors:", errors);
  }
}

submitButton.addEventListener("click", validateForm);

function errorValidation(errorClass, errorMessageClass) {
  const name = document.getElementById("form-name").value;
  const email = document.getElementById("form-email").value;
  const password = document.getElementById("form-password").value;

  alert("Error Initiated");
  const errors = [];

  // Validate name
  if (name.trim() === "") {
    errors.push({
      field: "name",
      message: "Name is required",
    });
    highlightError("form-name", errorClass);
  } else if (name.length < 2) {
    errors.push({
      field: "name",
      message: "Name must be at least 2 characters",
    });
    highlightError("form-name", errorClass);
  }

  // Validate email
  if (email.trim() === "") {
    errors.push({
      field: "email",
      message: "Email is required",
    });
    highlightError("form-email", errorClass);
  } else if (!isValidEmail(email)) {
    errors.push({
      field: "email",
      message: "Please enter a valid email address",
    });
    highlightError("form-email", errorClass);
  }

  // Validate password
  if (password.trim() === "") {
    errors.push({
      field: "password",
      message: "Password is required",
    });
    highlightError("form-password", errorClass);
  } else if (password.length < 8) {
    errors.push({
      field: "password",
      message: "Password must be at least 8 characters",
    });
    highlightError("form-password", errorClass);
  }

  // Display errors if any
  if (errors.length > 0) {
    displayErrors(errors, errorMessageClass);
  } else {
    // Clear any previous error messages
    clearErrors(errorMessageClass);
  }

  return errors;
}

// Helper function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to highlight error field
function highlightError(fieldId, errorClass) {
  const field = document.getElementById(fieldId);
  field.classList.add(errorClass);
}

// Function to display error messages
function displayErrors(errorsArray, errorMessageClass) {
  // Clear previous errors
  clearErrors(errorMessageClass);

  // Create error message container if it doesn't exist
  let errorContainer = document.getElementById("error-container");
  if (!errorContainer) {
    errorContainer = document.createElement("div");
    errorContainer.id = "error-container";
    loginForm.prepend(errorContainer);
  }

  // Add each error message
  errorsArray.forEach((error) => {
    const errorElement = document.createElement("div");
    errorElement.classList.add(errorMessageClass);
    errorElement.textContent = error.message;
    errorContainer.appendChild(errorElement);
  });
}

// Function to clear error messages
function clearErrors(errorMessageClass) {
  const errorContainer = document.getElementById("error-container");
  if (errorContainer) {
    errorContainer.innerHTML = "";
  }

  // Remove error class from all form fields
  const formFields = loginForm.querySelectorAll("input");
  formFields.forEach((field) => {
    field.classList.remove("error");
  });
}
