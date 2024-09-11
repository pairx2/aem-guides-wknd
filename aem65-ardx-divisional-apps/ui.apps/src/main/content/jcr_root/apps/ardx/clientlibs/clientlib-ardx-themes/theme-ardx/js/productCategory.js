const $productCategory = (function () {
    //dynamic containers to be populated
    const prodCategory = $('#productCategories');
    const subCategory = $('#subCategories');
    const subCategoriesList = $('#subCategoriesListContainer');
    //components to be iterated
    const prodCategoryTile = prodCategory.find('#categoryTile').closest('.a-tile');
    const subCategoryTile = subCategory.find('#subCategoryTile').closest('.a-tile');
    const subCategoryLink =  subCategoriesList.find('#subCategoryLink').closest('.link');

    const getCategoryTemplate = function() {
        const isProdCatPresent = prodCategory.length ? true : false;
        if(!isProdCatPresent){
            return false;
        }   
        return prodCategoryTile;
    }

    const getSubCatTemplate = function() {
        const isSubCatPresent = subCategory.length ? true : false;
        if(!isSubCatPresent){
            return false;
        }
        return subCategoryTile;
    }

    const preFillCategoryTile = function(comp, obj, parent) {
        if(comp === 'category'){
            const c = getCategoryTemplate();
            if(c && obj){
                $(c).find('.a-tile__title-text').html('<p>'+$search.getName(obj.category).name+'</p>');
                $(c).find('.a-tile__para').html('<p class="d-none">'+obj.language+'</p>');
                $(c).find('#categoryTile').removeAttr('id');
                $(c).find('.a-tile__link').attr('href', 'javascript:;');
                $(c).attr('data-id', $search.getName(obj.category).id);
                $(c).addClass('search__categories');
            }
            $(c).clone().appendTo($(prodCategory).find('.m-tile-list'));
            return c;
        }
        else if(comp === 'subcategory'){
            const sb = getSubCatTemplate();
            if(sb && obj){
                let subCatName = $search.getName(obj.name).name ? $search.getName(obj.name).name : 'Undefined';
                $(sb).find('.a-tile__title-text').html('<p>'+subCatName+'</p>');
                $(sb).find('.a-tile__para').html('<p>'+$search.getName(obj.catNameVal).name+'</p>');
                $(sb).find('#subCategoryTile').removeAttr('id');
                $(sb).find('.a-tile__link').attr('href', 'javascript:;');
                $(sb).attr('data-id', $search.getName(obj.name).id);
                $(sb).attr('data-parent', $search.getName(parent).name);
                $(sb).addClass('search__subcategories');
            }
            $(sb).clone().appendTo($(subCategory).find('.m-tile-list'));
            return sb;
        }
        else{
            return false;
        }
    }

    const setCategoryContainer = function(productData, limit){
        if(!productData){
            return false;
        }
        prodCategoryTile.removeClass('d-none');
        $('.search__categories').remove();

        const limit_cat = (window.innerWidth < 768) ? ($('#showMoreMobile').length && $('#showMoreMobile').text() ? $('#showMoreMobile').text() : $globals.productCategoryDefaultLimitCount) :
                    ((window.innerWidth > 767 && window.innerWidth < 992) ? ($('#showMoreTablet').length && $('#showMoreTablet').text() ? $('#showMoreTablet').text() : $globals.productCategoryDefaultLimitCount) : 
                        ($('#showMoreDesktop').length && $('#showMoreDesktop').text() ? $('#showMoreDesktop').text() : $globals.productCategoryDefaultLimitCount));

        if(productData.categories && productData.categories.length){
            limit = productData.categories.length<limit ? productData.categories.length : (limit ? limit : limit_cat);
            let isValidCat = true;
            let tempLimit = limit;
            productData.categories.map((cat,index) => {
                if(index<tempLimit && cat.category){
                    isValidCat = preFillCategoryTile('category', cat);
                }
                if(!isValidCat){
                    tempLimit++;
                } 
                return true;             
            });
        }
        prodCategoryTile.addClass('d-none');
        $(prodCategoryTile).find('.a-tile__link').attr('href', 'javascript:;');
        $(prodCategoryTile).removeClass('search__categories');
        $('#showMoreCategories').attr('limit', limit);   
        if(!productData || !productData.categories || !productData.categories.length){
            prodCategoryTile.removeClass('d-none');
            $('#showMoreCategories').css({'display':'none'});
        }    
        else if(productData && productData.categories && productData.categories.length<=limit){
            $('#showMoreCategories').css({'display':'none'});
            $('#showMoreCategories').removeAttr('limit');
        }
        else{
            $('#showMoreCategories').css({'display':'block'});
        }
    }

    const setSubCategoryContainer = function(productData, parent, limit){
        if(!productData){
            return false;
        }
        subCategoryTile.removeClass('d-none');
        $('.search__subcategories').remove();

        const limit_sub_cat = (window.innerWidth < 768) ? ($('#showMoreMobileSub').length && $('#showMoreMobileSub').text() ? $('#showMoreMobileSub').text() : $globals.subCategoryDefaultLimitCount) :
                    ((window.innerWidth > 767 && window.innerWidth < 992) ? ($('#showMoreTabletSub').length && $('#showMoreTabletSub').text() ? $('#showMoreTabletSub').text() : $globals.subCategoryDefaultLimitCount) : 
                        ($('#showMoreDesktopSub').length && $('#showMoreDesktopSub').text() ? $('#showMoreDesktopSub').text() : $globals.subCategoryDefaultLimitCount));
           
        if(productData.length && productData[0].subCategories.length){
            limit = productData[0].subCategories.length<limit ? productData[0].subCategories.length : (limit ? limit : limit_sub_cat);
            productData[0].subCategories.map((subcat, index) => {
                if(index<limit){
                    preFillCategoryTile('subcategory', subcat, parent);
                }
                return true;  
            })
        }
        subCategoryTile.addClass('d-none');
        $(subCategoryTile).removeClass('search__subcategories');
        $(subCategoryTile).find('.a-tile__link').attr('href', 'javascript:;');
        $(subCategoryTile).removeAttr('data-parent');

        $('#showMoreSubCategories').attr('limit', limit);     
        if(!productData || !(productData.length && productData[0].subCategories)){
            subCategoryTile.removeClass('d-none');
            $('#showMoreSubCategories').css({'display':'none'});
        }    
        else if(productData.length && productData[0].subCategories && productData[0].subCategories.length<=limit){
            $('#showMoreSubCategories').css({'display':'none'});
            $('#showMoreSubCategories').removeAttr('limit');
        }
        else{
            $('#showMoreSubCategories').css({'display':'block'});
        }
    }

    const getCategoryDetails = function(prodData, cat){
        if(!prodData){
          return false;  
        }
        let curr_cat = [];
        if (!cat && prodData.categories && prodData.categories.length){
            curr_cat.push(prodData.categories[0]);
        }
        else{
            const categories = prodData.categories;
            if(categories && categories.length){
                curr_cat = categories.filter(function(el){
                return ($search.getName(el.category).name.trim() === cat || el.id === cat)
                })
            }
        }
        return curr_cat;
    }

    const getSubCategoryDetails = function(prodData, category, subCatgry){
        if(!category || !prodData){
            return false;
        }
        const cat = getCategoryDetails(prodData, category);
        let sub_cat = [];
        if(!subCatgry){
            if(cat.length && cat[0].subCategories.length){
                sub_cat.push(cat[0].subCategories[0]);
            }
        }
        else{
            const sub_c = cat.length && cat[0].subCategories.length ? cat[0].subCategories : [];
            if(sub_c && sub_c.length){
                sub_cat = sub_c.filter(function(el){
                return ($search.getName(el.name).name.trim() === subCatgry ||
                    $search.getName(el.name).name.trim() === $search.getName(subCatgry).name.trim() ||
                    $search.getName(el.subcatId).id === subCatgry)
                })
            } 
        }
        return sub_cat;
    }

    //category search starts
    const prefillSubCategoryMenu = function(temp, obj){
        if(temp && obj){
            $(temp).find('.a-link__inner-text').text($search.getName(obj.name).name);
            $(temp).find('.a-link__inner-text').attr('data-id',$search.getName(obj.name).id);
            $(temp).find('#subCategoryLink').removeAttr('id');
            $(temp).find('.a-link__text').attr('href', 'javascript:;');
            $(temp).addClass('sub__categories_list');
            $(temp).find('.a-link').attr('data-id',$search.getName(obj.name).id.replace(/[^a-zA-Z0-9;\-.!? ]/g, '')+'-a-link');
        }
        $(temp).clone().appendTo($(subCategoriesList));
        return temp;
    }

    const setCategorySearchMenu = function(productData, category, sub_cat_clicked){
        if(!subCategoryLink || !productData){
            return false;
        }
        const curr = getCategoryDetails(productData, category);    
        const sub_c = curr.length && curr[0].subCategories.length ? curr[0].subCategories : [];
        const left_nav = $('#leftNavTitle').length ? $('#leftNavTitle').text() : null;
        const nav_desc = $('#subCatDesc').length ? $('#subCatDesc').text() : null;
        const search_cat_title = $('#subCategoriesLeftNavTitle');
        const search_cat_desc = $('#subCategoriesNavDescription');
        const cat_search_heading = $('#categorySearchedText').find('.cmp-title__text');

        //set title and desc from configuration
        if(left_nav && search_cat_title.length){
            $(search_cat_title).find('.cmp-title__text').text(left_nav);
        }
        if(nav_desc && search_cat_desc.length){
            $(search_cat_desc).html('<p>'+nav_desc+'</p>');
        }
        if(cat_search_heading.length){
            if(!category){
                category = productData && productData.categories && productData.categories.length ? 
                    $search.getName(productData.categories[0].category).name
                        : $(cat_search_heading).text();
            }
            $(cat_search_heading).text(category);
        }
        //set dynamic sub categories link 
        subCategoryLink.removeClass('d-none');
        $('.sub__categories_list').remove();
        if(sub_c && sub_c.length){
            //Re-arrange elements to move clicked element to begining of the array
            sub_c.map(det =>{
                if(det.name.replace(/[^a-zA-Z0-9;\-.!?]/g, '') == sub_cat_clicked){
                 let matchedSubCat = det;
                 sub_c.splice(sub_c.indexOf(det), 1);
                 sub_c.unshift(matchedSubCat);
                 return false;
                }
             });
             
            sub_c.map(det =>{
                prefillSubCategoryMenu(subCategoryLink, det);
                return true;
            })
        } 
        subCategoryLink.addClass('d-none');
        subCategoryLink.removeClass('sub__categories_list');
        const filters =  $('#subCategoriesListContainer') && $('#subCategoriesListContainer').length ?
                $('#subCategoriesListContainer').find('.sub__categories_list') : null;
        if(filters && filters.length){   
            filters.find('.a-link').removeClass('active');  
            if(sub_cat_clicked){
                let clicked_sub_cat = sub_cat_clicked.replace(/[^a-zA-Z0-9;\-.!? ]/g, '');
                clicked_sub_cat = clicked_sub_cat+'-a-link';
                if(document.querySelectorAll('[data-id="'+clicked_sub_cat+'"]').length > 1){
                    document.querySelectorAll('[data-id="'+clicked_sub_cat+'"]')[1].classList.add('active');
                }else{
                    document.querySelectorAll('[data-id="'+clicked_sub_cat+'"]')[0].classList.add('active');
                }
            }else{
                filters.eq(0).find('.a-link').addClass('active'); 
            }
        }
    }

    //prefill category search tokens
    const prefillSubCategorySearchTokens = function(subcatObj, catName){
        const prods = subcatObj.products;
        let subCatTemp = $templates.categorySearchToken();
        subCatTemp = $($.parseHTML(subCatTemp));
        $(subCatTemp).find('.sub_category_title').text($search.getName(subcatObj.name).name);
        $(subCatTemp).find('.sub_category_title').attr('id', $search.getName(subcatObj.name).id);
        if(prods){
            let dubVersionids = prods.map(e => e.arry[0].versionid)
                                .map((e, i, final) => final.indexOf(e) !== i && i)
                                .filter(obj=> prods[obj])
                                .map(e => prods[e].arry[0].versionid)
                                .filter((value, index, self) => {
                                    return self.indexOf(value) === index;
                                });
            let prodsFinalArr = [];
            if(dubVersionids.length && dubVersionids[0]){
                dubVersionids.forEach((id)=> {
                    let dupProdsArr = prods.filter((prod)=> prod.arry[0].versionid == id);
                    prodsFinalArr.push(getLatestVerProduct(dupProdsArr));
                });
                prods.forEach((obj)=> {
                    let isDupProd = false;
                    dubVersionids.forEach((id)=> {
                        if(obj.arry[0].versionid == id){
                            isDupProd = true;   
                        }
                    });
                    if(!isDupProd){
                        prodsFinalArr.push(obj);
                    }
                });
                prodsFinalArr.map(p => {
                    $search.prefillSearchToken(p, catName, subCatTemp);
                    return true;
                });
            }else{
                prods.map(p => {
                    $search.prefillSearchToken(p, catName, subCatTemp);
                    return true;
                });
            }
        }
        $(subCatTemp).clone().appendTo($('#categorySearchResults'));
        return subCatTemp;
    }

    const getLatestVerProduct = function(dupProdsArr){
        let latestProdDate;
        let latestProdObj = {};
        latestProdDate = dupProdsArr[0].arry[0].ontime;
        dupProdsArr.forEach((obj)=>{
            if(new Date(obj.arry[0].ontime) >= new Date(latestProdDate) ){
                latestProdDate = obj.arry[0].ontime;
                latestProdObj = obj;
            }
        });
        return latestProdObj;
    }

    //set tokens sub category wise for a category
    const getProdCategorySearchTokens = function(prodData, category){
        if(!prodData){
            return false;
        }
        if(!category){
            category = prodData && prodData.categories && prodData.categories.length ? 
                $search.getName(prodData.categories[0].category).name 
                    : '';
        }
        const cat = getCategoryDetails(prodData, category);
        const s_cat = cat.length && cat[0].subCategories;
        $('#categorySearchResults').html('');
        if(s_cat.length){
            s_cat.map(s => {
                prefillSubCategorySearchTokens(s, category);
                return true;
            })
        }
    }

    //Initialisation for product category search results in products page
    const initProductCategorySearch = function(productData, category, sub_cat_clicked){
        setCategorySearchMenu(productData, category, sub_cat_clicked);
        getProdCategorySearchTokens(productData, category);
    }

    //Entry function -- initialisation for product category page with data
    const initProductCategory = function(productData) {
        if(!productData){
            return false;
        }
        const cat = getCategoryDetails(productData);
        setCategoryContainer(productData);
        setSubCategoryContainer(cat);
        initProductCategorySearch(productData);
    }

    const checkIfProductCategoryPage = function(){
        const isProdCatPg = $('#productCategoriesWrapper').length ? true : false;
        return isProdCatPg;
    }

    const setCategoriesAndSubcategories = function(ct, callFrom){
        if(!ct || !ct.role || !ct.category || !ct.category.trim()){
            return false;
        }
        //set category
        const category = ct && ct.category;
        let lang = "";
        if(callFrom === 'contactus'){
            lang = $globals.languagesList[sessionStorage.getItem('contactLanguage')] ? $globals.languagesList[sessionStorage.getItem('contactLanguage')] : 'en';
        }else{
            lang = $globals.languagesList[$search.getLocalStorage('curr-lang')] ? $globals.languagesList[$search.getLocalStorage('curr-lang')] : 'en';
        }
        if(category){
            const catLocale = category.split(',');
            if(catLocale.length > 1){
                let isCMatch = false;
                let defaultC = null;
                let val = null;
                catLocale.map(c => {
                    const cMap = c.split('=');
                    const langCd = cMap[0] && cMap[0].replace('{','').replace('}','');
                    if (langCd && (langCd.toLowerCase().trim() === lang || langCd.toLowerCase().replace('_','-').trim() === lang)){
                        isCMatch = true;
                        val = cMap.length > 1 && cMap[1].replace('{','').replace('}','');
                    }
                    if(langCd && langCd.trim() === 'default'){
                        defaultC =  cMap.length > 1 && cMap[1].replace('{','').replace('}','');
                    }
                    return true;
                })
                if(!isCMatch && defaultC){
                    val = defaultC;
                }
                if(val){
                    ct.category = val;
                } 
            }
        }
        //set sub category
        const subCategoryLocal = ct && ct.subcategory;
        if(subCategoryLocal){
            const scatLocale = subCategoryLocal.split(',');
            if(scatLocale.length > 1){
                let isSMatch = false;
                let defaultS = null;
                let sval = null;
                scatLocale.map(s => {
                    const sMap = s.split('=');
                    const langCds = sMap[0] && sMap[0].replace('{','').replace('}','');
                    if (langCds && langCds.trim() === lang){
                        isSMatch = true;
                        sval = sMap.length > 1 && sMap[1].replace('{','').replace('}','');
                    }
                    if(langCds && langCds.trim() === 'default'){
                        defaultS =  sMap.length > 1 && sMap[1].replace('{','').replace('}','');
                    }
                    return true;
                })
                if(!isSMatch && defaultS){
                    sval = defaultS;
                }
                if(sval){
                    ct.subcategory = sval;
                } 
            }
        }
        return ct;
    }

    //set product category data
    const setProductCategoryData = function (obj, country, language, role, callFrom) {
        let catDet = {};
        catDet.division = 'ardx';
        catDet.country = country ? country : $search.getLocalStorage('selectedCountry') ? $search.getLocalStorage('selectedCountry') : "United States";
        catDet.language = language ? language : $search.getLocalStorage('curr-lang') ? $search.getLocalStorage('curr-lang') : "English";
        catDet.role = role ? role : $search.getLocalStorage('isHCP') ? $search.getLocalStorage('isHCP') : 'NHCP';
        catDet.categories = [];
        obj && obj.map(ct => {
            let newObj = setCategoriesAndSubcategories(ct, callFrom);
            if (newObj) {
                let cat = {
                    id: null,
                    category: null,
                    subCategories: [],
                    country: null,
                    language: null,
                    isHcp: null
                };
                let subCat = {
                    name: null,
                    subcatId: null,
                    catNameVal: null,
                    products: []
                };
                let prods = {
                    name: null,
                    catId: null,
                    subcatId: null,
                    arry: []
                };
                let isCatMatched = false;
                catDet.categories.map(cd => {
                    if (cd.id === $search.getName(newObj.category).id) {
                        let isSubCatMatched = false;
                        isCatMatched = true;
                        cd.subCategories.map(s => {
                            if (s.subcatId === $search.getName(newObj.subcategory).id) {
                                isSubCatMatched = true;
                                //products
                                prods.name = $search.getName(newObj.productname).id + '|' + $search.getName(newObj.productname).name;
                                prods.catId = $search.getName(newObj.category).id;
                                prods.subcatId = $search.getName(newObj.subcategory).id;
                                //push details
                                prods.arry.push(newObj);
                                s.products.push(prods);
                            }
                            return true;
                        })
                        if (!isSubCatMatched) {
                            //sub-categories
                            subCat.name = $search.getName(newObj.subcategory).name;
                            subCat.subcatId = $search.getName(newObj.subcategory).id;
                            subCat.catNameVal = $search.getName(newObj.category).id + '|' + $search.getName(newObj.category).name;
                            //products
                            prods.name = $search.getName(newObj.productname).id + '|' + $search.getName(newObj.productname).name;
                            prods.catId = $search.getName(newObj.category).id;
                            prods.subcatId = $search.getName(newObj.subcategory).id;
                            //push details
                            prods.arry.push(newObj);
                            subCat.products.push(prods);
                            cd.subCategories.push(subCat);
                        }
                    }
                    return true;
                });
                if (!isCatMatched) {
                    //categories
                    cat.id = $search.getName(newObj.category).id;
                    cat.category = $search.getName(newObj.category).id + '|' + $search.getName(newObj.category).name;
                    if (newObj.country && newObj.isHcp && newObj.language) {
                        cat.country = newObj.country;
                        cat.language = newObj.language;
                        cat.isHcp = newObj.isHcp;
                    }
                    //sub-categories
                    subCat.name = $search.getName(newObj.subcategory).name;
                    subCat.subcatId = $search.getName(newObj.subcategory).id;
                    subCat.catNameVal = $search.getName(newObj.category).id + '|' + $search.getName(newObj.category).name;
                    //products
                    prods.name = $search.getName(newObj.productname).id + '|' + $search.getName(newObj.productname).name;
                    prods.catId = $search.getName(newObj.category).id;
                    prods.subcatId = $search.getName(newObj.subcategory).id;
                    //push details
                    prods.arry.push(newObj);
                    subCat.products.push(prods);
                    cat.subCategories.push(subCat);
                    catDet.categories.push(cat);
                }
            }
        });

        return catDet;
    }

    const callForCategoryDetails = function(redirectUrl, target, callFrom){
        //call for ajax with parameters
        const url = $globals.productSearchURL;
        let country = $search.getName($search.getLocalStorage('selectedCountry')).id;
        let language = $search.getLocalStorage('curr-lang');
        let role = $search.getLocalStorage('isHCP') ? $search.getLocalStorage('isHCP') : 'NHCP';

        if(callFrom === 'contactus'){
            country = $search.getName(sessionStorage.getItem('contactCountry')).id;
            language = $search.getName(sessionStorage.getItem('contactLanguage')).id;
        }

        country = country ? country.replace(/[^a-zA-Z0-9 ]/g, '').toUpperCase() : 'UNITEDSTATES';
        language = language ? language.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase() : 'english';
        role = role && (role.toUpperCase() === 'Y' || role.toUpperCase() === 'YES' || role.toUpperCase() === 'HCP' || role.toUpperCase() === 'TRUE') ? 'HCP' : 'NHCP';
        $search.toggleLoader(true);
        $.ajax({
            url: url,
            headers: $globals.eslHeaderTemplate,
            type: "POST", /* or type:"GET" or type:"PUT" */
            dataType: "json",
            data: JSON.stringify({
                "firstresult": 1,
                "filters": [
                    {
                        "tags": language+'/'+country,
                        "role": role === 'NHCP' ? 'NHCP' : ''
                    }
                ],
                "autocorrect": "true",
                "searchtype": "sitesearch",
                "sort": [], /* "q": "", */
            }),
            success: function (obj) {
                const categoryDetails = setProductCategoryData(obj.response.results, country, language, role, callFrom);
                sessionStorage.setItem('country', country);
                sessionStorage.setItem('language', language);
                sessionStorage.setItem('role', role);
                if(callFrom === 'contactus'){
                    sessionStorage.setItem('contactUsDetails', JSON.stringify(categoryDetails));
                    const contact_category = $('label[for="contactUsCategories"]').closest('.a-dropdown__container');
                    const contact_subCategory = $('label[for="contactUsSubCategories"]').closest('.a-dropdown__container');
                    const contact_products = $('label[for="contactUsProducts"]').closest('.a-dropdown__container');
                    if(categoryDetails && categoryDetails.categories){
                        if(contact_category.length){
                            $forms.initCategoryDropdownField(categoryDetails, contact_category);
                            $forms.initSubCategoryDropdownField(categoryDetails, 'default', contact_subCategory);
                            $forms.initProductsDropdownField(categoryDetails, 'default', 'default', contact_products);
                
                            if($forms.isContactUsValid()){
                                $('#step2Continue').removeClass('disabled');
                                $('#step2Continue').prop('disabled', false);
                            }
                            else{
                                $('#step2Continue').addClass('disabled');
                                $('#step2Continue').prop('disabled', true);
                            }
                        }
                    }
                
                    if($('#contactUsSearch').length){
                        $('#searchProductData').remove();
                        $forms.initSearchProductField('contactUsSearch', categoryDetails);
                    }
                }
                else if(callFrom === 'queryParams'){
                    const productIdInQuery = sessionStorage.getItem('product');
                    $search.setLocalStorage('productCategories', categoryDetails);
                    let product = productIdInQuery && $forms.getProductDetails(productIdInQuery);
                    if(product && product.documentpartnumber){
                        //look for previous versions
                        const products = $productCategory.getAllProducts(categoryDetails);
                        const previousVersions = $search.getPdfPreviousVersions(product.versionid, product.productrevnumber, products);
                        product.language =  $search.getLocalStorage('curr-lang') ? $search.getLocalStorage('curr-lang') : "English";
                        product.previousVersions = previousVersions;
                        $pdfViewer.setLastPdfOpened(product); 
                        //redirect to details page
                        let details_url = $globals.detailsPageDefault ? $globals.detailsPageDefault : decodeURIComponent(product.clickableuri);
                        if(details_url.indexOf('.html') == -1 && details_url.indexOf('.pdf') == -1){
                            details_url = details_url + '.html';
                        }
                        sessionStorage.removeItem('product');
                        window.open(details_url,target);
                    }
                    else{
                        if (redirectUrl){
                            let chngdredirectUrl = redirectUrl.replace("nhcp/home", "errors/404");
                            chngdredirectUrl = chngdredirectUrl.replace("hcp/home", "errors/404");
                            sessionStorage.removeItem('product');
                            window.open(chngdredirectUrl,target);
                            }
                    }
                }else if(callFrom === 'detailsscreen')
                {
                    const productIdInQuery = sessionStorage.getItem('product');
                    $search.setLocalStorage('productCategories', categoryDetails);
                    let product = productIdInQuery && $forms.getProductDetails(productIdInQuery);
                    if(product && product.documentpartnumber){
                        //look for previous versions
                        const products = $productCategory.getAllProducts(categoryDetails);
                        const previousVersions = $search.getPdfPreviousVersions(product.versionid, product.productrevnumber, products);
                        product.language =  $search.getLocalStorage('curr-lang') ? $search.getLocalStorage('curr-lang') : "English";
                        product.previousVersions = previousVersions;
                        $pdfViewer.setLastAndSeconLastPdfOpened(product); 
                        //redirect to details page
                        let details_url = $globals.detailsPageDefault ? $globals.detailsPageDefault : decodeURIComponent(product.clickableuri);
                        if(details_url.indexOf('.html') == -1 && details_url.indexOf('.pdf') == -1){
                            details_url = details_url + '.html';
                        }
                        sessionStorage.removeItem('product');
                        window.open(details_url,target);
                    }
                    else{
                        if (redirectUrl){
                            let chngdredirectUrl = redirectUrl.replace("nhcp/home", "errors/404");
                            chngdredirectUrl = chngdredirectUrl.replace("hcp/home", "errors/404");
                            sessionStorage.removeItem('product');
                            window.open(chngdredirectUrl,target);
                            }
                    
                }  
                }   
                
                else{
                    $search.setLocalStorage('productCategories', categoryDetails);
                }
                if($productCategory.checkIfProductCategoryPage()){
                    $productCategory.initProductCategory(categoryDetails);            
                    $search.setRecentlyViewedItems();
                }
                if(redirectUrl && callFrom !== 'queryParams'){
                    window.open(redirectUrl,target);
                }
                $search.toggleLoader();
                $productCategory.checkHistoryOfDetialsPage();
            },
            error: function () {
                console.log("error fetching search data!!");
                $search.toggleLoader();
                $productCategory.checkHistoryOfDetialsPage();
            }
            
        });
        
    }

    const checkHistoryOfDetialsPage = function() {
        if (sessionStorage.getItem('isHomePageEnable') && sessionStorage.getItem('activeSubcategory')) {
            if(sessionStorage.getItem('selectedCategory')) {
                $('.search__categories .a-tile__link').click();
                $('.search__subcategories .a-tile__link').click();
               }
             $('#categorySearch').show();
             $('.sub__categories_list').find('.a-link').removeClass('active');
             $('.sub__categories_list').find('.a-link').each(function() {
                if($(this).find('.a-link__inner-text').attr('data-id') === sessionStorage.getItem('activeSubcategory')) {
                    $(this).addClass('active');
                }
             })
             $productCategory.scrollingInsideElement(sessionStorage.getItem('activeSubcategory'));
            $productCategory.scrollingInsideElement(sessionStorage.getItem('isHomePageEnable'));
            $productCategory.navigateToId('categorySearch', false);
            sessionStorage.removeItem('isHomePageEnable');
            sessionStorage.removeItem('activeSubcategory');
            } 
    }
    const navigateToId = function(id, isAnimated){
        if(!id){
            return false;
        }
        if (isAnimated) {
            $([document.documentElement, document.body]).animate({
                scrollTop: $("#"+id).offset().top - 100
            }, 1000);
        } else {
            $([document.documentElement, document.body]).scrollTop($("#"+id).offset().top - 100)
        }
        
    }

    const scrollingInsideElement = function(id){
        if(window.innerWidth<768){
            $productCategory.navigateToId("categorySearch", true);

        }
        if(window.innerWidth>767 && window.innerWidth<1024){
			 $productCategory.navigateToId("categorySearch", true);
        }
        let elmnt = document.getElementById(id);
        if(elmnt){
            elmnt.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }       
    }

    const getAllProducts = function(catData){
        if(!catData){
            return false;
        }
        let products = [];
        catData.categories && catData.categories.length && catData.categories.map(cat => {
            cat.subCategories && cat.subCategories.map(sub => {
                sub.products && sub.products.map(pr =>{
                    products.push(pr.arry[0]);
                    return true;
                })
                return true;
            })
        })

        return products;
    }

    return{
        initProductCategory: initProductCategory,
        getCategoryDetails: getCategoryDetails,
        setSubCategoryContainer: setSubCategoryContainer,
        getSubCategoryDetails: getSubCategoryDetails,
        initProductCategorySearch: initProductCategorySearch,
        checkIfProductCategoryPage: checkIfProductCategoryPage,
        setCategoryContainer: setCategoryContainer,
        callForCategoryDetails: callForCategoryDetails,
        navigateToId: navigateToId,
        scrollingInsideElement: scrollingInsideElement,
        getAllProducts: getAllProducts,
        setProductCategoryData: setProductCategoryData,
        setCategoriesAndSubcategories: setCategoriesAndSubcategories,
        checkHistoryOfDetialsPage: checkHistoryOfDetialsPage
    }
})();

//initialise product category with product category data
$(document).ready(function(){
    //Check if product category page
    if($productCategory.checkIfProductCategoryPage()){
        //If author mode, load without data else load with data
        if($search.checkIfEditorMode()){
            $productCategory.initProductCategory();
        }
        else{
             $productCategory.callForCategoryDetails();
        }
    }  
});

//on click of elabeling home tile button
$(document).on('click', '#selectBusinessArea .a-tile__link', function(e){
    e.preventDefault();
    const url = $(this).attr('href');
    const target = $(this).attr('target') === '_blank' ? '_blank' : '_self';
    if(url){
        window.open(url, target);
    }
});

//on click of product categories tile
$(document).on('click', '#section_productBanner .m-hero__extras .a-button a', function(e){
    e.preventDefault();
    $productCategory.navigateToId('section-productCategories', true);
});

    //adding css to suggestion box
    $("#section_productBanner").parent().css( {"overflow": "visible", "z-index": "inherit"});
    $("#section_searchBanner").parent().css( {"overflow": "visible", "z-index": "inherit"});
    

//on click of product categories tile
$(document).on('click', '.search__categories .a-tile__link', function(e){
    e.preventDefault();
    let cat_clicked = '';
    const productCategories = $search.getLocalStorage('productCategories');
    if(sessionStorage.getItem('selectedCategory') && sessionStorage.getItem('activeSubcategory') && sessionStorage.getItem('isHomePageEnable')) {
        cat_clicked = sessionStorage.getItem('selectedCategory');
    } else {
        cat_clicked = $(this).find('.a-tile__title-text').text().trim();
        sessionStorage.setItem('selectedCategory', cat_clicked);
    }
    const category = $productCategory.getCategoryDetails(productCategories, cat_clicked);
    $productCategory.setSubCategoryContainer(category, cat_clicked);
    if (!(sessionStorage.getItem('isHomePageEnable') && sessionStorage.getItem('activeSubcategory'))) {
        $productCategory.navigateToId('section-subCategories', true)
        }
    $('#categorySearch').hide();
});

//on click of product sub categories tile
$(document).on('click', '.search__subcategories .a-tile__link', function(e){
    e.preventDefault();
    let cat_clicked = '';
    let sub_cat_clicked = '';
    const productCategories = $search.getLocalStorage('productCategories');
    if(sessionStorage.getItem('selectedCategory') && sessionStorage.getItem('activeSubcategory') &&  sessionStorage.getItem('isHomePageEnable')) {
        cat_clicked = sessionStorage.getItem('selectedCategory');
        sub_cat_clicked = sessionStorage.getItem('activeSubcategory');
    } else {
        cat_clicked = $(this).closest('.a-tile').attr('data-parent') ? $(this).closest('.a-tile').attr('data-parent') : '';
        sub_cat_clicked = $(this).closest('.a-tile').attr('data-id') ? $(this).closest('.a-tile').attr('data-id') : '';
    }
    $productCategory.initProductCategorySearch(productCategories, cat_clicked, sub_cat_clicked);
    $('#categorySearch').show();
    if (!(sessionStorage.getItem('isHomePageEnable') && sessionStorage.getItem('activeSubcategory'))) {
        $productCategory.navigateToId('categorySearch', true);
    }
});

//on click show more categories
$(document).on('click', '#showMoreCategories', function(e){
    e.preventDefault();
    const catData = $search.getLocalStorage('productCategories');
    const limit = $(this).attr('limit');
    const limit_cat = (window.innerWidth < 768) ? ($('#showMoreMobile').length && $('#showMoreMobile').text() ? $('#showMoreMobile').text() : $globals.productCategoryDefaultLimitCount) :
                    ((window.innerWidth > 767 && window.innerWidth < 992) ? ($('#showMoreTablet').length && $('#showMoreTablet').text() ? $('#showMoreTablet').text() : $globals.productCategoryDefaultLimitCount) : 
                        ($('#showMoreDesktop').length && $('#showMoreDesktop').text() ? $('#showMoreDesktop').text() : $globals.productCategoryDefaultLimitCount));
    const pag = $search.getPaginationNumbers(catData.categories.length, limit_cat);
    let new_limit = null;
    
    if(limit){
        pag.pageLists.length && pag.pageLists.map((p,i) => {
            if(p.end == limit){
                if(i+1 < pag.pageLists.length){
                    new_limit = pag.pageLists[i+1].end;
                }
                else{
                    new_limit = pag.pageLists[i].end;
                }
            }
            return true;
        });
        $('#showMoreCategories').attr('limit', new_limit);
        $productCategory.setCategoryContainer(catData, new_limit);
        if(new_limit === catData.categories.length){
            $(this).css({'display': 'none'});
        }
    }
});

//on click show more sub categories
$(document).on('click', '#showMoreSubCategories', function(e){
    e.preventDefault();
    const catData = $search.getLocalStorage('productCategories');
    const limit = $(this).attr('limit');
    const limit_sub_cat = (window.innerWidth < 768) ? ($('#showMoreMobileSub').length && $('#showMoreMobileSub').text() ? $('#showMoreMobileSub').text() : $globals.subCategoryDefaultLimitCount) :
                    ((window.innerWidth > 767 && window.innerWidth < 992) ? ($('#showMoreTabletSub').length && $('#showMoreTabletSub').text() ? $('#showMoreTabletSub').text() : $globals.subCategoryDefaultLimitCount) : 
                        ($('#showMoreDesktopSub').length && $('#showMoreDesktopSub').text() ? $('#showMoreDesktopSub').text() : $globals.subCategoryDefaultLimitCount));

    let cat_clicked = $(this).closest('#subCategories').length ? $(this).closest('#subCategories').find('.search__subcategories').eq(0).attr('data-parent') : '';
    cat_clicked = $search.getName(cat_clicked).name.trim();
    const cat = $productCategory.getCategoryDetails(catData, cat_clicked);
    const pag = $search.getPaginationNumbers(cat[0].subCategories.length, limit_sub_cat);
    let new_limit = null;

    if(limit){
        pag.pageLists.length && pag.pageLists.map((p,i) => {
            if(p.end == limit){
                if(i+1 < pag.pageLists.length){
                    new_limit = pag.pageLists[i+1].end;
                }
                else{
                    new_limit = pag.pageLists[i].end;
                }
            }
            return true;
        });
        $('#showMoreSubCategories').attr('limit', new_limit);
        $productCategory.setSubCategoryContainer(cat, cat_clicked, new_limit);
    }
});

//on click filtermenu inside category search in product category page
$(document).on('click', '.sub__categories_list .a-link__text', function(e){
    e.preventDefault();
    $('.sub__categories_list').find('.a-link').removeClass('active');
    $(this).closest('.a-link').addClass('active');
    const idNav = $(this).find('.a-link__inner-text').attr('data-id');
    if(!idNav){
        return false;
    }
    $productCategory.scrollingInsideElement(idNav);
});

//on click show more recently viewed
$(document).on('click', '#showMoreRecentlyViewed', function(e){
    e.preventDefault();
    const recents = $search.getRecentlyViewed();
    const limit = $(this).attr('limit');

    const pag = $search.getPaginationNumbers(recents.length, $globals.subCategoryDefaultLimitCount);
    let new_limit = null;

    if(limit){
        pag.pageLists.length && pag.pageLists.map((p,i) => {
            if(p.end == limit){
                if(i+1 < pag.pageLists.length){
                    new_limit = pag.pageLists[i+1].end;
                }
                else{
                    new_limit = pag.pageLists[i].end;
                }
            }
            return true;
        });
        $('#showMoreRecentlyViewed').attr('limit', new_limit);
        $search.setRecentlyViewedItems(new_limit);
        if(new_limit === recents.length){
            $(this).css({'display': 'none'});
        }
    }
});
