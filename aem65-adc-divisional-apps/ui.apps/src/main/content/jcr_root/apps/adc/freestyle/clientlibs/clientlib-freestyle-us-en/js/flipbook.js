let flipBookCtaLinks = document.querySelectorAll('*[id^="flipbook-"]');
flipBookCtaLinks.forEach(element => {
    $( element ).bind( "click", function() {
        $('.flipbook').removeClass('active');
        let flipBookContainer  = document.querySelector('[data-flipbook-id="'+$(this).attr('id')+'"]');
        $(flipBookContainer).addClass('active');
        $('html, body').animate({
            scrollTop: $(flipBookContainer).offset().top - 160
        }, 500);
    });
});
