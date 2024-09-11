function getCVDisclaimerCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function setCVDisclaimerCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";"+expires+";path=/";
}
function getTenderDiscUrlParam(name) {
  return (location.search.split(name + '=')[1] || '').split('&')[0];
}

function displaySiteSectionDisclaimer() {

	var country = document.getElementsByName("x-country-code")[0]?.value?.toLowerCase();
	var siteSectionPopupHCPCV = $("#site-section-popup-content");

	if(siteSectionPopupHCPCV.length > 0 && country){
		var cvIntDiscCookieName = "AbbottCardioVaScuLarHCPDisC"+"-"+"cv"+"-"+country;
		var cvIntDisc = getCVDisclaimerCookie(cvIntDiscCookieName);

		var isEditMode = $("#site-section-popup-content").data("wcm-edit-mode");

		if(cvIntDisc == '' && !isEditMode){
			$("#site-section-popup-content").css("display", "block");
			$("#section_disclaimer_confirm_btn").on('click', function(event){

				setCVDisclaimerCookie(cvIntDiscCookieName, 'Yes', 1);
				$("#site-section-popup-content").css("display", "none");
			});
		}
	}
}
function displayTenderProductImageDisclaimer() {
	
	var tenderProductDisclaimerElement= $("#tender-product-disclaimer-item");
	if(tenderProductDisclaimerElement.length >0){
		var disclaimerPlaceholder= $("#tender-product-disclaimer-palceholder");
		if(tenderProductDisclaimerElement && disclaimerPlaceholder){
			disclaimerPlaceholder.replaceWith(tenderProductDisclaimerElement);
			$("#tender-product-disclaimer-content").css("display", "block");
		}
		
		$("#tender-product-disclaimer-content #acceptLinkId").on('click', function(event){
            var date = new Date();
            date.setTime(date.getTime()+(5*1000));
            var disclaimerUrl="";
    
            var tenderImgUrl = getTenderDiscUrlParam('tenderUrl');
            
            if (tenderImgUrl) {
    
                disclaimerUrl = document.location.origin + "/content/dam/cv/cardiovascular/tender-product-images/" + tenderImgUrl;
    
                document.cookie = "AbbottTenderImages="+tenderImgUrl+"; path=/;expires="+date.toGMTString();
                $('#tender-product-disclaimer-content #acceptLinkId').attr("download", "")
                $('#tender-product-disclaimer-content #acceptLinkId').attr("href",disclaimerUrl);
    			$('#tender-product-disclaimer-content').css("display", "none");
            }
        });
	}
}
$(document).ready(function () {
	var country = document.getElementsByName("x-country-code")[0]?.value?.toUpperCase();
	if(($('#site-entering-popup-content[data-site-entering-popup-required="true"]').length > 0 && (localStorage.getItem('alreadyVisited')?.indexOf(country) >= 0 && localStorage.getItem('alreadyVisited') != null)) || $('#site-entering-popup-content[data-site-entering-popup-required="false"]').length > 0){
		displaySiteSectionDisclaimer();
	}

	setTimeout(function () {
		 $("#site_disclaimer_confirm_btn").on('click', function(){
		 	displaySiteSectionDisclaimer();
	 	});
	}, 1500);
	displayTenderProductImageDisclaimer();		
});