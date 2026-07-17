const role = localStorage.getItem("sms_role");
const email = localStorage.getItem("sms_email");
if (role !== "student") {
  window.location.href = "/login.html";
}
document.getElementById("userEmail").textContent = email || "";

const infoContainer = document.getElementById("infoContainer");

fetch(`/api/students/email/${encodeURIComponent(email)}`)
  .then((res) => res.json())
  .then((data) => {
    if (!data.success) {
      infoContainer.innerHTML = `<p class="text-muted">${data.message}</p>`;
      return;
    }
    const s = data.data;
    infoContainer.innerHTML = `
      <div class="info-row"><span class="info-label">Full Name</span><span class="info-value">${s.full_name}</span></div>
      <div class="info-row"><span class="info-label">Email</span><span class="info-value">${s.email}</span></div>
      <div class="info-row"><span class="info-label">Course</span><span class="info-value">${s.course || "-"}</span></div>
      <div class="info-row"><span class="info-label">Age</span><span class="info-value">${s.age || "-"}</span></div>
    `;
  });

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "/login.html";
});
