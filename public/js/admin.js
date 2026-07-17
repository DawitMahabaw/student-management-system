// Client-side only guard — not real security, just UX.
const role = localStorage.getItem("sms_role");
if (role !== "admin") {
  window.location.href = "/login.html";
}
document.getElementById("userEmail").textContent =
  localStorage.getItem("sms_email") || "";

const tableBody = document.getElementById("studentTableBody");
const emptyState = document.getElementById("emptyState");
const studentModalEl = document.getElementById("studentModal");
const studentModal = new bootstrap.Modal(studentModalEl);
const form = document.getElementById("studentForm");
const modalTitle = document.getElementById("modalTitle");

function loadStudents() {
  fetch("/api/students")
    .then((res) => res.json())
    .then((data) => {
      tableBody.innerHTML = "";
      if (!data.data.length) {
        emptyState.classList.remove("d-none");
        return;
      }
      emptyState.classList.add("d-none");

      data.data.forEach((s) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${s.full_name}</td>
          <td>${s.email}</td>
          <td>${s.course || "-"}</td>
          <td>${s.age || "-"}</td>
          <td class="text-end">
            <button class="action-btn edit-btn" data-id="${s.id}"><i class="bi bi-pencil"></i></button>
            <button class="action-btn delete delete-btn" data-id="${s.id}"><i class="bi bi-trash"></i></button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    });
}

document.getElementById("addBtn").addEventListener("click", () => {
  form.reset();
  document.getElementById("studentId").value = "";
  modalTitle.textContent = "Add Student";
});

tableBody.addEventListener("click", (e) => {
  const editBtn = e.target.closest(".edit-btn");
  const deleteBtn = e.target.closest(".delete-btn");

  if (editBtn) {
    const id = editBtn.dataset.id;
    fetch(`/api/students/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const s = data.data;
        document.getElementById("studentId").value = s.id;
        document.getElementById("fullName").value = s.full_name;
        document.getElementById("studentEmail").value = s.email;
        document.getElementById("course").value = s.course || "";
        document.getElementById("age").value = s.age || "";
        modalTitle.textContent = "Edit Student";
        studentModal.show();
      });
  }

  if (deleteBtn) {
    const id = deleteBtn.dataset.id;
    if (confirm("Delete this student?")) {
      fetch(`/api/students/${id}`, { method: "DELETE" })
        .then((res) => res.json())
        .then(() => loadStudents());
    }
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = document.getElementById("studentId").value;
  const payload = {
    full_name: document.getElementById("fullName").value,
    email: document.getElementById("studentEmail").value,
    course: document.getElementById("course").value,
    age: document.getElementById("age").value,
  };

  const request = id
    ? fetch(`/api/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    : fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

  request
    .then((res) => res.json())
    .then(() => {
      studentModal.hide();
      loadStudents();
    });
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "/login.html";
});

loadStudents();
