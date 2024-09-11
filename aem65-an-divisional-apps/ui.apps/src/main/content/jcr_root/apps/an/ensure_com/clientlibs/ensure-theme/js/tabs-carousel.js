$(window).on('load', function () {
    dotsIcon();
    setTimeout(() => {
        if ($('#tabs-slick-carousel').length) {
            dotsIcon();
        }

        document.querySelector('#tabs-slick-carousel .cmp-tabs__tabpanel .slick-dots')?.addEventListener('click', function (e) {
            e.preventDefault();
        });

        document.querySelectorAll("#tabs-slick-carousel .m-cards-tab__content .slick-dots > li")?.forEach(function (item, i) {
            item.classList.add('active');
        });

        let arrowPressed = false;

        $(document).on('click', '#tabs-slick-carousel .o-hero-carousel', function () {
            arrowPressed = true;
            if (arrowPressed) {
                setTimeout(function () {
                    nextSlideIndexCallBack();
                }, 300);
            }
        });

        arrowPressedValue();

    }, 500);
});
function arrowPressedValue() {
    document.querySelector(".cmp-tabs__tablist")?.addEventListener('click', function (event) {
        let activeTab;
        event.preventDefault();
        document.querySelectorAll('.slick-slide:not(.slick-cloned) .m-cards-tab__content .cmp-tabs__tabpanel').forEach(function (item, i) {
            if (i != 0 && item.classList.contains('cmp-tabs__tabpanel--active')) {
                item.classList.remove('.cmp-tabs__tabpanel--active', 'active');
            }
        });

        document.querySelectorAll('.slick-slide:not(.slick-cloned) .cmp-tabs__tab').forEach(function (item, i) {
            if (item.classList.contains('cmp-tabs__tab--active')) {
                activeTab = i;
            }
        });

        if (activeTab == 1) {
            $('#tabs-slick-carousel .o-hero-carousel .slick-dots > li').eq(6).trigger('click');
        } else if (activeTab == 2) {
            $('#tabs-slick-carousel .o-hero-carousel .slick-dots > li').eq(8).trigger('click');
        } else if (activeTab == 0) {
            setTimeout(function () {
                $('#tabs-slick-carousel .o-hero-carousel .slick-dots > li').eq(0).trigger('click');
            }, 100);
        }

        document.querySelectorAll('.m-cards-tab__content .cmp-tabs__tabpanel')[0].classList.add('.cmp-tabs__tabpanel--active', 'active');

    });
}
function nextSlideIndexCallBack() {
    let nextSlideIndex = $('#tabs-slick-carousel #container1-slides .slick-track .slick-slide.slick-active').attr('data-slick-index');
    if (nextSlideIndex >= 1 && nextSlideIndex <= 5) {
        document.querySelectorAll("#tabs-slick-carousel .m-cards-tab__content .slick-dots > li").forEach(function (item, i) {
            if (i != nextSlideIndex) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    } else if (nextSlideIndex == 0) {
        dotsIcon();
        setTimeout(function () {
            document.querySelectorAll("#tabs-slick-carousel .m-cards-tab__content .slick-dots > li")?.forEach(function (item, i) {
                item.classList.add('active');
            });
        }, 100)
    }
    if (nextSlideIndex >= 6 && nextSlideIndex <= 8) {
        $('.slick-dots').hide();
        if (nextSlideIndex == 6 || nextSlideIndex == 7) {
            document.querySelector(".cmp-tabs__tablist .slick-slide.slick-current .cmp-tabs__tab").classList.remove('cmp-tabs__tab--active', 'show', 'active');
            document.querySelector(".cmp-tabs__tablist .slick-slide.slick-current").classList.remove('slick-current');
            document.querySelector(".cmp-tabs__tablist .slick-slide[data-slick-index='1']").classList.add('slick-current');
            document.querySelector(".cmp-tabs__tablist .slick-slide[data-slick-index='1'] .cmp-tabs__tab").classList.add('cmp-tabs__tab--active', 'show', 'active');
        } else {
            document.querySelector(".cmp-tabs__tablist .slick-slide.slick-current .cmp-tabs__tab").classList.remove('cmp-tabs__tab--active', 'show', 'active');
            document.querySelector(".cmp-tabs__tablist .slick-slide.slick-current").classList.remove('slick-current');

            document.querySelector(".cmp-tabs__tablist .slick-slide[data-slick-index='2']").classList.add('slick-current');
            document.querySelector(".cmp-tabs__tablist .slick-slide[data-slick-index='2'] .cmp-tabs__tab").classList.add('cmp-tabs__tab--active', 'show', 'active');
        }
    } else {
        $('.slick-dots').show();
        document.querySelector(".cmp-tabs__tablist .slick-slide.slick-current .cmp-tabs__tab").classList.remove('cmp-tabs__tab--active', 'show', 'active');
        document.querySelector(".cmp-tabs__tablist .slick-slide.slick-current").classList.remove('slick-current');

        document.querySelector(".cmp-tabs__tablist .slick-slide[data-slick-index='0']").classList.add('slick-current');
        document.querySelector(".cmp-tabs__tablist .slick-slide[data-slick-index='0'] .cmp-tabs__tab").classList.add('cmp-tabs__tab--active', 'show', 'active');
    }
}
function dotsIcon() {
    let $slides = $("#tabs-slick-carousel .o-hero-carousel .slick-dots li");
    $slides.each(function (i) {
        switch (i) {
            case 0: $(this).html('');
                break;
            case 1: $(this).html('<a href="#"><img src="/content/dam/an/ensure-com/muscle-icon.svg" /><img src="/content/dam/an/ensure-com/muscle-active-icon.svg" /><span>Muscle<span></a>');
                break;
            case 2: $(this).html('<a href="#"><img src="/content/dam/an/ensure-com/heart-icon.svg" /><img src="/content/dam/an/ensure-com/heart-active-icon.svg" /><span>Heart</span></a>');
                break;
            case 3: $(this).html('<a href="#"><img src="/content/dam/an/ensure-com/digestion-icon.svg" /><img src="/content/dam/an/ensure-com/digestion-active-icon.svg" /><span>Digestion</span</a>');
                break;
            case 4: $(this).html('<a href="#"><img src="/content/dam/an/ensure-com/bone-icon.svg" /><img src="/content/dam/an/ensure-com/bone-active-icon.svg" /><span>Bone</span></a>');
                break;
            case 5: $(this).html('<a href="#"><img src="/content/dam/an/ensure-com/immune-icon.svg" /><img src="/content/dam/an/ensure-com/immune-active-icon.svg" /><span>Immune</span></a>');
                break;
        }
    });
}