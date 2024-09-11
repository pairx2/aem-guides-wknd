(function($) {
    $(document).ready(function() {



		/*---------------News----------------*/
        var newsImg = $('#section_in-the-news .m-hero__image img').attr('src');
        $("#section_in-the-news").css("background-image", "url(" + newsImg + ")");

 		var archievesImg = $('#section_archives .m-hero__image img').attr('src');
        $("#section_archives").css("background-image", "url(" + archievesImg + ")");

		var spotlightImg = $('#section-spotlight .a-container__media img').attr('src');
        $("#section-spotlight").css("background-image", "url(" + spotlightImg + ")");

        var featureartImg = $('#section-future-articles .a-container__media img').attr('src');
        $("#section-future-articles").css("background-image", "url(" + featureartImg + ")");

		$('#section-spotlight').parent('.a-container').addClass('pl-0 pr-0');
        $('#section-container-2021').parent('.a-container').addClass('remove-padding');
        $('#section-future-articles').parent('.a-container').addClass('remove-padding');
		$('#section-additional-articles').parent('.a-container').addClass('remove-padding');
        $('#section-spotlight-archiver').parent('.a-container').addClass('remove-padding');
		$('#section-news-video-main-title').parent('.a-container').addClass('add-background');
		$('#section-video-main-title').parent('.a-container').addClass('add-background');
		$('#section-more-spotlight').parent('.a-container').addClass('white-bg');
		$('#section-container-2021').parent('.a-container').addClass('white-bg');
        $('#section-additional-articles').parent('.a-container').addClass('white-bg');
        $('#section-spotlight-archiver').parent('.a-container').addClass('white-bg');
        $('#section_archives').parent('.m-hero').addClass('white-bg');
        $('#section_in-the-news').parent('.m-hero').addClass('white-bg');
		$('#section-future-articles').parent('.a-container').addClass('white-bg');
        $('#contact-us-info').parent('.text').addClass('white-bg');
		$('#contact-us-info').parent('.text').addClass('remove-text-margin');
     	$('#contact-us-form').parent('.formcontainer').addClass('white-bg');
		$('#contact-us-form').parent('.formcontainer').addClass('remove-text-margin');
		$('#section-contact-us-thanks-container').parent('.a-container').addClass('white-bg');
		$('#section-contact-us-main-container').parent('.a-container').addClass('white-bg');
        $('#section-in-the-news').parent().addClass('remove-padding');
        $('#section-archives').parent('.a-container').addClass('remove-padding');
        $('#section-feature').parent('.a-container').addClass('pl-0 pr-0');
		$('#section-achievement_desc_20').parent().addClass('container-100');

		

		const mediaQuery = window.matchMedia('(min-width: 300px) and (max-width: 1024px)');
		

 		if (mediaQuery.matches) { 

		/*---------------Home-Mobile----------------*/

            var healthCareBg = $('#section_healthcare-excellence-container .m-hero__image img').attr('src');
        	$("#section_healthcare-excellence-container").css("background-image", "url(" + healthCareBg + ")");
			$('#section_healthcare-excellence-container').parent('.m-hero--short').addClass('remove-padding');

			var learnMoreImg = $('#section_learn-more-banner .m-hero__image img').attr('src');
        	$("#section_learn-more-banner").css("background-image", "url(" + learnMoreImg + ")");


			var modernHealthImg = $('#section-modern-healthcare-container .a-container__media img').attr('src');
       	 	$("#section-modern-healthcare-container").css("background-image", "url(" + modernHealthImg + ")");
            $('#section-modern-healthcare-container').parent('.a-container').addClass('remove-padding');

			var sectionLinkdinImg = $('#section-linkdin-comp-container .a-container__media img').attr('src');
       	 	$("#section-linkdin-comp-container").css("background-image", "url(" + sectionLinkdinImg + ")");
			$('#section-linkdin-comp-container').parent('.a-container').addClass('remove-padding');

			/*---------------News-Mobile----------------*/
            var inboxBg = $('#section_univants-healthcare-excellence .m-hero__image img').attr('src');
        	$("#section_univants-healthcare-excellence").css("background-image", "url(" + inboxBg + ")");

        	$('#section-feature').parent('.a-container').addClass('pl-0 pr-0');
			$('#section_univants-healthcare-excellence').parent('.m-hero--short').addClass('remove-padding');

  		}
        const mediaQuery1 = window.matchMedia('(min-width: 480px) and (max-width: 1024px)')
        if (mediaQuery1.matches) {
			$('#section_learn-more-banner').parent('.m-hero--short').addClass('remove-padding');
        }
        });
})(jQuery);
