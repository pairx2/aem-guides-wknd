var xApplicationId, xCountryCode, xPreferredLanguage;

$(document).ready(function() {

	xApplicationId = $('input[name="x-application-id"]').val();
	xCountryCode = $('input[name="x-country-code"]').val();
	xPreferredLanguage = 'en_US';

	$('#login-form-container, #createaccount-form-container, #password-assistance-container, #profile-access-button, #password-reset-container,#middle-content-page,#section-home-bg-container').parents('body').prepend("<div class='loader-parent' style='display: none;'><em class='abt-icon abt-icon-spinner'></em></div>");
	$('.linkstack').children().children('.m-link-stack__link').find('a.a-link__text').append('<em class="abt-icon abt-icon-avatar"></em>');


	/*User-Profile */
	$("#section-profile-access-main").parent().addClass("profile-access");

	/* Error page */
	$("#section-middle-content-page,#bgimage-content-page").parent().addClass("error-access");

    /* abbott logo redirection*/
    $(".a-logo-comp--link").removeAttr("target");
	$(".a-logo-comp--image").parent(".a-logo-comp--link").removeAttr("href");
    $(".a-logo-comp--image").click(function(){
        var token_id = getCookie('id.token');
        if(token_id == 0){
			window.location.href = "/login.html";
		}else{
			window.location.href = "/secure/home.html";
		}
    });




	/* Remove open in new tab for user profile */
	$('.m-mega-menu__mobile-item-wrapper:nth-child(3) .m-link-stack__container li:first-child a').removeAttr('target');

	/* Home */
	$('#section-home-content').parent('.container').addClass('home-page-container');
	$('#section-home-bg-container').parent('.container').addClass('home-page-bg-container');

	/* sub menu */
	$('.m-mega-menu__nested-menu').find('.a-link:nth-child(3)').addClass('subMenuList').children('a').append('<span><em class="abt-icon abt-icon-expand"></em></span>');
	$('.m-mega-menu__nested-menu').find('.a-link:nth-child(7)').addClass('subMenuList').children('a').append('<span><em class="abt-icon abt-icon-expand"></em></span>');
    $('.m-mega-menu__mobile-products').find('.m-mega-menu__mobile-item:nth-child(3)').children('a').append('<span class="mobile_icon"><em class="abt-icon abt-icon-expand"></em></span>');
    $('.m-mega-menu__mobile-products').find('.m-mega-menu__mobile-item:nth-child(7)').children('a').append('<span class="mobile_icon"><em class="abt-icon abt-icon-expand"></em></span>');

	/*hiding the header menus */
	if (window.location.href.indexOf("securePage") >= 0 || window.location.href.indexOf("secure") >= 0 || window.location.href.indexOf("home") >= 0) {
		$('.o-header__mega-menu').show();
	}
	$(".error-access").parent().parents("#pageContent").next(".abbott-wrapper").addClass("error-footer-content");


	/* technical library pages*/
	/* page id */
	$('#pageContainer-applicationPackage, #pageContainer-customerSupportingMaterials, #pageContainer-calibrationFiles,#pageCantainer-certificatesAnalysis,#pageContainer-operationsManuals, #pageContainer-controlFiles, #pageContainer-instructionforuse').addClass('pageContainer-technicalLibrary');
	/* right side card id  */
	$('#applicationPackage-card0,#certificationOA-card0,#operations-manuals-card0, #calibrationFiles-card0, #controlFiles-card0, #intructionforuse-card0, #cutomer-support-card0').addClass('technicalLibrary-popup');
	/* button mobile search id */
	$('#btn-mobile-searchOption,#certification-mobile-searchOption,#operations-mobile-searchOption, #btn-mobile-calibration, #btn-mobile-controlFiles, #btn-mobile-intructionforuse, #btn-mobile-customerSupport').addClass('btn-mobile-searchOption');
	/* mobile modal id  */
	$('#application-insert,#certificates-of-analysis-popup,#operations-manuals-popup, #calibrationFiles, #customer-support-popup, #control-file-popup, #instructionForUse-popup').addClass('main-modal');
	/* Sorted List Id */
	$('#sortedList,#certificates-sortedList,#operations-sortedList, #sortedby-lotnumber, #sortedby-listnumber').parent().addClass('sortedListText');

	$('.btn-mobile-searchOption').parents('.button').addClass('btn-mobile-parentSearchOption');
	$('.pageContainer-technicalLibrary').parents('section').parent().addClass('container-technicalLibrary');
	$('.pageContainer-technicalLibrary').children().children().addClass('subContainer-technicalLibrary');
	$('.subContainer-technicalLibrary').children().children().siblings('.columncontrol__column').addClass('columncontrolTechLibrary');
	$('.technicalLibrary-popup').find('.col-lg-9').children().siblings('.text:nth-child(2)').addClass('text-option1');
	$('.technicalLibrary-popup').find('.col-lg-9').children().siblings('.text:nth-child(3)').addClass('text-option2');
	$('.technicalLibrary-popup').find('.col-lg-9').children().siblings('.text:nth-child(4)').addClass('text-option2 border-lefts');
	$('.technicalLibrary-popup').find('.col-lg-9').children().siblings('.text:nth-child(5)').addClass('text-option2 border-lefts');

	$('.technicalLibrary-popup').parent().addClass('oldClone');

	$('.main-modal').parents('section').addClass('section-modal');
	$('.section-modal').parent().addClass('container-modal');
	$('.col-lg-3.columncontrolTechLibrary').find('.options:last-child ul').css('height','110px');
	$('#form-radio-option, #form-radio-option1').addClass('form-radio-option').parents('section').parent().addClass('formOption-container');
	$('#form-radio-option, #form-radio-option1').addClass('form-radio-option').parents('section').parent().addClass('formOption-container');
	if ($(window).width() <= 767) {
		$('.technicalLibrary-popup').children().children().siblings('.col-md-9').removeClass('col-12').addClass('col-12');
		$('.technicalLibrary-popup').children().children().siblings('.col-md-3').removeClass('col-12').addClass('col-12');
	}

	$('#sortedby-listnumber').parent().addClass('text-sortedby-listnumber');
	$('#sortedby-lotnumber').parent().addClass('text-sortedby-lotnumber');
	$('#sortedby-listnumber').hide();
	if ($('#form-radio-option').find('.a-radio__input').val() == "LotNumber") {
		$('#form-radio-option').find('.a-radio__custom').addClass('radio-custome-after');
		$('#list-number, #list-number-mob').hide();
		$('#list-number, #list-number-mob').parents('.fields').hide();
		$('#form-radio-option input').parents('.columncontrolTechLibrary').siblings('.columncontrolTechLibrary').find('#sortedby-lotnumber').hide();
	}

	$('#text-lot-variable, #text-list-variable').parent().addClass('textlotVaribale');
	$(document).on("click", ".form-radio-option input", function() {
		var radiomeasureValue = $(this).val();
		if (radiomeasureValue == 'LotNumber') {
			$(this).parents('#form-radio-option').find('span.a-radio__custom').addClass('radio-custome-after');
			$(this).parents('#form-radio-option').parents('.formOption-container').siblings('.formOption-container').find('#form-radio-option1').find('span.a-radio__custom').removeClass('radio-custome-after');
			$('#list-number, #list-number-mob').hide();
			$('#list-number, #list-number-mob').parents('.fields').hide();
			$('#lot-number, #lot-number-mob').show();
			$('#lot-number, #lot-number-mob').parents('.fields').show();
            $('#list-number').val('');
		} else if (radiomeasureValue == 'ListNumber') {
			$(this).parents('#form-radio-option1').find('span.a-radio__custom').addClass('radio-custome-after');
			$(this).parents('#form-radio-option1').parents('.formOption-container').siblings('.formOption-container').find('#form-radio-option').find('span.a-radio__custom').removeClass('radio-custome-after');
			$('#lot-number, #lot-number-mob').hide();
			$('#lot-number, #lot-number-mob').parents('.fields').hide();
			$('#list-number, #list-number-mob').show();
			$('#list-number, #list-number-mob').parents('.fields').show();
            $('#lot-number').val('');
		}
	});

	/*hide background image in mobile*/
	$('#createaccount-form-container').parents().find("section").addClass("form-container-pages");
	$('#login-form-container').parents().find("section").addClass("form-container-pages");
	$('#password-assistance-container').parents().find("section").addClass("form-container-pages");
	$('#password-reset-container').parents().find("section").addClass("form-container-pages");

	/*common style added for forms*/
	$('#createaccount-form-container,#login-form-container,#password-assistance-container,#password-reset-container,#middle-content-page').addClass('loginRegPwdForms');

	/* for reset password popup */
	$("#tooltip-pop-up").addClass("tooltip-container");
	$("#section-tooltip-pop-up").addClass("tooltip-container-section");

	/* for error messages */
	$('#register-api-error').hide();
	$('#login-api-error').hide();
	$('#save-changes').hide();

	/*Email and Confirm Email match */
	var emailField = $("input[name='email']");
	var confirmEmailField = $("input[name='emailConfirm']");
	var inputTextRequire = ".a-input-field--text-require";
	var inputTextError = ".a-input-field--text-error";
	var n_form_grp = ".a-form-grp";
	emailField.keyup(function() {
		if (confirmEmailField.val() === emailField.val() && confirmEmailField.val() !== "") {
			confirmEmailField.parents(n_form_grp).removeClass('validation-error');
			confirmEmailField.parents(n_form_grp).find(inputTextError).hide();
			confirmEmailField.parents(n_form_grp).find(inputTextRequire).hide();

		} else if (confirmEmailField.val() !== emailField.val() && confirmEmailField.val() !== "") {
			confirmEmailField.parents(n_form_grp).addClass('validation-error');
			confirmEmailField.parents(n_form_grp).find(inputTextRequire).show();
			confirmEmailField.parents(n_form_grp).find(inputTextError).hide();
		}

	});

	confirmEmailField.keyup(function() {
		if (confirmEmailField.val() === emailField.val() && confirmEmailField.val() !== "") {
			confirmEmailField.parents(n_form_grp).removeClass('validation-error');
			confirmEmailField.parents(n_form_grp).find(inputTextError).hide();
			confirmEmailField.parents(n_form_grp).find(inputTextRequire).hide();

		} else if (confirmEmailField.val() !== emailField.val() && confirmEmailField.val() !== "") {
			confirmEmailField.parents(n_form_grp).addClass('validation-error');
			confirmEmailField.parents(n_form_grp).find(inputTextRequire).show();
			confirmEmailField.parents(n_form_grp).find(inputTextError).hide();
		}

	});

	/* add id to userprofile link */
	$('.o-header .o-header__wrapper .o-header__mega-menu .m-link-stack__dropdown-wrapper ul li a[aria-label="USER PROFILE"]').attr("id", "showUserProfile");
	$("#pageContent").next().addClass("diagnosticFooter");
	$("#pageContent").closest(".abbott-wrapper").addClass("diagnosticHeader");
	$('.abbott-wrapper:nth-child(1)').addClass("diagnosticHeader");    

});

/* remove target blank in User profile */
$('.o-header__mega-menu .m-link-stack__container li a').removeAttr('target');
/* Logout */



$('#logout').click(function(e) {
	e.preventDefault();
	$('.loader-parent').show();
	logouttrigger();
});
window.addEventListener('hashchange', function() {
	if (location.hash === '#logout') {
		$('.loader-parent').show();
		logouttrigger();
	}
}, false);

const myTimeout = setTimeout(loadingPopUp, 1000);

function loadingPopUp() {
	$('.main-modal').parent().closest('.modal-dialog').parent().addClass('btn-modal');
	$('.tooltip-container').parent().closest('.modal-dialog').parent().addClass('tool-tip-modal');
	$('.main-modal').find('#form-radio-option .a-radio__custom').addClass('radio-custome-after');
	$('#lot-number-pop, #list-number-pop, #lot-numberInstruction-pop, #list-numberInstruction-pop, #tooltip-pop-up-lotNumber').parents('.modal').addClass('lotVariablePop');
	if ($(window).width() <= 767) {
		$('#btn-mobile-intructionforuse-modal, #btn-mobile-calibration-modal, #btn-mobile-controlFiles-modal, #certification-mobile-searchOption-modal').removeClass('lotVariablePop');

		$('#tooltip-lotNumber').wrap(' <div class="modal generic-modal" id="tooltiplotNumber"><div class="modal-dialog modal-dialog-centered"><div class="modal-content generic-modal__content"><div class="modal-body generic-modal__content-body"></div></div></div></div>');
		$('<div class="modal-header generic-modal__header"><span class="generic-modal--close"><i aria-hidden="true" class="abt-icon abt-icon-cancel"></i></span></div>').insertBefore('#tooltip-lotNumber');
		$('#tooltip-lotNumber').closest('body').append('<div class="modal-backdrop show"></div>');
		$('#tooltip-lotNumber').closest('body').find('.modal-backdrop.show').hide();

		$('#tooltip-listNumber').wrap(' <div class="modal generic-modal" id="tooltiplistNumber"><div class="modal-dialog modal-dialog-centered"><div class="modal-content generic-modal__content"><div class="modal-body generic-modal__content-body"></div></div></div></div>');
		$('<div class="modal-header generic-modal__header"><span class="generic-modal--close"><i aria-hidden="true" class="abt-icon abt-icon-cancel"></i></span></div>').insertBefore('#tooltip-listNumber');
		$('#tooltip-listNumber').closest('body').append('<div class="modal-backdrop show"></div>');
		$('#tooltip-listNumber').closest('body').find('.modal-backdrop.show').hide();

		$('#tooltiplotNumber, #tooltiplistNumber').addClass('tooltip-modal');
		$('.formOption-container, #certification-mobile-searchOption-modal').find('.a-tooltilp__wrapper').siblings('.tooltip.fade').remove();
		$(document).on("click", "#form-radio-option .tooltips, #certification-mobile-searchOption-modal .a-tooltilp__wrapper", function(e) {
			e.preventDefault();
			$('#tooltiplotNumber').show();
			$('#tooltip-lotNumber').closest('body').find('.modal-backdrop.show').show();
		});
		$(document).on("click", "#form-radio-option1 .tooltips", function(e) {
			e.preventDefault();
			$('#tooltiplistNumber').show();
			$(' #tooltip-listNumber').closest('body').find('.modal-backdrop.show').show();
		});
		$(document).on("click", ".tooltip-modal .generic-modal--close", function(e) {

			e.preventDefault();
			$('#tooltiplotNumber, #tooltiplistNumber').hide();
		});
	}
}


function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
}
$(document).on("keypress", function(event) {
	var keycode = event.keyCode || event.which;
	if (keycode == "13") {
		setTimeout(function() {
			($("button[type=submit]").not("[disabled=disabled]")).each(function() {
				$(this).click();
			});
		}, 500);
	}
});

$("#createaccount-form-container .a-dropdown__field").parent().next().prepend('<em class="abt-icon abt-icon-exclamation"></em>');
$('#createaccount-form-container .a-dropdown__field').click(function(){
	console.log($(this).find(".a-dropdown-selected").length);    
    if($(this).find(".a-dropdown-selected").length<=0){
       	$(this).parents('.a-dropdown').addClass('validation-require');

       }	
});
$("#profile-access-main .a-dropdown__field").parent().next().prepend('<em class="abt-icon abt-icon-exclamation"></em>');
$('#profile-access-main .a-dropdown__field').click(function(){
	console.log($(this).find(".a-dropdown-selected").length);
    if($(this).find(".a-dropdown-selected").length<=0){
       	$(this).parents('.a-dropdown').addClass('validation-require');

       }	
});

$('#applicationPackage-card0, #calibrationFiles-card0, #controlFiles-card0, #intructionforuse-card0, #operations-manuals-card0, #cutomer-support-card0, #certificationOA-card0').addClass('selectList-application');
$('.selectList-application:eq(0), #show-more-results, #sortedList, #error-no-result, #error-COA-lotNumber').hide();
$('#no-result').parent('.text').append('<p class="loader"></p>');
$('#techLib-download').addClass('techLib-download');
$('.options').find('.a-dropdown__field.active').parents('.a-dropdown').removeClass('validation-require')

$('#show-more-results').click(function() {
	$('<div class="showMoreBottomloader"><em class="abt-icon abt-icon-spinner"></em></div>').insertBefore('.a-button--lg');
	$('.a-button--lg').hide();

	var pageNumberval = sessionStorage.getItem('PageNumber')

	var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
	var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;

	const token = getCookie('id.token');
	var showMoreData = '';
	if ($('#applicationPackage-card0').attr('id') == 'applicationPackage-card0') {
		showMoreData = {
			"pagenumber": parseInt(pageNumberval) + 1,
			"searchtype": "appinsertsearch"
		};
	} else if ($('#calibrationFiles-card0').attr('id') == 'calibrationFiles-card0') {
		showMoreData = {
			"pagenumber": parseInt(pageNumberval) + 1,
			"searchtype": "calibratorsearch"
		};
	} else if ($('#intructionforuse-card0').attr('id') == 'intructionforuse-card0') {
		showMoreData = {
			"pagenumber": parseInt(pageNumberval) + 1,
			"searchtype": "ifuinsertsearch"
		};
	} else if ($('#controlFiles-card0').attr('id') == 'controlFiles-card0') {
		showMoreData = {
			"pagenumber": parseInt(pageNumberval) + 1,
			"searchtype": "controlsearch"
		}; 
	} else if ($('#operations-manuals-card0').attr('id') == 'operations-manuals-card0') {
		showMoreData = {
			"pagenumber": parseInt(pageNumberval) + 1,
			"searchtype": "opsmanual"
		};
	} else if ($('#cutomer-support-card0').attr('id') == 'cutomer-support-card0') {
		showMoreData = {
			"pagenumber": parseInt(pageNumberval) + 1,
			"searchtype": "customersupportmaterials"
		};
	}

	$.ajax({
		url: searchUserurlOrigin + '/api/public/search/sitesearch',
		type: "POST",

		data: JSON.stringify(showMoreData),
		"headers": {

			'x-preferred-language': 'en_US',
			'x-country-code': headerCountryCode,
			'x-application-id': headerApplicationId,
			"x-id-token": token,
			'Content-Type': 'application/json'
		},
		success: function(data) {
			$(".showMoreBottomloader").hide();
			$('.a-button--lg').show();

			sessionStorage.removeItem('PageNumber');
			sessionStorage.setItem('PageNumber', data.response.PageNumber);
			var counntt = data.response.PageNumber;

			var clonee = $('.oldClone:eq(0)').clone();
			$('.oldClone').parent('.columncontrolTechLibrary').addClass('test');
			clonee.insertAfter('.test .columncontrol:last');
			$('.test .columncontrol:last').removeClass('oldClone').addClass('newClone-' + counntt);

			if ($('#operations-manuals-card0').attr('id') == 'operations-manuals-card0') {
				var newresult4 = '';
				if ($('#operations-manuals-card0').attr('id') == 'operations-manuals-card0') {
					newresult4 = data.response.data.labelingDocumentCollection.nodes;
				} else if ($('#cutomer-support-card0').attr('id') == 'cutomer-support-card0') {
					newresult4 = data.response.data.customerSupportingMaterialCollection.nodes;
				}
				$.each(newresult4, function(index, valueCard) {
					cloneSearchCard1(index, valueCard, newresult4.length);
				});
			} else {
				$.each(data.response.Result, function(index, valueCard) {
					cloneSearchCard1(index, valueCard, data.response.Result.length, data.response.PageNumber);
				});
			}
		}
	});

	function cloneSearchCard1(index, valueCard, resultLength, counntt) {
		$('.newClone-' + counntt).find('.selectList-application:eq(' + index + ')').find('#part-number-text p span').text(' ');
		$('.newClone-' + counntt).find('.selectList-application:eq(' + index + ')').find('#list-number-text p span').text(' ');
		$('.newClone-' + counntt).find('.selectList-application:eq(' + index + ')').find('#search-language-text p span').text(' ');
		$('.newClone-' + counntt).find('.selectList-application:eq(' + index + ')').find('#lot-number-text p span').text(' ');
		$('.newClone-' + counntt).find('.selectList-application:eq(' + index + ')').find('#document-text p span').text(' ');
		/*represent of card depend on card*/

		/*file name*/
		$('.newClone-' + counntt).find('.selectList-application:eq(' + index + ')').find('#techLib-download').attr('name', 'techLib-download' + index);
$('.newClone-' + counntt).find('.selectList-application:eq(' + index + ')').find('#techLib-download b').remove();
        $('.newClone-' + counntt).find('.selectList-application:eq(' + index + ')').find('#techLib-download').each(function() {
			$(this).append('<b style="display:none;">' + valueCard.FileName + '</b>');
		});

		/*product Name*/
		$('.newClone-' + counntt).find('.selectList-application:eq(' + index + ')').find('#search-title-text').attr('name', 'search-title-text' + index);
		$('.newClone-' + counntt).find('.selectList-application:eq(' + index + ')').find('#search-title-text').each(function() {
			$(this).find('p strong').text(valueCard.ProductName)
		});

		/*Part Number*/
		$('.newClone-' + counntt).find('.selectList-application:eq(' + index + ')').find('#part-number-text').attr('name', 'part-number-text' + index);
		$('.newClone-' + counntt).find('.selectList-application:eq(' + index + ')').find('#part-number-text').each(function() {
			$(this).find('p').append('<span>' + valueCard.PartNumber + '</span>');
		});

		/*Lot number*/
		$('.newClone-' + counntt).find('.selectList-application:eq(' + index + ')').find('#lot-number-text').attr('name', 'lot-number-text' + index);
$('.newClone-' + counntt).find('.selectList-application:eq(' + index + ')').find('#lot-number-text p span').remove();
        $('.newClone-' + counntt).find('.selectList-application:eq(' + index + ')').find('#lot-number-text').each(function() {
			$(this).find('p').append('<span>' + valueCard.LotNumber + '</span>');
		});

		/*List number*/
		$('.newClone-' + counntt).find('.selectList-application:eq(' + index + ')').find('#list-number-text').attr('name', 'list-number-text' + index);
		$('.newClone-' + counntt).find('.selectList-application:eq(' + index + ')').find('#list-number-text p span').remove();
        $('.newClone-' + counntt).find('.selectList-application:eq(' + index + ')').find('#list-number-text').each(function() {
			$(this).find('p').append('<span>' + valueCard.ListNumber + '</span>');
		});

		var langcode = valueCard.LanguageCode;
		var lang = '';
		$("#document-lang-options ul li").each(function() {
			var mf = [];
			mf.push($(this).attr('data-optionvalue'));
			if (mf.includes(langcode)) {
				lang = $(this).find('span').text();
			}
		});
		/*Language*/
		$('.newClone-' + counntt).find('.selectList-application:eq(' + index + ')').find('#search-language-text').attr('name', 'search-language-text' + index);
$('.newClone-' + counntt).find('.selectList-application:eq(' + index + ')').find('#search-language-text p span').remove();
        $('.newClone-' + counntt).find('.selectList-application:eq(' + index + ')').find('#search-language-text').each(function() {
			$(this).find('p').append('<span>' + lang + '</span>');
		});

		/*document Id*/
		$('.newClone-' + counntt).find('.selectList-application:eq(' + index + ')').find('#document-text').attr('name', 'document-text' + index);
$('.newClone-' + counntt).find('.selectList-application:eq(' + index + ')').find('#document-text p span').remove();
        $('.newClone-' + counntt).find('.selectList-application:eq(' + index + ')').find('#document-text').each(function() {
			$(this).find('p').append('<span>' + valueCard.sys.documentId + '</span>');
		});
	}


});



function downloadFile(filename, data) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;base64,' + data);
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

function downloadPDFFile(filename, data) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;base64,' + data);
	element.setAttribute('download', filename + '.pdf');
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

$('#pageContainer-instructionforuse, #pageContainer-applicationPackage, #pageContainer-calibrationFiles, #pageCantainer-certificatesAnalysis, #pageContainer-controlFiles, #pageContainer-customerSupportingMaterials, #pageContainer-operationsManuals').parents('body').prepend("<div class='loader-parent' style='display: none;'><em class='abt-icon abt-icon-spinner'></em></div>");


$(document).on("click", ".techLib-download", function() {
	$(this).parents('body').find('.loader-parent').show();
	var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
	var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
	var token = getCookie('id.token');

	var fileId = $(this).children('b').text();
	var data1 = '';
    var url = '';
	if ($('#applicationPackage-card0').attr('id') == 'applicationPackage-card0') {
		data1 = {
			"action": "downloadappspec",
			"documentId": fileId
		};
		url = searchUserurlOrigin + '/quality/api/private/lookup/getdocument';
        commonTechLibPages(url, data1, headerCountryCode, headerApplicationId, token);
	} else if ($('#calibrationFiles-card0').attr('id') == 'calibrationFiles-card0') {
		data1 = {
			"action": "downloadcalibre",
			"documentId": fileId
		};
		url = searchUserurlOrigin + '/quality/api/private/lookup/getdocument';
        commonTechLibPages(url, data1, headerCountryCode, headerApplicationId, token);
	} else if ($('#intructionforuse-card0').attr('id') == 'intructionforuse-card0') {
		data1 = {
			"action": "downloadifu",
			"documentId": fileId
		};
		url = searchUserurlOrigin + '/quality/api/private/lookup/getdocument';
        commonTechLibPages(url, data1, headerCountryCode, headerApplicationId, token);
	} else if ($('#controlFiles-card0').attr('id') == 'controlFiles-card0') {
		data1 = {
			"action": "downloadcontrol",
			"documentId": fileId
		};
		url = searchUserurlOrigin + '/quality/api/private/lookup/getdocument';
        commonTechLibPages(url, data1, headerCountryCode, headerApplicationId, token);
	} else if ($('#cutomer-support-card0').attr('id') == 'cutomer-support-card0') {
		data1 = {
			"action": "downloadcustomersupport",
			"documentId": fileId
		};
		url = searchUserurlOrigin + '/api/private/lookup/getdocument';
        commonTechLibPagesCsmOp(url, data1, headerCountryCode, headerApplicationId, token);
	} else if ($('#operations-manuals-card0').attr('id') == 'operations-manuals-card0') {
		data1 = {
			"action": "downloadopsmanual",
			"documentId": fileId
		};
		url = searchUserurlOrigin + '/api/private/lookup/getdocument';
        commonTechLibPagesCsmOp(url, data1, headerCountryCode, headerApplicationId, token);
	} else if ($('#certificationOA-card0').attr('id') == 'certificationOA-card0') {
		data1 = {
			"action": "downloadDocument",
			"documentId": fileId
		};
		url = searchUserurlOrigin + '/api/private/lookup/getdocument';
        commonTechLibPages(url, data1, headerCountryCode, headerApplicationId, token);
	}

});

function commonTechLibPages(url, data1, headerCountryCode, headerApplicationId, token){
	$.ajax({
		url: url,
		type: "POST",

		data: JSON.stringify(data1),
		"headers": {

			'x-preferred-language': 'en_US',
			'x-country-code': headerCountryCode,
			'x-application-id': headerApplicationId,
			"x-id-token": token,
			'Content-Type': 'application/json',
			'Accept': 'application/pdf'
		},
		success: function(downloadResponse) {
            
			$('.loader-parent').hide();
			var encodeval = downloadResponse.response.attachmentBytes;
			const fileName = downloadResponse.response.downloadedDocumentId;
			const content = encodeval;
            let getAttachmentName = downloadResponse.response.attachmentName;
			const getPdf = getAttachmentName.split(".")[1];
            if(getPdf == 'pdf') {
				downloadPDFFile(fileName, content);
            }else {
				downloadFile(fileName, content);
            }
		}
	});
}

function commonTechLibPagesCsmOp(url, data1, headerCountryCode, headerApplicationId, token){
	$.ajax({
		url: url,
		type: "POST",

		data: JSON.stringify(data1),
		"headers": {

			'x-preferred-language': 'en_US',
			'x-country-code': headerCountryCode,
			'x-application-id': headerApplicationId,
			"x-id-token": token,
			'Content-Type': 'application/json',
			'Accept': 'application/pdf'
		},
		success: function(downloadResponse) {
            
			$('.loader-parent').hide();
			var storeSigned = downloadResponse.response.data.document.sys.url;
			saveAs(storeSigned);
		}
	});
}


function saveAs(uri) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        link.href = uri;
        link.setAttribute('download', true);

        //Firefox requires the link to be in the body
        document.body.appendChild(link);

        //simulate click
        link.click();

        //remove the link when done
        document.body.removeChild(link);
    } else {
        window.open(uri);
    }
}

$(document).on("click", "#reset-btn", function() {
	if ($(window).width() > 767) {
		$(this).parents('.columncontrolTechLibrary').siblings('.columncontrolTechLibrary').find('.selectList-application').not(':first').remove();
		$('.selectList-application:eq(0), .a-button--lg, #sortedList, #error-no-result, #sortedby-lotnumber, #sortedby-listnumber, #error-COA-lotNumber').hide();
		$('#no-result').show();
		$('.a-dropdown__field ').children('span').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text('Select Option');
		if ($('#form-radio-option').find('.a-radio__input').val() == "LotNumber") {
            $('#form-radio-option').find('.a-radio__custom').addClass('radio-custome-after');
            $('#list-number, #list-number-mob').hide();
            $('#list-number, #list-number-mob').parents('.fields').hide();
            $('#form-radio-option input').parents('.columncontrolTechLibrary').siblings('.columncontrolTechLibrary').find('#sortedby-lotnumber').hide();

			$('#form-radio-option1').find('span.a-radio__custom').removeClass('radio-custome-after');
			$('#lot-number, #lot-number-mob').show();
			$('#lot-number, #lot-number-mob').parents('.fields').show();
            $('#list-number').val('');
        }
    } else if ($(window).width() <= 767) {
		$(this).parents('.btn-modal').siblings('#pageContent').find('.selectList-application').not(':first').remove();
		$('.selectList-application:eq(0), .a-button--lg, #sortedList, #error-no-result, #sortedby-lotnumber, #sortedby-listnumber, #error-COA-lotNumber').hide();
		$('#no-result').show();
		$('.a-dropdown__field ').children('span').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text('Select Option');
		if ($('#form-radio-option').find('.a-radio__input').val() == "LotNumber") {
            $('#form-radio-option').find('.a-radio__custom').addClass('radio-custome-after');
            $('#list-number, #list-number-mob').hide();
            $('#list-number, #list-number-mob').parents('.fields').hide();
            $('#form-radio-option input').parents('.columncontrolTechLibrary').siblings('.columncontrolTechLibrary').find('#sortedby-lotnumber').hide();

			$('#form-radio-option1').find('span.a-radio__custom').removeClass('radio-custome-after');
			$('#lot-number, #lot-number-mob').show();
			$('#lot-number, #lot-number-mob').parents('.fields').show();
            $('#list-number').val('');
        }
    }

});


function disableSession() {
    return calldisableSession(false);
}

function logouttrigger() {
    var searchUserurl = new URL($('#session-api-url').val());
    var searchUserurlOrigin = searchUserurl.origin; 
    const action = searchUserurlOrigin + '/api/private/profile/logout';
    const token =  getCookie('id.token'); 
    $.ajax({
        "url": action,
        "method": "POST",
        "headers": {
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPreferredLanguage,
            "x-id-token": token
        }
    }).then(function(response) {
        disableSession();
        logoutClearData();
        redirectLogin();
    }).fail(function() {
        disableSession();
        logoutClearData();
        redirectLogin();
    });
}

function logoutClearData() {
    localStorage.clear();
    deleteCookie('id.token');	    
}
function redirectLogin() {
    window.location.href = "/login.html";
}
function calldisableSession(enable) {
var diagnosticPreferredLanguage = document.querySelector('input[name="x-preferred-language"]').value;
var diagnosticheaderCountryCode = document.querySelector('input[name="x-country-code"]').value;
var diagnosticheaderApplicationId = document.querySelector('input[name="x-application-id"]').value;
	
    const action = '/api/private/profile/session';  
    return $.ajax({
        "url": action + "?enable=" + enable,
        "method": "GET",
        "async": false,
        "headers": {
            'Content-Type': getRequestHeader('Content-Type'),
            'x-id-token':  getCookie('id.token'),
            'x-application-id': diagnosticheaderApplicationId,
            'x-country-code': diagnosticheaderCountryCode,
            'x-preferred-language': diagnosticPreferredLanguage
        }
    });
}