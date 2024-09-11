$(function() {
    let currPageUrl = window.location.pathname,
	    currPageName = currPageUrl.split('/').pop(),
        linkEle = $(".navbar-collapse-wrapper a[href*='" + currPageName + "']");
    let breadcrumbEle = $(".a-breadcrumb__item a[href*='" + currPageName + "']");

    if (linkEle.length) {
        linkEle.parents('.m-mega-menu__mobile-item-wrapper').addClass('m-mega-menu__mobile-item-wrapper--underline')
    }
    if (breadcrumbEle.length) {
        let breadcrumbEleParent = breadcrumbEle.parents('.a-breadcrumb__item');
        let breadcrumbEleChild = breadcrumbEle.children("span");
        breadcrumbEleParent.addClass('a-breadcrumb--active');
        breadcrumbEle.remove();
        breadcrumbEleParent.append(breadcrumbEleChild);
    }
});
