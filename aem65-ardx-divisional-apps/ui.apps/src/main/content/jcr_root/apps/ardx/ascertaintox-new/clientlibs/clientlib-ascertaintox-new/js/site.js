$(document).ready(function() {
  $(".breadcrumb-herobanner").closest('.columncontrol').addClass("breadcrumb-herobanner-col");
  $(".abbott-breadcrumb").closest('.container.responsivegrid').addClass("abbott-breadcrumb-container");
  $(".a-breadcrumb").closest('.columncontrol__column').addClass("a-breadcrumb-column");
  $(".a-link--icon-right").closest('.columncontrol__column').addClass("a-link--icon-right-column");
  $(".breadcrumb-herobanner").closest('.container.responsivegrid').addClass("breadcrumb-herobanner-container");
  $('.cmp-carousel [data-js-component="carousel"]').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,
    speed: 2000,
    cssEase: 'ease-in-out',
    prevArrow: '<button class="slick-prev slick-arrow abt-icon abt-icon-left-arrow"></button>',
    nextArrow: '<button class="slick-next slick-arrow abt-icon abt-icon-right-arrow"></button>'
  });
});


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