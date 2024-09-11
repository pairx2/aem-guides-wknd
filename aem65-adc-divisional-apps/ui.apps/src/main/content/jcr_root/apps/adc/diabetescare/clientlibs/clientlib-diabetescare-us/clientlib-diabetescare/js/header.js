$('.a-search__input').focus(function () {
    $(this).data('placeholder', $(this).attr('placeholder'))
       .attr('placeholder', '');
 }).blur(function () {
    $(this).attr('placeholder', $(this).data('placeholder'));
 });
 
 
 $(document).ready(function() {
 
    $(".a-text--light-yellow a").click(function() {
      return false;
    });
 
     $('.abt-icon-sphere').parents('.m-mega-menu__mobile-item-wrapper').addClass('globeIcon');
     $('.headersearch').parents('.m-mega-menu__mobile-item-wrapper').addClass('adc-header-search-container'); 

    setTimeout(function() { 
        $('.navbar-collapse').css('opacity',1);
    }, 250);

     if(window.innerWidth > 1024){
        $('.adc-header-search-container').css({ "margin-left": ((window.innerWidth / 2) - 298) + "px" });
        $('.a-megamenu--adc-mobile-link').parent('li').css('display','none');
        $('.a-megamenu--adc-mobile-social').parent('li').css('display','none');
    } else {
        $('.a-megamenu--adc-mobile-link').parent('li').css('display','block');
        $('.a-megamenu--adc-mobile-social').parent('li').css('display','block');
        $('.a-megamenu--adc-mobile-parent-link').parent('li').css('margin-top','23px');
    }
 
     function setmobileMenu(){
 
         if(window.innerWidth < 1024){
             $('.mega-menu .navbar').find('.mobile_globeIcon').remove();
             $('.mega-menu .navbar').append('<div class="mobile_globeIcon"><ul></ul></div>');
             $('.globeIcon').clone().appendTo('.mega-menu .navbar .mobile_globeIcon ul');
         } else {
             $('.mega-menu .navbar').find('.mobile_globeIcon').remove();
         }
 
         $('.m-mega-menu__mobile .navbar .navbar-collapse').css({ "width": ((window.innerWidth) - 99) + "px" });
 
         if(window.innerWidth < 560){
             $('.m-mega-menu__mobile .navbar .navbar-collapse').css({ "width": ((window.innerWidth) - 89) + "px" });
         }
     }
 
     setmobileMenu();
     $(window).on('resize', function () {
         setmobileMenu();
     });
 
    
    //clinical
    $('#freestyle-libre-pro1').find('.m-custom-list').attr('id', 'glucometer');
    $('#freestyle-libre').parent().parent().wrapAll('<a href=#freestyle-libre1></a>');
    $('#freestyle-libre-pro').parent().parent().wrapAll('<a href=#freestyle-libre-pro1></a>');
    $('#freestyle-precision-neo').parent().parent().wrapAll('<a href=#freestyle-precision-neo1></a>');
    $('#precision-xtra').parent().parent().wrapAll('<a href=#precision-xtra1></a>');
 
     $('#freestyle-libre').click(function(){
         $('html,body').animate({
         scrollTop: $('#freestyle-libre1').offset().top - 170
         }, 1000);
     });
     $('#freestyle-libre-pro').click(function(){
         $('html,body').animate({
         scrollTop: $('#freestyle-libre-pro1').offset().top - 170
         }, 1000);
     });
 
     $('#freestyle-precision-neo').click(function(){
         $('html,body').animate({
         scrollTop: $('#freestyle-precision-neo1').offset().top - 170
         }, 1000);
     });
     $('#precision-xtra').click(function(){
         $('html,body').animate({
         scrollTop: $('#precision-xtra1').offset().top - 170
         }, 1000);
     });

     //Mobile Cookie Policy
     $('#mobileCookie').on('click',function(e){
    	$('#teconsent a')[0].click();
    });
 
 });