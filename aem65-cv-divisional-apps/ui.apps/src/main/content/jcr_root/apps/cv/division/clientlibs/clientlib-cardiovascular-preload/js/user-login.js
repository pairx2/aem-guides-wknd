/** User Login -- starts**/

function onSuccessUserLogin(data) {
	if (data.errorCode == 0) {
		let jwtToken = data.response.jwtToken.id_token;
		setCookie('jwtToken', jwtToken, 1);
		localStorage.setItem('dynamicEmail', $('input[type=email]').val());

		let currOrigin = window.location.origin; 
		let docReferrer = sessionStorage.getItem('documentReferrer');
		if((docReferrer)?.indexOf('/secure/') >= 0 && (docReferrer)?.indexOf(currOrigin) >= 0){
			window.location.href = docReferrer;
		}else{
			window.location.href = $('input[name=homepage]').length > 0 ? currOrigin + $('input[name=homepage]').val() : currOrigin + '/au/en/secure/home.html';
		}

	} else {
		onErrorUserLogin(data);
	}
}

function onErrorUserLogin(error) {
	deleteCookie('jwtToken');
	localStorage.removeItem("dynamicEmail");
	onErrorFailureMsgDisplay(error);
}


function onSuccessUserVerification(data) {

	if (data.response.userExists) {
		$('#user-verification').find('.o-form-container__success-msg').html('');
		var userEmail = $('input[type=email]').val();
		$('#user-registration #email-id').val(userEmail);
		$('#user-verification *').attr('disabled', 'true').removeClass('active');
		$('#user-registration').css('display', 'block');
        var scrollPos =  $('#user-registration').offset().top -100;
		$(window).scrollTop(scrollPos);
	}

}

/** Cookie functions -- starts **/

function setCookie(cname, cvalue, exdays) {
	var expires = "";
	if (exdays !== '') {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		expires = "expires=" + d.toUTCString();
	}
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;";
}

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

//function to deleteCookie
function deleteCookie(name) {
	document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;Secure;';
}


/** Cookie functions -- ends **/

/** Set dynamic email -- starts**/

function setDynamicEmail(){
setTimeout(function () {
		$('input[name="dynamicEmail"]').val(localStorage.getItem('dynamicEmail'));
    }, 10);
}

/** Set dynamic email -- ends**/

/** Function for Reset Password Error Scenario **/
function onErrorResetPassword(error) {
    var errorResponse = error.response;
    if(typeof errorResponse === 'undefined'){
        var sysFailureErrorMessage = $('.o-form-container').find('.o-form-container__error-msg.active');
		sysFailureErrorMessage.html(' Sorry, your password cannot be reset at this time. For further support please email <a href="mailto:joanne.mathie@abbott.com">Abbott Vascular ANZ</a>.');
    }else{
		onErrorFailureMsgDisplay(error);

    }
}
/** Reset Password Error Function ends **/

/** custom error msg -starts **/
function onErrorFailureMsgDisplay(error) {
   	let i18nKey = error.response.i18nMessageKey ? error.response.i18nMessageKey : "";
	var i18KeyEle = $('.o-form-container').find('.o-form-container__error-msg.active');
	if(i18nKey == "AUTH-1014") {
		i18KeyEle.text('User does not exist.');
    }else if(i18nKey == "AUTH-1001") {
		i18KeyEle.text('Invalid Login.');
    }else if(i18nKey == "PM-1007") {
		i18KeyEle.text('Token expired.');
    }else if(i18nKey == "PM-1013") {
		i18KeyEle.html('Your account is locked due to invalid password attempts. For further information please email <a href="mailto:joanne.mathie@abbott.com">Abbott Vascular ANZ</a>.');
    }else if(i18nKey == "REG-USER-1001") {
		i18KeyEle.html('Sorry, this account is already registered. For further support please email <a href="mailto:joanne.mathie@abbott.com">Abbott Vascular ANZ</a>.');
    }else if(i18nKey == "LOOKUP-USER-1001") {
		i18KeyEle.text('Sorry, this information is not recognised. Please verify and re-enter your access code and email address.');
    }
}
/** custom error msg -Ends **/

/** User Login -- ends**/