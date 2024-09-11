var xApplicationId, xCountryCode, xPreferredLanguage;
var jwtToken = getCookie('id.token');
$(document).ready(function() {
	/*for logout*/
	xApplicationId = $('input[name="x-application-id"]').val();
	xCountryCode = $('input[name="x-country-code"]').val();
	xPreferredLanguage = $('input[name="x-preferred-language"]').val();


	/* title */
	$('.cmp-title .cmp-title__text').wrapInner('<span />');
	$('#confirmation-tab').find('.a-horizontal-rule:eq(3)').addClass('confirmation-rule');
	$("#submit-application-merit #sectionBody .row").find(".col-12:eq(1) .columncontrol").addClass("submit-btn-container");
	$("#submit-standout-application #sectionBody .row").find(".col-12:eq(1) .columncontrol").addClass("standout-btn-container");

	$("#addJudgeContainer #section-judge-register-api-error #judge-register-api-error").find(".text:eq(3)").addClass("error-msg-fix");
	$('#section_thankyou-banner').parents('#pageContent').addClass('thankyou-banner-styles');

	$('#editAccount').parent('.formcontainer').addClass('errMsgFragmentFix');

	$('#submit-change-email').parent('.text:eq(0)').addClass('errMsgFragment');

	$('#start-application-text').parents('#pageContent').addClass('imp-date-styles');

	/*loader for login*/
	$('#login-button').parents('body').prepend("<div class='loader-parent' style='display: none;'><em class='abt-icon abt-icon-spinner'></em></div>");
	$('#saveProfile').parents('.o-form-container__buttons').append("<div class='loader' style='display: none;'><em class='abt-icon abt-icon-spinner'></em></div>");
	$('#submitButton').parents('.o-form-container__buttons').append("<div class='loader' style='display: none;'><em class='abt-icon abt-icon-spinner'></em></div>");
	$('#submitButton').parents('.o-form-container__buttons').addClass('loader-styles');

	$('#create-account-btn').parents('.o-form-container__buttons').append("<div class='loader' style='display: none;'><em class='abt-icon abt-icon-spinner'></em></div>");
	$('#login-button').parents('#pageContent').addClass('banner-styles');
	$('#reset-pwd-btn').parents('body').prepend("<div class='loader-parent' style='display: none;'><em class='abt-icon abt-icon-spinner'></em></div>");
	$('#forget-pwd-btn').parents('body').prepend("<div class='loader-parent' style='display: none;'><em class='abt-icon abt-icon-spinner'></em></div>");
	$('#profileLinks').parents('#pageContent').addClass('application-banner-styles');

	/*loader for create new applcation*/
	$('#start-new-application-radio').parents('body').prepend("<div class='loader-parent' style='display: none;'><em class='abt-icon abt-icon-spinner'></em></div>");

	/* for error messages */
	$('#user-register-api-error').hide();
	$('#login-api-error').hide();
	$('#judge-register-api-error').hide();
	$('#submit-change-email').hide();
	$('#change-email-api-error').hide();
	$('#thankyou-popup').hide();
	$('#add-organization-api-error').hide();

	//Contact admin Thankyou popup	
	$("#thankyou-popup .xf-content-height").addClass('modalBox abt-icon abt-icon-cancel');
	$('#thankyou-popup .abt-icon.abt-icon-cancel').click(function() {
		$('#thankyou-popup').hide();
	});
	$('#thankyou-popup .btn').click(function() {
		$('#thankyou-popup').hide();
	});

	/* Judge thank you popup */
	$("#section-login-container .o-form-container__wrapper").addClass('modalBox');
	$('#judge-thankyou').hide();
	$('#section-login-container #judge-submit').click(function() {
		$('#judge-thankyou').show();
	});
	$('#judge-thankyou .btn').click(function() {
		$('#judge-thankyou').hide();
	});

	/* Applicant */
	$('#characters-remaining .cmp-title__text').find('span:eq(0)').addClass('myspan');

	/* admin tool */
	$('#welcome-admin').find('.columncontrol__column:eq(0)').addClass('mb-0');

	$('#editAccount #currentPassword').parents('.fields').children('.a-input-field').css('margin-bottom', '0px').children('.form-group').css('margin-bottom', '0px');

	/* hide reset error message */
	if (localStorage.getItem('resetPass') != null && localStorage.getItem('resetPass') == 'true') {
		$('#reset-password-success').show();
		localStorage.removeItem('resetPass');
	} else {
		$('#reset-password-success').hide();
	}

	/* show first name in welcome text */
	if ($(document.getElementById('welcome-text')).length > 0) {
		getFirstname();
	}

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

	/* My Account */
	$('#logoutProfile .m-link-stack .a-link--icon-right a').append('<em class="abt-icon abt-icon-avatar"></em>');
	$('#section-start-application').hide();
	$('#accordion-date,#myAccount').closest('.columncontrol ').addClass('marginNone');
	$('#winner-text').closest('.text').addClass('marginTopNone');
	if ($(window).width() < 768) {
		$('#accordion-date .columncontrol__column:first-child').addClass('order-lg-2');
	}

	/* login page */
	$('#breakText').closest('.cmp-text').addClass('noBreak');

	/*profile icon */
	$('#myAccount .row').find('.col-12.col-md-4.col-lg-4.columncontrol__column').addClass('move-icon');
	$('.move-icon').parent('.row').addClass('row-height');





	/*Edit Profile */
	if (localStorage.getItem('userName') != null) {
		$('#edit-profile-form input[name="firstName"]').val(localStorage.getItem('userName'));
	}

	if (localStorage.getItem('lastName') != null) {
		$('#edit-profile-form input[name="lastName"]').val(localStorage.getItem('lastName'));
	}

	if (localStorage.getItem('institutionName') != null) {
		$('#edit-profile-form input[name="institutionName"]').val(localStorage.getItem('institutionName'));
	}
	$('#edit-profile-form #saveProfile').removeAttr("disabled");
	$('#save-changes').hide();
	$('#edit-profile-form').closest('.formcontainer-halfwidth').addClass('marginBtmNone');
	$('#save-changes').closest('.text ').addClass('marginNone');

	/*Add Judge */
	$('#admintoolTitle').closest('.columncontrol').addClass('marginBtmNone');
	$('#admintoolTitle').closest('.columncontrol').addClass('marginTopNone');
	$('#admintoolTitle').closest('.columncontrol').addClass('paddingLeftRight');
	$('#section-addJudgeContainer').closest('.container').addClass('padLRTP');


	/*Word count characters */
	$('#breakText').closest('.cmp-text').addClass('noBreak');
	$('#continue-btn').parent().parent().addClass('lastElement');
	$('#back-btn').parent().parent().addClass('firstElement');
	var text_max = 2500;
	$('#character-limit span').html(text_max + ' characters remaining');
	$('#clinicalCareDescription').keyup(function() {
		var text_length = $('#clinicalCareDescription').val().length;
		var text_remaining = text_max - text_length;
		$('#character-limit span').html(text_remaining + ' characters remaining');
	});

	/* Accordion styles for FAQ page	*/
	$('#faqParent').parents('#login-container').addClass('faq-container');
	$('#fieldsetForm-options').parents('.options').addClass('fieldset-options');


	/*hide default form container success and error messages*/
	$('.o-form-container__success-msg').hide();
	$('.o-form-container__error-msg').hide();

	/*Edit profile maxlength */
	var editAccount = $("#editAccount").length;
	if (editAccount) {
		editAccountFormAttributeSet();
	}

	var editprofileForm = $("#editAccount").length;
	if (editprofileForm) {
		editprofileFormFormAttributeSet();
	}
	var forgotpasswordForm = $("#forgot-password").length;
	if (forgotpasswordForm) {
		forgotpasswordFormFormAttributeSet();
	}

	var resetpasswordForm = $("#form-reset-password").length;
	if (resetpasswordForm) {
		resetpasswordFormFormAttributeSet();
	}

	/* remove target blank in Edit profile */
	$('#logoutProfile .m-link-stack__container li:first-child a').removeAttr('target');

	/* Logout */
	var logoutTrigger = $('#logoutProfile .linkstack .m-link-stack--dropdown .m-link-stack__list-item:last-child');
	logoutTrigger.click(function(e) {
		e.preventDefault();
		logouttrigger();
	});
	$('#logout').click(function(e) {
		e.preventDefault();
		logouttrigger();
	});

	window.addEventListener('hashchange', function() {
		if (location.hash === '#logout') {
			logouttrigger();
		}
	}, false);

	/* Judge Dashboard */
	$('#myAccount').parents('#login-container').children('.text:first-child').addClass('marginBtmNone');
	$('#myAccount').parents('#login-container').children('.text:nth-child(3)').addClass('marginTopspace');



});

function getFirstname() {
	const getfirstname = localStorage.getItem('userName');
	$('#welcome-text h2').text("WELCOME," + " " + getfirstname + "!");
	$('#welcome-text h1').text("WELCOME," + " " + getfirstname + "!");
}

function registerFormAttributeSet() {
	$('#create-account .form-container input[type="text"]').attr('maxlength', 255);
	$('#create-account .form-container input[type="email"]').attr('maxlength', 255);
}

function editAccountFormAttributeSet() {
	$('#editAccount .form-container input[type="email"]').attr('maxlength', 500);
	$('#editAccount .form-container input[type="password"]').attr('maxlength', 500);

}

function editprofileFormFormAttributeSet() {
	$('#edit-profile-form .form-container input[type="text"]').attr('maxlength', 500);

}

function forgotpasswordFormFormAttributeSet() {
	$('#forgot-password .form-container input[type="email"]').attr('maxlength', 255);
}

function resetpasswordFormFormAttributeSet() {
	$('#form-reset-password .form-container input[type="password"]').attr('maxlength', 64);
}

//call function
registerFormAttributeSet();
editAccountFormAttributeSet();
editprofileFormFormAttributeSet();
forgotpasswordFormFormAttributeSet();
resetpasswordFormFormAttributeSet();

function logouttrigger() {
	//showLoading();
	const action = '/api/private/profile/logout';
	const token = getCookie('id.token');

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

function disableSession() {
	return callSession(false);
}

function callSession(enable) {
	const action = '/api/private/profile/session';
	const token = getCookie('id.token');
	return $.ajax({
		"url": action + "?enable=" + enable,
		"method": "GET",
		"async": false,
		"headers": {
			"x-application-id": xApplicationId,
			"x-country-code": xCountryCode,
			"x-preferred-language": xPreferredLanguage,
			"x-id-token": token
		}
	});
}

function logoutClearData() {
	localStorage.clear();
	deleteCookie('id.token');
}

function redirectLogin() {
	window.location.href = "/en/login.html";
}

$('input[type="checkbox"]').change(function() {
	var inputValue = $(this).parent().parent().next('.checkbox--text-require').hide();
	if ($(this).prop("checked")) {
		$(inputValue).hide();
	} else {
		$(inputValue).show();
	}
});
//function to getCookie
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