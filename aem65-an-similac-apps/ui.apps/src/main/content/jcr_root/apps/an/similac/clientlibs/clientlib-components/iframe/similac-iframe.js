window.addEventListener("message", function(e) {
	var mBirthForm =$('#multiple-birth-form');
	var ev=e.data;
	if (typeof ev === 'object' && typeof ev.birthPageHeight !== 'undefined') {
		var iframeHeight = e.data.birthPageHeight;
		if(navigator.userAgent.toLowerCase().indexOf('chrome') === -1 || navigator.userAgent.toLowerCase().indexOf('edge') > -1) {
			iframeHeight -= 1;
		}
		mBirthForm.css('height', iframeHeight + 'px');
		setiframeHeight();
	}

	else if (typeof ev === 'object' && typeof ev.eventTracking !== 'undefined' && ev.eventTracking.eventCategory !== ""
	&& ev.eventTracking.eventAction !== "" && ev.eventTracking.eventLabel !== "") {
		if (ev.eventTracking.eventLabel === "registration-submit-multiples") {
			window.location.href = "/multiplesprogram-thankyou?from\x3dmultiples-registration";
		}
	}

	else if (typeof ev === 'object' && typeof ev !== 'undefined') {
		var scrollTopPos = mBirthForm.offset().top;
		$("html, body").animate({
			scrollTop: scrollTopPos
		}, "slow");
	}
});

window.addEventListener('load', function (e) {
	setiframeHeight();
});

function setiframeHeight() {
	var mBirthForm =$('#multiple-birth-form');
	var iframeHeight = mBirthForm.height();
	mBirthForm.css('height', (iframeHeight + 1) + 'px');
	if (iframeHeight < 1000) {
		setTimeout(function () {
			setiframeHeight();
		}, 500);
	}
}
