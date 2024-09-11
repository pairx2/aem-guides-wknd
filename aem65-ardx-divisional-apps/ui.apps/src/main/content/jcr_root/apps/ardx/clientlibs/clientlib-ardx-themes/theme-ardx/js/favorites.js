const $favorites = (function(){

    const getFavorites = function(){
        const favs = localStorage.getItem('favoriteProducts') ? 
            JSON.parse(localStorage.getItem('favoriteProducts')) : []; 

        return favs;
    }

    const setFavorites = function(data){
        if(!data){
            return false;
        }
        const favs = getFavorites();
        let obj = {
            'productname': data.productname,
            'title': data.title,
            'clickableuri': data.clickableuri,
            'category': data.category,
            'ontime': data.ontime,
            'subcategory': data.subcategory,
            'documentpartnumber': data.prtnbr ? data.prtnbr : data.documentpartnumber,
            'permanentid' : data.permanentid,
            'productrevnumber' : data.productrevnumber,
            'country' : $search.getLocalStorage('selectedCountry'),
            'language' :  $search.getLocalStorage('curr-lang'),
            'isHcp' : $search.getLocalStorage('isHCP'),
            'role' : data.role,
            'relatedresource' : data.relatedresource,
            'versionid' : data.versionid,
            'previousVersions' : data.previousVersions,
        }
        let newFavs = [];
        newFavs.push(obj);
        if(favs.length){
            favs.map((item, index) => {
                if(item.permanentid !== data.permanentid || item.country !== data.country 
                    || item.language !== data.language || item.isHcp !== data.isHcp){
                    newFavs.push(item);
                }
                return true;
            })
        }

        const categoryDetails = $productCategory.setProductCategoryData(newFavs);
        $search.setLocalStorage('favoriteProductCategories', categoryDetails);
        $search.setLocalStorage('favoriteProducts', newFavs);
        return newFavs;
    }

    const removeFavourite = function(data){
        if(!data){
            return false;
        }
        const favs = getFavorites();
        let updated_favs = favs.length && favs.filter(f => f.permanentid !== data.permanentid 
                                                            || f.country !== data.country 
                                                            || f.language !== data.language 
                                                            || f.isHcp !== data.isHcp);
        const categoryDetails = $productCategory.setProductCategoryData(updated_favs);
        $search.setLocalStorage('favoriteProductCategories', categoryDetails);
		localStorage.setItem('favoriteProducts', JSON.stringify(updated_favs));
        return updated_favs;
    }

    const checkIfFavoritesPage = function(){
        const isFavPage = $('#productFavoritesWrapper').length ? true : false;
        return isFavPage;
    }

    const updateFavoriteCount = function(){
        const favs = getFavorites();
        const favs_head = $('#favoritesCount').find('.cmp-title__text');
        favs_head.find('.fav_count').remove();
        const favs_head_text = favs_head.html();
        if(favs && favs.length){
            if($favorites.checkIfFavoritesPage()) {
                favs_head.html(favs_head_text);
            }else {
                favs_head.html(favs_head_text + ' <span class="fav_count">('+favs.length+')</span>');
            }
        }
        else{
            favs_head.html(favs_head_text);
        }
        return favs_head_text;
    }

    const getFavCount = function(){
        let favs = getFavorites();
        let favCount = 0;
        favs.map((fav,i) => {
            if(fav.country == $search.getLocalStorage('selectedCountry') 
                && fav.language == $search.getLocalStorage('curr-lang') 
                    && fav.isHcp == $search.getLocalStorage('isHCP')){
                favCount++;
            }
        });
        return favCount;
    }

    return {
        setFavorites: setFavorites,
        getFavorites: getFavorites,
        removeFavourite: removeFavourite,
        checkIfFavoritesPage: checkIfFavoritesPage,
        updateFavoriteCount: updateFavoriteCount,
        getFavCount: getFavCount
    }
})();

//initialise search onload
$(document).ready(function(){

    if($favorites.checkIfFavoritesPage()){
        if($search.checkIfEditorMode()){
            $search.initProductsContainer($globals.noFavoritesText);
            $search.setFavCategoriesFilter();
        }
        else{
            const selectedCountry = $search.getLocalStorage('selectedCountry');
            const currLang = $search.getLocalStorage('curr-lang');
            const isHcp = $search.getLocalStorage('isHCP');
            let categoryDetails = {};
            let favoriteProductCategories = $search.getLocalStorage('favoriteProductCategories');
            let favorites = $favorites.getFavorites();
            favorites = favorites.filter(f => f.country.toLowerCase() == selectedCountry.toLowerCase() && 
                                f.language.toLowerCase() == currLang.toLowerCase() && 
                                f.isHcp.toLowerCase() == isHcp.toLowerCase());
            const searchTokenTemplate = $templates.searchToken(true, true, false, true, true);
            if(!favoriteProductCategories || !(favoriteProductCategories.categories && favoriteProductCategories.categories.length)){
                categoryDetails = $productCategory.setProductCategoryData(favorites);
                $search.setLocalStorage('favoriteProductCategories', categoryDetails);
                favoriteProductCategories = $search.getLocalStorage('favoriteProductCategories');
            }
            $search.initProductsContainer($globals.noFavoritesText, favoriteProductCategories, favorites, 1, $globals.favoritesPageLimitCount, searchTokenTemplate);
            categoryDetails = $productCategory.setProductCategoryData(favorites);
            $search.setLocalStorage('favoriteProductCategories', categoryDetails);
            $search.setFavCategoriesFilter(categoryDetails, $globals.favoritesFiltersLimitCount);
            $search.initiatePagination($favorites.getFavCount());
            $favorites.updateFavoriteCount();
        }
    }   
    $search.setGenericConfigs();
});

//on click of favorite icon from any place
$(document).on('click', '.search_token_icon_link.add-token', function(e){
    e.preventDefault();
    const token = $(this).closest('.search_token');
    const catData = $search.getLocalStorage('productCategories');
    const products = $productCategory.getAllProducts(catData);
    const productrevnumber =  token.find('.search_token_date').attr('productrevnumber');
    const versionid =  token.find('.search_token_date').attr('versionid');
   	const previousVersions = $search.getPdfPreviousVersions(versionid, productrevnumber , products);
    const data = {
        'productname': token.find('.search_category_title').text(),
        'title': token.find('.search_category_desc').text(),
        'clickableuri': token.find('.seach_category_url').attr('clickableuri'),
        'category': token.find('.search_category_head').text(),
        'ontime': token.find('.search_token_date').attr('ontime'),
        'subcategory' : token.find('.search_token_subcategory').text(),
        'prtnbr': token.attr('data-prtnbr'),
        'permanentid' : token.find('.search_category_title').attr('prodId'),
        'productrevnumber' : productrevnumber,
        'versionid' : versionid,
        'country' : token.find('.search_token_date').attr('country'),
        'language' : token.find('.search_token_date').attr('language'),
        'isHcp' : token.find('.search_token_date').attr('isHcp'),
        'role' : token.find('.search_token_date').attr('role'),
        'relatedresource' : token.find('.search_category_desc').attr('relatedresource'),
        'previousVersions' : previousVersions,
    }
    const favoriteIcon = $('#favoriteProduct').length && $('#favoriteProduct').find('em').length ? 
                $('#favoriteProduct').find('em').attr('class') : 'abt-icon abt-icon-heart abt-icon-only';
    const addedFavoriteProduct = $('#addedFavouriteProduct').length && $('#addedFavouriteProduct').find('em').length ? 
                $('#addedFavouriteProduct').find('em').attr('class') : 'abt-icon abt-icon-heart-fill abt-icon-only';

    if($(this).hasClass('added-to-fav')){
        $(this).removeClass('added-to-fav');
        $favorites.removeFavourite(data);
        $(this).find('span.abt-icon').removeClass(addedFavoriteProduct).addClass(favoriteIcon);
    }
    else{
        $(this).addClass('added-to-fav');
        $(this).find('span.abt-icon').removeClass(favoriteIcon).addClass(addedFavoriteProduct);
        $favorites.setFavorites(data);
    }
    
    //refresh favorites component if clicked from favorite page
    if($favorites.checkIfFavoritesPage()){
        $('#categorySearchResults').html('');
        const favoriteProductCategories = $search.getLocalStorage('favoriteProductCategories');
        const favorites = $favorites.getFavorites();
        const searchTokenTemplate = $templates.searchToken(true, true, false, true, true);
        $search.initProductsContainer($globals.noFavoritesText, favoriteProductCategories, favorites, null, null, searchTokenTemplate);
        $search.initiatePagination($favorites.getFavCount());
        $favorites.updateFavoriteCount();
    }
});

let current_lang = localStorage.getItem("curr-lang");
if(current_lang === '"Korean"' && current_lang != "undefined")
{
    $('#productFavoritesWrapper #categorySearch #filterMobile').addClass('korean_lang_filter_mob');    
}
if(current_lang === '"Chinese"' && current_lang != "undefined")
{
  $('#productFavoritesWrapper #categorySearch #filterMobile').addClass('chines_lang_filter_mob');
  
}