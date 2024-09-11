let highlightMenu;

function addActiveClass() {
    highlightMenu = function (refEle) {
        let ele = $('.m-mega-menu__mobile-item-wrapper');
        if (refEle.indexOf('nutrition') > -1) {
            $(ele[0]).addClass("active");
        } else if (refEle.indexOf('side') > -1) {
            $(ele[1]).addClass("active");
        } else if (refEle.indexOf('treatment') > -1) {
            $(ele[2]).addClass("active");
        } else if (refEle.indexOf('stories') > -1) {
            $(ele[3]).addClass("active");
        } else if (refEle.indexOf('about') > -1) {
            $(ele[4]).addClass("active");
        } else if (refEle.indexOf('resources') > -1) {
            $(ele[5]).addClass("active");
        }
    }
}

function updateMobileMenu(thisText,menuItemWrapper,totalChildren,firstLink) {
    if (firstLink.text().trim() === thisText) {
        firstLink.addClass("d-none");
    }
    if((totalChildren < 2) && (firstLink.text().trim() === thisText)) {
        $(menuItemWrapper).addClass('hide-down-arrow');
    }
}

$(document).ready(function () {
    addActiveClass();
    let item = sessionStorage.getItem('item');
    if (item != null) {
        sessionStorage.removeItem("item");
        highlightMenu(item);
    } else {
        const pathName = window.location.pathname;
        highlightMenu(pathName);
    }

    let parentElement = $('.a-link-stack--anchor').find('.m-link-stack--header')[0];
    if (parentElement != undefined && parentElement != null) {
        let anchorElement = parentElement.children[0];
        if (anchorElement != undefined && anchorElement != null) {
            const newUrl = anchorElement && anchorElement.getAttribute('href').replace("https://", "");
            anchorElement.setAttribute('href', newUrl);
        }
    }

    $(".m-mega-menu__item > .nav-link").each(function () {
        let menuItemWrapper = $(this).closest(".m-mega-menu__mobile-item-wrapper");
        let nestedMenu = menuItemWrapper.find(".m-mega-menu__nested-menu");
        let firstLink = nestedMenu.find(".a-link:first-child > .a-link__text");
        if (firstLink.text() === $(this).text()) {
            if (nestedMenu.find(".a-link").length < 2) {
                nestedMenu.css('display', 'none');
                menuItemWrapper.on("mouseenter", function () {
                    menuItemWrapper.find(".m-mega-menu__nested-menu").css('opacity', '0');
                });
                menuItemWrapper.on("mouseleave", function () {
                    menuItemWrapper.find(".m-mega-menu__nested-menu").css('opacity', '0');
                });
            }
            nestedMenu.find(".a-link:first-child").addClass("d-none");
        }
    });

    // Hide duplicate menu links in mobile and hide arrow for single child with same link
    $(".m-mega-menu__item > .m-mega-menu__mobile-header").each(function (index) {
        let menuItemWrapper = $(this).closest(".m-mega-menu__mobile-item-wrapper");
        let nestedMenu = menuItemWrapper.find(".m-mega-menu__mobile-products");
        let totalChildren = nestedMenu.find(".m-mega-menu__mobile-item").length;
        let firstLink = nestedMenu.find(".m-mega-menu__mobile-item:first-child");
        let thisText = $(this).text()
        updateMobileMenu(thisText,menuItemWrapper,totalChildren,firstLink);
    });

    //remove .html from footer links
    $('#remove-html-privacy-policy').closest('a').attr('href', $('#remove-html-privacy-policy').closest('a').attr('href').split('.html')[0]);
    $('#remove-html-preferencias').closest('a').attr('href', $('#remove-html-preferencias').closest('a').attr('href').split('.html')[0]+$('#remove-html-preferencias').closest('a').attr('href').split('.html')[1]);
});

$('button.navbar-toggler').on('click', function () {
    setTimeout(() => {
        if ($('.navbar-collapse').css('display') == 'block') {
            $('body').css('overflow', 'hidden');
        } else {
            $('body').css('overflow', 'auto');
        }
    }, 0);

});


$(".m-mega-menu__item:not(.m-mega-menu__mobile-item) > .nav-link").on("click", function () {
    const menuItemWrapper = $(this).closest(".m-mega-menu__mobile-item-wrapper");
    const nestedMenu = menuItemWrapper.find(".m-mega-menu__nested-menu");
    const firstLink = nestedMenu.find(".a-link:first-child > .a-link__text");
    if (firstLink.text() === $(this).text()) {
        const firstLinkUrl = firstLink.attr("href");
        window.location.href = firstLinkUrl;
    }
});

// for mobile menu link clickable
$(".m-mega-menu__item.m-mega-menu__mobile-item > .m-mega-menu__mobile-header").on("click", function () {
const menuItemWrapper = $(this).closest(".m-mega-menu__mobile-item-wrapper");
const nestedMenu = menuItemWrapper.find(".m-mega-menu__mobile-products");
const firstLink = nestedMenu.find(".m-mega-menu__mobile-item:first-child > .m-mega-menu__mobile-item-link");
if (firstLink.text() === $(this).text()) {
    const firstLinkUrl = firstLink.attr("href");
    window.location.href = firstLinkUrl;
}
});

$(".navbar-collapse .m-mega-menu__mobile-item-wrapper").hover(function (e) {
    let targetEl = e.target,
        respectiveLi = targetEl.closest('li');
    $(respectiveLi).find('[data-js-component="mega-menu"]').show();
    $(respectiveLi).find('a.nav-item').attr('aria-expanded', 'true');
}, function (e) {
    let targetEl = e.target,
        respectiveLi = targetEl.closest('li');
    $(respectiveLi).find('[data-js-component="mega-menu"]').hide();
    $(respectiveLi).find('a.nav-item').attr('aria-expanded', 'false');
});

$(".m-mega-menu__item > .nav-link").on("click", function () {
    let menuItem = $(this).text().toLowerCase();
    switch (menuItem) {
        case 'nutrition for your fight':
            sessionStorage.setItem("item", "nutrition-for-your-fight");
            break;
        case 'for side effects':
            sessionStorage.setItem("item", "for-side-effects");
            break;
        case 'for treatments':
            sessionStorage.setItem("item", "for-treatments");
            break;
        case 'stories':
            sessionStorage.setItem("item", "stories");
            break;
        case 'about us':
            sessionStorage.setItem("item", "about-us");
            break;
        case 'resources':
            sessionStorage.setItem("item", "resources");
            break;
        default:
            sessionStorage.removeItem("item");
            break;
    }
});
