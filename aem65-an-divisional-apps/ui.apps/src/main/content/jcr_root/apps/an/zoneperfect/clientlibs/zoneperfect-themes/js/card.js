$(window).on('load', function () {
    setTimeout(function() {
        let $carouselBtn = $('.o-cards-carousel .slick-slide .container .embed');
        $carouselBtn.each(function() {
            let btnText = $(this).find('.ps-button-label').text();
            if(btnText === 'WHERE TO BUY') {
                $(this).find('.ps-button-label').text('BUY NOW');
            }
        });
        let $cardBtn = $('#all-product-column .container .columncontrol__column .embed');
        $cardBtn.each(function() {
            let cardBtnText = $(this).find('.ps-button-label').text();
            if(cardBtnText === 'WHERE TO BUY') {
                $(this).find('.ps-button-label').text('BUY NOW');
            }
        });
    }, 2000);   
    
});

$(document).ready(function() {
    if($('.o-cards-carousel').length > 0) {
        let $slickPrev = $('.o-cards-carousel .slick-prev');
        let $slickNext = $('.o-cards-carousel .slick-next');
        let $slickSlide = $('.slick-slide[aria-describedby]');
        $slickPrev.addClass('arrow-disable');
        let slideLength = $slickSlide.length;
        $slickNext.on('click', function() {
            setTimeout(function() {
                slickRightClick($slickPrev, $slickNext, $slickSlide, slideLength);
            }, 100);
        });
        $slickPrev.on('click', function() {
            setTimeout(function() {
                slickLeftClick($slickPrev, $slickNext, $slickSlide, slideLength);
            }, 100);
        });
    }
});

function slickLeftClick($slickPrev, $slickNext, $slickSlide, slideLength) {
    if (!$slickSlide.eq(slideLength - 1).hasClass('slick-active')) {
        $slickNext.removeClass('arrow-disable');
    }
    if ($slickSlide.eq(0).hasClass('slick-active')) {
        $slickPrev.addClass('arrow-disable');
    }
}

function slickRightClick($slickPrev, $slickNext, $slickSlide, slideLength) {
    if ($slickSlide.eq(slideLength - 1).hasClass('slick-active')) {
        $slickNext.addClass('arrow-disable');
    }
    if (!$slickSlide.eq(0).hasClass('slick-active')) {
        $slickPrev.removeClass('arrow-disable');
    }
}