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
    var newArr1 = [];

    //return the input with radio option checked 
    newArr1 = $.grep(element, function (n, i) {
        return (n.consentValue == true);
    });

    return newArr1[0].consentName;
}

$(function () {
    $('.columncontrol__column').each(function () {
        if ($(this).children().length === 0)
            $(this).addClass('hide-mobile');
    })
})

/**
 * Function to generate lang attr << country-langauge >> on html
 * Commenting the function for the time being as the lang attribute is being handled from AEM. Can be used in future
**/
/* function generateCountryLanguage() {
    const currPageUrl = window.location.pathname,
        langRegex = /\/([a-z]{2,3}-[a-z]{2})\//i;
    let result;

    if ((result = langRegex.exec(currPageUrl)) !== null) {
        document.querySelector('html').setAttribute('lang', result[1]);
    }
} */

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
    var value = sessionStorage.getItem(key);
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