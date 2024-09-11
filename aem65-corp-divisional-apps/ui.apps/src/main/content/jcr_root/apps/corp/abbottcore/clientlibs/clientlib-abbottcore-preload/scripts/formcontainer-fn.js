/**
 * FORM CONTAINER for Registartion 
 */
var xCountrycode = document.querySelector("input[name='x-country-code']").value;
var xApplicationid = document.querySelector("input[name='x-application-id']").value;
var xPreferredLang = document.querySelector("input[name='x-preferred-language']").value;
 
function updateRequestwithoutUPI(data) {
	delete data.body['g-recaptcha-response'];
	delete data.body['information'];
	delete data.body['node'];
	if (data.body['onlineretireeOptin'] == "YES") {
		data.body['onlineretireeOptin'] = "ture";
	} else {
		data.body['onlineretireeOptin'] = "false";
	}
	var date = new Date(data.body['retireYear']);
	data.body['retireYear'] = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
	return data;
}

function successUpiForm(data) {
	sessionStorage.setItem("firstName", data.response.firstName);
	sessionStorage.setItem("lastName", data.response.lastName);
	sessionStorage.setItem("middleName", data.response.middleName);
	sessionStorage.setItem("retireeHireDate", data.response.retireeHireDate);
	sessionStorage.setItem("retireeRetireDate", data.response.retireeRetireDate);
	sessionStorage.setItem("serviceInYears", data.response.serviceInYears);
	sessionStorage.setItem("upi", data.response.upi);
}

function errorUpiForm(data) {
	if (data.errorCode == 400) {
		window.location.href = "/login/upiNotFound.html";
	}
}
//function to setCookie
function setCookie(cname, cvalue, exdays) {
	var expires = "";
	if (exdays !== '') {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		expires = "expires=" + d.toUTCString();
	}
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;Secure;";
}

//function to getCookie
function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

//function to deleteCookie
function deleteCookie(name) {
	document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;Secure;';
}

//setting session function 
function updateSessionCookie(apiEndpoint, enableValue) {
	const requestOptions = {
		method: 'GET',
		headers: {
			"Content-Type": "application/json",
			"x-Country-Code": xCountrycode,
			"X-Application-Id": xApplicationid,
			"x-Preferred-language": xPreferredLang,
			"x-id-token": getCookie("id_token"),
		},
		mode: 'cors',
		cache: 'no-cache'

	};
	fetch(apiEndpoint + "?enable=" + enableValue, requestOptions)
		.then(function (response) {
			if (response.status == 200) {
				if (getCookie("userGroup") == "Admin") {
					window.location.href = "/secure/manage/activateRetiree.html";
				} 
				else if(getCookie("retireeOption")  == 'YES' && localStorage.getItem('category') != null && localStorage.getItem('category') == 'optin'){
					window.location.href = "/secure/onlineDirectory.html";
				}
				else {
					window.location.href = "/secure/index.html";
				}
			}
			toggleLoadingSpinner();
			return response;
		});
}

// setting Online-retiree option in session
function setOnlineRetireeOption() {
	var token = getCookie("id_token");
	var searchUserurl = new URL($("#session-api-url").val());
	var searchUserurlOrigin = searchUserurl.origin;
	var getProfile_url = "/api/private/profile/profile-info";

	$.ajax({
		url: searchUserurlOrigin + getProfile_url,
		datatype: "json",
		type: "GET",
		headers: {
			"Content-Type": "application/json",
			"x-Country-Code": xCountrycode,
			"X-Application-Id": xApplicationid,
			"x-Preferred-language": xPreferredLang,
			"x-id-token": token,
		},
		success: function (response) {
			var formdata = response.response;
			setCookie("retireeOption", formdata["userInfo"]["additionalProperties"].onlineretiree_optin, '');
			var searchUserurlOrigin_host = "https://" + $(location).attr('hostname');
			var session_url = "/api/private/profile/session";
			var sessionApiUrl = searchUserurlOrigin_host + session_url;
			updateSessionCookie(sessionApiUrl, true);
		}
	});
}

//function to update login request
function updateRequestLogin() {
	toggleLoadingSpinner();
}
//function to handle error in login request
function errorRequestLogin() {
	toggleLoadingSpinner();
}
//function to handle login
function successRequestLogin(data) {
	setCookie("userInfo", JSON.stringify(data.response.accountInfo), '');
	setCookie("id_token", data.response.jwtToken.id_token, '');
	setCookie("refresh_token", data.response.jwtToken.refresh_token, '');
	setCookie("userGroup", data.response.userGroup, '');
	var userLogoutTime = new Date();
	userLogoutTime.setTime(userLogoutTime.getTime() + (50 * 60 * 1000));
	setCookie("userLogoutTime", userLogoutTime, '');
	setOnlineRetireeOption();
}

function updateRequestwithUPI(data) {
	var formdata = data.body;
	var date = new Date(formdata.retireYear);
	formdata.retireYear = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
	$.each(formdata["retiree-options"], function (key, value) {
		let key_name = "option_" + value.consentName.toLowerCase().replace(" ", "_");
		formdata[key_name] = value.consentValue;
	})
	data.body = {
		"action": "createProfileNormal",
		"userInfo": {
			"userType": "Retiree",
			"userName": formdata.userName,
			"password": formdata.password,
			"firstName": formdata.firstName,
			"lastName": formdata.lastName,
			"middleName": formdata.middleName,
			"uid": sessionStorage.getItem("upi"),
			"additionalProperties": {
				"division": formdata.division,
				"retirementDate": formdata.retireYear,
				"workLocation": "",
				"onlineretiree_optin": formdata.onlineretiree_optin,
				"email_address": formdata.option_email,
				"division_retiree": formdata.option_division,
				"homeaddress_retiree": formdata.option_home_address,
				"phone_number": formdata.option_phone_number
				
			}
		},
		"addresses": [
			{
				"lineOne": formdata.lineOne,
				"city": formdata.city,
				"state": formdata.state,
				"country": formdata.city,
				"zipCode": formdata.zipCode
			}
		],
		"contacts": [
			{
				"number": formdata.number
			}
		]
	};

	return data;
}

function successRequestwithUPI(data) {
	sessionStorage.removeItem("firstName");
	sessionStorage.removeItem("lastName");
	sessionStorage.removeItem("middleName");
	sessionStorage.removeItem("retireeHireDate");
	sessionStorage.removeItem("retireeRetireDate");
	sessionStorage.removeItem("serviceInYears");
	sessionStorage.removeItem("upi");
}

function updateActiveRetireeSearch(data) {
	toggleLoadingSpinner();
	data.headers['x-id-token'] = getCookie("id_token");
	var formdata = data.body;
	data.body = {
		"searchType": "activeDisabledUserList",
		"filters": {
			"firstName": formdata.firstName,
			"lastName": formdata.lastName,
			"email": formdata.email
		}
	}
	$("#table-search").empty();
	return data;
}
// Format Data MM/DD/YYYY HH:MM AM/PM
function formatDate(dateVal) {
	var newDate = new Date(dateVal);

	var sMonth = padValue(newDate.getMonth() + 1);
	var sDay = padValue(newDate.getDate());
	var sYear = newDate.getFullYear();
	var sHour = newDate.getHours();
	var sMinute = padValue(newDate.getMinutes());
	var sAMPM = "AM";

	var iHourCheck = parseInt(sHour);

	if (iHourCheck > 12) {
		sAMPM = "PM";
		sHour = iHourCheck - 12;
	}
	else if (iHourCheck === 0) {
		sHour = "12";
	}

	sHour = padValue(sHour);

	return sMonth + "-" + sDay + "-" + sYear + " " + sHour + ":" + sMinute + " " + sAMPM;
}

function padValue(value) {
	return (value < 10) ? "0" + value : value;
}

function successActiveRetireeSearch(data) {
	$("#table-search").append(
		"<table id='example' class='display' style='width: 100%;'><thead>  <tr>    <th>First Name</th>    <th>Last Name</th><th>Email</th><th>Account Status</th><th>Create Date</th></tr></thead><tbody></tbody></table>"
	);
	$.each(data.response, function (key, value) {
		var activation_status;
		if (value.activeUser) {
			activation_status = "Active"
		} else {
			activation_status = "Not Active"
		}
		if (value.userInfo.additionalProperties) {
			if (value.userInfo.additionalProperties['blacklisted'] != "true") {
				$("#example tbody").append("<tr><td class='firstName'><a href='/secure/manage/activateRetiree/updateUser.html?id=" + value.userInfo['userName'] + "'>" + value.userInfo['firstName'] + "</a></td><td class='lastName'>" + value.userInfo['lastName'] + "</td><td class='email'>" + value.userInfo['email'] + "</td><td>" + activation_status + "</td><td>" + formatDate(value.createDate) + "</td></tr>");
			}
		} else {
			$("#example tbody").append("<tr><td class='firstName'><a href='/secure/manage/activateRetiree/updateUser.html?id=" + value.userInfo['userName'] + "'>" + value.userInfo['firstName'] + "</a></td><td class='lastName'>" + value.userInfo['lastName'] + "</td><td class='email'>" + value.userInfo['email'] + "</td><td>" + activation_status + "</td><td>" + formatDate(value.createDate) + "</td></tr>");
		}

	});
	$('#example').DataTable();
	$(".form-container-activate-retiree button.btn").addClass("disabled");
	$("#example .firstName a").click(function () {
		var firstName = $(this).text();
		var lastName = $(this).parent().parent().children(".lastName").text();
		var email = $(this).parent().parent().children(".email").text();
		var userUpdate = {
			"name": firstName + " " + lastName,
			"email": email,
		}
		sessionStorage.setItem("userUpdate", JSON.stringify(userUpdate));
	})
}

function completeActiveRetireeSearch() {
	toggleLoadingSpinner();
}

function getUrlParameter(sParam) {
	var sPageURL = window.location.search.substring(1),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
		}
	}
	return false;
}

function getUrlParameterAdmin(sParam) {
	var sPageURL = window.location.href.split('#'),
		sURLVariables = sPageURL[1].split('&'),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
		}
	}
	return false;
}

function adminUpdateRequest(data) {
	data.headers['x-id-token'] = getCookie("id_token");
	var account_status;
	$.each(data.body['Account Status'], function (key, value) {
		if (value.consentValue) {
			account_status = value.consentName;
		}
	});
	var account_email = data.body['email'];
	var account_status_val;
	if (account_status == 'Active') {
		account_status_val = 'activateUser';
	} else if (account_status == 'Inactive') {
		account_status_val = 'deactivateUser';
	} else if (account_status == 'Delete') {
		account_status_val = 'deleteUser';
	} else if (account_status == 'ChangeEmail') {
		account_status_val = 'changeEmail';
	}
	if (account_status_val == 'changeEmail') {
		data.body = {
			"category": account_status_val,
			"userInfo": {
				"userName": getUrlParameter("id"),
				"email": account_email
			}
		}
	} else {
		data.body = {
			"category": account_status_val,
			"userInfo": {
				"userName": getUrlParameter("id"),
			}
		}
	}
	
	return data;
}

function adminUpdateUser(data) {
	sessionStorage.removeItem("userUpdate");
}

function updateSearchHR(data) {
	toggleLoadingSpinner();
	data.headers['x-id-token'] = getCookie("id_token");
	var formdata = data.body;
	data.body = {
		"searchType": "hrDataFeedSearch",
		"filters": {
			"firstName": formdata.firstName,
			"lastName": formdata.lastName
		}
	}
	$("#table-search-hr").empty();
	return data;
}

function successSearchHR(data) {
	$("#table-search-hr").append(
		"<table id='example' class='display' style='width: 100%;'><thead><tr><th>First Name</th><th>Last Name</th><th>Account Status</th><th>Activation Status</th></tr></thead><tbody></tbody></table>"
	);
	$.each(data.response, function (key, value) {
		var account_status;
		var activation_status;
		if (value.userInfo.registered) {
			account_status = "REGISTERED"
		} else {
			account_status = "NOT REGISTERED"
		}
		if (value.activeUser) {
			activation_status = "Active"
		} else {
			activation_status = "Not Active"
		}
		$("#example tbody").append("<tr><td class='firstName'>" + value.userInfo['firstName'] + "</td><td class='lastName'>" + value.userInfo['lastName'] + "</td><td>" + account_status + "</td><td>" + activation_status + "</td></tr>");
	});
	$('#example').DataTable();
	$(".form-container-search-retiree button.btn").addClass("disabled");
}

function completeSearchHR() {
	toggleLoadingSpinner();
}

function updateBlacklistRetireeSearch(data) {
	toggleLoadingSpinner();
	data.headers['x-id-token'] = getCookie("id_token");
	var formdata = data.body;
	data.body = {
		"searchType": formdata.requestType,
	}
	return data;
}
function successBlacklistRetireeSearch(data) {
	toggleLoadingSpinner();
	$.each(data.response, function (key, value) {
		var date = new Date(value.userInfo.additionalProperties['blacklist_date']);
		var date_blacklist = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();

		$("#example tbody").append("<tr><td>" + value.userInfo['uid'] + "</td><td>" + date_blacklist + "</td><td>" + value.userInfo.additionalProperties['disabledBy'] + "</td></tr>");
	})
	$("#disable-table").show();
	$('#example').DataTable();
}

function updateBlacklistRetiree(data) {
	$("#disable-table").empty();
	$("#disable-table").append(
		"<table id='example' class='display' style='width: 100%;'><thead><tr><th>UPI</th><th>Updated Date</th><th>Updated By</th></tr></thead><tbody></tbody></table>"
	);
	$('.blacklist-retiree-search button.btn').prop('disabled', false);

	data.headers['x-id-token'] = getCookie("id_token");
	var formdata = data.body;
	data.body = {
		"category": formdata.requestType,
		"userInfo": {
			"uid": formdata.upiId
		}
	}
	return data;
}
function successBlacklistRetiree(data) {
	$(".blacklist-retiree-search button.btn").click();
}
/**
* @function
* Summary: Function to change payload before ESL call
* Parameters: data -> payload
*/

function updateUserSearchData(data) {
	toggleLoadingSpinner();
	data.headers['x-id-token'] = getCookie("id_token");
	return data;
}

/**
 * @function
 * Summary: Function to display pagination after getting result
 * Parameters: data -> payload
 */

function onSuccessUserSearch(data) {
	if (data.errorCode == 0) {
		if (data.response.length != 0) {
			const { response = [] } = data;
			function compare(a, b) {
				if (a < b) {
					return -1;
				}
				if (a > b) {
					return 1;
				}
				return 0;
			}
			simpleTemplating(response);
			function simpleTemplating(templateData) {
				templateData.sort(compare);
				let html = '';
				$.each(templateData, function (index, item) {
					$("#example tbody").append("<tr><td class='email'>" + item + "</td></tr>");
				});
				$("#disable-table").show();
				$('#example').DataTable();
				return html;
			}
		} else {
			$('.text .cmp-text#email-list-container').append('<div>No Records Found!</div>');
		}
	}
	else {
		const emailListErrorMsg = '<p id="email-list-error-msg"></p>';
		if ($('.text .cmp-text#email-list-container').length) {
			$('.text .cmp-text#email-list-container').append(emailListErrorMsg);
		}
	}
	toggleLoadingSpinner();
}
/**
 * @function
 * Summary: Function to handle failure  scenario
 * Parameters: data -> payload
 */
function onFailureUserSearch() {
	const emailListErrorMsg = '<p id="email-list-error-msg"></p>';
	if ($('.text .cmp-text#email-list-container').length) {
		$('.text .cmp-text#email-list-container').append(emailListErrorMsg);
	}
	toggleLoadingSpinner();
}

function addRetireeUpdate(data) {
	data.headers['x-id-token'] = getCookie("id_token");
	var formdata = data.body;

	data.body = {
		"action": "createProfileNormal",
		"category": "addRetiree",
		"userInfo": {
			"userType": "Retiree",
			"userName": formdata.email,
			"firstName": formdata.firstName,
			"lastName": formdata.lastName,
			"middleName": formdata.middleName,
			"uid": formdata.upiId,
			"additionalProperties": {
				"division": formdata.division,
				"retirementDate": formdata.retireYear,
				"workLocation": formdata.workLocation,
				"yearsOfService": formdata.yearsOfService
			}
		}
	};
	return data;
}

/**
 * @function
 * Summary: Function to handel update Reset Password
 * Parameters: data -> payload
 */
function updateResetPassword(data) {
	data.body['resetToken'] = getUrlParameter("passwordResetToken");
	return data;
}
/**
 * @function
 * Summary: Function to handle update user verification Account 
 * Parameters: data -> payload
 */
function updateVerifyAccount(data) {
	data.headers['x-verification-token'] = getUrlParameter("verificationToken");
	data.headers['uid'] = data.body['uid'];
	delete data.body;
	return data;
}
function updateOnlineDirectoryRequestData(data) {
	toggleLoadingSpinner();
	data.headers['x-id-token'] = getCookie("id_token");
	if (data.body['requestType']) {
		data.body['searchType'] = data.body['requestType'];
	}
	return data;
}
var total_data;
function successOnlineDirectoryRequestData(data) {
	total_data = data.response;
	onlineDirectoryList(total_data);
}
function completeOnlineDirectoryRequestData() {
	toggleLoadingSpinner();
}
/**
 * @function
 * Summary: Function to handle update profile 
 * Parameters: data -> payload
 */
function updateUserProfileForm(data) {
	data.headers['x-id-token'] = getCookie("id_token");
	var formdata = data.body;
	formdata.userName = getItemSessionStorage("userName")
	formdata.uid = getItemSessionStorage("uid")
	if (!formdata.Country) {
		formdata.Country = getItemSessionStorage("country")
	}
	$.each(formdata["retiree-options"], function (key, value) {
		let key_name = "option_" + value.consentName.toLowerCase().replace(" ", "_");
		formdata[key_name] = value.consentValue;
	})
	data.body = {
		"category": "profileInfo",
		"userInfo": {
			"email": formdata.email,
			"password": formdata.password,
			"userName": formdata.userName,
			"firstName": formdata.firstName,
			"middleName": formdata.middleName,
			"lastName": formdata.lastName,
			"street": formdata.lineOne,
			"uid": formdata.uid,
			"additionalProperties": {
				"yearsOfService": formdata.yearsOfService,
				"division": formdata.division,
				"zip": formdata.zipCode,
				"country": formdata.Country,
				"phoneNumber": formdata.number,
				"retirementDate": formdata.dateofretirement,
				"city": formdata.city,
				"onlineretiree_optin": formdata.information,
				"registered": "custom:registered",
				"state": formdata.state,
				"invalid-attempt": "0",
				"email_address": formdata.option_email,
				"division_retiree": formdata.option_division,
				"homeaddress_retiree": formdata.option_home_address,
				"phone_number": formdata.option_phone_number,
				"show_user_photo": formdata.option_photo
			}
		},
		"addresses": [
			{
				"zipCode": formdata.zipCode,
				"country": formdata.Country,
				"lineOne": formdata.lineOne,
				"state": formdata.state,
				"city": formdata.city
			}
		],
		"contacts": [
			{
				"number": formdata.number
			}
		]
	}
	localStorage.setItem('category', 'profileInfo');
	return data;
}

/**
 * @function
 * Summary: Function to handle success update profile 
 * Parameters: data -> payload
 */
function updateUserProfileFormSuccess(data) {
	sessionStorage.removeItem("userName");
	sessionStorage.removeItem("uid");
	sessionStorage.removeItem("country");
}

/**
 * @function
 * Summary: Function to update logout profile call
 * Parameters: data -> payload
 */
function updateRequestLogout(data) {
	toggleLoadingSpinner();
	data.headers['x-id-token'] = getCookie("id_token");
	return data;
}

//session call for logout
function callSession(enable) {
	const action = '/api/private/profile/session';
	return $.ajax({
		"url": action + "?enable=" + enable,
		"method": "GET",
		"async": false,
		"headers": {
			"x-Country-Code": xCountrycode,
			"X-Application-Id": xApplicationid,
			"x-Preferred-language": xPreferredLang,
			"x-id-token": getCookie("id_token"),
		},
		complete: function (data) {
			toggleLoadingSpinner();
		},
	});
}

/**
 * @function
 * Summary: Function to success logout profile call
 * Parameters: data -> payload
 */
function successRequestLogout(data) {
	callSession(false);
	deleteCookie("userInfo");
	deleteCookie("userGroup");
	deleteCookie("id_token");
	deleteCookie("refresh_token");
	deleteCookie("userLogoutTime");
	deleteCookie("retireeOption");
	localStorage.removeItem('category');
	localStorage.removeItem('hidePopup');
}

/**
 * @function
 * Summary: Function to create row for each data
 * Parameters: data -> payload
 */
function onlineDirectoryList(array) {
	$("#disable-table").empty();
	$("#disable-table").append(
        "<table id='online-directory' class='display' style='width: 100%;'><thead>  <tr>    <th>Name</th>    <th>Divison</th><th>State</th><th>Country</th><th>Zipcode</th></tr></thead><tbody></tbody></table>"
	);
	$.each(array, function (key, value) {
		var state = 'Not Available';
		var country = 'Not Available';
		var address = 'Not Available';
		var email = value.userInfo.email ?? 'Not Available';
		var division = value.userInfo.division ?? '';
		var firstName = value.userInfo.firstName ?? '';
		var middleName = value.userInfo.middleName ?? '';
		var lastName = value.userInfo.lastName ?? '';
		var picture = value.userInfo.picture ?? 'Not Available';
		if (value.userInfo.additionalProperties) {
			division = value.userInfo.additionalProperties.division;
		}
		if (division === 'empty' || division === '') {
			division = 'Not Available';
		}
		if (email === 'empty' || email === '') {
			email = 'Not Available';
		}
		if (firstName === 'empty' || firstName === '') {
			firstName = 'Not Available';
		}
		if (middleName === 'empty') {
			middleName = '';
		}
		if (lastName === 'empty' || '') {
			lastName = 'Not Available';
		}
		if (picture === 'empty') {
			picture = '';
		}
		if (value.addresses == undefined) {
            zipCode = 'Not Available';
        }		
		if (value.addresses) {
			var lineOne = value.addresses[0].lineOne ?? '';
			var city = value.addresses[0].city ?? '';
			var zipCode = value.addresses[0].zipCode ?? '';
			state = value.addresses[0].state ?? '';
			country = value.addresses[0].country ?? '';
			if (lineOne === 'empty') {
				lineOne = '';
			}
			if (city === 'empty') {
				city = '';
			}
			if (zipCode === 'empty') {
				zipCode = 'Not Available';
			}
			if (state === 'empty' || state === '') {
				state = 'Not Available';
			}
			if (country === 'empty' || country === '') {
				country = 'Not Available';
			}
			address = lineOne + ', ' + city + ', ' + state + ', ' + country + ' ' + zipCode;
		}
		var phoneNumber = 'Not Available';
		if (value.contacts) {
			phoneNumber = value.contacts[0].number ?? 'Not Available';
			if (phoneNumber === 'empty' || phoneNumber === '') {
				phoneNumber = 'Not Available';
			}
		}
		$("#online-directory tbody").append(
			`<tr><td onclick="showUserModal('${firstName} ${middleName} ${lastName}','${division}','${phoneNumber}','${address}','${email}','${picture}')"><a class='fristname'>` +
			lastName +
			`, ` +
			firstName +
			`</a></td><td class='divison'>` +
			division +
			`</td><td class='state'>` +
			state +
			`</td><td class='country'>` +
			country +
            `</td><td class='zipcode'>` +
            zipCode +			
			`</td></tr>`
		);
	});
	$("#online-directory").DataTable();
}

/**
* @function
* Summary: Function to create row for each data
* Parameters: data -> payload
*/
function updateOnlineDirectory(data) {
	var firstName = "";
	var lastName = "";
	var division = "";
	var state = "";
	var country = "";
	var zipcode = "";

	if (data.body.firstName) {
		firstName = data.body.firstName.toLowerCase();
	}
	if (data.body.lastName) {
		lastName = data.body.lastName.toLowerCase();
	}
	if (data.body.division) {
		division = data.body.division.toLowerCase();
	}
	if (data.body.state) {
		state = data.body.state.toLowerCase();
	}
	if (data.body.Country) {
		country = data.body.Country.toLowerCase();
	}
	if (data.body.zipcode) {
        zipcode = data.body.zipcode;
    }	
	$("#online-directory tr").filter(function () {
		let newArray = total_data.filter((currentValue, index) => {
			var iteam_division = currentValue.userInfo.division ?? '';
			var iteam_firstName = currentValue.userInfo.firstName ?? '';
			var iteam_lastName = currentValue.userInfo.lastName ?? '';
			if (currentValue.userInfo.additionalProperties) {
				iteam_division = currentValue.userInfo.additionalProperties.division;
			}
			if (iteam_division === 'empty') {
				iteam_division = '';
			}
			if (iteam_firstName === 'empty') {
				iteam_firstName = '';
			}
			if (iteam_lastName === 'empty') {
				iteam_lastName = '';
			}
			var iteam_state = '';
			var iteam_country = '';
            var iteam_zipcode = '';
			if (currentValue.addresses) {
				iteam_state = currentValue.addresses[0].state ?? '';
				iteam_country = currentValue.addresses[0].country ?? '';
                iteam_zipcode = currentValue.addresses[0].zipCode ?? '';
				if (iteam_state === 'empty') {
					iteam_state = '';
				}
				if (iteam_country === 'empty') {
					iteam_country = '';
				}
                if (iteam_zipcode === 'empty') {
                    iteam_zipcode = '';
                }				
			}
			if (
				(iteam_country.toLowerCase() === country ||
					iteam_country.toLowerCase().includes(country)) &&
				(iteam_firstName.toLowerCase() === firstName ||
					iteam_firstName.toLowerCase().includes(firstName)) &&
				(iteam_lastName.toLowerCase() === lastName ||
					iteam_lastName.toLowerCase().includes(lastName)) &&
				(iteam_division.toLowerCase() === division ||
			  		iteam_division.toLowerCase().includes(division)) &&
			    (iteam_state.toLowerCase() === state ||
				  iteam_state.toLowerCase().includes(state)) &&
			    (iteam_zipcode=== zipcode ||
				  iteam_zipcode.includes(zipcode))
			) {
				return currentValue;
			}
		});
		onlineDirectoryList(newArray);
	});
}
function showUserModal(name, divison, phone, adress, email, photo) {
	//online directory popup profile photo
    $('#userDetailsModal').parents('body').find('.abbott-wrapper').addClass('setZindex');
    if(photo != '' && !photo.includes('/user-photos/default.jpg') && photo!='Not Available'){
	   showprofilePic(photo,function(bytes){
		$("#userDetailsModal .left-part img").attr("src", `data:image/png;base64,${bytes}`);
		$("#userDetailsModal .left-part img").show();
	  }); 
	}
	else if(photo=="" || photo.includes('/user-photos/default.jpg')){
         $("#userDetailsModal .left-part img").attr("src", "/content/dam/corp/abbottcore/new-design/default-295x165.png");
         $("#userDetailsModal .left-part img").show();
    }    
    else{
         $("#userDetailsModal .left-part img").hide();
    }
		
		
	$("#userDetailsModal .name").text(name);
	$("#userDetailsModal img").attr("alt", name);
	$("#userDetailsModal .division-value").text(divison);
	$("#userDetailsModal .phone-value").text(phone);
	$("#userDetailsModal .address-value").text(adress);
	$("#userDetailsModal .email-value").text(email);
	$("#userDetailsModal").show();
	$(".close").click(function () {
		$("#userDetailsModal").hide();
		$('#userDetailsModal').parents('body').find('.abbott-wrapper').removeClass('setZindex');
	});
}

function updateInMemory(data) {
	toggleLoadingSpinner();
	data.headers['x-id-token'] = getCookie("id_token");
	$("#person").hide();
	$("#person tbody").empty();
	$(".no-data").hide();
	var formdata = data.body;
	data.body = {
		"searchType": formdata.requestType,
		"filters": {
			"year": formdata.year
		}
	}
	return data;
}

function successInMemory(data) {
	if (data.response.length == 0) {
		$(".no-data").show();
	} else {
		$("#person").show();
		var temp_data = data.response.sort(function (a, b) {
			// Turn your strings into dates, and then subtract them
			// to get a value that is either negative, positive, or zero.
			return new Date(a.userInfo.retireeDeathDate) - new Date(b.userInfo.retireeDeathDate);
		});
		$.each(temp_data, function (index, item) {
			var className = "even";
			if (index == 0 || index % 2 == 0) {
				className = "odd";
			}
			var today = new Date(item.userInfo.retireeDeathDate);
			// Getting full month name (e.g. "June")
			var month = today.toLocaleString('default', { month: 'long' });
			var day = today.toLocaleString('default', { day: 'numeric' });
			$("#person tbody").append("<tr class=" + className + "><td class='name'>" + item.userInfo.lastName + ", " + item.userInfo.firstName + "</td><td class='date'>" + month + " " + day + "</td></tr>")
		})
	}
}

function completeInMemory() {
	toggleLoadingSpinner();
}

function getMonthName(monthNumber) {
	const date = new Date();
	date.setMonth(monthNumber - 1);

	return date.toLocaleString('en-US', { month: 'long' });
}

function updateRetirementForm(data) {
	toggleLoadingSpinner();
	data.headers['x-id-token'] = getCookie("id_token");
	$("#person").hide();
	$("#person tbody").empty();
	$(".no-data").hide();
	var formdata = data.body;
	$(".month-year").text(getMonthName(formdata.month) + " " + formdata.year);
	data.body = {
		"searchType": formdata.requestType,
		"filters": {
			"year": formdata.year,
			"month": formdata.month
		}
	}
	return data;
}

function successRetirementForm(data) {
	if (data.response.length == 0) {
		$(".no-data").show();
	} else {
		$("#person").show();
		var temp_data = data.response.sort(function (a, b) {
			if (a.userInfo.lastName < b.userInfo.lastName) {
				return -1;
			}
			if (a.userInfo.lastName > b.userInfo.lastName) {
				return 1;
			}
			return 0;
		});
		$.each(temp_data, function (index, item) {
			var className = "even";
			if (index == 0 || index % 2 == 0) {
				className = "odd";
			}
			$("#person tbody").append("<tr class=" + className + "><td class='name'>" + item.userInfo.lastName + ", " + item.userInfo.firstName + "</td><td class='date'>" + item.userInfo.yearsOfService + "</td></tr>")
		})
	}
}

function completeRetirementForm() {
	toggleLoadingSpinner();
}

function updateAnniversariesForm(data) {
	toggleLoadingSpinner();
	data.headers['x-id-token'] = getCookie("id_token");
	$("#person").hide();
	$("#person tbody").empty();
	$(".no-data").hide();
	var formdata = data.body;
	$(".month-year").text(getMonthName(formdata.month) + " " + formdata.year);
	data.body = {
		"searchType": formdata.requestType,
		"filters": {
			"year": formdata.year,
			"month": formdata.month
		}
	}
	return data;
}

function successAnniversariesForm(data) {
	if (data.response.length == 0) {
		$(".no-data").show();
	} else {
		$("#person").show();
		$.each(data.response, function (index, item) {
			item.userInfo.retireeHireDate = new Date(item.userInfo.retireeHireDate).toLocaleDateString(undefined, {
				month: "numeric", day: "numeric",
			})
		});
		var temp_data = data.response.sort(function (a, b) {
			// Turn your strings into dates, and then subtract them
			// to get a value that is either negative, positive, or zero.
			return new Date(`${a.userInfo.retireeHireDate}/2020`) - new Date(`${b.userInfo.retireeHireDate}/2020`);
		});
		$.each(temp_data, function (index, item) {
			var className = "even";
			if (index == 0 || index % 2 == 0) {
				className = "odd";
			}
			var today = new Date(`${item.userInfo.retireeHireDate}/2020`);
			// Getting full month name (e.g. "June")
			var month = today.toLocaleDateString('default', { month: 'numeric' });
			var day = today.toLocaleDateString('default', { day: 'numeric' });
			$("#person tbody").append("<tr class=" + className + "><td>" + month + "/" + day + "</td><td class='name'>" + item.userInfo.lastName + ", " + item.userInfo.firstName + "</td><td class='date'>" + item.userInfo.yearsOfService + "</td></tr>")
		})
	}
}

function completeAnniversariesForm() {
	toggleLoadingSpinner();
}


/**
 * @function
 * Summary: Function to handle opt-in update profile 
 * Parameters: data -> payload
 */
function updateUserProfileOptinForm(data) {
	data.headers['x-id-token'] = getCookie("id_token");
	var formdata = data.body;
	$.each(formdata["retiree-options"], function (key, value) {
		let key_name = "option_" + value.consentName.toLowerCase().replace(" ", "_");
		formdata[key_name] = value.consentValue;
	})
	data.body = {
		"category": "opt-in-update",
		"userInfo": {
			"additionalProperties": {
				"division": formdata.division,
				"show_user_photo": formdata.option_photo,
				"onlineretiree_optin": formdata.information,
				"email_address": formdata.option_email,
				"division_retiree": formdata.option_division,
				"homeaddress_retiree": formdata.option_home_address,
				"phone_number": formdata.option_phone_number,
                "hidepopup": formdata.optinpopup
				
			}
     }

	}
    localStorage.setItem('hidePopup', formdata.optinpopup);
	localStorage.setItem('category', 'optin');
	return data;


}

/**
 * @function
 * Summary: Function to handle success opt-in update profile 
 * Parameters: data -> payload
 */
function updateUserProfileOptinFormSuccess(data) {
	sessionStorage.removeItem("userName");
	sessionStorage.removeItem("uid");
	sessionStorage.removeItem("country");

}

/** Pending Photo **/
function updatePendingphotoSearch(data) {
	toggleLoadingSpinner();
	data.headers['x-id-token'] = getCookie("id_token");
	data.body = {
		"searchType": "pendingApprovals",
	}
	return data;
}
function successPendingphotoSearch(data) {
	toggleLoadingSpinner();
	$.each(data.response, function (key1, value1) {
		
		 if (value1.userInfo.firstName  === '') {
			value1.userInfo.firstName = 'Not Available';
		}
		if (value1.userInfo.lastName  === '') {
			value1.userInfo.lastName = 'Not Available';
		}
		if (value1.userInfo.division === 'empty' || value1.userInfo.division === '') {
			value1.userInfo.division = 'Not Available';
		}		
       $("#example tbody").append("<tr><td><input type='hidden' id='documentID' value='"+value1.userInfo.pendingPhoto+"'/><input type='hidden' id='userName' value='"+value1.userInfo.userName+"'/><a href='#' id='viewPhoto'>" + value1.userInfo.lastName + ", " +value1.userInfo.firstName+"</a></td><td>" + value1.userInfo.onlineretireeOptin + "</td><td>" + value1.userInfo.division + "</td><td>" + value1.userInfo.email +"</td></tr>");
	})
	$("#disable-table").show();
	$('#example').DataTable();
}


/**
 * @function
 * Summary: Function to handle pending photo approval popup 
 * Parameters: data -> payload
 */
function updatePendingphotoApproval(data) {
	data.headers['x-id-token'] = getCookie("id_token");
    var requestDet = data.body.information;
     var catOptin;
    if(requestDet == "APPROVE"){

        catOptin = "approveRequest";
    }
    else if(requestDet == "REJECT"){
         catOptin = "rejectRequest";

    }
	data.body = {
		"category": catOptin,
        "userInfo": {
                "userName": data.body.userName,
                "reason": data.body.comments
            }
	}

	return data;

}

/**
 * @function
 * Summary: Function to view the profile photo in my account page and online directory page
 * Parameters: data -> payload
 */
function showprofilePic(picName, callback) {
    var token = getCookie("id_token");
    var searchUserurl = new URL($("#session-api-url").val());
    var searchUserurlOrigin = searchUserurl.origin;
    var getDocument = "/api/private/lookup/getdocument";
    var bytes;   
    var getAction = {
        "action": "download",
        "documentId": picName,
        "type": "photoview"
    };
    $.ajax({
        url: searchUserurlOrigin + getDocument,
        datatype: "json",
        type: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-Country-Code": $("input[name='x-country-code']").val(),
            "X-Application-Id": $("input[name='x-application-id']").val(),
            "x-Preferred-language": $("input[name='x-preferred-language']").val(),
            "x-id-token": token,
        },
        data: JSON.stringify(getAction),
        beforeSend: function() {
            setTimeout(function() {
                toggleLoadingSpinner();
            }, 10);
        },
        success: function(photoresponse) {
            toggleLoadingSpinner();
            bytes = photoresponse.response.attachmentBytes;
            callback(bytes);
        }

    });

}