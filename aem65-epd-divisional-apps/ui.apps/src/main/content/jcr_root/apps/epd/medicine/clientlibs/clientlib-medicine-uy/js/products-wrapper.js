$(document).ready(function () {
  var path = window.location.pathname;
  if (path.includes("/index/")) {
    addProductWrapper();
  }
  if (path.includes("productos/gastroenterologia.html")) {
    addProductWrapper();
  }
  if (path.includes("productos/primary-care.html")) {
    addProductWrapper();
  }
  if (path.includes("/omeprazol.html")) {
    addProductWrapper();
  }
  if (path.includes("/dayamineralcomplete.html")) {
    addProductWrapper();
  }
  if (path.includes("/valcote-iv.html")) {
    addProductWrapper();
  }
  if (path.includes("/valcote.html")) {
    addProductWrapper();
  }
  if (path.includes("/pripax.html")) {
    addProductWrapper();
  }
  if (path.includes("/kodex.html")) {
    addProductWrapper();
  }
  if (path.includes("/dumirox.html")) {
    addProductWrapper();
  }
  if (path.includes("/dayamineraljarabe.html")) {
    addProductWrapper();
  }
  if (path.includes("/dayamineralgotas.html")) {
    addProductWrapper();
  }
  if (path.includes("/pediatrica.html")) {
    addProductWrapper();
  }
  if (path.includes("/claritromicina-abbott-250mg.html")) {
    addProductWrapper();
  }
  if (path.includes("/claritromicina-abbott.html")) {
    addProductWrapper();
  }
  if (path.includes("/aciclovirabbott.html")) {
    addProductWrapper();
  }
  if (path.includes("/vitacea.html")) {
    addProductWrapper();
  }
  if (path.includes("/viplena.html")) {
    addProductWrapper();
  }
  if (path.includes("productos/productosotc.html")) {
    addProductWrapper();
  }
  if (path.includes("productos/neurociencia.html")) {
    addProductWrapper();
  }
  if (path.includes("/claritromicina-abbott-pediatrica.html")) {
    addProductWrapper();
  }
  if (path.includes("/gastroenterologia12.html")) {
    addProductWrapper();
  }
  if (path.includes("/productos/")) {
    addProductWrapper();
  }
  if (path.includes("/contact-us.html")) {
    addProductWrapper();
  }
  if (path.includes("/sitemap.html")) {
    addProductWrapper();
  }
  if (path.includes("/search-page.html")) {
    addProductWrapper();
  }

  if (path.includes("/global-sites.html")) {
    addProductWrapper();
  }
  if (path.includes("/product-category.html")) {
    addProductWrapper();
  }

  if (path.includes("/otc-product.html")) {
    updateBreadcrumbWhite();
  }
  if (path.includes("/nosotros.html")) {
    updateBreadcrumbWhite();
  }
  if (path.includes("/quienes-somos.html")) {
    updateBreadcrumbWhite();
  }
  if (path.includes("/nuestra-promesa.html")) {
    updateBreadcrumbWhite();
  }
  if (path.includes("/productosotc.html")) {
    updateBreadcrumbWhite();
  }
});

function addProductWrapper() {
  $("body").addClass("products-wrapper");
}

function updateBreadcrumbWhite() {
  $(".abbott-breadcrumb").addClass("color-white");
}
