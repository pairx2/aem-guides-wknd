(function ($) {
    function setLanguageSelector() {
        var urlLink = window.location.pathname;
        var urlPaths = urlLink.split('/');
        if (urlPaths.length < 2) {
            return;
        }
        var country = urlPaths[1];
        var language = urlPaths[2];
        var international = 'int';
        var imagePath = '/content/dam/add/diagnostics/home/flag-usa.png';
        $(" ").attr("src", "imagePath");

        /*append*/
        $('.o-header__utility-nav').append('<a href="/' + country + '/' + language + '/country-selector.html" class="flag"><img id="theImg" src=' + imagePath + ' /></a>');
        $('.o-header__utility-nav').append('<a href="/' + international + '/' + language + '/country-selector.html" class="globe"><em class="abt-icon abt-icon-globe"></em></a>');
        /*icons for mobile view*/
        $('.o-header .m-mega-menu__mobile .navbar').append('<a href="/' + country + '/' + language + '/country-selector.html" class="flag"><img id="theImg" src=' + imagePath + ' /></a>'); //append the icon to html       
        $('.o-header .m-mega-menu__mobile .navbar').append('<a href="/' + international + '/' + language + '/country-selector.html" class="globe"><em class="abt-icon abt-icon-globe"></em></a>'); //append the icon to html

        var windowWidth = $(window).width();

        if (!urlPaths.includes(international)) {
            $('.abt-icon-down-arrow').hide();
            $('.m-link-stack__dropdown-wrapper').hide();
            $('#theImg').show();
            $(".flag").show();
            $(".flag #theImg").show();

            $('.abt-icon-globe').hide();
            $(".o-header__utility-nav").css("margin-right", "12px");
        } else {
            $('.abt-icon-globe').show();
            $('#theImg').hide();
            $('.abt-icon-down-arrow').show();
            $('.m-link-stack__dropdown-wrapper').show();

            if (windowWidth < 1181) {
                $('.mega-menu.megamenu.carousel .globe').show();
                $('.mega-menu.megamenu.carousel .flag').hide();
                $('.abt-icon-down-arrow').show();
                $('.m-link-stack__dropdown-wrapper').show();
            }
        }
    }
    $(document).ready(function () {
        setLanguageSelector();
    });
})(jQuery);

