(function($) {
    $(document).ready(function() {
       checkScreenSize();

    function checkScreenSize() {
    var newWindowWidth = $(window).width();

    if (newWindowWidth > 767 && newWindowWidth < 1181) {

		$('#section_latest_winners-19_herobanner').parent('.m-hero').addClass('banner-wrapper');

		$('#section_latest_winners_herobanner').parent('.m-hero').addClass('banner-wrapper');

		$('#section_latest_winners_herobanner_1').parent('.m-hero').addClass('banner-wrapper');

    $('#section_latest_winners_herobanner_2').parent('.m-hero').addClass('banner-wrapper');

		$('#section_achievement_hero_banner').parent('.m-hero').addClass('banner-wrapper');

		$('#section_recognising_banner_2021').parent('.m-hero').addClass('banner-wrapper');

	}

}
  });

})(jQuery);