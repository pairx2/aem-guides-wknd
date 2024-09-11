$(document).on('keypress', '.m-search-bar__input-field', function (e) {
    setTimeout(() => {
        if (e.which == 13) {
            const $val = $(this).val();
            const redirectUrl = $('#searchRedirectionUrl').attr('data-redirect-url');
            if ($val) {
                $search.$redirectToSearchPage($val, redirectUrl);
            }
        }
    }, 0);

});

$(document).ready(function () {

    if ($searchManuals.checkIfSearchPage()) {
        if ($search.checkIfEditorMode()) {
            $search.initProductsContainer($globals.noSearchResultText);
            $search.setCategoriesFilter();
        }
        else {
            $searchManuals.$callForSearchDetails();
        }
    }

});


const $searchManuals = (function () {

    const getName = function ($item) {
        if (!$item) {
            return {
                name: '',
                id: ''
            };
        }
        const itemDet = $item.split('|');
        return {
            name: itemDet.length > 1 ? itemDet[1] : itemDet[0].trim(),
            id: itemDet.length > 1 ? itemDet[0] : itemDet[0].trim().replace(/\s/g, ''),
        }
    }

    const getLocalStorage = function ($value) {
        if (!$value) {
            return false;
        }
        return localStorage.getItem($value) ? JSON.parse(localStorage.getItem($value)) : '';
    }

    const setLocalStorage = function ($key, $value) {
        if (!$key) {
            return false;
        }
        localStorage.setItem($key, JSON.stringify($value));
        return true;
    }

    const getRecentlyViewed = function () {
        const $recentlyViewedItems = localStorage.getItem('recentlyViewedProducts') ?
            JSON.parse(localStorage.getItem('recentlyViewedProducts')) : [];

        return $recentlyViewedItems;
    }

    const setRecentlyViewed = async function ($data) {
        if (!$data) {
            return false;
        }
        const $recents = getRecentlyViewed();
        let $catData;
		  await getProductCategoryDataFromDB()
		    .then((data) => {
		      // You can use the data here
		      $catData = data;
		    })
		    .catch((error) => {
		      // Handle any errors here
		      console.error(error);
		    });
        const $products = $productCategory.getAllProducts($catData);
        const $previousVersions = $search.getPdfPreviousVersions($data.versionid, $data.productrevnumber, $products);
        let obj = {
            'productname': $data.productname,
            'title': $data.title,
            'clickableuri': $data.clickableuri,
            'language': $data.language,
            'category': $data.category,
            'subcategory': $data.subcategory,
            'permanentid': $data.permanentid,
            'documentpartnumber': $data.documentpartnumber,
            'ontime': $data.ontime,
            'productrevnumber': $data.productrevnumber,
            'country': $search.getLocalStorage('selectedCountry'),
            'isHcp': $search.getLocalStorage('isHCP'),
            'relatedresource': $data.relatedresource,
            'versionid': $data.versionid,
            'previousVersions': $previousVersions,
        }
        let $lastRecent = [];
        $lastRecent.push(obj);
        if ($recents.length) {
            $recents.map((item, index) => {
                if (item.permanentid !== $data.permanentid) {
                    $lastRecent.push(item);
                }
                return true;
            })
        }

        localStorage.setItem('recentlyViewedProducts', JSON.stringify($lastRecent));
        return $lastRecent;
    }

    const checkIfEditorMode = function () {
        const $isPublishMode = (typeof Granite === 'undefined' || typeof Granite.author === 'undefined');
        let $isEditorMode = false;
        if (readCookie('cq-editor-layer') == "Edit" || readCookie('wcmmode') == "edit") {
            $isEditorMode = true;
        }
        const $isAuthor = $isPublishMode ? false : $isEditorMode;
        return $isAuthor;
    }


    const setRecentlyViewedItems = function (limit) {
        const $recents = getRecentlyViewed();
        const $recentlyViewedTemplate = $('#recentlyViewed');
        const $recentlyViewedTile = $recentlyViewedTemplate.find('#recentlyViewedTile').closest('.a-tile');
        let $isRecents = false;
        $($recentlyViewedTile).removeClass('d-none');
        $('.recently__viewed_items').remove();
        if ($recents.length) {
            limit = limit ? limit : $globals.recentlyViewedDefaultLimitCount;
            $recents.map((r, i) => {
                if (r.country == $search.getLocalStorage('selectedCountry')
                    && r.language == $search.getLocalStorage('curr-lang')
                    && r.isHcp == $search.getLocalStorage('isHCP')) {
                    $isRecents = true;
                    if (i < limit) {
                        $($recentlyViewedTile).find('.a-tile__title-text').html('<p>' + r.title + '</p>');
                        $($recentlyViewedTile).find('.a-tile__link').attr('href', 'javascript:;');
                        $($recentlyViewedTile).find('.a-tile__link').attr('clickableuri', decodeURIComponent(r.clickableuri));
                        $($recentlyViewedTile).find('.a-tile__link').attr('productname', r.productname);
                        $($recentlyViewedTile).find('.a-tile__link').attr('title', r.title);
                        $($recentlyViewedTile).find('.a-tile__link').attr('language', r.language);
                        $($recentlyViewedTile).find('.a-tile__link').attr('category', r.category);
                        $($recentlyViewedTile).find('.a-tile__link').attr('subcategory', r.subcategory);
                        $($recentlyViewedTile).find('.a-tile__link').attr('permanentid', r.permanentid);
                        $($recentlyViewedTile).find('.a-tile__link').attr('documentpartnumber', r.documentpartnumber);
                        $($recentlyViewedTile).find('.a-tile__link').attr('ontime', r.ontime);
                        $($recentlyViewedTile).find('.a-tile__link').attr('productrevnumber', r.productrevnumber);
                        $($recentlyViewedTile).find('.a-tile__link').attr('versionid', getName(r.versionid).id);
                        $($recentlyViewedTile).find('.a-tile__link').attr('relatedresource', r.relatedresource);
                        $($recentlyViewedTile).find('#recentlyViewedTile').removeAttr('id');
                        $($recentlyViewedTile).addClass('recently__viewed_items');
                        $($recentlyViewedTile).clone().appendTo($($recentlyViewedTemplate).find('.m-tile-list'));
                    }
                }
                return true;
            })
            if ($isRecents)
                $('#recentlyViewed').css({ 'display': 'block' });
            else
                $('#recentlyViewed').css({ 'display': 'none' });
        }
        else {
            $('#recentlyViewed').css({ 'display': 'none' });
        }
        $($recentlyViewedTile).addClass('d-none');
        $($recentlyViewedTile).find('.a-tile__link').attr('id', 'recentlyViewedTile');
        $($recentlyViewedTile).removeClass('recently__viewed_items');
        $('#showMoreRecentlyViewed').attr('limit', limit);
        if ($recents.length <= limit) {
            $('#showMoreRecentlyViewed').css({ 'display': 'none' });
            $('#showMoreRecentlyViewed').removeAttr('limit');
        }
        else {
            $('#showMoreRecentlyViewed').css({ 'display': 'block' });
        }

        return $recentlyViewedTemplate;
    }

    //set generic category filter
    const setCategoriesFilter = function ($categoryDetails, limit) {
        $('.search_parent_category').remove();
        const $listsParent = $('#subCategoriesListContainer');
        const $listTemplate = $listsParent.find('.linkstack').find('li.a-link');
        if (!$categoryDetails || !$listTemplate) {
            return false;
        }

        const $listsMolecule = $listsParent.find('.linkstack').find('.m-link-stack--content');
        const $subMenuTemplate = $.parseHTML(`<ul class="search_sub_categories d-none"></ul>`);
        const $listAtom = $listTemplate.clone();
        const $subCatAtom = $listAtom.clone();

        limit = $categoryDetails.length < limit ? $categoryDetails.length : (limit ? limit : $globals.categoriesFilterLimitCount);

        if ($categoryDetails && $categoryDetails.categories && $categoryDetails.categories.length) {
            $categoryDetails.categories.map((cat, index) => {
                if (index < limit) {
                    //reset templates
                    $($listAtom).find('ul').remove();
                    $($subMenuTemplate).html('');
                    //prefill parent categories
                    $($listAtom).find('.a-link__text').text(getName(cat.category).name);
                    $($listAtom).find('.a-link__text').attr('href', 'javascript:;');
                    $($listAtom).addClass('search_parent_category');
                    $($listAtom).removeClass('filter_all_categories');
                    $($listAtom).attr('data-filter', getName(cat.category).name);
                    //prefill subcategories
                    if (cat.subCategories && cat.subCategories.length) {
                        cat.subCategories.map(sub => {
                            $($subCatAtom).find('.a-link__text').text(getName(sub.name).name);
                            $($subCatAtom).find('.a-link__text').attr('href', 'javascript:;');
                            $($subCatAtom).removeClass('filter_all_categories');
                            $($subCatAtom).addClass('search_parent_sub_category');
                            $($subCatAtom).attr('data-filter', getName(sub.name).name);
                            $($subCatAtom).clone().appendTo($($subMenuTemplate));
                        })
                    }
                    $($subMenuTemplate).clone().appendTo($($listAtom));
                    $($listAtom).clone().appendTo($($listsMolecule));
                }
                return true;
            })
        }

        $('#showMoreFilters,.showMoreFilters').attr('limit', limit);

        if ($categoryDetails.length <= limit) {
            $('#showMoreFilters,.showMoreFilters').css({ 'display': 'none' });
            $('#showMoreFilters,.showMoreFilters').removeAttr('limit');
        }
    }

    const setFavCategoriesFilter = function ($categoryDetails, limit) {
        $('.search_parent_category').remove();
        const $listsParent = $('#subCategoriesListContainer');
        const $listTemplate = $listsParent.find('.linkstack').find('li.a-link');
        if (!$categoryDetails || !$listTemplate) {
            return false;
        }

        const $listsMolecule = $listsParent.find('.linkstack').find('.m-link-stack--content');
        const $subMenuTemplate = $.parseHTML(`<ul class="search_sub_categories d-none"></ul>`);
        const $listAtom = $listTemplate.clone();
        const $subCatAtom = $listAtom.clone();
        //added to fix other language category in fav page and replaced categoryDetails with updated_categoryDetails
        let $updated_categoryDetails = $categoryDetails.categories.length && $categoryDetails.categories.filter(f => f.subCategories[0].products[0].arry[0].country === $search.getLocalStorage('selectedCountry')
            || f.subCategories[0].products[0].arry.language === $search.getLocalStorage('curr-lang')
            || f.subCategories[0].products[0].arry.isHcp === $search.getLocalStorage('isHCP'));

        $updated_categoryDetails = $updated_categoryDetails.length && $updated_categoryDetails.filter(g => g.subCategories[0].products[0].arry[0].language === $search.getLocalStorage('curr-lang'));

        limit = $updated_categoryDetails && $updated_categoryDetails.length < limit ? $updated_categoryDetails.length : (limit ? limit : $globals.categoriesFilterLimitCount);

        if ($updated_categoryDetails && $updated_categoryDetails.length) {
            const $selectedCountry = $search.getLocalStorage('selectedCountry');
            const $currLang = $search.getLocalStorage('curr-lang');
            const isHcp = $search.getLocalStorage('isHCP');
            $updated_categoryDetails.map((cat, index) => {
                if (cat.country.toLowerCase() == $selectedCountry.toLowerCase() &&
                    cat.isHcp.toLowerCase() == isHcp.toLowerCase() &&
                    cat.language.toLowerCase() == $currLang.toLowerCase()) {
                    if (index < limit) {
                        //reset templates
                        $($listAtom).find('ul').remove();
                        $($subMenuTemplate).html('');
                        //prefill parent categories
                        $($listAtom).find('.a-link__text').text(getName(cat.category).name);
                        $($listAtom).find('.a-link__text').attr('href', 'javascript:;');
                        $($listAtom).addClass('search_parent_category');
                        $($listAtom).attr('data-filter', getName(cat.category).name);
                        //prefill subcategories
                        if (cat.subCategories && cat.subCategories.length) {
                            cat.subCategories.map(sub => {
                                $($subCatAtom).find('.a-link__text').text(getName(sub.name).name);
                                $($subCatAtom).find('.a-link__text').attr('href', 'javascript:;');
                                $($subCatAtom).addClass('search_parent_sub_category');
                                $($subCatAtom).attr('data-filter', getName(sub.name).name);
                                $($subCatAtom).clone().appendTo($($subMenuTemplate));
                            })
                        }
                        $($subMenuTemplate).clone().appendTo($($listAtom));
                        $($listAtom).clone().appendTo($($listsMolecule));
                    }
                }
                return true;
            })
        }

        $('#showMoreFilters,.showMoreFilters').attr('limit', limit);

        if ($updated_categoryDetails && $updated_categoryDetails.length <= limit) {
            $('#showMoreFilters,.showMoreFilters').css({ 'display': 'none' });
            $('#showMoreFilters,.showMoreFilters').removeAttr('limit');
        }
    }

    const dateToYMD = function ($date) {
        if (!$date) {
            return;
        }
        var d = $date.getDate();
        var m = $date.getMonth() + 1; //Month from 0 to 11
        var y = $date.getFullYear();
        return y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    }

    const prefillSearchToken = function ($prodObj, cat, parent, $searchTokenTemplate) {
        const favoriteIcon = $('#favoriteProduct').length && $('#favoriteProduct').find('em').length ?
            $('#favoriteProduct').find('em').attr('class') : 'abt-icon abt-icon-heart abt-icon-only';
        const addedFavoriteProduct = $('#addedFavouriteProduct').length && $('#addedFavouriteProduct').find('em').length ?
            $('#addedFavouriteProduct').find('em').attr('class') : 'abt-icon abt-icon-heart-fill abt-icon-only';

        $prodObj = $prodObj.arry && $prodObj.arry.length ? $prodObj.arry[0] : $prodObj;

        const $isShare = $prodObj.documentpartnumber ? true : false;
        const $isDownload = $prodObj.clickableuri ? true : false;
        let $searchToken = $searchTokenTemplate ? $searchTokenTemplate : $templates.searchToken($isShare, true, true, false, true);
        if ($searchToken.length) {
            $searchToken = $.parseHTML($searchToken);
        }

        if ($searchToken && $prodObj) {
            const selectedCountry = $search.getLocalStorage('selectedCountry');
            const currLang = $search.getLocalStorage('curr-lang');
            const isHcp = $search.getLocalStorage('isHCP');
            const favorite = localStorage.getItem('favoriteProducts') ?
                JSON.parse(localStorage.getItem('favoriteProducts')) : [];
            let obj = favorite.find(o => o.permanentid === getName($prodObj.permanentid).id
                && o.country === selectedCountry
                && o.language === currLang && o.isHcp == isHcp
                && o.versionid == $prodObj.versionid);
            const onTime = $prodObj.ontime ? new Date($prodObj.ontime) : $prodObj.ontime;
            const revNum = $prodObj.productrevnumber ? '|[' + $prodObj.productrevnumber + ']' : '';
            const revTime = dateToYMD(onTime);

            let $newOntime;
            if ($prodObj.effectivebegindate) {
                const $effectivebegindate = $prodObj.effectivebegindate;
                const $displaydate = new Date($effectivebegindate);
                $newOntime = dateToYMD($displaydate);
            }
            else {
                $newOntime = revTime + revNum;
            }

            // $(c_searchToken).find('.sub_category_title').text(subCat);
            if ($('#productSearchWrapperManuals').length) {

                $($searchToken).find('.search_category_head').text(cat ? cat : getName($prodObj.businessunit).name);
            }
            else {
                $($searchToken).find('.search_category_head').text(cat ? cat : getName($prodObj.category).name);
            }
            $($searchToken).find('.search_category_title').text(getName($prodObj.productname).name);
            $($searchToken).find('.search_category_title').attr('prodId', getName($prodObj.permanentid).id);
            $($searchToken).find('.search_category_title').attr('versionid', getName($prodObj.versionid).id);
            $($searchToken).find('.search_category_desc').attr('relatedresource', $prodObj.relatedresource);
            $($searchToken).find('.search_token_date').text(revTime + revNum);
            if (!(window.location.href.indexOf("manuals") != -1 && $('#externalLink').length)) {
                $($searchToken).find('.search_category_desc').text($prodObj.title);
            }

            if (window.location.href.indexOf("manuals") != -1 && $('#externalLink').length) {


                let saplist = $prodObj.sapproductmodelnumberlist ? $prodObj.sapproductdescriptionlist.replace(/\n/g, "<br/>") : "";
                let saplistshort = saplist.slice(0, 50) + '...';
                $($searchToken).find('.search_category_desc .first').html(saplistshort);
                $($searchToken).find('.search_category_desc .search_category_desc-hide').html(saplist);
                if (saplist == "") {
                    $($searchToken).find('.search_category_desc').text($prodObj.title);
                }

                //previous versions cn
                if ($prodObj.previousversions) {
                    $($searchToken).find('.prev-versions-hide').text($prodObj.previousversions);
                }

                //for model number
                let saplistmodel = $prodObj.sapproductmodelnumberlist ? $prodObj.sapproductmodelnumberlist.replace(/\n/g, ",").replace(/\<br\>/g, ",") : "";
                let saplistmodelbr = $prodObj.sapproductmodelnumberlist ? $prodObj.sapproductmodelnumberlist.replace(/\n/g, "<br/>") : "";
                let saplistshortmodel = saplistmodel.slice(0, 50) + '...';
                $($searchToken).find('.search_category_model  .first').html(saplistshortmodel);
                $($searchToken).find('.search_category_model .search_category_desc-hide').html(saplistmodelbr);
                if (saplistmodel == "") {
                    $($searchToken).find('.search_category_model').css("display", "none");
                }
                //for url
                let urlid = $prodObj.url ? $prodObj.url : $prodObj.clickableuri;
                urlid = urlid ? urlid.split("_")[0] : "";
                urlid = urlid.split('/');
                if (urlid) {
                    if ($prodObj.url && $prodObj.url.includes("vascular")) {
                        $($searchToken).find('.eifu-revision').css("display", "none");
                    }
                    else {
                        $($searchToken).find('.eifu-revision').text(urlid.pop());
                    }
                }
                //for revision type

                let revisiontype = $prodObj.revisiontype ? $prodObj.revisiontype : "";

                if ($prodObj.url && $prodObj.url.includes("vascular")) {
                    $($searchToken).find('.revision').css("display", "none");
                }
                else {
                    $($searchToken).find('.revision .revision-type').text(revisiontype);
                }

                $($searchToken).find('.search_token_date').text($newOntime);
            }



            $($searchToken).find('.search_token_date').attr('ontime', $prodObj.ontime);
            $($searchToken).find('.search_token_date').attr('productrevnumber', $prodObj.productrevnumber);
            $($searchToken).find('.search_token_date').attr('versionid', $prodObj.versionid);
            $($searchToken).find('.search_token_subcategory').text(getName($prodObj.subcategory).name);
            $($searchToken).find('.seach_category_url').attr('href', 'javascript:;');
            $($searchToken).find('.seach_category_url').attr('clickableuri', $prodObj.clickableuri);
            $($searchToken).find('.search_token_date').attr('country', $search.getLocalStorage('selectedCountry'));
            $($searchToken).find('.search_token_date').attr('language', $search.getLocalStorage('curr-lang'));
            $($searchToken).find('.search_token_date').attr('isHcp', $search.getLocalStorage('isHCP'));
            $($searchToken).find('.search_token_date').attr('role', $prodObj.role);
            $($searchToken).find('.seach_category_url').attr('data-role', $prodObj.role);
            $($searchToken).find('.seach_category_url').attr('data-productrevnumber', $prodObj.productrevnumber);
            $($searchToken).find('.seach_category_url').attr('data-ontime', $prodObj.ontime);
            $($searchToken).find('.seach_category_url').attr('data-prodname', getName($prodObj.productname).name);
            $($searchToken).find('.seach_category_url').attr('data-country', $search.getLocalStorage('selectedCountry'));
            $($searchToken).find('.seach_category_url').attr('data-doclang', $search.getLocalStorage('curr-lang'));
            $($searchToken).find('.seach_category_url').attr('data-divisionname', $prodObj.divisionname);
            $($searchToken).find('.seach_category_url').attr('data-title', ($prodObj.title));
            $($searchToken).find('.seach_category_url').attr('data-prodlink', $prodObj.clickableuri);
            $($searchToken).find('.seach_category_url').attr('data-subcategory', getName($prodObj.subcategory).name);
            $($searchToken).find('.seach_category_url').attr('data-category', cat ? cat : getName($prodObj.category).name);
            $($searchToken).find('.seach_category_url').attr('id', getName($prodObj.permanentid).id);
            if ($isDownload) {
                const dwnld_url = decodeURIComponent($prodObj.clickableuri);
                const params = dwnld_url.split('/');
                const file_name = params[params.length - 1];
                $($searchToken).find('.seach_category_url').attr('download', file_name);
            }
            if ($isShare) {
                $($searchToken).attr('data-prtnbr', $prodObj.documentpartnumber);
            }
            else {
                $($searchToken).removeAttr('data-prtnbr');
                $($searchToken).find('.token_options .share-token').remove();

            }
            $($searchToken).addClass('sub__categories_search_list');
            if (obj && obj.permanentid) {
                if (obj.country == selectedCountry && obj.language == currLang && obj.isHcp == isHcp) {
                    $($searchToken).find('.add-token').addClass('added-to-fav');
                    $($searchToken).find('.add-token.added-to-fav').find('span.abt-icon').removeClass(favoriteIcon).addClass(addedFavoriteProduct);
                    $($searchToken).find('.seach_category_url').attr('data-fav', 'true');
                }
            }
            else {
                $($searchToken).find('.add-token').removeClass('added-to-fav');
                $($searchToken).find('.add-token').find('span.abt-icon').removeClass(addedFavoriteProduct).addClass(favoriteIcon);
                $($searchToken).find('.seach_category_url').attr('data-fav', 'false');
            }
        }
        if ($prodObj.url && window.location.href.indexOf("manuals") != -1 && !$prodObj.url.includes("vascular")) {

            let allprevversions = JSON.parse(sessionStorage.getItem('allpreviousversions'));
            let curdisflag = false;
            //check whether the document is in previous array list
            allprevversions.map(prev => {
                if ($prodObj.url.includes(prev)) {
                    curdisflag = true;
                }
            })

            let enddateflag = false;
            let currdate = new Date();
            let olddate = $prodObj.effectiveenddate ? $prodObj.effectiveenddate : "";
            olddate = new Date(olddate);
            if (olddate >= currdate || isNaN(olddate)) {
                enddateflag = true;
            }
            if ($prodObj.url && !curdisflag && enddateflag) {
                $($searchToken).clone().appendTo($(parent).find('.iterated_category_tokens'));
            }
        }
        else {
            if ($prodObj.url) {
                $($searchToken).clone().appendTo($(parent).find('.iterated_category_tokens'));
            }
        }
        return $searchToken;
    }

    const checkIfSearchPage = function () {
        const $isProdCatSearchPg = $('#productSearchWrapperManuals').length ? true : false;
        return $isProdCatSearchPg;
    }

    const $setGenericConfigs = function () {
        if (checkIfEditorMode()) {
            //If Author mode show category search
            $('#categorySearch').css({ 'display': 'block' });
            $('#recentlyViewed').css({ 'display': 'block' });
            $('#categorySearchResults').append($globals.warningMsgProductSearchResults);
            $('#productIcons').append($globals.warningMsgProductIcons);
            $('#productIcons').css({ 'display': 'block' });
            $('#showMoreCategories').css({ 'display': 'block' });
            $('#showMoreSubCategories').css({ 'display': 'block' });
            $('#showMoreRecentlyViewed').css({ 'display': 'block' });
            $('#showMoreFilters').css({ 'display': 'block' });
            $('#filterMobile').css({ 'display': 'block' });
            $('#section-detailsMoreOptions').css({ 'display': 'block' });
            $('#contactIconDesktop,#favoriteIconDesktop,#addedFavoriteIconDesktop,#contactTextMobile,#favoriteTextMobile').css({ 'display': 'block' });
            $('#externalLink').css({ 'display': 'block' });
            $('.m-popup[data-target="#externalLink-modal"]').css({ 'display': 'block' });
        }
        else {
            const $filterContainer = $('#subCategoriesListContainer');
            const $filters = $filterContainer.find('.linkstack');
            if ($filters && $filters.length) {
                $filters.find('.js-collapsable-links').removeClass('d-xl-block');
                $filters.find('.js-collapsable-links').removeClass('d-lg-block');
                $filters.find('.js-collapsable-links').addClass('d-none');
                $filters.find('.js-collapsable-links').find('.search_parent_category').addClass('d-none');
                $filters.find('.js-collapsable-links').find('li').eq(0).addClass('active');
                $filters.find('.js-collapsable-links').find('li').eq(0).addClass('filter_all_categories');
                $filters.find('.js-collapsable-links').find('li').eq(0).find('.a-link__text').attr('href', 'javascript:;');
            }
            if ($('.m-search-bar__input-field').length) {
                $('.m-search-bar__input-field').eq(0).focus();
            }
        }
    }

    const $setSearchResultsContainer = function (data, msg, start, end, $searchTokenTemplate, $isFilter) {
        let $prodsFinalArr = [];
        if (data && data.length) {
            let $subCatTemp = $templates.searchResultContainer();
            let $isFav = false;
            $subCatTemp = $($.parseHTML($subCatTemp));
            $('#categorySearchResults').html('');
            if ($searchManuals.checkIfSearchPage() && $isFilter) {
                let country = $search.getName($search.getLocalStorage('selectedCountry')).id;
                let language = $search.getLocalStorage('curr-lang');
                let role = $search.getLocalStorage('isHCP') ? $search.getLocalStorage('isHCP') : 'nhcp';
                country = country ? country.replace(/[^a-zA-Z0-9 ]/g, '').toUpperCase() : 'UNITEDSTATES';
                language = language ? language.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase() : 'english';
                role = role && (role.toUpperCase() === 'Y' || role.toUpperCase() === 'YES' || role.toUpperCase() === 'HCP' || role.toUpperCase() === 'TRUE') ? 'HCP' : 'NHCP';
                const filterText = country + '/' + language + '/' + role;
                const filterTextNhcp = country + '/' + language + '/NHCP';
                let $filteredData = [];
                data.map(ct => {
                    const dummanuals = ct.searchFilterProdName ? ct.searchFilterProdName.split('::') : '';
                    if (dummanuals && dummanuals.length) {
                        let firstproductnamemanuals = dummanuals.shift();
                        let joinname = [];
                        let firstnamearray = [];
                        firstnamearray.push(firstproductnamemanuals);
                        dummanuals.map(sep => {
                            let tagname = sep.split(",") ? sep.split(",")[0] : "";

                            let productnames = sep.substring(sep.indexOf(",") + 1);

                            if (productnames && !(productnames.includes("av:manualseifu"))) {
                                firstnamearray.push(productnames);
                            }

                            if (tagname) {
                                joinname.push(tagname);
                            }
                        })

                        const newprodsetsearch = joinname.map((jointag, i) => {
                            return firstnamearray[i] + "::" + jointag;
                        })

                        if (newprodsetsearch && newprodsetsearch.length) {

                            newprodsetsearch.map(tag => {
                                if (role == 'HCP') {
                                    if ((tag.toLowerCase().includes(filterText.toLowerCase()) ||
                                        tag.toLowerCase().includes(filterTextNhcp.toLowerCase()))) {
                                        ct.productname = (tag.split('::')[0]).replace('=', '/');
                                        ct.versionid = tag.split('::')[1];
                                        let $manuhcpdups = false;
                                        $filteredData.map(dup => {

                                            if (dup.businessunit == ct.businessunit && ct.url == dup.url && ct.productname == dup.productname) {

                                                $manuhcpdups = true;
                                            }
                                        })
                                        if (!$manuhcpdups) {
                                            $filteredData.push(JSON.parse(JSON.stringify(ct)));
                                        }
                                    }
                                } else {
                                    if (tag.toLowerCase().includes(filterText.toLowerCase())) {
                                        ct.productname = (tag.split('::')[0]).replace('=', '/');
                                        ct.versionid = tag.split('::')[1];
                                        let $manuhcpdupsdup = false;
                                        $filteredData.map(dup => {

                                            if (dup.businessunit == ct.businessunit && ct.url == dup.url && ct.productname == dup.productname) {

                                                $manuhcpdupsdup = true;
                                            }
                                        })
                                        if (!$manuhcpdupsdup) {
                                            $filteredData.push(JSON.parse(JSON.stringify(ct)));
                                        }
                                    }
                                }
                                return true;
                            });
                        }
                    }
                });
                if ($filteredData.length) {
                    let manualsdata = [];
                    let vasculardata = [];
                    $filteredData.forEach(item => {
                        if (item.url.includes("vascular")) {
                            vasculardata.push(item);
                        }
                        else {
                            manualsdata.push(item);
                        }
                    })
                    let $dupVersionids = vasculardata.map(e => e.versionid)
                        .map((e, i, final) => final.indexOf(e) !== i && i)
                        .filter(obj => vasculardata[obj])
                        .map(e => vasculardata[e].versionid)
                        .filter((value, index, self) => {
                            return self.indexOf(value) === index;
                        });

                    if ($dupVersionids.length) {
                        $dupVersionids.forEach((id) => {
                            let $dupProdsArr = vasculardata.filter((prod) => prod.versionid == id);
                            $prodsFinalArr.push(getLatestVerProductManuals($dupProdsArr));
                        });
                        vasculardata.forEach((obj) => {
                            let isDupProd = false;
                            $dupVersionids.forEach((id) => {
                                if (obj.versionid == id) {
                                    isDupProd = true;
                                }
                            });
                            if (!isDupProd) {
                                $prodsFinalArr.push(obj);
                            }
                        });
                        $prodsFinalArr = [...$prodsFinalArr, ...manualsdata];
                    } else {

                        $prodsFinalArr = [...manualsdata, ...vasculardata];
                    }
                }
            } else {
                $prodsFinalArr = data;
            }
            const uniqueMap = new Map();
            $prodsFinalArr.forEach((e) => {
              const uniqueKey = `${e.productname}-${e.url.slice(0, -4)}`;
              if (!uniqueMap.has(uniqueKey)) {
                uniqueMap.set(uniqueKey, e);
              }
            });
            
            const uniqueProducts = Array.from(uniqueMap.values());
            
            $prodsFinalArr = uniqueProducts;
            $prodsFinalArr.map((p, i) => {
                if (!start || !end) {
                    if ($favorites.checkIfFavoritesPage()) {
                        if (p.country == $search.getLocalStorage('selectedCountry')
                            && p.language == $search.getLocalStorage('curr-lang')
                            && p.isHcp == $search.getLocalStorage('isHCP')) {
                            $isFav = true;
                            prefillSearchToken(p, null, $subCatTemp, $searchTokenTemplate);
                        }
                    } else {
                        prefillSearchToken(p, null, $subCatTemp, $searchTokenTemplate);
                    }
                }
                else {
                    if ((i + 1) >= start && (i + 1) <= end) {
                        if ($favorites.checkIfFavoritesPage()) {
                            if (p.country == $search.getLocalStorage('selectedCountry')
                                && p.language == $search.getLocalStorage('curr-lang')
                                && p.isHcp == $search.getLocalStorage('isHCP')) {
                                $isFav = true;
                                prefillSearchToken(p, null, $subCatTemp, $searchTokenTemplate);
                            }
                        } else {
                            prefillSearchToken(p, null, $subCatTemp, $searchTokenTemplate);
                        }
                    }
                }
                return true;
            });
            $($subCatTemp).clone().appendTo($('#categorySearchResults'));
            if ($favorites.checkIfFavoritesPage() && !$isFav) {
                const warningMsg = `<p class="no-result text-center">
                                        ${msg}
                                    </p>`;

                $('#categorySearchResults').append(warningMsg);
            }
            return $prodsFinalArr;
        }
        else {
            const warningMsg = `<p class="no-result text-center">
                        ${msg}
                        </p>`;

            $('#categorySearchResults').append(warningMsg);
            return $prodsFinalArr;
        }
    }
    const getLatestVerProductManuals = function ($dupProdsArr) {
        let $latestProdDate;
        let $latestProdObj = {};
        $latestProdDate = $dupProdsArr[0].ontime;
        $dupProdsArr.forEach((obj) => {
            if (new Date(obj.ontime) >= new Date($latestProdDate)) {
                $latestProdDate = obj.ontime;
                $latestProdObj = obj;
            }
        });
        return $latestProdObj;
    }

    const setSearchKeyword = function ($data, $caller) {
        if (!$data || !$('#searchKeywords').length) {
            return false;
        }
        const $keyword = $('#searchKeywords p');
        const $key = $search.getLocalStorage('last-searched');
        let $keyword_msg = '';
        if ($caller == 'searchPage') {
            $keyword_msg = `${$data ? $globals.searchResultsIncludeText + '  ' + $data.length + '  ' + $globals.searchResultsProductsText : null}`;
        } else {
            $keyword_msg = `${$data ? $globals.searchResultsIncludeText + '  ' + $data.length + '  ' + $globals.searchResultsProductsText : null}  
            ${$key ? $globals.searchKeywordsText + ' ' + $key : ''}`;
        }
        $keyword.text($keyword_msg);
    }

    const initProductsContainer = function (emptyMsg, $categories, data, start, end, $searchTokenTemplate, $isFilter) {
        if (!$categories) {
            return false;
        }
        let $result = [];
        if ($searchManuals.checkIfSearchPage()) {
            $result = $setSearchResultsContainer(data, emptyMsg, start, end, $searchTokenTemplate, true);
        } else {
            $result = $setSearchResultsContainer(data, emptyMsg, start, end, $searchTokenTemplate, $isFilter);
        }
        return $result;
    }

    // Cookies
    /* const createCookie = function (name, value, days) {
         let expires = "";
         if (days) {
             var date = new Date();
             date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
             expires = "; expires=" + date.toGMTString();
         }
 
         document.cookie = name + "=" + value + expires + "; path=/";
     }
     */

    const readCookie = function ($name) {
        var $nameEQ = $name + "=";
        var $ca = document.cookie.split(';');
        for (var i = 0; i < $ca.length; i++) {
            var c = $ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf($nameEQ) == 0) return c.substring($nameEQ.length, c.length);
        }
        return null;
    }

    const $getSearchResults = function ($keyword) {
        $keyword = $keyword ? $keyword : getLocalStorage('last-searched') ? getLocalStorage('last-searched') : null;
        if (!$keyword) {
            return false;
        }

        const $url = $globals.productSearchURL;
        let country = $search.getName($search.getLocalStorage('selectedCountry')).id;
        country = $search.getLocalStorage('curr-country-cd');
        country = country ? country.replace(/[^a-zA-Z0-9 ]/g, '').toUpperCase() : 'UNITEDSTATES';
        let language = $search.getLocalStorage('curr-lang');
        language = language ? language.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase() : 'english';
        let role = $search.getLocalStorage('isHCP') ? $search.getLocalStorage('isHCP') : 'NHCP';
        country = country ? country.toUpperCase() : 'UNITEDSTATES';
        language = language ? language.toLowerCase() : 'english';
        role = role && (role.toUpperCase() === 'Y' || role.toUpperCase() === 'YES' || role.toUpperCase() === 'HCP' || role.toUpperCase() === 'TRUE') ? 'HCP' : 'NHCP';
        toggleLoader(true);

        let upperlimit = "";
        let lowerlimit = 1;
        let totalcount = 1;
        let combinedResult = [];
        let limit = 1;

        async function makemultiplesearchcalls() {
            try {
                for (let i = 0; i < limit; i) {
                    let singleresponse = await $.ajax({
                        url: $url,
                        headers: $globalsManuals.eslHeaderTemplate,
                        type: "POST", /* or type:"GET" or type:"PUT" */

                        dataType: "json",
                        data: JSON.stringify({
                            "firstresult": lowerlimit,
                            "q": $keyword,
                            "autocorrect": "false",
                            "numberofresults": upperlimit,
                            "searchtype": "sitesearch",
                            "sort": [],
                            "filters": [
                                {
                                    "tags": country + '/' + language,
                                    "role": role === "NHCP" ? 'NHCP' : ''
                                }
                            ],
                        }),
                    });
                    if (singleresponse.errorCode == 0) {
                        combinedResult.push(...singleresponse.response.results);
                        lowerlimit = upperlimit + lowerlimit;
                        totalcount = singleresponse.response.totalCount;
                        if (combinedResult.length < totalcount) {
                            limit++;

                        }
                        i++;
                    }
                    else {

                        upperlimit = 200;
                    }
                }
                return combinedResult;
            }
            catch (error) {
                console.log("request failed", error);
            }
        }
        makemultiplesearchcalls().then(obj => {
            $('#categorySearchResults').html('');
            const $results = [];
            obj = obj.sort((a, b) => {
                if (a.role < b.role) {
                    return -1;
                }
            });

            let $filterText = country + '/' + language + '/' + role.toLowerCase();

            if (role !== 'nhcp') {

                $filterText = country + '/' + language;
            } else {
                $filterText = country + '/' + language + '/' + role;
            }
            if (obj.length) {
                obj.map(s => {
                    if (s.productname) {
                        const dumsearch = s.productname.split('::');
                        let firstproductnamesearch = dumsearch.shift();

                        let joinnamesearch = [];
                        let firstnamearray = [];
                        firstnamearray.push(firstproductnamesearch);
                        dumsearch.map(sep => {
                            let tagnamesearch = sep.split(",") ? sep.split(",")[0] : "";

                            let productnames = sep.substring(sep.indexOf(",") + 1);

                            if (productnames && !(productnames.includes("av:manualseifu"))) {
                                firstnamearray.push(productnames);
                            }

                            if (tagnamesearch) {
                                joinnamesearch.push(tagnamesearch);
                            }
                        })

                        const newprodsetnames = joinnamesearch.map((jointag, i) => {
                            return firstnamearray[i] + "::" + jointag;
                        })

                        newprodsetnames.map(tag => {
                            if (tag.toLowerCase().includes($filterText.toLowerCase())) {

                                s.productname = tag;
                                const newObj = $productCategoryManuals.getCategoryFromTags(s, $filterText);
                                if (typeof newObj != "undefined") {
                                    $results.push(newObj);
                                }
                                return true;
                            }
                        })
                    }
                })
            }
            let $filteredResult = $setSearchResultsContainer($results, $globals.noSearchResultText, 1, $globals.searchResultsLimitCount, null, true);
            initiatePagination($filteredResult.length, $globals.searchResultsLimitCount);
            setSearchKeyword($filteredResult, null);
            sessionStorage.setItem('searchResults', JSON.stringify($results));

            toggleLoader();
        }).catch(error => {
            toggleLoader(false);
            throw error;
        })
    }

    //pagination
    const $getPaginationNumbers = function ($totalCount, $limitNumber) {
        if (!$totalCount) {
            return false;
        }
        $limitNumber = $limitNumber ? $limitNumber : $globals.defaultPaginationLimitCount;
        const $totalPages = Math.ceil($totalCount / $limitNumber);
        var pageLists = [];
        var cnt = 0;
        var start = 0;

        while (cnt !== $totalPages) {
            var d = {};
            d.page = cnt + 1;
            d.start = parseInt(start) + 1;
            d.end = parseInt(start) + parseInt($limitNumber) > $totalCount ? $totalCount : parseInt(start) + parseInt($limitNumber);
            pageLists.push(d);
            cnt++;
            start = parseInt(start) + parseInt($limitNumber);
        }

        return {
            'pageCount': $totalPages,
            'pageLists': pageLists
        }
    }

    const initiatePagination = function ($totalResults, $limit) {
        const $parentContainer = $('#pagination');
        if (!$parentContainer.length || !$totalResults) {
            $parentContainer.addClass('d-none');
            return false;
        }
        $limit = $limit ? $limit : $globals.defaultPaginationLimitCount;
        $('.pagination-link_added').remove();
        const $paginationLink = $parentContainer.find('#paginationLink').closest('.link');
        $paginationLink.addClass('pagination-link');
        $paginationLink.find('.a-link__text').attr('href', 'javascript:;');
        let $el = $paginationLink.clone();
        const $pages = $getPaginationNumbers($totalResults, $limit);
        $paginationLink.find('.a-link__inner-text').text('1');
        $paginationLink.attr('start', 1);
        $paginationLink.attr('end', $limit);
        $paginationLink.attr('page', 1);
        $paginationLink.addClass('active');
        if ($pages.pageLists.length > 1) {
            $parentContainer.removeClass('d-none');
            $pages.pageLists.map((p, i) => {
                if (i > 0) {
                    $el.find('.a-link__inner-text').text(p.page);
                    $el.attr('start', p.start);
                    $el.attr('end', p.end);
                    $el.attr('page', p.page);
                    $el.find('.a-link__text').attr('id', "paginationLink-" + p.page);
                    $el.removeClass('active');
                    $el.addClass('pagination-link_added');
                    if (p.page == '2') {
                        $($el).clone().insertAfter($paginationLink);
                    }
                    else {
                        const idBefore = 'paginationLink-' + (p.page - 1);
                        const temp = $parentContainer.find('#' + idBefore).closest('.link');
                        $($el).clone().insertAfter(temp);
                    }
                }
                return true;
            })
        }
        else {
            $parentContainer.addClass('d-none');
        }
        if ($totalResults > 0 && $favorites.checkIfFavoritesPage()) {
            $parentContainer.removeClass('d-none');
        }
    }

    const filterResults = function ($data, $type, name, $getParentCategoryName) {
        if (!$data) {
            return false;
        }
        const $filtered = [];
        $data.length && $data.map((cat) => {
            if ($type === 'businessunit') {
                if (cat.businessunit === name || getName(cat.businessunit).name === name) {
                    $filtered.push(cat);
                }
            }
            if ($type === 'category') {
                if ((cat.category === name || getName(cat.category).name === name) && cat.businessunit === $getParentCategoryName) {
                    $filtered.push(cat);
                }
            }
            return true;
        })
        return $filtered;
    }

    const $callForSearchDetails = async function () {
        let $prodCat;
		  await getProductCategoryDataFromDB()
		    .then((data) => {
		      // You can use the data here
		      $prodCat = data;
		    })
		    .catch((error) => {
		      // Handle any errors here
		      console.error(error);
		    });
        //call for ajax with keyword as local storage value
        $getSearchResults();
        $searchManuals.setCategoriesFilter($prodCat, $globals.categoriesFilterLimitCount);
    }

    const toggleLoader = function ($toggle) {
        let $loader = $('#eifuLoader');
        const $isLoaderPresent = $loader.length;
        if ($isLoaderPresent) {
            if (!$toggle) {
                $('#eifuLoader').addClass('d-none');
            }
            else {
                $('#eifuLoader').removeClass('d-none');
            }
        }
        else {
            if ($toggle) {
                $loader = $.parseHTML($templates.eifuLoader());
                $('body').append($loader);
            }
        }
    }

    const getPdfPreviousVersions = function ($currVer, $currRev, $data) {


        if (!$data || !$currVer) {
            return false;
        }
        if ($currRev.url.includes("vascular")) {
            const $versions = [];
            $data && $data.length && $data.map(v => {
                if (v.versionid && $currVer.trim() === v.versionid.trim() && v.url.includes("vascular")) {
                    $versions.push(v);
                }
                return true;
            });
            return $versions;
        }
        else {
            let $versions = [];
            let prevversionobjects = JSON.parse(sessionStorage.getItem("allpreviousversionsobjects"));
            findpreviouschain($currRev);
            function findpreviouschain($currRevch) {
                if ($currRevch.previousversions) {
                    let cnprevarry = $currRevch.previousversions.split("\n");
                    cnprevarry.map(cnprevitem => {
                        prevversionobjects && prevversionobjects.length && prevversionobjects.map(eachres => {
                            if (eachres.url.includes(cnprevitem)) {
                                $versions.push(eachres);

                                findpreviouschain(eachres);
                            }

                        })
                    })
                }
            }

            $versions = $versions.filter((value, index, self) =>
                index === self.findIndex((t) => (t.url === value.url))
            )
            return $versions;
        }
    }

    const $removeWhiteSpaceUnderSearchTB = function () {
        if ($(".m-search-bar__autocomplete-item").length == 1) {
            if ($(".m-search-bar__autocomplete-item").html().trim() === '') {
                $(".m-search-bar__autocomplete-item").remove();
            }
        }
    }

    const $checkIfContactUsPage = function () {
        const $isContactUsPage = $('#section_contactUsBanner').length ? true : false;
        return $isContactUsPage;
    }

    return {
        getName: getName,
        getLocalStorage: getLocalStorage,
        setLocalStorage: setLocalStorage,
        getRecentlyViewed: getRecentlyViewed,
        setRecentlyViewed: setRecentlyViewed,
        checkIfEditorMode: checkIfEditorMode,
        setRecentlyViewedItems: setRecentlyViewedItems,
        setCategoriesFilter: setCategoriesFilter,
        initProductsContainer: initProductsContainer,
        checkIfSearchPage: checkIfSearchPage,
        prefillSearchToken: prefillSearchToken,
        $setGenericConfigs: $setGenericConfigs,
        $getPaginationNumbers: $getPaginationNumbers,
        initiatePagination: initiatePagination,
        filterResults: filterResults,
        setSearchKeyword: setSearchKeyword,
        $callForSearchDetails: $callForSearchDetails,
        toggleLoader: toggleLoader,
        getPdfPreviousVersions: getPdfPreviousVersions,
        dateToYMD: dateToYMD,
        readCookie: readCookie,
        $removeWhiteSpaceUnderSearchTB: $removeWhiteSpaceUnderSearchTB,
        setFavCategoriesFilter: setFavCategoriesFilter,
        $checkIfContactUsPage: $checkIfContactUsPage
    }
})();

$(document).on('click', '#subCategoriesListContainer .a-link__text, .mobile_filters .a-link__text', async function (e) {
    setTimeout(async () => {

        e.preventDefault();
        const $parent = $(this).closest('.a-link');
        const $getParentCategoryName = $($parent).parent().parent().attr('data-filter');
        if (!$parent) {
            return false;
        }
        const $filter = $parent.attr('data-filter');
        let $productCategories;
		    await getProductCategoryDataFromDB()
		      .then((data) => {
		        // You can use the data here
		        $productCategories = data;
		      })
		      .catch((error) => {
		        // Handle any errors here
		        console.error(error);
		      });
        if ($parent.hasClass('search_parent_category')) {
            $('.search_sub_categories').addClass('d-none');
            $('.search_parent_category').removeClass('active');
            $('.search_parent_sub_category').removeClass('active');
            $parent.find('.search_sub_categories').removeClass('d-none');
            $('.filter_all_categories').removeClass('active');

            if ($favorites.checkIfFavoritesPage()) {
                $favorites.getFavorites();
            }

            else {
                const search = JSON.parse(sessionStorage.getItem('searchResults'));

                const $filterCat_s = $searchManuals.filterResults(search, 'businessunit', $filter, $getParentCategoryName);
                $search.setLocalStorage("filteredResults", $filterCat_s);
                $('#categorySearchResults').html('');
                let $filteredResult = $searchManuals.initProductsContainer($globals.noSearchResultText, $productCategories, $filterCat_s, 1, $globals.searchResultsLimitCount);
                if ($searchManuals.checkIfSearchPage()) {
                    $search.initiatePagination($filteredResult.length, $globals.searchResultsLimitCount);
                    $search.setSearchKeyword($filteredResult, 'searchPage');
                } else {
                    $search.initiatePagination($filterCat_s.length, $globals.searchResultsLimitCount);
                    $search.setSearchKeyword($filterCat_s, null);
                }
            }
        }
        else if ($parent.hasClass('search_parent_sub_category')) {
            $('.search_parent_sub_category').removeClass('active');
            $parent.closest('.search_parent_category').addClass('active');
            if ($favorites.checkIfFavoritesPage()) {
                $favorites.getFavorites();
            }
            else {
                const search = JSON.parse(sessionStorage.getItem('searchResults'));

                const $filterSCat_s = $searchManuals.filterResults(search, 'category', $filter, $getParentCategoryName);
                $search.setLocalStorage("filteredResults", $filterSCat_s);
                $('#categorySearchResults').html('');
                let $filteredResult = $searchManuals.initProductsContainer($globals.noSearchResultText, $productCategories, $filterSCat_s, 1, $globals.searchResultsLimitCount);
                if ($searchManuals.checkIfSearchPage()) {
                    $search.initiatePagination($filteredResult.length, $globals.searchResultsLimitCount);
                    $search.setSearchKeyword($filteredResult, 'searchPage');
                } else {
                    $search.initiatePagination($filterSCat_s.length, $globals.searchResultsLimitCount);
                    $search.setSearchKeyword($filterSCat_s, null);
                }
            }
        }
        else {
            $('.search_sub_categories').addClass('d-none');
            $('.search_parent_category').removeClass('active');
            $('.search_parent_sub_category').removeClass('active');
        }
        $parent.addClass('active');

    }, 0);
});

$(document).on('click', '.filter_all_categories', async function (e) {
    setTimeout(async() => {
        e.preventDefault();
        $('.search_parent_category').removeClass('d-none');
        let $productCategories;
		    await getProductCategoryDataFromDB()
		      .then((data) => {
		        // You can use the data here
		        $productCategories = data;
		      })
		      .catch((error) => {
		        // Handle any errors here
		        console.error(error);
		      });
        const $favoriteProductCategories = $search.getLocalStorage('favoriteProductCategories');
        const $catData = $productCategories.categories;
        const $loadedList = $(this).closest('.linkstack').find('.search_parent_category').length;
        const selectedCountry = $search.getLocalStorage('selectedCountry');
        const currLang = $search.getLocalStorage('curr-lang');
        const isHcp = $search.getLocalStorage('isHCP');
        if ($favorites.checkIfFavoritesPage()) {
            let favoriteProductCategoriesCount = $favoriteProductCategories.categories.filter(cat => {
                if (cat.country == selectedCountry
                    && cat.language == currLang
                    && cat.isHcp == isHcp) {
                    return true;
                }
                return false;
            }).length;
            if (favoriteProductCategoriesCount > $globals.favoritesFiltersLimitCount &&
                $loadedList < favoriteProductCategoriesCount) {
                $('#showMoreFilters, .showMoreFilters').css({ 'display': 'block' });
            } else {
                $('#showMoreFilters, .showMoreFilters').css({ 'display': 'none' });
            }
        } else {
            if ($catData && $catData.length > $loadedList) {
                $('#showMoreFilters, .showMoreFilters').css({ 'display': 'block' });
            }
            else {
                $('#showMoreFilters, .showMoreFilters').css({ 'display': 'none' });
            }
        }
        if ($favorites.checkIfFavoritesPage()) {
            $favorites.getFavorites();

        }
        else {
            const search = JSON.parse(sessionStorage.getItem('searchResults'));

            $('#categorySearchResults').html('');
            let $filteredResult = $searchManuals.initProductsContainer($globals.noSearchResultText, $productCategories, search, 1, $globals.searchResultsLimitCount, false);
            if ($searchManuals.checkIfSearchPage()) {
                $search.initiatePagination($filteredResult.length, $globals.searchResultsLimitCount);
                $search.setSearchKeyword($filteredResult, 'searchPage');
            } else {
                $search.initiatePagination(search.length, $globals.searchResultsLimitCount);
                $search.setSearchKeyword(search, null);
            }
        }
    }, 0);
});
$(document).ready(function () {
    setTimeout(() => {
        $search.setGenericConfigs();
    }, 0);
});


$(document).on('click', '.pagination-link a',async function (e) {
    setTimeout(async () => {
        e.preventDefault();
        const $curr = $(this).closest('.pagination-link');
        let $productCategories;
		    await getProductCategoryDataFromDB()
		      .then((data) => {
		        // You can use the data here
		        $productCategories = data;
		      })
		      .catch((error) => {
		        // Handle any errors here
		        console.error(error);
		      });
        const $favoriteProductCategories = $search.getLocalStorage('favoriteProductCategories');
        const searchResults = JSON.parse(sessionStorage.getItem('searchResults'));

        let $filteredResults;
        if ($('.filter_all_categories').hasClass('active')) {
            $filteredResults = searchResults;
        } else {
            $filteredResults = $search.getLocalStorage('filteredResults');
        }
        // search results contains entire array - 
        if ($curr.hasClass('active')) {
            const s = $curr.attr('start');
            const en = $curr.attr('end');
            //If favourites -- pass favorites data or else pass search results
            if ($searchManuals.checkIfSearchPage()) {
                $searchManuals.initProductsContainer($globals.noSearchResultText, $productCategories, $filteredResults, s, en);
            }
            else if ($favorites.checkIfFavoritesPage()) {
                const favorites = $favorites.getFavorites();
                const $searchTokenTemplate = $templates.searchToken(true, true, false, true, true);
                $searchManuals.initProductsContainer($globals.noFavoritesText, $favoriteProductCategories, favorites, s, en, $searchTokenTemplate);
                $favorites.updateFavoriteCount();
            }
            else {
                return false;
            }
        }
    }, 0);
});