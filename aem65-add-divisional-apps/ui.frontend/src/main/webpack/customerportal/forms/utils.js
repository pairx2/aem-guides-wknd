/**
 * Common Utilities
 */
//function to check if URL contains parameter
function hasUrlParameter(name) {
    var hasParam = (window.location.href.indexOf(name) > -1) ? true : false;
    return hasParam;
}
window.hasUrlParameter = hasUrlParameter;

//function to get URL parameter
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.href);
    return results === null ? '' : decodeURIComponent(results[1]);
}
window.getUrlParameter = getUrlParameter;

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
window.setCookie = setCookie;

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
window.getCookie = getCookie;

//function to get Cookies Obj
function getCookiesObj(cname) {
    var cVal = getCookie(cname);
    var cObj = (cVal && cVal !== "") ? JSON.parse(cVal) : cVal;
    return cObj;
}
window.getCookiesObj = getCookiesObj;

//function to deleteCookie
function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;Secure;';
}
window.deleteCookie = deleteCookie;

// function to set Local Storage Object
function setLocalStorage(key, object) {
    localStorage.setItem(key, JSON.stringify(object));
}
window.setLocalStorage = setLocalStorage;

// function to get Local Storage Object
function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
window.getLocalStorage = getLocalStorage;

// function to remove Local Storage Object
function removeLocalStorage(key) {
    localStorage.removeItem(key);
}
window.removeLocalStorage = removeLocalStorage;

// function to show loading spinner
function showLoading() {
    $('body>.a-spinner').last().removeClass("d-none");
}
window.showLoading = showLoading;

// function to hide loading spinner
function hideLoading() {
    $('body>.a-spinner').addClass("d-none");
}
window.hideLoading = hideLoading;

function showApiError(id) {
    if (typeof id == "undefined" || id == "") {
        id = "500";
    }
    let error = $("#" + id);
    if (error.length) {
        $('[id^="apiError"] .cmp-text').hide();
        $(".o-form-container__error-msg").hide();
        error.show();
        $('[id^="apiError"]').show();

    } else {
        
        $(".o-form-container__error-msg").show();
    }
}
window.showApiError = showApiError;

function hideApiError() {
    $('[id^="apiError"] .cmp-text').hide();
    $('[id^="apiError"]').hide();
    $(".o-form-container__error-msg").hide();
}
window.hideApiError = hideApiError;

function encodeBase64(input) {
    return window.btoa(unescape(encodeURIComponent(input)));
}
window.encodeBase64 = encodeBase64;

function decodeBase64(input) {
    return decodeURIComponent(escape(window.atob(input)));
}
window.decodeBase64 = decodeBase64;

function selectFormDropdown(name, value) {
    var dropdown = $("[name='" + name + "']").closest('.a-dropdown');
    var options = dropdown.find("[data-optionvalue='" + value + "']");
    this.val = options.text();
    this.index = options.index();
    var placeholder = options.closest('.a-dropdown__field').children('span');
    placeholder.text(this.val).removeClass('a-dropdown__placeholder').addClass('a-dropdown-selected');
    options.siblings().removeClass('selected');
    options.filter(':contains("' + this.val + '")').addClass('selected');
    var optionId = options.attr("id");
    options.closest('.a-dropdown__menu').find('li').removeAttr("aria-selected");
    const dropdownMenu = options.closest('.a-dropdown__menu');
    const liSelected = dropdownMenu.find('li.selected');
    if(liSelected && liSelected.length > 0) {
        liSelected.attr("aria-selected", "true");
        dropdownMenu.attr("aria-activedescendant", optionId);
    }
}
window.selectFormDropdown = selectFormDropdown;

$(document).ready(function () {
    $(document).on("click", "#modal-page-reload", function (e) { 
        window.location.reload();
    });
});