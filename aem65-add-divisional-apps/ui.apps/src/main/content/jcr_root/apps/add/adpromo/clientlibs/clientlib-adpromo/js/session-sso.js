const REQUEST_HEADERS = {
    'Content-Type': 'application/json'
};
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
function updateSessionCookie(apiEndpoint, enableValue) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-id-token':  getCookie('id.token'),
			"x-application-id": xApplicationId,
			"x-country-code": xCountryCode,
			"x-preferred-language": xPrefLang
        },
        mode: 'cors',
        cache: 'no-cache'

    };
    fetch(apiEndpoint + "?enable=" + enableValue, requestOptions)
        .then(function(response) {
          if (response.status == 200) {
            
				window.location.href = sessionStorage.getItem('securePageUrl');
		
         }
			$('.loader-parent').hide();
			return response;
		})
        .catch(function(error) {

            
        });
}
$(document).ready(function() {   
	
	var currenturlSso = window.location.href;
    if(currenturlSso.includes("loginsso.html?code="))
	{
        var adminSessionCode = currenturlSso.split('code=')[1].split('==')[0];
        var data ={}
        $.ajax({			
			url: searchUserurlOrigin + '/api/public/profile/login',
			type: "POST",
			dataType: 'json',
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify(data),
			"headers": {
			"x-application-id": xApplicationId,
			"x-country-code": xCountryCode,
			"x-preferred-language": xPrefLang,
			"x-code-token" : adminSessionCode
			},
			success: function(response) {
                var sessionApiUrl;
                let jwtToken = response.response.jwtToken.id_token;
                let userFirstName = response.response.accountInfo.userInfo.firstName;
                localStorage.setItem("currUserName",userFirstName);
				if(location.pathname.includes('/content/')) {
				sessionApiUrl = $('#session-api-url').val();
				}
			else{
			sessionApiUrl = '/api/private/profile/session';
			}	
			setCookie('id.token', jwtToken, '');
			setApiHeaders();
			updateSessionCookie(sessionApiUrl, true);
            var groupAccount = response.response.accountInfo.userInfo.additionalProperties.groups;
            localStorage.setItem("groups", groupAccount);

			},
			error: function(error) {
                window.location.href = "/en/errors/403.html";
            }
		});
	}
	
	});