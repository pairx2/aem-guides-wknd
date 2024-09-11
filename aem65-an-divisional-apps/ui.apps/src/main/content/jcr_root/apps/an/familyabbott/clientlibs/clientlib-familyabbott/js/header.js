let browserName;
function updateBrowserName(userAgent){
    if(userAgent.match(/chrome|chromium|crios/i)){
        browserName = "chrome";
    }else if(userAgent.match(/firefox|fxios/i)){
        browserName = "firefox";
    }  else if(userAgent.match(/safari/i)){
        browserName = "safari";
    }else if(userAgent.match(/opr\//i)){
        browserName = "opera";
    } else if(userAgent.match(/edg/i)){
        browserName = "edge";
    }else{
        browserName="No browser detection";
    }
}

function setHeaderSearchSize() {
    let input = document.querySelectorAll('.a-search__input');
    let isMac = navigator?.userAgentData?.platform.toUpperCase().indexOf('MAC')>=0;
    let lang = document.querySelector('html').getAttribute('lang');
    let userAgent = navigator.userAgent;
    updateBrowserName(userAgent);
    for (let value of input) {
        if (value.getAttribute('placeholder')) {
            let size = value.getAttribute('placeholder').length;

            if (isMac && lang == 'vi-VN' && browserName == 'chrome') {
				size = (size + 4);
            } else if (isMac && lang == 'th-TH' && browserName == 'chrome') {
                size = (size + 2);
            } else if (isMac && lang == 'vi-VN' && browserName == 'safari') {
                size = (size - 1);
            } else if (isMac && lang == 'th-TH' && browserName == 'safari') {
              	size = (size - 1);
            }

            value.setAttribute('size', size);
        }     
    }
}

function setHeaderImplement() {
	let loyaltyCTA = $('.m-mega-menu__mobile-item-wrapper:nth-last-of-type(2)');
	if(loyaltyCTA.find("#loyalty_signup").length) {
		let loyaltyCTAId = loyaltyCTA.find('.a-link .a-link__text').attr('id');
		if (loyaltyCTA.length > 0 && loyaltyCTA.find('.link').hasClass('button')) {
			loyaltyCTA.find('.a-link').clone().insertBefore('.o-header__mob-search').addClass('d-block d-lg-none clone-loyalty-btn').find('.a-link__text').attr('id','clone-'+ loyaltyCTAId);
		}
	}
    if(loyaltyCTA.find("#loyalty-signup-btn").length) {
		let loyalty_CTAId = loyaltyCTA.find('.a-link .a-link__text').attr('id');
		if (loyaltyCTA.length > 0 && loyaltyCTA.find('.link').hasClass('button')) {
			loyaltyCTA.find('.a-link').clone().insertBefore('.o-header__mob-search').addClass('d-block d-lg-none clone-loyalty-signup-btn').find('.a-link__text').attr('id','clone-'+ loyalty_CTAId);
		}
	}
    let headerCTA = $('.m-mega-menu__mobile-item-wrapper:last-child');
    let headerCTAId = headerCTA.find('.a-link .a-link__text').attr('id');
    if (headerCTA.length > 0 && headerCTA.find('.link').hasClass('button')) {
        headerCTA.find('.a-link').clone().insertBefore('.o-header__mob-search').addClass('d-block d-lg-none clone-btn').find('.a-link__text').attr('id','clone-'+ headerCTAId);
    }
    
    let logoSection = $('.o-header__logo-section');
    if (logoSection.length > 0) {
        logoSection.clone().insertBefore('.navbar-collapse-wrapper .navbar-nav').addClass('d-block d-lg-none clone-logo-section');
    }
    
    $(".m-mega-menu__mobile-item").has(".m-mega-menu__mobile-products div").addClass("has-child");
    $(".m-mega-menu__mobile-item-wrapper").has(".m-mega-menu__nested-menu").addClass("has-child");
}

function setHeaderOverlap() {
    let headerTitle = $('#ph-header-title--overlap');
    if (headerTitle.length > 0) {
        headerTitle.parent().next().css('padding-top', 0);
    }
}

function setHeaderArticle() {
    let headerTitleArticle = $('#ph-header-title--article');
    if (headerTitleArticle.length > 0 && $(window).width() < 992) {
        headerTitleArticle.parent().next().css('padding-top', 0);
    } else {
        headerTitleArticle.parent().next().css('padding-top', 40);
    }
}

function setHeaderTitleBackground() {
    let imageEl = $('.header + .image');
    let headerTitleEl = $('#pageContent > .root:first-child > .aem-Grid > .title:first-child .cmp-title__text')
    if (imageEl.length > 0) {
        let image = imageEl.find('.cmp-image');
        image.clone().insertAfter(headerTitleEl);
    }
}

function customHeaderNav() {
    let navItems = $('.m-mega-menu__mobile-item-wrapper');
    navItems.each(function() {
        let navDesktop = $(this).find('.m-mega-menu__item.d-none.d-lg-block');
        let navLinkDesktop = navDesktop.find('.nav-item').attr('href');
        let navMobile = $(this).find('.m-mega-menu__item.m-mega-menu__mobile-item');

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

function cloneLangSelector() {
	let lang = $('#ph-lang-selector');
    let langLinkStack = lang.find('.m-link-stack');
    let langLocation = $('.header .country-dropdown .m-link-stack');

    if (lang.length > 0){
    	langLinkStack.clone().insertAfter(langLocation);
    }
}

function setSecondLogoHeader(){
  	let logoEl = $('.header .o-header__logo-left .a-logo-comp');
    let scdLogoEl = $('#ph-header-2nd-logo');

    if(scdLogoEl.length > 0){
        let scdLogoAsset = scdLogoEl.attr('data-asset');
		let scdLogoUrl = scdLogoEl.find('.cmp-image__link').attr('href');
		let scdLogoTarget = scdLogoEl.find('.cmp-image__link').attr('target');

        logoEl.each(function () {
            $(this).clone().insertAfter($(this)).addClass('clone-a-logo-comp');
        })

		let cloneLogoEl = $('.clone-a-logo-comp');
        cloneLogoEl.each(function () {
			$(this).find('.a-logo-comp--link').attr('href', scdLogoUrl);
			$(this).find('.a-logo-comp--image.img-fluid').attr('src', scdLogoAsset);
            $(this).find('.a-logo-comp--image.img-fluid.sticky-logo').attr('src', scdLogoAsset);
            
            if (scdLogoTarget) {
                $(this).find('.a-logo-comp--link').attr('target', scdLogoTarget);
            }
        })
    }
}

$(document).ready(function () {
    setHeaderSearchSize();
    setHeaderOverlap();
    setHeaderArticle();
    setHeaderImplement();
    setHeaderTitleBackground();
    customHeaderNav();
    cloneLangSelector();
    setSecondLogoHeader();
});

$(window).resize(function () {
    setHeaderArticle();
});