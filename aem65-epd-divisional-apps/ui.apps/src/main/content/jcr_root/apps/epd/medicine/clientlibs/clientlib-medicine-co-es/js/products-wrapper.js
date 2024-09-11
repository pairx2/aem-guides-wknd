$(document).ready(function () {
  var path = window.location.pathname;
  if (path.includes("/respiratory/")) {
    addProductWrapper();
  }
  if (path.includes("/women-health/")) {
    addProductWrapper();
  }
  if (path.includes("/dermatology/")) {
    addProductWrapper();
  }
  if (path.includes("/politicas/")) {
    addProductWrapper();
  }
  if (path.includes("/registro.html")) {
    addProductWrapper();
  }
  if (path.includes("/login.html")) {
    addProductWrapper();
  }
  if (path.includes("/prsencia-en-colombia.html")) {
    addProductWrapper();
  }
  if (path.includes("/farmacovigilancia.html")) {
    addProductWrapper();
  }
  if (path.includes("/sobrenosotros.html")) {
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
  if (path.includes("/reset-password.html")) {
    addProductWrapper();
  }
   if (path.includes("/forgot-password.html")) {
    addProductWrapper();
  }
});

function addProductWrapper() {
  $("body").addClass("products-wrapper");
}
