$(document).ready(function () {
    $('#megamenu-us-redesign').find('.m-mega-menu__item .nav-link').append('<em class="abt-icon abt-icon-down-arrow"></em>');
    $('#megamenu-us-redesign').closest('.header').addClass('removebgcolor');

    // code to hightlight underline in primary menu
    let currPageName = window.location.pathname,
        linkItem = $(".navbar-collapse-wrapper a[href*='" + currPageName + "']");
    if (linkItem.length > 0 && $(window).width() >= 1024) {
        linkItem.parents('.m-mega-menu__mobile-item-wrapper').addClass('underline');
    }

    $('#megamenu-us-redesign').find('.m-mega-menu__mobile-item-wrapper').mouseenter(function () {
        if ($(this).children('.a-container-right-align-sub-menu').length == 1) {
            const screenWidth = window.screen.width;
            if (screenWidth >= 992) {
                const parentMenuWidth = $(this).find('.nav-link').innerWidth();
                let maxWidthText = 0;
                const submenuText = $(this).find('.m-mega-menu__nested-menu .a-link a');

                $(submenuText).each(function () {
                    let originalVisibility = $(this).parents('.m-mega-menu__nested-menu').css('display');

                    $(this).parents('.m-mega-menu__nested-menu').css({
                        visibility: 'hidden',
                        display: 'block'
                    });

                    let listWidth = $(this).width();

                    $(this).parents('.m-mega-menu__nested-menu').css({
                        visibility: 'visible',
                        display: originalVisibility
                    })

                    if (listWidth > maxWidthText) {
                        maxWidthText = listWidth;
                    }

                });
                const item = $(this).closest('.m-mega-menu__mobile-item-wrapper').find('.m-mega-menu__side-nav');
                let transformedValue = parentMenuWidth - (maxWidthText + 18);
                $(item).css('left', transformedValue + 'px');

            }
        }
    });



    $('#megamenu-us-redesign').find('.m-mega-menu__mobile-item-link').on("click", function () {
        $('.m-mega-menu__mobile-item-link').removeClass('clicked');
        sessionStorage.setItem('dotState', $(this).text());
    });
    let storedState = sessionStorage.getItem("dotState");
    if (storedState) {
        $('#megamenu-us-redesign').find(".m-mega-menu__mobile-item-link:contains(" + sessionStorage.getItem("dotState") + ")").addClass('clicked');
        $('#megamenu-us-redesign').find('.clicked').parents('.m-mega-menu__mobile-item').find('.m-mega-menu__mobile-header').addClass('active');
        $('#megamenu-us-redesign').find('.clicked').parents('.m-mega-menu__mobile-products').removeClass('d-none');
    }

    sessionStorage.removeItem("dotState");

    //header v2 changes

    if($('#megamenu-us-redesign').closest('.o-header-v2-global').length >= 1){
        $('#megamenu-us-redesign').closest('.o-header-v2-global').addClass("header-v2-redesign");
    }

    let utilityElements = $('.o-header-v2-global__section--utility-top').find('.o-header-v2-group').children().not(":last");
    if(utilityElements.length > 0) {
        utilityElements.each(function(){
            let elem = `<li class="m-mega-menu__mobile-item-wrapper only-on-mobile">
                ${$(this).prop('outerHTML')}
            </li>`;
            $('#navbarCollapseWrapper > ul.navbar-nav').append(elem);
        });
    }

});
