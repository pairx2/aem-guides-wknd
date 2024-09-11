/*Alert carousel sticky start*/
let loyaltyAlert = $("#my-alert-banner");
function loyaltyAlertHeight() {
	setTimeout(function() {
		if(loyaltyAlert.length && !loyaltyAlert.closest(".m-alert--wrapper").hasClass("m-alert--hide")) {
			$('[data-js-component="header"]').css("margin-top",loyaltyAlert.closest(".m-alert--wrapper").height());
			$('[data-sticky="true"]').css("top",loyaltyAlert.closest(".m-alert--wrapper").height());
		}
	}, 500);
}
$(document).ready(function () {
	if($(".m-alert--wrapper").length && $('[name="showAlert"]').length && $('[name="showAlert"]').val().toLowerCase() == 'refresh') {
		if($(".m-alert--wrapper").find("#my-alert-banner").length && getCookie('alert-close-success') != undefined) {
			document.cookie = 'alert-close-success=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		}
	}
	loyaltyAlertHeight();
	if(loyaltyAlert.length) {
		loyaltyAlert.closest(".m-alert--wrapper").find(".m-alert__close-icon").click(function(){
			$('[data-js-component="header"]').removeAttr("style");
			$('[data-sticky="true"]').css("top",0);
			$('[data-sticky="true"]').css("transition", "all 0.3s ease-in-out");
		});
	}
});
$(window).on('resize', function(){
	loyaltyAlertHeight();
});
$(window).on( "scroll", function() {
	if(loyaltyAlert.length && !loyaltyAlert.closest(".m-alert--wrapper").hasClass("m-alert--hide")) {
		if($('[data-sticky="true"]').hasClass("sticky")) {
			$('[data-sticky="true"]').css("top",loyaltyAlert.closest(".m-alert--wrapper").height());
		}
		else {
			if($('[data-sticky="true"]').attr("style")) {
				$('[data-sticky="true"]').removeAttr("style");
			}
		}
	}
});
/*Alert carousel sticky end*/