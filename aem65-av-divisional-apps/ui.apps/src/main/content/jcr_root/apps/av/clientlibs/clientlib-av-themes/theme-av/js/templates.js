
const $templates = (function () {

    const searchTokenIcons = function (iconClass, href, customClass, text) {

        if (iconClass.split(" ").length == 3) {
            let tooltipval = "";
            if (customClass == "add-token added-to-fav") {
                tooltipval = $('[name=add-token]').val();
            } else {
                tooltipval = $('[name=' + customClass + ']').val();
            }
            return `<a href="${href}" class="search_token_icon_link ${customClass}" title="${tooltipval ? tooltipval : ''}">
                    <span class="abt-icon ${iconClass}"></span>
                    <span class="search_token_icon_text">${text ? text : ''}</span>
                </a>`
        }
        return ''
    }

    const searchToken = function (isShare, isDownload, isFavorite, isFavoriteSelected, isPrint) {

        const downloadIcon = $('#downloadProduct').length && $('#downloadProduct').find('em').length ?
            $('#downloadProduct').find('em').attr('class') : 'abt-icon abt-icon-only';
        const printIcon = $('#printProduct').length && $('#printProduct').find('em').length ?
            $('#printProduct').find('em').attr('class') : 'abt-icon abt-icon-only';
        const shareIcon = $('#shareProduct').length && $('#shareProduct').find('em').length ?
            $('#shareProduct').find('em').attr('class') : 'abt-icon abt-icon-only';
        const favoriteIcon = $('#favoriteProduct').length && $('#favoriteProduct').find('em').length ?
            $('#favoriteProduct').find('em').attr('class') : 'abt-icon abt-icon-only';
        const addedFavoriteProduct = $('#addedFavouriteProduct').length && $('#addedFavouriteProduct').find('em').length ?
            $('#addedFavouriteProduct').find('em').attr('class') : 'abt-icon abt-icon-only';
        const iconClasses = {
            share: shareIcon,
            download: downloadIcon,
            favorite: favoriteIcon,
            favariteSelected: addedFavoriteProduct,
            print: printIcon
        }
        if (window.location.href.indexOf("manuals") != -1 && $('#externalLink').length) {
            return `<div class="search_token clearfix">
                    <div class="row">
                        <div class="search_token_details col-md-7 col-xs-12 col-sm-12">
                            <a href='javascript:;' class="seach_category_url">
                                <p class="search_category_head"></p>
                                <p class="search_token_subcategory d-none"></p>
                                <h2 class="search_category_title"></h2>
                                  <p class="search_category_desc">
                                    <span class="first"> </span>
                                    <span class="more-manuals">More</span>
                                    <span class="d-none search_category_desc-hide "></span>
                                  </p>

                                   <p class="search_category_model">
                                    <span class="first"> </span>
                                    <span class="more-manuals">More</span>
                                    <span class="d-none search_category_desc-hide "></span>
                                  </p>
                                   <p class="eifu-revision">Eifu-id type:</p>
                                    <p class="revision">Revision type:<span class="revision-type">hello </span>
                                    </p>
                                    <p class="d-none prev-versions-hide "></p>
                            </a>
                        </div>
                        <div class="search_token_options text-right col-md-5 col-xs-12 col-sm-12">
                            <p class="search_token_date"></p>
                            <p class="token_options">
                                ${isDownload ? searchTokenIcons(iconClasses.download, 'javascript:;', 'download-token') : ''}
                                ${isPrint ? searchTokenIcons(iconClasses.print, 'javascript:;', 'print-token') : ''}
                                ${isShare ? searchTokenIcons(iconClasses.share, 'javascript:;', 'share-token') : ''}
                                ${isFavorite ? searchTokenIcons(iconClasses.favorite, 'javascript:;', 'add-token') : ''}
                                ${isFavoriteSelected ? searchTokenIcons(iconClasses.favariteSelected, 'javascript:;', 'add-token added-to-fav') : ''}
                            </p>
                        </div>
                    </div>
                </div>`
        }
        else {
            return `<div class="search_token clearfix">
                    <div class="row">
                        <div class="search_token_details col-md-7 col-xs-12 col-sm-12">
                            <a href='javascript:;' class="seach_category_url">
                                <p class="search_category_head"></p>
                                <p class="search_token_subcategory d-none"></p>
                                <h2 class="search_category_title"></h2>
                                <p class="search_category_desc"></p>
                            </a>
                        </div>
                        <div class="search_token_options text-right col-md-5 col-xs-12 col-sm-12">
                            <p class="search_token_date"></p>
                            <p class="token_options">
                                ${isDownload ? searchTokenIcons(iconClasses.download, 'javascript:;', 'download-token') : ''}
                                ${isPrint ? searchTokenIcons(iconClasses.print, 'javascript:;', 'print-token') : ''}
                                ${isShare ? searchTokenIcons(iconClasses.share, 'javascript:;', 'share-token') : ''}
                                ${isFavorite ? searchTokenIcons(iconClasses.favorite, 'javascript:;', 'add-token') : ''}
                                ${isFavoriteSelected ? searchTokenIcons(iconClasses.favariteSelected, 'javascript:;', 'add-token added-to-fav') : ''}
                            </p>
                        </div>
                    </div>
                </div>`
        }
    }

    const categorySearchToken = function () {
        return `<div class="sub_categories_product_list">
                    <p class="sub_category_title"></p>
                    <div class="iterated_category_tokens"></div>
                </div>`
    }

    const searchResultContainer = function () {
        return `<div class="sub_categories_product_list">
                    <div class="iterated_category_tokens"></div>
                </div>`
    }

    const mobileFilterContainer = function (filterText) {
        return `<div class="mobile_filters_list d-none">
                    <div class="close-filter">
                        <span class="text-left">${filterText ? filterText : 'Filters'}</span>
                        <a href="javascript:;" class="text-right"> 
                            <span class="abt-icon abt-icon-cross"></span>
                        </a>
                    </div>
                    <div class="mobile_filters"></div>
                </div>`
    }

    const fieldsetOptionsContainer = function () {
        return `<select class="fieldset_option_container">
                    <option class="fieldset_option_list_default" value="">Select</option>
                </select>`
    }

    const inputDatasetContainer = function () {
        return `<datalist class="dataset_option_container" id="searchProductData">
                </datalist>`
    }

    const eifuLoader = function () {
        return `<div id="eifuLoader">
                    <div class="loader-container">
                        <div class="loader"></div>
                    </div>                    
                </div>`
    }

    const isExternalLink = function (url) {
        const tmp = document.createElement('a');
        tmp.href = url;
        return tmp.host !== window.location.host;
    }

    return {
        searchToken: searchToken,
        categorySearchToken: categorySearchToken,
        searchResultContainer: searchResultContainer,
        mobileFilterContainer: mobileFilterContainer,
        fieldsetOptionsContainer: fieldsetOptionsContainer,
        inputDatasetContainer: inputDatasetContainer,
        eifuLoader: eifuLoader,
        isExternalLink: isExternalLink
    }

})();