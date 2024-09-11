$(document).ready(function () {
  var path = window.location.pathname;
  if (path.includes("/areas-terapeuticas/")) {
    addProductWrapper();
  }
  if (path.includes("/cardiometabolico.html")) {
    addProductWrapper();
  }
  if (path.includes("/neurociencias.html")) {
    addProductWrapper();
  }
  if (path.includes("/respiratoria.html")) {
    addProductWrapper();
  }
  if (path.includes("/gastroenterology.html")) {
    addProductWrapper();
  }
  if (path.includes("/avisoprivacidad.html")) {
    addProductWrapper();
  }
  if (path.includes("/politicas.html")) {
    addProductWrapper();
  }
  if (path.includes("/global-sites.html")) {
    addProductWrapper();
  }
  if (path.includes("/registrate.html")) {
    addProductWrapper();
  }
  if (path.includes("/ingresa.html")) {
    addProductWrapper();
  }
  if (path.includes("/forgot-password.html")) {
    addProductWrapper();
  }
  if (path.includes("/register-success.html")) {
    addProductWrapper();
  }
  if (path.includes("/womens-health.html")) {
    addProductWrapper();
  }
  if (path.includes("/peripheral-artery-disease.html")) {
    addProductWrapper();
  }
  if (path.includes("/terminosycondiciones.html")) {
    addProductWrapper();
  }
  if (path.includes("/login.html")) {
    addProductWrapper();
  }
  if (path.includes("/sitemap.html")) {
    addProductWrapper();
  }
  if (path.includes("/search-page.html")) {
    addProductWrapper();
  }
  if (
    path.includes("/alzheimer-y-musica-por-que-es-lo-ultimo-que-olvidamos.html")
  ) {
    updateBreadcrumbWhite();
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
  if (path.includes("/gastroenterologia.html")) {
    addProductWrapper();
  }
  if (path.includes("/respiratorio.html")) {
    addProductWrapper();
  }
});

function addProductWrapper() {
  $("body").addClass("products-wrapper");
}

function updateBreadcrumbWhite() {
  $(".abbott-breadcrumb").addClass("color-white");
}
