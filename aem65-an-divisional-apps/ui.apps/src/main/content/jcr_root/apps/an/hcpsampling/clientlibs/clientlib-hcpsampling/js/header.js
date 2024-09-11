function isExternalLink(link) {
    return (link[0].host !== window.location.host);
}

function calculateMenuOffset(dropdown) {
    const wrappers = $(".an-header-menu").find(".m-mega-menu__mobile-item-wrapper");
    let contentOffset = 0;
    for (let i of wrappers) {
        const currentMenuLink = $(i).find(".m-mega-menu__item > .nav-link").text().trim();
        const firstLinkCheck = $(dropdown).find(".a-link:first-child").text().trim();
        if (firstLinkCheck !== currentMenuLink) {
            contentOffset += $(i).outerWidth(true);
        } else {
            $(dropdown).css("left", contentOffset === 0 ? contentOffset : contentOffset * -1);
            break;
        }
    }
}

//Declaring variables
let headerLogo;
let headerMenu;
let headerTop;
let isAbbottNutritionHeader;
let headerAn;
let loginLinkStack;
let mobileLoginLinkStack ;
let welcomeText ;
let myAccount;
let mobileMyAccount;
let mobileWelcomeText;


let headerSearchBar;
let predictiveHeaderSearchBar;

let stickyNav;
let mobileMenu;
let mobileMenuNavBar;
$(document).ready(function () {
    headerLogo = $(".an-header-logo");
    headerMenu = $(".an-header-menu");
    headerTop = $(".an-header-top");
    isAbbottNutritionHeader = headerLogo.length && headerMenu.length && headerTop.length;
    if (isAbbottNutritionHeader) {

        // set AN header class for customization
        headerAn = $(".o-header");
        headerAn.addClass("o-header__an");

        // toggle login + my account components when user is logged in
        loginLinkStack = $(".an-header-top").find(".o-header__right-links .login");
        mobileLoginLinkStack = $(".an-header-menu").find(".header-right-link.login");
        welcomeText = headerTop.find(".welcome-text");
        myAccount = headerTop.find(".my-account");
        mobileMyAccount = headerMenu.find(".my-account");
        mobileWelcomeText = headerMenu.find(".welcome-text");

        $("body").on("an-hcpsampling:login", function (e, data) {
            triggerhcpSamplingLogin(data);           
            
        });

        $("body").on("an-hcpsampling:logout", function (e, data) {
            triggerhcpSamplingLogout(data);            
            
        });

        // removing dropdown on desktop as they are shown by default link stack functionality
        const headerLinks = headerTop.find(".m-link-stack");
        if (headerLinks.length) {
            removeDropdownDesktop(headerLinks);        
            
        }

        // Mega Menu Top Links do not have an authorable link field
        // Workaround to use first authored link within mega menu - click handler below
        const megaMenu = headerMenu.find(".m-mega-menu__mobile");
        megaMenu.find(".m-mega-menu__item:not(.m-mega-menu__mobile-item) > .nav-link").on("click", function () {
            const menuItemWrapper = $(this).closest(".m-mega-menu__mobile-item-wrapper");
            const nestedMenu = menuItemWrapper.find(".m-mega-menu__nested-menu");
            const firstLink = nestedMenu.find(".a-link:first-child > .a-link__text");
            const firstLinkUrl = firstLink.attr("href");
            window.location.href = firstLinkUrl;
        });

        // override stick section include data attribute to false since AN header is not sticky
        headerAn.find(".o-header__sticky-section").attr("data-sticky", false);

        // mobile-menu toggle functionality
        stickyNav = headerAn.find(".o-header__sticky-section");
        mobileMenu = headerAn.find(".m-mega-menu__mobile");
        mobileMenuNavBar = headerAn.find(".navbar-collapse");
        $(".an-header-logo .menu-toggle").on("click", function () {
            $(this).toggleClass("abt-icon-hambuerger-menu").toggleClass("abt-icon-cancel");
            toggleMobileMenu();          
            
        });        
        // mobile menu link stacks (login + our sites) dropdown functionality to match mega menu links
        mobileMenu.find(".m-mega-menu__mobile-extras").on("click", function () {
            let mMenuExtras = $(this);
            checkLogin(mMenuExtras);           
            
        });
        
        // show search bar on desktop when clicking search link in utility navigation
        headerSearchBar = headerTop.find(".o-header__search");
        predictiveHeaderSearchBar = headerTop.find(".a-search");
        headerTop.find("span[data-search-close='close']").on("click", function (e) {
            e.preventDefault();
            if (!headerSearchBar.hasClass("d-none")) {
                headerSearchBar.addClass("d-none");
            }
        });
        // show search bar on desktop when clicking search link in utility navigation
        headerTop.find("a#headerSearch").on("click", function (e) {
            e.preventDefault();
            showSearchBarDesktop();           
            
        });
        // search through mega menu links on desktop
        // if more than 12 links in dropdown, apply column class per designs
        const desktopLinks = megaMenu.find(".m-mega-menu__item:not(.m-mega-menu__mobile-item)");
        for (let i of desktopLinks) {
            const nestedMenu = $(i).closest(".show-version-3").find(".m-mega-menu__nested-menu");
            const numLinks = nestedMenu.find(".a-link:not(:first-child)");
            if (numLinks.length >= 12) {
                const content = nestedMenu.find(".m-link-stack--content");
                content.addClass("three-col");
                calculateMenuOffset(content);
            }
        }    
        

        // update search placeholder text
        const searchPlaceholder = headerAn.find("input[name='search-placeholder']");
        headerAn.find("input[type='search']").attr("placeholder", searchPlaceholder.val());

        // Remove Target Blank from My Account Links
        myAccount.find(".m-link-stack a").attr("target", "");
        mobileMyAccount.find(".m-link-stack a").attr("target", "");
    }
	
	// FAQ page logo
	if($(' .o-header__predictive').length == 0){
		$('.o-header__logo-left--item2 .a-logo-comp').addClass('faqLogo');
	}

	//hide myaccount menubar
	let userGroups = localStorage.getItem("groups");
	if(userGroups?.includes("-NonProd-Admins")){
		$(".o-header__an .an-header-top .o-header__right-links .header-right-link.my-account").hide();
	}	
    $("#btnYesWebnova").attr("data-dismiss", "modal");
		
});
// removing dropdown on desktop as they are shown by default link stack functionality
function removeDropdownDesktop(headerLinks){
    for (let i of headerLinks) {
        $(i).find(".m-link-stack--content").removeClass("d-lg-block d-xl-block");
    }
}
function checkLogin(mMenuExtras){
    if (mMenuExtras.hasClass("login")) {
        if (mMenuExtras.hasClass("is-logged-in")) {
            mMenuExtras.toggleClass("active");
        }
    } else {
        mMenuExtras.toggleClass("active");
    }
}
//login Event
function triggerhcpSamplingLogin(data){
    const { firstName, lastName } = data;
    const userName = `${firstName} ${lastName}`;
    welcomeText.find(".username").text(userName);
    mobileWelcomeText.find(".username").text(userName);
    let eligibleGratis = true;
    checkGratisEligible(data,eligibleGratis);          

    // desktop
    welcomeText.removeClass("d-none");
    myAccount.removeClass("d-none");
    loginLinkStack.addClass("d-none");
    // mobile
    mobileMyAccount.removeClass("d-none");
    mobileLoginLinkStack.addClass("d-none");
    mobileWelcomeText.removeClass("d-none");

    // mobile quicklinks
    $("[name=quickLinks] li:eq(0)").hide();
}
function checkGratisEligible(data,eligibleGratis){
    if (data?.additionalProperties?.gratisEligible == eligibleGratis) {
        if (data.additionalProperties.gratisApprovalStatusC == "Gratis Approved Notification") {
            nonGratisDisplayNotification(data.additionalProperties.gratisApprovedByC);
        }
        else {
            gratisDisplayNotification();
        }
    } else if (data.additionalProperties.gratisApprovalStatusC == "Gratis Approval Revoked" || data.additionalProperties.gratisApprovalStatusC == "Gratis Declined") {
        nonGratisDisplayNotification(data.additionalProperties.gratisApprovedByC);
    }

}
//logout Event
function triggerhcpSamplingLogout(data){
    // desktop
    welcomeText.addClass("d-none");
    myAccount.addClass("d-none");
    loginLinkStack.removeClass("d-none");

    // mobile
    mobileMyAccount.addClass("d-none");
    mobileLoginLinkStack.removeClass("d-none");
    mobileWelcomeText.addClass("d-none");

    // mobile quicklinks
    $("[name=quickLinks] li:eq(0)").show();
}
// show search bar on desktop when clicking search link in utility navigation
function showSearchBarDesktop(){
    if (headerSearchBar.hasClass("d-none")) {
        headerSearchBar.removeClass("d-none");
    }
    // if predictive search enables
    if (predictiveHeaderSearchBar.hasClass("predictive-search")) {
        $('.o-header.o-header__predictive').addClass('o-header--full-width')
            .find('.predictiveForm .a-search--icon-left').css('left', '0.75rem');
        $('.a-search.predictive-search').addClass('a-search--expand');
        $('.a-search__input.m-search-bar__input-field.predictive-search-input')
            .css('background-color', '#fff');
        $('.m-search-bar__autocomplete').removeClass('d-none');
    }

}

//Toggle mobile menu
function toggleMobileMenu(){
    if (mobileMenu.hasClass("d-none")) {
        mobileMenuNavBar.addClass("d-block");
        mobileMenu.removeClass("d-none");
        stickyNav.addClass("menu-active");
        $("#section-ppc_container_for_filter").parent().addClass("activePageSearchFilter");
    } else {
        mobileMenuNavBar.removeClass("d-block");
        mobileMenu.addClass("d-none");
        stickyNav.removeClass("menu-active");
        $("#section-ppc_container_for_filter").parent().removeClass("activePageSearchFilter");
    }
}
$(document).on("click","#webnova_popup-modal #btnYesWebnova",function(e){
    e.preventDefault();	
    let href = $(this).attr("href");
	window.open(href, '_blank');
	
});