
$(document).on('click', '#productCategoriesWrapperManuals .seach_category_url, #productFavoritesWrapper .seach_category_url, #productSearchWrapperManuals .seach_category_url', async function (e) {
    setTimeout(async() => {
    if ($('#subCategoriesListContainer').find('.active a span').attr('data-id')) {
        sessionStorage.setItem('activeSubcategory', $('#subCategoriesListContainer').find('.active a span').attr('data-id'))
    }
    sessionStorage.setItem('isHomePageEnable', $(this).find('.search_category_title').attr('prodId'));
    e.preventDefault();
    const $productrevnumber = $(this).closest('.search_token').find('.search_token_date').attr('productrevnumber');
    const $versionid = $(this).find('.search_category_title').attr('versionid');
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
    const $data = {
        'id': $(this).find('.search_category_title').attr('prodId'),
        'previousversions':$(this).find('.prev-versions-hide').text(),
        'productname': $(this).find('.search_category_title').text(),
        'title': $(this).closest('.search_token_details').find('.search_category_desc').text(),
        'clickableuri': $(this).attr('clickableuri'),
        'language': $search.getLocalStorage('curr-lang') ? $search.getLocalStorage('curr-lang') : "English",
        'country': $search.getLocalStorage('selectedCountry'),
        'isHcp': $search.getLocalStorage('isHCP'),
        'role': $(this).attr('data-role'),
        'category': $(this).closest('.search_token_details').find('.search_category_head').text(),
        'subcategory': $(this).closest('.sub_categories_product_list').find('.sub_category_title').text(),
        'permanentid': $(this).find('.search_category_title').attr('prodId'),
        'documentpartnumber': $(this).closest('.search_token').attr('data-prtnbr'),
        'ontime': $(this).closest('.search_token').find('.search_token_date').attr('ontime'),
        'productrevnumber': $productrevnumber,
        'versionid': $versionid,
        'effectivebegindate': $(this).closest('.search_token').find('.search_token_date').text(),
        'relatedresource': $(this).closest('.search_token_details').find('.search_category_desc').attr('relatedresource'),
        'sapproductdescriptionlist': $(this).closest('.search_token').find('.search_category_desc .search_category_desc-hide').html(),
        'sapproductmodelnumberlist': $(this).closest('.search_token').find('.search_category_model .search_category_desc-hide').html(),
         'url': $(this).closest('.search_token').find('.seach_category_url').attr('clickableuri'),
         'revisiontype': $(this).closest('.search_token').find('.revision .revision-type').text()

    }
    const $previousVersions = $searchManuals.getPdfPreviousVersions($versionid, $data, $products);
    $data.previousVersions=$previousVersions;
    $search.setRecentlyViewed($data);
    $search.setRecentlyViewedItems();
    $pdfViewer.setLastPdfOpened($data);
    $(this).attr('id', $(this).find('.search_category_title').attr('prodId'))
    let details_url = $globals.detailsPageDefault ? $globals.detailsPageDefault : decodeURIComponent($data.clickableuri);
    if (details_url) {
        $pdfViewer.setLastPdfOpened($data);
        //redirect to details page
        if (details_url.indexOf('.html') == -1 && details_url.indexOf('.pdf') == -1) {
            details_url = details_url + '.html';
        }
        window.open(details_url, '_self');
    }
},0);
});

$(document).on('click', '#productCategoriesWrapperManuals .search_token_icon_link.add-token,  #productFavoritesWrapper .search_token_icon_link.add-token, #productSearchWrapperManuals .search_token_icon_link.add-token',async function (e) {
    setTimeout(async () => {
        e.preventDefault();
        const $token = $(this).closest('.search_token');
        const $tokenManuals = $(this).closest('.sub_categories_product_list');
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
        const $productrevnumber = $token.find('.search_token_date').attr('productrevnumber');
        const $versionid = $token.find('.search_token_date').attr('versionid');
        const $previousVersions = $search.getPdfPreviousVersions($versionid, $productrevnumber, $products);
        const $data = {
            'productname': $token.find('.search_category_title').text(),
            'title': $token.find('.search_category_desc').text(),
            'clickableuri': $token.find('.seach_category_url').attr('clickableuri'),
            'category': $token.find('.search_category_head').text(),
            'ontime': $token.find('.search_token_date').attr('ontime'),
            'effectivebegindate': $token.find('.search_token_date').text(),
            'subcategory': $tokenManuals.find('.sub_category_title').text(),
            'prtnbr': $token.attr('data-prtnbr'),
            'permanentid': $token.find('.search_category_title').attr('prodId'),
            'productrevnumber': $productrevnumber,
            'versionid': $versionid,
            'country': $token.find('.search_token_date').attr('country'),
            'language': $token.find('.search_token_date').attr('language'),
            'isHcp': $token.find('.search_token_date').attr('isHcp'),
            'role': $token.find('.search_token_date').attr('role'),
            'relatedresource': $token.find('.search_category_desc').attr('relatedresource'),
            'previousVersions': $previousVersions,
            'sapproductdescriptionlist': $(this).closest('.search_token').find('.search_category_desc .search_category_desc-hide').html(),
        'sapproductmodelnumberlist': $(this).closest('.search_token').find('.search_category_model .search_category_desc-hide').html(),
             'url': $(this).closest('.search_token').find('.seach_category_url').attr('clickableuri'),
             'revisiontype': $(this).closest('.search_token').find('.revision .revision-type').text()
        }
        if($searchManuals.checkIfSearchPage()){
$data.subcategory=$token.find('.seach_category_url').attr('data-category');
        }

        const favoriteIcon = $('#favoriteProduct').length && $('#favoriteProduct').find('em').length ?
            $('#favoriteProduct').find('em').attr('class') : 'abt-icon abt-icon-heart abt-icon-only';
        const addedFavoriteProduct = $('#addedFavouriteProduct').length && $('#addedFavouriteProduct').find('em').length ?
            $('#addedFavouriteProduct').find('em').attr('class') : 'abt-icon abt-icon-heart-fill abt-icon-only';

        if ($(this).hasClass('added-to-fav')) {
            $(this).removeClass('added-to-fav');
            $favorites.removeFavourite($data);
            $(this).find('span.abt-icon').removeClass(addedFavoriteProduct).addClass(favoriteIcon);
        }
        else {
            $(this).addClass('added-to-fav');
            $(this).find('span.abt-icon').removeClass(favoriteIcon).addClass(addedFavoriteProduct);
            $favorites.setFavorites($data);
        }

        //refresh favorites component if clicked from favorite page
        if ($favorites.checkIfFavoritesPage()) {
            $('#categorySearchResults').html('');
            const favoriteProductCategories = $search.getLocalStorage('favoriteProductCategories');
            const favorites = $favorites.getFavorites();
            const searchTokenTemplate = $templates.searchToken(true, true, false, true, true);
            $search.initProductsContainer($globals.noFavoritesText, favoriteProductCategories, favorites, null, null, searchTokenTemplate);
            $search.initiatePagination($favorites.getFavCount());
            $favorites.updateFavoriteCount();
        }
    }
        , 0);
});