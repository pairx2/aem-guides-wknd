(function ($) {
    let abstracts;
    let pageSize = 10;
    let facetQuery;
    function showSpinner(container) {
        const spinnerHtml = '<div class="a-spinner abstract-spinner">'
            + '<div class="spinner-border" role="status">'
            + '<span class="sr-only">Loading...</span>'
            + '</div></div>';
        if (container) {
            container.find('.a-spinner.abstract-spinner').remove();
            container.append(spinnerHtml);
        } else {
            $('body').find('.a-spinner.abstract-spinner').remove();
            $('body').append(spinnerHtml);
        }
        $('body').addClass('abstract-spinner-in');
    }

    function hideSpinner(container) {
        if (container) {
            container.find('.a-spinner.abstract-spinner').remove();
        } else {
            $('body').find('.a-spinner.abstract-spinner').remove();
        }
        $('body').removeClass('abstract-spinner-in');
    }

    function initSearchFilter() {
        if ($('#search-filter-page').length == 0) {
            return;
        }
        let searchQuery = Object.fromEntries((new URLSearchParams(window.location.search)).entries()).sf;
        if (!searchQuery || searchQuery.length == 0) {
            return;
        }
        searchQuery = searchQuery.toLowerCase();
        let searchFacets = searchQuery.split('&');
        let searchFacetCategories = {};
        searchFacets.forEach(function (searchFacet) {
            let searchCategories = searchFacet.split('=');
            let facetCat = decodeURIComponent(searchCategories[0]);
            let searchValues = searchCategories[1].split('|');
            searchFacetCategories[facetCat] = searchValues.map(function (searchValue) {
                searchValue = decodeURIComponent(searchValue).trim().toLowerCase();
                let searchOther = searchValue.split(" ").splice(-1);
                if (searchOther == 'other') {
                    searchValue = 'other';
                }
                return searchValue;
            });
        });
        $('.searchfacet fieldset').each(function () {
            let cCategory = $(this).find('>label.a-radio-label .a-radio__title-text, >label.a-checkbox-label .a-checkbox__title-text').text();
            cCategory = cCategory.trim().toLowerCase();
            let queryCategories = searchFacetCategories[cCategory];
            if (!queryCategories) {
                return;
            }
            $(this).find('.a-radio .a-radio__text, .a-checkbox .a-checkbox__text').each(function () {
                let cType = $(this).text();
                cType = cType.trim().toLowerCase();
                if (queryCategories.includes(cType)) {
                    $(this).closest('.a-radio__label, .a-checkbox__label').click();
                }
            });
        });
    }

    function renderResults(results, count, currPage) {
        let container = document.querySelector('[data-js-component="search-results-with-filters"]');
        $(container).find(".o-search-res__no-results").hide();
        let initialPaginationValue = $("#resultCount").data("result");
        $("#paginationResultTop").empty();
        if (results.length == 0) {
            $(container).find(".o-search-res__no-results").show();
            initialPaginationValue = initialPaginationValue.replace("{page}", "0");
            initialPaginationValue = initialPaginationValue.replace("{count}", "0");
            $("#paginationResultTop").append("<span>" + initialPaginationValue + "</span>");
            $('#mob-search-result .cmp-title__text').attr('data-abstracts', '0');
            hideSpinner($(container).closest('.a-container'));
            return;
        }

        if (currPage === void 0) { currPage = 1; }
        if (isNaN(pageSize)) {
            pageSize = 10;
        }

        let pages = Math.ceil(count / pageSize);
        let fromPage = ((currPage - 1) * pageSize) + 1;
        if (pages < 1) {
            fromPage = (currPage - 1) * pageSize;
        }
        let toPage = currPage * pageSize;
        if (toPage > count) {
            toPage = count;
        }
        let newSetResults = results.slice((currPage - 1) * pageSize, currPage * pageSize);

        initialPaginationValue = initialPaginationValue.replace("{page}", fromPage + "-" + toPage);
        initialPaginationValue = initialPaginationValue.replace("{count}", count);
        $("#paginationResultTop").append("<span>" + initialPaginationValue + "</span>");
        $('#mob-search-result .cmp-title__text').attr('data-abstracts', count);
        setDataAttributes(newSetResults, container);
        hideSpinner($(container).closest('.a-container'));
    }

    function getAbstracts() {
        let requestBody = { "firstresult": 1, "q": "", "filters": [{ "contentcategory": "page" }], "autocorrect": "true", "searchtype": "sitesearch", "sort": [] };
        let requestHeader = {};
        let headers = document.querySelectorAll('[type="hidden"][data-header="true"]');
        headers.forEach(function (header) {
            requestHeader[header.name] = header.value;
        });
        let apiOrigin = $('[data-esl-endpoint]').attr('data-esl-endpoint');
        let apiUrl = apiOrigin + '/api/public/search/sitesearch';
        return fetch(apiUrl, {
            method: "post",
            headers: requestHeader,
            body: JSON.stringify(requestBody),
        })
            .then(function (resp) { return resp.json(); });
    }

    function getOtherCategory(ind) {
        switch (ind) {
            case 0:
                return 'type of evidence other';
            case 1:
                return 'primary outcome other';
            case 2:
                return 'population other';
            default:
                return 'other';
        }
    }

    function getFilteredAbstracts() {
        if (!abstracts) {
            return undefined;
        }
        let selectedTypeFacets = {};
        let filterQuery = '';
        $('.searchfacet .options').each(function (ind) {
            let selectedInput = $(this).find('input:checked');
            if (selectedInput.length === 0 ){
            return;
            }
            let currentFacets = [];
            selectedInput.each(function () {
                let facetCategory = $(this).closest('.a-radio__label, .a-checkbox__label')
                    .find('.a-radio__text, .a-checkbox__text').text();
                facetCategory = facetCategory.trim();
                if (facetCategory.toLowerCase() == 'other') {
                    facetCategory = getOtherCategory(ind);
                }
                currentFacets.push(facetCategory);
            });
            let facetType = $(this).find('.a-radio__title-text, .a-checkbox__title-text').text().trim();
            filterQuery += encodeURIComponent(facetType) + '=';
            filterQuery += currentFacets.join('|') + '&';
            facetType = facetType.toLowerCase();
            selectedTypeFacets[facetType] = currentFacets.map(c => c.toLowerCase());
        });
        filterQuery = filterQuery.replace(/&$/, '');
        facetQuery = '';
        if (filterQuery.length > 0) {
            facetQuery = '?sf=' + encodeURIComponent(filterQuery);
        }
        if (Object.keys(selectedTypeFacets).length == 0) {
            return abstracts;
        }
        let filteredAbstracts = Object.assign([], abstracts);
        Object.keys(selectedTypeFacets).forEach(function (typeFacet) {
            let selectedFacets = selectedTypeFacets[typeFacet];
            filteredAbstracts = filteredAbstracts.filter(function (abstract) {
                if (!abstract.categorytagfacets || abstract.categorytagfacets.length == 0) {
                    return false;
                }
                let hasFacet = false;
                abstract.categorytagfacets.every(function (categorytagfacet) {
                    categorytagfacet = categorytagfacet.trim().toLowerCase();
                    selectedFacets.includes(categorytagfacet) && (() => {
                        hasFacet = true;
                        return false;
                    })();
                    return true;
                });
                return hasFacet;
            });
        });
        return filteredAbstracts;
    }

    function loadPagination(count) {
        $('[data-js-component="search-results-with-filters"] .a-pagination .a-pagination__pages').remove();
        let nav = $('[data-js-component="search-results-with-filters"] .a-pagination');
        nav.removeClass('d-none');
        nav.removeAttr('hidden', null);
        if (count <= pageSize) {
            nav.addClass('d-none');
            return;
        }
        let attrPage = 'data-page';
        let ul = $('<ul>').addClass('a-pagination__pages');
        let pageItem = $('<li>').addClass('a-pagination__page');
        let pageLink = $('<a>').addClass('a-pagination__link');
        let previousLink = pageLink.clone().addClass('no-click').attr('href', '#').attr(attrPage, '1').append('<em class="abt-icon abt-icon-left-arrow u-ltr"></em><em class="abt-icon abt-icon-right-arrow u-rtl"></em>');
        let previousItem = pageItem.clone().addClass('a-pagination--previous d-none').append(previousLink);
        ul.append(previousItem);
        let pages = Math.ceil(count / pageSize);
        for (let i = 1; i <= pages; i++) {
            let cPageLink = pageLink.clone();
            cPageLink.attr('href', '#').attr(attrPage, i).append(i);
            if (i == 1) {
                cPageLink.addClass('a-pagination--active');
            }
            ul.append(pageItem.clone().append(cPageLink));
        }
        let nextLink = pageLink.clone().attr('href', '#').attr(attrPage, 2).append('<em class="abt-icon abt-icon-right-arrow u-ltr"></em><em class="abt-icon abt-icon-left-arrow u-rtl"></em>');
        let nextItem = pageItem.clone().addClass('a-pagination--next').append(nextLink);
        ul.append(nextItem);
        nav.append(ul);
        nav.find('.a-pagination__link').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            if ($(this).hasClass('no-click')) {
                return false;
            }
            let currentPage = +$(this).attr(attrPage);
            renderFilteredAbstracts(currentPage);
            nav.find('.a-pagination__link').removeClass('a-pagination--active');
            nav.find('.a-pagination__page:not(.a-pagination--previous) .a-pagination__link[' + attrPage + '="' + currentPage + '"], .a-pagination__page:not(.a-pagination--next) .a-pagination__link[' + attrPage + '="' + currentPage + '"]').addClass('a-pagination--active');
            nav.find('.a-pagination--previous').addClass('d-none');
            nav.find('.a-pagination--previous .a-pagination__link').addClass('no-click').attr(attrPage, 1);
            if (currentPage > 1) {
                nav.find('.a-pagination--previous').removeClass('d-none');
                nav.find('.a-pagination--previous .a-pagination__link').removeClass('no-click').attr(attrPage, currentPage - 1);
            }
            nav.find('.a-pagination--next').addClass('d-none');
            nav.find('.a-pagination--next .a-pagination__link').addClass('no-click').attr(attrPage, pages);
            if (currentPage < pages) {
                nav.find('.a-pagination--next').removeClass('d-none');
                nav.find('.a-pagination--next .a-pagination__link').removeClass('no-click').attr(attrPage, currentPage + 1);
            }
            $('body, html').animate({
                scrollTop: 0
            });
        });
    }

    function loadSearchAbstracts() {
        if ($('#mf-abstracts-home').length > 0) {
            return;
        }
        if ($('[data-js-component="search-results-with-filters"]').length > 0) {
            showSpinner($('[data-js-component="search-results-with-filters"]').closest('.a-container'));
        }
        getAbstracts().then(function (data) {
            setTimeout(function () {
                if (!data || !data.response || !data.response.results) {
                    return;
                }
                abstracts = data.response.results.filter(function (result) { return !!result.categorytagfacets; });
                $('#med-affair-header .cmp-text p').attr('data-abstracts', abstracts.length);
                if ($('[data-js-component="search-results-with-filters"]').length == 0) {
                    return;
                }
                $('.o-search-results-filter').replaceWith($('<div class="o-search-results-filter-container">').prop('innerHTML', $('.o-search-results-filter').prop('outerHTML')));
                attachMobileEvents();
                initSearchFilter();
                renderFilteredAbstracts();
                $('.searchfacet .options input').on('change', function () {
                    setTimeout(function () {
                        renderFilteredAbstracts(undefined, false);
                    }, 200);
                });
                $('.filter-text h4, #clearAllFilters a').on('click', function (e) {
                    e.preventDefault();
                    setTimeout(function () {
                        $('.searchfacet .options input:checked').each(function () {
                            $(this).prop('checked', null);
                        });
                        renderFilteredAbstracts();
                    }, 200);
                });
            }, 2000);
        });
    }

    function renderFilteredAbstracts(currentPage, scroll = true) {
        let filteredAbstracts = getFilteredAbstracts();
        renderResults(filteredAbstracts, filteredAbstracts.length, currentPage);
        if (!currentPage) {
            loadPagination(filteredAbstracts.length);
        }
        let screenWidth = window.innerWidth || document.documentElement.clientWidth ||
            document.body.clientWidth;
        if (screenWidth >= 768 && scroll) {
            $('body, html').animate({
                scrollTop: 0,
            });
        }
    }

    function renderBackToList() {
        if ($('#back-to-list').length > 0) {
            let backListHref = $('#back-to-list').attr('href');
            if (window.location.search) {
                $('#back-to-list').attr('href', backListHref + window.location.search.toLocaleLowerCase());
            }
            renderAbstractTags(backListHref);
        }
    }

    function renderAbstractTags(backListHref) {
        if ($('#facet-tags-container .a-link').length > 0) {
            let searchQuery = Object.fromEntries((new URLSearchParams(window.location.search)).entries()).sf;
            if (!searchQuery || searchQuery.length == 0) {
                return;
            }
            let linkButton = $($.parseHTML($('#facet-tags-container .a-link').prop('outerHTML')));
            linkButton.find('.a-link__text').attr('id', '');
            let searchFacets = decodeURIComponent(searchQuery).split('&');
            let searchFacetCategories = [];
            searchFacets.forEach(function (searchFacet) {
                let searchCategories = searchFacet.split('=');
                let facetCat = decodeURIComponent(searchCategories[0]);
                let searchValues = searchCategories[1].split('|');
                searchValues.forEach(function (searchValue) {
                    let cLinkButton = linkButton.clone();
                    let nLink = backListHref + '?sf=' + encodeURIComponent(encodeURIComponent(facetCat) + '=' + searchValue).toLowerCase();
                    cLinkButton.find('.a-link__text').attr('href', nLink).html(searchValue);
                    searchFacetCategories.push(cLinkButton.prop('outerHTML'));
                });
            });
            $('#facet-tags-container').html(searchFacetCategories.join('<span class="a-link__seperator">|</span>'));
        }
    }

    $(document).ready(function () {
        $("#abstract-content").parents(".a-container__content").addClass("abstractpage__content");
        $(".searchfacet").children(".aem-Grid").addClass("search_facet");
        $('#section-facet-tags-container').parent('.a-container').addClass('facet-tag-wrapper');
        $("#errorpage").parents(".a-container__content").addClass("errorpage__content");
    });
    function attachMobileEvents() {
        $(".mob-filter a").click(function () {
            $(this).addClass("d-none");
            $("#clearAllFilters").removeClass("d-none");
            $(".o-search-res__results--view").addClass("d-none").removeClass("d-flex");
            $(".a-pagination").addClass("d-none");
            $("#section-search-results-mob-count").addClass("d-none");
            let vName = $(".searchfacet").children(".aem-Grid").attr("class");
            if (vName.includes("search_facet2")) {
                $(".searchfacet").children(".aem-Grid").removeClass("search_facet2");
                $(".searchfacet").children(".aem-Grid").addClass("search_facet");
            } else {
                $(".searchfacet").children(".aem-Grid").removeClass("search_facet");
                $(".searchfacet").children(".aem-Grid").addClass("search_facet2");
            }
        });

        $("#abtract-btn").click(function (e) {
            e.preventDefault();
            $(".mob-filter a").removeClass("d-none");
            $("#clearAllFilters").addClass("d-none");
            $(".o-search-res__results--view").removeClass("d-none").addClass("d-flex");
            $(this).closest("#crossIcon").find(".o-search-res__no-results").removeClass('d-none');
            $(".a-pagination").removeClass("d-none");
            $("#section-search-results-mob-count").removeClass("d-none");
            $(".searchfacet").children(".aem-Grid").removeClass("d-block");
                $(".searchfacet").children(".aem-Grid").removeClass("search_facet2");
                $(".searchfacet").children(".aem-Grid").addClass("search_facet");
            $('body, html').animate({
                scrollTop: 0,
            });
        });

        $("#back-link").click(function () {
            if ($(window).width() < 767) {
                $(this).closest('.search_facet').removeClass('d-block');
                $(this).closest('.search_facet2').addClass('d-none');
                $(this).closest(".o-search-res__container").find(".o-search-res__results--view").removeClass('d-none');
                $(".a-pagination").removeClass("d-none");
                $(this).closest("#crossIcon").find('#clearAllFilters').addClass('d-none');
                let mobFilter = $(this).closest("#crossIcon").find('.mob-filter');
                $(mobFilter).find('a').removeClass('d-none');
                $("#section-search-results-mob-count").removeClass("d-none");

            }
        });

        let filterMobile = $('.mob-filter').find('a');
        $(filterMobile).click(function () {
            if ($(window).width() < 767) {
                $(this).closest("#crossIcon").find('.search_facet').removeClass('d-none');
                $(this).closest("#crossIcon").find('.search_facet').addClass('d-block');
                $(this).closest("#crossIcon").find(".o-search-res__no-results").addClass('d-none');
            }
        });

        let clearFilter = $('#clearAllFilters').find('a');
        $(clearFilter).attr('role', 'button');
        $(clearFilter).attr('href', '#');

        $(clearFilter).click(function (event) {
            event.preventDefault();
            let removeElemenet = $(".searchfacet").find(".a-radio__input");
            $(removeElemenet).each(function () {
                if (removeElemenet.checked) {
                    $(this).innerHTML = "Unchecked";
                }
            });
        });
    }
    $(document).ready(function () {
        loadSearchAbstracts();
        renderBackToList();
        $('#siteleavinglink1,#siteleavinglink2').closest('.link').addClass('popup-section-hide');
    });
    const setDataAttributes = (newSetResults, container) => {
        let templateEle = container.querySelector('#result-temp');
        let resultsEle = container.querySelector(".o-search-res__results--view");
        resultsEle.innerHTML = '';
        let templateStr = [];
        newSetResults.forEach(function (result) {
            let cloneNode = templateEle.content
                .cloneNode(true)
                .querySelector(".result-items");
            result.uriextensiontype === "video" && handleVideoExtensiontype(cloneNode);
            result.uriextensiontype === "externalLink" && handleExternalLink(cloneNode);
            result.contenttype === "clinical-resources" && handleClinicalResources(cloneNode);
            result.searchresultbuttonuri == null && handleSearchResultbuttonuri(cloneNode);
            result.searchresultbuttonlabel == null && handleSearchResultbuttonlabel(cloneNode);
            executeBrightCoveandExternalLink(cloneNode);
            let tempStr = cloneNode.outerHTML;
            let matches = tempStr.match(/\{[^{}]*\}/gm);
            let uniqueMatches = Array.from(new Set(matches));
            uniqueMatches.forEach(function (match) {
                let key = match.replace(/[{}]/g, "");
                let reg = new RegExp(match, "gm");
                if (key == 'clickableuri') {
                    result[key] = result[key].split('?')[0];
                    result[key] = result[key] + facetQuery;
                }
                tempStr = tempStr.replace(reg, result[key] || "");
            });
            templateStr.push(tempStr);
        });
        resultsEle.innerHTML = templateStr.join("").replace(/(\®)/g, "<sup>$1</sup>");
    };
    const handleVideoExtensiontype = (cloneNode) => {
        let _a,_b,_c;
        _a = cloneNode.querySelector(".a-card-result__link");
        _a && _a.remove();
        _b = cloneNode.querySelector(".a-list-result__link");
        _b && _b.remove();
        _c = cloneNode.querySelector(".a-link.external-link");
        _c && _c.remove();
    };
    const handleExternalLink = (cloneNode) => {
        let _d,_e,_f;
        _d = cloneNode.querySelector(".brightcove-video-link");
        _d && _d.remove();
        _e = cloneNode.querySelector(".a-card-result__link");
        _e && _e.remove();
        _f = cloneNode.querySelector(".a-list-result__link");
        _f && _f.remove();
    };
    const handleClinicalResources = (cloneNode) => {
        let _g;
        _g = cloneNode.querySelector(".a-result__link");
        _g && _g.setAttribute("data-content-type", "clinical-resources");
    };
    const executeBrightCoveandExternalLink = (cloneNode) => {
        let _h,_j;
        _h = cloneNode.querySelector(".brightcove-video-link");
        _h && _h.remove();
        _j = cloneNode.querySelector(".a-link.external-link");
        _j && _j.remove();
    };
    const handleSearchResultbuttonuri = (cloneNode) => {
        let _k,_l,_m,_o,_p,_q;
        _k = cloneNode.querySelector(".a-result__link");
        _l = _k && _k.getAttribute("data-default-search-btn-link");
        _k && _l && _k.setAttribute("data-href", _l);
        _m = cloneNode.querySelector(".a-card-result__image-link");
        _o = _m && _m.getAttribute("data-default-search-btn-link");
        _m && _o && _m.setAttribute("data-href", _o);
        _p = cloneNode.querySelector(".a-link.external-link a");
        _q = _p && _p.getAttribute("data-default-search-btn-link");
        _p && _q && _p.setAttribute("data-redirect-url", _q);
    };
    const handleSearchResultbuttonlabel = (cloneNode) => {
        let _r,_s,_t,_u;
        _r = cloneNode.querySelector(".a-result__link");
        _s = _r && _r.getAttribute("data-default-search-btn-label")
        _r && _s && (_r.innerHTML = _s);
        _t = cloneNode.querySelector(".a-link.external-link a");
        _u = _t && _t.getAttribute("data-default-search-btn-label");
        _t && _u && (_t.innerHTML = _u);
    };
})(jQuery);
