(function($) {
    $(document).ready(function() {
       checkScreenSize();
        $('#section_Hero-banner-wrapper').parent().addClass('banner-wrapper').next().addClass('banner-wrapper');
        $('#section_partners').parent('.m-hero').addClass('banner-wrapper');
        $('section_award').parent('.m-hero').addClass('banner-wrapper');


    });

    // hash navigation
    $(window).on('hashchange', function(e){
        var hashId = window.location.hash;
        navigateToSection(hashId, false, e);
        // Calling the navigation since the lazy loaded images changes the position of element
        setTimeout(function(){
            navigateToSection(hashId, true, e);
        }, 200);
    });
    $(window).on('load', function(){
        var hashId = window.location.hash;
        navigateToSection(hashId, false);
        // Calling the navigation since the lazy loaded images changes the position of element
        setTimeout(function(){
            navigateToSection(hashId, true);
        }, 200);
    });
    function navigateToSection(hashId, toAnimate, e) {
        if (hashId != '' && $(hashId).length > 0) {
            if (e) {
                e.preventDefault();
            }
            var ele = $(hashId);
            if(hashId == '#section-gallery') {
                document.location = hashId;
                return;
            }
            var headerHeight = $('.o-header__sticky-section').outerHeight();
            var topNavHeight = $('.o-header__secondary-top-nav').outerHeight();
            if (topNavHeight) {
                headerHeight += topNavHeight;
            }
            var breadcumbHeight = $('.abbott-breadcrumb').outerHeight();
            if (breadcumbHeight != null) {
                headerHeight += breadcumbHeight;
            }
            var elementTop = ele.offset().top;
            window.scroll({
                top: elementTop - headerHeight,
                left: 0
            });

        }
    }
})(jQuery);