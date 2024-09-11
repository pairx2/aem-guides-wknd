$(function () {
    if ((window.location.href.indexOf("nutrition-product") !== -1) && window.matchMedia("(min-width: 992px)").matches) {
        $('.navbar-nav li:first').addClass("active-border");
    }
    $("#col-cntl-4").parents(".container.responsivegrid").addClass("container-mobile");
    $("#navigation_wtb_click").parents(".m-mega-menu__mobile-item-wrapper").addClass("nav-where-to-buy-menu");
    $("#where-to-buy-text").addClass("container");
    $("#hcpMobile").parents(".m-mega-menu__mobile-item-wrapper").addClass("hcp-mobile-link");
    toggleActive();
    $(".navbar-collapse .m-mega-menu__mobile-item-wrapper").hover(function (e) {
        let targetEl = e.target, respectiveLi = targetEl.closest('li');
        $(respectiveLi).find('[data-js-component="mega-menu"]').show();
        $(respectiveLi).find('a.nav-item').attr('aria-expanded', 'true');
    }, function (e) {
        let targetEl = e.target, respectiveLi = targetEl.closest('li');
        $(respectiveLi).find('[data-js-component="mega-menu"]').hide();
        $(respectiveLi).find('a.nav-item').attr('aria-expanded', 'false');
    });



    // header navigation
    let pgurl = $(location).attr('href').split('/');
    let url1 = pgurl[pgurl.length - 1];
    let url2 = pgurl[pgurl.length - 2];
    let url3 = pgurl[pgurl.length - 3];

    if (url1.includes("products") || url2.includes("products") || url3.includes("products")) {
        $("#Pedialyte-01").addClass("active");
        $(".a-container--headerpedialyte_com").addClass('tablet_height');
    }
    if (url1.includes("dehydration-symptoms-causes") || url2.includes("dehydration-symptoms-causes") || url3.includes("dehydration-symptoms-causes")) {
        $("#Pedialyte-02").addClass("active");
        $(".a-container--headerpedialyte_com").addClass('tablet_height_2');
    }
    if (url1.includes("what-is-pedialyte") || url2.includes("what-is-pedialyte") || url3.includes("what-is-pedialyte")) {
        $("#Pedialyte-03").addClass("active");
    }
    if (url1.includes("where-to-buy") || url2.includes("where-to-buy") || url3.includes("where-to-buy")) {
        $("#Pedialyte-04").addClass("active");
    }

    //link 
    $(".m-mega-menu__mobile-header").click(function () {
        let link = $(this).parent().siblings(".m-mega-menu__item ").children("a").attr("href");
        $(this).attr("href", link);
    });

    $(".m-mega-menu__mobile-header").after('<div class="dropdown"></div>');


    //primary
    $('.m-mega-menu__item .dropdown').on("click", function () {
        $(this).parents(".m-mega-menu__mobile-item").toggleClass("dropdown-active");
    });


    $(document).on('click', '.m-mega-menu__item .dropdown', function (e) {
        e.preventDefault();
        $(this).siblings('.m-mega-menu__mobile-products').toggleClass('d-none');
    })
    //scroll
    $('button.navbar-toggler').on('click', function () {
        setTimeout(() => {
            if ($('.navbar-collapse').css('display') == 'block') {
                $('body').css('overflow', 'hidden');

            } else {
                $('body').css('overflow', 'auto');
            }
        }, 0);
    });
});

function toggleActive() {
    const currentPagePath = window.location.pathname;
    $('.header .o-header__wrapper .m-mega-menu__mobile .navbar-collapse-wrapper .m-mega-menu__mobile-item-wrapper a').each(function () {
        let linkURL = $(this).attr('href');
        if (linkURL && linkURL.length) {
            if (linkURL == currentPagePath) {
                $(this).closest(".m-mega-menu__mobile-item-wrapper").addClass('active-border');
            }
        }
    });
}

function isMobileDevice() {
    let check;
    if (/SM-T/i.test(navigator.userAgent)) {// false for samsung tablet
        check = false;
    }
    else if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        check = true;
    }
    return check;
}

if (isMobileDevice()) {
    $('.m-mega-menu__mobile .link .a-link__text').css('font-size', '1rem');
    $('#navigation_wtb_click span').css({ 'font-size': '0.875rem' });
    $('#section-header-container-top col-5').css('padding-left', '0');
}
