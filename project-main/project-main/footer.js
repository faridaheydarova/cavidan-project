function loadLayout() {
  fetch("header.html").then(res => res.text())
    .then(headerHtml => {
      document.getElementById("siteHeader").innerHTML = headerHtml;
      return fetch("footer.html");
    })
    .then(res => res.text())
    .then(footerHtml => {
      document.getElementById("siteFooter").innerHTML = footerHtml;
      updateAuthButton();
    })
    .catch(err => console.error(err));
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