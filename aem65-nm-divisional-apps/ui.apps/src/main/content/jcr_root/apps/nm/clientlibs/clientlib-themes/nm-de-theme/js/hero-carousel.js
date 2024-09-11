$(document).ready(function () {
    setTimeout(function () {
      var curoselSlide = $(".slick-slide");
      var thumbnaiElement = $(".o-hero-carousel")
        .find(".cmp-carousel")
        .find("ul")
        .find("li");
  
      for (var i = 0; i < curoselSlide.length; i++) {
        var _index = $(curoselSlide[i]).attr("data-slick-index");
  
        var backgroundImage = $(curoselSlide[i])
          .find(".cmp-image")
          .attr("data-asset");
  
        var backgroundImageUrl = backgroundImage.replace(/ /g, "%20");
  
        var liElemnt = $(thumbnaiElement[_index]);
  
        if (liElemnt !== undefined && liElemnt.length > 0) {
          $(liElemnt[0]).attr(
            "style",
            "background-image:url(" + backgroundImageUrl + ")"
          );
        }
      }
    }, 50);

    $(document).on('click', '#product-section-image-gallery .slick-active .cmp-image', function() {
      var imageSrc = $(this).attr('data-asset');
      var imageSrcPath = imageSrc.replace(/ /g, "%20");
      if(!$('.product_popup_wrapper').length > 0) {
        var popUpContent = '<div class="product_popup_wrapper">' +
                          '<div class="product_image_popup">' +
                            '<div class="close-btn"></div>' +
                            '<div class="image-show-area">' +
                              '<img class="popup-image" src="' + imageSrcPath + '" alt="">' +
                            '</div>' +
                          '</div>' +
                        '</div>';
        $('body').append(popUpContent).addClass('product-popup-on');        
      }
      else {
        $('.product_popup_wrapper .popup-image').attr('src', imageSrcPath);
        $('.product_popup_wrapper').show();    
        $('body').addClass('product-popup-on');    
      }     
    }).on('click', '.product_popup_wrapper .close-btn', function() {
      $('.product_popup_wrapper').hide();
      $('body').removeClass('product-popup-on');
    });
  });
  