let idleTime = 0,
  flag = 0,
  updated_min = 0;
let idle_extension_time = Number(jQuery("#idle-extension-time").val());
let user_idle_time = Number(jQuery("#idle-time").val());
let session_out_time = Number(jQuery("#session-out-time").val());
let timeleftSec = 60;
let timeleftMin = idle_extension_time * 60;
let session_extend_url = jQuery("#session-extend-url").val();
const user_auto_logoff = user_idle_time + idle_extension_time;
let dt;

$(document).ready(function() {
  if (isUserLoggedIn()) {
    setTimeout(function() {
      triggerLoginEvent();
    }, 100);
    // Increment the idle time counter every minute.
    setInterval(timerIncrement, 60 * 1000); // 1 minute
    setInterval(timeOutSession, 1000); // 1 second
    // Zero the idle timer on mouse movement.
    $(this).mousemove(function(e) {
      idleTime = 0;
    });
    $(this).keypress(function(e) {
      idleTime = 0;
    });
  }
  if (
    !isUserLoggedIn() &&
    getLocalStorage("session-expired-logout") === "true"
  ) {
    jQuery("#section-custom-popup-hidden").show();
    jQuery("#session-timeout").show();
    jQuery(".o-header").addClass("position-static");
  }

  // Handle #logout
  window.addEventListener(
    "hashchange",
    function() {
      if (location.hash === "#logout") {
        logout();
      }
    },
    false
  ); 
  setLocalStorage("WN-GET-AUTH-DETAILS", Date.now().toString());
  removeLocalStorage("WN-GET-AUTH-DETAILS");
});

// Parse JWT Token
function parseJwt(token) {
  if (!token) {
    return {};
  }

  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

// Utility for if User is Logged In
function isUserLoggedIn() {
  
  return Date.now() < getSessionStorage("jwtExp") * 1000;
}

// Trigger login event
function triggerLoginEvent() {
  $("body").trigger("an-hcpsampling:login", [getLocalStorage("userInfo")]);
  $("body").addClass("logged-in");
}

function logout() {
	setLocalStorage("PPC-ISWNALIVE", Date.now().toString());
    removeLocalStorage("PPC-ISWNALIVE");
 
  setTimeout(function() {
    let YesWEBNOVA = true;
	if (getLocalStorage('YESWNALIVE') == YesWEBNOVA) {  
		//partial logout
    
		partialLogout();
	} else {        
		//full logout		
			fullLogout();
	}
  
}, 100);


}	
	

function fullLogout(){	
  removeLocalStorage("YESWNALIVE");
  showLoading();

  const logoutForm = $("#logoutForm form");
  const action = logoutForm.attr("action");
  const token = getSessionStorage("jwtToken");
  let fullpayloadData = {
    "forcedlogout": "true"
  }
    
  $.ajax({
    url: action,
    method: "POST",
    headers: {
      "x-application-id": xApplicationId,
      "x-country-code": xCountryCode,
      "x-preferred-language": xPreferredLanguage,
      "x-id-token": token
    },
    data: JSON.stringify(fullpayloadData)
  })
    .then(function(response) {
      disableSession();
      logoutClearData();
      redirectHome();
    })
    .fail(function() {
      disableSession();
      logoutClearData();
      redirectHome();
    });
}

function partialLogout(){	
  removeLocalStorage("YESWNALIVE");
  showLoading();
  
  const logoutForm = $("#logoutForm form");
  const action = logoutForm.attr("action");
  const token = getSessionStorage("jwtToken");
  let partialpayloadData = {
    "forcedlogout": "false"
   }
  $.ajax({
    url: action,
    method: "POST",
    headers: {
      "x-application-id": xApplicationId,
      "x-country-code": xCountryCode,
      "x-preferred-language": xPreferredLanguage,
      "x-id-token": token
    },
    data: JSON.stringify(partialpayloadData)
  })
    .then(function(response) {
      logoutClearData();
      redirectHome();
    })
    .fail(function() {
      logoutClearData();
      redirectHome();
    });
}

function enableSession() {
  return callSession(true);
}

function disableSession() {
  return callSession(false);
}

function callSession(enable) {
  const logoutForm = $("#enableSessionForm form");
  const action = logoutForm.attr("action").replaceAll(/https?:\/\/[^\\/]+/g, "");  
  const token = getSessionStorage("jwtToken");

  return $.ajax({
    url: action + "?enable=" + enable,
    method: "GET",
    async: false,
    headers: {
      "x-application-id": xApplicationId,
      "x-country-code": xCountryCode,
      "x-preferred-language": xPreferredLanguage,
      "x-id-token": token
    }
  });
}

// Clear Client Data
function logoutClearData() {
  setLocalStorage('userLoggedout',true);
  removeSessionStorage("jwtToken");
  removeLocalStorage("userInfo");
  removeSessionStorage("jwtExp");
  removeSessionStorage("jwtRefreshToken");
  removeSessionStorage("loginResponse");
  removeSessionStorage("jwtAddlClaimsToken");
  removeSessionStorage("bookmark_list");
  removeSessionStorage("show_save_bookmark_popup");
  removeLocalStorage("localIdToken");
  removeLocalStorage("loginTime");
  removeLocalStorage('groups');
  triggerLogoutEvent();
  hideLoading();
  removeLocalStorage('isAbtUsr');
  let sStoreName = getSessionStorage('moduleNames');
  for(let sName in sStoreName){    
    removeSessionStorage(sStoreName[sName].replaceAll(" ",'').toLowerCase());
  }
  removeSessionStorage('moduleNames');          
}

// Trigger login event
function triggerLogoutEvent() {
  $("body").trigger("an-hcpsampling:logout");
}

function redirectHome() {
  let home = $("[name=homePath]").val();
  location.href = home;
}

function timerIncrement() {
  idleTime = idleTime + 1;
  if (
    idleTime === user_idle_time &&
    !jQuery("#section-custom-popup-hidden").is(":visible")
  ) {
    updated_min = idle_extension_time;
    timeleftSec=0;
    jQuery("#idle-extension-time-sec").text(timeleftSec);
    jQuery("#idle-extension-time-min").text(updated_min);
    jQuery("#section-custom-popup-hidden").show();
    jQuery("#session-extend").show();
    dt=setInterval(downloadTimer, 1000);
    jQuery(".o-header").addClass("position-static");
  } else if (idleTime === user_auto_logoff) {
    closeExtendSession();
  }
}
function downloadTimer() {
  if (timeleftMin % 60 === 0) {
    if (timeleftSec > 0) {
      timeleftSec = timeleftSec - 1;
    } else {
      timeleftSec = 59;
     if(updated_min>0){
      updated_min = updated_min - 1;
     }
    }
  }
  
  jQuery("#idle-extension-time-sec").text(timeleftSec);
  jQuery("#idle-extension-time-min").text(updated_min);
  
  if(timeleftSec === 0 && updated_min === 0 ){
    closeExtendSession();
  }
}

function timeOutSession() {
  let updated_date = updatedDate();
  let current_date = new Date();
  if (updated_date === current_date.toLocaleTimeString("en-GB")) {
    setLocalStorage("session-expired-logout", "true");  
    logout();
  }
}
jQuery(
  "#session-timeout #session-close,#session-timeout h4 em").click(function() {
  jQuery("#section-custom-popup-hidden").hide();
  jQuery("#session-timeout").hide();
  jQuery(".o-header").removeClass("position-static");
  removeLocalStorage("session-expired-logout");
});
jQuery(
  "#session-extend h4 em"
).click(function() {
  idleTime = 0;
  clearInterval(dt);
  jQuery("#section-custom-popup-hidden").hide();
  jQuery("#session-extend").hide();
  jQuery(".o-header").removeClass("position-static");
});

function updatedDate() {
  const dateVariable = getLocalStorage("loginTime");
  const date_array = dateVariable.split(":");
  let hour = date_array[0];
  let minute = date_array[1];

  minute = Number(minute) + session_out_time;

  if (minute >= 60) {
    let updatedMinutes = minute / 60;
    hour = Number(hour) + Math.round(updatedMinutes);
    minute = minute % 60;
  }
  if (hour > 24) {
    hour = hour - 24;
  }
  return hour + ":" + minute + ":" + date_array[2];
}
jQuery("#session-extend #extendSession").click(function() {
  showLoading();
  clearInterval(dt);
  const refresh_token = getSessionStorage("jwtRefreshToken");
  const token = getSessionStorage("jwtToken");
  $.ajax({
    url: session_extend_url,
    method: "POST",
    headers: {
      "x-application-id": xApplicationId,
      "x-country-code": xCountryCode,
      "x-preferred-language": xPreferredLanguage,
      "x-id-token": token
    },
    data: JSON.stringify({
      refresh_token: refresh_token
    })
  })
    .then(function(response) {
      idleTime = 0;
      jQuery("#section-custom-popup-hidden").hide();
      jQuery("#session-extend").hide();
      jQuery(".o-header").removeClass("position-static");
      hideLoading();
    })
    .fail(function() {
      hideLoading();
      logout();
    });
});
jQuery("#session-extend #endSession").click(function() {
  logout();
});

jQuery("#session-timeout #session-login").click(function() {
  removeLocalStorage("session-expired-logout");
});


function closeExtendSession(){
  clearInterval(dt);
  jQuery("#section-custom-popup-hidden").hide();
  jQuery("#session-extend").hide();
  jQuery(".o-header").removeClass("position-static");  
  logout();
}
//Webnova header redirection
$('.navbar-nav li:last-child a').on('click', function(e) {
  if (isUserLoggedIn()) {
      e.StopPropagation();
  } else if (!isUserLoggedIn()) {
      e.stopImmediatePropagation();
      let loginRedirect = $('input[name="webnovaRedirect"]').val();
      $(this).attr('href', loginRedirect);
  }

});
//Login Local storage events for Webnova
let logInfo;
let onLocalStorageEvent = function(e) {
  if (e.key == "WN-GET-AUTH-DETAILS" && getSessionStorage('loginResponse') != null) {
      setLocalStorage("WN-SET-AUTH-DETAILS", getSessionStorage('loginResponse'));
	  removeLocalStorage("WN-SET-AUTH-DETAILS");
  }

  if (e.key == 'WN-ISPPCALIVE') {
      setLocalStorage("PPC-AMALIVE", Date.now().toString());
	  removeLocalStorage("PPC-AMALIVE");
  }
  if (e.key == 'WN-AMALIVE') {
      setLocalStorage("YESWNALIVE", true);       
  }
  let WN_userGroups = localStorage.getItem("groups");
    //getting session from Webnova
  if (e.key == "WN-SET-AUTH-DETAILS" && !getLocalStorage('userLoggedout')) {

    if(e.newValue !=null){		
		
      logInfo = JSON.parse(e.newValue);
  
      let WN_jwtToken = logInfo.jwtToken.id_token;
      let WN_jwtRefreshToken = logInfo.jwtToken.refresh_token;
      
      setSessionStorage('jwtToken',WN_jwtToken , '');		
      setSessionStorage('jwtRefreshToken',WN_jwtRefreshToken);
  
      let WN_parsedToken = parseJwt(WN_jwtToken);		
      setSessionStorage('jwtExp',WN_parsedToken.exp);
      
      let WN_firsttimestamp = WN_parsedToken.iat;

      let WN_loginResponse = logInfo;
      WN_loginResponse.refreshTokenStartTime = WN_firsttimestamp;
      setSessionStorage('loginResponse', WN_loginResponse);		

      let WN_jwtAddlClaimsToken = logInfo.jwtToken.addl_claims_token;
      setSessionStorage('jwtAddlClaimsToken',WN_jwtAddlClaimsToken)
  
      let WN_userInfo = logInfo.accountInfo.userInfo;
      setLocalStorage('userInfo',WN_userInfo);
      //updating the login Name in header
      let userInfoData = getLocalStorage("userInfo");
      
      const WN_headerMenu = $(".an-header-menu");
      const WN_headerTop = $(".an-header-top");
        
		  // toggle login + my account components when user is logged in
      const WN_loginLinkStack = $(".an-header-top").find(".o-header__right-links .login");
      const WN_mobileLoginLinkStack = $(".an-header-menu").find(".header-right-link.login");
      const WN_welcomeText = WN_headerTop.find(".welcome-text");
      const WN_myAccount = WN_headerTop.find(".my-account");
      const WN_mobileMyAccount = WN_headerMenu.find(".my-account");
      const WN_mobileWelcomeText = WN_headerMenu.find(".welcome-text");
  
      const WN_userName = getUpdatedUserName(userInfoData);
      WN_welcomeText.find(".username").text(WN_userName);
      WN_mobileWelcomeText.find(".username").text(WN_userName);
      
      // desktop
      WN_welcomeText.removeClass("d-none");
      WN_myAccount.removeClass("d-none");
      WN_loginLinkStack.addClass("d-none");       


      // mobile
      WN_mobileMyAccount.removeClass("d-none");
      WN_mobileLoginLinkStack.addClass("d-none");
      WN_mobileWelcomeText.removeClass("d-none");	
      

      const WN_homeLoginFormContainer = $("#homeLoginFormContainer");
        if (WN_homeLoginFormContainer.length) {
          WN_homeLoginFormContainer.addClass("d-none");
      }     
            
      if(WN_userGroups?.includes("-NonProd-Admins")){
        WN_myAccount.addClass("d-none");
        WN_mobileMyAccount.addClass("d-none");
        $(".o-header__an .an-header-top .o-header__right-links .header-right-link.my-account").hide();
      }
    }
		
  }
     
  if(e.key == "WN-LOGOUT-ADMIN"){
    setLocalStorage('userLoggedout',true);
		removeSessionStorage('jwtToken');
		removeSessionStorage('jwtExp');
		removeLocalStorage('userInfo');	
    removeSessionStorage('jwtRefreshToken');
    removeSessionStorage('loginResponse');	
    removeSessionStorage('jwtAddlClaimsToken');
		removeLocalStorage('groups');
		location.reload();
		
	}
};
window.addEventListener('storage', onLocalStorageEvent, false);

//logic to display user name in header if account is updated
function getUpdatedUserName(usrData){
  let updatedUserName;
    if(localStorage.getItem('fName') && localStorage.getItem('lName')){
      updatedUserName = localStorage.getItem('fName') + " " + localStorage.getItem('lName');
  } else{
      updatedUserName = usrData.firstName + " " + usrData.lastName;
  }
  return updatedUserName;
}