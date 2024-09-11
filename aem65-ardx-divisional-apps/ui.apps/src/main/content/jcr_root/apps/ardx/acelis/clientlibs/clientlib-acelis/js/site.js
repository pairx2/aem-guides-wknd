$(document).ready(function() {
  $(document).on("click", ".header .headersearch .a-search.open", function(){
    $("body").addClass("overflow-auto");
  });
  $(".breadcrumb-herobanner").closest('.columncontrol').addClass("breadcrumb-herobanner-col");
  $(".abbott-breadcrumb").closest('.container.responsivegrid').addClass("abbott-breadcrumb-container");
  $(".a-breadcrumb").closest('.columncontrol__column').addClass("a-breadcrumb-column");
  $(".a-link--icon-right").closest('.columncontrol__column').addClass("a-link--icon-right-column");
  $(".breadcrumb-herobanner").closest('.container.responsivegrid').addClass("breadcrumb-herobanner-container");
  
  $('.cmp-carousel [data-js-component="carousel"]').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    adaptiveHeight: true,
    prevArrow: '<button class="slick-prev slick-arrow abt-icon abt-icon-left-arrow"></button>',
    nextArrow: '<button class="slick-next slick-arrow abt-icon abt-icon-right-arrow"></button>'
  });
});
$(".linkstack .js-collapse-icon").click(function(){
    $(this).toggleClass("active");
    $(this).prev(".m-link-stack--title").toggleClass("title-active");
 })
 
 var headerMenu = $(".header .o-header-v2-global .navbar-collapse-wrapper .m-mega-menu__mobile-item-wrapper .navigation .m-mega-menu__mobile-item");
 headerMenu.each(function(){
    if($(this).find('.m-mega-menu__mobile-item').length == 0){
       $(this).find('.m-mega-menu__mobile-header').addClass("arrowhide");
    }
 })
 
 var getCtaElement = document.querySelectorAll('.columncontrol');
 Array.from(getCtaElement, function(ele) {
     var paraEle = ele.querySelectorAll('.featurescard');
     
     if (paraEle.length > 0 && window.innerWidth > 767) {
         setTimeout(function() {
             var paraMaxHeight = paraEle[0].clientHeight;
             paraEle.forEach(function(para) {
                 if (para.clientHeight > paraMaxHeight) {
                     paraMaxHeight = para.clientHeight;
                 }
             });
             paraEle.forEach(function(para) {
                 para.setAttribute('style', 'height:' + paraMaxHeight + 'px');
             });
         }, 1000);
     }
 });
 
 function customHeaderNav() {
    $(".m-mega-menu__mobile-item").has(".m-mega-menu__mobile-products div").addClass("has-child");
    $(".m-mega-menu__mobile-item-wrapper").has(".m-mega-menu__nested-menu").addClass("has-child");
    var nestedNavItem = $(".m-mega-menu__mobile-products").find(".m-mega-menu__mobile-item").find(".m-mega-menu__mobile-item-link");
    nestedNavItem.on('click',function(event){
		event.stopPropagation();
    })
    var navItems = $('.m-mega-menu__mobile-item-wrapper');
    navItems.each(function() {
        var navDesktop = $(this).find('.m-mega-menu__item.d-none.d-lg-block');
        var navLinkDesktop = navDesktop.find('.nav-item').attr('href');
        var navMobile = $(this).find('.m-mega-menu__mobile-item');

        if (navLinkDesktop) {
            navMobile.find('.m-mega-menu__mobile-header').attr('href',navLinkDesktop);
        }
		var navMobile_event = $(this).find('.m-mega-menu__item.has-child');


		navMobile_event.click(function(event) {
            if(event.target.tagName==="A"){
				return;
            }

			event.stopPropagation()

            if(event.target !== event.currentTarget){
				event.stopPropagation();
                event.preventDefault();
               if($(event.target).hasClass("active")){
				   $(event.target).removeClass('active');
                   $(event.target).find(">a").removeClass("active");
                   $(event.target).find(".m-mega-menu__mobile-tertiary").addClass('d-none');
                }else{
				$('.m-mega-menu__mobile-item.m-mega-menu__tertiary.has-child').removeClass('active');
				$('.m-mega-menu__mobile-item.m-mega-menu__tertiary.has-child').find("> a").removeClass('active');
				$('.m-mega-menu__mobile-item.m-mega-menu__tertiary.has-child').find(".m-mega-menu__mobile-tertiary").addClass("d-none");
                 $(event.target).addClass("active");
                 $(event.target).find(">a").addClass("active");
                 $(event.target).find(".m-mega-menu__mobile-tertiary").removeClass('d-none');
                 $(event.target).find(".m-mega-menu__item.m-mega-menu__mobile-item.m-mega-menu__tertiary.has-child").addClass('active');
                }
				return;
            }
            if($(this).hasClass("m-mega-menu__mobile-item") && !$(this).hasClass("m-mega-menu__tertiary") && $(this).hasClass("has-child"))
            {
                event.preventDefault();
            if($(this).hasClass("active")){
				$(this).removeClass('active');
            }else{
				$('.m-mega-menu__item.m-mega-menu__mobile-item.has-child').removeClass('active');
                $(this).addClass('active');

            }
            $(this).parents('.m-mega-menu__mobile-item-wrapper').siblings().find('.m-mega-menu__mobile-header').removeClass('active');
            $(this).parents('.m-mega-menu__mobile-item-wrapper').siblings().find('.m-mega-menu__mobile-products').addClass('d-none');
            $(this).parents('.m-mega-menu__mobile-item-wrapper').siblings().removeClass('menu-active');
            $(this).find('.m-mega-menu__mobile-header').toggleClass('active');
            $(this).find('.m-mega-menu__mobile-products').toggleClass('d-none');
            $(this).parents('.m-mega-menu__mobile-item-wrapper').toggleClass('menu-active');
            }

        })
    });

    var netstedMenuItem = $(".m-mega-menu__nested-menu").find(".m-mega-menu__nested-menu-wrapper").find(".m-link-stack--content.d-none").find(".a-link").find("> a")

    var netsedMenuItem_mobile = $(".m-mega-menu__mobile-products").find(".m-mega-menu__mobile-item").find("> a");

    for(var i=0;i<netstedMenuItem.length;i++){
			const mobileNestedMenu_URL= $(netstedMenuItem[i]).attr('href');
            if (mobileNestedMenu_URL) {
                $(netsedMenuItem_mobile[i]).attr('href',mobileNestedMenu_URL);
            }

    }

}
customHeaderNav();

function addRule(styles) {
    var css = styles,
      head = document.head || document.getElementsByTagName("head")[0],
      style = document.createElement("style");
    head.appendChild(style);
    style.type = "text/css";
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }
  
  $(".a-title--sectiontitle-dark")?.each(function (index) {
    $(this).addClass("a-title--sectiontitle-" + index);
    var parentWidth = $(this).find(".cmp-title").innerWidth();
    var childrenWidth = $(this).find(".cmp-title__text").innerWidth();
    var psuedoWidth = parentWidth - childrenWidth;
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
      var parentWidth = $(this).find(".cmp-title").innerWidth();
      var childrenWidth = $(this).find(".cmp-title__text").innerWidth();
      var psuedoWidth = parentWidth - childrenWidth;
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

  // for how-it-works page
$(document).ready(function() {
	$("#section-how-it-works-page").parent().addClass("remove-bottom-padding");
});