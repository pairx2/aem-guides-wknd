$(window).on('load', function () {

    function slickNavSlider() {
        let uniqueChars = [];
        let slideImgPath = [];
        $('.slick-slide').each(function () {
            let src = $(this).find('img').attr('src');
            slideImgPath.push(src);
            uniqueChars = [...new Set(slideImgPath)];
            uniqueChars.reverse();
        })

        $('.slick-dots li').each(function (index) {
            $(this).find('button').append(`<img src="${uniqueChars[index]}" />`)
        })
    }

    function displayCarousel() {
        setTimeout(() => {
            if (typeof $.fn.slick != 'undefined') {

                let productCarousel = $(".a-hero-carousel-image [data-js-component=carousel]");
                productCarousel.slick("unslick");
                productCarousel.slick({
                    vertical: true,
                    infinite: true,
                    dots: true,
                    arrows: true,
                    prevArrow: `<em class="abt-icon abt-icon abt-icon-up-arrow"></em>`,
                    nextArrow: `<em class="abt-icon abt-icon abt-icon-down-arrow"></em>`,
                    responsive: [{
                        breakpoint: 768,
                        settings: {
                            vertical: false,
                        }
                    },
                    {
                        breakpoint: 1024,
                        settings: {
                            vertical: false,
                            arrows: false
                        }
                    }

                    ]
                });
            }

            slickNavSlider();
        }, 100)
    }
    
    // On page load.
    displayCarousel();

    // On resize of device.
    $(window).on('resize', () => {
        displayCarousel();
    });
});
