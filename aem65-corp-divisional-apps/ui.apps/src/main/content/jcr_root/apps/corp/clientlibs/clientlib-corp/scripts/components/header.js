/* Header component */

$(document).ready(function () {

    if (isOnPublish()) {
        // Adding a class to remove margin for empty items
        let firstEmptyWrapperCheck = true;
        $('.o-header__sticky-section').length && $('.o-header__sticky-section .m-mega-menu__mobile #navbarCollapseWrapper .m-mega-menu__mobile-item-wrapper').each(function () {
            if ($(this).width() == 0 && $(this).children().hasClass('linkstack')) {
                $(this).addClass('mega-menu-wrapper--empty');
                if (firstEmptyWrapperCheck) {
                    $(this).addClass('wrapper--extra-space');
                    firstEmptyWrapperCheck = false;
                }
            }
        });
    }

    if (isDesktop() && isOnPublish()) {
        let secondaryNavHeight = $('.o-header__secondary-top-nav').length ? $('.o-header__secondary-top-nav').height() : 0;
        let stickyNavHeight = $('.o-header__sticky-section').length ? $('.o-header__sticky-section').height() : 0;
        const currentPagePath = window.location.pathname;
        let linkstackAnchors = $('.o-header__secondary-top-nav .o-header__utility-nav .m-link-stack .m-link-stack--header a');
        let megaMenuAnchors = $('.o-header__sticky-section .mega-menu .navbar .m-mega-menu__mobile-item-wrapper .m-mega-menu__item .nav-link');
        let megaMenuLinks = $('.o-header__sticky-section .mega-menu .navbar .m-mega-menu__mobile-item-wrapper .link .a-link__text');
        let linkstackSubLinks = $('.o-header__secondary-top-nav .o-header__utility-nav .m-link-stack a');
        let additionalComponentsHeight = 0;
        $('.header').prevAll().each(function () { additionalComponentsHeight += $(this).height() ? $(this).height() : 0 });
        // Setting 2 sec delay to load platform code first
        setTimeout(() => {
            stickyDivHeight(secondaryNavHeight, additionalComponentsHeight);
        }, 2000)
        $('.o-header__wrapper').css('height', additionalComponentsHeight + secondaryNavHeight + stickyNavHeight + 'px');

        // Upon page scroll, the header secondary should also be visible
        $(window).on('scroll', function () {
            stickyDivHeight(secondaryNavHeight, additionalComponentsHeight);
        });

        if (linkstackAnchors.length) {
            checkLinkActiveness(linkstackAnchors, currentPagePath);
        }

        if (megaMenuAnchors.length) {
            checkLinkActiveness(megaMenuAnchors, currentPagePath);
        }

        if (megaMenuLinks.length) {
            checkLinkActiveness(megaMenuLinks, currentPagePath);
        }

        // Header Linkstack links to open in same tab if they are internal links
        linkstackSubLinks.length && linkstackSubLinks.each(function () {
            if ($(this).attr('target') === '_blank' && $(this).attr('href').indexOf('/') == 0) $(this).attr('target', '_self');
        });
    }

    if (isMobile() && isOnPublish()) {
        let additionalComponentsHeight = 0;
        $('.header').prevAll().each(function () { additionalComponentsHeight = $(this).height() ? $(this).height() : 0 });
        $('.o-header__sticky-section').css('top', additionalComponentsHeight + 'px');

        // If components are authored on top of header, then calculate and position the header based on components
        if (additionalComponentsHeight) {
            calMobHeaderPos(additionalComponentsHeight);

            $(window).on('scroll', function () {
                calMobHeaderPos(additionalComponentsHeight);
            });
        }

    }

    /**
     * @function
     * Summary: Function to set the position of sticky section of header in Mobile and Tablet viewports.
     * Parameters: height - {number} - height that should be applied to stickey section of header
     */
    function calMobHeaderPos(height) {
        setTimeout(function () {
            if ($('.o-header__sticky-section').hasClass('sticky')) {
                $('.o-header__sticky-section').removeAttr('style').css('top', height + 'px');
            } else {
                $('.o-header__sticky-section').css('margin-top', height + 'px');
            }
        }, 500);
    }

    /**
     * @function
     * Summary: Function to set the top value of sticky section of header.
     * Parameters: height - {number} - height that should be applied to stickey section of header
     */
    function stickyDivHeight(height, additionalComponentsHeight) {
        // A 50ms delay is added to let the page scroll before calculating the heights
        setTimeout(function () {
            $('.o-header__secondary-top-nav').length && $('.o-header__secondary-top-nav').css('top', additionalComponentsHeight + 'px');
            $('.o-header__sticky-section').length && $('.o-header__sticky-section').css('top', additionalComponentsHeight + height + 'px');
        }, 50);
    }

    /**
     * @function
     * Summary: Function to check if page URL is matching with anchor or not and then add active-link if matched.
     * Parameters: elementList - {HTMLElement} - jQuery HTMLElementList
     * Parameters: pageURL - {string} - Current page path
     */
    function checkLinkActiveness(elementList, pageURL) {
        $(elementList).each(function () {
            if ($(this).attr('href') === pageURL) {
                $(this).addClass('corp-active-link');
            }
        })
    }
    /* js for header - if select simple-linkstack option */
    var collapseLink = "ul.js-collapsable-links";
    if(screen.width>=992 && $(".header").hasClass("header-simple-linkstack")){
        $(".header-simple-linkstack .linkstack").find(collapseLink).removeClass("d-lg-block d-xl-block")
      
        $(".header-simple-linkstack .linkstack").on("mouseover",function (){
          $(this).find(collapseLink).removeClass("d-lg-block d-xl-block")
                $(this).find(collapseLink).removeClass("menu_dnone")
               $(this).find(collapseLink).addClass("menu_dblock")
            })
            $(".header-simple-linkstack .linkstack").on("mouseout",function (){
            $(this).find(".header-simple-linkstack ul.js-collapsable-links").removeClass("d-lg-block d-xl-block")
            $(this).find(collapseLink).removeClass("menu_dblock")
            $(this).find(collapseLink).addClass("menu_dnone")
        })
    }
});


