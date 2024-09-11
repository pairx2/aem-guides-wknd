/** User Login -- starts**/
function updateRequestUserLogin(data) {

    delete data.body['requestType'];
    delete data.body['node'];
    data.body['captchaValue'] = data.body['g-recaptcha-response'];
    delete data.body['g-recaptcha-response'];

    return data;
}

function onBeforeUserLogin() {
    showLoading();
    
}

function onSuccessUserLogin(data, usrData = false) {
    if(data.errorCode == 0) {
        const dateVariable=new Date();
        let jwtToken = data.response.jwtToken.id_token;

        let jwtRefreshToken = data.response.jwtToken.refresh_token;
        setLocalStorage('loginTime', dateVariable.toLocaleTimeString('en-GB'));
        setSessionStorage('jwtToken', jwtToken, '');
        setSessionStorage('jwtRefreshToken', jwtRefreshToken);

        let parsedToken = parseJwt(jwtToken);
        setSessionStorage('jwtExp',parsedToken.exp);
		let firsttimestamp = parsedToken.iat;

        let loginResponse = data.response;
		loginResponse.refreshTokenStartTime = firsttimestamp;
        setSessionStorage('loginResponse', loginResponse);

        let jwtAddlClaimsToken = data.response.jwtToken.addl_claims_token;
        setSessionStorage('jwtAddlClaimsToken',jwtAddlClaimsToken);

        let userInfo = data.response.accountInfo.userInfo;
        //session sharing data fix to display update name in header 
        localStorage.setItem('fName', userInfo.firstName);
        localStorage.setItem('lName', userInfo.lastName);
        setLocalStorage('userInfo',userInfo);
        setLocalStorage('userLoggedout',false);
        triggerLoginEvent();

        enableSession();

        hideLoading();
        if(!usrData){
            sessionStorage.removeItem('isUsrRegistered');
        }
        loginDataLayerUpdate(data);
        if (!$(".m-masked-container").length && !sessionStorage.getItem('isUsrRegistered')) {
            redirectHome();
        } else {
            location.reload();
        }

    } else {
        onErrorUserLogin(data);
    }
}

function onErrorUserLogin(error) {
    let loginID = document.querySelector('input[name="loginID"]').value;
    let loginPass = document.querySelector('input[name="password"]').value;
    setSessionStorage('loginID', loginID);
    setSessionStorage('loginPass', loginPass)    
    removeSessionStorage('jwtToken');
    removeSessionStorage('jwtExp');
    removeLocalStorage('userInfo');

    showApiError(error?.response?.i18nMessageKey);

    hideLoading();
    if (error.errorCode == 400 && error.response.i18nMessageKey == 'AUTH-1019') {       
		$('#section-consent-popup-required').show();
		$('#section-consent-popup-required').parents('body').find('.abbott-wrapper').addClass('setZindex');
		$('#consent-popup').show();

    }    
}

function loginDataLayerUpdate(data) {
    // login analytics data layer push
    window.dataLayer = window.dataLayer || [];
    const userData = data.response.accountInfo.userInfo;
    const { userId, sfdcId, specialty, institutionType, segmentType } = userData.additionalProperties;
    window.dataLayer.push({
        "event": "login",
        "cognitoID": `${userId}`,
        "contactID": `${sfdcId}`,
        "specialization": `${specialty}`,
        "institutionType": `${institutionType}`,
        "persona": `${segmentType}`
    });
}
/** User Login -- end**/
//Session storage across tabs
	(function() {
		// Ask other tabs for session storage
		localStorage.setItem('getSessionStorage', Date.now());
		window.addEventListener('storage', function(event) {			

			if (event.key == 'getSessionStorage' && !getLocalStorage('userLoggedout') ) {
				// Some tab asked for the sessionStorage -> send it

				localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
				localStorage.removeItem('sessionStorage');
			} else if (event.key == 'sessionStorage' && !getLocalStorage('userLoggedout')) {
				// sessionStorage is empty -> fill it
				let data = JSON.parse(event.newValue);

				for (let key in data) {
					sessionStorage.setItem(key, data[key]);
				}
		
			}
		});

	})();
