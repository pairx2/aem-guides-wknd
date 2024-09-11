let siteEnterWcmmode = $("#site-entering-popup-content").attr("data-wcm-edit-mode");
let siteEnterPopupRequiredCheck = $("#site-entering-popup-content").attr("data-site-entering-popup-required");
let alreadyVisitedSite;
let contentmodalId = '#site-entering-popup-content';
let modalIdName = 'siteEnteringPopupFragmentPath_Site';
let modalId = '#'+modalIdName;
let popupContentWrapper = document.querySelector(contentmodalId);
let geoApi = $("#site-entering-popup-content").attr("data-api-url");
let siteCountry = $("input[name='x-country-code']").val().toString().toUpperCase();
let popupFooterContent = "";
let template;

function generateTemplate() {
	let popupContent, templateModalStr = [];
	// Remove container from xf-page and add to modal-footer.
	popupContentWrapper.querySelector('.m-popup-content')?.querySelector('section.a-container')?.querySelectorAll('div.a-container__column')?.forEach(function (ele) {
		ele.remove();
		popupFooterContent += ele.innerHTML;
	});

	popupContent = popupContentWrapper.querySelector('.m-popup-content').innerHTML;

	templateModalStr.push('<div class="modal generic-modal" tabindex="-1" role="dialog" id="' + modalIdName + '" data-js-component="pop-up">');
	templateModalStr.push('<div class="modal-dialog modal-dialog-centered" role="document">');
	templateModalStr.push('<div class="modal-content generic-modal__content">');
	templateModalStr.push('<div class="modal-header generic-modal__header">');
	templateModalStr.push('<span class="generic-modal--close" data-dismiss="modal" aria-label="Close">');
	templateModalStr.push('<i aria-hidden="true" class="abt-icon abt-icon-cancel"></i>');
	templateModalStr.push('</span>');
	templateModalStr.push('</div>');
	templateModalStr.push('<div class="modal-body generic-modal__content-body">');
	templateModalStr.push(popupContent);
	templateModalStr.push('</div>');
	templateModalStr.push('<div class="modal-footer generic-modal__content-footer">' + popupFooterContent + '</div>');
	templateModalStr.push('</div>');
	templateModalStr.push('</div>');
	templateModalStr.push('</div>');

	template = templateModalStr.join('');
}

function updateModalContent() {
	//  If the siteEnteringPopupFragmentPathModal modal is not present only then create the template
	if (!document.querySelector(modalId)) {
		generateTemplate();

		let parser = new DOMParser(), html = parser.parseFromString(template, 'text/html').querySelector('body').childNodes[0];

		if (popupContentWrapper.querySelector('img')) {
			html.classList.add('generic-modal--image');
			html.querySelector('img').classList.add('generic-modal__image-link');
			html.querySelector('img').closest('div').classList.add('generic-modal__image');
		}

		let bodyElem = document.querySelector('body');
		bodyElem.appendChild(html);
		bodyElem.querySelector(contentmodalId).remove();
	}
}
function getDisclaimerStorage(key) {
	let now = Date.now();  //epoch time, lets deal only with integer
	// set expiration for storage
	let expiresIn = localStorage.getItem(key+'_expiresIn');
	if (expiresIn===undefined || expiresIn===null) { expiresIn = 0; }
	if (expiresIn < now) {// Expired
		removeDisclaimerStorage(key);
		return null;
	} else {
		try {
			let value = localStorage.getItem(key);
			return value;
		} catch(e) {
			return null;
		}
	}
}
function removeDisclaimerStorage(name) {
	try {
		localStorage.removeItem(name);
		localStorage.removeItem(name + '_expiresIn');
	} catch(e) {
		return false;
	}
	return true;
}
function setDisclaimerStorage(key, value, expires) {
	if (expires===undefined || expires===null) {
		expires = '';  // default: seconds for 1 day
	} else {
		expires = Math.abs(expires); //make sure it's positive
	}
	let now = Date.now();  //millisecs since epoch time, lets deal only with integer
	let schedule = now + (expires * 1000 * 60 * 60 * 24) ; 
	try {
		localStorage.setItem(key, value);
		if(expires > 0 && expires != ''){
			localStorage.setItem(key + '_expiresIn', schedule);
		}
	} catch(e) {
		return false;
	}
	return true;
}

function backdropshow() {
	if(!$(".modal-backdrop").length) {
		$("body").append('<div class="modal-backdrop show"></div>');
	}
	else {
		$(".modal-backdrop").show();
	}
}

function showSiteEnterPopup(data) {
	let geoCountry = data.response.countryCode.toUpperCase();
	let cvIntDiscLSName = "alreadyVisitedSite";
	if (alreadyVisitedSite == "") {
		alreadyVisitedSite = [];
	}
	alreadyVisitedSite.push(siteCountry);
	let createResponse = $("[name='data-create-cookie-response']").val();
	let expiryPeriod = $("[name='data-cookie-expire-period']").val();
	if(createResponse == 'true' || createResponse == '' || createResponse == null || createResponse == undefined) {
		setDisclaimerStorage(cvIntDiscLSName, alreadyVisitedSite.toString(), expiryPeriod);
		setTimeout(function() {
			$("#site_disclaimer_confirm_btn").on('click', function(event){
				$(modalId).modal('hide');
			});
		}, 500);
	}
	else if(createResponse == "false") {
		setTimeout(function() {
			$("#site_disclaimer_confirm_btn").on('click', function(event){
				setDisclaimerStorage(cvIntDiscLSName, alreadyVisitedSite, expiryPeriod);
				$(modalId).modal('hide');
			});
		}, 500);
	}
	if (geoCountry == siteCountry) {
		updateModalContent();
		backdropshow();
		$(modalId).css("padding-right","17px").addClass('show').attr("aria-modal","true").show();
	}
	$(document).on('click','[data-dismiss="modal"]',function(){
		if($(this).closest(".modal").attr("id") === modalIdName) {
			if($(".modal-backdrop").length) {
				$(".modal-backdrop").hide();
			}
			$(modalId).css("padding-right","").removeClass('show').removeAttr("aria-modal").hide();
		}
	});
}
$(function () {
	if(siteEnterWcmmode == 'false' && siteEnterPopupRequiredCheck == 'true') {
		alreadyVisitedSite = "";
		if (localStorage.getItem('alreadyVisitedSite') != null) {
			alreadyVisitedSite = localStorage.getItem('alreadyVisitedSite').split(',');
        }
		if(!alreadyVisitedSite.includes(siteCountry) && alreadyVisitedSite == "") {
			fetch(geoApi, {
				headers: {
					'X-Application-Id' : $('[name="x-application-id"]').val(),
					'X-Country-Code' : $('[name="x-country-code"]').val().toUpperCase(),
					'X-Preferred-Language' : $('[name="x-preferred-language"]').val()
				}
			}).then((resp) => resp.json())
			  .then(function (data) {
				showSiteEnterPopup(data);
			}.bind());
		}
	}
});

$(document).ready(function(){
	// site entering popup appears whenever users visit the website
	let popupIdVisible = $("#popup-onload").length;
	if(popupIdVisible){
		localStorage.removeItem('alreadyVisited');
	}
	// site entering popup appears only once when user visits the website per session
	let flag = $("#popup-per-session").length;
	
	if( !sessionStorage.getItem('CurrentSession') && flag){
		localStorage.removeItem('alreadyVisited');
		sessionStorage.setItem('CurrentSession','isOn');
	}
});