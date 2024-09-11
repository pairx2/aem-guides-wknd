(function ($) {
    $(window).on('scroll', function () {
        setStickyHeader();
    });
    $(document).ready(function(){
        setStickyHeader();
    });

    function setStickyHeader() {
        let pagePosition = window.scrollY;
        let thresholdScroll = 85;
        if(thresholdScroll < pagePosition) {
            $('body').addClass('sticky-header');
            return;
        }
        $('body').removeClass('sticky-header');
    }
    $('#view-selected-abstracts,#view-all-abstracts').closest('.button').addClass('view-abs-btn');
})(jQuery);
