let searchUserurl = new URL(document.querySelector('#session-api-url').value);
let searchUserurlOrigin = searchUserurl.origin;
let xPrefLang = document.querySelector('input[name="x-preferred-language"]').value;

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
    let expires = "";
    if (exdays !== '') {
        let d = new Date();
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
            'x-id-token':  getSessionStorage("jwtToken"),
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
		  
		    if(localStorage.getItem('groups') != null ){				
				
			  window.location.href = window.location.origin+"/webnova/index.html";
			}
            
				
		
         }
			$('.loader-parent').hide();
			return response;
		})
      
}
$(document).ready(function() {   
	
	let currenturlSso = window.location.href;
    if(currenturlSso.includes("loginsso.html?code="))
	{
        let adminSessionCode = currenturlSso.split('code=')[1].split('==')[0];
        let data ={}
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
			success: function(dataRes) {
                let sessionApiUrl;
				if(location.pathname.includes('/content/')) {
				sessionApiUrl = $('#session-api-url').val();
				}
			else{
			sessionApiUrl = '/api/private/profile/session';
			}	
						
			const dateVariable=new Date();
			let jwtToken = dataRes.response.jwtToken.id_token;			
			let jwtRefreshToken = dataRes.response.jwtToken.refresh_token;
			setCookie('id.token', jwtToken, '');
			setApiHeaders();
			setLocalStorage('loginTime', dateVariable.toLocaleTimeString('en-GB'));
			setSessionStorage('jwtToken', jwtToken, '');
			setSessionStorage('jwtRefreshToken', jwtRefreshToken);
			
			let parsedToken = parseJwt(jwtToken);
			setSessionStorage('jwtExp',parsedToken.exp);
			let firsttimestamp = parsedToken.iat;
			
			let loginResponse = dataRes.response;
			loginResponse.refreshTokenStartTime = firsttimestamp;
			setSessionStorage('loginResponse', loginResponse);			

			let jwtAddlClaimsToken = dataRes.response.jwtToken.addl_claims_token;
			setSessionStorage('jwtAddlClaimsToken',jwtAddlClaimsToken);

			let userInfo = dataRes.response.accountInfo.userInfo;
			setLocalStorage('userInfo',userInfo);
			
            let groupAccount = dataRes.response.accountInfo.userInfo.additionalProperties.wnGroups;
            localStorage.setItem("groups", groupAccount);
			setLocalStorage('userLoggedout',false);

			triggerLoginEvent();
			updateSessionCookie(sessionApiUrl, true);

			},
			error: function(error) {
                window.location.href = "/en/errors/403.html";
            }
		});
	}
	
	});