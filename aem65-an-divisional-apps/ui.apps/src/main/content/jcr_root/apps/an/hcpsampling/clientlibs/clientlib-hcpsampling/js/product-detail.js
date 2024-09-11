$(document).ready(function() {
   // Init Product Carousel
   function initProductCarousel() {      
      if (typeof $.fn.slick != 'undefined') {
         let productCarousel = $(".cmp-product-detail [data-js-component=carousel]");
         productCarousel.slick("unslick");
         productCarousel.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
         });
         initGratisLink();
      }  else {
         setTimeout(function() {
            initProductCarousel();
         }, 500);
      }
   }  


   // Request Sample / Gratis Button
   let requestSampleButton = $("#requestSampleButton");
   let requestSampleInfo = $(".cmp-product-detail__gratis-error");
   if (requestSampleButton.length) {
      // Enable Request Sample Link
      $("body").on("an-hcpsampling:login", function(e, data) {
         let userInfo = getLocalStorage("userInfo");
         if (userInfo?.additionalProperties?.gratisEligible &&
             userInfo?.additionalProperties?.gratisLimit > 0) {
            requestSampleButton.removeClass("disabled");
            requestSampleInfo.hide();
         } else if (!userInfo?.additionalProperties?.gratisEligible) {
            $("[id^=gratisError]").hide();
            $("#gratisErrorEligible").show();
         } else if (userInfo?.additionalProperties?.gratisEligible &&
                    userInfo?.additionalProperties?.gratisLimit < 1) {
            $("[id^=gratisError]").hide();
            $("#gratisErrorLimit").show();
         }
      });

      if (!isUserLoggedIn()) {
         $("[id^=gratisError]").hide();
         $("#gratisErrorLogin").show();
      }

      requestSampleInfo.find("a").click(function() {
         $("#gratisErrorModal")[0]?.click();
      });

      // Generate Request Sample Form URL
      let requestSampleFormPath = $("[name=requestSampleFormPath]").val();
      let productImage = $(".cmp-product-detail__mediacarousel [data-cmp-src]").attr("data-cmp-src");
      let productName = $(".cmp-product-detail__marketing-text h2").html();
      let gratisId = $("[name=gratisId]").val();
      let brandId = $("[name=brandId]").val();

      let requestSampleUrl = requestSampleFormPath +
          "#/?productImage=" + encodeBase64(productImage?.replaceAll("{.width}", ".256")) +
          "&productName=" + encodeBase64(productName) +
          "&gratisId=" + encodeBase64(gratisId) +
          "&brandId=" + encodeBase64(brandId);

      requestSampleButton.attr("href", requestSampleUrl);
   }
});
// Init Formulation Listeners
let formulationIndex, servingIndex = 0;
$(".cmp-product-detail__formulation-dropdown .a-dropdown").on("change",function(event) {
   formulationIndex = $(event.target).find("li.selected").index();
   if (formulationIndex === -1) {
      formulationIndex = 0;
   }
   servingIndex = $(".cmp-product-detail__formulation-filter--item:eq(" + formulationIndex + ") li.selected").index();
   if (servingIndex === -1) {
      servingIndex = 0;
   }      
   $(".cmp-product-detail [data-js-component=carousel]").slick("slickGoTo", formulationIndex);
   $(".cmp-product-detail__formulation-filter--item").hide();
   $(".cmp-product-detail__formulation-filter").each(function() {
      $(this).find(".cmp-product-detail__formulation-filter--item").eq(formulationIndex).show();
   });
   $(".cmp-product-detail__serving-filter--item").hide();
   $(".cmp-product-detail__serving-filter").each(function() {
      $(this).find(".cmp-product-detail__serving-filter--item").eq(servingIndex).show();
   });
});
$(".cmp-product-detail__serving-dropdown .a-dropdown").on("change",function(event) {
   servingIndex = $(event.target).find("li.selected").index();
   if (servingIndex === -1) {
      servingIndex = 0;
   }      
   $(".cmp-product-detail__serving-filter--item").hide();
   $(".cmp-product-detail__serving-filter").each(function() {
      $(this).find(".cmp-product-detail__serving-filter--item").eq(servingIndex).show();
   });
});