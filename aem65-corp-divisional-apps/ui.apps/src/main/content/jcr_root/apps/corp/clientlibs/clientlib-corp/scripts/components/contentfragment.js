/**********************************
contentfragmentlist component
**********************************/
$(document).ready(function () {
    //using the embed component to get the data
    var loadmoreText = $('div.Load-more-btn-text').length ? $('div.Load-more-btn-text').text() : 'Load More';
    var showingContent = $('div.showing-items-text').length ? $('div.showing-items-text').text() : 'Showing 1-{} of {}';
    var displayedContent = showingContent.replaceAll('}', '').split('{');
    $('div.embed .category-filter-config-section').hide();

    // List of all style system classes where content fragment needs anchor/clickable
    let anchorRequiredClasses = [
        'contentfragmentlist-hubarticlebrief',
        'categoryfilter',
        'contentfragmentlist-press-release',
        'contentfragmentlist-press-release-variation-2',
        'cnt-trending-list',
        'deluxe-filter-variation',
        'content-fragment-medialibrary',
        'content-fragment-medialibrary-variation-2',
        'content-fragment-recentpress-release',
        'contentfragmentlist-facts',
        'cf-variation--categoryfilter',
        'container-variation--cf-hubarticlebrief'
    ];
    $('.cmp-contentfragment').each(function () {
        let anchorRequried = false;
        let anchorHref = $(this).find('.cmp-contentfragment__element--contentdetailsreference .cmp-contentfragment__element-value').text().trim();
        anchorRequiredClasses.forEach(val => {
            if ($(this).parent().hasClass(val) || $(this).parents('.contentfragmentlist').hasClass(val) || $(this).parents('.container').hasClass(val) || $(this).parents('.columncontrol').hasClass(val)) {
                anchorRequried = true;
                return false;
            }
        })
        if (anchorHref && anchorHref.length && anchorRequried) {
            $(this).wrap(`<a class="article-ahnchor" href="${anchorHref}"></a>`);
        }
        if ($(this).parents('.columncontrol').hasClass('deluxe-filter-variation')) {
            if (!(anchorHref && anchorHref.length)) {
                $(this).wrap(`<a href=""></a>`);
            }
        }
    });

    //to convert content fragment data to deluxe filter accordian and button
    if (isOnPublish() && ($('.m-accordion-variation--deluxe-filter').length > 0 || $('.button-cta--variation-accordion').length > 0)) {
        var accordianstructure = $('.accordion.m-accordion-variation--deluxe-filter').clone(true);
        var buttonstructure = $('.button.button-cta--variation-accordion').clone(true);
        $('.button.button-cta--variation-accordion').hide();
        $('.accordion.m-accordion-variation--deluxe-filter').hide();

        //for each contentfragmentlist finding the accordian data and button data
        $(".contentfragmentlist").each(function () {
            var accordianclone, buttonclone;
            var i, href;
            var links = $(this).find('a');
            var accordianheading = $(this).find('.cmp-contentfragment__element--heading .cmp-contentfragment__element-value *').clone(true);
            var accordiandescription = $(this).find('.cmp-contentfragment__element--detaildescription .cmp-contentfragment__element-value').clone(true);

            for (i = 0; i < links.length; i++) {
                //to check whether a tag has links or not
                href = links[i].getAttribute('href');
                if ((href.trim().length < 1) && ($(accordiandescription[i]).children().length == 0)) {
                    buttonclone = buttonstructure.clone(true);
                    buttonclone.find('.btn span').empty().append(accordianheading[i].innerHTML);
                    buttonclone.insertBefore($(this));
                }
                else if (href.trim().length < 1) {
                    // to create accordians
                    accordianclone = accordianstructure.clone(true);
                    accordianclone.find('.m-accordion__title-wrapper *').empty().append(accordianheading[i].innerHTML);
                    accordianclone.find('.m-accordion__body .cmp-text *').empty().append(accordiandescription[i].innerHTML);
                    accordianclone.insertBefore($(this));
                }

                else {
                    // to create buttons
                    buttonclone = buttonstructure.clone(true);
                    buttonclone.find('a').attr("href", href);
                    buttonclone.find('.btn span').empty().append(accordianheading[i].innerHTML);
                    buttonclone.insertBefore($(this));
                }
            }
            //to add wrapper for each content fragment list
            $(this).prevUntil(".text").wrapAll("<div></div>");
            $(this).prev().css({
                "display": "flex",
                "flex-direction": "column-reverse",
                "margin": "0"
            });
            $(this).remove();
        });
    }

    //js code to change the date format to string format to match with 6.3
    $("article.cmp-contentfragment .cmp-contentfragment__element.cmp-contentfragment__element--publishdate .cmp-contentfragment__element-value").each(function () {
        var numDate = $(this).text();
        var trimmedDate = numDate.trim();
        var publishDate = new Date(trimmedDate.replace(/-/g, '/'));
        var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var stringDate = month[publishDate.getMonth()] + '. ' + publishDate.getDate() + ', ' + publishDate.getFullYear();
        $(this).parent().text(stringDate)
    });

    if ($('.contentfragmentlist').length > 0 && isOnPublish()) {
        $('.contentfragmentlist').each(function () {

            if ($(this).parents('.pagination').length <= 0) {
                $('div.contentfragmentlist').append(`<section class="pagination"><div class="pagination-holder"><span class="show-more-alig">${displayedContent[0]}<span class="article-maxlimit"></span> ${displayedContent[1]} <span class="article-totalcount"></span> </span>
    </div> <button class="load-more">${loadmoreText}</button></section>`);
            }
        })
    }
    //open page in new tab
    if ($('.content-fragment-medialibrary-variation-2').length) {
        $('.article-ahnchor').on('click', function (e) {
            e.preventDefault();
            var url = $(this).attr('href');
            window.open(url, '_blank');
        });
    }

    $('.contentfragmentlist-hubarticlebrief').length && $('.contentfragmentlist-hubarticlebrief .cmp-contentfragment__element--publishdate').each(function () {
        $(this).next('.cmp-contentfragment__element--heading').addBack().wrapAll('<div class="cmp-contentfragment__element cmp-contentfragment-text-wrapper" />');
    });

    $('.container-variation--cf-hubarticlebrief').length && $('.container-variation--cf-hubarticlebrief .cmp-contentfragment__element--publishdate').each(function () {
        $(this).next('.cmp-contentfragment__element--heading').addBack().wrapAll('<div class="cmp-contentfragment__element cmp-contentfragment-text-wrapper" />');
    });

    //function to replace the heading value with subheading for hubarticlebrief variation
    if ($('.contentfragmentlist-hubarticlebrief').length && isOnPublish()) {
        $('.cmp-contentfragment__elements').each(function () {
            const subHeadingText = $(this).find('.cmp-contentfragment__element--subheading .cmp-contentfragment__element-value').text();
            $(this).find('.cmp-contentfragment__element--heading .cmp-contentfragment__element-value').replaceWith("<p>" + subHeadingText + "</P>");
        });
    }
    if ($('.container-variation--cf-hubarticlebrief').length && isOnPublish()) {
        $('.cmp-contentfragment__elements').each(function () {
            const subHeadingText = $(this).find('.cmp-contentfragment__element--subheading .cmp-contentfragment__element-value').text();
            $(this).find('.cmp-contentfragment__element--heading .cmp-contentfragment__element-value').replaceWith("<p>" + subHeadingText + "</P>");
        });
    }

    $('.cmp-contentfragment-corpnewsroom').length && $('.cmp-contentfragment-corpnewsroom .cmp-contentfragment__element--publishdate').each(function () {
        $(this).prev('.cmp-contentfragment__element--subheading').addBack().wrapAll('<div class="cmp-contentfragment__element cmp-contentfragment-wrapper" />');

    });

    //corpnewsroom page functionality to swap the heading and subheading values
    function swapContentFragmentHeading() {
        const heading = $('.cmp-contentfragment-corpnewsroom .cmp-contentfragment__element--heading .cmp-contentfragment__element-value').children();
        const subHeading = $('.cmp-contentfragment-corpnewsroom .cmp-contentfragment__element--subheading .cmp-contentfragment__element-value a');
        const headingTrimmedData = heading.text().split('{{')[0];
        const subHeadingValue = subHeading.text();
        subHeading.text(headingTrimmedData);
        heading.text(subHeadingValue);
    }
    if (isOnPublish() && $('.cmp-contentfragment-corpnewsroom').length > 0) {
        swapContentFragmentHeading();
    }
    //functionality to remove the href attribute of subheading in categoryfilter variation
    if (($('.categoryfilter').length || $('.cf-variation--categoryfilter').length) && isOnPublish()) {
        if ($('.categoryfilter').length) {
            $('.categoryfilter .cmp-contentfragment__element.cmp-contentfragment__element--subheading a').removeAttr("href");
        }
        if ($('.cf-variation--categoryfilter').length) {
            $('.cf-variation--categoryfilter .cmp-contentfragment__element.cmp-contentfragment__element--subheading a').removeAttr("href");
        }
    }

    if (isOnPublish() && ($('.categoryfilter').length || $('.cnt-trending-list').length)) {
        $('.contentfragmentlist .cmp-contentfragment .cmp-contentfragment__elements .cmp-contentfragment__element--heading .cmp-contentfragment__element-value').each(function () {
            colorClassConverter($(this));
        });
    }

    if (isOnPublish() && $('.cf-variation--categoryfilter').length) {
        $('.cf-variation--categoryfilter .cmp-contentfragment .cmp-contentfragment__elements .cmp-contentfragment__element--heading .cmp-contentfragment__element-value').each(function () {
            colorClassConverter($(this));
        });
    }
});

function colorClassConverter($this) {
    const headingFullText = $this.text();
    const headingMainText = headingFullText.split('{{')[0];
    const headingMainTextColorClass = headingFullText.split('{{').length > 1 ? headingFullText.split('{{').pop().split('}}')[0] : '';
    $this.text(headingMainText);
    $this.addClass(headingMainTextColorClass);
}

$(window).on('load', function () {
    if ($('.contentfragmentlist').length > 0 && isOnPublish()) {
        $('.contentfragmentlist').each(function () {

            if ($(this).parents('.pagination').length <= 0) {

                var parent = document.querySelector('.cmp-contentfragmentlist'),
                    items = parent ? parent.querySelectorAll('.article-ahnchor') : 0,
                    loadMoreBtn = document.querySelector('.load-more'),
                    maxItems = $('div.card-item-count').length ? parseInt($('div.card-item-count').text()) : 6,
                    currentItem = $('div.card-item-count').length ? parseInt($('div.card-item-count').text()) : 6,
                    hiddenClass = "d-none",
                    articleTotal = items ? items.length : 0,
                    remainingItems = articleTotal;

                $('.article-totalcount').text(articleTotal);
                $('.article-maxlimit').text(maxItems);

                if (articleTotal == maxItems) {
                    $('.article-maxlimit').text(articleTotal);

                }
                if (articleTotal < maxItems) {
                    $('.article-maxlimit').text(articleTotal);

                }

                [].forEach.call(items, function (item, idx) {
                    if (idx > maxItems - 1) {
                        item.classList.add(hiddenClass);
                    }
                });

                var itemCount = $('.contentfragmentlist .article-ahnchor').length
                if ($('.load-more').length > 0) {
                    if (itemCount <= currentItem) {
                        loadMoreBtn.style.display = 'none';
                    }

                }

                loadMoreBtn && loadMoreBtn.addEventListener('click', function () {

                    remainingItems = remainingItems - maxItems;
                    currentItem = currentItem + maxItems;
                    if (remainingItems > maxItems) {
                        $('.article-maxlimit').text(currentItem);

                    } else {

                        $('.article-maxlimit').text(articleTotal);
                        loadMoreBtn.style.display = 'none';
                    }


                    [].forEach.call(document.querySelectorAll('.article-ahnchor.' + hiddenClass), function (item, idx) {
                        if (idx < maxItems) {
                            item.classList.remove(hiddenClass);
                        }

                        if (document.querySelectorAll('.' + hiddenClass).length === 0) {
                            loadMoreBtn.style.display = 'none';
                        }

                    });

                });
            }
        })
    }
});