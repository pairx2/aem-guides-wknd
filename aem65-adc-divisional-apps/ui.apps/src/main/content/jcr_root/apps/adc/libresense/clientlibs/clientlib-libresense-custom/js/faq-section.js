function load_faq_section() {
  $("body").addClass("support-search-sec");
  $(".o-search-res .col-12.pb-5").addClass("s-search-wrapper");

  //Moving title to search results component
  const search_wrapper = $(".s-search-wrapper");

  search_wrapper.prepend($(".title.text-center").first());
  search_wrapper.html(
    `<div class="container">${search_wrapper.html()}</div>`
  );

  $(".o-search-res__container").addClass("container");
  loadSupportImage(); //loading image based on scree size
  moveFaqTabs();
}

function loadSupportImage() {
  const mediaQueryMediumScreen = window.matchMedia("(max-width:767px)");
  const imgUrl = mediaQueryMediumScreen.matches
    ? "url(/content/dam/adc/libresense/global/images/Support_Masthead-mobile.png)"
    : "url(/content/dam/adc/libresense/global/images/Support_Masthead.png)";

  $(".s-search-wrapper").eq(0).css("background-image", imgUrl);
}

function moveFaqTabs() {
  //Moving tab search to left sidebar
  $(".o-search-res__container .col-md-3").append($(".tabsearch"));
  $(".tabsearch").removeClass("tabsearch").addClass("searchfacet tab-search");

  const searchfacetTitleHTML = $(".searchfacet .m-link-stack--title").html();
  const tabNavsHTML = $(".a-tabs__nav").html();
  $(".a-tabs").html(`<div class="m-link-stack--header">
                        <h6 class="m-link-stack--title">${searchfacetTitleHTML}</h6>
                      </div>
                      <div class="m-link-stack--dropdown">
                          <span class="m-link-stack--dropdown-val">
                            <span class="placeholder">${searchfacetTitleHTML}</span>
                          </span>
                          <div class="js-faq-links m-link-stack--content d-none d-md-block">
                              ${tabNavsHTML}
                          </div>
                      </div>`);
  $(".a-tabs").addClass("m-link-stack m-link-stack-faq js-m-link-stack");

  $(".a-tabs__nav-link")
    .removeClass("a-tabs__nav-link nav-item active")
    .removeAttr('id')
    .addClass("faq-link a-link");
  $(".a-tabs__nav-text")
    .removeClass("a-tabs__nav-text")
    .addClass("a-link__text");
    $(".faq-link.a-link").first().addClass("active no-decoration");

  //dropdown for mobilescreen
  $(".m-link-stack--dropdown").click(function (e) {
    if(!e.target.closest("a")){
      e.stopPropagation();
    }
    this.classList.toggle("m-link-stack--dropdown-open");
    this.querySelector(".m-link-stack--content").classList.toggle("d-none");
  });

  $(".m-link-stack--dropdown .a-link.faq-link").click(function (e) {
    let el = $(".faq-link.a-link");
    if(el.hasClass("no-decoration")){
      el.removeClass("no-decoration");
    }
    el.removeClass("active");
    const selectedText = this.querySelector(".a-link__text").innerHTML;
    $(".m-link-stack--dropdown-val").html(selectedText);
  });
  $(".searchfacet.tab-search").prepend($(".m-link-stack--header").last());
}
