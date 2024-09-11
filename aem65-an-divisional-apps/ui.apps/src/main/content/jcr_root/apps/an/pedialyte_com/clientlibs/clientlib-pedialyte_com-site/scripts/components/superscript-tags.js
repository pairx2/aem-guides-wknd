//For adding sup tag dynamically
$(document).ready(function() {
  if ($(".o-search-res__results").length > 0) {
    let sym = window.setInterval(function() {
      if ($(".a-result__title").length > 1) {
        addSupScript();
        window.clearInterval(sym);
      }
    }, 100);
  }
});

$(document).on("click", "#search-pd-btn,.a-pagination__page", function() {
  if ($(".o-search-res__results").length > 0) {
    let sym = window.setInterval(function() {
      if ($(".a-result__title").length > 1 && $(".a-spinner").is(":visible")) {
        setTimeout(function() {
          addSupScript();
        }, 500);
        window.clearInterval(sym);
      }
    }, 100);
  }
});

function addSupScript() {
  $("sup")
    .contents()
    .unwrap();
  $("h1,h2,h3,h4,h5,h6,p,a,span,li,dl,td")
    .contents()
    .filter(function() {
      return this.nodeType === 3;
    })
    .replaceWith(function() {
      return this.nodeValue.replace(/[™®]/g, "<sup>$&</sup>");
    });
}
