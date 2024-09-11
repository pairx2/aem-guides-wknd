function repositionArrow() {
    let slickDiv = $('.slick-slider');
    for (let element of slickDiv) {
        if ($(element).height() > 100) {
            $(element).find('.slick-arrow').addClass('reposition-arrow');
        } else {
            $(element).find('.slick-arrow').removeClass('reposition-arrow');
        }
    }
}

$(window).on('load',function () {
    setTimeout(() => {
        if (typeof $.fn.slick != 'undefined') {
            let shops = $(".o-cards-carousel.o-card-carousel--partnershops [data-js-component=carousel]");
            shops.slick("unslick");
            shops.slick({
                dots: false,
                vertical: false,
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                arrows: true,
                prevArrow: `<button type="button" role="presentation" class="left-arrow"><span aria-label="Previous"></span></button>`,
                nextArrow: `<button type="button" role="presentation" class="right-arrow"><span aria-label="Next"></span></button>`,
                responsive: [{
                    breakpoint: 992,
                    settings: {
                        vertical: false,
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: true
                    }
                }, {
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
        repositionArrow();

    }, 0);
});

$(window).on("resize", function () {
    setTimeout(() => {
        repositionArrow();
    }, 200);
});

$(window).on("orientationchange", function () {
    setTimeout(() => {
        repositionArrow();
    }, 200);
});