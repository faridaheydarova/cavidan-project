 async function loadLayout() {
    document.getElementById("siteHeader").innerHTML = await (await fetch("header.html")).text();
    document.getElementById("siteFooter").innerHTML = await (await fetch("footer.html")).text();
  }
  loadLayout();