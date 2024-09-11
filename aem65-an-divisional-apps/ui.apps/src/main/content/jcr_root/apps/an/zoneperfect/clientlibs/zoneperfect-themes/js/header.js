/**********************************
Header
**********************************/

$(document).ready(function() {

    if (isOnPublish()) {
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
    if($(window).width() < 992) {
        let $footercolumn = $('#site-footer .o-footer__link-wrapper');
        let footerSecondColumn = $footercolumn.eq(1).find('ul').html();
        $footercolumn.eq(0).find('ul').append(footerSecondColumn);
        let footerfourthColumn = $footercolumn.eq(3).find('ul').html();
        $footercolumn.eq(2).find('ul').append(footerfourthColumn);
        let footersixthColumn = $footercolumn.eq(5).find('ul').html();
        $footercolumn.eq(4).find('ul').append(footersixthColumn);
    }
});

$(function () {

    const currentPagePath = window.location.pathname;

    if (isOnPublish()) {
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
    }
    $('#section-site-header').parent('.container').addClass('a-container--header');
    $('#section-site-footer').parent('.container').addClass('a-container--footer');

	$(".navbar-collapse .m-mega-menu__mobile-item-wrapper").hover(function (e) {
        let targetEl = e.target, respectiveLi = targetEl.closest('li');
        $(respectiveLi).find('[data-js-component="mega-menu"]').show();
        $(respectiveLi).find('a.nav-item').attr('aria-expanded', 'true');
    }, function (e) {
        let targetEl = e.target, respectiveLi = targetEl.closest('li');
        $(respectiveLi).find('[data-js-component="mega-menu"]').hide();
        $(respectiveLi).find('a.nav-item').attr('aria-expanded', 'false');
    });        
});

$(document).ready(function() {
    let icon = 0;

    $('#site-header .m-link-stack .m-link-stack--header .abt-icon-down-arrow').click(function (e) {
        icon++;
        if (icon % 2 == 0) {
            $(this).css("transform","rotate(0deg)");
        }
        else {
            $(this).css("transform","rotate(180deg)");
        }
    });
    
    //ensure-container
    $('.abt-icon').on("click", function () {
        setTimeout(() => {
            if ($('.a-search').hasClass('a-search--expand') ) {
            $('#section-a-container-site-header').css('display', 'none');
            }
            else {
                $('#section-a-container-site-header').css('display', 'flex');
            }
        }, 0);
    });

    $('.o-header__search-overlay').on("click", function () {
            setTimeout(() => {
                if ($('.a-search').hasClass('a-search--expand') ) {
                    $('#section-a-container-site-header').css('display', 'none');
                }
                else {
                    $('#section-a-container-site-header').css('display', 'flex');
                }
            }, 0);
    });
    $('.a-search--icon-right').on('click', function() {
        $('.navbar').removeClass('show');
    });
});