/**
* If showAfterLogin true then checking if "isloggedIn" cookie present
* @returns {boolean}
*/
let checkLoggedInCondition = function (noticeBannerContent) {
   if (noticeBannerContent.hasClass("show-after-login") && checkCookieExistance('isLoggedIn')) {
       return true;
   }
   return false;
}

let styleNoticeBanner = function(stickyNoticeBannerContent, header, stickyNoticeBannerHeight, rootpos, nav) {
    if (stickyNoticeBannerContent.is(":visible")) {
        stickyNoticeBannerContent.addClass('sticky-notice-banner-top');
        header.style.top = stickyNoticeBannerHeight + 'px';
        rootpos.css("margin-top", (header.offsetHeight - jQuery('.experiencefragment')[0].offsetHeight + stickyNoticeBannerHeight) + 'px');
        if (nav) {
            nav.addClass('menu-nav-with-notice-banner');
            let stickyHeight = stickyNoticeBannerContent.height();
            nav.attr("style", "top:" + stickyHeight + "px;");
        }
    } else if (nav) {
        nav.addClass('sticky-menu-nav');
        nav.attr("style", "top:0");
    }
    else if (!stickyNoticeBannerContent.is(":visible")) {
        header.style.top = "0px"
    }
    if (stickyNoticeBannerContent.css("display") == "none") {
        header.style.top = '0px';
    }
}
jQuery(document).ready(function () {
    /**
     * This Module is used for Sticky notice banner functions.
     * @type {{showHideNoticeBanner: showHideNoticeBanner, hideStickyBanner: hideStickyBanner}}
     */
    let stickyNoticeBanner = (function () {
        let noticeBannerContent = jQuery(".sticky-notice-banner-content");
        let noticeBanner = jQuery(".sticky-notice-banner");
        let stickyBannerId = "sticky-notice-" + noticeBannerContent.attr('data-identifier') + "-" + noticeBannerContent.attr('data-version');

        /**
         * This method will be called with close button onClick event and will hide the banner.
         * @param event
         */
        let hideStickyBanner = function (event) {
            let hideStickyBannerHeader = document.getElementById("headerTop");
            let hideStickyBannerRootpos = jQuery('.SiteContainer').children('.responsivegrid');
            hideStickyBannerHeader.style.top = '0px';
            hideStickyBannerRootpos.css("margin-top", (hideStickyBannerHeader.offsetHeight - jQuery('.experiencefragment')[0].offsetHeight) + 'px');
            noticeBannerContent.hide();
            if (jQuery(event.target).closest('.sticky-notice-banner-content').hasClass("show-once")) {
                localStorage.setItem(stickyBannerId, true);
            }
        };

        /**
         * This method will show/hide the banner on below condition
         * banner will be shown if
         * 1. Component opened in authoring mode(checked with sticky-notice-preview class)
         * 2. Component not having class "show-after-login"
         * 3. Checked loggedIn condition and stickyBannerId" not present in localstorage
         */
        let showHideNoticeBanner = function () {
            if (!noticeBannerContent.hasClass("show-once")) {
                localStorage.removeItem(stickyBannerId);
            }
            if (!noticeBannerContent.hasClass("sticky-notice-preview") || !noticeBannerContent.hasClass("show-after-login") || (!localStorage.getItem(stickyBannerId) && checkLoggedInCondition(noticeBannerContent))) {
                window.scrollTo(0, 0);
                noticeBannerContent.show();
                let showHideNoticeBannerHeader = document.getElementById("headerTop");
                let showHideNoticeBannerRootpos = jQuery('.SiteContainer').children('.responsivegrid');
                let showHideNoticeBannerStickyNoticeBannerHeight = jQuery('.sticky-notice-banner-content').height();
                showHideNoticeBannerHeader.style.top = showHideNoticeBannerStickyNoticeBannerHeight + 'px';
                showHideNoticeBannerRootpos.css("margin-top", (showHideNoticeBannerHeader.offsetHeight - jQuery('.experiencefragment')[0].offsetHeight + showHideNoticeBannerStickyNoticeBannerHeight) + 'px');
                jQuery(".sticky-notice-banner-container").attr("style", "height:" + noticeBanner.height() + "px;")
            } else {
                noticeBannerContent.hide();
            }
            //Registering close button onClick event
            jQuery(".sticky-notice-close-btn").click(stickyNoticeBanner.hideStickyBanner);
        }

       
        // Public methods
        return {
            hideStickyBanner: hideStickyBanner,
            showHideNoticeBanner: showHideNoticeBanner
        };
    })();
    stickyNoticeBanner.showHideNoticeBanner();

    let nav = jQuery('.nav-menu');
    let stickyNoticeBannerContent = jQuery('.sticky-notice-banner-content');
    let stickyNoticeBannerHeight = jQuery('.sticky-notice-banner-content').height();
    let header = document.getElementById("headerTop");
    let rootpos = jQuery('.SiteContainer').children('.responsivegrid');

    styleNoticeBanner(stickyNoticeBannerContent, header, stickyNoticeBannerHeight, rootpos, nav);
});