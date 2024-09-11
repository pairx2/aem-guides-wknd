(function($) {
	$(document).ready(function() {
		checkScreenSize();

		function checkScreenSize() {
			var newWindowWidth = $(window).width();

			if (newWindowWidth > 767 && newWindowWidth < 1181) {
				$('#section_Hero-banner-wrapper').parent('.m-hero').addClass('banner-wrapper');

			}



			if (newWindowWidth < 1024) {
				$('#section-privacy-policy-singlebanner').parent('.container').addClass('padding-top-0 privacy-height');

			}
			$('#section-privacy-policy-singlebanner').parent('.container').addClass('padding-btm-0');
			$('#privacy-policy-asia-pacf').parent('.title').addClass('margin-btm-0');

		}
	});
})(jQuery);