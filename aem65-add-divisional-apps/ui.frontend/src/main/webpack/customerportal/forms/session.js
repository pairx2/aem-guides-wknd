import {eslConfigDatasets} from "./common";

$(document).ready(function() {
    if (window.isUserLoggedIn()) {

       var header = $(".o-header");
       var profile = window.getLocalStorage('profile');
      const escapedText = $('<div/>').text(profile.firstName + " " + profile.lastName).html();
  
      header.find(".m-signup .a-link__inner-text").html(escapedText);
      setTimeout(function() {
        window.triggerLoginEvent(profile);
      }, 100);
    } else {
      // fire page load analytics
      window.addAnalytics.fireAnalyticsEvent("page_loaded", {
        "user" : {
          "userLoginStatus" : "unauthenticated"
        }
      });
    }
 
    // Handle #logout
    window.addEventListener('hashchange', function() {
       if (location.hash === '#logout') {
          window.logout();
       }
    }, false);
 });

 // Parse JWT Token
 function parseJwt (token) {
    if(!token) {
       return {};
    }
 
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
 
    return JSON.parse(jsonPayload);
 }
 window.parseJwt = parseJwt;
 
 // Utility for if User is Logged In
 function isUserLoggedIn() {
    return Date.now() < (localStorage.getItem('jwtExp') * 1000);
 }
 window.isUserLoggedIn = isUserLoggedIn;
 
 // Trigger login event
 function triggerLoginEvent(profile) {
    $('body').trigger('add-customerportal:login', [getLocalStorage('profile')]);
    $('body').addClass('logged-in');
    const role = localStorage.getItem('role');
    if (role === "employee") {
        $('body').addClass('employee');
    }
	const isDistAdmin = localStorage.getItem('isDistAdmin');
	if (isDistAdmin === "true") {
        $('body').addClass('distAdmin');
    }
	
	const profileData = window.getLocalStorage('profile');
	if ((profileData.userType != null) && (profileData.userType === "distributor")) {
		$('body').addClass('distributor');
	}
	
   // get lab profiles 
   initLabProfiles(profile, role);
 }
 window.triggerLoginEvent = triggerLoginEvent;

 function logout() {
    showLoading();
 
    const eslEndpoint = eslConfigDatasets()?.eslEndpoint;
    const service = eslEndpoint + ESL_EPT?.LOGOUT;
    const token = getCookie("jwtToken");
    const headers = getPageDataAttributes();
    headers["x-id-token"] = token;
 
    $.ajax({
       "url": service,
       "method": "POST",
       "headers": headers
    }).then(function(response) {
       disableSession();
       logoutClearData();
       redirectHome();
    }).fail(function() {
       disableSession();
       logoutClearData();
       redirectHome();
    });
 }
 window.logout = logout;
 
 function enableSession() {
    return callSession(true);
 }
 window.enableSession = enableSession;
 
 function disableSession() {
    return callSession(false);
 }
 window.disableSession = disableSession;
 
 function callSession(enable) {

     const eslEndpoint = eslConfigDatasets()?.eslEndpoint;
     const service = ESL_EPT?.SESSION;
     const token = getCookie("jwtToken");
     const headers = getPageDataAttributes();
     headers["x-id-token"] = token;
 
    return $.ajax({
       "url": service + "?enable=" + enable,
       "method": "GET",
       "async": false,
       "headers": headers
    });
 }
 window.callSession = callSession;
 window.setSession = callSession;

const extendSession = async () => {
    const authContext = JSON.parse(
        localStorage.getItem(getLocalAuthContextName())
    );

    const idToken = authContext?.jwtToken?.id_token;
    const refreshToken = authContext?.jwtToken?.refresh_token;

    if (idToken && refreshToken) {
        const { eslEndpoint } = eslConfigDatasets();
        const url = `${eslEndpoint + ESL_EPT?.EXTENDSESSION}`;

        const headers = { ...getPageDataAttributes() };
        headers["x-id-token"] = idToken;

        const requestOptions = {
            method: "POST",
            headers: {
                ...headers,
            },
            body: JSON.stringify({
                refresh_token: refreshToken,
            }),
        };

        const data = await fetch(url, requestOptions);
        const response = await data.json();

        /*
         * Set timeStamp to be checked after {X} ammount of minutes to keep session open
         */
        localStorage.setItem(commonConst.EXTEND_SESSION_TIMESTAMP, Date.now());

        let jwtToken = response?.response?.response?.id_token;

        setCookie("jwtToken", jwtToken);

        var parsedToken = parseJwt(jwtToken);
        localStorage.setItem('jwtExp',parsedToken.exp);

        enableSession();

        return response;
    }
};
window.extendSession = extendSession;

 // Clear Client Data
 function logoutClearData() {
    deleteCookie("jwtToken");
    removeLocalStorage("userInfo");
    removeLocalStorage("jwtExp");
    removeLocalStorage("labProfiles");
    removeLocalStorage("custportalSelectedLabProfile");
    removeLocalStorage(getLocalAuthContextName())
    triggerLogoutEvent();
    hideLoading();
 }
 
 // Trigger login event
 function triggerLogoutEvent() {
    $('body').trigger('add-customerportal:logout');
 }
 
 function redirectHome() {
    let home = eslConfigDatasets()?.logoutRedirectPage;
    if (typeof home == "undefined") {
        home = document.body.dataset?.logoutRedirectPage;
    }
    location.href = home;
 }
