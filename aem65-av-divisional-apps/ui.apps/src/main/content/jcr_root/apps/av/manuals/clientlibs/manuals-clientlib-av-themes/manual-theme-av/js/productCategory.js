$(document).on('click', '.more-manuals', function (event) {
    let title = $(this).closest('.search_token').find(".search_category_title").text();
    let fulltext = $(this).next().html();
    let count = fulltext.split('<br>');
    count = count.length;

    event.preventDefault();
    event.stopPropagation();
    $('#externalLink-modal .container .text').html(fulltext);
    $('#externalLink-modal .container #model-count').text("Products," + count + " Total");
    $('#externalLink-modal .container #popup-title').html(title);
    $('#externalLink').closest('.m-popup').click();

});

$(document).ready(function () {
    setTimeout(() => {
        if ($('#productIcons').length && $('#externalLink-modal').length) {
            $('.modal').addClass("modal-manuals");
        }
    }, 0)


})

var $xApplicationId = document.querySelector('input[name="x-application-id"]').value;
var $xCountryCode = document.querySelector('input[name="x-country-code"]').value;
var $xPreferredLanguage = document.querySelector('input[name="x-preferred-language"]').value;
const $globalsManuals = {
    contactExperienceFragmentUrl: '/content/experience-fragments/av/manuals-eifu/contactus-experiencefragments/',
    eslHeaderTemplate: {
        'x-application-id': $xApplicationId,
        'x-country-code': $xCountryCode,
        'x-preferred-language': $xPreferredLanguage,
    }
}

const $productCategoryManuals = (function () {

    //dynamic containers to be populated
    const $prodCategory = $('#productCategories');
    const $subCategory = $('#subCategories');
    const $subCategoriesList = $('#subCategoriesListContainer');
    //components to be iterated
    const prodCategoryTile = $prodCategory.find('#categoryTile').closest('.a-tile');
    const subCategoryTile = $subCategory.find('#subCategoryTile').closest('.a-tile');
    const subCategoryLink = $subCategoriesList.find('#subCategoryLink').closest('.link');

    const getCategoryTemplate = function () {
        const isProdCatPresent = $prodCategory.length ? true : false;
        if (!isProdCatPresent) {
            return false;
        }
        return prodCategoryTile;
    }

    const getSubCatTemplate = function () {
        const isSubCatPresent = $subCategory.length ? true : false;
        if (!isSubCatPresent) {
            return false;
        }
        return subCategoryTile;
    }

    const preFillCategoryTile = function ($comp, $obj, $parent) {
        if ($comp === 'category') {
            const $c = getCategoryTemplate();
            if ($c && $obj) {
                $($c).find('.a-tile__title-text').html('<p>' + $search.getName($obj.category).name + '</p>');
                $($c).find('.a-tile__para').html('<p class="d-none">' + $obj.language + '</p>');
                $($c).find('#categoryTile').removeAttr('id');
                $($c).find('.a-tile__link').attr('href', 'javascript:;');
                $($c).attr('data-id', $search.getName($obj.category).id);
                $($c).addClass('search__categories');
            }
            $($c).clone().appendTo($($prodCategory).find('.m-tile-list'));
            return $c;
        }
        else if ($comp === 'subcategory') {
            const $sb = getSubCatTemplate();
            if ($sb && $obj) {
                let $subCatName = $search.getName($obj.name).name ? $search.getName($obj.name).name : 'Undefined';
                $($sb).find('.a-tile__title-text').html('<p>' + $subCatName + '</p>');
                $($sb).find('.a-tile__para').html('<p>' + $search.getName($obj.catNameVal).name + '</p>');
                $($sb).find('#subCategoryTile').removeAttr('id');
                $($sb).find('.a-tile__link').attr('href', 'javascript:;');
                $($sb).attr('data-id', $search.getName($obj.name).id);
                $($sb).attr('data-parent', $search.getName($parent).name);
                $($sb).addClass('search__subcategories');
            }
            $($sb).clone().appendTo($($subCategory).find('.m-tile-list'));
            return $sb;
        }
        else {
            return false;
        }
    }

    const setCategoryContainer = function ($productData, $limit) {
        if (!$productData) {
            return false;
        }
        prodCategoryTile.removeClass('d-none');
        $('.search__categories').remove();

        const $limit_cat = (window.innerWidth < 768) ? ($('#showMoreMobile').length && $('#showMoreMobile').text() ? $('#showMoreMobile').text() : $globals.productCategoryDefaultLimitCount) :
            ((window.innerWidth > 767 && window.innerWidth < 992) ? ($('#showMoreTablet').length && $('#showMoreTablet').text() ? $('#showMoreTablet').text() : $globals.productCategoryDefaultLimitCount) :
                ($('#showMoreDesktop').length && $('#showMoreDesktop').text() ? $('#showMoreDesktop').text() : $globals.productCategoryDefaultLimitCount));

        if ($productData.categories && $productData.categories.length) {
            $limit = $productData.categories.length < $limit ? $productData.categories.length : ($limit ? $limit : $limit_cat);
            let $isValidCat = true;
            let $tempLimit = $limit;
            $productData.categories.map((cat, $index) => {
                if ($index < $tempLimit && cat.category) {
                    $isValidCat = preFillCategoryTile('category', cat);
                }
                if (!$isValidCat) {
                    $tempLimit++;
                }
                return true;
            });
        }
        prodCategoryTile.addClass('d-none');
        $(prodCategoryTile).find('.a-tile__link').attr('href', 'javascript:;');
        $(prodCategoryTile).removeClass('search__categories');
        $('#showMoreCategories').attr('limit', $limit);
        if (!$productData || !$productData.categories || !$productData.categories.length) {
            prodCategoryTile.removeClass('d-none');
            $('#showMoreCategories').css({ 'display': 'none' });
        }
        else if ($productData && $productData.categories && $productData.categories.length <= $limit) {
            $('#showMoreCategories').css({ 'display': 'none' });
            $('#showMoreCategories').removeAttr('limit');
        }
        else {
            $('#showMoreCategories').css({ 'display': 'block' });
        }
    }

    const setSubCategoryContainer = function ($productData, $parent, $limit) {
        if (!$productData) {
            return false;
        }
        subCategoryTile.removeClass('d-none');
        $('.search__subcategories').remove();

        const $limit_sub_cat = (window.innerWidth < 768) ? ($('#showMoreMobileSub').length && $('#showMoreMobileSub').text() ? $('#showMoreMobileSub').text() : $globals.subCategoryDefaultLimitCount) :
            ((window.innerWidth > 767 && window.innerWidth < 992) ? ($('#showMoreTabletSub').length && $('#showMoreTabletSub').text() ? $('#showMoreTabletSub').text() : $globals.subCategoryDefaultLimitCount) :
                ($('#showMoreDesktopSub').length && $('#showMoreDesktopSub').text() ? $('#showMoreDesktopSub').text() : $globals.subCategoryDefaultLimitCount));

        if ($productData.length && $productData[0].subCategories.length) {
            $limit = $productData[0].subCategories.length < $limit ? $productData[0].subCategories.length : ($limit ? $limit : $limit_sub_cat);
            $productData[0].subCategories.map(($subcat, $index) => {
                if ($index < $limit) {
                    preFillCategoryTile('subcategory', $subcat, $parent);
                }
                return true;
            })
        }
        subCategoryTile.addClass('d-none');
        $(subCategoryTile).removeClass('search__subcategories');
        $(subCategoryTile).find('.a-tile__link').attr('href', 'javascript:;');
        $(subCategoryTile).removeAttr('data-parent');

        $('#showMoreSubCategories').attr('limit', $limit);
        if (!$productData || !($productData.length && $productData[0].subCategories)) {
            subCategoryTile.removeClass('d-none');
            $('#showMoreSubCategories').css({ 'display': 'none' });
        }
        else if ($productData.length && $productData[0].subCategories && $productData[0].subCategories.length <= $limit) {
            $('#showMoreSubCategories').css({ 'display': 'none' });
            $('#showMoreSubCategories').removeAttr('limit');
        }
        else {
            $('#showMoreSubCategories').css({ 'display': 'block' });
        }
    }

    const getCategoryDetails = function ($prodData, $cat) {
        if (!$prodData) {
            return false;
        }
        let $curr_cat = [];
        if (!$cat && $prodData.categories && $prodData.categories.length) {
            $curr_cat.push($prodData.categories[0]);
        }
        else {
            const $categories = $prodData.categories;
            if ($categories && $categories.length) {
                $curr_cat = $categories.filter(function (el) {
                    return ($search.getName(el.category).name.trim() === $cat || el.id === $cat)
                })
            }
        }
        return $curr_cat;
    }

    const getSubCategoryDetails = function ($prodData, $category, $subcat) {
        if (!$category || !$prodData) {
            return false;
        }
        const $cat = getCategoryDetails($prodData, $category);
        let $sub_cat = [];
        if (!$subcat) {
            if ($cat.length && $cat[0].subCategories.length) {
                $sub_cat.push($cat[0].subCategories[0]);
            }
        }
        else {
            const $sub_c = $cat.length && $cat[0].subCategories.length ? $cat[0].subCategories : [];
            if ($sub_c && $sub_c.length) {
                $sub_cat = $sub_c.filter(function (el) {
                    return ($search.getName(el.name).name.trim() === $subcat ||
                        $search.getName(el.name).name.trim() === $search.getName($subcat).name.trim() ||
                        $search.getName(el.subcatId).id === $subcat)
                })
            }
        }
        return $sub_cat;
    }

    //category search starts
    const prefillSubCategoryMenu = function ($temp, obj) {
        if ($temp && obj) {
            $($temp).find('.a-link__inner-text').text($search.getName(obj.name).name);
            $($temp).find('.a-link__inner-text').attr('data-id', $search.getName(obj.name).id);
            $($temp).find('#subCategoryLink').removeAttr('id');
            $($temp).find('.a-link__text').attr('href', 'javascript:;');
            $($temp).addClass('sub__categories_list');
            $($temp).find('.a-link').attr('data-id', $search.getName(obj.name).id.replace(/[^a-zA-Z0-9;\-.!? ]/g, '') + '-a-link');
        }
        $($temp).clone().appendTo($($subCategoriesList));
        return $temp;
    }

    const setCategorySearchMenu = function ($productData, category, $sub_cat_clicked) {
        if (!subCategoryLink || !$productData) {
            return false;
        }
        const $curr = getCategoryDetails($productData, category);
        const $sub_c = $curr.length && $curr[0].subCategories.length ? $curr[0].subCategories : [];
        const $left_nav = $('#leftNavTitle').length ? $('#leftNavTitle').text() : null;
        const $nav_desc = $('#subCatDesc').length ? $('#subCatDesc').text() : null;
        const $search_cat_title = $('#subCategoriesLeftNavTitle');
        const $search_cat_desc = $('#subCategoriesNavDescription');
        const $cat_search_heading = $('#categorySearchedText').find('.cmp-title__text');

        //set title and desc from configuration
        if ($left_nav && $search_cat_title.length) {
            $($search_cat_title).find('.cmp-title__text').text($left_nav);
        }
        if ($nav_desc && $search_cat_desc.length) {
            $($search_cat_desc).html('<p>' + $nav_desc + '</p>');
        }
        if ($cat_search_heading.length) {
            if (!category) {
                category = $productData && $productData.categories && $productData.categories.length ?
                    $search.getName($productData.categories[0].category).name
                    : $($cat_search_heading).text();
            }
            $($cat_search_heading).text(category);
        }
        //set dynamic sub categories link 
        subCategoryLink.removeClass('d-none');
        $('.sub__categories_list').remove();
        if ($sub_c && $sub_c.length) {
            //Re-arrange elements to move clicked element to begining of the array
            $sub_c.map(det => {
                if (det.name.replace(/[^a-zA-Z0-9;\-.!?]/g, '') == $sub_cat_clicked) {
                    let $matchedSubCat = det;
                    $sub_c.splice($sub_c.indexOf(det), 1);
                    $sub_c.unshift($matchedSubCat);
                    return false;
                }
            });

            $sub_c.map(det => {
                prefillSubCategoryMenu(subCategoryLink, det);
                return true;
            })
        }
        subCategoryLink.addClass('d-none');
        subCategoryLink.removeClass('sub__categories_list');
        const $filters = $('#subCategoriesListContainer') && $('#subCategoriesListContainer').length ?
            $('#subCategoriesListContainer').find('.sub__categories_list') : null;
        if ($filters && $filters.length) {
            $filters.find('.a-link').removeClass('active');
            if ($sub_cat_clicked) {
                let clicked_sub_cat = $sub_cat_clicked.replace(/[^a-zA-Z0-9;\-.!? ]/g, '');
                clicked_sub_cat = clicked_sub_cat + '-a-link';
                if (document.querySelectorAll('[data-id="' + clicked_sub_cat + '"]').length > 1) {
                    document.querySelectorAll('[data-id="' + clicked_sub_cat + '"]')[1].classList.add('active');
                } else {
                    document.querySelectorAll('[data-id="' + clicked_sub_cat + '"]')[0].classList.add('active');
                }
            } else {
                $filters.eq(0).find('.a-link').addClass('active');
            }
        }
    }

    //prefill category search tokens
    const prefillSubCategorySearchTokens = function ($subcatObj, catName) {
        const $prods = $subcatObj.products;
        let $subCatTemp = $templates.categorySearchToken();
        $subCatTemp = $($.parseHTML($subCatTemp));
        $($subCatTemp).find('.sub_category_title').text($search.getName($subcatObj.name).name);
        $($subCatTemp).find('.sub_category_title').attr('id', $search.getName($subcatObj.name).id);
        if ($prods) {
            let $dubVersionids = $prods.map(e => e.arry[0].versionid)
                .map((e, i, final) => final.indexOf(e) !== i && i)
                .filter(obj => $prods[obj])
                .map(e => $prods[e].arry[0].versionid)
                .filter((value, index, self) => {
                    return self.indexOf(value) === index;
                });
            let $prodsFinalArr = [];
            if ($dubVersionids.length) {
                $dubVersionids.forEach((id) => {
                    let $dupProdsArr = $prods.filter((prod) => prod.arry[0].versionid == id);
                    $prodsFinalArr.push($getLatestVerProduct($dupProdsArr));
                });
                $prods.forEach((obj) => {
                    let $isDupProd = false;
                    if (obj.arry[0].url.includes("vascular")) {
                        $dubVersionids.forEach((id) => {
                            if (obj.arry[0].versionid == id) {
                                $isDupProd = true;
                            }
                        });
                    }
                    if (!$isDupProd) {
                        $prodsFinalArr.push(obj);
                    }
                });
                $prodsFinalArr.map(p => {
                    $search.prefillSearchToken(p, catName, $subCatTemp);
                    return true;
                });
            } else {
                $prods.map(p => {
                    $search.prefillSearchToken(p, catName, $subCatTemp);
                    return true;
                });
            }
        }
        $($subCatTemp).clone().appendTo($('#categorySearchResults'));
        return $subCatTemp;
    }

    const $getLatestVerProduct = function ($dupProdsArr) {
        let $latestProdDate;
        let $latestProdObj = {};
        $latestProdDate = $dupProdsArr[0].arry[0].ontime;
        $dupProdsArr.forEach((obj) => {
            if (new Date(obj.arry[0].ontime) >= new Date($latestProdDate) && obj.arry[0].url.includes("vascular")) {
                $latestProdDate = obj.arry[0].ontime;
                $latestProdObj = obj;
            }
        });
        return $latestProdObj;
    }

    //set tokens sub category wise for a category
    const getProdCategorySearchTokens = function ($prodData, $category) {
        if (!$prodData) {
            return false;
        }
        if (!$category) {
            $category = $prodData && $prodData.categories && $prodData.categories.length ?
                $search.getName($prodData.categories[0].category).name
                : '';
        }
        const $cat = getCategoryDetails($prodData, $category);
        const s_cat = $cat.length && $cat[0].subCategories;
        $('#categorySearchResults').html('');
        if (s_cat.length) {
            s_cat.map(s => {
                prefillSubCategorySearchTokens(s, $category);
                return true;
            })
        }
    }

    //Initialisation for product category search results in products page
    const initProductCategorySearch = function ($productData, $category, $sub_cat_clicked) {
        setCategorySearchMenu($productData, $category, $sub_cat_clicked);
        getProdCategorySearchTokens($productData, $category);
    }

    //Entry function -- initialisation for product category page with data
    const initProductCategory = function ($productData) {
        if (!$productData) {
            return false;
        }
        const $cat = getCategoryDetails($productData);
        setCategoryContainer($productData);
        setSubCategoryContainer($cat);
        initProductCategorySearch($productData);
    }

    const checkIfProductCategoryPage = function () {
        const $isProdCatPg = $('#productCategoriesWrapperManuals').length ? true : false;
        return $isProdCatPg;
    }

    //get Categories from tags
    const getCategoryFromTags = function ($ct, $filterText) {
        let $allprevversions = JSON.parse(sessionStorage.getItem('allpreviousversions'));
        let $curdisflag = false;
        //check whether the document is in previous array list if no then display
        $allprevversions.map(prev => {
            if (($ct.url.includes(prev))) {
                $curdisflag = true;

            }
        })
        let $enddateflag = false;
        let currdate = new Date();
        let olddate = $ct.effectiveenddate ? $ct.effectiveenddate : "";
        let begindate = $ct.effectivebegindate ? $ct.effectivebegindate : $ct.ontime;
        begindate = new Date(begindate);
        olddate = new Date(olddate);
        if ((olddate >= currdate || isNaN(olddate)) && begindate <= currdate) {
            $enddateflag = true;
        }

        if (!$curdisflag && $enddateflag || $ct.url.includes("vascular")) {
            let $newretobj = Object.assign({}, $ct);

            const $filterproducts = ($ct.productname.split('::')[1]);

            if (!$ct || !$ct.role || !$ct.category.trim()) {
                return false;
            }
            const tags = $ct.tags && $ct.tags.length ? $ct.tags[0] : null;

            const $filters = $filterText.split('/');

            let matchedTags = [];
            let filterText1 = null;
            if ($filters[2] && $filters[2].toLowerCase() === 'hcp') {
                filterText1 = $filters[0] + '/' + $filters[1] + '/nhcp';
            }
            if (tags) {
                const allTags = tags.split(/[\r\n]+/);
                //check matched tags with country, lang & role
                allTags && allTags.length && allTags.map(t => {
                    if (t.toLowerCase().includes($filterText.toLowerCase()) || (filterText1 && t.toLowerCase().includes(filterText1.toLowerCase()))) {
                        matchedTags.push(t);
                    }
                    return true;
                });
                //check for exact categories
                if ($ct.businessunit) {
                    const cat = $ct.businessunit.split(',');
                    if (cat.length === 1) {
                        const catName = cat[0].split('::')[0];
                        $newretobj.businessunit = catName;
                    }
                    else {
                        let isMatched = false;
                        cat.length && cat.map($c => {
                            if ($c.toLowerCase().includes($filterText.toLowerCase()) || (filterText1 && $c.toLowerCase().includes(filterText1.toLowerCase()))) {
                                const buRem = $c.split('::')[1];
                                if ($filterproducts.includes(buRem)) {
                                    const catName = $c.split('::')[0];
                                    $newretobj.businessunit = catName;
                                    isMatched = true;
                                }
                            }
                            return true;
                        })
                        if (!isMatched) {
                            const matCat = matchedTags.length && matchedTags[0].split('/');
                            $newretobj.businessunit = matCat.length > 4 ? matCat[4] : '';
                        }
                    }
                }
                //check for exact sub categories
                if ($ct.category) {
                    const scat = $ct.category.split(',');
                    if (scat.length === 1) {
                        const scatName = scat[0].split('::')[0];
                        $newretobj.category = scatName;
                    }
                    else {
                        let issMatched = false;
                        scat.length && scat.map(s => {
                            if (s.toLowerCase().includes($filterText.toLowerCase()) || (filterText1 && s.toLowerCase().includes(filterText1.toLowerCase()))) {

                                const catRem = s.split('::')[1];
                                if ($filterproducts.includes(catRem)) {

                                    const scatName = s.split('::')[0];
                                    $newretobj.category = scatName;
                                    issMatched = true;
                                }
                            }
                            return true;
                        })
                        if (!issMatched) {
                            const matsCat = matchedTags.length && matchedTags[0].split('/');
                            $newretobj.category = matsCat.length > 5 ? matsCat[5] : '';
                        }
                    }
                }
                //check for products name
                if ($ct.productname) {
                    $newretobj.searchFilterProdName = $ct.productname;
                    const prodName = $ct.productname.split('::')[0];
                    $newretobj.productname = prodName;
                }
            }

            if (!$newretobj.relatedresource) {
                const relatedresource = $globalsManuals.contactExperienceFragmentUrl + $filters[0] + '-' + $filters[1] + '/' + $newretobj.businessunit + '/' + $newretobj.category + '.html';
                $newretobj.relatedresource = relatedresource;
            }

            else {
                const res = $ct.relatedresource;
                $newretobj.relatedresource = res;
            }
            return $newretobj;
        }
    }
    //set product category data
    //set product category data
    const setProductCategoryData = function (obj, country, language, role) {
        let $catDet = {};
        $catDet.division = 'av';
        $catDet.country = country ? country : ($search.getLocalStorage('selectedCountry') ? $search.getLocalStorage('selectedCountry') : "UNITEDSTATES");
        $catDet.language = language ? language : ($search.getLocalStorage('curr-lang') ? $search.getLocalStorage('curr-lang') : "english");
        $catDet.role = role ? role.toLowerCase() : ($search.getLocalStorage('isHCP') ? $search.getLocalStorage('isHCP') : 'nhcp');
        $catDet.categories = [];
        let $filterText = '';
        if ($catDet.role !== 'nhcp') {

            $filterText = $catDet.country + '/' + $catDet.language;
        } else {
            $filterText = $catDet.country + '/' + $catDet.language + '/' + $catDet.role;
        }
        obj && obj.map($ct => {
            if ($ct.productname) {


                const dum = $ct.productname.split('::');
                let firstproductname = dum.shift();
                let joinname = [];
                let firstnamearray = [];
                firstnamearray.push(firstproductname);

                dum.map(sep => {
                    const tagname = sep.split(",") ? sep.split(",")[0] : "";
                    let productnames = sep.substring(sep.indexOf(",") + 1);

                    if (productnames && !(productnames.includes("av:manualseifu"))) {
                        firstnamearray.push(productnames);
                    }

                    if (tagname) {
                        joinname.push(tagname);
                    }
                })
                const newprodset = joinname.map((jointag, i) => {
                    return firstnamearray[i] + "::" + jointag;
                })

                newprodset.map(tag => {
                    if (tag.toLowerCase().includes($filterText.toLowerCase())) {
                        $ct.productname = tag;
                        let newObj = getCategoryFromTags($ct, $filterText);

                        if (newObj) {
                            newObj.versionid = tag.split('::')[1];
                            let cat = {
                                id: null,
                                category: null,
                                subCategories: []
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
                            $catDet.categories.map(cd => {
                                if (cd.id === $search.getName(newObj.businessunit).id ||
                                    cd.id.replace(/-/g, '').toLowerCase() === $search.getName(newObj.businessunit).id.replace(/-/g, '').toLowerCase()) {
                                    let isSubCatMatched = false;
                                    isCatMatched = true;
                                    cd.subCategories.map(s => {
                                        if (s.subcatId === $search.getName(newObj.category).id ||
                                            s.subcatId.replace(/-/g, '').toLowerCase() === $search.getName(newObj.category).id.replace(/-/g, '').toLowerCase()) {
                                            isSubCatMatched = true;
                                            //products
                                            prods.name = $search.getName(newObj.productname).id.replace(/-/g, '').toLowerCase() + '|' + $search.getName(newObj.productname).name;
                                            prods.catId = $search.getName(newObj.businessunit).id.replace(/-/g, '').toLowerCase();
                                            prods.subcatId = $search.getName(newObj.category).id.replace(/-/g, '').toLowerCase();

                                            //push details
                                            let ismanprodMatched = false;

                                            s.products.map(p => {
                                                if (p.name == prods.name) {
                                                    p.arry.map(pa => {

                                                        if ((newObj.url.includes("vascular") && pa.ontime == newObj.ontime) || (!newObj.url.includes("vascular") && pa.url == newObj.url)) {
                                                            ismanprodMatched = true;
                                                        }
                                                    })
                                                }
                                            });
                                            if (!ismanprodMatched) {
                                                prods.arry.push(JSON.parse(JSON.stringify(newObj)));
                                                s.products.push(prods);
                                            }
                                        }
                                        return true;
                                    })
                                    if (!isSubCatMatched) {
                                        //sub-categories
                                        subCat.name = $search.getName(newObj.category).name;
                                        subCat.subcatId = $search.getName(newObj.category).id.replace(/-/g, '').toLowerCase();
                                        subCat.catNameVal = $search.getName(newObj.businessunit).id.replace(/-/g, '').toLowerCase() + '|' + $search.getName(newObj.businessunit).name;
                                        //products
                                        prods.name = $search.getName(newObj.productname).id.replace(/-/g, '').toLowerCase() + '|' + $search.getName(newObj.productname).name;
                                        prods.catId = $search.getName(newObj.businessunit).id.replace(/-/g, '').toLowerCase();
                                        prods.subcatId = $search.getName(newObj.category).id.replace(/-/g, '').toLowerCase();
                                        //push details
                                        prods.arry.push(JSON.parse(JSON.stringify(newObj)));
                                        subCat.products.push(prods);
                                        cd.subCategories.push(subCat);
                                    }
                                }
                                return true;
                            });
                            if (!isCatMatched) {
                                //categories
                                cat.id = $search.getName(newObj.businessunit).id.replace(/-/g, '').toLowerCase();
                                cat.category = $search.getName(newObj.businessunit).id.replace(/-/g, '').toLowerCase() + '|' + $search.getName(newObj.businessunit).name;
                                //sub-categories
                                subCat.name = $search.getName(newObj.category).name;
                                subCat.subcatId = $search.getName(newObj.category).id.replace(/-/g, '').toLowerCase();
                                subCat.catNameVal = $search.getName(newObj.businessunit).id.replace(/-/g, '').toLowerCase() + '|' + $search.getName(newObj.businessunit).name;
                                //products
                                prods.name = $search.getName(newObj.productname).id.replace(/-/g, '').toLowerCase() + '|' + $search.getName(newObj.productname).name;
                                prods.catId = $search.getName(newObj.businessunit).id.replace(/-/g, '').toLowerCase();
                                prods.subcatId = $search.getName(newObj.category).id.replace(/-/g, '').toLowerCase();
                                //push details
                                prods.arry.push(JSON.parse(JSON.stringify(newObj)));
                                subCat.products.push(prods);
                                cat.subCategories.push(subCat);
                                $catDet.categories.push(cat);
                            }
                            return true;
                        }
                    }
                });
            }
        });
        return $catDet;
    }

    const $setProductCategoryDataForFav = function (obj, country, language, role) {
        let $catDetfav = {};
        $catDetfav.division = 'av';
        $catDetfav.country = country ? country : ($search.getLocalStorage('selectedCountry') ? $search.getLocalStorage('selectedCountry') : "UNITEDSTATES");
        $catDetfav.language = language ? language : ($search.getLocalStorage('curr-lang') ? $search.getLocalStorage('curr-lang') : "english");
        $catDetfav.role = role ? role.toLowerCase() : ($search.getLocalStorage('isHCP') ? $search.getLocalStorage('isHCP') : 'nhcp');
        $catDetfav.categories = [];
        const $filterText = $catDetfav.country + '/' + $catDetfav.language + '/' + $catDetfav.role;
        obj && obj.map($ct => {
            let newObj = getCategoryFromTags($ct, $filterText);
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
                $catDetfav.categories.map(cd => {
                    if (cd.id === $search.getName(newObj.category).id ||
                        cd.id.replace('-', '').toLowerCase() === $search.getName(newObj.category).id.replace('-', '').toLowerCase()) {
                        let isSubCatMatched = false;
                        isCatMatched = true;
                        cd.subCategories.map(s => {
                            if (s.subcatId === $search.getName(newObj.subcategory).id ||
                                s.subcatId.replace('-', '').toLowerCase() === $search.getName(newObj.subcategory).id.replace('-', '').toLowerCase()) {
                                isSubCatMatched = true;
                                //products
                                prods.name = $search.getName(newObj.productname).id.replace('-', '').toLowerCase() + '|' + $search.getName(newObj.productname).name;
                                prods.catId = $search.getName(newObj.category).id.replace('-', '').toLowerCase();
                                prods.subcatId = $search.getName(newObj.subcategory).id.replace('-', '').toLowerCase();

                                //push details
                                prods.arry.push(JSON.parse(JSON.stringify(newObj)));
                                s.products.push(prods);
                            }
                            return true;
                        })
                        if (!isSubCatMatched) {
                            //sub-categories
                            subCat.name = $search.getName(newObj.subcategory).name;
                            subCat.subcatId = $search.getName(newObj.subcategory).id.replace('-', '').toLowerCase();
                            subCat.catNameVal = $search.getName(newObj.category).id.replace('-', '').toLowerCase() + '|' + $search.getName(newObj.category).name;
                            //products
                            prods.name = $search.getName(newObj.productname).id.replace('-', '').toLowerCase() + '|' + $search.getName(newObj.productname).name;
                            prods.catId = $search.getName(newObj.category).id.replace('-', '').toLowerCase();
                            prods.subcatId = $search.getName(newObj.subcategory).id.replace('-', '').toLowerCase();
                            //push details
                            prods.arry.push(JSON.parse(JSON.stringify(newObj)));
                            subCat.products.push(prods);
                            cd.subCategories.push(subCat);
                        }
                    }
                    return true;
                });
                if (!isCatMatched) {
                    //categories
                    cat.id = $search.getName(newObj.category).id.replace('-', '').toLowerCase();
                    cat.category = $search.getName(newObj.category).id.replace('-', '').toLowerCase() + '|' + $search.getName(newObj.category).name;
                    if (newObj.country && newObj.isHcp && newObj.language) {
                        cat.country = newObj.country;
                        cat.language = newObj.language;
                        cat.isHcp = newObj.isHcp;
                    }
                    //sub-categories
                    subCat.name = $search.getName(newObj.subcategory).name;
                    subCat.subcatId = $search.getName(newObj.subcategory).id.replace('-', '').toLowerCase();
                    subCat.catNameVal = $search.getName(newObj.category).id.replace('-', '').toLowerCase() + '|' + $search.getName(newObj.category).name;
                    //products
                    prods.name = $search.getName(newObj.productname).id.replace('-', '').toLowerCase() + '|' + $search.getName(newObj.productname).name;
                    prods.catId = $search.getName(newObj.category).id.replace('-', '').toLowerCase();
                    prods.subcatId = $search.getName(newObj.subcategory).id.replace('-', '').toLowerCase();
                    //push details
                    prods.arry.push(JSON.parse(JSON.stringify(newObj)));
                    subCat.products.push(prods);
                    cat.subCategories.push(subCat);
                    $catDetfav.categories.push(cat);
                }
                return true;
            }
        });
        return $catDetfav;
    }

    const collectPreviousVersions = function (datas) {
        let allPrevData = [];
        datas.map(data => {
            if (!(data.url.includes("vascular")) && data.previousversions) {
                let singlePrevData = data.previousversions.split("\n");

                singlePrevData.map(singleprev => {
                    allPrevData.push(singleprev);
                })

            }
        })
        return allPrevData;
    }

    const collectPreviousDetails = function (PrevData, data) {
        let allPrevData = [];
        PrevData.map(item => {
            data.map(singleresult => {
                if (singleresult.url.includes(item)) {
                    let newprevobj = {
                        'url': singleresult.url,
                        'clickableuri': singleresult.clickableuri,
                        'ontime': singleresult.ontime,
                        'effectivebegindate': singleresult.effectivebegindate,
                        'previousversions':singleresult.previousversions
                    }
                    allPrevData.push(newprevobj);
                }
            })
        })
        return allPrevData;
    }

    const callForCategoryDetails = function ($redirectUrl, $target, $callFrom) {
        //call for ajax with parameters
        const url = $globals.productSearchURL;
        let role = $search.getLocalStorage('isHCP') ? $search.getLocalStorage('isHCP') : 'NHCP';
        let countrycode = $search.getLocalStorage('curr-country-cd');
        let langcode = $search.getLocalStorage('curr-lang');

        if ($callFrom === 'contactus') {
            countrycode = $search.getName(sessionStorage.getItem('contactCountry')).id;
            langcode = sessionStorage.getItem('contactLanguage');
            langcode = $formsManuals.getLanguageCodeManuals(langcode);
        }
        if ($callFrom === 'contactusmanuals') {
            countrycode = $search.getName(sessionStorage.getItem('contactCountry')).id;
            langcode = sessionStorage.getItem('contactLanguage');
            langcode = $formsManuals.getLanguageCodeManuals(langcode);
        }

        countrycode = countrycode ? countrycode.replace(/[^a-zA-Z0-9 ]/g, '').toUpperCase() : 'UNITEDSTATES';
        langcode = langcode ? langcode.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase() : 'english';
        role = role && (role.toUpperCase() === 'Y' || role.toUpperCase() === 'YES' || role.toUpperCase() === 'HCP' || role.toUpperCase() === 'TRUE') ? 'HCP' : 'NHCP';
        $search.toggleLoader(true);

        let upperlimit = "";
        let lowerlimit = 1;
        let totalcount = 1;
        let combinedResult = [];
        let limit = 1;

        async function makemultiplecalls() {
            try {

                for (let i = 0; i < limit; i) {
                    let singleresponse = await $.ajax({
                        url: url,
                        headers: $globalsManuals.eslHeaderTemplate,
                        type: "POST", /* or type:"GET" or type:"PUT" */
                        dataType: "json",
                        data: JSON.stringify({
                            "firstresult": lowerlimit,
                            "filters": [
                                {
                                    "tags": countrycode + '/' + langcode,
                                    "role": role === 'NHCP' ? 'NHCP' : ''
                                }
                            ],
                            "autocorrect": "false",
                            "searchtype": "sitesearch",
                            "numberofresults": upperlimit,
                            "sort": [], /* "q": "", */
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
                console.error("request failed",error);
            }
        }
        makemultiplecalls().then(async obj => {

            if (obj.length == 0) {
                $("#productCategories .m-tile-list").hide();
                $("#subCategories .m-tile-list").hide();
            }
            let newresults = obj;
            const allPrevObjs = collectPreviousVersions(newresults);
            const allPrevSet = collectPreviousDetails(allPrevObjs, newresults);
            sessionStorage.setItem("allpreviousversions", JSON.stringify(allPrevObjs));
            sessionStorage.setItem("allpreviousversionsobjects", JSON.stringify(allPrevSet));

            const categoryDetails = setProductCategoryData(newresults, countrycode, langcode, role);
            categoryDetails.categories = categoryDetails.categories.sort((a, b) => {
                if (a.category < b.category) {
                    return -1;
                }
            });
            sessionStorage.setItem('country', countrycode);
            sessionStorage.setItem('language', langcode);
            sessionStorage.setItem('role', role);
            if ($callFrom === 'contactus') {
                sessionStorage.setItem('contactUsDetails', JSON.stringify(categoryDetails));
                const $contact_category = $('label[for="contactUsCategoriesMobile"]').closest('.a-dropdown__container');
                const $contact_subCategory = $('label[for="contactUsSubCategoriesMobile"]').closest('.a-dropdown__container');
                const $contact_products = $('label[for="contactUsProducts"]').closest('.a-dropdown__container');
                if (categoryDetails && categoryDetails.categories) {
                    if ($contact_category.length) {
                        $formsManuals.initCategoryDropdownField(categoryDetails, $contact_category);
                        $formsManuals.initSubCategoryDropdownField(categoryDetails, 'default', $contact_subCategory);
                        $formsManuals.initProductsDropdownField(categoryDetails, 'default', 'default', $contact_products);

                        if ($formsManuals.isContactUsValidMobile()) {
                            $('#step2ContinueMobile').removeClass('disabled');
                            $('#step2ContinueMobile').prop('disabled', false);
                        }
                        else {
                            $('#step2ContinueMobile').addClass('disabled');
                            $('#step2ContinueMobile').prop('disabled', true);
                        }
                    }
                }

                if ($('#contactUsSearch').length) {
                    $('#searchProductData').remove();
                    $formsManuals.initSearchProductField('contactUsSearch', categoryDetails);
                }
            }
            if ($callFrom === 'contactusmanuals') {
                sessionStorage.setItem('contactUsDetails', JSON.stringify(categoryDetails));
                const contact_categoryma = $('label[for="contactUsCategories"]').closest('.a-dropdown__container');
                const contact_subCategoryma = $('label[for="contactUsSubCategories"]').closest('.a-dropdown__container');
                const contact_productsma = $('label[for="contactUsProducts"]').closest('.a-dropdown__container');
                if (categoryDetails && categoryDetails.categories) {
                    if (contact_categoryma.length) {
                        $formsManuals.initCategoryDropdownField(categoryDetails, contact_categoryma);
                        $formsManuals.initSubCategoryDropdownField(categoryDetails, 'default', contact_subCategoryma);
                        $formsManuals.initProductsDropdownField(categoryDetails, 'default', 'default', contact_productsma);

                        if ($formsManuals.isContactUsValid()) {
                            $('#step2Continue').removeClass('disabled');
                            $('#step2Continue').prop('disabled', false);
                        }
                        else {
                            $('#step2Continue').addClass('disabled');
                            $('#step2Continue').prop('disabled', true);
                        }
                    }
                }

                if ($('#contactUsSearch').length) {
                    $('#searchProductData').remove();
                    $formsManuals.initSearchProductField('contactUsSearch', categoryDetails);
                }
            }
            else if ($callFrom === 'contactus') {
                sessionStorage.setItem('contactUsDetails', JSON.stringify(categoryDetails));
                const contact_category = $('label[for="contactUsCategoriesPhysical"]').closest('.a-dropdown__container');
                const contact_subCategory = $('label[for="contactUsSubCategoriesPhysical"]').closest('.a-dropdown__container');
                const contact_products = $('label[for="contactUsProducts"]').closest('.a-dropdown__container');
                if (categoryDetails && categoryDetails.categories) {
                    if (contact_category.length) {
                        $formsManuals.initCategoryDropdownField(categoryDetails, contact_category);
                        $formsManuals.initSubCategoryDropdownField(categoryDetails, 'default', contact_subCategory);
                        $formsManuals.initProductsDropdownField(categoryDetails, 'default', 'default', contact_products);

                        if ($formsManuals.isContactUsValidPhysical()) {
                            $('#step2ContinuePhysical').removeClass('disabled');
                            $('#step2ContinuePhysical').prop('disabled', false);
                        }
                        else {
                            $('#step2ContinuePhysical').addClass('disabled');
                            $('#step2ContinuePhysical').prop('disabled', true);
                        }
                    }
                }

                if ($('#contactUsSearch').length) {
                    $('#searchProductData').remove();
                    $formsManuals.initSearchProductField('contactUsSearch', categoryDetails);
                }
            }
            else if ($callFrom === 'queryParams') {
                const productIdInQuery = sessionStorage.getItem('product');
	            deleteProductCategoryDataToDB();
	            (async () => {
                    try {
                      await setProductCategoryDataToDB(categoryDetails);
                    } catch (error) {
                      console.error('An error occurred:', error);
                    }
                })();

                let product;
                async function fetchProductDetails() {
                  try {
                    const productx = await $formsManuals.getProductDetails(productIdInQuery);
                    product = productx;
                  } catch (error) {
                    console.error('Error:', error);
                  }
                }
                
                await fetchProductDetails();
                if (product && product.tags) {
                    //look for previous versions
                    const products = $productCategoryManuals.$getAllProducts(categoryDetails);
                    const previousVersions = $search.getPdfPreviousVersions(product.versionid, product.productrevnumber, products);
                    product.language = $search.getLocalStorage('curr-lang') ? $search.getLocalStorage('curr-lang') : "English";
                    product.previousVersions = previousVersions;
                    $pdfViewer.setLastPdfOpened(product);
                    //redirect to details page
                    let details_url = $globals.detailsPageDefault ? $globals.detailsPageDefault : decodeURIComponent(product.clickableuri);
                    if (details_url.indexOf('.html') == -1 && details_url.indexOf('.pdf') == -1) {
                        details_url = details_url + '.html';
                    }
                    window.open(details_url, $target);
                }
                else {
                    $redirectUrl = "/en/errors/404.html";
                    window.open($redirectUrl, $target);
                }
            }
            else {
            		deleteProductCategoryDataToDB();
                    (async () => {
                        try {
                          await setProductCategoryDataToDB(categoryDetails);
                        } catch (error) {
                          console.error('An error occurred:', error);
                        }
                    })();
            }
            if ($productCategoryManuals.checkIfProductCategoryPage()) {
                $productCategoryManuals.initProductCategory(categoryDetails);
                $search.setRecentlyViewedItems();
            }
            if ($redirectUrl && $callFrom !== 'queryParams') {
                window.open($redirectUrl, $target);
            }
            $search.toggleLoader();
            $productCategoryManuals.$checkHistoryOfDetialsPage();
        }).catch(error => {
            $search.toggleLoader();
            $productCategoryManuals.$checkHistoryOfDetialsPage();
            throw error;
        })
    }


    const $checkHistoryOfDetialsPage = function () {
        if (sessionStorage.getItem('isHomePageEnable') && sessionStorage.getItem('activeSubcategory')) {
            if (sessionStorage.getItem('selectedCategory')) {
                $('.search__categories .a-tile__link').click();
                $('.search__subcategories .a-tile__link').click();
            }
            $('#categorySearch').show();
            $('.sub__categories_list').find('.a-link').removeClass('active');
            $('.sub__categories_list').find('.a-link').each(function () {
                if ($(this).find('.a-link__inner-text').attr('data-id') === sessionStorage.getItem('activeSubcategory')) {
                    $(this).addClass('active');
                }
            })
            $productCategoryManuals.$scrollingInsideElement(sessionStorage.getItem('activeSubcategory'));
            $productCategoryManuals.$scrollingInsideElement(sessionStorage.getItem('isHomePageEnable'));
            $productCategoryManuals.$navigateToId('categorySearch', false);
            sessionStorage.removeItem('isHomePageEnable');
            sessionStorage.removeItem('activeSubcategory');
        }
    }
    const $navigateToId = function ($id, $isAnimated) {
        if (!$id) {
            return false;
        }
        if ($isAnimated) {
            $([document.documentElement, document.body]).animate({
                scrollTop: $("#" + $id).offset().top - 100
            }, 1000);
        } else {
            $([document.documentElement, document.body]).scrollTop($("#" + $id).offset().top - 100)
        }

    }


    const $scrollingInsideElement = function ($id) {
        if (window.innerWidth < 768) {
            $productCategoryManuals.$navigateToId("categorySearch", true);
        }
        if (window.innerWidth > 767 && window.innerWidth < 1024) {
            $productCategoryManuals.$navigateToId("categorySearch", true);
        }
        let $elmnt = document.getElementById($id);
        if ($elmnt) {
            $elmnt.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    const $getAllProducts = function ($catData) {

        if (!$catData) {
            return false;
        }
        let products = [];
        $catData.categories && $catData.categories.length && $catData.categories.map(cat => {
            cat.subCategories && cat.subCategories.map(sub => {
                sub.products && sub.products.map(pr => {
                    products.push(pr.arry[0]);
                    return true;
                })
                return true;
            })
            return true;
        })

        return products;
    }

    return {
        initProductCategory: initProductCategory,
        getCategoryDetails: getCategoryDetails,
        setSubCategoryContainer: setSubCategoryContainer,
        getSubCategoryDetails: getSubCategoryDetails,
        initProductCategorySearch: initProductCategorySearch,
        checkIfProductCategoryPage: checkIfProductCategoryPage,
        setCategoryContainer: setCategoryContainer,
        callForCategoryDetails: callForCategoryDetails,
        $navigateToId: $navigateToId,
        $scrollingInsideElement: $scrollingInsideElement,
        $getAllProducts: $getAllProducts,
        setProductCategoryData: setProductCategoryData,
        getCategoryFromTags: getCategoryFromTags,
        $setProductCategoryDataForFav: $setProductCategoryDataForFav,
        $checkHistoryOfDetialsPage: $checkHistoryOfDetialsPage
    }
})();

//initialise product category with product category data
$(document).ready(function () {
    setTimeout(function () {

        //Check if product category page
        if ($productCategoryManuals.checkIfProductCategoryPage()) {
            //If author mode, load without data else load with data
            if ($search.checkIfEditorMode()) {
                $productCategoryManuals.initProductCategory();
            }
            else {

                $productCategoryManuals.callForCategoryDetails();
            }
        }

    }, 0);

});

//on click of elabeling home tile button
$(document).on('click', '#selectBusinessArea .a-tile__link', function (e) {
    e.preventDefault();
    const $url = $(this).attr('href');
    const $target = $(this).attr('target') === '_blank' ? '_blank' : '_self';
    if ($url) {
        window.open($url, $target);
    }
});

//on click of product categories tile
$(document).on('click', '#section_productBanner .m-hero__extras .a-button a', function (e) {
    e.preventDefault();
    $productCategoryManuals.$navigateToId('section-productCategories', true);
});

//adding css to suggestion box
$("#section_productBanner").parent().css({ "overflow": "visible", "z-index": "inherit" });
$("#section_searchBanner").parent().css({ "overflow": "visible", "z-index": "inherit" });

//on click of product categories tile
$(document).on('click', '.search__categories .a-tile__link',async function (e) {
    e.preventDefault();
    let $cat_clicked = '';
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
    if (sessionStorage.getItem('selectedCategory') && sessionStorage.getItem('activeSubcategory') && sessionStorage.getItem('isHomePageEnable')) {
        $cat_clicked = sessionStorage.getItem('selectedCategory');
    } else {
        $cat_clicked = $(this).find('.a-tile__title-text').text().trim();
        sessionStorage.setItem('selectedCategory', $cat_clicked);
    }
    const $category = $productCategoryManuals.getCategoryDetails($productCategories, $cat_clicked);
    $productCategoryManuals.setSubCategoryContainer($category, $cat_clicked);
    if (!(sessionStorage.getItem('isHomePageEnable') && sessionStorage.getItem('activeSubcategory'))) {
        $productCategoryManuals.$navigateToId('section-subCategories', true)
    }
    $('#categorySearch').hide();
});

//on click of product sub categories tile
$(document).on('click', '.search__subcategories .a-tile__link', async function (e) {
    e.preventDefault();
    let $cat_clicked = '';
    let $sub_cat_clicked = '';
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
    if (sessionStorage.getItem('selectedCategory') && sessionStorage.getItem('activeSubcategory') && sessionStorage.getItem('isHomePageEnable')) {
        $cat_clicked = sessionStorage.getItem('selectedCategory');
        $sub_cat_clicked = sessionStorage.getItem('activeSubcategory');
    } else {
        $cat_clicked = $(this).closest('.a-tile').attr('data-parent') ? $(this).closest('.a-tile').attr('data-parent') : '';
        $sub_cat_clicked = $(this).closest('.a-tile').attr('data-id') ? $(this).closest('.a-tile').attr('data-id') : '';
    }
    $productCategoryManuals.initProductCategorySearch($productCategories, $cat_clicked, $sub_cat_clicked);
    $('#categorySearch').show();
    if (!(sessionStorage.getItem('isHomePageEnable') && sessionStorage.getItem('activeSubcategory'))) {
        $productCategoryManuals.$navigateToId('categorySearch', true);
        $productCategoryManuals.$scrollingInsideElement($sub_cat_clicked);
    }
});

//on click show more categories
$(document).on('click', '#showMoreCategories', async function (e) {
    e.preventDefault();
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
    const $limit = $(this).attr('limit');
    const $limit_cat = (window.innerWidth < 768) ? ($('#showMoreMobile').length && $('#showMoreMobile').text() ? $('#showMoreMobile').text() : $globals.productCategoryDefaultLimitCount) :
        ((window.innerWidth > 767 && window.innerWidth < 992) ? ($('#showMoreTablet').length && $('#showMoreTablet').text() ? $('#showMoreTablet').text() : $globals.productCategoryDefaultLimitCount) :
            ($('#showMoreDesktop').length && $('#showMoreDesktop').text() ? $('#showMoreDesktop').text() : $globals.productCategoryDefaultLimitCount));
    const $pag = $search.getPaginationNumbers($catData.categories.length, $limit_cat);
    let $new_limit = null;

    if ($limit) {
        $pag.pageLists.length && $pag.pageLists.map((p, i) => {
            if (p.end == $limit) {
                if (i + 1 < $pag.pageLists.length) {
                    $new_limit = $pag.pageLists[i + 1].end;
                }
                else {
                    $new_limit = $pag.pageLists[i].end;
                }
            }
            return true;
        });
        $('#showMoreCategories').attr('limit', $new_limit);
        $productCategoryManuals.setCategoryContainer($catData, $new_limit);
        if ($new_limit === $catData.categories.length) {
            $(this).css({ 'display': 'none' });
        }
    }
});

//on click show more sub categories
$(document).on('click', '#showMoreSubCategories', async function (e) {
    e.preventDefault();
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
    const $limit = $(this).attr('limit');
    const $limit_sub_cat = (window.innerWidth < 768) ? ($('#showMoreMobileSub').length && $('#showMoreMobileSub').text() ? $('#showMoreMobileSub').text() : $globals.subCategoryDefaultLimitCount) :
        ((window.innerWidth > 767 && window.innerWidth < 992) ? ($('#showMoreTabletSub').length && $('#showMoreTabletSub').text() ? $('#showMoreTabletSub').text() : $globals.subCategoryDefaultLimitCount) :
            ($('#showMoreDesktopSub').length && $('#showMoreDesktopSub').text() ? $('#showMoreDesktopSub').text() : $globals.subCategoryDefaultLimitCount));

    let $cat_clicked = $(this).closest('#subCategories').length ? $(this).closest('#subCategories').find('.search__subcategories').eq(0).attr('data-parent') : '';
    $cat_clicked = $search.getName($cat_clicked).name.trim();
    const cat = $productCategoryManuals.getCategoryDetails($catData, $cat_clicked);

    const $pag = $search.getPaginationNumbers(cat[0].subCategories.length, $limit_sub_cat);
    let $new_limit = null;

    if ($limit) {
        $pag.pageLists.length && $pag.pageLists.map((p, i) => {
            if (p.end == $limit) {
                if (i + 1 < $pag.pageLists.length) {
                    $new_limit = $pag.pageLists[i + 1].end;
                }
                else {
                    $new_limit = $pag.pageLists[i].end;
                }
            }
            return true;
        });
        $('#showMoreSubCategories').attr('limit', $new_limit);
        $productCategoryManuals.setSubCategoryContainer(cat, $cat_clicked, $new_limit);
    }
});

//on click filtermenu inside category search in product category page
$(document).on('click', '.sub__categories_list .a-link__text', function (e) {
    e.preventDefault();
    $('.sub__categories_list').find('.a-link').removeClass('active');
    $(this).closest('.a-link').addClass('active');
    const $idNav = $(this).find('.a-link__inner-text').attr('data-id');
    if (!$idNav) {
        return false;
    }
    $productCategoryManuals.$scrollingInsideElement($idNav);
});

//on click show more recently viewed
$(document).on('click', '#showMoreRecentlyViewed', function (e) {
    e.preventDefault();
    const $recents = $search.getRecentlyViewed();
    const $limit = $(this).attr('limit');

    const $pag = $search.getPaginationNumbers($recents.length, $globals.subCategoryDefaultLimitCount);
    let $new_limit = null;

    if ($limit) {
        $pag.pageLists.length && $pag.pageLists.map((p, i) => {
            if (p.end == $limit) {
                if (i + 1 < $pag.pageLists.length) {
                    $new_limit = $pag.pageLists[i + 1].end;
                }
                else {
                    $new_limit = $pag.pageLists[i].end;
                }
            }
            return true;
        });
        $('#showMoreRecentlyViewed').attr('limit', $new_limit);
        $search.setRecentlyViewedItems($new_limit);
        if ($new_limit === $recents.length) {
            $(this).css({ 'display': 'none' });
        }
    }
});

$(document).ready(function () {
    let $current_lang = localStorage.getItem("curr-lang");
    if ($current_lang === '"Russian"' && $current_lang != "undefined" && $(window).width() >= 991) {
        $('#section_productBanner').addClass('russian_lang');
    }
    if (($current_lang === '"Greek"' || $current_lang === '"Ελληνικά"') && $current_lang != "undefined") {
        $('#section_elabelingBanner').addClass('greek_lang');
        $('#section_elabelingBanner').parent().css({ "max-height": "1030px" });
    }
});