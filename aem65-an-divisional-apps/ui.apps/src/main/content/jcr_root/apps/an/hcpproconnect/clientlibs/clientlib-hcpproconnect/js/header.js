// Top bar brand name
let brand = $(".hcp-brand");

// Dropdown to select adult pediatric
let linkStack = $(".o-header__utility-nav .m-link-stack .js-m-link-stack"), isLiteUser = sessionStorage.getItem('lite-user');

let options = ' <div class="a-checkbox a-checkbox--vertical a-checkbox--default"><label class="a-checkbox__label" for="options_1138476554430400"><span class="a-checkbox__text"></span><input type="checkbox" class="a-checkbox__input"><span class="a-checkbox__custom"></span></label</div>';

$(window).on("load", function () {
   if ((!isUserLoggedIn()) && $("body").is("#enablePageBlockPopup") && (!isLiteUser)) {
      $("#pageBlockLink-modal").addClass('show').attr("aria-modal", "true").show();
      $("#pageBlockLink-modal").addClass("modal-page-block");
      $(".modal-content").addClass("base-page-block-modal");
      let readMoreContainer=$("#read-more-container");
      $("#pageContent").append(readMoreContainer);
      $("#read-more-container").css("display", "flex");
      //page-block visibility based on pagecontent height
      let pageContentHeight;
      if($("#pageContent").height() < 1400){
         pageContentHeight = $("#pageContent").height() * .75;
      }
      else{
        pageContentHeight = $("#pageContent").height() * .5;
      }
      $("#pageContent").css({
         'overflow': 'hidden',
         'height': pageContentHeight + "px"
      });
      $("#pageBlockLink-modal").remove();
   }
});
function header_Flag(){
   if ($(window).width() > 992) {
      let navContainer = $("#navbarCollapseWrapper");

      navContainer.find('li').each(function () {
         if (($(this).find('#contact-us').length)) {
            $(this).addClass("d-none");
         } else if ($(this).find('.cmp-text p').length) {
            if (!$(this).find('.cmp-text p').text().trim().length) {
               $(this).addClass("d-none");
            }
         } else if (($(this).find('.link').length)) {
            if (!$(this).find('.a-link__inner-text').text().trim().length) {
               $(this).addClass("d-none");
            }
         }
      });
   }
}
function header_Country(){
   if (isCountryCodeUK()) {
      let bannerRedirectlink = $(this).find(".slick-current.slick-active .button .btn").attr("href");
      if (bannerRedirectlink) {
         window.location.href = bannerRedirectlink;
      }
   }
}
function header_CountryLink(){
   if (isCountryCodeUK()) {
      let patientURL = $("#nonhcp").attr("href");
      if(!window.location.href.includes($("#nonhcp").attr("href").replace(".html",""))) {
          if ($(window).width() <= 991) {
              $("ul.navbar-nav:first-child").prepend("<li class='m-mega-menu__mobile-item-wrapper'><div class='healthcare-professional-dropdowm-wrapper hcp-patient-dropdown-wrapper hcp-brand px-3 mr-1'><div class='hcp-text-arrow healthcare-professional-text-arrow'><button id='hcp-patient-dropdown-button'>HEALTHCARE PROFESSIONALS</button><span class='hcp-patient-dropdown-arrow arrow-rotate healthcare-professional-dropdown-arrow'></span></div><div class='hcp-patient-dropdown-container show-patient-hcp-dropdown healthcare-professional-dropdown-container' id='hcp-patient-dropdown-content'>  <div class='m-link-stack__container'><ul class='m-link-stack__list'><li class='m-link-stack__list-item'><div class='patient-link-text a-link'><a class='a-link__text patient-link healthcare-professional-link' aria-label='All' role='link' href='" + patientURL + "' target='_self'>PATIENTS & CAREGIVERS</a></div></li></ul></div></div></div></li>");
          } else {
              $("span.hcp-brand.px-3.mr-1").remove();
              $(".o-header__user-activity").prepend("<div class='healthcare-professional-dropdowm-wrapper hcp-patient-dropdown-wrapper hcp-brand px-3 mr-1'><div class='hcp-text-arrow healthcare-professional-text-arrow'><button id='hcp-patient-dropdown-button'>HEALTHCARE PROFESSIONALS</button><span class='hcp-patient-dropdown-arrow healthcare-professional-dropdown-arrow'></span></div><div class='hcp-patient-dropdown-container healthcare-professional-dropdown-container' id='hcp-patient-dropdown-content'>  <div class='m-link-stack__container'><ul class='m-link-stack__list'><li class='m-link-stack__list-item'><div class='patient-link-text a-link'><a class='a-link__text patient-link healthcare-professional-link' aria-label='All' role='link' href='" + patientURL + "' target='_self'>  PATIENTS & CAREGIVERS</a></div></li></ul></div></div></div>");
          }
      } else {
          if ($(window).width() <= 991) {
              $("ul.navbar-nav:first-child").prepend("<li class='m-mega-menu__mobile-item-wrapper'><div class='hcp-patient-dropdown-wrapper hcp-brand px-3 mr-1'><div class='hcp-text-arrow'><button id='hcp-patient-dropdown-button'>PATIENTS & CAREGIVERS</button><span class='hcp-patient-dropdown-arrow arrow-rotate'></span></div><div class='hcp-patient-dropdown-container show-patient-hcp-dropdown' id='hcp-patient-dropdown-content'>  <div class='m-link-stack__container'><ul class='m-link-stack__list'><li class='m-link-stack__list-item'><div class='patient-link-text a-link'><a class='a-link__text patient-link' aria-label='All' role='link' onclick='redirectHome()' target='_self'>HEALTHCARE PROFESSIONALS</a></div></li></ul></div></div></div></li>");
          } else {
              $("span.hcp-brand.px-3.mr-1").remove();
              $(".o-header__user-activity").prepend("<div class='hcp-patient-dropdown-wrapper hcp-brand px-3 mr-1'><div class='hcp-text-arrow'><button id='hcp-patient-dropdown-button'>PATIENTS & CAREGIVERS</button><span class='hcp-patient-dropdown-arrow'></span></div><div class='hcp-patient-dropdown-container' id='hcp-patient-dropdown-content'>  <div class='m-link-stack__container'><ul class='m-link-stack__list'><li class='m-link-stack__list-item'><div class='patient-link-text a-link'><a class='a-link__text patient-link' aria-label='All' role='link' onclick='redirectHome()' target='_self'>  HEALTHCARE PROFESSIONALS</a></div></li></ul></div></div></div>");
          }
      }

  }
}
function header_Utility(){
   if (isCountryCodeUK()) {
      $(".o-header__utility-nav > .country-dropdown.linkstack").css("background-color", "#FF6900");

      //patient search-result url change:
      let patientappid= $("input[name=x-application-id]").val();
      let searchurl = $('.a-search').find('form').attr('action');
      if(patientappid=="anpatientcarers" && searchurl=="/uk/en/search-result.html"){
         let patientSearchurl=$("input[name=patientSearchResultURL]").val();
         $('.a-search').find('form').attr('action',patientSearchurl);
      }
      
      if(!window.location.href.includes($("#nonhcp").attr("href").replace(".html",""))) {
          $(".o-header .o-header__user-activity").css('width', '87%');
          $('<span class="abt-icon abt-icon-shoppingcart go-to-cart-btn"><label id="cartCount">0</label></span>').insertAfter('.o-header__secondary-top-nav .o-header__search');
          $('<span class="abt-icon abt-icon-shoppingcart cart-btn-mob"><label id="cartCount-mobile">0</label></span>').insertAfter('.o-header__search.o-header__mob-search');
      } else {
          $('.o-header__search.o-header__mob-search').addClass('patient-header-search-icon');
      }

      $('.a-search__input').click(function() {
          $(".go-to-cart-btn").hide();
          $('.cart-btn-mob').hide();
          $(this).css('width', '100% !important');
      });

      $('.a-search--icon-right').click(function() {
          $(".go-to-cart-btn").show();
          $('.cart-btn-mob').show();
          $('.navbar.navbar-expand-lg').removeClass('show');
          $('.o-header__search.o-header__mob-search').css('right','60px');
      });

      $('.a-search--icon-left').click(function() {
         $('.cart-btn-mob').hide();
      });

      $('.go-to-cart-btn, .cart-btn-mob').click(function() {
          let cartRedirectUrl =  $('#cart-redirect-url').val();
          let baseUrl = window.location.origin;
          window.location.href = baseUrl + cartRedirectUrl;
      });
  }
}
function header_linkReduce(){
   $('.m-mega-menu__nested-menu .m-link-stack--content').each(function () {
      if ($(this).children('.a-link').length > 6) {
         $(this).parents('.m-mega-menu__nested-menu').css('overflow-y', 'scroll');
      } else {
         $(this).parents('.m-mega-menu__nested-menu').css('overflow-y', 'hidden');
      }
   })
}
function innerReduce_fn(){
   if ((!isUserLoggedIn()) && $("body").is("#enableSignUpPopup") && (!isLiteUser)) {
      $("body").css('overflow', 'hidden');
      $("#clickSignUpPopup-modal").css("padding-right", "17px").addClass('show').attr("aria-modal", "true").show();
      if (!$(".modal-backdrop").length) {
         $("body").append('<div class="modal-backdrop show"></div>');
      } else {
         $(".modal-backdrop").show();
      }
   }
}
function checkforRegpopup(){
   if($("#initial-registration-popup-xf").length > 0){
      $("#initial-registration-popup-xf").show();
   } 
   else {
      sessionStorage.setItem("openRegistrationPopup", 'true');
      window.location.href = '/uk/en/home.html';
   }
}

$(document).ready(function () {
   //Change color when country is UK for US-5469 
    header_Utility();

   $(".o-header__secondary-top-nav .container .row").removeClass("justify-content-end").prepend(linkStack);
   $(".a-link__text").attr("target", "_self");
   $(".o-header__user-activity").css("margin-left", "auto");
   $(".navbar-nav").prepend(linkStack);
   $(".o-header__secondary-top-nav .container .row .o-header__user-activity").prepend(brand);

   // START SB HCP- show hide user dropdown and register/login and contact us

   $(".m-mega-menu__mobile-item-wrapper:nth-last-child(3) .m-link-stack__link").addClass("abt-icon abt-icon-user");

   let userLinkstack = $(".m-mega-menu__mobile-item-wrapper:nth-last-child(3) .linkstack").clone();
   let contactUs = $(".m-mega-menu__mobile-item-wrapper:last-child .link").clone()

   userLinkstack.addClass("profile-dropdown");
   $(".o-header__utility-nav").append(userLinkstack);
   $(contactUs).insertBefore(".o-header__utility-nav .a-link--icon-left");

   if (isUserLoggedIn()) {

      $(".m-mega-menu__mobile-item-wrapper:nth-last-child(2)").toggleClass("d-none");
      $(".o-header__utility-nav .a-link--icon-left").toggleClass("d-none");
      $(".m-mega-menu__mobile-item-wrapper:nth-last-child(3)").toggleClass("d-block");
      $(".o-header__utility-nav .profile-dropdown").toggleClass("d-block");
      let profileName = "";
      const data = getLocalStorage("userInfo");
      if (data.firstName == undefined) {
         const name = data.userName.split('.');
         let firstName = name[0];
         let lastName = name[1];
         profileName = firstName + " " + lastName;
      } else {
         profileName = data.title + " " + data.firstName + " " + data.lastName;
      }

      let em = $(".profile-dropdown .m-link-stack__link .a-link__text:first-child").find('em');
      let emMobile = $(".m-mega-menu__mobile-item-wrapper:nth-last-child(3) .m-link-stack__link .a-link__text").find('em');
      $(".profile-dropdown .m-link-stack__link .a-link__text:first-child").text(profileName);
      $(".profile-dropdown .m-link-stack__link .a-link__text:first-child").append(em);
      $(".m-mega-menu__mobile-item-wrapper:nth-last-child(3) .m-link-stack__link .a-link__text:first-child").text(profileName);
      $(".m-mega-menu__mobile-item-wrapper:nth-last-child(3) .m-link-stack__link .a-link__text:first-child").append(emMobile);

   } else {
      $(".m-mega-menu__mobile-item-wrapper:nth-last-child(3)").toggleClass("d-none");
      $(".o-header__utility-nav .profile-dropdown").toggleClass("d-none");
   }
   // END
   
      header_linkReduce();
   

   header_Flag();

   //CLICKABLE BANNER -US 5189  - When the user clicks anywhere on the banner, it will redirect to the active carousel link 
   $(document).on("click", "#carouselPreLogin .slick-list.draggable", function () {
      header_Country();
   });

   //US-5294 Patient popup redirect update - Converted the HCP text to dropdown with Patients & Caregivers options

   header_CountryLink();

   //US-5294 Patient popup redirect update - Patients & Cargivers option dropdown functionality
   $(".hcp-text-arrow").click(function (e) {
      e.preventDefault();
      $(this).children(".hcp-patient-dropdown-arrow").toggleClass("arrow-rotate");
      $(this).next(".hcp-patient-dropdown-container").toggleClass("show-patient-hcp-dropdown");
   }); // dropdown click function ends

   //US-5294 Patient popup redirect update - When the dropdown is in the opened state, it should close automatically when the user clicks outside the dropdown.
   $(document).mouseup(function (e) {
      let hcpPatientContainer = $(".hcp-patient-dropdown-wrapper.hcp-brand.px-3.mr-1")
      if (!hcpPatientContainer.is(e.target) && hcpPatientContainer.has(e.target).length === 0) {
         if ($(".hcp-patient-dropdown-container").hasClass("show-patient-hcp-dropdown")) {
            $(".hcp-patient-dropdown-container").removeClass("show-patient-hcp-dropdown");
            $(".hcp-patient-dropdown-arrow").removeClass("arrow-rotate");
         }
      }
   }); //mouseup function ends

  $(document).on("click", "#openRegistrationPopup", function () {
      $(window).scrollTop(0);
      $("body").css("overflow", "hidden");
      checkforRegpopup();
   });

   //US-5261-sing up popup
   setTimeout(function () {
      innerReduce_fn();
   }, 18000);
   $(document).on("click", "#Signupredirect", function (e) {
      e.preventDefault();
      $("body").css("overflow", "hidden");
      if($("#initial-registration-popup-xf").length > 0){
         $("#initial-registration-popup-xf").show();
      } else {
         sessionStorage.setItem("openRegistrationPopup", 'true');
         window.location.href = '/uk/en/home.html';
      }
   });

   $(document).on("click", "#clickSignUpPopup-modal[data-js-component='pop-up'].show .generic-modal--close", function (e) {
      $("#clickSignUpPopup-modal").removeClass('show').hide();
      $(".modal-backdrop").removeClass("show");
      $(".modal-dialog").removeClass("sign-up-modal");
      $("html").css('overflow', 'auto');
   });

   $(document).on("click", "#clickSignUpPopupSampleRequest-modal[data-js-component='pop-up'].show .generic-modal--close", function (e) {
     $("#clickSignUpPopupSampleRequest-modal").removeClass('show').hide();
     $(".modal-backdrop").removeClass("show");
     $(".modal-dialog").removeClass("sign-up-modal");
     $("html").css('overflow', 'auto');
    });

});

// SB HCP - 291 black overlay in mobile hamburger click
$(".navbar-toggler").on("click", function () {
   $(".o-header__mega-menu").toggleClass("blackOverlay");
});

//CLICKABLE BANNER -US 5189  - Adding cursor pointer for the banner, gives the information to the user that the entire banner is clickable one
$(document).on("load", function () {

   if (isCountryCodeUK()) {
      $("#carouselPreLogin .slick-list.draggable").css("cursor", "pointer");
   }
});