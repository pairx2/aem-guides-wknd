$(document).ready(function(){
	if ($("#site-map").length) {
		$("#site-map.cmp-container").closest('.container').addClass('siteMapContainer');
		 if (UserLoginValidCheck()) {
        	$(".siteMapContainer #site-map .m-custom-list__heading div#user-registration-link").hide();
    	}
		else{
			$(".siteMapContainer #site-map .m-custom-list__heading div#user-registration-link").show();
		}
	}
});
