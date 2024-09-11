(function($) {
	checkScreenSize();

	function checkScreenSize() {
		var newWindowWidth = $(window).width();
		$('#section-guidance').parent('.a-container').addClass('remove-margin');
		$('#section_apply-hero-notifyme').parent('.m-hero').addClass('remove-bottom-margin');
		$('#section_apply-carousel-banner').closest('#pageContent').addClass('remove-margin-bottom-top');

		if (newWindowWidth < 768) {
			$('#section-apply-guidance-doc').parent('.container').addClass('remove-padding');
			$('#apply-unify-univants').parent('.experiencefragment').addClass('add-padding-top');
		}
		if ((newWindowWidth > 768) && (newWindowWidth < 1181)) {
			$('#apply-unify-univants').parent('.experiencefragment').addClass('remove-padding');
		}

		$("#apply-menu .m-mega-menu__sub-list:first-child a").click(function(e) {
			$('html, body').animate({
				scrollTop: $("#section_apply-carousel-banner").offset().top - 500
			}, 1000);
			e.preventDefault();
		});
		$("#apply-menu .m-mega-menu__sub-list:nth-child(2) a").click(function(e) {
			$('html, body').animate({
				scrollTop: $("#section-guidance").offset().top - 650
			}, 1000);
			e.preventDefault();
		});
	}
	$("#section-guidance").parent().addClass('document-bg');
	var docback = $('#section-guidance .a-container__image img').attr('src');
	$(".document-bg").css("background", "url(" + docback + ")");

	$("#section_apply-hero-notifyme").parent().addClass('team-bg');
	var notifymeback = $('#section_apply-hero-notifyme .m-hero__image img').attr('src');
	$(".team-bg").css("background", "url(" + notifymeback + ")");
	
	$('#section_apply-hero-notifyme').parent('.m-hero').addClass('reduce-banner-height');
	$("#section-key_dates_container").parent().addClass('white-bg');

})(jQuery);
