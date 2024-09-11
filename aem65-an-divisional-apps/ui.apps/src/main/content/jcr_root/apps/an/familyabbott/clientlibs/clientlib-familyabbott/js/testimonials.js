$(document).ready(function () {
    // ph-testimonials
    $('#ph-testimonials, #ph-testimonials--full-text').each(function () {
        $(this).find('.a-tile__link').each(function() {
            if($(this).attr("href") == "#") {
                $(this).css('pointer-events', 'none');
            }
        });
    });
});