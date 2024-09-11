/**********************************
Header
**********************************/

function addMegaMenuClass() {
    // Loop through mega menu items and add specific classes based on component used
    $('.header .o-header__wrapper .o-header__mega-menu .navbar .navbar-collapse-wrapper .m-mega-menu__mobile-item-wrapper').each(function () {
        if (!$(this).find('.a-link').length) {
            if ($(this).find('.linkstack').length) {
                $(this).addClass('item--linkstack');
            } else if ($(this).find('.btn').length) {
                $(this).addClass('item--button');
            } else {
                $(this).addClass('item--non-link');
            }
        }
    });
}
function highlightMenu(currentPagePath) {
    
    //highlight mega menu item for the active page
    $('.header .o-header-v2-global .m-mega-menu__mobile .navbar-collapse-wrapper .m-mega-menu__mobile-item-wrapper a').each(function () {
        let navURL = $(this).attr('href');
        if (navURL && navURL.length) {
            if (navURL == currentPagePath) {
                $(this).parents('.m-mega-menu__mobile-item-wrapper').addClass('active');
            }
        }
    });
    //highlight sub mega menu item for the active page
    $('.header .o-header-v2-global .m-mega-menu__mobile .navbar-collapse-wrapper .m-mega-menu__mobile-item-wrapper .m-mega-menu__list-var-wrapper .m-mega-menu__sub-list a').each(function () {
        let subURL = $(this).attr('href');
        if (subURL && subURL.length) {
            if (subURL == currentPagePath) {
                $(this).addClass('active');
                $(this).parents('.m-mega-menu__mobile-item-wrapper').addClass('active');
            }
        }
    });
}

$(function () {

    const currentPagePath = window.location.pathname;

    if (isOnPublish()) {
        //functionality to make the Healthcare professional link clickable
        let megamenuHref = $('#hcp-megamenu--link__href').attr('href');
        $('#hcp-megamenu--link .nav-item.nav-link').attr('href', megamenuHref);
        $('#hcp-megamenu--link .m-mega-menu__mobile-header').attr('href', megamenuHref);
        $('#hcp-megamenu--link__href').parents('.m-mega-menu__mobile-item-wrapper').remove();

        addMegaMenuClass();

        // Check if currentPagePath matched the nav item and add "active" class upon success
        $('.header .o-header__wrapper .m-mega-menu__mobile .navbar-collapse-wrapper .m-mega-menu__mobile-item-wrapper .a-link a').each(function () {
            let linkURL = $(this).attr('href');
            if (linkURL && linkURL.length) {
                if (linkURL == currentPagePath) {
                    $(this).parent().addClass('active');
                }
            }
        });

        // Find and add 'item-last-link' class to the last link
        $('.header .o-header .o-header__wrapper .o-header__sticky-section .o-header__mega-menu .m-mega-menu__mobile .mega-menu .navbar .navbar-collapse .navbar-nav .m-mega-menu__mobile-item-wrapper:not(.item--linkstack):not(.item--button)').last().addClass('item-last-link');

        if (!isMobile()) {

            // Js code to add a wrapper for right logo and search box
            $('.header .o-header__wrapper .o-header__sticky-section .o-header__logo-section > .container > .row > div[class*="col-"] + div[class*="col-"], .header .o-header__wrapper .o-header__sticky-section .o-header__logo-section .o-header__sticky-search').wrapAll('<div class="o-header__logo-search--wrapper" />');

        }
        highlightMenu(currentPagePath);
    }
});