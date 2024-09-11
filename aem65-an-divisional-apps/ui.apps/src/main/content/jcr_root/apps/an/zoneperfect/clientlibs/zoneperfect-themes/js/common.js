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

/* back to top scroll function */
$("#back-to-top").on('click', function () {
    $("html, body").animate({scrollTop: 0}, 700);
 });

 $('#tab-title .title a').on('click', function(e) {
    e.preventDefault();
    let selectorID = $(this).attr('href');
    $('html, body').animate({
        'scrollTop' : $(selectorID).offset().top
    }, 500);
 });

 $('#full-width-tab .tab-btn').on('click', function() {
    let btnId = $(this).attr('id');
    let $tabList = $('.a-tabs .cmp-tabs__tablist .cmp-tabs__tab');
    let $tabContent = $('.a-tabs .a-tabs__content .a-tabs__tab-pane');
    $tabList.removeClass('cmp-tabs__tab--active show active').attr('aria-selected', false);
    $tabList.eq(btnId - 1).addClass('cmp-tabs__tab--active show active').attr('aria-selected', true);
    $tabContent.removeClass('a-tabs__tabpane--active active').attr('aria-hidden', true);
    $tabContent.eq(btnId - 1).addClass('a-tabs__tabpane--active active').removeAttr('aria-hidden');
    $('html, body').animate({ scrollTop: $('.a-tabs').offset().top}, 500);
 });