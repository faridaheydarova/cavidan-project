async function loadLayout() {
  document.getElementById("siteHeader").innerHTML =
    await (await fetch("header.html")).text();

  document.getElementById("siteFooter").innerHTML =
    await (await fetch("footer.html")).text();
  updateAuthButton();
}

loadLayout();

function updateAuthButton() {
  const btn = document.getElementById("authBtn");
  if (!btn) return;

  const user = localStorage.getItem("user");

  if (user) {
    btn.textContent = "Logout";
    btn.classList.remove("btn-outline-danger");
    btn.classList.add("btn-danger");
    btn.href = "login.html";

    btn.onclick = function (e) {
      e.preventDefault();
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      window.location.href = "login.html";
    };
  } else {
    btn.textContent = "Login";
    btn.classList.remove("btn-danger");
    btn.classList.add("btn-outline-danger");
    btn.href = "login.html";
    btn.onclick = null;
  }
}