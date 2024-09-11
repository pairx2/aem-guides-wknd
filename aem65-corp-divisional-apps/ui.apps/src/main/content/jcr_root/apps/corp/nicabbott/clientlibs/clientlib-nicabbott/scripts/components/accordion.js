// JS to achieve the accordion functionality
$(document).ready(function () {
    // Code to check if any accordion is expended, if it is, it'll be closed.
    const accordionClose = $('.accordion.m-accordion-close');
    if (accordionClose.length && isOnPublish()) {
        let accordionCloseList = accordionClose.find('.m-accordion__content-items');
        closeAccordions(accordionCloseList, 1000);
    }

    function toggleExpandedClass() {
        if ($(this).has('.show').length > 0) {
            $(this).addClass('m-accordion__expanded');
        } else {
            $(this).removeClass('m-accordion__expanded');
        }
    }

    if (($('.accordion__expand-collapse-group').length || $('.m-accordion-variation--deluxe-filter').length) && isOnPublish()) {
        const accordionClassSection = $('.accordion__expand-collapse-group').length ? '.accordion.accordion__expand-collapse-group' : '.accordion.m-accordion-variation--deluxe-filter';
        const accordionContentItems = accordionClassSection + ' .m-accordion__content-items';
        $(accordionContentItems).each(toggleExpandedClass);
        $(accordionContentItems + ' .m-accordion__header').on('click', function () {
            // We are appending the m-accordion__expanded class based on the .show class on accordion body.
            // When we toggle the accordion with this click handler,  immediately .show class is not applying on accordion body.
            // So we put a delay of 10 milli seconds to complete the default accordion functionality first.
            setTimeout(function () {
                $(accordionContentItems).each(toggleExpandedClass);
            }, 300)
        });

    }

    if ($('.m-accordion--medialibrary-variation-2').length && $('.content-fragment-medialibrary-variation-2').length) {
        //adding class to the active button and its header
        $('.m-accordion__content-items').each(function () {
            $('.m-accordion__header').on('click', function () {
                $('.m-accordion__header').parent().removeClass('tag-list-article-active')
                $(this).closest('.m-accordion__content-items').addClass('tag-list-article-active')
            })
            $('.m-accordion__body .button .btn').on('click', function () {
                $('.m-accordion__body .button .btn').parent().removeClass('tag-list-button-active')
                $(this).parent().addClass('tag-list-button-active')

                $('.m-accordion__body .button .btn').parent().siblings().removeClass('tag-list-button-not-active')
                $(this).parent().siblings().addClass('tag-list-button-not-active')
            })
        })
        var stringValue = $('.cmp-contentfragment__element.cmp-contentfragment__element--duration .cmp-contentfragment__element-value p').text();
        var showingId = stringValue && stringValue.replaceAll('{{filter-id-"', '').split('"}}');
        //on page load display the first image of the fisrt city
        $(window).on("load", function () {
            var firstId = $('div.accordion .m-accordion__body .button:first-child .btn').attr('id')
            $('.article-ahnchor').each(function () {
                if ($(this).find(".cmp-contentfragment__element.cmp-contentfragment__element--duration .cmp-contentfragment__element-value p").text().includes(firstId) == true) {
                    $(this).attr('style', 'display:block !important');
                }
            })
            //Trigger click event for first item  in the accordion.
            setTimeout(function () {
                $('.m-accordion--medialibrary-variation-2 .m-accordion__content-items:first-child .m-accordion__header').trigger('click');
            }, 1600);
        })
        // upon clicking the year display the first city out of the list
        $('.m-accordion__header').on('click', function () {
            var newfirstId = $(this).parent().find('.m-accordion__body .button:first-child .btn').attr('id')
            $('.article-ahnchor').each(function () {
                if ($(this).find(".cmp-contentfragment__element.cmp-contentfragment__element--duration .cmp-contentfragment__element-value p").text().includes(newfirstId) == true) {
                    $(this).attr('style', 'display:block !important');
                } else {
                    $(this).hide();
                }
            })
            $(this).parent().find('.m-accordion__body .button:first-child .btn');
            $('.m-accordion__body .button .btn').parent().removeClass('tag-list-button-active');
            $(this).parent().addClass('tag-list-button-active');

            $('.m-accordion__body .button .btn').parent().siblings().removeClass('tag-list-button-not-active');
            $(this).parent().siblings().addClass('tag-list-button-not-active');
        })
        //display image on click of the respective button
        $('div.accordion .m-accordion__body .button .btn').on('click', function () {
            var buttonId = $(this).attr('id')
            $.each(showingId, function (index, val) {
                if (val == buttonId) {
                    $('.article-ahnchor').each(function () {
                        if ($(this).find(".cmp-contentfragment__element.cmp-contentfragment__element--duration .cmp-contentfragment__element-value p").text().includes(val) == true) {
                            $(this).attr('style', 'display:block !important');
                        } else {
                            $(this).hide();
                        }
                    });
                }
            });
        })
        if (window.matchMedia("(max-width: 767.98px)").matches && $('.m-accordion--medialibrary-variation-2').length) {
            var accordian = $('.m-accordion--medialibrary-variation-2').clone(true);
            var textmedia = $('.m-accordion--medialibrary-variation-2').prev().clone(true);
            $('.m-accordion--medialibrary-variation-2').prev().remove();
            $('.m-accordion--medialibrary-variation-2').remove();
            textmedia.insertBefore($('.content-fragment-medialibrary-variation-2'));
            accordian.insertBefore($('.content-fragment-medialibrary-variation-2'));
        }
    }



    // Deluxe filter one accordion to be open at a time
    const deluxeAccordions = $('.m-accordion-variation--deluxe-filter');

    if (deluxeAccordions.length && isOnPublish()) {
        deluxeAccordions.find('.m-accordion__header').on('click', function () {
            let accordionCloseList = $(this).parents('.m-accordion-variation--deluxe-filter').siblings('.m-accordion-variation--deluxe-filter');
            closeAccordions(accordionCloseList, 100);
        });
    }

    /**
     * @function
     * Summary: Function to check if the accordion is expanded, and close if it is expanded.
     * Parameter: accordionList -> List to be iterated, delay: setTimePut delay
     */
    function closeAccordions(accordionList, delay) {
        accordionList.each(function () {
            let accordionHeader = $(this).find('.m-accordion__header');
            let accordionBody = $(this).find('.m-accordion__body');
            setTimeout(() => {
                if (accordionBody.hasClass('show')) {
                    accordionBody.removeClass('show');
                    accordionHeader.find('.m-accordion__icon-wrapper').attr('aria-expanded', false);
                    accordionHeader.find('.m-accordion-toggle').attr('data-toggle', 'expand');
                    $(this).hasClass('m-accordion__expanded') && $(this).removeClass('m-accordion__expanded');
                    accordionHeader.find('.m-accordion-toggle').children().each(function () {
                        if ($(this).hasClass('icon-visible')) {
                            $(this).removeClass('icon-visible');
                        } else {
                            $(this).addClass('icon-visible');
                        }
                    });
                }
            }, delay);
        });
    }
});