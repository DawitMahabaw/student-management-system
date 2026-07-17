document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("errorMsg");
  errorMsg.textContent = "";

  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) {
        errorMsg.textContent = data.message || "Login failed.";
        return;
      }

      localStorage.setItem("sms_email", data.email);
      localStorage.setItem("sms_role", data.role);

      window.location.href =
        data.role === "admin" ? "/admin.html" : "/student.html";
    })
    .catch(() => {
      errorMsg.textContent = "Something went wrong. Please try again.";
    });
});
