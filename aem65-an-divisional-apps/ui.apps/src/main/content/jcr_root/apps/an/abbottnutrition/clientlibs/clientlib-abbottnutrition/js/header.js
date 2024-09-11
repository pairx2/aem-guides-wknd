$(document).ready(function () {
    let header = $(".o-header");
    if (header && header.length > 0) {
        let isMob = isMobile();
        let isTab = isTablet();
        // Add country/language dropdown, Links inside hamburger menu - Mobile
        let secondaryNav = $('.o-header .o-header__secondary-top-nav'),
            countrySelect = secondaryNav.find('.country-dropdown .m-link-stack .m-link-stack--content .a-link'),
            megaMenu = $('.o-header__mega-menu .m-mega-menu__mobile .navbar-nav'),
            menuLi = '<li class="m-mega-menu__mobile-item-wrapper"><div class="link button"><div class="a-link"></div></li>'

        if (isMob && countrySelect.length) {
            countrySelect.each(function (i, elm) {
                if (i == 0) {
                    $(this).appendTo(megaMenu).wrap(menuLi).parent().parent().addClass('mega-menu-links-padding').parent().addClass('mega-menu-border-top');
                } else {
                    $(this).appendTo(megaMenu).wrap(menuLi).parent().parent().addClass('mega-menu-links-padding');
                }
            });
        }
        if (isTab) {
            countrySelect.insertAfter($('.navbar-toggler'))
        }
    }
});

/* Check user device details*/
let an_details = navigator.userAgent;
let an_regexp = /android|iphone|kindle|ipad/i;
let an_isMobileDevice = an_regexp.test(an_details);

if (!an_isMobileDevice) {
    $("#navbarNavAltMarkup div ul li:first-child").addClass("d-none");
}