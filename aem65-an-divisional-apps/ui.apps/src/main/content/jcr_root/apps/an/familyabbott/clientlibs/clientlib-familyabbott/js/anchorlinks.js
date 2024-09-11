function is_mobile() {
    let breakpoint = 992;
    return $(window).width() < breakpoint;
}

function updateStickyHeight(el) {
    let headerHeight = $(".o-header__sticky-section.sticky").height() || 0;

    if (el) {
        el.css('top', headerHeight);
    } else {
        return;
    }
}

function setAnchorSticky() {
   	let anchorLink = $('#ph-anchor-links');
    let windowScoll = $(window).scrollTop();
    let headerSticky = $(".o-header__sticky-section.sticky");
    let headerHeight = headerSticky.height();
    let targetText = anchorLink.find('.a-link').eq(0).text();

    // Identifier
    let identifier = $('#section-ph-anchor-links .a-container__content').offset().top - headerHeight;
    let linkStackContent = anchorLink.find('.m-link-stack--content');
    let links = anchorLink.find('.a-link');

    // Update container z-index
    linkStackContent.parents('.container').addClass('anchor-container');

    if (windowScoll > identifier && headerSticky.length > 0) {
        anchorLink.addClass('anchor-sticky');
    } else {
        anchorLink.removeClass('anchor-sticky');
        anchorLink.find('.a-link').removeClass('active');
        anchorLink.find('.m-link-stack--title').text(targetText);
    }

    links.each(function () {
        let scrollTarget = $(this).find('a').attr('href');

        if ($(scrollTarget).length <= 0) {
			return;
        }

        if ($(scrollTarget).offset().top <= (windowScoll + headerHeight + 200)) {
            // Update active link
            anchorLink.find('.a-link').removeClass('active');
            $('[href="' + scrollTarget + '"]').parent().addClass('active');

            // Set dropdown header text
            targetText = $('[href="' + scrollTarget + '"]').text();
            anchorLink.find('.m-link-stack--title').text(targetText);
        }
    });

    updateStickyHeight($('.anchor-sticky'));
}

// Update sticky position when resize
$(window).resize(function () {
    updateStickyHeight($('.anchor-sticky'));
});

$(document).ready(function () {
	let anchorLink = $('#ph-anchor-links');
    let scrollLimit = 0;

    if (!anchorLink.length) {
        return;
    }

    $(window).scroll(setAnchorSticky);

    anchorLink.find('.a-link').on('click', function () {
        let selectedOption = $(this).find('a').text();
        let scrollAnchor = $(this).find('.a-link__text').attr('href');

        if (!anchorLink.hasClass('anchor-sticky')) {
            if (is_mobile()) {
              	scrollLimit = 50;
            } else {
				scrollLimit = 28;
            }
        } else {
			scrollLimit = 0;
        }


        if ($(scrollAnchor).length > 0) {
            let scrollPoint = $(scrollAnchor).offset().top - 220 - scrollLimit;
            $('body,html').animate({ scrollTop: scrollPoint }, 500);
            $('#ph-anchor-links .m-link-stack--title').text(selectedOption);
            $('#ph-anchor-links .m-link-stack--content').addClass('d-none');
        }

        return false;
    });

    anchorLink.find('.m-link-stack').on('click', function () {
        let triggerEl = $(this).find('.m-link-stack--content');
        if (triggerEl.hasClass('d-none')) {
            triggerEl.removeClass('d-none');
        } else {
            triggerEl.addClass('d-none');
        }
    });
});
