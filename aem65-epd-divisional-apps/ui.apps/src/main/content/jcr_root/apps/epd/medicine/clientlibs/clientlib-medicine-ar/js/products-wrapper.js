$(document).ready(function () {
  var path = window.location.pathname;

  if (path.includes("/index/")) {
    addProductWrapper();
  }
  if (path.includes("productos/gastroenterology.html")) {
    addProductWrapper();
  }
  if (path.includes("/omeprazoli.html")) {
    addProductWrapper();
  }
  if (path.includes("/betaserc.html")) {
    addProductWrapper();
  }
  if (path.includes("/contact-us.html")) {
    addProductWrapper();
  }
  if (path.includes("/product-category.html")) {
    addProductWrapper();
  }
  if (path.includes("/productos")) {
    addProductWrapper();
  }
  if (path.includes("neurociencia/betaserc.html")) {
    addProductWrapper();
  }
  if (path.includes("neuroscience/valcote-sprinkle.html")) {
    addProductWrapper();
  }
  if (path.includes("neurociencia/luvox.html")) {
    addProductWrapper();
  }
  if (path.includes("neurociencia/depakene.html")) {
    addProductWrapper();
  }
  if (path.includes("cardiovascular/tiadyl-plus.html")) {
    addProductWrapper();
  }
  if (path.includes("cardiovascular/tiadyl.html")) {
    addProductWrapper();
  }
  if (path.includes("cardiovascular/rivacrist.html")) {
    addProductWrapper();
  }
  if (path.includes("cardiovascular/isoptino-retard.html")) {
    addProductWrapper();
  }
  if (path.includes("cardiovascular/isoptino-md.html")) {
    addProductWrapper();
  }
  if (path.includes("cardiovascular/controlip.html")) {
    addProductWrapper();
  }
  if (path.includes("primary-care/klaricid-ud.html")) {
    addProductWrapper();
  }
  if (path.includes("primary-care/klaricid-pediatrico.html")) {
    addProductWrapper();
  }
  if (path.includes("primary-care/klaricid-forte.html")) {
    addProductWrapper();
  }
  if (path.includes("primary-care/klaricid.html")) {
    addProductWrapper();
  }
  if (path.includes("primary-care/influvactetra.html")) {
    addProductWrapper();
  }
  if (path.includes("primary-care/influvac.html")) {
    addProductWrapper();
  }
  if (path.includes("primary-care/dayamineral.html")) {
    addProductWrapper();
  }
  if (path.includes("primary-care/cofron-pediatrico.html")) {
    addProductWrapper();
  }
  if (path.includes("primary-care/cofron.html")) {
    addProductWrapper();
  }
  if (path.includes("/search-page.html")) {
    addProductWrapper();
  }
  if (path.includes("/sitemap.html")) {
    addProductWrapper();
  }

  if (path.includes("nosotros/nuestra-promesa.html")) {
    updateBreadcrumbWhite();
  }
  if (path.includes("/cardiovascular.html")) {
    updateBreadcrumbWhite();
  }
  if (path.includes("/nosotros.html")) {
    updateBreadcrumbWhite();
  }
  if (path.includes("nosotros/quienes-somos.html")) {
    updateBreadcrumbWhite();
  }
});

function addProductWrapper() {
  $("body").addClass("products-wrapper");
}

function updateBreadcrumbWhite() {
  $(".abbott-breadcrumb").addClass("color-white");
}
