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
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        expires = "expires="+ d.toUTCString();
    }
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;Secure;";
}

//function to get URL parameter
function getUrlParameter(name) {
    name = name.replace(/[[]/, '\\[').replace(/[]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(window.location.href);
    return results === null ? '' : decodeURIComponent(results[1]);
}

//function to getCookie
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i of ca) {
        let c = i;
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

//Show generic Error popup
function showError() {
    $("#section-custom-popup-hidden").show();
    $("#section-commonErrorPopup").show();
}

//Hide generic Error popup
function hideError() {
    $("#section-custom-popup-hidden").hide();
    $("#section-commonErrorPopup").hide();
}


// function to show loading spinner
function showLoading() {
    $('#page-spinner').show();
}

// function to hide loading spinner
function hideLoading() {
    $('#page-spinner').hide();
}

function showApiError(id) {
    if (typeof id == "undefined" || id == "") {
        id = "500";
    }
    let error = $("#" + id);
    if (error.length) {
        $("[id^=apiError] .cmp-text").hide();
        $(".o-form-container__error-msg").hide();
        error.show();
        $("[id^=apiError]").show()
    } else {
        $(".o-form-container__error-msg").show();
    }
}

function hideApiError() {
    $("[id^=apiError] .cmp-text").hide();
    $("[id^=apiError]").hide();
    $(".o-form-container__error-msg").hide();
}

function encodeBase64(input) {
    return window.btoa(encodeURIComponent(input));
}

function decodeBase64(input) {
    return decodeURIComponent(window.atob(input));
}