function Onupdatedeactiveaccount(formData) {
	var headerLanguage = document.querySelector('input[name="x-preferred-language"]').value;
	var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
	var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
	var jwtToken = getCookie('id.token');
	formData.headers = {
		'x-country-code': headerCountryCode,
		'x-application-id': headerApplicationId,
		'x-preferred-language': headerLanguage,
		'x-id-token': jwtToken,
		'x-application-access-key': 'admin1#Admin'
	}
	formData.body = {
		action: "deactivateUser",
		userInfo: {
			"userName": formData.body.getuserName
		}
	}
}

function Onsuccessdeactiveaccount(data) {
	if (data.errorCode == 0) {
		window.location.href = "/en/secure/administration/tools.html";
	}
}

function onupdatereactivateaccount(formData) {
	var headerLanguage = document.querySelector('input[name="x-preferred-language"]').value;
	var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
	var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
	var jwtToken = getCookie('id.token');
	formData.headers = {
		'x-country-code': headerCountryCode,
		'x-application-id': headerApplicationId,
		'x-preferred-language': headerLanguage,
		'x-id-token': jwtToken,
		'x-application-access-key': 'admin1#Admin'
	}
	formData.body = {
		action: "activateUser",
		userInfo: {
			"userName": formData.body.getuserName
		}
	}
}

function Onsuccessreactivateaccount(data) {
	if (data.errorCode == 0) {
		window.location.href = "/en/secure/administration/tools.html";
	}
}

function onEditAssessmentNotes(formData) {
	var headerLanguage = document.querySelector('input[name="x-preferred-language"]').value;
	var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
	var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
	var jwtToken = getCookie('id.token');
	formData.headers = {
		'x-country-code': headerCountryCode,
		'x-application-id': headerApplicationId,
		'x-preferred-language': headerLanguage,
		"x-application-access-key": "admin1#Admin",
		'x-id-token': jwtToken,
		'Content-Type': 'application/json'
	}
	formData.body = {
		"type": "AwardApplication",
		"id": formData.body.applicantidvaluenotes,
		"_hashedContent": formData.body.applicanthashvaluenotes,
		"adminNotes": formData.body.notesforadminreference
	}
}

function onsuccessNotesReference(data) {
	if (data.errorCode == 0) {
		$('#assessment-notes-reference').hide();
		$('#notes-reference-success-popup').closest('body').find('.modal-backdrop.show').show();
		$('#notes-reference-success-popup').show();
	}
}

function onupdateAdminaction(formData ) {
	$('body').prepend("<div class='loader-parent' style='display: none;'><em class='abt-icon abt-icon-spinner'></em></div>");
	var headerLanguage = document.querySelector('input[name="x-preferred-language"]').value;
	var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
	var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
	var jwtToken = getCookie('id.token');
	var selectedAction = document.querySelector('ul[name="applicationstatus"] .selected').getAttribute('data-optionvalue');
	if(selectedAction !='REOPEN-ADMIN')
	{
	formData.headers = {
		'x-country-code': headerCountryCode,
		'x-application-id': headerApplicationId,
		'x-preferred-language': headerLanguage,
		"x-application-access-key": "admin1#Admin",
		'x-id-token': jwtToken,
		'Content-Type': 'application/json'
	}
	formData.body = {
		"type": "AwardApplication",
		"id": formData.body.applicantidvalue,
		"_hashedContent": formData.body.applicanthashvalue,
		"status": selectedAction,
		"adminNotes": formData.body.notesforadminreference,
		"judgeNotes": formData.body.notesforjudgereference
	}	
	}
	else{
		$('.loader-parent').show();
		localStorage.setItem('storeContinueAppVal',formData.body.applicantidvalue);
		sessionStorage.setItem('applicationHashContent',formData.body.applicanthashvalue);
		let   href = '/en/secure/administration/application.html'; 
		window.location.href= window.location.origin + href;
	}
	
}

function onsuccessAdminaction(data) {
	if (data.errorCode == 0) {
		window.location.href = "/en/secure/administration.html";
	}
}

function onfailureAdminaction(data) {
	if (data.errorCode == 400) {
		var statusMessage = data.response.statusReason;
		$("#statusMessage").append(statusMessage);
	}
}