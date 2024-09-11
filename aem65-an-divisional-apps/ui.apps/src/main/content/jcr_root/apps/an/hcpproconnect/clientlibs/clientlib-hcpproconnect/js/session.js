let idleTime = 0;
let autoLogoutCounter = 0;
let autoLogoutInterval;
let popupTimerCountInterval;
let bodyContent;
let extendSystemSessionVar;
const minValue = 60 * 1000;
const secValue = 1000;
const sessionOutTime = $("#sessionOutTime").attr("value") ? $("#sessionOutTime").attr("value").trim() : "10";
const sessionPopupTime = $("#sessionPopupTime").attr("value") ? $("#sessionPopupTime").attr("value").trim() : "5";
const sessionPopupTime_sec = 60 *  parseInt(sessionPopupTime);

$(document).ready(function() {
    if (isUserLoggedIn()) {
        setTimeout(function() {
            triggerLoginEvent();
        }, 100);
        // check for uk and not patient pages
        if(isCountryCodeUK() && ($("input[name=x-application-id]").val()!="anpatientcarers")) {
            // 5 min interval to extend system session
            extendSystemSessionVar = setInterval(extendSystemSession, 300 * 1000);
            setTimeout(function() {
                extendSystemSession();
            }, 5000);
            $(this).mousemove(function(e) {
                 idleTime = 0;
            });
            $(this).keypress(function(e) {
              idleTime = 0;
            });
            window.onscroll=function(){
              idleTime = 0;
            }
            popupTimerCountInterval = setInterval(popupTimerCount, secValue);
        }
    }

    // Handle #logout
    window.addEventListener('hashchange', function() {
      if (location.hash === '#logout') {
         logout();
      }
    }, false);
});

// Parse JWT Token
function parseJwt (token) {
   if(!token) {
      return {};
   }

   let base64Url = token.split('.')[1];
   let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
   let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
   }).join(''));

   return JSON.parse(jsonPayload);
}

// Utility for if User is Logged In
function isUserLoggedIn() {  
   return Date.now() < (getLocalStorage('jwtExp') * 1000);
}

// Trigger login event
function triggerLoginEvent() {
   $('body').trigger('an-hcpproconnect:login', [getLocalStorage('userInfo')]);
   $('body').addClass('logged-in');
}

function logout() {
   showLoading();

   const logoutForm = $("#logoutForm form");
   const action = logoutForm.attr("action");
   const token = getCookie("jwtToken");

   $.ajax({
      "url": action,
      "method": "POST",
      "headers": {
         "x-application-id": xApplicationId,
         "x-country-code": xCountryCode,
         "x-preferred-language": xPreferredLanguage,
         "x-id-token": token
      }
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

function enableSession() {
   return callSession(true);
}

function disableSession() {
   return callSession(false);
}

function callSession(enable) {

   const logoutForm = $("#enableSessionForm form");
   const action = logoutForm.attr("action").replaceAll(/https?:\/\/[^\/]+/g,'');
   const token = getCookie("jwtToken");

   return $.ajax({
      "url": action + "?enable=" + enable,
      "method": "GET",
      "async": false,
      "headers": {
         "x-application-id": xApplicationId,
         "x-country-code": xCountryCode,
         "x-preferred-language": xPreferredLanguage,
         "x-id-token": token
      }
   });
}

// Clear Client Data
function logoutClearData() {
   deleteCookie("jwtToken");
   removeLocalStorage("userInfo");
   removeLocalStorage("addedToCart");
   removeLocalStorage("jwtExp");
   triggerLogoutEvent();
   hideLoading();
}

// Trigger logout event
function triggerLogoutEvent() {
   $('body').trigger('an-hcpproconnect:logout');
}

function redirectHome() {
   let home = $("[name=homePath]").val();
   let str = "/"+$("input[name=x-country-code]").val()+"/"+$("input[name=x-preferred-language]").val()+"/"
   let currentpath = location.href;
   let domain = currentpath.substring(0,currentpath.indexOf(str.toLowerCase())+7);

   let referer = sessionStorage.getItem("refererUrl")
   if(referer != null && referer !="") //If referer url is present redirect to referer
   {
		let urlToRedirect = referer;
        sessionStorage.setItem("refererUrl", '');
        location.href = urlToRedirect ;
    }
    else {
		location.href = domain+home;
    }
}
/**
**  Onclik function to extend the session
*/
$(document).on('click',"#sessionTimeoutBtnPopup",function () {
    $("#sessionTimeoutExpFrag").css("display","none");
    $("#closeButtonContainer").remove();
    enableSession();
    resetAutoLogoutTime();
});

/**
**  Onclick function to close the popup.
*/
$(document).on('click',"#closeIcon",function () {
    $("#sessionTimeoutExpFrag").css("display","none");
    $("#closeButtonContainer").remove();
    resetAutoLogoutTime();
});

/**
**  Increment timer and show popup.
*/
function popupTimerCount() {
  idleTime = idleTime + 1;
  if (idleTime > sessionPopupTime_sec - 1 && !$("#sessionTimeoutExpFrag").is(":visible")) {
    //backdrop show
    $("body").css('overflow', 'hidden');
    $("#sessionTimeoutExpFrag").parent().show();

    bodyContent = $("#sessionTimeoutBodyText h5").text();
    bodyContent =  bodyContent.replace("{min}", sessionOutTime);

    $("#sessionTimeoutBodyText h5").text(bodyContent);
    $("#closeButtonContainer").remove();
    $("#sessionTimeoutExpFrag").append('<div id="closeButtonContainer"><span class="generic-modal--close" data-dismiss="modal" aria-label="Close"><i id="closeIcon" aria-hidden="true" class="abt-icon abt-icon-cancel"></i></span></div>');
    $("#sessionTimeoutExpFrag").css("display","flex");
    clearInterval(popupTimerCountInterval);
    autoLogoutInterval = setInterval(autoLogoutCount, minValue); // 1 min

  }
}
/**
** Auto logout when popup is displayed
*/
function autoLogoutCount() {
    if($("#sessionTimeoutExpFrag").is(":visible")) {
        autoLogoutCounter = autoLogoutCounter + 1;
    } else {
        autoLogoutCounter = 0;
    }
    if(autoLogoutCounter > sessionOutTime -1 ) {
        disableSession();
        logout();
    }
}

/**
**  Reset count for the autologout timer
*/
function resetAutoLogoutTime() {
    //backdrop show
    $("body").css('overflow', 'auto');
    $("#sessionTimeoutExpFrag").parent().hide();
    setTimeout(function(){
      clearInterval(autoLogoutInterval);
      popupTimerCountInterval = setInterval(popupTimerCount, secValue); // 1 sec
    },100);
    autoLogoutCounter = 0;
    idleTime = 0;
}

function extendSystemSession() {
    if (isUserLoggedIn()) {
        enableSession();
    } else {
        clearInterval(extendSystemSessionVar);
    }
}

