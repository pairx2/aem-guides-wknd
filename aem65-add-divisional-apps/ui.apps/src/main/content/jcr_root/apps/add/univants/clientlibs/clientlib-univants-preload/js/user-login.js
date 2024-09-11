const REQUEST_HEADERS = {
    'Content-Type': 'application/json'
};

function UpdateLoginDataRequest(formData) {   
    formData.body = {
        loginID: formData.body.userName,
        password: formData.body.password,
		"g-recaptcha-response" : formData.body["g-recaptcha-response"]		
    }
    return formData

}

function onErrorUserLogin(response) {
	localStorage.clear();
    deleteCookie('id.token');
    $(".o-form-container__error-msg").hide();
    showApiError('#login-api-error', response);

}

function setApiHeaders() {
    const headerElms = document.querySelectorAll('input[data-header][type=hidden]');
    headerElms.forEach(function(headerElm) {
        const name = headerElm.getAttribute('name');
        const value = headerElm.value;
        REQUEST_HEADERS[name] = value;
    });
}

function onSuccessUserLogin(data) {    
	if (data.errorCode == 0) {
		$('.loader-parent')[0].style.display='block';
		var sessionApiUrl;
		let jwtToken = data.response.jwtToken.id_token;
        if(location.pathname.includes('/content/')) {
			sessionApiUrl = $('#session-api-url').val();
        }
        else{
			sessionApiUrl = '/api/private/profile/session';
        }
		let userName = data.response.accountInfo.userInfo.firstName;
		let userId = data.response.accountInfo.userInfo.userName;
		let lastName = data.response.accountInfo.userInfo.lastName;
		let institutionName = data.response.accountInfo.userInfo.institutionName;
		let userGroup = data.response.userGroup;
		setCookie('id.token', jwtToken, '');
		localStorage.setItem('dynamicEmail', $('input[type=email]').val());
		localStorage.setItem('userName', userName);
		localStorage.setItem('lastName', lastName);
		localStorage.setItem('institutionName', institutionName);
		localStorage.setItem('userGroup', userGroup);
		localStorage.setItem('userKey', userId);
		setApiHeaders();
		updateSessionCookie(sessionApiUrl, true);
	}
}


function updateSessionCookie(apiEndpoint, enableValue) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': getRequestHeader('Content-Type'),
            'x-id-token':  getCookie('id.token'),
            'x-application-id': getRequestHeader('x-application-id'),
            'x-country-code': getRequestHeader('x-country-code'),
            'x-preferred-language': getRequestHeader('x-preferred-language')
        },
        mode: 'cors',
        cache: 'no-cache'

    };
    fetch(apiEndpoint + "?enable=" + enableValue, requestOptions)
        .then(function(response) {
          if (response.status == 200) {
            if (localStorage.getItem('userGroup') == "Judge") {
                window.location.href = "/en/secure/judge.html";
            } else if (localStorage.getItem('userGroup') == "Applicant") {
                window.location.href = "/en/secure/applicant/my-account.html";
            }
			else if(localStorage.getItem('userGroup') == "Administration"){
				window.location.href = sessionStorage.getItem('securePageUrl');
			}
         }
			$('.loader-parent').hide();
			return response;
		})
        .catch(function(error) {

            
        });
}

function getRequestHeader(key) {
    if (key) {
        return REQUEST_HEADERS[key] || '';
    }
    return REQUEST_HEADERS;
}
//function to setCookie
function setCookie(cname, cvalue, exdays) {
    var expires = "";
    if (exdays !== '') {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        expires = "expires="+ d.toUTCString();
    }
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;Secure;";
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
