/**********************************
Linkstack
**********************************/

$(function () {

    if (isOnPublish() && isDesktop() && $('.header--secondary-nav').length) {

        let currentPageURL = window.location.pathname;

        // adding 12px more to the link width to avoid hover jump
        $('.header--secondary-nav .a-link').each(function () {
            const linkURL = $(this).find('.a-link__text').attr('href');
            $(this).css('min-width', $(this).innerWidth() + 16 + 'px');
            if (linkURL == currentPageURL) {
                $(this).addClass('active');
            }
        });

        // Check the mega menu items too if the current page is a subpage of mega menu item
        $('.header .o-header__wrapper .m-mega-menu__mobile .navbar-collapse-wrapper .m-mega-menu__mobile-item-wrapper .a-link a').each(function () {
            let linkURL = $(this).attr('href');
            if (linkURL && linkURL.length) {
                let linkHirerachy = linkURL.split('/').pop().split('.html')[0];
                let currentPageHirearchy = currentPageURL.split('.html')[0].split('/');
                if (currentPageHirearchy.includes(linkHirerachy) && linkHirerachy.length > 0) {
                    $(this).parent().addClass('active');
                }
            }
        });
    }
});