$(document).ready(function () {
  var path = window.location.pathname;

  if (path.includes("/index/")) {
    addProductWrapper();
  }
  if (path.includes("/products/")) {
    addProductWrapper();
  }
  if (path.includes("/acerca-de-nosotros/")) {
    addProductWrapper();
  }
  if (path.includes("/login.html")) {
    addProductWrapper();
  }
  if (path.includes("/forgot-password.html")) {
    addProductWrapper();
  }
  if (path.includes("/register-success.html")) {
    addProductWrapper();
  }
  if (path.includes("/registro.html")) {
    addProductWrapper();
  }
  if (path.includes("/contacto.html")) {
    addProductWrapper();
  }
  if (path.includes("/sitemap.html")) {
    addProductWrapper();
  }
  if (path.includes("/search-page.html")) {
    addProductWrapper();
  }
  if (path.includes("/activation.html")) {
    addProductWrapper();
  }
  if (path.includes("/secure/profile.html")) {
    addProductWrapper();
  }
  if (path.includes("/reset-password")) {
    addProductWrapper();
  }
});

function addProductWrapper() {
  $("body").addClass("products-wrapper");
}
