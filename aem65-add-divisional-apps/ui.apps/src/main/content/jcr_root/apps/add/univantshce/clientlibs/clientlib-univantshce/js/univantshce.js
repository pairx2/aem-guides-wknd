
      $('.o-header__utility-nav').append('<a href="/int/en/country-selector.html" class="globe_icon"><em class="abt-icon abt-icon-globe"></em></a>');
      $("#recognizing_desc_21 article.m-card").css("boxShadow", "none");
      var windowWidth = $(window).width();
      if(windowWidth < 992){
         $(".m-mega-menu__mobile-menu a").click(function(){
            $(".navbar-toggler").removeClass("abt-icon-cancel");
            $(".navbar-collapse").hide();
          });
      }
      if ((windowWidth > 752) && (windowWidth < 767)) {
         $("img.a-logo-comp--image.img-fluid").css("left", "-77px");

      } else {

         // write you css here for screen size is less then 768
      }
      (function ($) {
         $(document).ready(function () {
      let domain = window.location.pathname.split('/');
      domain = (domain[domain.length - 1]);

      if ((windowWidth >= 1366) && (domain == 'error.html') || (windowWidth > 1366) && (domain == '404.html') || (windowWidth > 1366) && (domain == '500.html')) {
         $(".footer .o-footer").css("padding-bottom", "0px");
      }
      else if ((windowWidth >= 411) && (windowWidth <= 916) && (domain == 'error.html') || (windowWidth >= 411) && (windowWidth <= 914) && (domain == '404.html') || (windowWidth >= 411) && (windowWidth <= 914) && (domain == '500.html')) {
         $(".o-footer").css("padding-bottom", "66vw");
      }
      else if (((windowWidth >= 383) && (windowWidth <= 825) && (domain == 'error.html') || (windowWidth >= 383) && (windowWidth <= 825) && (domain == '404.html') || (windowWidth >= 383) && (windowWidth <= 825) && (domain == '500.html')) || ((windowWidth >= 389) && (windowWidth <= 845) && (domain == 'error.html') || (windowWidth >= 389) && (windowWidth <= 845) && (domain == '404.html') || (windowWidth >= 389) && (windowWidth <= 845) && (domain == '500.html'))) {
         $(".o-footer").css("padding-bottom", "41vw");
      }
      else if ((windowWidth >= 752) && (windowWidth <= 1026) && (domain == 'error.html') || (windowWidth >= 752) && (windowWidth <= 1026) && (domain == '404.html') || (windowWidth >= 752) && (windowWidth <= 1026) && (domain == '500.html')) {
         $(".o-footer").css("padding-bottom", "70vw");
      }
      else {

         // write you css here for screen size is less then 768
      }


      /*---------------winners 2020----------------*/
   
      $(".m-mega-menu__list-var").css("width", windowWidth);
      $("#section-modern-healthcare-container, #section-linkdin-comp-container, #section-defining-healthcare").parent().addClass("pl-0 pr- pb-0");
      $("#section-modern-healthcare-container, #section-linkdin-comp-container, #section-defining-healthcare").parent().addClass("pl-0 pr-0 pb-0");
      $("#section-defining-healthcare").parent().addClass("white-bg");
      $("#section-star-container").parent().addClass("pl-0 pr-0");
      $("#section_learn-more-banner, #section_healthcare-excellence-container").parent().addClass('pb-0');
      $("#unity-columns, #unity-avants-image").parent().addClass("white-bg mb-0 mt-0");
      $("#section-key_dates_container,#section-gallery, #section-achievement-wrapper").parent().addClass('white-bg');
      $("#section_learn-more-banner, #section-video-main-title").parent().addClass('pt-0');
      $("#section-modern-healthcare-container, #section-linkdin-comp-container").parent().addClass('pt-0');
		$("#section-card_details_winner_20, #section-recognizing_desc_20,#section-section-recognizing_desc_21, #section-card_details_winner_21, #recognizing_desc_21, #section-achievement_desc_21, #section-achievement_desc_20").parent('.container').addClass('white-bg');
		$('#achievement_desc_20').parent('.container').addClass('white-bg');
		$("#section_latest_winners_herobanner_2,#section_latest_winners-19_herobanner,#section_latest_winners_herobanner_1,#section_latest_winners_herobanner,#section_rating_banner_2020,#section_achievement_hero_banner,#section_recognising_banner_2021,#section_recognising_banner_2019").parent('.m-hero').addClass('white-bg');
      $("#section-globe_language").parent('.container').addClass('ht-0');
      $("#section-globe_text_container").parent('.container').addClass('pd-t-0');
      $("#section-error_page_section,#section-error_page_banner").parent('.container').addClass('error-bg-white');
      $("#section-winners-content, #section-winners-content_19").parent().addClass('white-bg pl-0 pr-0');
      $("#section_latest_winners_herobanner_2, #section_latest_winners-19_herobanner").parent().addClass('vertical-middle-title');
 
      //language selector
       $('.o-header .m-mega-menu__mobile .navbar').append('<a href="/int/en/country-selector.html" class="globe"><em class="abt-icon abt-icon-globe"></em></a>'); //append the icon to html


   //program
        $('#section_Hero-banner-wrapper').parent().addClass('banner-wrapper p-0').next().addClass('banner-wrapper');
        $('#section_partners').parent('.m-hero').addClass('banner-wrapper');
        $('#section_Hero-banner-wrapper, #section_partners, #section_inspiring-wrapper').parent().addClass('p-0');
        $("#section-program-tile-wrapper, #section-winner-achievement, #section-achievement_desc_21").parent().addClass('white-bg pl-0 pr-0');
        $("#section_unify_award").parent().addClass('award-height');
        $("#section_great-wrapper, #section_award, #section_unify_award, #section_leadership-wrapper, #section_esteemed-wrapper").parent().addClass('wrapper-height');
        $("#section_earned-opportunity").parent().addClass('wrapper-height-medium');
        $("#section_inspiring-wrapper").parent().addClass('mobile-height');
        $("#section_magazine-wrapper").parent().addClass('mobile-height');
        
        /*winners*/
        $("#section_latest_winners_herobanner, #section_latest_winners_herobanner_20").parent().addClass('vertical-middle-title banner-top');
        $("#section-achievement-wrapper, #section-card_details_winner_21, #section_latest_winners_herobanner, #section_latest_winners_herobanner_20").parent().addClass('p-0');
        $("#section-card_details_winner_20, #section-recognizing_desc_20").parent().addClass('pl-0 pr-0');
        $("#section_latest_winners_herobanner_2").parent().addClass('p-0');
        $("#section-key_dates_container, #section-guidance").parent().addClass('pl-0 pr-0')
        $("#section-error_page_banner").parent().addClass('cyan-bg p-0');
        $("#section-error_page_banner").addClass('align-container-middle');
        $("#section-error_page_section").parent().addClass('white-bg p-0');
        $("#section_latest_winners_herobanner_20").parent().addClass('winner-banner-height');
   });
})(jQuery);
