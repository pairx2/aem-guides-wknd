function diaperDecoder(id) {
    var listContainer = jQuery(id).find('.slick-track .slick-slide.slick-active'),
        infoContainer = jQuery(id).find('#ph-diaper-decoder--info .a-container'),
        listItems = jQuery(id).find('.slick-track .slick-slide'),
        listActive = 'ph-diaper-decoder__active';
 
 
    if (!listContainer) {
        return;
    }
 
    listContainer.first().addClass(listActive);
    infoContainer.hide();
    infoContainer.first().show();
 
    listItems.on('click', function () {
        var getID = jQuery(this).find('.cmp-image').attr('id');
 
        infoContainer.hide();
 
        infoContainer.each(function () {
            var checkId = jQuery(this).find('#section-' + getID);
 
            if (checkId.length == 1) {
                jQuery(this).show();
            }
        });
 
        listItems.removeClass(listActive);
        jQuery(this).addClass(listActive);
    });
}
 
function diaperCarousel(id) {
    var carousel = jQuery(id).find('.o-cards-carousel [data-js-component=carousel]');
 
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
            var highestBox = 0;
            var getCard = jQuery(this).find(".slick-track .m-card");
 
            if (getCard.length > 0) {
                jQuery(getCard, this).each(function () {
                    if (jQuery(this).height() > highestBox) {
                        highestBox = jQuery(this).height();
                    }
 
                });
 
                jQuery(getCard, this).height(highestBox);
            }
 
        });
    }, 100);
 
    diaperDecoder(id);
}
 
 
jQuery(window).resize(function () {
    diaperCarousel('#ph-cf-carousel');
});
 
jQuery(document).ready(function () {
    diaperCarousel('#ph-cf-carousel');
});
 
 
jQuery(document).ready(function () {
 
    setTimeout(function () {
        jQuery('.o-cards-carousel').each(function () {
            var highestBox = 0;
            var getCard = jQuery(this).find(".slick-track .m-card");
 
            if (getCard.length > 0) {
                jQuery(getCard, this).each(function () {
                    if (jQuery(this).height() > highestBox) {
                        highestBox = jQuery(this).height();
                    }
 
                });
 
                jQuery(getCard, this).height(highestBox);
            }
 
        });
    }, 100);
 
    var breakPoint = [992, 576, 200];
    var windowWidth = jQuery(window).width();
 
    function getIcon(ele, attName, className) {
        return ele.data(attName) || className;
    }
 
    function Carousel(e) {
        jQuery(e).each(function(){
            var ele = jQuery(this);
            var leftIcon = getIcon(ele, 'left-icon', 'abt-icon-left-arrow');
            var rightIcon = getIcon(ele, 'right-icon', 'abt-icon-right-arrow');
 
            if (ele.parents('#ph-diaper-decoder').length) {
                return;
            }
 
            var responsiveBP = [
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
 
            var options = {
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
            var totalSlide = ele.slick("getSlick").slideCount;
            var slideToRemove, deleteCount;
 
            function getLastSlide() {
                return (ele.slick("getSlick").slideCount - 1);
            }
 
            function removeSlide(num) {
                for (var i = 0; i < num; i++) {
                    ele.slick('slickRemove', getLastSlide());
                }
            }
 
            var slideToRemoveDefault = ele.data('cards-per-screen') ? ele.data('cards-per-screen') * 5 : 15;
 
            switch (true) {
                case ((windowWidth <= breakPoint[0]) && (windowWidth > breakPoint[1])):
                    slideToRemove = 10;
                    break;
                case (windowWidth <= breakPoint[1]):
                    slideToRemove = 5;
                    break;
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
 
    jQuery(window).on('resize', function () {
        Carousel('.o-cards-carousel [data-js-component=carousel]');
    });
 
});
 
function setSlickHeightTH() {
    setTimeout(function () {
        jQuery('html[lang="th-TH"] .o-hero-carousel').each(function () {
            var highestBox = 0,
                slickTrack = jQuery(this).find(".slick-track"),
                slickSlide = jQuery(this).find(".slick-track .slick-slide");
 
            if (slickTrack.length > 0) {
                highestBox = jQuery(slickTrack).height() + 50;
 
                jQuery(slickSlide, this).each(function () {
                    jQuery(this).height(highestBox);
                });
            }
 
        });
    }, 100);
}
 
jQuery(document).ready(function () {
    setSlickHeightTH();
});
 
jQuery(window).resize(function () {
    setSlickHeightTH();
});
 
 
    jQuery(document).ready(function(){
        jQuery('.innovation-id .accordion').each(function(index,item){
           if(index == 0){
               jQuery(item).css({
                borderTop: ".063rem solid #029ce8"
            });
           }
        });
    });
    jQuery('#expand').click(function(){
        var boldEle= jQuery(this).find('b');
        var spanELe= jQuery(this).find('span');
        if(boldEle.length ? boldEle.text() == "Expand All":"" || spanELe.length ? spanELe.text() == "Expand All":""){
            boldEle.length ? boldEle.text('Collapse All'):"" || spanELe.length ? spanELe.text('Collapse All'):""
            jQuery('.accordion__header').removeClass('collapsed');
            jQuery('.accordion__body').addClass('show'); 
        } else{
            boldEle.length ? boldEle.text('Expand All'):"" || spanELe.length ? spanELe.text('Expand All'):""
            jQuery('.accordion__header').addClass('collapsed');
            jQuery('.accordion__body').removeClass('show');
        }
    });
    jQuery('.accordion__header').click(function(){
        if(jQuery(this).hasClass('collapsed')){
            jQuery(this).removeClass('collapsed')
            jQuery(this).next('.accordion__body').addClass('show');
        } else {
            jQuery(this).addClass('collapsed')
            jQuery(this).next('.accordion__body').removeClass('show');
        }
    });