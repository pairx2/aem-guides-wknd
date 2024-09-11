$(window).on('load',function () {
    setTimeout(() => {
        if (typeof $.fn.slick != 'undefined') {
            let slides = $(".a-container--nutritional-slider .o-cards-carousel [data-js-component=carousel]");
            slides.slick("unslick");
            slides.slick({
                dots: false,
                vertical: false,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                prevArrow: `<button type="button" role="presentation" class="left-arrow"><span aria-label="Previous"></span></button>`,
                nextArrow: `<button type="button" role="presentation" class="right-arrow"><span aria-label="Next"></span></button>`,
                responsive: [{
                    breakpoint: 768,
                    settings: {
                        vertical: false,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: true
                    }
                }
                ]
            });
        }
    }, 0);
});
