/**
 * Common Functionalities
 */

// funtion to check if device is mobile
function isMobile() {
    return window.matchMedia("(max-width: 991.98px)").matches;
}

// funtion to check if device is desktop/laptop
function isDesktop() {
    return window.matchMedia("(min-width: 991.98px)").matches;
}

// function to check if page isOnPublish mode
function isOnPublish() {
    return $(`#wcmMode`).val() === 'false';
}

//function to retrieve radioValue
function radioValue(element) {
    let newArr1 = [];

    //return the input with radio option checked 
    newArr1 = $.grep(element, function (n, i) {
        return (!!n.consentValue);
    });

    return newArr1[0].consentName;
}

/**
 * Summary: function to hide columncontrol column with no data
 */
$(function () {
    $('.columncontrol__column').each(function () {
        if ($(this).children().length === 0)
            $(this).addClass('an-d-sm-none');
    })
});

/**
 * Summary: function to setItem at sessionStorage
 */
function setItemSessionStorage(key, value) {
    sessionStorage.setItem(key, value);
}

/**
* Summary: function to getItem from sessionStorage
*/
function getItemSessionStorage(key) {
    let value = sessionStorage.getItem(key);
    return value;
}

/**
* Summary: function to removeItem from sessionStorage
*/
function removeItemSessionStorage(key) {
    sessionStorage.removeItem(key);
}

/**
* Summary: function to clear sessionStorage
*/
function clearSessionStorage() {
    sessionStorage.clear();
}

/**
* Summary: function to show/hide the loading spinner
*/
function toggleLoadingSpinner() {
    $($(document).find('.a-spinner')[0]).toggleClass('d-none');
}

/**
* Summary: function to create cookie
*/
function createCookie(n, t, i) {
    let r = new Date();
    let u = '';
    if (i) {
        r.setTime(r.getTime() + i * 36e5);
        u = "; expires=" + r.toGMTString();
    }
    n = n + "-" + $("html").attr("lang");
    document.cookie = n + "=" + t + u + "; path=/"
}

/**
* Summary: function to read cookie
*/
function readCookie(n) {
    for (let r = n + "-" + $("html").attr("lang"), u = document.cookie.split(";"), t, i = 0; i < u.length; i++) {
        for (t = u[i]; t.charAt(0) == " ";)
            t = t.substring(1, t.length);
        if (t.indexOf(r) == 0)
            return t.substring(r.length, t.length)
    }
    return null
}