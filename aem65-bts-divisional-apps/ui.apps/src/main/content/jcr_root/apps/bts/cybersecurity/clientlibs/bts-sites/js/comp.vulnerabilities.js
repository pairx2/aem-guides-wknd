/**
 * @module
 * @desc Vulnerabilities Module
 */

(function () {

    document.addEventListener('DOMContentLoaded', function () {
        let vulAction = $(document).find('input[name="ACTION"][value="vulnerabilities-search"]');
        let productNameField = $(document).find('.fields input[name="productName"]');
        let productNamesCheckList = $(document).find('.options .checkbox input[name="productId"]');
        let productCheckboxEle = productNamesCheckList?.parents('.checkbox');
        let userProductAccessList = localStorage.getItem('vsiProductsList');
        let appliedFilters = localStorage.getItem('vsiFilters');
        let noVsiTable = localStorage.getItem('noVsiTable');
        let statusDropdownLabelEle = $(document).find('.options ul[name="status"]').prev();

        // Check if user has access to products with VSI permission or not
        ABT.Utils.isOnPublish() && isVulnerabilitiesTabRequired();

        if (vulAction.length && ABT.Utils.isOnPublish()) {

            // Store authored placeholder as an data-atribute
            statusDropdownLabelEle.length && statusDropdownLabelEle.attr('data-placeholder', statusDropdownLabelEle.text());

            // Empty custom-table to not make API call when no filters are selected
            if (appliedFilters == null || noVsiTable !== null) {
                $('div.m-custom-table')?.empty();
                localStorage.removeItem('noVsiTable');
            }

            /* Product Name checkbox API on page load for Vulnerabilities page */
            if (productNamesCheckList.length) {
                let productsCheckboxOptionsEle = productNamesCheckList.parents('.options');
                let productNameHelpEle = productNameField.parents('.form-group.a-form-grp').find('.a-input-field--text-help');

                if (userProductAccessList == null) {

                    productsCheckboxOptionsEle.addClass('d-none');

                    ABT.Http({
                        url: ABT.Config.endpoints.VSI_METADATA,
                        method: 'POST',
                        params: { action: "getAllVsiProducts" }
                    })
                        .then(function (res) {
                            if (res.errorCode == 0 || res.errorCode == 200) {
                                generateVsiProductList(res.response, 'vsiProductsList');
                            } else {
                                localStorage.setItem('vsiProductsList', "[]");
                            }
                            productNameHelpEle.text('');
                        })
                        .catch(() => {
                            localStorage.setItem('vsiProductsList', 'error');
                            productNameHelpEle.text('Product service down, please try again later.');
                        })
                        .finally(async () => {
                            userProductAccessList = localStorage.getItem('vsiProductsList');
                            await generateProductsCheckboxes(productsCheckboxOptionsEle, userProductAccessList);
                            preFillFilters(appliedFilters, userProductAccessList, true);
                        });
                } else {
                    generateProductsCheckboxes(productsCheckboxOptionsEle, localStorage.getItem('vsiProductsList'));
                    productNameHelpEle.text('');
                }

                productNameField.length && productCheckboxEle.length && ABT.Utils.searchFilterToCheckbox(productNameField, productCheckboxEle);
                productNamesCheckList.parents('.o-form-container__element').find('button[type="reset"]').on('click', function() {
                    productCheckboxEle.find('.a-checkbox').css('display', 'inline-block');
                    $(document).find('.datepicker .input-group').removeClass('selected active');
                    setTimeout(function() {
                        statusDropdownLabelEle.length && statusDropdownLabelEle.text(statusDropdownLabelEle.attr('data-placeholder'));
                    },300);
                });
            }

            /* Check for vsiFilters localStorage value and fill the form fields based on stored data */
            preFillFilters(appliedFilters, userProductAccessList, false);

            /* Hide/Show customtabe component based on localstorage visFilters value and also remove vsiFilter value on page load */
            if (appliedFilters !== null && noVsiTable == null && typeof JSON.parse(appliedFilters) == 'object') {
                let vsiLoadingLayout = $('#vsi-loading').parent();
                let vsiDataLayout = $('#vsi-data').parent();
                let vsiErrorLayout = $('#vsi-error').parent();
                vsiDataLayout.addClass('table__hidden').removeClass('bts-d-none');
                vsiLoadingLayout.removeClass('bts-d-none');
                setTimeout(() => {
                    ABT.Utils.scrollPageTo(vsiDataLayout);
                }, 500);

                let reCheckLayout = setInterval(function () {
                    let vsiCustomTable = vsiDataLayout.find('section.m-custom-table');
                    if (vsiCustomTable.hasClass('m-custom-table__content--complete')) {
                        clearInterval(reCheckLayout);
                        vsiLoadingLayout.addClass('d-none');
                        vsiDataLayout.removeClass('table__hidden');
                        localStorage.removeItem('vsiFilters');
                        ABT.Utils.scrollPageTo(vsiDataLayout);
                    } else if (vsiCustomTable.hasClass('m-custom-table__content--error')) {
                        clearInterval(reCheckLayout);
                        vsiLoadingLayout.addClass('d-none');
                        vsiErrorLayout.removeClass('bts-d-none');
                        ABT.Utils.scrollPageTo(vsiDataLayout);
                    }
                }, 500);
            }
        }
    });

    /**
     * @function
     * @summary: Function to generate checkboxes based on checkbox template provided
     * @param: checkboxEle - jQuery<HTMLElement> -> Checkbox template element
     * @param: productList - string -> string which contains productIds and respective product names
     */
    function generateProductsCheckboxes(checkboxEle, productsList) {
        if (productsList == 'error') {
            hideCheckboxAndSearchFields(checkboxEle);
        } else {
            let products = JSON.parse(productsList);

            if (products.length == 0) {
                hideCheckboxAndSearchFields(checkboxEle);
            } else {
                let checkboxReqEle = checkboxEle.find('.checkbox--text-require');
                checkboxEle.find('.a-checkbox .a-checkbox__label').attr('for', `${checkboxEle.find('.a-checkbox .a-checkbox__label').attr('for')}-{productId}`);
                checkboxEle.find('.a-checkbox .a-checkbox__input').attr('id', `${checkboxEle.find('.a-checkbox .a-checkbox__input').attr('id')}-{productId}`).attr('value', '{productId}');
                let checkBoxTemplate = checkboxEle.find('.a-checkbox')[0].outerHTML;

                for (const product of products) {
                    let checkboxTempClone = checkBoxTemplate;
                    const matches = checkboxTempClone.match(/\{(.*?)\}/gm);
                    const uniqueMatches = Array.from(new Set(matches));

                    uniqueMatches.forEach(match => {
                        const key = match.replace(/\{|\}/g, '');
                        checkboxTempClone = checkboxTempClone.replaceAll(match, product[key]);
                    });

                    $(checkboxTempClone).insertBefore(checkboxReqEle);
                }
                checkboxEle.find('.a-checkbox:nth-of-type(1)')?.addClass('d-none');
                checkboxEle.removeClass('d-none');
            }
        }
    }

    /**
     * @function
     * @summary: Function to apply prefilters for vulnerabilty filters
     * @param: appliedFilters - string -> string which contains all the prefilters from localstorage
     * @param: productList - string -> string which contains productIds and respective product names
     * @param: checkboxFilterOnly - Boolean -> Whether to prefilter based on checkboxes only
     */
    function preFillFilters(appliedFilters, productList, checkboxFilterOnly) {
        if (appliedFilters !== null && appliedFilters.length) {
            appliedFilters = JSON.parse(appliedFilters);
            let filterTabs = $(document).find('.tabs .a-tabs__content');
            let tabFound = false;

            !checkboxFilterOnly && filterTabs.find('.fields .a-input-control').each(function () {
                let fieldName = $(this).attr('name');
                if (appliedFilters[fieldName]?.length) {
                    $(this).val(appliedFilters[fieldName]);
                    !tabFound && $(this).parents('.a-tabs__tab-pane.tab-pane').attr('data-dirty', 'true');
                }
            });

            !checkboxFilterOnly && filterTabs.find('.datepicker input[class*="a-date-picker__input"]').each(function () {
                let fieldName = $(this).attr('name');
                if (appliedFilters[fieldName]?.length) {
                    $(this).val(appliedFilters[fieldName]).parents('.input-group').addClass('selected');
                    $(this).hasClass('a-date-picker__input-end') && setTimeout(() => $(this).focus().blur(), 200);
                    !tabFound && $(this).parents('.a-tabs__tab-pane.tab-pane').attr('data-dirty', 'true');
                }
            });

            !checkboxFilterOnly && filterTabs.find('.options .drop-down').each(function () {
                $(this).find('.a-dropdown__menu').each(function () {
                    let fieldName = $(this).attr('name');
                    setTimeout(() => {
                        $(this).find(`li[data-optionvalue="${appliedFilters[fieldName]}"]`)?.click().parents('.a-dropdown__field').removeClass('active');
                        window.scrollTo(0, 0);
                    }, 100);
                    !tabFound && $(this).parents('.a-tabs__tab-pane.tab-pane').attr('data-dirty', 'true');
                    return false;
                });
            });

            filterTabs.find('.options .checkbox').each(function () {
                let fieldName = $(this).find('.a-checkbox__input').attr('name');
                let savedVal = appliedFilters[fieldName];
                let isCheckboxSelected = false;
                if (productList) {
                    if (typeof savedVal == 'string' && savedVal?.indexOf(',') > -1) savedVal = savedVal.split(',');
                    if (typeof savedVal == 'string' && savedVal.length > 0) {
                        let checkboxInput = $(this).find(`.a-checkbox__input[value="${savedVal}"]`);
                        if (!checkboxInput?.is(':checked')) {
                            checkboxInput[0].click();
                            !isCheckboxSelected && (isCheckboxSelected = true);
                        }
                    } else if (typeof savedVal == 'object') {
                        for (const id of savedVal) {
                            let checkboxInput = $(this).find(`.a-checkbox__input[value="${id}"]`);
                            if (!checkboxInput?.is(':checked')) {
                                checkboxInput[0].click();
                                !isCheckboxSelected && (isCheckboxSelected = true);
                            }
                        }
                    }
                    window.scrollTo(0, 0);
                    !tabFound && isCheckboxSelected && $(this).parents('.a-tabs__tab-pane.tab-pane').attr('data-dirty', 'true');
                }
            });

            let tabToBeSelected = $(document).find('.a-tabs__tab-pane.tab-pane[data-dirty="true"]');
            if (tabToBeSelected.length && !tabToBeSelected.hasClass('cmp-tabs__tabpanel--active')) {
                let tabId = tabToBeSelected.attr('id');
                setTimeout(() => {
                    $(`#${tabId}-tab`)[0].click();
                }, 50);
            }
        }
    }

    /**
     * @function
     * @summary: Function to Hide checkbox component and associated filed component used as search of checkbox items, also delete the productList localstorage item
     * @param: checkboxEle - jQuery<HTMLElement>
     */
    function hideCheckboxAndSearchFields(checkboxEle) {
        checkboxEle.addClass('d-none');
        $(document).find('.fields:has(input[name="productName"])').addClass('d-none');
        localStorage.removeItem('vsiProductsList');
    }

    /**
     * @function
     * @summary: Function to determine if vulnerabilities navigation link to be displayed or not
     */
    function isVulnerabilitiesTabRequired() {
        let vsiProductsList = localStorage.getItem('vsiProductsList');
        let vsiNavLink = $('#vsi-nav-link');
        if (vsiProductsList == null && vsiNavLink.length) {
            ABT.Http({
                url: ABT.Config.endpoints.VSI_METADATA,
                method: 'POST',
                params: { action: "getAllVsiProducts" }
            })
                .then(function (res) {
                    if (res.errorCode == 0 || res.errorCode == 200) {
                        generateVsiProductList(res.response, 'vsiProductsList');
                        if (res.response?.length) {
                            vsiNavLink.parents('.m-mega-menu__mobile-item-wrapper').removeClass('d-none');
                        }
                    }
                })
                .then(() => {
                    if (window.location.pathname == vsiNavLink?.attr('href') && localStorage.getItem('vsiProductsList').indexOf('[]') == 0) {
                        location.assign(ABT.Config.aemConfig.HOME_PAGE_URL);
                    }
                });
        } else if ((vsiProductsList?.length && JSON.parse(vsiProductsList).length)) {
            vsiNavLink.parents('.m-mega-menu__mobile-item-wrapper').removeClass('d-none');
        }

        if (window.location.pathname == vsiNavLink?.attr('href') && vsiProductsList?.indexOf('[]') == 0) {
            location.assign(ABT.Config.aemConfig.HOME_PAGE_URL);
        }
    }

    /**
     * @function
     * @summary: Function to extract VSI products list and store it in localstorage
     * @param: products - Object[] - products list that contains product ID and Name
     * @param: localStorageKey - String - Key name with which products should be stored in localstorage
     */
    function generateVsiProductList(products, localStorageKey) {
        if (products?.length > 0) {
            let productsList = [];
            for (const product of products) {
                productsList.push({
                    productId: product.productId,
                    productName: product.productName
                });
            }
            localStorage.setItem(localStorageKey, JSON.stringify(productsList));
        } else {
            localStorage.setItem(localStorageKey, "[]");
        }
    }
})();
