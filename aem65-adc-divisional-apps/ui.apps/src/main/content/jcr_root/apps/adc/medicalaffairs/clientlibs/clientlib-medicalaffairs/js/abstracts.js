(function ($) {
    let facets = {};
    let evidenceContainer = '#ma-home-tile-type-evidence',
        primaryContainer = '#ma-home-tile-primary-outcome',
        populationContainer = '#ma-home-tile-population';
    let containers = [evidenceContainer, primaryContainer, populationContainer];
    $('#view-selected-abstracts').closest('.a-button').css('display', 'none');
    $(document).ready(function () {
        loadAbstracts();
        initFacetSelection();
    });

    function initFacetSelection() {
        containers.forEach(function (containerId, ind) {
            $(containerId).find('.a-tile__link').on('click', function (e) {
                e.preventDefault();
                if (Object.keys(facets).length == 0) {
                    return;
                }
                if ($(this).hasClass('non-selectable')) {
                    return;
                }

                let hasSelected = $(this).hasClass('selected');
                if (hasSelected) {
                    $(containerId).find('.a-tile__link').removeClass('not-selected');
                    $(this).removeClass('selected');
                } else {
                    if(containerId != populationContainer) {
                        $(containerId).find('.a-tile__link').removeClass('selected').addClass('not-selected');
                    }
                    $(this).removeClass('not-selected').addClass('selected');
                }
                loadAbstractToFacetCount(containerId);
                setViewSelectedAbstracts();
            });
        });
    }

    function loadAbstractToFacetCount(containerId) {
        let filteredGroup = getFilteredGroupedAbstract();

        $(containerId).find('.a-tile__link').removeClass('not-selected');
        loadFacetCount(filteredGroup.groupAbstracts, evidenceContainer, 0);
        loadFacetCount(filteredGroup.groupAbstracts, primaryContainer, 1);
        if(containerId != populationContainer) {
            let evidenceSelected = $(evidenceContainer).find('.a-tile__link.selected');
            let primarySelected = $(primaryContainer).find('.a-tile__link.selected');
            if(evidenceSelected.length == 0 && primarySelected.length == 0) {
                filteredGroup.groupAbstracts = facets;
            }
            loadFacetCount(filteredGroup.groupAbstracts, populationContainer, 2);
        } else {
            let uniqueAbstracts = removeDuplicateAbstracts(filteredGroup.currentAbstracts);
            $(populationContainer).find('.text').attr('data-abstracts-count', uniqueAbstracts.length);
        }
    }

    function setViewSelectedAbstracts() {
        let selectedFacets = [];
        containers.forEach(function (conatinerId) {
            let facetCategory = encodeURIComponent($(conatinerId).find('.text .cmp-text p').text().trim().toLowerCase());
            let selectedCategoryType = [];
            $(conatinerId).find('.a-tile__link.selected .a-tile__title-text p').each(function () {
                selectedCategoryType.push(encodeURIComponent($(this).text().trim().toLowerCase()));
            });
            if (selectedCategoryType.length > 0) {
                facetCategory += '=' + selectedCategoryType.join('|');
                selectedFacets.push(facetCategory);
            }
        });
        let viewAllAbstractUrl = $('#view-all-abstracts').attr('href');
        $('#view-all-abstracts').closest('.a-button').css('display', 'flex');
        $('#view-selected-abstracts').closest('.a-button').css('display', 'none');
        if (selectedFacets.length > 0) {
            $('#view-all-abstracts').closest('.a-button').css('display', 'none');
            $('#view-selected-abstracts').closest('.a-button').css('display', 'flex');
            let viewSelectedAbstractUrl = viewAllAbstractUrl + '?sf=' + encodeURIComponent(selectedFacets.join('&'));
            $('#view-selected-abstracts').attr('href', viewSelectedAbstractUrl);
        }
    }

    function getFilteredGroupedAbstract() {
        let groupAbstracts = facets;
        let currentAbstracts;
        let selectedAbstracts = $(evidenceContainer).find('.a-tile__link.selected');
        if (selectedAbstracts.length > 0) {
            let evidenceCategory = $(selectedAbstracts).text().trim().toLowerCase();
            if (evidenceCategory == 'other') {
                evidenceCategory = getOtherCategory(0);
            }
            currentAbstracts = groupAbstracts[evidenceCategory];
            if(currentAbstracts) {
                groupAbstracts = groupFacetAbstracts(currentAbstracts);
            }
        }

        selectedAbstracts = $(primaryContainer).find('.a-tile__link.selected');
        if (selectedAbstracts.length > 0) {
            let primaryCategory = $(selectedAbstracts).text().trim().toLowerCase();
            if (primaryCategory == 'other') {
                primaryCategory = getOtherCategory(1);
            }
            currentAbstracts = groupAbstracts[primaryCategory];
            if(currentAbstracts) {
                groupAbstracts = groupFacetAbstracts(currentAbstracts);
            }
        }

        let filteredGroup = getPopulationAbstract(currentAbstracts, groupAbstracts);
        currentAbstracts = filteredGroup.currentAbstracts;
        groupAbstracts = filteredGroup.groupAbstracts;

        if(!currentAbstracts) {
            currentAbstracts = [];
            Object.keys(groupAbstracts).forEach(function(key) {
                currentAbstracts = currentAbstracts.concat(groupAbstracts[key]);
            });
        }
        return {groupAbstracts, currentAbstracts};
    }

    function getPopulationAbstract(currentAbstracts, groupAbstracts) {
        let selectedAbstracts = $(populationContainer).find('.a-tile__link.selected');
        if (selectedAbstracts.length > 0) {
            currentAbstracts = [];
            selectedAbstracts.each(function () {
                let populationCategory = $(this).text().trim().toLowerCase();
                if (populationCategory == 'other') {
                    populationCategory = getOtherCategory(2);
                }
                currentAbstracts = currentAbstracts.concat(groupAbstracts[populationCategory]);
            });
            if(currentAbstracts) {
                groupAbstracts = groupFacetAbstracts(currentAbstracts);
            }
        }
        return {groupAbstracts, currentAbstracts};
    }

    function loadAbstracts() {
        if ($('#mf-abstracts-home').length == 0) {
            return;
        }
        let requestBody = { "firstresult": 1, "q": "", "filters": [{ "contentcategory": "page" }], "autocorrect": "true", "searchtype": "sitesearch", "sort": [] };
        let requestHeader = {};
        let headers = document.querySelectorAll('[type="hidden"][data-header="true"]');
        headers.forEach(function (header) {
            requestHeader[header.name] = header.value;
        });
        let apiOrigin = $('[data-esl-endpoint]').attr('data-esl-endpoint');
        let apiUrl = apiOrigin + '/api/public/search/sitesearch';
        fetch(apiUrl, {
            method: "post",
            headers: requestHeader,
            body: JSON.stringify(requestBody),
        })
            .then(function (resp) { return resp.json(); })
            .then(function (data) {
                if (!data || !data.response || !data.response.results) {
                    return;
                }
                let facetAbstracts = data.response.results.filter(function (result) {
                    return !!result.categorytagfacets;
                });
                facets = groupFacetAbstracts(facetAbstracts);

                containers.forEach(function (containerId, ind) {
                    loadFacetCount(facets, containerId, ind);
                });
                $('#med-affair-header .cmp-text p').attr('data-abstracts', facetAbstracts.length);
            });
    }

    function removeDuplicateAbstracts(abstracts) {
        let totalAbstracts = [];
        abstracts.forEach(function (abstract) {
            let hasAbstract = totalAbstracts.find(function (tAbstract) { return tAbstract.permanentid == abstract.permanentid });
            if (!hasAbstract) {
                totalAbstracts.push(abstract);
            }
        });
        return totalAbstracts;
    }

    function groupFacetAbstracts(abstracts) {
        if (!abstracts) {
            return {};
        }
        abstracts = removeDuplicateAbstracts(abstracts);
        let facetGroup = {};
        abstracts.forEach(function (abstract) {
            if (!abstract.categorytagfacets) {
                return;
            }
            abstract.categorytagfacets.forEach(function (category) {
                let categoryKey = category.toLowerCase().trim();
                facetGroup[categoryKey] = facetGroup[categoryKey] || [];
                facetGroup[categoryKey].push(abstract);
            });
        });
        return facetGroup;
    }

    function loadFacetCount(facetAbstracts, containerId, ind) {
        let totalAbstracts = [];
        $(containerId).find('.a-tile.a-tile--xsmall .a-tile__link p').each(function () {
            let currentCategory = $(this).text().toLowerCase().trim();
            if (currentCategory == 'other') {
                currentCategory = getOtherCategory(ind);
            }
            let currentFacets = facetAbstracts[currentCategory] || [];
            $(this).closest('.a-tile__title').attr('data-abstracts-count', currentFacets.length);
            $(this).closest('.a-tile__link').data('abstracts', currentFacets);
            $(this).closest('.a-tile__link').removeClass('non-selectable');
            currentFacets.forEach(function (abstract) {
                let hasAbstract = totalAbstracts.find(function (tAbstract) { return tAbstract.permanentid == abstract.permanentid });
                if (!hasAbstract) {
                    totalAbstracts.push(abstract);
                }
            });
            if (currentFacets.length == 0) {
                $(this).closest('.a-tile__link').addClass('non-selectable');
            }
        });
        $(containerId).find('.text').attr('data-abstracts-count', totalAbstracts.length);
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
})(jQuery);
