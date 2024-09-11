// For Image/Video full width container in mobile
function customBannerContainer(id) {
	let breakpoint = 992;
    let targetEl = $(id);

    if (!targetEl) {
		return;
    }

    targetEl.each(function () {
        if ($(window).width() < breakpoint) {
            $(this).parents('.a-container').addClass('pl-0 pr-0');
        } else {
            $(this).parents('.a-container').removeClass('pl-0 pr-0');
        }
    });
}

function appendToContainer(id) {
	let breakpoint = 992,
        targetEl = $(id);

    if (!targetEl) {
		return;
    }

    if ($(window).width() < breakpoint && $(id).find('.cmp-image__link').length == 1 && $(id).find('.parallax-wrapper__parallax-image').length == 1) {
        setTimeout(function () {
            targetEl.each(function () { 
                let mobileImage = $(this).find('.parallax-wrapper__parallax-image').detach();
    
                $(this).find('.cmp-image__link').append(mobileImage);
            });
        }, 100);
    }
}

function init() {
    customBannerContainer('#ph-img-banner');
    customBannerContainer('#ph-video');
    appendToContainer('#ph-img-banner');
}


$(window).resize(function() {
    init();
});

$(document).ready(function() {
    init();
});