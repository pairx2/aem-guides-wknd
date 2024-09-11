
const REQUEST_HEADERS = {
    'Content-Type': 'application/json'
};

function UpdateLoginDataRequest(formData) {   
    formData.body = {
        captchaType: 'ent',
        captchaAction :'submit',
        loginID: formData.body.email,
        password: formData.body.password,
		"g-recaptcha-response" : formData.body["g-recaptcha-response"]		
    }
    return formData
}

function onErrorUserLogin(response) {
    $(".o-form-container__error-msg").hide();
    showApiError('#login-api-error', response);
}
function onSuccessUserLogin(data) {
   if(data.errorCode == 0) {
	   $('.loader-parent').show(); 
	   $(".o-form-container__success-msg").hide();
        var jwtToken = data.response.jwtToken.id_token;
		sessionStorage.setItem('jwtToken', jwtToken);
        sessionStorage.setItem('LoggedInTime', new Date());
        setCookie('id.token', jwtToken, '');
        enableSession();
		setApiHeaders();
       
  }
}

function getRequestHeader(key) {
    if (key) {
        return REQUEST_HEADERS[key] || '';
    }
    return REQUEST_HEADERS;
}

function setApiHeaders() {
    const headerElms = document.querySelectorAll('input[data-header][type=hidden]');
    headerElms.forEach(function(headerElm) {
        const name = headerElm.getAttribute('name');
        const value = headerElm.value;
        REQUEST_HEADERS[name] = value;
    });
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

function enableSession() {
    return callSession(true);

}

function callSession(enable) {
var diagnosticPreferredLanguage = document.querySelector('input[name="x-preferred-language"]').value;
var diagnosticheaderCountryCode = document.querySelector('input[name="x-country-code"]').value;
var diagnosticheaderApplicationId = document.querySelector('input[name="x-application-id"]').value;
	var sessionApiUrl;
    if(location.pathname.includes('/content/')) {
        sessionApiUrl = $('#session-api-url').val();
    }
    else{
        sessionApiUrl = '/api/private/profile/session';
   }

 const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': getRequestHeader('Content-Type'),
            'x-id-token':  getCookie('id.token'),
            'x-application-id': diagnosticheaderApplicationId,
            'x-country-code': diagnosticheaderCountryCode,
            'x-preferred-language': diagnosticPreferredLanguage
        },
        mode: 'cors',
        cache: 'no-cache'

    };
    fetch(sessionApiUrl + "?enable=" + enable, requestOptions)
        .then(function(response) {
          if (response.status == 200) {
              $('.loader-parent').hide();
             window.location.href="/secure/home.html";  
               

         }

			return response;
		})
        .catch(function(error) {


        });
}



// Login valid check
function UserLoginValidCheck() {
    var jwtTokenStatus = sessionStorage.getItem('jwtToken');
    if(jwtTokenStatus) {
        var jwtTokenStoredTime = new Date(sessionStorage.getItem('LoggedInTime'));
        var currentDate = new Date();
        var sessionDiff = (currentDate.getTime() - jwtTokenStoredTime.getTime()) / 1000;
        // Setting session tiemout
        var sessionTimeOut = 1000;  //seconds
        if(sessionDiff <= sessionTimeOut) {
            console.log('Valid Session time : ' + sessionDiff);
           	logouttrigger();
            return true;
        }
        else {
            console.log('Invalid Session time : ' + sessionDiff);

            return false;
        }
    }
    else {
        return false;
    }
}

