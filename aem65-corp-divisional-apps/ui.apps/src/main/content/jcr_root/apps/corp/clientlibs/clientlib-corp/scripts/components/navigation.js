$(document).ready(function () {
    const currentPagePath = window.location.pathname;
    //JS changes to achieve delux filter funtionality
    if ($('.deluxe-filter-variation').length > 0) {
        if (window.matchMedia("(max-width: 767px)").matches) {
            $('.deluxe-filter-variation .experiencefragment').hide();
        }
        setTimeout(function () {
            // delaying the code by 2sec to let code run from platform
            var stickyfilter = $('.deluxe-filter-icon-variation');
            var stickyOffset = stickyfilter.offset().top;
            var stickytabs = $('.linkstack-tabs');
            var stickyOffsettabs = stickytabs.offset().top;
            const headerStickyHeight = window.matchMedia("only screen and (max-width: 991.98px)").matches ? ($('.o-header__sticky-section').height() || 0) : ($('.o-header .o-header__wrapper').height() || 0);
            const breadcrumbHeight = $('.abbott-breadcrumb').height() || 0;

            // sticky funtionality for deluxe filter on click
            if ($('.deluxe-filter-icon-variation').length > 0) {
                $('.deluxe-filter-icon-variation').off().on("click", function () {
                    //slidetoggle funtionality
                    if (window.matchMedia("(max-width: 767px)").matches) {
                        $('.deluxe-filter-variation .experiencefragment').slideToggle("slow");
                    }
                    //for desktop click and scroll funtionality
                    if (window.matchMedia("(min-width: 992px)").matches) {
                        var stickydesktop = $('.deluxe-filter-tabs-alignment').offset().top - headerStickyHeight - breadcrumbHeight;
                        $("html, body").animate({
                            scrollTop: stickydesktop - 5
                        }, 600);
                    }

                    if (window.matchMedia("(max-width: 991.98px)").matches) {
                        $(".o-header__sticky-section").addClass('sticky');
                        var stickyscrollTop = $('.deluxe-filter-tabs-alignment').offset().top - headerStickyHeight;
                        $("html, body").animate({
                            scrollTop: stickyscrollTop
                        }, 600);
                    }
                }
                );

                //scroll funtionality to scroll the delux filter
                let navigationwidth = $('.deluxe-filter-variation .navigation').width();
                let thresholdScrollLimit = /Android|iPhone/i.test(navigator.userAgent) ? (stickyOffset - headerStickyHeight) : (stickyOffset - headerStickyHeight - breadcrumbHeight);
                const navigationStyles = {
                    position: 'fixed',
                    cursor: 'pointer',
                    width: window.matchMedia("only screen and (min-width: 768px)").matches ? navigationwidth : '46px',
                    right: window.matchMedia("only screen and (max-width: 767px)").matches ? '15px' : 'unset',
                    top: /Android|iPhone/i.test(navigator.userAgent) ? headerStickyHeight : headerStickyHeight + breadcrumbHeight + 6
                }
                $(window).on('scroll', function () {
                    if ($(window).scrollTop() > thresholdScrollLimit) {
                        $('.deluxe-filter-icon-variation').css(navigationStyles);
                    }
                    else {
                        $('.deluxe-filter-icon-variation').removeAttr('style');
                    }
                })
            }
            // sticky funtionality for linkstack tabs
            if ($('.linkstack-tabs').length > 0) {
                let tabswidth = $('.linkstack-tabs').width();
                let thresholdScrolltabs = /Android|iPhone/i.test(navigator.userAgent) ? (stickyOffsettabs - headerStickyHeight) : (stickyOffsettabs - headerStickyHeight - breadcrumbHeight);
                const navigationtabStyles = {
                    position: 'fixed',
                    width: tabswidth,
                    top: /Android|iPhone/i.test(navigator.userAgent) ? headerStickyHeight : headerStickyHeight + breadcrumbHeight + 6
                }
                $(window).on('scroll', function () {
                    if ($(window).scrollTop() > thresholdScrolltabs) {
                        $('.linkstack-tabs').css(navigationtabStyles);
                    }
                    else {
                        $('.linkstack-tabs').removeAttr('style');
                    }
                })
            }
        }, 2000)

        //funtionality to match the window url and links and add active class
        $('.deluxe-filter-variation .navigation .m-mega-menu__item a').each(function () {
            if ($(this).attr('href') == currentPagePath) {
                //class to be added to give text color to active link 
                $(this).addClass('delux-active');
                // class to be added to add border for alphabets deluxe filter variation
                if ($(this).parents('.deluxe-side-by-variation').length) {
                    $(this).addClass('delux-alphabet-variation-active');
                }
                var store = $(this).html();
                changetitle(JSON.stringify(store));
            }
        });

        // function to change the text of filter in text component dynamically
        function changetitle(store) {
            $('.deluxe-filter-icon-variation .cmp-text *').each(function () {
                var text = $(this).text();
                let result = text.substr(7, text.length - 1);
                var regex = /[a-zA-Z]/g;
                if ((regex).test(text) && store != '#') {
                    $(this).text(text.replace(result, store));
                }
                if (window.matchMedia("(max-width: 767px)").matches) {
                    $(this).text("Filter");
                }
            });
        }
    }
    //JS changes to achieve secondary navigation and breadcrumb sticky functionality.
    if (isOnPublish()) {
        const path = location.pathname;
        $('.navigation .m-mega-menu__item a').each(function () {
            const href = $(this).attr('href') && $(this).attr('href').split('.html') && $(this).attr('href').split('.html')[0];
            if (path.includes(href)) {
                $(this).addClass('nav-link__active')
            }
        });

        setTimeout(function () { // delaying the code by 1sec to let header code run from platform
            const headerHeight = $(".o-header").length ? $(".o-header").offset().top : 0;
            const headerStickyHeight = window.matchMedia("only screen and (max-width: 991.98px)").matches ? ($('.o-header__sticky-section').height() || 0) : ($('.o-header .o-header__wrapper').height() || 0);
            const breadcrumbHeight = $('.abbott-breadcrumb').height() || 0;

            if ($('.navigation.navigation__redesign-links').length > 0) {
                let thresholdScrollLimit = /Android|iPhone/i.test(navigator.userAgent) ? 300 : 500;
                const navigationStyles = {
                    position: 'fixed',
                    top: /Android|iPhone/i.test(navigator.userAgent) ? headerStickyHeight : headerStickyHeight + breadcrumbHeight
                }
                const fontFamilyClassList = document.querySelector('.navigation.navigation__redesign-links') ? document.querySelector('.navigation.navigation__redesign-links').classList : [];
                let fontFamilyName = '';
                fontFamilyClassList.forEach(function (className) {
                    if (className.startsWith('font')) {
                        fontFamilyName = className;
                    }
                });

                $(window).on('scroll', function () {
                    if ($(window).scrollTop() > thresholdScrollLimit) {
                        $('.navigation.navigation__redesign-links').addClass('navigation__redesign-fixed').css(navigationStyles);
                    }
                    else if ($(window).scrollTop() > headerHeight) {
                        $('.navigation.navigation__redesign-links').removeAttr('style').removeClass('navigation__redesign-fixed');
                        if ($('.mblmenu').length > 0) {
                            $('.mblmenu').addClass('mblmenu__hide');
                        }
                    }
                    else {
                        $('.navigation.navigation__redesign-links').removeAttr('style').removeClass('navigation__redesign-fixed');
                        if ($('.mblmenu').length > 0) {
                            $('.mblmenu').removeClass('mblmenu__hide');
                        }
                    }
                })

                //As currently we are checking active link from breadcrumb
                //commenting below code which gets active link from footer for future purpose

                // $('.o-footer__top a').each(function () {
                //     if ($(this).attr('href') === path) {
                //         $(this).addClass('active-link')
                //     }
                // });
                const activeLinkName = $('.abbott-breadcrumb .a-breadcrumb .a-breadcrumb--active span').length > 0 ? $('.abbott-breadcrumb .a-breadcrumb .a-breadcrumb--active span').text() : 'Abbott';
                let bgClass;
                // Adding below classnames for different variations of secondary nav(redisgn links)
                // in mobile view.
                if ($('.navigation.navigation__redesign-links.navigation__redesign-links--bg-gray').length > 0) {
                    bgClass = 'mblmenu--bg-gray';
                }
                else if ($('.navigation.navigation__redesign-links.navigation__redesign-links--bg-white').length > 0) {
                    bgClass = 'mblmenu--bg-white'
                }
                else {
                    bgClass = '';
                }

                // const parentPageName = $('.o-footer__top .active-link').length > 0 ? $('.o-footer__top .active-link').html() : "Abbott";
                const parentMenuItem = '<div class="icon fooactive active-link"><span class="active-link__text">' + activeLinkName + '</span><span class="abt-icon abt-icon-plus-bold"></span></div>';

                $('<div></div>').insertAfter('.header').addClass('mblcontainer');
                $('.mblcontainer').css({ 'min-height': '50px' });
                $('<div></div>').appendTo('.mblcontainer').addClass('mblmenu')
                $('.mblmenu').append(parentMenuItem);
                $('.mblmenu').append($('.navigation.navigation__redesign-links>div').clone().addClass('mblmenu-links').attr('id', 'mblmenuLinks'));
                let activeMblNavLink2 = '.mblmenu .fooactive.active-link';
                const toggleIcon = activeMblNavLink2 + ' .abt-icon';
                $('.mblmenu').addClass(bgClass);
                $('.mblmenu').addClass(fontFamilyName);
                $('#mblmenuLinks').css({ 'display': 'none' });
                $(activeMblNavLink2).on('click', function (e) {
                    if ($(toggleIcon).hasClass('abt-icon-plus-bold')) {
                        $(toggleIcon).removeClass('abt-icon-plus-bold').addClass('abt-icon-minus-bold');
                    }
                    else {
                        $(toggleIcon).removeClass('abt-icon-minus-bold').addClass('abt-icon-plus-bold');
                    }
                    $('#mblmenuLinks').toggle('slow');
                });
            }
            else if ($('.navigation.navigation__secondary-links').length) {
                $(window).on('scroll', function () {
                    if ($(window).scrollTop() > headerHeight) {
                        $('.navigation.navigation__secondary-links').addClass('navigation__secondary-fixed').css({ 'position': 'fixed', 'top': headerStickyHeight + breadcrumbHeight });
                    }
                    else {
                        $('.navigation.navigation__secondary-links').removeAttr('style').removeClass('navigation__secondary-fixed');
                    }
                })
            }
        }, 1000);
    }
});