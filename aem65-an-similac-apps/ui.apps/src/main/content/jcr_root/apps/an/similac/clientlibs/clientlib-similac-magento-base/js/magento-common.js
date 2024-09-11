if (jQuery(window).width() < 769) {
    jQuery('.burger-icon').click(function (e) {
        jQuery(".navbar-collapse.collapse").addClass("show");
        jQuery(".navbar-toggler").removeClass("collapsed");
    });
    jQuery('.burger-close').click(function (e) {
        jQuery(".navbar-collapse.collapse").removeClass("show");
        jQuery(".navbar-toggler").addClass("collapsed");
    });

    jQuery('.nav-item .dropdown-toggle').click(function (e) {
        var dropwdown = jQuery(e.target).closest(".nav-item.dropdown ");
        dropwdown.hasClass("show") ? dropwdown.removeClass("show") : dropwdown.addClass("show");
        var dropdownMenu = dropwdown.find(".dropdown-menu");
        dropdownMenu.hasClass("show") ? dropdownMenu.removeClass("show") : dropdownMenu.addClass("show");
    });
}
