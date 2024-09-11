$(document).ready(function () {
    const homeLoginContainer = $("#homeLogin");
    const homepageHeroLoginContainer = $("#homepageHeroLoginContainer");
    const interiorNav = $("#interiorNav");
    const dropdownContainer = interiorNav.find(".a-dropdown__container");

    // add class for customization
    dropdownContainer.addClass("custom-dropdown");
    if (homeLoginContainer.length) {
        homeLoginContainer.find(".a-dropdown__container").addClass("custom-dropdown");
        // add custom flex order classes to stack properly on mobile per designs
        homeLoginContainer.closest(".row").find(".col-lg-8").addClass("order-md-down-2");
        homeLoginContainer.closest(".row").find(".col-lg-4").addClass("order-md-down-1");
        // remove no-gutters class on column control component for this section for proper horizontal mobile layout
        if (homeLoginContainer.closest(".row").hasClass("no-gutters") && $(window).width() < 768) {
            homeLoginContainer.closest(".row").removeClass("no-gutters");
            if (homepageHeroLoginContainer.length) {
                homepageHeroLoginContainer.closest(".a-container").addClass("pt-0");
            }
        }
    }

    // add active class to current page link in dropdown
    const pathname = window.location.pathname;
    dropdownContainer.find("a").each(function(){
        if($(this).attr("href").indexOf(pathname) !== -1){
            $(this).closest("li").addClass("active");
        }
    });

    // click event to change page url pathnames
    let menu = null;
    if (dropdownContainer.find(".a-dropdown__menu").length) {
        menu = dropdownContainer.find(".a-dropdown__menu");
    } else {
        menu = homeLoginContainer.find(".a-dropdown__menu");
    }
    menu.find("> li").on("click", function () {
        const link = $(this).find("a").attr("href");
        window.location.pathname = link;
    });
});