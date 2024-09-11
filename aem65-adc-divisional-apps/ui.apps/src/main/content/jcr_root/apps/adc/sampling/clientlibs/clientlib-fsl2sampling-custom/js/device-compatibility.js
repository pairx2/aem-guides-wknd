/**
 * Device Compatibility
**/
$(document).ready(function () {

	/** set accessCode cookie **/
	let acodeParam = getUrlParameter('zugangscode');
	if(acodeParam && acodeParam !== "") {
		setCookie('accessCode', acodeParam, '');
	}

	/** device compatibility - dynamic check **/
	var fsl2landingpage = $('#fsl2DeviceCompatibility'); //check if page has id element
	if (fsl2landingpage.length > 0 && wcmmodeOff) {
		$('#page-spinner').css('display', 'block');
		setTimeout(function () {
			$('#fsl2-smartphone-check').find('button.btn[type="submit"]').trigger('click');
		}, 500);
	}
	

});
