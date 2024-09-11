$(document).ready(function() {
    let hamburgerToggle = false;
    $(".navbar-toggler").click(function() {
        if (hamburgerToggle == false) {
            window.scrollTo(0, 0);
            $('.navbar-collapse').animate({'display':'block !important','right': '0'}, "slow");
            $('.headersearch').animate({'right': '0'}, "slow");
            $('body').css({'position': 'relative','overflow': 'hidden'});
            $('body').animate({'right': '307px'}, 'slow');
            hamburgerToggle = true;
        }
        else {
            $('.navbar-collapse').animate({'display':'block !important','right': '-310px'}, "slow");
            $('.headersearch').animate({'right': '-310px'}, "slow");
            $('body').css({'position': 'relative','overflow-y': 'scroll'});
            $('body').animate({'right': '0'}, 'slow');
            hamburgerToggle = false; 
        }
    })
    $(window).on('resize', () => {
        if ($(window).width() < 992) {
            $('.headersearch').css({'right':'-310px','transition': 'none'});
            $('.navbar-collapse').animate({'display':'block !important','right': '-310px'}, "slow");
            $('body').css({'right': '0','position':'relative','overflow-y': 'scroll'});
            hamburgerToggle = false; 
        }
        else if($(window).width() > 992 && $(window).width() < 1300) {
            $('.headersearch').css({'right':'40px','transition': 'none'});
        }
        else if($(window).width() > 1300) {
            $('.headersearch').css({'right':'10px','transition': 'none'});
        }
    });
    $(".m-mega-menu__mobile-item").has(".m-mega-menu__mobile-products div").addClass("has-child");
    $(".m-mega-menu__mobile-item-wrapper").has(".m-mega-menu__nested-menu").addClass("has-child");
    customHeaderNav();
});

function customHeaderNav() {
    var navItems = $('.m-mega-menu__mobile-item-wrapper');
    navItems.each(function() {
        var navDesktop = $(this).find('.m-mega-menu__item.d-none.d-lg-block');
        var navLinkDesktop = navDesktop.find('.nav-item').attr('href');
        var navMobile = $(this).find('.m-mega-menu__item.m-mega-menu__mobile-item');

        if (navLinkDesktop) {
            navMobile.find('.m-mega-menu__mobile-header').attr('href',navLinkDesktop);
        }

        navMobile.on('click', function() {
            $(this).parents('.m-mega-menu__mobile-item-wrapper').siblings().find('.m-mega-menu__mobile-header').removeClass('active');
            $(this).parents('.m-mega-menu__mobile-item-wrapper').siblings().find('.m-mega-menu__mobile-products').addClass('d-none');
            $(this).parents('.m-mega-menu__mobile-item-wrapper').siblings().removeClass('menu-active');
            $(this).find('.m-mega-menu__mobile-header').toggleClass('active');
            $(this).find('.m-mega-menu__mobile-products').toggleClass('d-none');
            $(this).parents('.m-mega-menu__mobile-item-wrapper').toggleClass('menu-active');
        })
    });
}
