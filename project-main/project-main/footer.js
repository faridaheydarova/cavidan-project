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
initHeaderGuards(); 

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
function initHeaderGuards() {
  const user = localStorage.getItem("user");

  const userProductsLink = document.getElementById("userProductsLink");
  const createProductLink = document.getElementById("createProductLink");
  if (userProductsLink) {
    if (!user) {
      userProductsLink.classList.add("disabled");
      userProductsLink.setAttribute("aria-disabled", "true");
      userProductsLink.href = "#";

      userProductsLink.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Login olmamısınız! UserProducts üçün əvvəlcə giriş edin.");
        window.location.href = "login.html";
      });
    } else {
      userProductsLink.classList.remove("disabled");
      userProductsLink.removeAttribute("aria-disabled");
      userProductsLink.href = "userproducts.html";
    }
  }
  if (createProductLink) {
    createProductLink.addEventListener("click", (e) => {
      if (!localStorage.getItem("user")) {
        e.preventDefault();
        alert("Login olmamısınız! Məhsul yaratmaq üçün əvvəlcə giriş edin.");
        window.location.href = "login.html";
      }
    });
  }
}
