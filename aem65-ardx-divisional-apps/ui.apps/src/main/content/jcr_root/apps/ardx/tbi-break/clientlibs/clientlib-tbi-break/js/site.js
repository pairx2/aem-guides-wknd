$(document).ready(function() {
  $(".breadcrumb-herobanner").closest('.columncontrol').addClass("breadcrumb-herobanner-col");
  $(".abbott-breadcrumb").closest('.container.responsivegrid').addClass("abbott-breadcrumb-container");
  $(".a-breadcrumb").closest('.columncontrol__column').addClass("a-breadcrumb-column");
  $(".a-link--icon-right").closest('.columncontrol__column').addClass("a-link--icon-right-column");
  $(".breadcrumb-herobanner").closest('.container.responsivegrid').addClass("breadcrumb-herobanner-container");

  callBackSiteEntering();

  let siteDiscEntry = "tbib-site" + $("input[name='x-country-code']").val();
  const toMilliseconds = (hrs,min,sec) => (hrs*60*60+min*60+sec)*1000;

  let getVisitedTbib = localStorage.getItem(siteDiscEntry);

  if(getVisitedTbib == null || getVisitedTbib != siteDiscEntry) {
    let clonePopUpDiv = $("#tbib-disclimar-pop-up").children().clone();
    $("#pageContent").after(clonePopUpDiv);
  }

  $(document).on("click", ".tbib-disclimar-continue", function(e) {
    e.preventDefault();
    $("#pageContent").siblings(".tbib-disclaimar-overlay").addClass("hide")
    localStorage.setItem(siteDiscEntry, siteDiscEntry, toMilliseconds(24, 0, 0));
  });
  $(document).on("click", ".tbib-disclimar-cancel", function(e) {
    localStorage.setItem(siteDiscEntry, siteDiscEntry, toMilliseconds(24, 0, 0));
    $("#pageContent").siblings(".tbib-disclaimar-overlay").addClass("hide")
  });

});

function callBackSiteEntering() {
  if($('#siteEnteringPopupFragmentPath').length != 0) {
      if($('#siteEnteringPopupFragmentPath').hasClass('show')) {
       let continueBtn =  $('#siteEnteringPopupFragmentPath').find('a')[0];
          $(continueBtn).removeAttr("target");
          $(continueBtn).on('click', function(e) {
              e.preventDefault();
            $(".modal-backdrop").remove();
              $("#siteEnteringPopupFragmentPath").removeClass('show');
            $("#siteEnteringPopupFragmentPath").css("display", "none");
          });
      }
  } else {
      setTimeout(function () {
          callBackSiteEntering();
      }, 50);
  }
}


$(".linkstack .js-collapse-icon").click(function () {
  $(this).toggleClass("active");
  $(this).prev(".m-link-stack--title").toggleClass("title-active");
});

let headerMenu = $(
  ".header .o-header-v2-global .navbar-collapse-wrapper .m-mega-menu__mobile-item-wrapper .navigation .m-mega-menu__mobile-item"
);
headerMenu.each(function () {
  if ($(this).find(".m-mega-menu__mobile-item").length == 0) {
    $(this).find(".m-mega-menu__mobile-header").addClass("arrowhide");
  }
});

if (window.innerWidth < 992) {
  $(
    ".m-mega-menu__mobile .navbar-nav .m-mega-menu__mobile-item-wrapper .navigation .m-mega-menu__item .nav-item"
  ).each(function () {
    let href = $(this).attr("href");
    let navItemTxt = $(this).text();
    let addEle = "<a class='mob-nav-link'></a>";
    let curEle = $(this)
      .parent()
      .parent()
      .find(".m-mega-menu__mobile-item")
      .children(".m-mega-menu__mobile-header");

    $(this)
      .parent()
      .parent()
      .find(".m-mega-menu__mobile-item")
      .children(".m-mega-menu__mobile-header")
      .attr("href", "javascript:void(0)");
    $(this)
      .parent()
      .parent()
      .find(".m-mega-menu__mobile-item")
      .children(".m-mega-menu__mobile-header")
      .prepend(addEle);
    $(this)
      .parent()
      .parent()
      .find(".m-mega-menu__mobile-item")
      .children(".m-mega-menu__mobile-header")
      .find(".mob-nav-link")
      .text(navItemTxt);
    $(this)
      .parent()
      .parent()
      .find(".m-mega-menu__mobile-item")
      .children(".m-mega-menu__mobile-header")
      .find(".mob-nav-link")
      .attr("href", href);
    curEle
      .contents()
      .filter(function () {
        return this.nodeType === 3;
      })
      .remove();
  });
}

function addRule(styles) {
  let css = styles,
    head = document.head || document.getElementsByTagName("head")[0],
    style = document.createElement("style");
  head.appendChild(style);
  
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

$(".a-title--sectiontitle-dark")?.each(function (index) {
  $(this).addClass("a-title--sectiontitle-" + index);
  let parentWidth = $(this).find(".cmp-title").innerWidth();
  let childrenWidth = $(this).find(".cmp-title__text").innerWidth();
  let psuedoWidth = parentWidth - childrenWidth;
  if (psuedoWidth >= 0) {
    addRule(
      `.a-title--sectiontitle-${index} .cmp-title__text:before { width: ${
        psuedoWidth / 2
      }px !important;}`
    );
    addRule(
      `.a-title--sectiontitle-${index} .cmp-title__text:after { width: ${
        psuedoWidth / 2
      }px !important;}`
    );
  }
});

window.addEventListener("resize", function (event) {
  $(".a-title--sectiontitle-dark").each(function (index) {
    $(this).addClass("a-title--sectiontitle-" + index);
    let parentWidth = $(this).find(".cmp-title").innerWidth();
    let childrenWidth = $(this).find(".cmp-title__text").innerWidth();
    let psuedoWidth = parentWidth - childrenWidth;
    addRule(
      `.a-title--sectiontitle-${index} .cmp-title__text:before { width: ${
        psuedoWidth / 2
      }px !important;}`
    );
    addRule(
      `.a-title--sectiontitle-${index} .cmp-title__text:after { width: ${
        psuedoWidth / 2
      }px !important;}`
    );
  });
});
