$(document).ready(function () {
  $("#loginBtn").click(function () {
    // Dummy login validation
    var username = $("#username").val()
    var password = $("#password").val()

    // Check if username and password match the dummy data
    if (username === "test" && password === "123") {
      // If successful, redirect to the main page
      window.location.href = "\homepage.html"
    } else {
      // If login fails, show an alert (you can customize this part)
      alert("Invalid username or password. Please try again.")
    }
  })
})
