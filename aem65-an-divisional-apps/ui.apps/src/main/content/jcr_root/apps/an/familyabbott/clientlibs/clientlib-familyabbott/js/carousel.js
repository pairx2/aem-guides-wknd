$(document).ready(function () {
    //apply equal height card carousel

    setTimeout(function () {
        $('.o-cards-carousel').each(function () {
            let highestBox = 0;
            let getCard = $(this).find(".slick-track .m-card");

            if (getCard.length > 0) {
                $(getCard, this).each(function () {
                    if ($(this).height() > highestBox) {
                        highestBox = $(this).height();
                    }

                });

                $(getCard, this).height(highestBox);
            }

        });
    }, 100);

    let breakPoint = [992, 576, 200];
    let windowWidth = $(window).width();

    function getIcon(ele, attName, className) {
        return ele.data(attName) || className;
    }

    const checkDiaperDecoder = (ele) => {
      if (ele.parents("#ph-diaper-decoder").length) return;
    };
    function Carousel(e) {
        $(e).each(function(){
            let ele = $(this);
            let leftIcon = getIcon(ele, 'left-icon', 'abt-icon-left-arrow');
            let rightIcon = getIcon(ele, 'right-icon', 'abt-icon-right-arrow');
            // slidesToScroll: +ele.data('tablet-cards-per-scroll') || 2

            checkDiaperDecoder(ele);

            let responsiveBP = [
                {
                    breakpoint: breakPoint[0],
                    settings: {
                        slidesToShow: ele.data('cards-per-screen') || 3,
                        slidesToScroll: ele.data('cards-per-scroll') || 3
                    }
                },
                {
                    breakpoint: breakPoint[1],
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: breakPoint[2],
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ];

            let options = {
                dots: ele.data('no-indicators') !== 'true',
                rtl: document.querySelector('html').dir === 'rtl',
                pauseOnHover: ele.data('autopause-disabled') !== 'true',
                autoplay: ele.data('transition-autoplay'),
                autoplaySpeed: ele.data('transition-delay'),
                slidesToShow: ele.data('cards-per-screen') || 1,
                slidesToScroll: ele.data('cards-per-scroll') || 1,
                prevArrow: '<button type="button" aria-label="Previous" class="abt-icon slick-prev slick-arrow ' + leftIcon + '"><span class="sr-only">Previous</span></button>',
                nextArrow: '<button type="button" aria-label="Next" class="abt-icon slick-next slick-arrow ' + rightIcon + '"><span class="sr-only">Next</span></button>',
                responsive: responsiveBP,
            };

            options.mobileFirst = true;
            options.rows = 0;

            ele.slick(options);
            let totalSlide = ele.slick("getSlick").slideCount;
            let slideToRemove, deleteCount;

            function getLastSlide() {
                return (ele.slick("getSlick").slideCount - 1);
            }

            function removeSlide(num) {
                for (let i = 0; i < num; i++) {
                    ele.slick('slickRemove', getLastSlide());
                }
            }

            let slideToRemoveDefault = ele.data('cards-per-screen') ? ele.data('cards-per-screen') * 5 : 15;

            // Detect number of slide to be shown based on window width
            switch (true) {
                // window width smaller or equal to 992 but greater than 576
                case ((windowWidth <= breakPoint[0]) && (windowWidth > breakPoint[1])):
                    slideToRemove = 10;
                    break;
                // window width smaller than or equal to 576
                case (windowWidth <= breakPoint[1]):
                    slideToRemove = 5;
                    break;
                // window width greater than 992
                default:
                    slideToRemove = slideToRemoveDefault;
            }

            if (totalSlide > slideToRemove) {
                deleteCount = totalSlide - slideToRemove;
                removeSlide(deleteCount)
            }
        })
    }

    Carousel('.o-cards-carousel [data-js-component=carousel]');

    $(window).on('resize', function () {
        Carousel('.o-cards-carousel [data-js-component=carousel]');
    });

});

function setSlickHeightTH() {
    setTimeout(function () {
        $('html[lang="th-TH"] .o-hero-carousel').each(function () {
            let highestBox = 0,
                slickTrack = $(this).find(".slick-track"),
                slickSlide = $(this).find(".slick-track .slick-slide");

            if (slickTrack.length > 0) {
                highestBox = $(slickTrack).height() + 50;

                $(slickSlide, this).each(function () {
                    $(this).height(highestBox);
                });
            }

        });
    }, 100);
}

$(document).ready(function () {
    setSlickHeightTH();
});

$(window).resize(function () {
    setSlickHeightTH();
});