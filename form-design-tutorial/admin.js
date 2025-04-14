// admin.js
document.addEventListener("DOMContentLoaded", function () {
  const usersList = document.getElementById("users-list");
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.length === 0) {
    usersList.innerHTML = "<p>No registered users found.</p>";
  } else {
    let html = "<ul>";
    users.forEach((user, index) => {
      html += `<li>User ${index + 1}: ${user.firstname} (${user.email})</li>`;
    });
    html += "</ul>";
    usersList.innerHTML = html;
  }
});

// Add this function to your code
function checkUserDetails() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    console.log("Current user:", currentUser);
    // You could also display this information in a modal or on the page
    return currentUser;
  } else {
    console.log("No user is currently logged in");
    return null;
  }
}

checkUserDetails();

// Check all registered users
function getAllUsers() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  console.log("All registered users:", users);
  return users;
}
getAllUsers();
