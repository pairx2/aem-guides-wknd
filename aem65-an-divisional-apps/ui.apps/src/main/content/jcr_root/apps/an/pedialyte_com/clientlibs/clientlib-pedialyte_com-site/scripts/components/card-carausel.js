function setBreakPoints (ele, isCardCarousel, isDynamicCardList) {
    
    if (isCardCarousel || isDynamicCardList) {
        options.responsive = [
            {
                breakpoint: 1960,
                settings: {
                    slidesToShow: +ele.dataset.cardsPerScreen,
                    slidesToScroll: +ele.dataset.cardsPerScroll || 1
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 576,
                settings:
                {
                    slidesToShow: +ele.dataset.tabletCardsPerScreen || 2,
                    slidesToScroll: +ele.dataset.tabletCardsPerScroll || 1

                }
            },
            {
                breakpoint: 300,
                settings: {
                    slidesToShow: +ele.dataset.mobileCardsPerScreen || 1,
                    slidesToScroll: +ele.dataset.mobileCardsPerScroll || 1
                }
            }
        ];
        options.mobileFirst = true;
        options.rows = 0;
    }
}
//function to set new values to carausel
    function cardCarousel(ele) {
        let leftIcon = ele.dataset.leftIcon || 'abt-icon-left-arrow';
        let rightIcon = ele.dataset.rightIcon || 'abt-icon-right-arrow';
        let responsive = [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: +ele.dataset.tabletCardsPerScreen || 2,
                    slidesToScroll: +ele.dataset.tabletCardsPerScroll || 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: +ele.dataset.mobileCardsPerScreen || 1,
                    slidesToScroll: +ele.dataset.mobileCardsPerScroll || 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: +ele.dataset.mobileCardsPerScreen || 1,
                    slidesToScroll: +ele.dataset.mobileCardsPerScroll || 1
                }
            }
        ];
        let isCardCarousel = ele.closest('.o-cards-carousel') !== null;
        let isDynamicCardList = ele.closest('.o-dynamic-card-list') !== null;
        let options = {
            infinite: false,
            dots: ele.dataset.noIndicators !== 'true',
            rtl: document.querySelector('html').dir === 'rtl',
            pauseOnHover: ele.dataset.autopauseDisabled !== 'true',
            autoplay: ele.dataset.transitionAutoplay === 'true',
            autoplaySpeed: +ele.dataset.transitionDelay,
            slidesToShow: +ele.dataset.cardsPerScreen || 1,
            slidesToScroll: +ele.dataset.cardsPerScroll || 1,
            prevArrow: '<button type="button" aria-label="Previous" class="abt-icon slick-prev slick-arrow ' + leftIcon + '"><span class="sr-only">Previous</span></button>',
            nextArrow: '<button type="button" aria-label="Next" class="abt-icon slick-next slick-arrow ' + rightIcon + '"><span class="sr-only">Next</span></button>',
            responsive: ele.dataset.responsive === 'true' ? responsive : 'none'
        };
        if (isDynamicCardList) {
            options.centerMode = false;
            options.arrows = false;
            options.variableWidth = true;
        }

        setBreakPoints(ele, isCardCarousel, isDynamicCardList);

        $(ele).on('init', function () {
            if (isCardCarousel || isDynamicCardList) {
                setTimeout(function () {
                    document.dispatchEvent(new Event('carousel:initialised'));
                }, 2000);
            }
        });
        this.$container = $(ele);
        this.$container.slick(options);
    }

//code to override platform code, to acheive card carausel look and functionality
$(function () {

    if ($('#pedialyte_contact_form_sub_title').length > 0) {
        let headerStickyHeight = $('.o-header__sticky-section').height();
        $('#pedialyte_contact_form_sub_title p a').off().on("click", function () {
            let stickydesktop = $('#address').offset().top - headerStickyHeight;
            $("html, body").animate({
                scrollTop: stickydesktop - 5
            }, 600);
        });
    }
    //to initialize carausel in desktop view
    if ($('.carausel-cards-variation').length) {
        document.querySelectorAll('[data-js-component="carousel"]').forEach(function (e) {

            if (!$(e).hasClass('slick-initialized') && $(e).closest('.carausel-cards-variation').length) {
                cardCarousel(e);
            }
        });
    }
})