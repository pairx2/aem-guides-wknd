
/**********************************
Form Container
**********************************/
let searchUserurl = new URL(document.querySelector('#session-api-url').value);
let searchUserurlOrigin = searchUserurl.origin;
let appJson = "application/json";
let xPrefLang = $("input[name=x-preferred-language]").val();
let xApplicationId = $("input[name=x-application-id]").val();
let apiURL = $("#apiURL").val();
let xCountryCode = $("input[name=x-country-code]").val(); 
const isEnterpriseRecaptchaEnabled = $("input[name=enterpriseRecaptcha]").length ? $("input[name=enterpriseRecaptcha]").val() : false;
let userInfo = getLocalStorage('userInfo');
let currenturlSso = window.location.href;
if(searchUserurlOrigin.includes("uat")){
  searchUserurlOrigin = searchUserurlOrigin.replace('uat','staging')
}
$(document).ready(function() {
    if (currenturlSso.includes("loginsso.html?code=")) {
        $('.header .o-header-v2-global__section--utility-top').hide();
        setTimeout(function(){
          showLoading();
          loginFunction();
        },500);
    }
    if (currenturlSso.includes("login") && !currenturlSso.includes("loginsso.html?code=")) {
        let sessionApi;
        if (location.pathname.includes('/content/')) {
            sessionApi = $('#session-api-url').val();
        } else {
            sessionApi = '/api/private/profile/session';
        }
        updateSessionCookie(sessionApi, false);
        logoutClearData();
    }
    if(userInfo?.firstName){
      let welcomeTxt = $('.o-header-v2-global__section--utility-top .cmp-text p').text().split(',')[0];
      $('.o-header-v2-global__section--utility-top .cmp-text p').text(`${welcomeTxt}, ${userInfo.firstName}`);
      $('.userName h2>span').text($('.userName h2>span').text().replace('FirstName',userInfo.firstName));
    }

    //remove SVG in calendar
    $(".month-item-header .button-previous-month svg").remove();
    $(".month-item-header .button-next-month svg").remove();
});
$(document).ready(function(){
    $( "body" ).delegate( ".save-and-exit", "click", function() {
      setTimeout(function(){ 
        showLoading();
      },100);
      if($(this).closest('.o-wizard__content').attr('data-wizarditem') == "2"){
        saveNewLocation(); 
      }
      $(".errorRes").html("");
      saveProgramData('save-and-exit');
    });
    $( "body" ).delegate( ".btn[name='Previous']", "click", function() {
      $(".errorRes").html("");
    });
    $( "body" ).delegate( ".btn[name='next']", "click", function() {
      setTimeout(function(){ 
        showLoading();
      },100);
      if($(this).closest('.o-wizard__content').attr('data-wizarditem') == "2" && $("[name='new-location']:visible").length > 0){
        saveNewLocation();
      }else{
        saveProgramData('next');
      }
      $(".errorRes").html("");
    });

    function inputStyleData(){
      $(".formcontainer input.form-control").each(function(index){
        let input_val = $(this).val();
        let placeholder_val = $(this).attr("placeholder");
        if((input_val == placeholder_val) || (input_val == "")){
          $(this).css({"font-family":"BrandonTextWeb-Regular","font-weight":"390","color":"#63666a"});
        }
        else{
          $(this).css({"font-family":"BrandonTextWeb-Medium","font-weight":"420","color":"#222731"});
        }
      });
    }
    $(".formcontainer input.form-control").on("keyup", inputStyleData);
    inputStyleData();
});
function loginFunction(){
  let adminSessionCode = currenturlSso.split('code=')[1].split('==')[0];
        let data = {};
        $.ajax({
            url: searchUserurlOrigin + '/api/public/profile/login',
            type: "POST",
            dataType: 'json',
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify(data),
            "headers": {
                "x-application-id": xApplicationId,
                "x-country-code": xCountryCode,
                "x-preferred-language": xPrefLang+'_'+xCountryCode,
                "x-code-token": adminSessionCode
            },
            success: function(dataRes) {
              if(dataRes.errorCode == 0){
                let sessionApiUrl;
                if (location.pathname.includes('/content/')) {
                    sessionApiUrl = $('#session-api-url').val();
                } else {
                    sessionApiUrl = '/api/private/profile/session';
                }
    
                const dateVariable = new Date();
                let jwtToken = dataRes.response.jwtToken.id_token;
                setCookie('id.token', jwtToken, '');
                let jwtRefreshToken = dataRes.response.jwtToken.refresh_token;
                setLocalStorage('loginTime', dateVariable.toLocaleTimeString('en-GB'));
                setSessionStorage('jwtToken', jwtToken);
                setSessionStorage('jwtRefreshToken', jwtRefreshToken);
    
                let parsedToken = parseJwt(jwtToken);
                setSessionStorage('jwtExp', parsedToken.exp);
                let firsttimestamp = parsedToken.iat;
    
                let loginResponse = dataRes.response;
                loginResponse.refreshTokenStartTime = firsttimestamp;
                setSessionStorage('loginResponse', loginResponse);
    
                let jwtAddlClaimsToken = dataRes.response.jwtToken.addl_claims_token;
                setSessionStorage('jwtAddlClaimsToken', jwtAddlClaimsToken);
    
                let userInfo = dataRes.response.accountInfo.userInfo;
                setLocalStorage('userInfo', userInfo);
    
                let groupAccount = dataRes.response.accountInfo.userInfo.additionalProperties.wnGroups;
                localStorage.setItem("groups", groupAccount);
                setLocalStorage('userLoggedout', false);

                updateSessionCookie(sessionApiUrl, true);
              }
    
            },
            error: function(error) {
              checkUnauthorized(error);
            }
        });
}

function saveProgramData(action){
  let uFirstName = userInfo?.firstName;
  let uLastName = userInfo?.lastName;
  let uEmail = userInfo?.email;
  let uProgramType = $('[name="course"]').find('li.selected>span').text().trim();
  let uProgramCategory = $('[name="program-category"]').find('li.selected>span').text().trim();
  let uProgramId = $('[name="program-id"]').val().trim();
  let uProgramTitle = $('[name="program-title"]').val().trim();
  let uLocationName;
  let uAddress = $('[name="address"]').val().trim();
  if ($('[name="location"]').find('li.selected>span').text().length > 0 && $('[name="new-location"]:visible').length == 0) {
    uLocationName = $('[name="location"]').find('li.selected>span').text().trim();
    if(uLocationName.indexOf(uAddress)>=0){
      uLocationName = $('[name="location"]').find('li.selected').attr('data-location');
    }
  }else{
    uLocationName = $('[name="new-location"]').val().trim();
  }
  let uCity = $('[name="city"]').val().trim();
  let uState = $('[name="state"]').find('li.selected').attr('data-optionvalue')?$('[name="state"]').find('li.selected').attr('data-optionvalue'):$('[name="state-text"]').val().trim();
  let uzipCode = $('[name="postal-code"]').val().trim();
  let uCountry = $('[name="country"]').find('li.selected>span').text().trim();
  let uDate = $('[name="date"]').val().trim();
  let uStartTime = $('[name="starttime"]').val().trim();
  let uEndTime = $('[name="endtime"]').val().trim();
  let uTimezone = $('[name="timezone"]').find('li.selected>span').text().trim();
  let upiID = userInfo?.additionalProperties?.UPI;
  let territoryId = userInfo?.additionalProperties?.territoryId;
  let data = {
    "action": "saveDraft",
    "firstName": uFirstName,
    "lastName": uLastName,
    "email": uEmail,
    "programId": uProgramId,
    "programTitle": uProgramTitle,
    "programType": uProgramType,
    "programCategory": uProgramCategory,
    "locationName": uLocationName,
    "address": uAddress,
    "city": uCity,
    "state": uState,
    "zipCode": uzipCode,
    "country": uCountry,
    "programStartDate": uDate,
    "startTime": (uStartTime),
    "endTime": (uEndTime),
    "timezone": uTimezone,
    "createdBy": uEmail,
    "upi": upiID,
    "buildingId": $('.o-wizard__container').attr('buildingID')? $('.o-wizard__container').attr('buildingID') : $('[name="location"]').find('li.selected').attr("data-optionvalue"),
    "requestId": $('.o-wizard__container').attr('currRequestID'),
    "territoryId": territoryId
  };
  $.ajax({
      url: searchUserurlOrigin + '/api/v2/private/learning/program', 
      type: "POST",
      dataType: 'json',
      contentType: "application/json;charset=UTF-8",
      data: JSON.stringify(data),
      "headers": {
          "x-application-id": xApplicationId,
          "x-country-code": xCountryCode,
          "x-preferred-language": xPrefLang,
          "x-id-token": getSessionStorage('jwtToken')
      },
      success: function(dataRes) {
        if(dataRes.errorCode == 0){
          $('.o-wizard__container').attr('currRequestID', dataRes?.response?.draftRequestId);
          hideLoading();
          if(action == 'save-and-exit'){
            window.location.href="/secure/manage-my-programs";
          }
        }
      },
      error: function(error) {
        checkUnauthorized(error);
        hideLoading();
      }
  });
}

function miltaryToStandardTime(time){
  if(time){
    time = time.split(':'); // convert to array

    // fetch
    let hours = Number(time[0]);
    let minutes = Number(time[1]);

    // calculate
    let timeValue;

    if (hours > 0 && hours <= 12) {
      timeValue= "" + hours;
    } else if (hours > 12) {
      timeValue= "" + (hours - 12);
    } else if (hours == 0) {
      timeValue= "12";
    }
    
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
    timeValue += (hours >= 12) ? " pm" : " am";  // get AM/PM
    return timeValue;
  }
  
}

function saveNewLocation(){
  $(".errorRes").hide();
  let uFirstName = userInfo?.firstName;
  let uLastName = userInfo?.lastName;
  let uLocationName = $('[name="new-location"]').val().trim()?$('[name="new-location"]').val().trim():$('[name="location"]').find(".selected").find("span").text().trim();
  let uAddress = $('[name="address"]').val().trim();
  let uCity = $('[name="city"]').val().trim();
  let uState = $('[name="state"]').find('li.selected').attr('data-optionvalue')?$('[name="state"]').find('li.selected').attr('data-optionvalue'):$('[name="state-text"]').val().trim();
  let uzipCode = $('[name="postal-code"]').val().trim();
  let uCountry = $('[name="country"]').find('li.selected>span').text().trim();
  let uTerritoryId = userInfo?.additionalProperties?.territoryId;
  let data = {
    "action": "addLocation",
    "country": uCountry,
    "state": uState,
    "locationName": uLocationName,
    "address": uAddress,
    "city": uCity,
    "postalCode": uzipCode,
    "firstName": uFirstName,
    "lastName": uLastName,
    "salesTerritoryID": uTerritoryId
  };
  $.ajax({
      url: searchUserurlOrigin + '/api/v2/private/learning/programlocation',
      type: "POST",
      dataType: 'json',
      contentType: "application/json;charset=UTF-8",
      data: JSON.stringify(data),
      "headers": {
          "x-application-id": xApplicationId,
          "x-country-code": xCountryCode,
          "x-preferred-language": xPrefLang,
          "x-id-token": getSessionStorage('jwtToken')
      },
      success: function(dataRes) {
        if(dataRes.errorCode == 0){
          let buildingID = dataRes.response;
          if(dataRes.errorCode == 0 && dataRes.status){
            $('.o-wizard__container').attr('buildingID', buildingID)
          }
          saveProgramData('next');
        }else{
          setTimeout(function(){
            $(".o-wizard__content[data-wizarditem='3']").css("display", "none");
            $("fieldset[data-wizarditem='2']").attr("style", "display:block !important; opacity:1;");
            $(".a-wizard__steps [data-wizard='3']").removeAttr("class").addClass("wizard-step a-wizard__step--incomplete ");
            $(".a-wizard__steps [data-wizard='2']").removeAttr("class").addClass("wizard-step a-wizard__step--incomplete a-wizard-step--active");
            let locationApiError = $(".locationApiError").val();
            $(".selectProgram").append("<p class='text-center errorRes'><span>"+locationApiError+"</span></p>");
        }, 1000);
        }
        hideLoading();
      },
      error: function(error) {
        checkUnauthorized(error);
        setTimeout(function(){
          $(".o-wizard__content[data-wizarditem='3']").css("display", "none");
          $("fieldset[data-wizarditem='2']").attr("style", "display:block !important; opacity:1;");
          $(".a-wizard__steps [data-wizard='3']").removeAttr("class").addClass("wizard-step a-wizard__step--incomplete ");
          $(".a-wizard__steps [data-wizard='2']").removeAttr("class").addClass("wizard-step a-wizard__step--incomplete a-wizard-step--active");
          let locationApiError = $(".locationApiError").val();
          $(".selectProgram").append("<p class='text-center errorRes'><span>"+locationApiError+"</span></p>");
      }, 1000);
        hideLoading();
      }
  });
}

/**
 * @method
 * @desc Add icon to error
 */

$(".a-input-field--text-require").each(function() {
  if ($(this).find("em").length === 0) {
    $(this).prepend('<em class="abt-icon abt-icon-exclamation"></em>');
  }
});

/**
 * @method
 * @desc find the loading device
 */
function isDevice() {
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(
    navigator.userAgent
  );
}

/**
 * @method
 * @desc return month in number
 */
function getNumericMonth(monthAbbr) {
  return String(
    [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ].indexOf(monthAbbr) + 1
  );
}

/**
 * Common Utilities
 */

//function to check if URL contains parameter
function hasUrlParameter(name) {
  let hasParam = (window.location.href.indexOf(name) > -1) ? true : false;
  return hasParam;
}

//function to setCookie
function setCookie(cname, cvalue, exdays) {
  let expires = "";
  if (exdays !== '') {
      let d = new Date();
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
  for (let value of ca) {
      let c = value;
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return '';
}

//function to get Cookies Obj
function getCookiesObj(cname) {
  let cVal = getCookie(cname);
  let cObj = (cVal && cVal !== "") ? JSON.parse(cVal) : cVal;
  return cObj;
}

//function to deleteCookie
function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;Secure;';
}

// function to set Local Storage Object
function setLocalStorage(key, object) {
  localStorage.setItem(key, JSON.stringify(object));
}

// function to get Local Storage Object
function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// function to remove Local Storage Object
function removeLocalStorage(key) {
  localStorage.removeItem(key);
}

// function to set Session Storage Object
function setSessionStorage(key, object) {
  sessionStorage.setItem(key, JSON.stringify(object));
}

// function to get Session Storage Object
function getSessionStorage(key) {
  return JSON.parse(sessionStorage.getItem(key));
}

// function to remove Session Storage Object
function removeSessionStorage(key) {
  sessionStorage.removeItem(key);
}

// function to show loading spinner
function showLoading() {
  $('.a-spinner:first').removeClass('d-none');
}

// function to hide loading spinner
function hideLoading() {
  $('.a-spinner:first').addClass('d-none');
}

// Parse JWT Token
function parseJwt(token) {
  if (!token) {
      return {};
  }

  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(atob(base64).split("").map(function(c) {
      return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));

  return JSON.parse(jsonPayload);
}

function updateSessionCookie(apiEndpoint, enableValue) {
  const requestOptions = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'x-id-token': getSessionStorage("jwtToken"),
          "x-application-id": xApplicationId,
          "x-country-code": xCountryCode,
          "x-preferred-language": xPrefLang
      },
      mode: 'cors',
      cache: 'no-cache'

  };
  fetch(apiEndpoint + "?enable=" + enableValue, requestOptions).then(function(response) {
      if (response.status == 200) {
        let userInfo = getLocalStorage('userInfo');
          if (userInfo?.additionalProperties?.group != null && enableValue !== false) {
            if(userInfo.additionalProperties?.group.includes("Users") && userInfo.additionalProperties?.group.includes("Admins")){
              adminTerritoryUpdate();
            }else if(userInfo.additionalProperties?.group.includes("Admins")){
              adminTerritoryUpdate();
            }else{
              userterritoryfun(userInfo);
            }
          }
          hideLoading();
      }
      return response;
  })

}
function userterritoryfun(source){
  if(source?.additionalProperties?.territoryId == undefined || source?.additionalProperties?.territoryId == ""){
    window.location.href = "/secure/territory-request";
  }else{
    window.location.href = "/secure/home";
  }
}

// Clear Client Data
function logoutClearData() {
  setLocalStorage('userLoggedout', true);
  removeSessionStorage("jwtToken");
  removeSessionStorage('idleTime');
  removeLocalStorage("userInfo");
  removeLocalStorage("groups");
  removeSessionStorage("jwtExp");
  removeSessionStorage("jwtRefreshToken");
  removeSessionStorage("loginResponse");
  removeSessionStorage("jwtAddlClaimsToken");
  removeLocalStorage("loginTime");
  deleteCookie('id.token');
  hideLoading();
  removeLocalStorage('isAbtUsr');
}

function adminTerritoryUpdate(){
  let territoryId = {
    "userInfo": {
      "additionalProperties": {
        "territoryId": "9999999"
      }
    }
  }
  $.ajax({
    url: searchUserurlOrigin + '/api/private/profile/update-profile-info',
    type: "POST",
    dataType: 'json',
    contentType: "application/json;charset=UTF-8",
    data: JSON.stringify(territoryId),
    "headers": {
        "x-application-id": xApplicationId,
        "x-country-code": xCountryCode,
        "x-preferred-language": xPrefLang+'_'+xCountryCode,
        "x-id-token": getSessionStorage('jwtToken'),
        "Content-Type": 'text/plain'
    },
    success: function(dataRes) {
      if(dataRes.errorCode == 0){
        window.location.href = window.location.origin + "/secure/home";
      }
    }
  });
}
if($('[name="territoryId"]').length){
  $('[name="territoryId"]').keypress(function(e){
    if(e.keyCode == 13){
      e.preventDefault();
      e.stopPropagation();
      $(".btn[name='territoryUpdate']").click();
    }
  })
}
$( "body" ).delegate( ".btn[name='territoryUpdate']", "click", function() {
  userTerritoryUpdate();
});

function userTerritoryUpdate(){
  setTimeout(function(){
    showLoading();
  }, 100);
  let userInfoo = getLocalStorage('userInfo');
  userInfoo.additionalProperties.territoryId = $("[name='territoryId']").val();
  setLocalStorage("userInfo", userInfoo);
  let territoryId = {
    "userInfo": {
      "additionalProperties": {
        "territoryId": $("[name='territoryId']").val()
      }
    }
  }
  $.ajax({
    url: searchUserurlOrigin + '/api/private/profile/update-profile-info',
    type: "POST",
    dataType: 'json',
    contentType: "application/json;charset=UTF-8",
    data: JSON.stringify(territoryId),
    "headers": {
        "x-application-id": xApplicationId,
        "x-country-code": xCountryCode,
        "x-preferred-language": xPrefLang+'_'+xCountryCode,
        "x-id-token": getSessionStorage('jwtToken'),
        "Content-Type": 'text/plain'
    },
    success: function(dataRes) {
      if(dataRes.errorCode == 0){
        window.location.href = window.location.origin + "/secure/home";
      }
      hideLoading();
    }
  });
} 

function checkUnauthorized(error){
  if(error.responseJSON.message == "UNAUTHORIZED"){
      window.location.href = '/login';
  }
}