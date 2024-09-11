
$(document).ready(function(){

  $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
 
  });
  $('.slider-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: false,
     arrows: true,
    focusOnSelect: true,
    infinite: false,
    vertical: true,
    verticalSwiping: true,
    responsive: [
        {
            breakpoint:768,
            settings: {
                vertical: false,
                slidesToScroll: 2,
                slidesToShow: 3,
                verticalSwiping: false,
            }
        }
    ],
      prevArrow: '<button type="button" aria-label="Previous" class="abt-icon slick-prev slick-arrow abt-icon-left-arrow"><span class="sr-only">Previous</span></button>',
      nextArrow: '<button type="button" aria-label="Next" class="abt-icon slick-next slick-arrow abt-icon-right-arrow"><span class="sr-only">Next</span></button>'
 
 
  });
 
 $('.carousel-link').magnificPopup({
   type: 'image'
 });
 
 
 $('.mfp-close').addClass('abt-icon ');
  });