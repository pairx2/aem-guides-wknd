/**
 * This method will be called on window scroll
 * If sticky notice banner and nav both present then sticky notice will be on top.
 */
 jQuery(window).scroll(function () {
    let nav = jQuery('.nav-menu');
    let stickyNoticeBanner = jQuery('.sticky-notice-banner-content');
    let stickyNoticeBannerHeight = jQuery('.sticky-notice-banner-content').height();
    let header = document.getElementById("headerTop");
    let rootpos = jQuery('.SiteContainer').children('.responsivegrid');
    rootpos.css("margin-top",(header.offsetHeight - jQuery('.experiencefragment')[0].offsetHeight ) + 'px');
    header.style.position = "fixed";
  
    if (stickyNoticeBanner.is(":visible")) {
        stickyNoticeBanner.addClass('sticky-notice-banner-top');
        header.style.top = stickyNoticeBannerHeight + 'px';
        rootpos.css("margin-top",(header.offsetHeight - jQuery('.experiencefragment')[0].offsetHeight + stickyNoticeBannerHeight ) + 'px');
        if (nav) {
            nav.addClass('menu-nav-with-notice-banner');
            let stickyHeight = stickyNoticeBanner.height();
            nav.attr("style", "top:" + stickyHeight + "px;");
        }
    } else if (nav) {
        nav.addClass('sticky-menu-nav');
        nav.attr("style", "top:0");
    }
    else if (!stickyNoticeBanner.is(":visible")) {
        header.style.top = "0px"
    }
    if (stickyNoticeBanner.css("display") == "none") {
        header.style.top = '0px';
    }
});

/**
 * This method is used to check if key parameter is present in the cookies
 * @param key
 * @returns {boolean}
 */
function checkCookieExistance(key) {
    let cookieDataArr = document.cookie.split(';');
    for (let i in cookieDataArr) {
        let getKey = cookieDataArr[i].split('=')[0].trim();

        if (getKey === key) { // find loggedin in all cookies
            return true;
        }
    }

    return false;
}
