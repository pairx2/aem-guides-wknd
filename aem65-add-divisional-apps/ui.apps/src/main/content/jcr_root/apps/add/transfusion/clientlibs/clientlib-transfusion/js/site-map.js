(function($) {
    $(document).ready(function() {        
		$('#section-site-map-wrapper').parent().addClass('margin-0');
        $('#section-site-map-wrapper').parents('.root.responsivegrid').addClass('site-map-parent-wrapper');
        $( ".site-map-parent-wrapper" ).siblings('.abbott-breadcrumb').addClass('sitemap-breadcrumb');
        $("#section-site-map-link-wrapper").parent().addClass('fixed-width');


        /*country selector*/
        $('#section-globe_text_container').parent().addClass('margin-0');
        $('#section-globe_text_container').parents('.root.responsivegrid').addClass('country-wrapper');
        $( ".country-wrapper" ).siblings('.abbott-breadcrumb').addClass('sitemap-breadcrumb');
        $("#globe_language").parent().addClass('fixed-width');
    });
})(jQuery);