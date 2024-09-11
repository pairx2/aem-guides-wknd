function diaperDecoder(id) {
    let listContainer = $(id).find('.slick-track .slick-slide.slick-active'),
        infoContainer = $(id).find('#ph-diaper-decoder--info .a-container'),
        listItems = $(id).find('.slick-track .slick-slide'),
        listActive = 'ph-diaper-decoder__active';


    if (!listContainer) {
        return;
    }

    listContainer.first().addClass(listActive);
    infoContainer.hide();
    infoContainer.first().show();

    listItems.on('click', function () {
        let getID = $(this).find('.cmp-image').attr('id');

        infoContainer.hide();

        infoContainer.each(function () {
            let checkId = $(this).find('#section-' + getID);

            if (checkId.length == 1) {
                $(this).show();
            }
        });

        listItems.removeClass(listActive);
        $(this).addClass(listActive);
    });
}

function diaperCarousel(id) {
    let carousel = $(id).find('.o-cards-carousel [data-js-component=carousel]');
	if(carousel.hasClass('slick-initialized')) {
		carousel.slick('unslick');
	}
    carousel.slick({
        dots: true,
        prevArrow: '<button type="button" aria-label="Previous" class="abt-icon slick-prev slick-arrow abt-icon abt-icon-left-arrow"><span class="sr-only">Previous</span></button>',
        nextArrow: '<button type="button" aria-label="Next" class="abt-icon slick-next slick-arrow abt-icon abt-icon-right-arrow"><span class="sr-only">Next</span></button>',
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    prevArrow: false,
                    nextArrow: false
                }
            },
        ]
    });

    carouselSameHeight(id, carousel)
}

function carouselSameHeight(id, carousel) {
    setTimeout(function () {
        carousel.each(function () {
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

    diaperDecoder(id);
}


$(window).resize(function () {
    diaperCarousel('#ph-diaper-decoder');
});

$(document).ready(function () {
    diaperCarousel('#ph-diaper-decoder');
});