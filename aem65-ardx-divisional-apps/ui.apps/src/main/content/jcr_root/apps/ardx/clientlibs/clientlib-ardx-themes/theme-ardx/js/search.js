const $search = (function(){

    const getName = function(item){
        if(!item){
            return {
                name: '',
                id: ''
            };
        }
        const itemDet = item.split('|');
        return{
            name: itemDet.length>1 ? itemDet[1] : itemDet[0].trim(),
            id: itemDet.length>1 ? itemDet[0] : itemDet[0].trim().replace(/\s/g, ''),
        }
    }

    const getLocalStorage = function(value){
        if(!value){
            return false;
        }
        return localStorage.getItem(value) ? JSON.parse(localStorage.getItem(value)) : '';
    }

    const setLocalStorage = function(key, value){
        if(!key){
            return false;
        }
        localStorage.setItem(key,JSON.stringify(value));
        return true;
    }

    const getRecentlyViewed = function(){
        const recentlyViewedItems = localStorage.getItem('recentlyViewedProducts') ? 
            JSON.parse(localStorage.getItem('recentlyViewedProducts')) : []; 

        return recentlyViewedItems;
    }

    const setRecentlyViewed = function(data){
        if(!data){
            return false;
        }
        const recents = getRecentlyViewed();
        const catData = $search.getLocalStorage('productCategories');
        const products = $productCategory.getAllProducts(catData);
   		const previousVersions = $search.getPdfPreviousVersions(data.versionid, data.productrevnumber , products);
        let obj = {
            'productname': data.productname,
            'title': data.title,
            'clickableuri': data.clickableuri,
            'language': data.language,
            'category': data.category,
            'subcategory': data.subcategory,
            'permanentid': data.permanentid,
            'documentpartnumber': data.documentpartnumber,
            'ontime': data.ontime,
            'productrevnumber': data.productrevnumber,
            'country' : $search.getLocalStorage('selectedCountry'),
            'isHcp' : $search.getLocalStorage('isHCP'),
            'relatedresource' : data.relatedresource,
            'versionid': data.versionid,
            'previousVersions': previousVersions,
        }
        let lastRecent = [];
        lastRecent.push(obj);
        if(recents.length){
            recents.map((item, index) => {
                if(item.permanentid !== data.permanentid){
                    lastRecent.push(item);
                }
                return true;
            })
        }

        localStorage.setItem('recentlyViewedProducts', JSON.stringify(lastRecent));
        return lastRecent;
    }

    const checkIfEditorMode = function(){
        const isPublishMode = (typeof Granite === 'undefined' ||  typeof Granite.author === 'undefined');
        let isEditorMode = false;
        if(readCookie('cq-editor-layer') == "Edit" || readCookie('wcmmode') == "edit") {
                isEditorMode = true; 
        }
        const isAuthor = isPublishMode ? false : isEditorMode;
        return isAuthor ;
    }

    const setRecentlyViewedItems = function(limit){
        const recents = getRecentlyViewed();
        const recentlyViewedTemplate = $('#recentlyViewed');
        const recentlyViewedTile = recentlyViewedTemplate.find('#recentlyViewedTile').closest('.a-tile');
        let isRecents = false;
        $(recentlyViewedTile).removeClass('d-none');
        $('.recently__viewed_items').remove();
        if(recents.length){
            limit = limit ? limit : $globals.recentlyViewedDefaultLimitCount;
            recents.map((r,i) => {
                if(r.country == $search.getLocalStorage('selectedCountry') 
                    && r.language == $search.getLocalStorage('curr-lang') 
                        && r.isHcp == $search.getLocalStorage('isHCP')){
                        isRecents = true;
                        if(i<limit){
                            $(recentlyViewedTile).find('.a-tile__title-text').html('<p>'+r.title+'</p>');
                            $(recentlyViewedTile).find('.a-tile__link').attr('href', 'javascript:;');
                            $(recentlyViewedTile).find('.a-tile__link').attr('clickableuri', decodeURIComponent(r.clickableuri));
                            $(recentlyViewedTile).find('.a-tile__link').attr('productname', r.productname);
                            $(recentlyViewedTile).find('.a-tile__link').attr('title', r.title);
                            $(recentlyViewedTile).find('.a-tile__link').attr('language', r.language);
                            $(recentlyViewedTile).find('.a-tile__link').attr('category', r.category);
                            $(recentlyViewedTile).find('.a-tile__link').attr('subcategory', r.subcategory);
                            $(recentlyViewedTile).find('.a-tile__link').attr('permanentid', r.permanentid);
                            $(recentlyViewedTile).find('.a-tile__link').attr('documentpartnumber', r.documentpartnumber);
                            $(recentlyViewedTile).find('.a-tile__link').attr('ontime', r.ontime);
                            $(recentlyViewedTile).find('.a-tile__link').attr('productrevnumber', r.productrevnumber);
                            $(recentlyViewedTile).find('.a-tile__link').attr('versionid', getName(r.versionid).id);
                            $(recentlyViewedTile).find('.a-tile__link').attr('relatedresource', r.relatedresource);
                            $(recentlyViewedTile).find('#recentlyViewedTile').removeAttr('id');
                            $(recentlyViewedTile).addClass('recently__viewed_items');
                            $(recentlyViewedTile).clone().appendTo($(recentlyViewedTemplate).find('.m-tile-list'));
                        }
                }
                return true;
            })
            if(isRecents)
                $('#recentlyViewed').css({'display': 'block'});
            else
                $('#recentlyViewed').css({'display': 'none'});
        }
        else{
            $('#recentlyViewed').css({'display': 'none'});
        }
        $(recentlyViewedTile).addClass('d-none');
        $(recentlyViewedTile).find('.a-tile__link').attr('id', 'recentlyViewedTile');
        $(recentlyViewedTile).removeClass('recently__viewed_items');
        $('#showMoreRecentlyViewed').attr('limit', limit);
        if(recents.length<=limit){
            $('#showMoreRecentlyViewed').css({'display':'none'});
            $('#showMoreRecentlyViewed').removeAttr('limit');
        }
        else{
            $('#showMoreRecentlyViewed').css({'display':'block'});
        }

        return recentlyViewedTemplate;
    }


    //set generic category filter
    const setCategoriesFilter = function(categoryDetails, limit){
        $('.search_parent_category').remove();
        const listsParent = $('#subCategoriesListContainer');
        const listTemplate = listsParent.find('.linkstack').find('li.a-link');
        if(!categoryDetails || !listTemplate){
            return false;
        }
        
        const listsMolecule = listsParent.find('.linkstack').find('.m-link-stack--content');
        const subMenuTemplate = $.parseHTML(`<ul class="search_sub_categories d-none"></ul>`);
        const listAtom = listTemplate.clone();
        const subCatAtom = listAtom.clone();

        limit = categoryDetails.length<limit ? categoryDetails.length : (limit ? limit : $globals.categoriesFilterLimitCount);

        if(categoryDetails && categoryDetails.categories && categoryDetails.categories.length){
            categoryDetails.categories.map((cat, index) => {
                if(index<limit){
                    //reset templates
                    $(listAtom).find('ul').remove();
                    $(subMenuTemplate).html('');           
                    //prefill parent categories
                    $(listAtom).find('.a-link__text').text(getName(cat.category).name);
                    $(listAtom).find('.a-link__text').attr('href','javascript:;');
                    $(listAtom).addClass('search_parent_category');
                    $(listAtom).attr('data-filter', getName(cat.category).name);
                    //prefill subcategories
                    if(cat.subCategories && cat.subCategories.length){
                        cat.subCategories.map(sub => {
                            $(subCatAtom).find('.a-link__text').text(getName(sub.name).name);
                            $(subCatAtom).find('.a-link__text').attr('href','javascript:;');
                            $(subCatAtom).addClass('search_parent_sub_category');
                            $(subCatAtom).attr('data-filter', getName(sub.name).name);
                            $(subCatAtom).clone().appendTo($(subMenuTemplate));
                        })
                    }
                    $(subMenuTemplate).clone().appendTo($(listAtom));
                    $(listAtom).clone().appendTo($(listsMolecule));
                }   
                return true;            
            })
        }  
        
        $('#showMoreFilters,.showMoreFilters').attr('limit', limit);
        
        if(categoryDetails.length<=limit){
            $('#showMoreFilters,.showMoreFilters').css({'display':'none'});
            $('#showMoreFilters,.showMoreFilters').removeAttr('limit');
        }
    }


    const setFavCategoriesFilter = function(categoryDetails, limit){
        $('.search_parent_category').remove();
        const listsParent = $('#subCategoriesListContainer');
        const listTemplate = listsParent.find('.linkstack').find('li.a-link');
        if(!categoryDetails || !listTemplate){
            return false;
        }
        
        const listsMolecule = listsParent.find('.linkstack').find('.m-link-stack--content');
        const subMenuTemplate = $.parseHTML(`<ul class="search_sub_categories d-none"></ul>`);
        const listAtom = listTemplate.clone();
        const subCatAtom = listAtom.clone();
        //added to fix other language category in fav page and replaced categoryDetails with updated_categoryDetails
        let updated_categoryDetails = categoryDetails.categories.length && categoryDetails.categories.filter(f => f.subCategories[0].products[0].arry[0].country === $search.getLocalStorage('selectedCountry')
                                                            || f.subCategories[0].products[0].arry.language === $search.getLocalStorage('curr-lang') 
                                                            || f.subCategories[0].products[0].arry.isHcp ===  $search.getLocalStorage('isHCP'));

         updated_categoryDetails = updated_categoryDetails.length && updated_categoryDetails.filter(g => g.subCategories[0].products[0].arry[0].language === $search.getLocalStorage('curr-lang'));
        limit = updated_categoryDetails && updated_categoryDetails.length<limit ? updated_categoryDetails.length : (limit ? limit : $globals.categoriesFilterLimitCount);

        if(updated_categoryDetails && updated_categoryDetails.length){
            const selectedCountry = $search.getLocalStorage('selectedCountry');
            const currLang = $search.getLocalStorage('curr-lang');
            const isHcp = $search.getLocalStorage('isHCP');
            updated_categoryDetails.map((cat, index) => {
                if(cat.country.toLowerCase() == selectedCountry.toLowerCase() && 
                    cat.isHcp.toLowerCase() == isHcp.toLowerCase() && 
                    cat.language.toLowerCase() == currLang.toLowerCase()){
                        if(index<limit){
                            //reset templates
                            $(listAtom).find('ul').remove();
                            $(subMenuTemplate).html('');           
                            //prefill parent categories
                            $(listAtom).find('.a-link__text').text(getName(cat.category).name);
                            $(listAtom).find('.a-link__text').attr('href','javascript:;');
                            $(listAtom).addClass('search_parent_category');
                            $(listAtom).attr('data-filter', getName(cat.category).name);
                            //prefill subcategories
                            if(cat.subCategories && cat.subCategories.length){
                                cat.subCategories.map(sub => {
                                    $(subCatAtom).find('.a-link__text').text(getName(sub.name).name);
                                    $(subCatAtom).find('.a-link__text').attr('href','javascript:;');
                                    $(subCatAtom).addClass('search_parent_sub_category');
                                    $(subCatAtom).attr('data-filter', getName(sub.name).name);
                                    $(subCatAtom).clone().appendTo($(subMenuTemplate));
                                })
                            }
                            $(subMenuTemplate).clone().appendTo($(listAtom));
                            $(listAtom).clone().appendTo($(listsMolecule));
                        }  
                } 
                return true;            
            })
        }  
        
        $('#showMoreFilters,.showMoreFilters').attr('limit', limit);
        
        if(updated_categoryDetails && updated_categoryDetails.length<=limit){
            $('#showMoreFilters,.showMoreFilters').css({'display':'none'});
            $('#showMoreFilters,.showMoreFilters').removeAttr('limit');
        }
    }

    const dateToYMD = function(date) {
        if(!date){
            return;
        }
        let d = date.getDate();
        let m = date.getMonth() + 1; //Month from 0 to 11
        let y = date.getFullYear();
        return y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    }

    const prefillSearchToken = function(prodObj, cat, parent, searchTokenTemplate){ 
        const favoriteIcon = $('#favoriteProduct').length && $('#favoriteProduct').find('em').length ? 
                $('#favoriteProduct').find('em').attr('class') : 'abt-icon abt-icon-heart abt-icon-only';
        const addedFavoriteProduct = $('#addedFavouriteProduct').length && $('#addedFavouriteProduct').find('em').length ? 
                $('#addedFavouriteProduct').find('em').attr('class') : 'abt-icon abt-icon-heart-fill abt-icon-only';
        prodObj = prodObj.arry && prodObj.arry.length ? prodObj.arry[0] : prodObj;
        
        const isShare = prodObj.documentpartnumber ? true : false;
        const isDownload = prodObj.clickableuri ? true : false;
        let searchToken = searchTokenTemplate ? searchTokenTemplate : $templates.searchToken(isShare, true, true, false, true);
        if(searchToken.length){
            searchToken = $.parseHTML(searchToken);
        }

        if(searchToken && prodObj){
            const selectedCountry = $search.getLocalStorage('selectedCountry');
            const currLang = $search.getLocalStorage('curr-lang');
            const isHcp = $search.getLocalStorage('isHCP');
            const favorite = localStorage.getItem('favoriteProducts') ? 
                    JSON.parse(localStorage.getItem('favoriteProducts')) : [];
            let obj = favorite.find(o => o.permanentid === getName(prodObj.permanentid).id 
                                            && o.country === selectedCountry 
                                            && o.language === currLang && o.isHcp == isHcp);
            const onTime = prodObj.ontime ? new Date(prodObj.ontime) : prodObj.ontime;
            const revNum = prodObj.productrevnumber ? '|['+prodObj.productrevnumber+']' : '';
            const revTime = dateToYMD(onTime);
            $(searchToken).find('.search_category_head').text(cat ? cat : getName(prodObj.category).name);
            $(searchToken).find('.search_category_title').text(getName(prodObj.productname).name);
            $(searchToken).find('.search_category_title').attr('prodId', getName(prodObj.permanentid).id);
            $(searchToken).find('.search_category_title').attr('versionid', getName(prodObj.versionid).id);
            $(searchToken).find('.search_category_desc').attr('relatedresource', prodObj.relatedresource);
            $(searchToken).find('.search_category_desc').text(prodObj.title);
            $(searchToken).find('.search_token_date').text(revTime+revNum);
            $(searchToken).find('.search_token_date').attr('ontime', prodObj.ontime);
            $(searchToken).find('.search_token_date').attr('productrevnumber', prodObj.productrevnumber);
            $(searchToken).find('.search_token_date').attr('versionid', prodObj.versionid);
            $(searchToken).find('.search_token_date').attr('country', $search.getLocalStorage('selectedCountry'));
            $(searchToken).find('.search_token_date').attr('language', $search.getLocalStorage('curr-lang'));
            $(searchToken).find('.search_token_date').attr('isHcp', $search.getLocalStorage('isHCP'));
            $(searchToken).find('.search_token_date').attr('role', prodObj.role);
            $(searchToken).find('.search_token_subcategory').text(getName(prodObj.subcategory).name);
            $(searchToken).find('.seach_category_url').attr('href', 'javascript:;');
            $(searchToken).find('.seach_category_url').attr('clickableuri', prodObj.clickableuri);
            $(searchToken).find('.seach_category_url').attr('data-versionid', getName(prodObj.versionid).id);
            $(searchToken).find('.seach_category_url').attr('data-role', prodObj.role);
            $(searchToken).find('.seach_category_url').attr('data-productrevnumber', prodObj.productrevnumber);
            $(searchToken).find('.seach_category_url').attr('data-ontime', prodObj.ontime);
            $(searchToken).find('.seach_category_url').attr('data-prodname', getName(prodObj.productname).name);
            $(searchToken).find('.seach_category_url').attr('data-prtnbr', prodObj.documentpartnumber);
            $(searchToken).find('.seach_category_url').attr('data-country', $search.getLocalStorage('selectedCountry'));
            $(searchToken).find('.seach_category_url').attr('data-doclang', $search.getLocalStorage('curr-lang'));
            $(searchToken).find('.seach_category_url').attr('data-divisionname', prodObj.divisionname);
            $(searchToken).find('.seach_category_url').attr('data-brand', prodObj.brand);
            $(searchToken).find('.seach_category_url').attr('data-documenttype', prodObj.documenttype);
            $(searchToken).find('.seach_category_url').attr('data-legalmanufacturer', prodObj.legalmanufacturer);
            $(searchToken).find('.seach_category_url').attr('data-productcode', prodObj.productcode);
            $(searchToken).find('.seach_category_url').attr('data-lot', prodObj.lot);
            $(searchToken).find('.seach_category_url').attr('data-title', (prodObj.title));
            $(searchToken).find('.seach_category_url').attr('data-prodlink', prodObj.clickableuri);
            $(searchToken).find('.seach_category_url').attr('data-subcategory', getName(prodObj.subcategory).name);
            $(searchToken).find('.seach_category_url').attr('data-category', cat ? cat : getName(prodObj.category).name);
            $(searchToken).find('.seach_category_url').attr('id', getName(prodObj.permanentid).id);
            
            
            
            if(isDownload){
                const dwnld_url = decodeURIComponent(prodObj.clickableuri);
                const params = dwnld_url.split('/');
                const file_name = params[params.length - 1];
                $(searchToken).find('.seach_category_url').attr('download', file_name);
            }
            if(isShare){
                $(searchToken).attr('data-prtnbr', prodObj.documentpartnumber);
            }
            else{
                $(searchToken).removeAttr('data-prtnbr');
                $(searchToken).find('.token_options .share-token').remove();

            }
            $(searchToken).addClass('sub__categories_search_list');
            if(obj && obj.permanentid){
                if(obj.country == selectedCountry && obj.language == currLang && obj.isHcp == isHcp){
                    $(searchToken).find('.add-token').addClass('added-to-fav');
                    $(searchToken).find('.add-token.added-to-fav').find('span.abt-icon').removeClass(favoriteIcon).addClass(addedFavoriteProduct);
                    $(searchToken).find('.seach_category_url').attr('data-fav', 'true');
                }
            }
            else{
                $(searchToken).find('.add-token').removeClass('added-to-fav');
                $(searchToken).find('.add-token').find('span.abt-icon').removeClass(addedFavoriteProduct).addClass(favoriteIcon);
                $(searchToken).find('.seach_category_url').attr('data-fav', 'false');
            }
        }
        $(searchToken).clone().appendTo($(parent).find('.iterated_category_tokens'));
        return searchToken;
    }

    const checkIfSearchPage = function(){
        const isProdCatSearchPg = $('#productSearchWrapper').length ? true : false;
        return isProdCatSearchPg;
    }

    const setGenericConfigs = function(){
        if(checkIfEditorMode()){
            //If Author mode show category search
            $('#categorySearch').css({'display':'block'});
            $('#recentlyViewed').css({'display': 'block'});
            $('#categorySearchResults').append($globals.warningMsgProductSearchResults);
            $('#productIcons').append($globals.warningMsgProductIcons);
            $('#productIcons').css({'display':'block'});
            $('#showMoreCategories').css({'display':'block'});
            $('#showMoreSubCategories').css({'display':'block'});
            $('#showMoreRecentlyViewed').css({'display':'block'});
            $('#showMoreFilters').css({'display':'block'});
            $('#filterMobile').css({'display':'block'});
            $('#section-detailsMoreOptions').css({'display':'block'});
            $('#contactIconDesktop,#favoriteIconDesktop,#addedFavoriteIconDesktop,#contactTextMobile,#favoriteTextMobile').css({'display':'block'});
            $('#externalLink').css({'display':'block'});
            $('.m-popup[data-target="#externalLink-modal"]').css({'display':'block'});
        }
        else{
            const filterContainer = $('#subCategoriesListContainer');
            const filters = filterContainer.find('.linkstack');
            if(filters && filters.length){     
                filters.find('.js-collapsable-links').removeClass('d-xl-block');
                filters.find('.js-collapsable-links').removeClass('d-lg-block');
                filters.find('.js-collapsable-links').addClass('d-none');
                filters.find('.js-collapsable-links').find('.search_parent_category').addClass('d-none');
                filters.find('.js-collapsable-links').find('li').eq(0).addClass('active');
                filters.find('.js-collapsable-links').find('li').eq(0).addClass('filter_all_categories');
                filters.find('.js-collapsable-links').find('li').eq(0).find('.a-link__text').attr('href','javascript:;');
            }
            if($('.m-search-bar__input-field').length){
                $('.m-search-bar__input-field').eq(0).focus();
            }
        }
    }

    const setSearchResultsContainer = function (data, msg, start, end, searchTokenTemplate, isFilter) {
        let prodsFinalArr = [];
        if (data && data.length) {
            let subCatTemp = $templates.searchResultContainer();
            let isFav = false;
            subCatTemp = $($.parseHTML(subCatTemp));
            $('#categorySearchResults').html('');
            if ($search.checkIfSearchPage() && isFilter) {
                let dupVersionids = data.map(e => e.versionid)
                    .map((e, i, final) => final.indexOf(e) !== i && i)
                    .filter(obj => data[obj])
                    .map(e => data[e].versionid)
                    .filter((value, index, self) => {
                        return self.indexOf(value) === index;
                    });
                if (dupVersionids.length && dupVersionids[0]) {
                    dupVersionids.forEach((id) => {
                        let dupProdsArr = data.filter((prod) => prod.versionid == id);
                        prodsFinalArr.push(getLatestVerProduct(dupProdsArr));
                    });
                    data.forEach((obj)=> {
                        let isDupProd = false;
                        dupVersionids.forEach((id)=> {
                            if(obj.versionid == id){
                                isDupProd = true;   
                            }
                        });
                        if(!isDupProd){
                            prodsFinalArr.push(obj);
                        }
                    });
                } else {
                    prodsFinalArr = data;
                }
            } else {
                prodsFinalArr = data;
            }
            prodsFinalArr.map((p, i) => {
                if (!start || !end) {
                    if ($favorites.checkIfFavoritesPage()) {
                        if (p.country == $search.getLocalStorage('selectedCountry')
                            && p.language == $search.getLocalStorage('curr-lang')
                            && p.isHcp == $search.getLocalStorage('isHCP')) {
                            isFav = true;
                            prefillSearchToken(p, null, subCatTemp, searchTokenTemplate);
                        }
                    } else {
                        prefillSearchToken(p, null, subCatTemp, searchTokenTemplate);
                    }
                }
                else {
                    if ((i + 1) >= start && (i + 1) <= end) {
                        if ($favorites.checkIfFavoritesPage()) {
                            if (p.country == $search.getLocalStorage('selectedCountry')
                                && p.language == $search.getLocalStorage('curr-lang')
                                && p.isHcp == $search.getLocalStorage('isHCP')) {
                                isFav = true;
                                prefillSearchToken(p, null, subCatTemp, searchTokenTemplate);
                            }
                        } else {
                            prefillSearchToken(p, null, subCatTemp, searchTokenTemplate);
                        }
                    }
                }
                return true;
            });
            $(subCatTemp).clone().appendTo($('#categorySearchResults'));
            if ($favorites.checkIfFavoritesPage() && !isFav) {
                const warningMsg = `<p class="no-result text-center">
                                        ${msg}
                                    </p>`;

                $('#categorySearchResults').append(warningMsg);
            }
            return prodsFinalArr;
        }
        else {
            const warningMsg = `<p class="no-result text-center">
                        ${msg}
                        </p>`;

            $('#categorySearchResults').append(warningMsg);
            return prodsFinalArr;
        }
    }

    const getLatestVerProduct = function(dupProdsArr){
        let latestProdDate;
        let latestProdObj = {};
        latestProdDate = dupProdsArr[0].ontime;
        dupProdsArr.forEach((obj)=>{
            if(new Date(obj.ontime) >= new Date(latestProdDate) ){
                latestProdDate = obj.ontime;
                latestProdObj = obj;
            }
        });
        return latestProdObj;
    }

    const setSearchKeyword = function(data, caller){
        if(!data || !$('#searchKeywords').length){
            return false;
        }
        const keyword = $('#searchKeywords p');
        const key = $search.getLocalStorage('last-searched');
        let keyword_msg = '';
        if (caller == 'searchPage') {
            keyword_msg = `${data? $globals.searchResultsIncludeText+'  '+data.length+'  '+$globals.searchResultsProductsText : null}`;
        } else {
            keyword_msg = `${data? $globals.searchResultsIncludeText+'  '+data.length+'  '+$globals.searchResultsProductsText : null}  
                ${key ? $globals.searchKeywordsText+' '+key : ''}`;
        }
        keyword.text(keyword_msg);
    }

    const initProductsContainer = function(emptyMsg, categories, data, start, end, searchTokenTemplate){
        if(!categories){
            return false;
        }
        let result = [];
        if($search.checkIfSearchPage()){
            result = setSearchResultsContainer(data, emptyMsg, start, end, searchTokenTemplate, true);
        }else{
            result = setSearchResultsContainer(data, emptyMsg, start, end, searchTokenTemplate);
        }
        return result;
    }

    // Cookies
    const createCookie = function(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }               
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    const readCookie = function(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    const eraseCookie = function(name) {
        createCookie(name, "", -1);
    }

    const getSearchResults = function(keyword){
        keyword = keyword ? keyword : getLocalStorage('last-searched') ? getLocalStorage('last-searched') : null;
        if(!keyword){
            return false;
        }

        const url = $globals.productSearchURL;
        let country = $search.getName($search.getLocalStorage('selectedCountry')).id;
        country = country ? country.replace(/[^a-zA-Z0-9 ]/g, '').toUpperCase() : 'UNITEDSTATES';
        let language = $search.getLocalStorage('curr-lang');
        language = language ? language.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase() : 'english';
        let role = $search.getLocalStorage('isHCP') ? $search.getLocalStorage('isHCP') : 'NHCP';
        country = country ? country.toUpperCase() : 'UNITEDSTATES';
        language = language ? language.toLowerCase() : 'english';
        role = role && (role.toUpperCase() === 'Y' || role.toUpperCase() === 'YES' || role.toUpperCase() === 'HCP' || role.toUpperCase() === 'TRUE') ? 'HCP' : 'NHCP';

        toggleLoader(true);
        $.ajax({
            url: url,
            headers: $globals.eslHeaderTemplate,
            type: "POST", /* or type:"GET" or type:"PUT" */
            dataType: "json",
            data: JSON.stringify({
                "firstresult": 1,
                "q": keyword,
                "autocorrect": "true",
                "searchtype": "sitesearch",
                "sort": [],
                "filters": [
                    {
                        "tags": language+'/'+country,
                        "role": role === "NHCP" ? 'NHCP' : ''
                    }
                ],
            }),
            success: function (obj) {
                let results = [];
				obj.response.results = obj.response.results.sort((a, b) => {
 				 	if (a.role < b.role) {
   					 	return -1;
 				 	}
				});
                $('#categorySearchResults').html('');
                if(obj.response.results.length){
                    obj.response.results.map(r => {
                        const newObj = $productCategory.setCategoriesAndSubcategories(r);
                        if(newObj != false){
                            results.push(newObj);
                        }
                        return true;
                    })
                }
                let filteredResult = setSearchResultsContainer(results,$globals.noSearchResultText, 1, $globals.searchResultsLimitCount, null, true);
                initiatePagination(filteredResult.length, $globals.searchResultsLimitCount);
                setSearchKeyword(filteredResult, null);
                setLocalStorage('searchResults', results);
                toggleLoader();
            },
            error: function () {
                console.log("error fetching search data!!");
                toggleLoader(false);
            }
        });
    }

    const redirectToSearchPage = function(keyword, url){
        createCookie('last-search', keyword, 1);
        const key_wrd = getLocalStorage('last-search');    
        setLocalStorage('last-searched', keyword);
        if(checkIfSearchPage()){
            if(key_wrd === keyword){
                return false;
            }
            getSearchResults(keyword);
        }
        else{
            if(url){
                window.location.href = url;
            }
        }  
    }

    //pagination
    const getPaginationNumbers = function(totalCount, limitNumber){
        if(!totalCount){
            return false;
        }
        limitNumber = limitNumber ? limitNumber : $globals.defaultPaginationLimitCount;
        const totalPages = Math.ceil(totalCount / limitNumber);
        let pageLists = [];
        let cnt = 0;
        let start = 0;

        while(cnt !== totalPages){
           let d = {};
           d.page = cnt+1;
           d.start = parseInt(start)+1;
           d.end = parseInt(start)+parseInt(limitNumber)>totalCount ? totalCount : parseInt(start)+parseInt(limitNumber);
           pageLists.push(d);
           cnt++;
           start = parseInt(start)+parseInt(limitNumber);
        }

        return {
            'pageCount': totalPages,
            'pageLists': pageLists
        }
    }

    const initiatePagination = function(totalResults, limit){
        const parentContainer = $('#pagination');
        if(!parentContainer.length || !totalResults){
            parentContainer.addClass('d-none');
            return false;
        }
        limit = limit ? limit : $globals.defaultPaginationLimitCount;
        $('.pagination-link_added').remove();
        const paginationLink = parentContainer.find('#paginationLink').closest('.link');
        paginationLink.addClass('pagination-link');
        paginationLink.find('.a-link__text').attr('href','javascript:;');
        let el = paginationLink.clone();
        const pages = getPaginationNumbers(totalResults, limit);
        paginationLink.find('.a-link__inner-text').text('1');
        paginationLink.attr('start', 1);
        paginationLink.attr('end', limit);
        paginationLink.attr('page', 1);
        paginationLink.addClass('active');
        if(pages.pageLists.length > 1){
            parentContainer.removeClass('d-none');
            pages.pageLists.map((p, i) => {
                if(i>0){
                    el.find('.a-link__inner-text').text(p.page);
                    el.attr('start', p.start);
                    el.attr('end', p.end);
                    el.attr('page', p.page);
                    el.find('.a-link__text').attr('id', "paginationLink-"+p.page);
                    el.removeClass('active');
                    el.addClass('pagination-link_added');
                    if(p.page == '2'){
                        $(el).clone().insertAfter(paginationLink);
                    }
                    else{
                        const idBefore = 'paginationLink-'+(p.page-1);
                        const temp = parentContainer.find('#'+idBefore).closest('.link');
                        $(el).clone().insertAfter(temp);
                    }
                }
                return true;
            })
        }
        else{
            parentContainer.addClass('d-none');
        }
        if(totalResults > 0 && $favorites.checkIfFavoritesPage()){
            parentContainer.removeClass('d-none');
        }
    }

    const filterResults = function(data, type, name){
        if(!data){
            return false;
        }
        const filtered = [];
        data.length && data.map((cat) =>{
            if(type === 'category'){
                if(cat.category === name || getName(cat.category).name === name){
                    filtered.push(cat);
                }
            }
            if(type === 'subcategory'){
                if(cat.subcategory === name || getName(cat.subcategory).name === name){
                    filtered.push(cat);
                }
            }
            return true;
        })
        return filtered;
    }

    const callForSearchDetails = function(){       
        const prodCat = getLocalStorage('productCategories');
        //call for ajax with keyword as local storage value
        getSearchResults();
        $search.setCategoriesFilter(prodCat, $globals.categoriesFilterLimitCount);
    }

    const toggleLoader = function(toggle){
        let loader = $('#eifuLoader');
        const isLoaderPresent = loader.length;
        if(isLoaderPresent){
            if(!toggle){
                $('#eifuLoader').addClass('d-none');
            }
            else{
                $('#eifuLoader').removeClass('d-none');
            }
        }
        else{
            if(toggle){
                loader = $.parseHTML($templates.eifuLoader());
                $('body').append(loader);
            }
        }
    }

    const getPdfPreviousVersions = function(currVer, currRev, data){
        if(!data || !currVer){
            return false;
        }
        const versions = [];
        data && data.length && data.map(v => {
            if(v.versionid && currVer.trim() === v.versionid.trim() && currRev !== data.productrevnumber){
                versions.push(v);
            }
            return true;
        });
        return versions;
    }

    const removeWhiteSpaceUnderSearchTB = function(){
        if($( ".m-search-bar__autocomplete-item" ).length == 1){
            if($( ".m-search-bar__autocomplete-item" ).html().trim() === ''){
                $( ".m-search-bar__autocomplete-item" ).remove();
            }
        }
    }

    const checkIfContactUsPage = function(){
        const isContactUsPage = $('#section_contactUsBanner').length ? true : false;
        return isContactUsPage;
    }

    return{
        getName: getName,
        getLocalStorage: getLocalStorage,
        setLocalStorage: setLocalStorage,
        getRecentlyViewed: getRecentlyViewed,
        setRecentlyViewed: setRecentlyViewed,
        checkIfEditorMode: checkIfEditorMode,
        setRecentlyViewedItems: setRecentlyViewedItems,
        setCategoriesFilter: setCategoriesFilter,
        setFavCategoriesFilter: setFavCategoriesFilter,
        initProductsContainer: initProductsContainer,
        checkIfSearchPage: checkIfSearchPage,
        prefillSearchToken: prefillSearchToken,
        setGenericConfigs: setGenericConfigs,
        redirectToSearchPage: redirectToSearchPage,
        getPaginationNumbers: getPaginationNumbers,
        initiatePagination: initiatePagination,
        filterResults: filterResults,
        setSearchKeyword: setSearchKeyword,
        callForSearchDetails: callForSearchDetails,
        toggleLoader: toggleLoader,
        getPdfPreviousVersions: getPdfPreviousVersions,
        dateToYMD: dateToYMD,
        createCookie: createCookie,
        readCookie: readCookie,
        eraseCookie: eraseCookie,
        removeWhiteSpaceUnderSearchTB: removeWhiteSpaceUnderSearchTB,
        checkIfContactUsPage: checkIfContactUsPage
    }
})();

//initialise search onload
$(document).ready(function(){
    if($search.checkIfSearchPage()){
        if($search.checkIfEditorMode()){
            $search.initProductsContainer($globals.noSearchResultText);
            $search.setCategoriesFilter();
        }
        else{
            $search.callForSearchDetails();
        }
    }   
});

//on click of filter category items
$(document).on('click', '#subCategoriesListContainer .a-link__text, .mobile_filters .a-link__text', function(e){
    e.preventDefault();
    const parent = $(this).closest('.a-link');
    if(!parent){
        return false;
    }
    const filter = parent.attr('data-filter');
    const productCategories = $search.getLocalStorage('productCategories');
    const favoriteProductCategories = $search.getLocalStorage('favoriteProductCategories');
    if(parent.hasClass('search_parent_category')){
        $('.search_sub_categories').addClass('d-none');
        $('.search_parent_category').removeClass('active');
        $('.search_parent_sub_category').removeClass('active');
        parent.find('.search_sub_categories').removeClass('d-none');
        $('.filter_all_categories').removeClass('active');
        
        if($favorites.checkIfFavoritesPage()){
            const fav = $favorites.getFavorites();
            const filterCat = $search.filterResults(fav, 'category', filter);
            const searchTokenTemplate = $templates.searchToken(true, true, false, true, true);
            $('#categorySearchResults').html('');
            $search.initProductsContainer($globals.noFavoritesText, favoriteProductCategories, filterCat, 1, $globals.favoritesPageLimitCount, searchTokenTemplate);
            $search.initiatePagination(filterCat.length, $globals.favoritesPageLimitCount);
        }
        else{
            const search = $search.getLocalStorage('searchResults');
            const filterCat_s = $search.filterResults(search, 'category', filter);
            $('#categorySearchResults').html('');
            let filteredResult = $search.initProductsContainer($globals.noSearchResultText, productCategories, filterCat_s, 1, $globals.searchResultsLimitCount);
            if($search.checkIfSearchPage()){
                $search.initiatePagination(filteredResult.length, $globals.searchResultsLimitCount);
                $search.setSearchKeyword(filteredResult, 'searchPage');
            }else{
                $search.initiatePagination(filterCat_s.length, $globals.searchResultsLimitCount);
                $search.setSearchKeyword(filterCat_s, null);
            }
        }
    }
    else if(parent.hasClass('search_parent_sub_category')){
        $('.search_parent_sub_category').removeClass('active');
        parent.closest('.search_parent_category').addClass('active');
        if($favorites.checkIfFavoritesPage()){
            const fav = $favorites.getFavorites();
            const filterSCat = $search.filterResults(fav, 'subcategory', filter);
            $('#categorySearchResults').html('');
            const searchTokenTemplate = $templates.searchToken(true, true, false, true, true);
            $search.initProductsContainer($globals.noFavoritesText, favoriteProductCategories, filterSCat, 1, $globals.favoritesPageLimitCount, searchTokenTemplate);
            $search.initiatePagination(filterSCat.length, $globals.favoritesPageLimitCount);
        }
        else{
            const search = $search.getLocalStorage('searchResults');
            const filterSCat_s = $search.filterResults(search, 'subcategory', filter);
            $('#categorySearchResults').html('');
            let filteredResult = $search.initProductsContainer($globals.noSearchResultText, productCategories, filterSCat_s, 1, $globals.searchResultsLimitCount);           
            if($search.checkIfSearchPage()){
                $search.initiatePagination(filteredResult.length, $globals.searchResultsLimitCount);
                $search.setSearchKeyword(filteredResult, 'searchPage');
            }else{
                $search.initiatePagination(filterSCat_s.length, $globals.searchResultsLimitCount);
                $search.setSearchKeyword(filterSCat_s, null);
            }
        }
    }
    else{
        $('.search_sub_categories').addClass('d-none');
        $('.search_parent_category').removeClass('active');
        $('.search_parent_sub_category').removeClass('active');
    }
    parent.addClass('active');
    
});

//on click of all categories filter icon
$(document).on('click', '#subCategoriesListContainer .m-link-stack--header .m-link-stack--title, .mobile_filters .m-link-stack--header', function(e){
    e.preventDefault();
    e.stopImmediatePropagation();   
    const parent = $(this).closest('.m-link-stack');
    if(parent.find('.js-collapsable-links').hasClass('d-none')){
        parent.find('.js-collapsable-links').removeClass('d-none');
        parent.closest('.m-link-stack').find('.m-link-stack--header').find('a').css({'transform':'rotate(0deg)'});
    } 
    else{
        parent.find('.js-collapsable-links').addClass('d-none');
        parent.closest('.m-link-stack').find('.m-link-stack--header').find('a').css({'transform':'rotate(270deg)'});
    }
});

$(document).on('click', '#subCategoriesListContainer .m-link-stack--header a, .mobile_filters .m-link-stack--header', function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    const parent = $(this).closest('.m-link-stack');
    if(parent.find('.js-collapsable-links').hasClass('d-none')){
        parent.closest('.m-link-stack').find('.m-link-stack--header').find('a').css({'transform':'rotate(270deg)'});
    }
    else{
        parent.closest('.m-link-stack').find('.m-link-stack--header').find('a').css({'transform':'rotate(0deg)'});
    }    
});

//on click of all categories
$(document).on('click', '.filter_all_categories', function (e) {
    e.preventDefault();
    $('.search_parent_category').removeClass('d-none');
    const productCategories = $search.getLocalStorage('productCategories');
    const favoriteProductCategories = $search.getLocalStorage('favoriteProductCategories');
    const catData = productCategories.categories;
    const loadedList = $(this).closest('.linkstack').find('.search_parent_category').length;
    const selectedCountry = $search.getLocalStorage('selectedCountry');
    const currLang = $search.getLocalStorage('curr-lang');
    const isHcp = $search.getLocalStorage('isHCP');
    if ($favorites.checkIfFavoritesPage()) {
        let favoriteProductCategoriesCount = favoriteProductCategories.categories.filter(cat => {
            if (cat.country == selectedCountry
                && cat.language == currLang
                && cat.isHcp == isHcp) {
                return true;
            }
            return false;
        }).length;
        if (favoriteProductCategoriesCount > $globals.favoritesFiltersLimitCount && 
            loadedList < favoriteProductCategoriesCount) {
            $('#showMoreFilters, .showMoreFilters').css({ 'display': 'block' });
        } else {
            $('#showMoreFilters, .showMoreFilters').css({ 'display': 'none' });
        }
    } else {
        if (catData && catData.length > loadedList) {
            $('#showMoreFilters, .showMoreFilters').css({ 'display': 'block' });
        }
        else {
            $('#showMoreFilters, .showMoreFilters').css({ 'display': 'none' });
        }
    }
    if ($favorites.checkIfFavoritesPage()) {
        let fav = $favorites.getFavorites();
        fav = fav.filter(f => f.country.toLowerCase() == selectedCountry.toLowerCase() && 
                                f.language.toLowerCase() == currLang.toLowerCase() && 
                                f.isHcp.toLowerCase() == isHcp.toLowerCase());
        const searchTokenTemplate = $templates.searchToken(true, true, false, true, true);
        $('#categorySearchResults').html('');
        $search.initProductsContainer($globals.noFavoritesText, favoriteProductCategories, fav, 1, $globals.favoritesPageLimitCount, searchTokenTemplate);
        $search.initiatePagination($favorites.getFavCount(), $globals.favoritesPageLimitCount);
    }
    else {
        const search = $search.getLocalStorage('searchResults');
        $('#categorySearchResults').html('');
        let filteredResult = $search.initProductsContainer($globals.noSearchResultText, productCategories, search, 1, $globals.searchResultsLimitCount);
        if($search.checkIfSearchPage()){
            $search.initiatePagination(filteredResult.length, $globals.searchResultsLimitCount);
            $search.setSearchKeyword(filteredResult, 'searchPage');
        }else{
            $search.initiatePagination(search.length, $globals.searchResultsLimitCount);
            $search.setSearchKeyword(search, null);
        }
    }
});

//on click show more filters
$(document).on('click', '#showMoreFilters, .showMoreFilters', function (e) {
    e.preventDefault();
    const productCategories = $search.getLocalStorage('productCategories');
    const favoriteProductCategories = $search.getLocalStorage('favoriteProductCategories');
    const catData = $favorites.checkIfFavoritesPage() ? favoriteProductCategories : productCategories;
    const limit = $(this).attr('limit');
    const pag = $search.getPaginationNumbers(catData.categories && catData.categories.length, $globals.categoriesFilterLimitCount);
    let new_limit = null;
    if (limit) {
        pag.pageLists.length && pag.pageLists.map((p, i) => {
            if (p.end == limit) {
                if (i + 1 < pag.pageLists.length) {
                    new_limit = pag.pageLists[i + 1].end;
                }
                else {
                    new_limit = pag.pageLists[i].end;
                }
            }
            return true;
        });
        $('#showMoreFilters,.showMoreFilters').attr('limit', new_limit);
        $('.showMoreFilters,.showMoreFilters').attr('limit', new_limit);
        $('.filter_all_categories').removeClass('active');
        $('.filter_all_categories').removeClass('filter_all_categories');
        if ($favorites.checkIfFavoritesPage()) {
            $search.setFavCategoriesFilter(catData, new_limit);
        } else {
            $search.setCategoriesFilter(catData, new_limit);
        }
        if (new_limit === catData.categories.length) {
            $('#showMoreFilters,.showMoreFilters').css({ 'display': 'none' });
        }
        let filterContainer = $('#subCategoriesListContainer');
        if ($('.mobile_filters_list').length && !$('.mobile_filters_list').hasClass('d-none')) {
            filterContainer = $('.mobile_filters_list');
            const filterItems = $('#subCategoriesListContainer').length && $('#subCategoriesListContainer').clone();
            $(filterItems).find('#showMoreFilters').addClass('showMoreFilters').removeAttr('id');
            $(filterContainer).find('.mobile_filters').html('');
            $(filterContainer).find('.mobile_filters').append($(filterItems).html());
            const parent = $(filterContainer).find('.m-link-stack');
            parent.find('.js-collapsable-links').removeClass('d-none');
            parent.find('.m-link-stack--header').find('a').css({ 'transform': 'rotate(0deg)' });

        }
        const filters = filterContainer.find('.linkstack');
        if (filters && filters.length) {
            filters.find('.js-collapsable-links').find('li').eq(0).addClass('filter_all_categories');
            filters.find('.js-collapsable-links').find('li').eq(0).find('.a-link__text').attr('href', 'javascript:;');
        }
    }
});

//filterMobile
$(document).on('click', '#filterMobile', function(e){
    e.preventDefault();
    if(window.innerWidth<768){
        const categorySearch = $('#categorySearch');
        if(categorySearch.find('.mobile_filters_list').length){
            const filter_m = categorySearch.find('.mobile_filters_list');
            if($(filter_m).hasClass('d-none')){
                $(filter_m).removeClass('d-none');
            }
            else{
                $(filter_m).addClass('d-none');
            }
        }
        else{
            const filterTemp = $.parseHTML($templates.mobileFilterContainer($globals.filterHeadingTextMobile));
            const filterItems = $('#subCategoriesListContainer').length && $('#subCategoriesListContainer').clone();
            $(filterItems).find('#showMoreFilters').removeAttr('id').addClass('showMoreFilters');
            $(filterTemp).find('.mobile_filters').html('');
            $(filterTemp).find('.mobile_filters').append($(filterItems).html());
            $(filterTemp).removeClass('d-none');
            categorySearch.append(filterTemp);
        }
    }
    if(window.innerWidth>767 && window.innerWidth<1024){
		$('#subCategoriesLeftNavTitle').append( "<span id ='closefilter' style='float: right; padding-right: 10px; margin-top: -45px; font-size: 35px;'>X</span>" );
        $("#filterMobile").hide();
        const filters = $('#categorySearch .columncontrol .row .col-md-4.col-lg-4.columncontrol__column');
        if(filters.length){
            if(filters.is(':visible')){
                filters.css('display','none');
            }
            else{
                filters.css('display','block');
            }
        } 
    }
    else{
        return false;
    }   
});

//filterMobile
$(document).on('click', '#closefilter', function(e){
    e.preventDefault();
    $("#filterMobile").show();
    $("#closefilter").remove();
    $(".col-12.col-md-4.col-lg-4.columncontrol__column").css("display", "none");
});
$(document).on('click', '.close-filter a', function(e){
    e.preventDefault();
    $(this).closest('.mobile_filters_list').addClass('d-none');
});

//on click of search product urls -- set recently viewed
$(document).on('click', '.seach_category_url', function(e){
    if($('#subCategoriesListContainer').find('.active a span').attr('data-id')) {
        sessionStorage.setItem('activeSubcategory', $('#subCategoriesListContainer').find('.active a span').attr('data-id') )
    }
    sessionStorage.setItem('isHomePageEnable', $(this).find('.search_category_title').attr('prodId'));
    e.preventDefault();
    const productrevnumber =  $(this).closest('.search_token').find('.search_token_date').attr('productrevnumber');
    const versionid = $(this).find('.search_category_title').attr('versionid');
    const catData = $search.getLocalStorage('productCategories');
    const products = $productCategory.getAllProducts(catData);
	const previousVersions = $search.getPdfPreviousVersions(versionid, productrevnumber , products);
    const data = {
        'id':$(this).find('.search_category_title').attr('prodId'),
        'productname': $(this).find('.search_category_title').text(),
        'title': $(this).closest('.search_token_details').find('.search_category_desc').text(),
        'clickableuri': $(this).attr('clickableuri'),
        'language': $search.getLocalStorage('curr-lang') ? $search.getLocalStorage('curr-lang') : "English",
        'country': $search.getLocalStorage('selectedCountry'),
        'isHcp': $search.getLocalStorage('isHCP'),
        'role': $(this).attr('data-role'),
        'category': $(this).closest('.search_token_details').find('.search_category_head').text(),
        'subcategory': $(this).closest('.search_token_details').find('.search_token_subcategory').text(),
        'permanentid': $(this).find('.search_category_title').attr('prodId'),
        'documentpartnumber': $(this).closest('.search_token').attr('data-prtnbr'),
        'ontime': $(this).closest('.search_token').find('.search_token_date').attr('ontime'),
        'productrevnumber': productrevnumber,
        'versionid': versionid,
        'relatedresource': $(this).closest('.search_token_details').find('.search_category_desc').attr('relatedresource'),
        'brand': $(this).attr('data-brand'),
        'legalmanufacturer': $(this).attr('data-legalmanufacturer'),
        'productcode': $(this).attr('data-productcode'),
        'lot': $(this).attr('data-lot'),
        'documenttype': $(this).attr('data-documenttype'),
        'previousVersions': previousVersions,
    }
    $search.setRecentlyViewed(data);
    $search.setRecentlyViewedItems();
    $pdfViewer.setLastPdfOpened(data);
    $(this).attr('id', $(this).find('.search_category_title').attr('prodId'))
    let details_url = $globals.detailsPageDefault ? $globals.detailsPageDefault : decodeURIComponent(data.clickableuri);
    if(details_url){        
        $pdfViewer.setLastPdfOpened(data); 
        //redirect to details page
        if(details_url.indexOf('.html') == -1 && details_url.indexOf('.pdf') == -1){
            details_url = details_url + '.html';
        }
        window.open(details_url,'_self');
    }
});

//on click of recently viewed items
$(document).on('click', '#recentlyViewed .a-tile__link', function(e){
    e.preventDefault();
    const productrevnumber =   $(this).attr('productrevnumber');
    const versionid = $(this).attr('versionid');
    const catData = $search.getLocalStorage('productCategories');
    const products = $productCategory.getAllProducts(catData);
	const previousVersions = $search.getPdfPreviousVersions(versionid, productrevnumber , products);
    const data = {
        'productname': $(this).attr('productname'),
        'title': $(this).attr('title'),
        'clickableuri': $(this).attr('clickableuri'),
        'language': $(this).attr('language'),
        'category': $(this).attr('category'),
        'subcategory': $(this).attr('subcategory'),
        'permanentid': $(this).attr('permanentid'),
        'documentpartnumber': $(this).attr('documentpartnumber'),
        'ontime': $(this).attr('ontime'),
        'productrevnumber':productrevnumber,
        'versionid': versionid,
        'relatedresource': $(this).attr('relatedresource'),
        'previousVersions': previousVersions,
    };
    $pdfViewer.setLastPdfOpened(data);
    let details_url = $globals.detailsPageDefault ? $globals.detailsPageDefault : decodeURIComponent(data.clickableuri);
    if(details_url){
        const target = $(this).attr('target') && $(this).attr('target') == '_blank' ? '_blank' : '_self';
        $pdfViewer.setLastPdfOpened(data); 
        //redirect to details page
        if(details_url.indexOf('.html') == -1 && details_url.indexOf('.pdf') == -1){
            details_url = details_url + '.html';
        }
        window.open(details_url, target);
    }
});

//on select in search suggestion search result page is loading 
const triggerInNewPage = function() {
	const inputFieldValue= $('.m-search-bar__input-field').val();
    const redirectUrl = $('#searchRedirectionUrl').attr('data-redirect-url');
    if(inputFieldValue){
        $search.redirectToSearchPage(inputFieldValue, redirectUrl);
    }
};

//on select in search suggestion search result page is loading
$('.m-search-bar__autocomplete-list').on('click', function(e) {
    e.preventDefault();
    setTimeout(()=>{
		triggerInNewPage();
    });
});
//on click outside search input suggestion should hide
$(document).on('click', function(e){
    $('.m-search-bar__autocomplete').addClass("d-none");
});
    
$('.m-search-bar__close').on('click', function(e){
    $('.m-search-bar__autocomplete').addClass("d-none");
});
// clearing search suggestion start 
$('.m-search-bar__input-field').on('keyup', function() {
    if (this.value.length < 1) {
           $('.m-search-bar__autocomplete').addClass("d-none");
    }else{
           $('.m-search-bar__autocomplete').show();
           $('.m-search-bar__autocomplete').removeClass("d-none");
    } 
});
$(".m-search-bar__input-field").focus(function() {
    if (this.value.length < 1) {         
         $('.m-search-bar__autocomplete').hide();
    } else {
         $('.m-search-bar__autocomplete').show();
    }     
 });
// clearing search suggestion end  
//on pressing key in search input
$(document).on('keypress','.m-search-bar__input-field',function(e) {
    $('.m-search-bar__autocomplete').removeClass("d-none");
    if(e.which == 13) {
        const val = $(this).val();
        const redirectUrl = $('#searchRedirectionUrl').attr('data-redirect-url');
        if(val){
            $search.redirectToSearchPage(val, redirectUrl);
        }
    }
});

//on pressing key enable cross button
$(document).on('keypress','.m-search-bar__input-field',function(e) {
   
    if(e.target.value.length > 0) {
        $('.m-search-bar__close').addClass("show");
    }
    else {
        $('.m-search-bar__close').removeClass("show");
    }
});
//on click of search button
$(document).on('click', '.search-button button', function(e){
    e.preventDefault();
    const val = $('input.m-search-bar__input-field').val();
    const redirectUrl = $('#searchRedirectionUrl').attr('data-redirect-url');
    if(val){
        $search.redirectToSearchPage(val, redirectUrl);
    }
});

//on focus click key in search input
$(document).on('focus click','.m-search-bar__input-field',function(e) {
    $search.removeWhiteSpaceUnderSearchTB();
});

//on click of previous pagination link
$(document).on('click', '#previousPage', function(e){
    e.preventDefault();
    const productCategories = $search.getLocalStorage('productCategories');
    const favoriteProductCategories = $search.getLocalStorage('favoriteProductCategories');
    const searchResults = $search.getLocalStorage('searchResults');
    const parent = $('#pagination');
    if(!parent){
        return false;
    }
    const activeLink = parent.find('.pagination-link.active');
    const p = activeLink.attr('page');
    const links = $('.pagination-link');
    const prev_pg = p-1 > 0 ? p-1 : 1;
    let prev_st = null;
    let prev_end = null;

    if(links.length>1 && p>1){
        $('.pagination-link').removeClass('active');
        $(links).each(function(){
            const pg = $(this).attr('page');
            if(pg == prev_pg){
                prev_st = $(this).attr('start');
                prev_end = $(this).attr('end');
                $(this).addClass('active');
            }
        })
    }

    if(prev_st && prev_end){
        //If favourites -- pass favorites data or else pass search results
        if($search.checkIfSearchPage()){
            $search.initProductsContainer($globals.noSearchResultText, productCategories, searchResults, prev_st, prev_end);
        }
        else if($favorites.checkIfFavoritesPage()){
            const favorites = $favorites.getFavorites();
            const searchTokenTemplate = $templates.searchToken(true, true, false, true, true);
            $search.initProductsContainer($globals.noFavoritesText, favoriteProductCategories, favorites, prev_st, prev_end, searchTokenTemplate);
            $favorites.updateFavoriteCount();
        }
        else{
            return false;
        }
    }
});

//on click of pagination links
$(document).on('click', '.pagination-link a', function(e){
    e.preventDefault();
    const curr = $(this).closest('.pagination-link');
    const productCategories = $search.getLocalStorage('productCategories');
    const favoriteProductCategories = $search.getLocalStorage('favoriteProductCategories');
    const searchResults = $search.getLocalStorage('searchResults');
    if(!curr.hasClass('active')){
        
        $('.pagination-link').removeClass('active');
        curr.addClass('active');
        //If favourites -- pass favorites data or else pass search results
        if($search.checkIfSearchPage()){
            $search.initProductsContainer($globals.noSearchResultText, productCategories, searchResults, curr.attr('start'), curr.attr('end'));
        }
        else if($favorites.checkIfFavoritesPage()){
            const favorites = $favorites.getFavorites();
            
            const searchTokenTemplate = $templates.searchToken(true, true, false, true, true);
            $search.initProductsContainer($globals.noFavoritesText, favoriteProductCategories, favorites, curr.attr('start'), curr.attr('end'), searchTokenTemplate);
            $favorites.updateFavoriteCount();
        }
        else{
            return false;
        }
    }
});

//on click of nextPage pagination link
$(document).on('click', '#nextPage', function(e){
    e.preventDefault();
    const parent = $('#pagination');
    const productCategories = $search.getLocalStorage('productCategories');
    const favoriteProductCategories = $search.getLocalStorage('favoriteProductCategories');
    const searchResults = $search.getLocalStorage('searchResults');
    if(!parent){
        return false;
    }
    const activeLink = parent.find('.pagination-link.active');
    const p = activeLink.attr('page');
    const links = $('.pagination-link');
    const next_pg = parseInt(p)+1 <= links.length ? parseInt(p)+1 : links.length;
    let next_st = null;
    let next_end = null;

    if(links.length>1 && p<=links.length){
        $('.pagination-link').removeClass('active');
        $(links).each(function(){
            const pg = $(this).attr('page');
            if(pg == next_pg){
                next_st = $(this).attr('start');
                next_end = $(this).attr('end');
                $(this).addClass('active');
            }
        })
    }

    if(next_st && next_end){
        //If favourites -- pass favorites data or else pass search results
        if($search.checkIfSearchPage()){
            $search.initProductsContainer($globals.noSearchResultText, productCategories, searchResults, next_st, next_end);
        }
        if($favorites.checkIfFavoritesPage()){
            const favorites = $favorites.getFavorites();
            const searchTokenTemplate = $templates.searchToken(true, true, false, true, true);
            $search.initProductsContainer($globals.noFavoritesText, favoriteProductCategories, favorites, next_st, next_end, searchTokenTemplate);
            $favorites.updateFavoriteCount();
        }
        else{
            return false;
        }
    }
});

//on click of go back button
$(document).on('click', '#goBack', function(e){
    e.preventDefault();
    setTimeout(function(){
        window.history.back();
    },100);
});

//on click of share icon
$(document).on('click', '.share-token', function(e){
    e.preventDefault();
    const token = $(this).closest('.search_token');
    const prtnbr = token.attr('data-prtnbr');
    if(prtnbr){
        const subject = token.find('.search_category_desc').text();
        const langCode = $globals.languagesList[$search.getLocalStorage('curr-lang')] ? 
                $globals.languagesList[$search.getLocalStorage('curr-lang')] : $globals.defaultLanguage;
        
        const body =  location.origin + "/" + langCode + "/index.html?product\x3d" + prtnbr;
        window.open(`mailto:?subject=${encodeURIComponent(subject ? subject : prtnbr)}&body=${encodeURIComponent(body)}`);
    }  
});

//on click of download icon
$(document).on('click', '.download-token', function(e){
    e.preventDefault();
    const token = $(this).closest('.search_token');
    let url = token.find('.seach_category_url').attr('clickableuri');
    url = decodeURIComponent(url);
    const file_name = token.find('.seach_category_url').attr('download');
    // ajax call to download directly
    fetch(url)
    .then(resp => resp.blob())
    .then(blob => {
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = blobUrl;
        // the filename you want
        a.download = decodeURIComponent(file_name);
        document.body.appendChild(a);
        a.click();
        setTimeout(
        function() {
        window.URL.revokeObjectURL(blobUrl);
        console.log('file has downloaded successfully!');
        a.remove();
        }, 2000);
    })
    .catch(() => console.log('downloading failed!! No file found.'));
})

//on click of print icon
$(document).on('click', '.print-token', function (e) {
    e.preventDefault();
    const token = $(this).closest('.search_token');
    let url = token.find('.seach_category_url').attr('clickableuri');
    url = decodeURIComponent(url);
    // ajax call to download directly
    $search.toggleLoader(true)
    fetch(url)
        .then(resp => resp.blob())
        .then(blob => {
            let pdfUrl = URL.createObjectURL(blob);
            printJS({
                printable: pdfUrl,
                onPrintDialogClose: () => $search.toggleLoader(false)
            });
        })
        .catch(() => {
            console.log('downloading failed!! No file found.');
            $search.toggleLoader(false);
        });
});