const $formsManuals = (function () {


    const setLanguageCountryCode = function ($data) {
        let $languagecode = {};
        $data.map(($countrypair) => {
            $languagecode[$countrypair.value] = $countrypair.key;
        });
        return $languagecode;
    }

    //set country language data for eifu to be used further
    const $setLanguageCountryData = function ($data) {
        if (!$data) {
            return false;
        }
        let $languagesArr = [];

        $data.length && $data.map(dt => {
            let obj = {
                code: null,
                country: null,
                languages: []
            };
            let langObj = {
                language: null
            };
            let $isMatched = false;
            $languagesArr.map(lg => {
                let cntry = $search.getName(dt.key).name && $search.getName(dt.key).name.split(' ');
                if (cntry && cntry.length > 1 && cntry[0] === dt.parentKey) {
                    cntry = cntry.slice(1, cntry.length).join(" ");
                }
                else {
                    cntry = cntry.join(" ");
                }

                if ($search.getName(lg.country).id === $search.getName(cntry).id) {
                    langObj.language = $search.getName(dt.value).name;
                    lg.languages.push(langObj);
                    $isMatched = true;
                    return;
                }
                return true;
            })
            if (!$isMatched) {
                let country = $search.getName(dt.key).name && $search.getName(dt.key).name.split(' ');
                if (country && country.length > 1 && country[0] === dt.parentKey) {
                    country = country.slice(1, country.length).join(" ");
                }
                else {
                    country = country.join(" ");
                }
                obj.code = $search.getName(dt.parentKey).id ? $search.getName(dt.parentKey).id : $search.getName(dt.key).id;
                obj.country = country;
                langObj.language = $search.getName(dt.value).name;
                obj.languages.push(langObj);
                $languagesArr.push(obj);
            }
            return true;
        });
        $languagesArr = $languagesArr.sort(GetSortOrder("country"));
        return $languagesArr;
    }
    //get language details
    //to be called once on initiation
    const $getCountryLanguageData = function () {
        const $lang = $search.getLocalStorage('$languages');
        if (!$lang.length) {
            //call esl service here and get languages
            const url = $globals.countryLanguageBaseURL && $globals.countryLanguageQueryParam ? $globals.countryLanguageBaseURL + "?" + $globals.countryLanguageQueryParam : $globals.countryLanguageDefaultURL;
            $.ajax({
                url: url,
                headers: $globals.eslCountryLangHeaderTemplate,
                type: "POST", /* or type:"GET" or type:"PUT" */
                dataType: "json",
                data: {
                },
                success: function (obj) {
                    const dt = $setLanguageCountryData(obj.response);
                    $search.setLocalStorage('languages', dt);
                    initForms();
                },
                error: function () {
                    console.log("error fetching country data!!");
                }
            });

        }
    }

    const getCountryLanguageCode = function () {
        const $langcode = $search.getLocalStorage('languagescode');
        if (!(Object.keys($langcode).length)) {
            //call esl service here and get languages
            const $url = $globals.countryLanguageBaseURL && $globals.countryLanguageQueryParam ? $globals.countryLanguageBaseURL + "?" + $globals.countryLanguageQueryParamManuals : $globals.countryLanguageDefaultURL;
            $.ajax({
                url: $url,
                headers: $globals.eslCountryLangHeaderTemplate,
                type: "POST", /* or type:"GET" or type:"PUT" */
                dataType: "json",
                data: {
                },
                success: function ($obj) {
                    const ct = setLanguageCountryCode($obj.response);
                    $search.setLocalStorage('languagescode', ct);
                },
                error: function () {
                    console.log("error fetching country data!!");
                }
            });
        }
    }


    //filter details using country code
    const getDetailsByCode = function ($langArry, $code) {
        if (!$langArry) {
            return false;
        }
        return $langArry.find(o => o.code === $code);
    }

    //initiate country input from JSON
    const initCountryField = function ($langArry, $parent) {
        let $listCon = $templates.fieldsetOptionsContainer();
        if ($listCon.length) {
            $listCon = $.parseHTML($listCon);
            const $optionsCountry = $($listCon).clone();
            if ($parent) {
                $($parent).find('.country-option-link').remove();
            }

            let $optionDef = `<option class="country-option-link"
                                data-country="${$search.getName($globals.defaultCountry).name}"
                                data-country-cd="${$globals.defaultCountryCode}"
                                value="${$globals.defaultCountryCode ? $globals.defaultCountryCode : $search.getName($globals.defaultCountryCode).id}">
                                    ${$globals.defaultCountryCode ? $globals.defaultCountryCode + ' ' + $search.getName($globals.defaultCountry).name : $search.getName($globals.defaultCountry).name}
                            </option>`
            $optionDef = $.parseHTML($optionDef);
            $($optionDef).appendTo($optionsCountry);

            $langArry && $langArry.map((op) => {
                if (op.code != $globals.defaultCountryCode) {
                    let $option = `<option class="country-option-link"
                                        data-country="${$search.getName(op.country).name}"
                                        data-country-cd="${op.code}"
                                        value="${op.code ? op.code : $search.getName(op.country).id}">
                                            ${op.code !== $search.getName(op.country).id ? op.code + ' ' + $search.getName(op.country).name : $search.getName(op.country).name}
                                    </option>`
                    $option = $.parseHTML($option);
                    $($option).appendTo($optionsCountry);
                }
                return true;
            });
            if ($parent) {
                let $title = $parent.find('.a-dropdown__title').text();
                $parent.find('.a-dropdown__field').addClass('d-none');
                $parent.find('.fieldset_option_container').remove();
                $parent.append($optionsCountry);
                $title = $title.split('*')[0];
                $parent.find('.fieldset_option_list_default').text($title ? $title : $globals.countryDefaultText);
            }
        }
    }

    //initiate language input from JSON
    const initLanguageField = function ($langArry, $code, $parent) {
        let $listCon = $templates.fieldsetOptionsContainer();
        if ($listCon.length) {
            $listCon = $.parseHTML($listCon);
            const $optionsLanguage = $($listCon).clone();
            if ($parent) {
                $parent.find('.language-option-link').remove();
            }

            let $langDet = getDetailsByCode($langArry, $code);
            if ($langDet && $langDet.languages) {
                $langDet.languages.map((op) => {
                    let $option = `<option class="language-option-link"
                                        value="${op.language}">${$search.getName(op.language).name}
                                    </option>`
                    $option = $.parseHTML($option);
                    if ($parent.find('.fieldset_option_container').length) {
                        $($option).appendTo($parent.find('.fieldset_option_container'));
                    }
                    else {
                        $($option).appendTo($optionsLanguage);
                    }
                    return true;
                });
            }
            if ($parent) {
                let $title = $parent.find('.a-dropdown__title').text();
                $parent.find('.a-dropdown__field').addClass('d-none');
                if (!$parent.find('.fieldset_option_container').length) {
                    $parent.append($optionsLanguage);
                }
                $title = $title.split('*')[0];
                $parent.find('.fieldset_option_list_default').text($title ? $title : $globals.languageDefaultText);
            }
        }
    }

    //get language code for the language selected
    const getLanguageCode = function ($language) {
        let $langCodes = $('#languagesList').val() ? JSON.parse($('#languagesList').val()) : $globals.languagesList;
        const $code = $langCodes[$language] ? $langCodes[$language] : $globals.defaultLanguage;
        return $code;
    }

    const getLanguageCodeManuals = function ($language) {
        let $langCodes = $search.getLocalStorage('languagescode');
        const $code = $langCodes[$language] ? $langCodes[$language] : $globals.defaultLanguage;
        return $code;
    }
    const getLanguageManuals = function ($code) {
        let $langCodes = $search.getLocalStorage('languagescode');
        let $lang = Object.entries($langCodes).filter(([$key, $value]) => {
            if ($value === $code) {
                return $key;
            }
        })
        return $lang;
    }

    const validateElabelingForm = function () {
        const $elabeling_country = $('label[for="elabelingCountries"]').closest('.a-dropdown__container').find('select');
        const $elabeling_languages = $('label[for="elabelingLanguages"]').closest('.a-dropdown__container').find('select');
        const $elabeling_isHCP = $('#elabelingHCPManuals-options').find('.a-radio--selected').find('input');
        const $elabeling_isHCPManual = $('#elabelingHCPManuals-options');

        let $isFormValid = true;

        if (!$elabeling_country.length || !$elabeling_languages.length || !$elabeling_isHCP) {
            return false;
        }
        if (!$($elabeling_country).find('option:selected').val() && $($elabeling_country).closest('.a-dropdown').find('.a-input-field--text-require').length) {
            $($elabeling_country).closest('.a-dropdown').find('.a-input-field--text-require').css({ 'display': 'block' });
            $($elabeling_country).css({ 'background-color': $globals.fieldErrorBackground });
            $isFormValid = false;
        }
        if (!$($elabeling_languages).find('option:selected').val() && $($elabeling_languages).closest('.a-dropdown').find('.a-input-field--text-require').length) {
            $($elabeling_languages).closest('.a-dropdown').find('.a-input-field--text-require').css({ 'display': 'block' });
            $($elabeling_languages).css({ 'background-color': $globals.fieldErrorBackground });
            $isFormValid = false;
        }

        if (!$($elabeling_isHCPManual).find('input[name="hcpQuestion"]:checked').length && $($elabeling_isHCPManual).find('.radio--text-require').length) {
            $($elabeling_isHCPManual).closest('.radio').find('.radio--text-require').css({ 'display': 'block' });
            $isFormValid = false;
        }


        if ($isFormValid) {
            $search.setLocalStorage('isHCP', $($elabeling_isHCPManual).find('input[name="hcpQuestion"]:checked').val());
            $search.setLocalStorage('curr-country-cd', $($elabeling_country).find('option:selected').val());
            $search.setLocalStorage('curr-country', $($elabeling_country).find('option:selected').val());
            let lang = $($elabeling_languages).find('option:selected').val();
            let $langcode = $formsManuals.getLanguageCodeManuals(lang);
            $search.setLocalStorage('curr-lang', $langcode);
        }

        return $isFormValid;
    }

    const validateHeaderForm = function () {
        const $modal_country = $('.lang-search-country fieldset.drop-down').find('select');
        const $modal_languages = $('.lang-search-language fieldset.drop-down').find('select');
        let $isFormValid = true;

        if (!$modal_country.length || !$modal_languages.length) {
            return false;
        }
        if (!$($modal_country).find('option:selected').val() && $($modal_country).closest('.a-dropdown').find('.a-input-field--text-require').length) {
            $($modal_country).css({ 'background-color': $globals.fieldErrorBackground });
            $($modal_country).closest('.a-dropdown').find('.a-input-field--text-require').css({ 'display': 'block' });
            $isFormValid = false;
        }
        if (!$($modal_languages).find('option:selected').val() && $($modal_languages).closest('.a-dropdown').find('.a-input-field--text-require').length) {
            $($modal_languages).css({ 'background-color': $globals.fieldErrorBackground });
            $($modal_languages).closest('.a-dropdown').find('.a-input-field--text-require').css({ 'display': 'block' });
            $isFormValid = false;
        }

        if ($isFormValid) {
            $search.setLocalStorage('curr-country-cd', $($modal_country).find('option:selected').val());
            $search.setLocalStorage('curr-country', $($modal_country).find('option:selected').val());
            let lang = $($elabeling_languages).find('option:selected').val();
            let $langcode = $formsManuals.getLanguageCodeManuals(lang);
            $search.setLocalStorage('curr-lang', $langcode);
        }

        return $isFormValid;
    }

    //initiate category dropdown from JSON
    const initCategoryDropdownField = function ($catArry, $parent) {
        let $listCon = $templates.fieldsetOptionsContainer();
        if ($listCon.length) {
            $listCon = $.parseHTML($listCon);
            const optionsCat = $($listCon).clone();
            if ($parent) {
                $($parent).find('.category-option-link').remove();
            }
            $catArry && $catArry.categories && $catArry.categories.map((op) => {
                let $option = `<option class="category-option-link"
                                    data-cat="${$search.getName(op.category).name}"
                                    value="${op.id}">${$search.getName(op.category).name}
                                </option>`
                $option = $.parseHTML($option);
                $($option).appendTo(optionsCat);
                return true;
            });
            if ($parent) {
                let $title = $parent.find('.a-dropdown__title').text();
                $parent.find('.a-dropdown__field').addClass('d-none');
                $parent.find('.fieldset_option_container').remove();
                $parent.append(optionsCat);
                $title = $title.split('*')[0];
                $parent.find('.fieldset_option_list_default').text($title ? $title : $globals.categoryDefaultText);
            }
        }
    }

    //initiate sub category drop down from JSON
    const initSubCategoryDropdownField = function ($catArry, $code, $parent) {
        let $listCon = $templates.fieldsetOptionsContainer();
        if ($listCon.length) {
            $listCon = $.parseHTML($listCon);
            const $optionsSubCat = $($listCon).clone();
            if ($parent) {
                $parent.find('.sub-cat-option-link').remove();
            }

            const $sub = $productCategoryManuals.getCategoryDetails($catArry, $code);
            if ($sub && $sub.length && $sub[0].subCategories) {

                let $products = [];
                $sub[0].subCategories.map((op) => {

                    let $isMatched = false;
                    $products.length && $products.map(p => {
                        if (p === $search.getName(op.name).name) {
                            $isMatched = true;
                        }
                        return true;
                    })
                    if (!$isMatched) {

                        $products.push($search.getName(op.name).name);
                        let $option = `<option class="sub-cat-option-link"
                                value="${$search.getName(op.subcatId).id}"
                                data-relatedresource="${$search.getName(op.products[0].arry[0].relatedresource).name}">${$search.getName(op.name).name}
                            </option>`
                        $option = $.parseHTML($option);
                        if ($parent.find('.fieldset_option_container').length) {
                            $($option).appendTo($($parent).find('.fieldset_option_container'));
                        }
                        else {
                            $($option).appendTo($optionsSubCat);
                        }
                    }

                    return true;
                });
            }
            if ($parent) {
                let $title = $parent.find('.a-dropdown__title').text();
                $parent.find('.a-dropdown__field').addClass('d-none');
                if (!$parent.find('.fieldset_option_container').length) {
                    $parent.append($optionsSubCat);
                }
                $title = $title.split('*')[0];
                $parent.find('.fieldset_option_list_default').text($title ? $title : $globals.subCategoryDefaultText);
                if ($code === 'default') {
                    $parent.find('select').attr('disabled', true);
                    $parent.find('.a-dropdown__title').addClass('d-none');
                }
                else {
                    $parent.find('select').removeAttr('disabled');
                    $parent.find('.a-dropdown__title').removeClass('d-none');
                }
            }
        }
    }

    //initiate $products drop down from JSON
    const initProductsDropdownField = function ($catArry, $cat, $subCat, $parent) {
        let $listCon = $templates.fieldsetOptionsContainer();
        if ($listCon.length) {
            $listCon = $.parseHTML($listCon);
            const $optionsProducts = $($listCon).clone();
            if ($parent) {
                $parent.find('.product-option-link').remove();
            }

            const sub = $productCategoryManuals.getSubCategoryDetails($catArry, $cat, $subCat);
            let $products = [];
            if (sub && sub.length && sub[0].$products) {

                sub[0].$products.map((op) => {

                    let $isMatched = false;
                    $products.length && $products.map(p => {
                        if (p === $search.getName(op.arry[0].productname).name) {
                            $isMatched = true;
                        }
                        return true;
                    })
                    if (!$isMatched) {
                        $products.push($search.getName(op.arry[0].productname).name);
                        let $option = `<option class="product-option-link"
                                value="${$search.getName(op.arry[0].productname).id}"
                                data-relatedresource="${$search.getName(op.arry[0].relatedresource).name}">${$search.getName(op.arry[0].productname).name}
                            </option>`
                        $option = $.parseHTML($option);
                        if ($parent.find('.fieldset_option_container').length) {
                            $($option).appendTo($($parent).find('.fieldset_option_container'));
                        }
                        else {
                            $($option).appendTo($optionsProducts);
                        }
                    }
                    return true;
                });
            }
            if ($parent) {
                let $title = $parent.find('.a-dropdown__title').text();
                $parent.find('.a-dropdown__field').addClass('d-none');
                if (!$parent.find('.fieldset_option_container').length) {
                    $parent.append($optionsProducts);
                }
                $title = $title.split('*')[0];
                $parent.find('.fieldset_option_list_default').text($title ? $title : $globals.productsDefaultText);
                if ($cat === 'default' || $subCat === 'default') {
                    $parent.find('select').attr('disabled', true);
                    $parent.find('.a-dropdown__title').addClass('d-none');
                }
                else {
                    $parent.find('select').removeAttr('disabled');
                    $parent.find('.a-dropdown__title').removeClass('d-none');
                }
            }
        }
    }

    //initialise search product input
    const initSearchProductField = function ($inp, $catData) {
        let $listCon = $templates.inputDatasetContainer();
        if ($listCon.length) {
            $listCon = $.parseHTML($listCon);
            const $optionsProducts = $($listCon).clone();

            const $products = $productCategoryManuals.$getAllProducts($catData);
            let $uniqueProd = [];
            $products.map(op => {
                let $isMatched = false;
                $uniqueProd.length && $uniqueProd.map(p => {
                    if (p === $search.getName(op.productname).name) {
                        $isMatched = true;
                    }
                    return true;
                });
                if (!$isMatched) {
                    $uniqueProd.push($search.getName(op.productname).name);
                    let $option = `<a class="product-search-link" href="javascript:;"
                                        data-category="${$search.getName(op.category).id}"
                                        data-subCategory="${$search.getName(op.subcategory).id}"
                                        data-relatedresource="${$search.getName(op.relatedresource).name}"
                                        data-product="${$search.getName(op.productname).id}"
                                        data-product-name="${$search.getName(op.productname).name}">${$search.getName(op.productname).name}
                                    </a>`
                    $option = $.parseHTML($option);
                    $($option).appendTo($optionsProducts);
                }
                return true;
            })
            $('#' + $inp).closest('.form-group').append($optionsProducts);
        }
    }

    const filterProductInSearch = function ($inp, $dropdown) {
        var $input, $filter, $div, $a, i;
        $input = document.getElementById($inp);
        $filter = $input.value.toUpperCase();
        $div = document.getElementById($dropdown);
        $a = $div && $div.getElementsByTagName("a");
        if ($a && $a.length) {
            for (i = 0; i < $a.length; i++) {
                let $txtValue = $a[i].getAttribute('data-product-name');
                if ($txtValue.toUpperCase().indexOf($filter) > -1) {
                    const $selected = getFilterTextBold($txtValue, $input.value);
                    $a[i].innerHTML = $selected;
                    $a[i].style.display = "";
                } else {
                    $a[i].style.display = "none";
                }
            }
        }
    }

    const getFilterTextBold = function ($str, $filter) {
        const $searchLen = $filter.length;
        const $searchIndex = $str.toUpperCase().indexOf($filter.toUpperCase());
        const $startInd = $searchIndex > 0 ? $searchIndex : 0;
        const $startText = $str.substr(0, $searchIndex);
        const $endText = $str.slice(($startInd + $searchLen));
        const $filterText = $str.substr($searchIndex, $searchLen);
        return $startText + '<b>' + $filterText + '</b>' + $endText;
    }

    const isContactUsValid = function () {
        const $contact_country = $('label[for="contactUsCountries"]').closest('.a-dropdown__container').find('select');
        const $contact_languages = $('label[for="contactUsLanguages"]').closest('.a-dropdown__container').find('select');
        const $contact_category = $('label[for="contactUsCategories"]').closest('.a-dropdown__container').find('select');
        const $contact_subCategory = $('label[for="contactUsSubCategories"]').closest('.a-dropdown__container').find('select');


        const $contact_search = $('#contactUsSearch');
        let $isFormValid = true;
        if (!$contact_country.find('option:selected').val() || !$contact_languages.find('option:selected').val()) {
            $isFormValid = false;
        }
        if ((!$contact_category.find('option:selected').val() ||
            !$contact_subCategory.find('option:selected').val())) {
            $isFormValid = false;
        }
        if ($contact_search.attr('isSelected') == 'true') {
            $isFormValid = true;
        }

        return $isFormValid;
    }

    const isContactUsValidPhysical = function () {


        const contact_countryphysical = $('label[for="contactUsCountriesPhysical"]').closest('.a-dropdown__container').find('select');
        const contact_languagesphysical = $('label[for="contactUsLanguagesPhysical"]').closest('.a-dropdown__container').find('select');
        const contact_categoryphysical = $('label[for="contactUsCategoriesPhysical"]').closest('.a-dropdown__container').find('select');
        const contact_subCategoryphysical = $('label[for="contactUsSubCategoriesPhysical"]').closest('.a-dropdown__container').find('select');
        let isFormValidPhysical = true;

        if (!contact_countryphysical.find('option:selected').val() || !contact_languagesphysical.find('option:selected').val()) {
            isFormValidPhysical = false;
        }
        if ((!contact_categoryphysical.find('option:selected').val() ||
            !contact_subCategoryphysical.find('option:selected').val())) {
            isFormValidPhysical = false;
        }

        return isFormValidPhysical;
    }


    const isContactUsValidMobile = function () {
        const contact_countryMobile = $('label[for="contactUsCountriesMobile"]').closest('.a-dropdown__container').find('select');
        const contact_languagesMobile = $('label[for="contactUsLanguagesMobile"]').closest('.a-dropdown__container').find('select');
        const contact_categoryMobile = $('label[for="contactUsCategoriesMobile"]').closest('.a-dropdown__container').find('select');
        const contact_subCategoryMobile = $('label[for="contactUsSubCategoriesMobile"]').closest('.a-dropdown__container').find('select');
        let isFormValidMobile = true;

        if (!contact_countryMobile.find('option:selected').val() || !contact_languagesMobile.find('option:selected').val()) {
            isFormValidMobile = false;
        }
        if ((!contact_categoryMobile.find('option:selected').val() ||
            !contact_subCategoryMobile.find('option:selected').val())) {
            isFormValidMobile = false;
        }

        return isFormValidMobile;
    }

    //initiate all forms in eifu
    const initForms = function () {
        const $langArry = $search.getLocalStorage('languages');
        const $catDet = sessionStorage.getItem('contactUsDetails') ? JSON.parse(sessionStorage.getItem('contactUsDetails')) : {};
        const $parent_country = $('.lang-search-country fieldset.drop-down').find('.a-dropdown__container');
        const $parent_language = $('.lang-search-language fieldset.drop-down').find('.a-dropdown__container');
        const $elabeling_country = $('label[for="elabelingCountries"]').closest('.a-dropdown__container');
        const $elabeling_languages = $('label[for="elabelingLanguages"]').closest('.a-dropdown__container');
        const $contact_country = $('label[for="contactUsCountries"]').closest('.a-dropdown__container');
        const $contact_languages = $('label[for="contactUsLanguages"]').closest('.a-dropdown__container');
        const $contact_category = $('label[for="contactUsCategories"]').closest('.a-dropdown__container');
        const $contact_subCategory = $('label[for="contactUsSubCategories"]').closest('.a-dropdown__container');
        //physical modal
        const contact_countryphysical = $('label[for="contactUsCountriesPhysical"]').closest('.a-dropdown__container');
        const contact_languagesphysical = $('label[for="contactUsLanguagesPhysical"]').closest('.a-dropdown__container');
        const contact_categoryphysical = $('label[for="contactUsCategoriesPhysical"]').closest('.a-dropdown__container');
        const contact_subCategoryphysical = $('label[for="contactUsSubCategoriesPhysical"]').closest('.a-dropdown__container');

        //mobile modal
        const contact_countryMobile = $('label[for="contactUsCountriesMobile"]').closest('.a-dropdown__container');
        const contact_languagesMobile = $('label[for="contactUsLanguagesMobile"]').closest('.a-dropdown__container');
        const contact_categoryMobile = $('label[for="contactUsCategoriesMobile"]').closest('.a-dropdown__container');
        const contact_subCategoryMobile = $('label[for="contactUsSubCategoriesMobile"]').closest('.a-dropdown__container');

        const $cd = $search.getLocalStorage('curr-country-cd') ? $search.getLocalStorage('curr-country-cd') : '';
        const $curr_lang = $search.getLocalStorage('curr-lang') ? $search.getLocalStorage('curr-lang') : '';

        if ($parent_country.length && $parent_language.length) {
            $formsManuals.initCountryField($langArry, $parent_country);
            $formsManuals.initLanguageField($langArry, $cd, $parent_language);
            if ($cd) {
                $parent_country.find('select').val($cd);
            }
            if ($curr_lang) {
                let $lang = $formsManuals.getLanguageManuals($curr_lang);
                $parent_language.find('select').val($lang[0]);
            }
        }
        if ($elabeling_country.length && $elabeling_languages.length) {
            $formsManuals.initCountryField($langArry, $elabeling_country);
            $formsManuals.initLanguageField($langArry, $cd, $elabeling_languages);
            //removed below code to fix auto-select country and language

        }

        if ($contact_country.length && $contact_languages.length) {
            $formsManuals.initCountryField($langArry, $contact_country);
            $formsManuals.initLanguageField($langArry, $cd, $contact_languages);
            if ($cd) {
                $contact_country.find('select').val($cd);
            }
            if ($curr_lang) {
                let $lang = $formsManuals.getLanguageManuals($curr_lang);
                $contact_languages.find('select').val($lang[0]);
            }
        }

        //physical modal
        if (contact_countryphysical.length && contact_languagesphysical.length) {
            $formsManuals.initCountryField($langArry, contact_countryphysical);
            $formsManuals.initLanguageField($langArry, $cd, contact_languagesphysical);
            if ($cd) {
                contact_countryphysical.find('select').val($cd);
            }
            if ($curr_lang) {
                let $lang = $formsManuals.getLanguageManuals($curr_lang);
                contact_languagesphysical.find('select').val($lang[0]);
            }
        }

        //Mobile modal
        if (contact_countryMobile.length && contact_languagesMobile.length) {
            $formsManuals.initCountryField($langArry, contact_countryMobile);
            $formsManuals.initLanguageField($langArry, $cd, contact_languagesMobile);
            if ($cd) {
                contact_countryMobile.find('select').val($cd);
            }
            if ($curr_lang) {
                let $lang = $formsManuals.getLanguageManuals($curr_lang);
                contact_languagesMobile.find('select').val($lang[0]);
            }
        }

        if ($catDet && $catDet.categories) {
            if ($contact_category.length) {
                $formsManuals.initCategoryDropdownField($catDet, $contact_category);
                $formsManuals.initSubCategoryDropdownField($catDet, 'default', $contact_subCategory);


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

        //pyshcial copy modal
        if ($catDet && $catDet.categories) {
            if (contact_categoryphysical.length) {
                $formsManuals.initCategoryDropdownField($catDet, contact_categoryphysical);
                $formsManuals.initSubCategoryDropdownField($catDet, 'default', contact_subCategoryphysical);


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

        //pyshcial copy modal
        if ($catDet && $catDet.categories) {
            if (contact_categoryMobile.length) {
                $formsManuals.initCategoryDropdownField($catDet, contact_categoryMobile);
                $formsManuals.initSubCategoryDropdownField($catDet, 'default', contact_subCategoryMobile);


                if ($formsManuals.isContactUsValidPhysical()) {
                    $('#step2ContinueMobile').removeClass('disabled');
                    $('#step2ContinueMobile').prop('disabled', false);
                }
                else {
                    $('#step2ContinueMobile').addClass('disabled');
                    $('#step2ContinueMobile').prop('disabled', true);
                }
            }
        }
    }

    const getProductDetails = async function ($productId) {
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
        const $products = $productCategoryManuals.$getAllProducts($catData);
        let $obj = $products.find(o => o.tags.includes($search.getName($productId).id) ? o : Array.isArray(o.tags) && o.tags.some(tag => tag.includes($search.getName($productId).id)) ? o : undefined);
        if ($obj && $obj.tags) {
            return $obj;
        }
        else {
            return false;
        }
    }

    const checkCookie = function () {
        const $lastCookie = $search.readCookie('isLogged');
        const $isMainPg = $('#selectBusinessArea').length;
        if (!$isMainPg && !$lastCookie) {
            // redirect to index page
            if ($globals.indexPageRedirectionPage) {
                let $currPath = location.pathname ? location.pathname.split('/') : [];
                $currPath.map((p, i) => {
                    if (p.split('.html').length > 1) {
                        $currPath[i] = $globals.indexPageRedirectionPage;
                    }
                    return true;
                });
                const $url = $currPath.join('/').replace('/hcp', '').replace('/nhcp', '');
                const curntlang = $url.split("/").slice(-2)[0];
                $search.createCookie('isLogged', true, 1);
                $search.setLocalStorage('curr-lang', curntlang);
                window.open($url, '_self');
            }
        }
    }


    return {

        getCountryLanguageCode: getCountryLanguageCode,
        $setLanguageCountryData:$setLanguageCountryData,
        $getCountryLanguageData:$getCountryLanguageData,
        setLanguageCountryCode: setLanguageCountryCode,
        getDetailsByCode: getDetailsByCode,
        initCountryField: initCountryField,
        initLanguageField: initLanguageField,
        validateElabelingForm: validateElabelingForm,
        validateHeaderForm: validateHeaderForm,
        initCategoryDropdownField: initCategoryDropdownField,
        initSubCategoryDropdownField: initSubCategoryDropdownField,
        initProductsDropdownField: initProductsDropdownField,
        filterProductInSearch: filterProductInSearch,
        initSearchProductField: initSearchProductField,
        isContactUsValid: isContactUsValid,
        isContactUsValidPhysical: isContactUsValidPhysical,
        isContactUsValidMobile: isContactUsValidMobile,
        initForms: initForms,
        getLanguageCode: getLanguageCode,
        getProductDetails: getProductDetails,
        checkCookie: checkCookie,
        getLanguageManuals: getLanguageManuals,
        getLanguageCodeManuals: getLanguageCodeManuals
    }
})();

$(document).ready(function () {
    $forms.getQueryParams('product');
    // reload page with current lang code selected
    const $langCodeArray = $search.getLocalStorage('languagescode');
    if (!(Object.keys($langCodeArray).length)) {
        $formsManuals.getCountryLanguageCode();
    }

    $formsManuals.initForms();
    const $headerWrapper = $('.o-header');
    const $menuRightOption = $headerWrapper.find('.menu-right-option');
    const $switchContainer = $menuRightOption.find('.switch.link.button');
    const $switchContent = $switchContainer.html();
    if ($($switchContent).find('.abt-icon').length || $($switchContent).find('.a-link__inner-text').text() !== '') {

        let $countrySelected = $search.getLocalStorage('curr-country-manuals') ? $search.getLocalStorage('curr-country-manuals') : '';
        const $languageSelected = $search.getLocalStorage('curr-lang') ? $search.getLocalStorage('curr-lang') : '';

        let $countrySelectedArr = $countrySelected.trim().split("");
        $countrySelectedArr[1] = $countrySelectedArr[1].toLowerCase();
        $countrySelected = $countrySelectedArr.join("");
        if ($countrySelected.trim().toLowerCase().includes('united states')) {
            $countrySelected = $countrySelected.trim().substring($countrySelected.trim().indexOf(' ') + 1);
        }
        $('.lang-selected').text($countrySelected + ' (' + $languageSelected.charAt(0).toUpperCase() + $languageSelected.slice(1).toLowerCase() + ')');
    }
});

//select form for header modal
$(document).on('change', '.lang-search-country select', function (e) {
    e.preventDefault();
    const $langArry = $search.getLocalStorage('languages');
    const $parent_language = $('.lang-search-language fieldset.drop-down').find('.a-dropdown__container');
    $(this).css({ 'background-color': '#fff' });
    $(this).closest('.a-dropdown').find('.a-input-field--text-require').css({ 'display': 'none' });
    const $code = $(this).find('option:selected').val();
    $formsManuals.initLanguageField($langArry, $code, $parent_language);
});


//select form for elabeling banner and contact us page
$(document).on('change', 'label[for="elabelingCountries"] ~ select, label[for="contactUsCountries"] ~ select, label[for="contactUsCountriesPhysical"] ~ select, label[for="contactUsCountriesMobile"] ~ select', function (e) {
    e.preventDefault();
    const $langArry = $search.getLocalStorage('languages');
    let $parent_language;
    const $code = $(this).find('option:selected').val();
    if ($(this).closest('fieldset').attr('id') === 'elabelingCountries-options') {
        $parent_language = $('label[for="elabelingLanguages"]').closest('.a-dropdown__container');
        $formsManuals.initLanguageField($langArry, $code, $parent_language);
    }
    if ($(this).closest('fieldset').attr('id') === 'contactUsCountries-options') {
        $parent_language = $('label[for="contactUsLanguages"]').closest('.a-dropdown__container');
        $formsManuals.initLanguageField($langArry, $code, $parent_language);
        const $lang = $('label[for="contactUsLanguages"] ~ select').find('option:selected').val();
        if ($code && $lang) {
            $('#step1ContinueManuals').removeClass('disabled');
            $('#step1ContinueManuals').prop('disabled', false);
        }
        else {
            $('#step1ContinueManuals').addClass('disabled');
            $('#step1ContinueManuals').prop('disabled', true);
        }
    }
    //physical modal
    if ($(this).closest('fieldset').attr('id') === 'contactUsCountriesPhysical-options') {

        $parent_language = $('label[for="contactUsLanguagesPhysical"]').closest('.a-dropdown__container');
        $formsManuals.initLanguageField($langArry, $code, $parent_language);
        const $langph = $('label[for="contactUsLanguagesPhysical"] ~ select').find('option:selected').val();
        if ($code && $langph) {
            $('#step1ContinueManualsPhysical').removeClass('disabled');
            $('#step1ContinueManualsPhysical').prop('disabled', false);
        }
        else {
            $('#step1ContinueManualsPhysical').addClass('disabled');
            $('#step1ContinueManualsPhysical').prop('disabled', true);
        }
    }

    //mobile  modal
    if ($(this).closest('fieldset').attr('id') === 'contactUsCountriesMobile-options') {

        $parent_language = $('label[for="contactUsLanguagesMobile"]').closest('.a-dropdown__container');
        $formsManuals.initLanguageField($langArry, $code, $parent_language);
        const $langmb = $('label[for="contactUsLanguagesMobile"] ~ select').find('option:selected').val();
        if ($code && $langmb) {
            $('#step1ContinueManualsMobile').removeClass('disabled');
            $('#step1ContinueManualsMobile').prop('disabled', false);
        }
        else {
            $('#step1ContinueManualsMobile').addClass('disabled');
            $('#step1ContinueManualsMobile').prop('disabled', true);
        }
    }
    $(this).css({ 'background-color': '#fff' });
    $(this).closest('.a-dropdown').find('.a-input-field--text-require').css({ 'display': 'none' });
});

//remove errors
$(document).on('change', 'label[for="elabelingLanguages"] ~ select, .lang-search-language select, label[for="contactUsLanguages"] ~ select, label[for="contactUsLanguagesPhysical"] ~ select,label[for="contactUsLanguagesMobile"] ~ select', function (e) {
    e.preventDefault();
    $(this).css({ 'background-color': '#fff' });
    $(this).closest('.a-dropdown').find('.a-input-field--text-require').css({ 'display': 'none' });

    const $elabeling_country = $('label[for="elabelingCountries"]').closest('.a-dropdown__container').find('select');
    if ($(this).closest('fieldset').attr('id') === 'elabelingLanguages-options') {
        $search.setLocalStorage('curr-country-cd', $elabeling_country.find('option:selected').val());
        $search.setLocalStorage('curr-country', $elabeling_country.find('option:selected').val());
        $search.setLocalStorage('curr-country-manuals', $elabeling_country.find('option:selected').text());
        let $lang = $(this).find('option:selected').val();
        let $langcode = $formsManuals.getLanguageCodeManuals($lang);
        $search.setLocalStorage('curr-lang', $langcode);
        $search.setLocalStorage('selectedCountry', $elabeling_country.find('option:selected').attr('data-country-cd'));
        sessionStorage.setItem('country', $elabeling_country.find('option:selected').text());
        sessionStorage.setItem('language', $(this).find('option:selected').val());
    }
    else if ($(this).closest('fieldset').attr('id') === 'contactUsLanguages-options') {
        const $country = $('label[for="contactUsCountries"] ~ select').find('option:selected').val();
        if ($(this).find('option:selected').val() && $country) {
            $('#step1ContinueManuals').removeClass('disabled');
            $('#step1ContinueManuals').prop('disabled', false);
        }
        else {
            $('#step1ContinueManuals').addClass('disabled');
            $('#step1ContinueManuals').prop('disabled', true);
        }
    }

    //mobile modal
    else if ($(this).closest('fieldset').attr('id') === 'contactUsLanguagesPhysical-options') {
        const $countryph = $('label[for="contactUsLanguagesPhysical"] ~ select').find('option:selected').val();
        if ($(this).find('option:selected').val() && $countryph) {
            $('#step1ContinueManualsPhysical').removeClass('disabled');
            $('#step1ContinueManualsPhysical').prop('disabled', false);
        }
        else {
            $('#step1ContinueManualsPhysical').addClass('disabled');
            $('#step1ContinueManualsPhysical').prop('disabled', true);
        }
    }

    else if ($(this).closest('fieldset').attr('id') === 'contactUsLanguagesMobile-options') {
        const $countrymb = $('label[for="contactUsCountriesMobile"] ~ select').find('option:selected').val();
        if ($(this).find('option:selected').val() && $countrymb) {
            $('#step1ContinueManualsMobile').removeClass('disabled');
            $('#step1ContinueManualsMobile').prop('disabled', false);
        }
        else {
            $('#step1ContinueManualsMobile').addClass('disabled');
            $('#step1ContinueManualsMobile').prop('disabled', true);
        }
    }
});

//radio button toggle
$(document).on('click', '#elabelingHCPManuals-options .a-radio__label', function () {
    const $radios = $(this).closest('fieldset');
    $radios.find('.a-radio').removeClass('a-radio--selected').addClass('a-radio--default');
    $radios.find('.a-radio').find('.a-radio__custom').addClass('without-after-content');
    $(this).closest('.a-radio').removeClass('a-radio--default').addClass('a-radio--selected');
    $(this).closest('.a-radio').find('.a-radio__custom').removeClass('without-after-content');
    $('.a-radio--default').find('input[type="radio"]').removeAttr('checked');
    $('.a-radio--selected').find('input[type="radio"]').attr('checked', 'true');
    const elabeling_isHCP = $('#elabelingHCPManuals-options').find('.a-radio--selected').find('input');
    $search.setLocalStorage('isHCP', $(elabeling_isHCP).val());
    let role = $search.getLocalStorage('isHCP') ? $search.getLocalStorage('isHCP') : 'NHCP';
    role = role && (role.toUpperCase() === 'Y' || role.toUpperCase() === 'YES' || role.toUpperCase() === 'HCP' || role.toUpperCase() === 'TRUE') ? 'HCP' : 'NHCP';
    sessionStorage.setItem('role', role);
    $(this).parents('#elabelingHCPManuals-options').find('.radio--text-require').css({ 'display': 'none' });
});

//on submit of form
$(document).on('click', '#elabelingButtonManuals', function (e) {
    e.preventDefault();
    const $isFormValid = $formsManuals.validateElabelingForm();
    const $productIdInQuery = sessionStorage.getItem('product');
    const hcpUrl = $(this).attr('href');
    const nhcpUrl = $globals.nhcpBaseUrl ? $globals.nhcpBaseUrl : (hcpUrl && hcpUrl.replace('/hcp/', '/nhcp/'));
    let role = $search.getLocalStorage('isHCP') ? $search.getLocalStorage('isHCP') : 'NHCP';
    role = role && (role.toUpperCase() === 'Y' || role.toUpperCase() === 'YES' || role.toUpperCase() === 'HCP' || role.toUpperCase() === 'TRUE') ? 'HCP' : 'NHCP';
    //set urls for redirection
    const $url = (role === 'HCP') ? hcpUrl : nhcpUrl;
    const target = $(this).attr('target') === '_blank' ? '_blank' : '_self';
    //redirect to pdf page if query params present
    if ($isFormValid && $productIdInQuery) {
        $productCategoryManuals.callForCategoryDetails($url, target, 'queryParams');
    }
    else {
        if ($isFormValid && $url) {
            window.open($url, target);
        }
    }
});

//on click of step 1 continue button
// call esl to fetch details
$(document).on('click', '#step1ContinueManuals', function (e) {

    e.preventDefault();
    const $contact_country = $('label[for="contactUsCountries"]').closest('.a-dropdown__container');
    const $contact_languages = $('label[for="contactUsLanguages"]').closest('.a-dropdown__container');
    const $country = $contact_country.find('option:selected').attr('data-country-cd');
    const $lang = $contact_languages.find('option:selected').val();
    sessionStorage.setItem('contactCountry', $country);
    sessionStorage.setItem('contactLanguage', $lang);
    $('#contactUsSearch').val('');
    $('#contactUsSearch').attr('isSelected', false);
    $('#contactUsSearch').closest('.input-group').find('.abt-icon').removeClass('abt-icon-cross').addClass('abt-icon-search');
    $productCategoryManuals.callForCategoryDetails(null, null, 'contactusmanuals');


});

//physical modal
$(document).on('click', '#step1ContinueManualsPhysical', function (e) {

    e.preventDefault();
    const $contact_countryph = $('label[for="contactUsCountriesPhysical"]').closest('.a-dropdown__container');
    const $contact_languagesph = $('label[for="contactUsLanguagesPhysical"]').closest('.a-dropdown__container');
    const $countryph = $contact_countryph.find('option:selected').attr('data-country-cd');
    const $langph = $contact_languagesph.find('option:selected').val();
    sessionStorage.setItem('contactCountry', $countryph);
    sessionStorage.setItem('contactLanguage', $langph);
    $('#contactUsSearch').val('');
    $('#contactUsSearch').attr('isSelected', false);
    $('#contactUsSearch').closest('.input-group').find('.abt-icon').removeClass('abt-icon-cross').addClass('abt-icon-search');
    $productCategoryManuals.callForCategoryDetails(null, null, 'contactus');


});

//mobile modal
$(document).on('click', '#step1ContinueMobile', function (e) {

    e.preventDefault();
    const $contact_countrymb = $('label[for="contactUsCountriesMobile"]').closest('.a-dropdown__container');
    const $contact_languagesmb = $('label[for="contactUsLanguagesMobile"]').closest('.a-dropdown__container');
    const $countrymb = $contact_countrymb.find('option:selected').attr('data-country-cd');
    const $langmb = $contact_languagesmb.find('option:selected').val();
    sessionStorage.setItem('contactCountry', $countrymb);
    sessionStorage.setItem('contactLanguage', $langmb);
    $('#contactUsSearch').val('');
    $('#contactUsSearch').attr('isSelected', false);
    $('#contactUsSearch').closest('.input-group').find('.abt-icon').removeClass('abt-icon-cross').addClass('abt-icon-search');
    $productCategoryManuals.callForCategoryDetails(null, null, 'contactus');
});

//select form for category link in contact us
$(document).on('change', 'label[for="contactUsCategories"] ~ select', function (e) {
    e.preventDefault();
    const $catDet = sessionStorage.getItem('contactUsDetails') ? JSON.parse(sessionStorage.getItem('contactUsDetails')) : {};
    const $parent_sub_cat = $('label[for="contactUsSubCategories"]').closest('.a-dropdown__container');
    $(this).css({ 'background-color': '#fff' });
    $(this).closest('.a-dropdown').find('.a-input-field--text-require').css({ 'display': 'none' });
    const $code = $(this).find('option:selected').val();
    $formsManuals.initSubCategoryDropdownField($catDet, $code, $parent_sub_cat);
    $('#contactUsSearch').val('');
    $('#contactUsSearch').attr('isSelected', false);
    $('.form-group .input-group .abt-icon').removeClass('abt-icon-cross').addClass('abt-icon-search');
    $('.form-group').find('datalist').css({ 'display': 'none' });
    if ($formsManuals.isContactUsValid()) {
        $('#step2Continue').removeClass('disabled');
        $('#step2Continue').prop('disabled', false);
    }
    else {
        $('#step2Continue').addClass('disabled');
        $('#step2Continue').prop('disabled', true);
    }
});


//physical modal
$(document).on('change', 'label[for="contactUsCategoriesPhysical"] ~ select', function (e) {
    e.preventDefault();
    const $catDetph = sessionStorage.getItem('contactUsDetails') ? JSON.parse(sessionStorage.getItem('contactUsDetails')) : {};
    const parent_sub_catph = $('label[for="contactUsSubCategoriesPhysical"]').closest('.a-dropdown__container');
    $(this).css({ 'background-color': '#fff' });
    $(this).closest('.a-dropdown').find('.a-input-field--text-require').css({ 'display': 'none' });
    const $code = $(this).find('option:selected').val();
    $formsManuals.initSubCategoryDropdownField($catDetph, $code, parent_sub_catph);
    $('#contactUsSearch').val('');
    $('#contactUsSearch').attr('isSelected', false);
    $('.form-group .input-group .abt-icon').removeClass('abt-icon-cross').addClass('abt-icon-search');
    $('.form-group').find('datalist').css({ 'display': 'none' });
    if ($formsManuals.isContactUsValidPhysical()) {
        $('#step2ContinuePhysical').removeClass('disabled');
        $('#step2ContinuePhysical').prop('disabled', false);
    }
    else {
        $('#step2ContinuePhysical').addClass('disabled');
        $('#step2ContinuePhysical').prop('disabled', true);
    }
});


//mobile modal
$(document).on('change', 'label[for="contactUsCategoriesMobile"] ~ select', function (e) {
    e.preventDefault();
    const $catDetmb = sessionStorage.getItem('contactUsDetails') ? JSON.parse(sessionStorage.getItem('contactUsDetails')) : {};
    const parent_sub_catmb = $('label[for="contactUsSubCategoriesMobile"]').closest('.a-dropdown__container');
    $(this).css({ 'background-color': '#fff' });
    $(this).closest('.a-dropdown').find('.a-input-field--text-require').css({ 'display': 'none' });
    const $code = $(this).find('option:selected').val();
    $formsManuals.initSubCategoryDropdownField($catDetmb, $code, parent_sub_catmb);
    $('#contactUsSearch').val('');
    $('#contactUsSearch').attr('isSelected', false);
    $('.form-group .input-group .abt-icon').removeClass('abt-icon-cross').addClass('abt-icon-search');
    $('.form-group').find('datalist').css({ 'display': 'none' });
    if ($formsManuals.isContactUsValidMobile()) {
        $('#step2ContinueMobile').removeClass('disabled');
        $('#step2ContinueMobile').prop('disabled', false);
    }
    else {
        $('#step2ContinueMobile').addClass('disabled');
        $('#step2ContinueMobile').prop('disabled', true);
    }
});

//select form for category link in contact us
$(document).on('change', 'label[for="contactUsSubCategories"] ~ select', function (e) {
    e.preventDefault();
    const $catDet = sessionStorage.getItem('contactUsDetails') ? JSON.parse(sessionStorage.getItem('contactUsDetails')) : {};
    const $parent_prod = $('label[for="contactUsProducts"]').closest('.a-dropdown__container');
    $(this).css({ 'background-color': '#fff' });
    $(this).closest('.a-dropdown').find('.a-input-field--text-require').css({ 'display': 'none' });
    const code_cat = $('label[for="contactUsCategories"]').closest('.a-dropdown__container').find('select').find('option:selected').val();
    const code_sub = $(this).find('option:selected').val();
    $formsManuals.initProductsDropdownField($catDet, code_cat, code_sub, $parent_prod);
    $('#contactUsSearch').val('');
    $('#contactUsSearch').attr('isSelected', false);
    $('.form-group .input-group .abt-icon').removeClass('abt-icon-cross').addClass('abt-icon-search');
    $('.form-group').find('datalist').css({ 'display': 'none' });
    if ($formsManuals.isContactUsValid()) {
        $('#step2Continue').removeClass('disabled');
        $('#step2Continue').prop('disabled', false);
    }
    else {
        $('#step2Continue').addClass('disabled');
        $('#step2Continue').prop('disabled', true);
    }
});


//physical modal
$(document).on('change', 'label[for="contactUsSubCategoriesPhysical"] ~ select', function (e) {
    e.preventDefault();
    const $catDetph = sessionStorage.getItem('contactUsDetails') ? JSON.parse(sessionStorage.getItem('contactUsDetails')) : {};
    const parent_prodph = $('label[for="contactUsProducts"]').closest('.a-dropdown__container');
    $(this).css({ 'background-color': '#fff' });
    $(this).closest('.a-dropdown').find('.a-input-field--text-require').css({ 'display': 'none' });
    const code_catph = $('label[for="contactUsCategoriesPhysical"]').closest('.a-dropdown__container').find('select').find('option:selected').val();
    const code_subph= $(this).find('option:selected').val();
    $formsManuals.initProductsDropdownField($catDetph, code_catph, code_subph, parent_prodph);
    $('#contactUsSearch').val('');
    $('#contactUsSearch').attr('isSelected', false);
    $('.form-group .input-group .abt-icon').removeClass('abt-icon-cross').addClass('abt-icon-search');
    $('.form-group').find('datalist').css({ 'display': 'none' });
    if ($formsManuals.isContactUsValidPhysical()) {
        $('#step2ContinuePhysical').removeClass('disabled');
        $('#step2ContinuePhysical').prop('disabled', false);
    }
    else {
        $('#step2ContinuePhysical').addClass('disabled');
        $('#step2ContinuePhysical').prop('disabled', true);
    }
});


//mobile modal
$(document).on('change', 'label[for="contactUsSubCategoriesMobile"] ~ select', function (e) {
    e.preventDefault();
    const $catDetmb = sessionStorage.getItem('contactUsDetails') ? JSON.parse(sessionStorage.getItem('contactUsDetails')) : {};
    const parent_prodmb = $('label[for="contactUsProducts"]').closest('.a-dropdown__container');
    $(this).css({ 'background-color': '#fff' });
    $(this).closest('.a-dropdown').find('.a-input-field--text-require').css({ 'display': 'none' });
    const code_catmb = $('label[for="contactUsCategoriesMobile"]').closest('.a-dropdown__container').find('select').find('option:selected').val();
    const code_submb = $(this).find('option:selected').val();
    $formsManuals.initProductsDropdownField($catDetmb, code_catmb, code_submb, parent_prodmb);
    $('#contactUsSearch').val('');
    $('#contactUsSearch').attr('isSelected', false);
    $('.form-group .input-group .abt-icon').removeClass('abt-icon-cross').addClass('abt-icon-search');
    $('.form-group').find('datalist').css({ 'display': 'none' });
    if ($formsManuals.isContactUsValidMobile()) {
        $('#step2ContinueMobile').removeClass('disabled');
        $('#step2ContinueMobile').prop('disabled', false);
    }
    else {
        $('#step2ContinueMobile').addClass('disabled');
        $('#step2ContinueMobile').prop('disabled', true);
    }
});
//select form for category link in contact us
$(document).on('change', 'label[for="contactUsSubCategories"] ~ select', function (e) {
    e.preventDefault();
    $('#contactUsSearch').val('');
    $('#contactUsSearch').attr('isSelected', false);
    $('.form-group .input-group .abt-icon').removeClass('abt-icon-cross').addClass('abt-icon-search');
    $('.form-group').find('datalist').css({ 'display': 'none' });
    if ($formsManuals.isContactUsValid()) {
        $('#step2Continue').removeClass('disabled');
        $('#step2Continue').prop('disabled', false);
        $('#step2Continue').attr('data-relatedresource', $(this).find('option:selected').attr('data-relatedresource'));
    }
    else {
        $('#step2Continue').addClass('disabled');
        $('#step2Continue').prop('disabled', true);
    }
});

//physical modal
$(document).on('change', 'label[for="contactUsSubCategoriesPhysical"] ~ select', function (e) {
    e.preventDefault();
    $('#contactUsSearch').val('');
    $('#contactUsSearch').attr('isSelected', false);
    $('.form-group .input-group .abt-icon').removeClass('abt-icon-cross').addClass('abt-icon-search');
    $('.form-group').find('datalist').css({ 'display': 'none' });
    if ($formsManuals.isContactUsValidPhysical()) {
        $('#step2ContinuePhysical').removeClass('disabled');
        $('#step2ContinuePhysical').prop('disabled', false);
        $('#step2ContinuePhysical').attr('data-relatedresource', $(this).find('option:selected').attr('data-relatedresource'));
    }
    else {
        $('#step2ContinuePhysical').addClass('disabled');
        $('#step2ContinuePhysical').prop('disabled', true);
    }
});


//mobile modal
$(document).on('change', 'label[for="contactUsSubCategoriesMobile"] ~ select', function (e) {
    e.preventDefault();
    $('#contactUsSearch').val('');
    $('#contactUsSearch').attr('isSelected', false);
    $('.form-group .input-group .abt-icon').removeClass('abt-icon-cross').addClass('abt-icon-search');
    $('.form-group').find('datalist').css({ 'display': 'none' });
    if ($formsManuals.isContactUsValidMobile()) {
        $('#step2ContinueMobile').removeClass('disabled');
        $('#step2ContinueMobile').prop('disabled', false);
        $('#step2ContinueMobile').attr('data-relatedresource', $(this).find('option:selected').attr('data-relatedresource'));
    }
    else {
        $('#step2ContinueMobile').addClass('disabled');
        $('#step2ContinueMobile').prop('disabled', true);
    }
});
//key event in search product - contact us
//on pressing key in search input
$(document).on('keyup', '#contactUsSearch', function (e) {

    const $contact_category = $('label[for="contactUsCategories"]').closest('.a-dropdown__container');
    const $contact_subCategory = $('label[for="contactUsSubCategories"]').closest('.a-dropdown__container');
    const $catDet = sessionStorage.getItem('contactUsDetails') ? JSON.parse(sessionStorage.getItem('contactUsDetails')) : {};
    $('#contactUsSearch').attr('isSelected', false);
    $('#step2Continue').addClass('disabled');
    $('#step2Continue').prop('disabled', true);

    $formsManuals.initCategoryDropdownField($catDet, $contact_category);
    $formsManuals.initSubCategoryDropdownField($catDet, 'default', $contact_subCategory);

});

$(document).on('click', '.form-group .input-group .abt-icon.abt-icon-cross', function (e) {
    e.preventDefault();
    $('#contactUsSearch').val('');
    $('#contactUsSearch').attr('isSelected', false);
    $(this).removeClass('abt-icon-cross').addClass('abt-icon-search');
    $(this).closest('.form-group').find('datalist').css({ 'display': 'none' });
    if ($formsManuals.isContactUsValid()) {
        $('#step2Continue').removeClass('disabled');
        $('#step2Continue').prop('disabled', false);
    }
    else {
        $('#step2Continue').addClass('disabled');
        $('#step2Continue').prop('disabled', true);
    }
});


//on click of search drop-down links
$(document).on('click', '.product-search-link',async  function (e) {
    e.preventDefault();
    const $prod_name = $(this).attr('data-product-name');
    let $catDet;
		  await getProductCategoryDataFromDB()
		    .then((data) => {
		      // You can use the data here
		      $catDet = data;
		    })
		    .catch((error) => {
		      // Handle any errors here
		      console.error(error);
		    });
    const $contact_category = $('label[for="contactUsCategories"]').closest('.a-dropdown__container');
    const $contact_subCategory = $('label[for="contactUsSubCategories"]').closest('.a-dropdown__container');

    // -- empty form
    if (!$search.checkIfContactUsPage()) {
        $formsManuals.initCategoryDropdownField($catDet, $contact_category);
        $formsManuals.initSubCategoryDropdownField($catDet, 'default', $contact_subCategory);
    }
    $('#contactUsSearch').val($prod_name);
    $('#contactUsSearch').attr('isSelected', true);
    $('.form-group .input-group .abt-icon').addClass('abt-icon-cross').removeClass('abt-icon-search');
    $('.form-group').find('datalist').css({ 'display': 'none' });
    if ($formsManuals.isContactUsValid()) {
        $('#step2Continue').removeClass('disabled');
        $('#step2Continue').prop('disabled', false);
        $('#step2Continue').attr('data-relatedresource', $(this).attr('data-relatedresource'));
    }
    else {
        $('#step2Continue').addClass('disabled');
        $('#step2Continue').prop('disabled', true);
    }
});

let $contactMain = function () {
    let $head = $("#contactStep3").contents().find("head");
    let Iframecss01 = '<style> p{ color: #62666a; }</style>';
    let Iframecss02 = '<style> p{ font-size: 16px; }</style>';
    let Iframecss03 = '<style> p{ font-family: Calibri; }</style>';
    let Iframecss04 = '<style> p{ line-height: 20px; }</style>';
    let Iframecss06 = '<style> .root.parsys{ display:flex !important; }</style>';
    let Iframecss07 = '<style> .root.parsys{ justify-content: space-between; }</style>';
    let Iframecss20 = '<style> .root.parsys{ flex-wrap: wrap; }</style>';
    let Iframecss08 = '<style> .root.parsys{ width: 100%; }</style>';
    let Iframecss09 = '<style> .contact-us-mailto{ color: #004f71; }</style>';
    let Iframecss10 = '<style> .contact-us-mailto{ font-weight: bold; }</style>';
    let Iframecss11 = '<style> .contact-us-mailto{ cursor: pointer; }</style>';
    let Iframecss15 = '<style> .contact-us-mailto{ margin-right: 20px; }</style>';
    let Iframecss16 = '<style> p { margin-bottom: 0px; }</style>';
    let Iframecss17 = '<style> .text p:first-of-type{ color: #222731; }</style>';
    let Iframecss21 = '<style> .text{ padding-bottom: 50px; }</style>';
    let Iframecss22 = '<style> .text{ flex: 0 0 50%; }</style>';
    let Iframecss18 = '<style> .root.parsys p a{ color: #004f71 !important; }</style>';
    let Iframecss19 = '<style> .root.parsys{ padding-right: 20px; }</style>';

    $($head).append(Iframecss01);
    $($head).append(Iframecss02);
    $($head).append(Iframecss03);
    $($head).append(Iframecss04);
    $($head).append(Iframecss06);
    $($head).append(Iframecss07);
    $($head).append(Iframecss08);
    $($head).append(Iframecss09);
    $($head).append(Iframecss10);
    $($head).append(Iframecss11);
    $($head).append(Iframecss15);
    $($head).append(Iframecss16);
    $($head).append(Iframecss17);
    $($head).append(Iframecss18);
    $($head).append(Iframecss19);
    $($head).append(Iframecss20);
    $($head).append(Iframecss21);
    $($head).append(Iframecss22);

    if ($(window).width() < 767) {
        let Iframecss23 = '<style> body{ text-align: center }</style>';
        let Iframecss24 = '<style> .root.parsys{ display: block !important }</style>';
        let Iframecss25 = '<style> .text{ margin-bottom: 30px !important; }</style>';
        let Iframecss26 = '<style> .text{ flex: 0 0 100%; }</style>';
        let Iframecss34 = '<style> .text{ padding-bottom: 0px !important; }</style>';

        $($head).append(Iframecss23);
        $($head).append(Iframecss24);
        $($head).append(Iframecss25);
        $($head).append(Iframecss26);
        $($head).append(Iframecss34);

    }
    $(window).resize(function () {

        if ($(window).width() > 768) {
            let Iframecss30 = '<style> .root.parsys{ display: inline-flex; }</style>';
            let Iframecss31 = '<style> .root.parsys{ justify-content: space-between; }</style>';
            let Iframecss32 = '<style> body{ text-align: left }</style>';
            $($head).append(Iframecss30);
            $($head).append(Iframecss31);
            $($head).append(Iframecss32);
        }
        if ($(window).width() < 767) {
            let Iframecss12 = '<style> body{ text-align: center }</style>';
            let Iframecss13 = '<style> .root.parsys{ display: block  }</style>';
            let Iframecss14 = '<style> .text{ margin-bottom: 30px !important; }</style>';
            $($head).append(Iframecss12);
            $($head).append(Iframecss13);
            $($head).append(Iframecss14);
        }

    });
}

//Show number instead of complete icon for step wizard 3 
$(document).on('click', '#step2Continue', function (e) {
    e.preventDefault();
    let $url = $(this).attr('data-relatedresource');
    $('li.wizard-step[data-wizard="2"]').removeClass('a-wizard__step--complete').addClass('a-wizard__step--incomplete');
    if ($url.indexOf('.html') == -1) {
        $url = $url + '.html';
    }
    $('#contactUsDetails').find('iframe').attr('src', $url);
    $('#contactUsDetails').find('iframe').attr('id', 'contactStep3');

    setTimeout($contactMain, 500);

});

let PhysicalContactus = function () {
    let headph = $("#contactStep3Physical").contents().find("head");
    let Iframecss01 = '<style> p{ color: #62666a; }</style>';
    let Iframecss02 = '<style> p{ font-size: 16px; }</style>';
    let Iframecss03 = '<style> p{ font-family: Calibri; }</style>';
    let Iframecss04 = '<style> p{ line-height: 20px; }</style>';
    let Iframecss06 = '<style> .root.parsys{ display:flex !important; }</style>';
    let Iframecss07 = '<style> .root.parsys{ justify-content: space-between; }</style>';
    let Iframecss20 = '<style> .root.parsys{ flex-wrap: wrap; }</style>';
    let Iframecss08 = '<style> .root.parsys{ width: 100%; }</style>';
    let Iframecss09 = '<style> .contact-us-mailto{ color: #004f71; }</style>';
    let Iframecss10 = '<style> .contact-us-mailto{ font-weight: bold; }</style>';
    let Iframecss11 = '<style> .contact-us-mailto{ cursor: pointer; }</style>';
    let Iframecss15 = '<style> .contact-us-mailto{ margin-right: 20px; }</style>';
    let Iframecss16 = '<style> p { margin-bottom: 0px; }</style>';
    let Iframecss17 = '<style> .text p:first-of-type{ color: #222731; }</style>';
    let Iframecss21 = '<style> .text{ padding-bottom: 30px; }</style>';
    let Iframecss22 = '<style> .text{ flex: 0 0 50%; }</style>';
    let Iframecss18 = '<style> .root.parsys p a{ color: #004f71 !important; }</style>';
    let Iframecss19 = '<style> .root.parsys{ padding-right: 20px; }</style>';

    $(headph).append(Iframecss01);
    $(headph).append(Iframecss02);
    $(headph).append(Iframecss03);
    $(headph).append(Iframecss04);
    $(headph).append(Iframecss06);
    $(headph).append(Iframecss07);
    $(headph).append(Iframecss08);
    $(headph).append(Iframecss09);
    $(headph).append(Iframecss10);
    $(headph).append(Iframecss11);
    $(headph).append(Iframecss15);
    $(headph).append(Iframecss16);
    $(headph).append(Iframecss17);
    $(headph).append(Iframecss18);
    $(headph).append(Iframecss19);
    $(headph).append(Iframecss20);
    $(headph).append(Iframecss21);
    $(headph).append(Iframecss22);

    if ($(window).width() < 767) {
        let Iframecss23 = '<style> body{ text-align: center }</style>';
        let Iframecss24 = '<style> .root.parsys{ display: block !important }</style>';
        let Iframecss25 = '<style> .text{ margin-bottom: 30px !important; }</style>';
        let Iframecss26 = '<style> .text{ flex: 0 0 100%; }</style>';
        let Iframecss34 = '<style> .text{ padding-bottom: 0px !important; }</style>';

        $(headph).append(Iframecss23);
        $(headph).append(Iframecss24);
        $(headph).append(Iframecss25);
        $(headph).append(Iframecss26);
        $(headph).append(Iframecss34);

    }
    $(window).resize(function () {

        if ($(window).width() > 768) {
            let Iframecss30 = '<style> .root.parsys{ display: inline-flex; }</style>';
            let Iframecss31 = '<style> .root.parsys{ justify-content: space-between; }</style>';
            let Iframecss32 = '<style> body{ text-align: left }</style>';
            $(headph).append(Iframecss30);
            $(headph).append(Iframecss31);
            $(headph).append(Iframecss32);
        }
        if ($(window).width() < 767) {
            let Iframecss12 = '<style> body{ text-align: center }</style>';
            let Iframecss13 = '<style> .root.parsys{ display: block  }</style>';
            let Iframecss14 = '<style> .text{ margin-bottom: 30px !important; }</style>';
            $(headph).append(Iframecss12);
            $(headph).append(Iframecss13);
            $(headph).append(Iframecss14);
        }

    });
}
//physical modal
$(document).on('click', '#step2ContinuePhysical', function (e) {
    e.preventDefault();
    let $url = $(this).attr('data-relatedresource');
    $url = $url.replace("contactus-experiencefragments","physical-experiencefragments");
    $('li.wizard-step[data-wizard="2"]').removeClass('a-wizard__step--complete').addClass('a-wizard__step--incomplete');
    if ($url.indexOf('.html') == -1) {
        $url = $url + '.html';
    }
    $('#contactUsDetailsPhysical').find('iframe').attr('src', $url);
    $('#contactUsDetailsPhysical').find('iframe').attr('id', 'contactStep3Physical');
    setTimeout(PhysicalContactus, 500);

});

let mobileMain = function () {

    let headmb = $("#contactStep3Mobile").contents().find("head");
    let Iframecss01 = '<style> p{ color: #62666a; }</style>';
    let Iframecss02 = '<style> p{ font-size: 16px; }</style>';
    let Iframecss03 = '<style> p{ font-family: Calibri; }</style>';
    let Iframecss04 = '<style> p{ line-height: 20px; }</style>';
    let Iframecss06 = '<style> .root.parsys{ display:flex !important; }</style>';
    let Iframecss07 = '<style> .root.parsys{ justify-content: space-between; }</style>';
    let Iframecss20 = '<style> .root.parsys{ flex-wrap: wrap; }</style>';
    let Iframecss08 = '<style> .root.parsys{ width: 100%; }</style>';
    let Iframecss09 = '<style> .contact-us-mailto{ color: #004f71; }</style>';
    let Iframecss10 = '<style> .contact-us-mailto{ font-weight: bold; }</style>';
    let Iframecss11 = '<style> .contact-us-mailto{ cursor: pointer; }</style>';
    let Iframecss15 = '<style> .contact-us-mailto{ margin-right: 20px; }</style>';
    let Iframecss16 = '<style> p { margin-bottom: 0px; }</style>';
    let Iframecss17 = '<style> .text p:first-of-type{ color: #222731; }</style>';
    let Iframecss21 = '<style> .text{ padding-bottom: 50px; }</style>';
    let Iframecss22 = '<style> .text{ flex: 0 0 50%; }</style>';
    let Iframecss18 = '<style> .root.parsys p a{ color: #004f71 !important; }</style>';
    let Iframecss19 = '<style> .root.parsys{ padding-right: 20px; }</style>';

    $(headmb).append(Iframecss01);
    $(headmb).append(Iframecss02);
    $(headmb).append(Iframecss03);
    $(headmb).append(Iframecss04);
    $(headmb).append(Iframecss06);
    $(headmb).append(Iframecss07);
    $(headmb).append(Iframecss08);
    $(headmb).append(Iframecss09);
    $(headmb).append(Iframecss10);
    $(headmb).append(Iframecss11);
    $(headmb).append(Iframecss15);
    $(headmb).append(Iframecss16);
    $(headmb).append(Iframecss17);
    $(headmb).append(Iframecss18);
    $(headmb).append(Iframecss19);
    $(headmb).append(Iframecss20);
    $(headmb).append(Iframecss21);
    $(headmb).append(Iframecss22);

    if ($(window).width() < 767) {
        let Iframecss23 = '<style> body{ text-align: center }</style>';
        let Iframecss24 = '<style> .root.parsys{ display: block !important }</style>';
        let Iframecss25 = '<style> .text{ margin-bottom: 30px !important; }</style>';
        let Iframecss26 = '<style> .text{ flex: 0 0 100%; }</style>';
        let Iframecss30 = '<style> .text{ padding-bottom: 0px !important; }</style>';

        $(headmb).append(Iframecss23);
        $(headmb).append(Iframecss24);
        $(headmb).append(Iframecss25);
        $(headmb).append(Iframecss26);
        $(headmb).append(Iframecss30);

    }
    $(window).resize(function () {

        if ($(window).width() > 768) {
            let Iframecss31 = '<style> .root.parsys{ display: inline-flex; }</style>';
            let Iframecss32 = '<style> .root.parsys{ justify-content: space-between; }</style>';
            let Iframecss33 = '<style> body{ text-align: left }</style>';
            $(headmb).append(Iframecss31);
            $(headmb).append(Iframecss32);
            $(headmb).append(Iframecss33);
        }
        if ($(window).width() < 767) {
            let Iframecss12 = '<style> body{ text-align: center }</style>';
            let Iframecss13 = '<style> .root.parsys{ display: block  }</style>';
            let Iframecss14 = '<style> .text{ margin-bottom: 30px !important; }</style>';
            $(headmb).append(Iframecss12);
            $(headmb).append(Iframecss13);
            $(headmb).append(Iframecss14);
        }

    });
}
// mobile modal
$(document).on('click', '#step2ContinueMobile', function (e) {
    e.preventDefault();
    let $url = $(this).attr('data-relatedresource');
    $('li.wizard-step[data-wizard="2"]').removeClass('a-wizard__step--complete').addClass('a-wizard__step--incomplete');
    if ($url.indexOf('.html') == -1) {
        $url = $url + '.html';
    }
    $('#contactUsDetailsMobile').find('iframe').attr('src', $url);
    $('#contactUsDetailsMobile').find('iframe').attr('id', 'contactStep3Mobile');

    setTimeout(mobileMain, 500);
});

//Show number instead of complete icon for step wizard 2 
$(document).on('click', '#step3Back', function (e) {
    e.preventDefault();
    $('li.wizard-step[data-wizard="1"]').removeClass('a-wizard__step--complete').addClass('a-wizard__step--incomplete');
});
//Show number instead of complete icon for step wizard 1 
$(document).on('click', '#step2Back', function (e) {
    e.preventDefault();
    $('li.wizard-step[data-wizard="0"]').removeClass('a-wizard__step--complete').addClass('a-wizard__step--incomplete');
});


//check for external links and close modal
$(document).on('click', '#cancelRedirection', function (e) {
    if ($('#externalLink-modal').length) {
        e.preventDefault();
        $('#externalLink-modal').find('.generic-modal--close').click();
    }
});

$(document).ready(function () {
    if (window.innerWidth > 992) {
        $("#section-quickSearch").parent().css({ "max-width": "970px" });
    }
});
$(document).on('click', '#OrderPhysicalCopyManuals', function (e) {
    const contact_countryphysical = $('label[for="contactUsCountriesPhysical"]').closest('.a-dropdown__container');
    const contact_languagesphysical = $('label[for="contactUsLanguagesPhysical"]').closest('.a-dropdown__container');
    const $cd = $search.getLocalStorage('curr-country-cd') ? $search.getLocalStorage('curr-country-cd') : '';
    const $curr_lang = $search.getLocalStorage('curr-lang') ? $search.getLocalStorage('curr-lang') : '';

    if (contact_countryphysical.length && contact_languagesphysical.length) {
        if ($cd) {
            contact_countryphysical.find('select').val($cd);
        }
        if ($curr_lang) {
            let $lang = $formsManuals.getLanguageManuals($curr_lang);

            contact_languagesphysical.find('select').val($lang[0]);
        }
    }
});

$(document).on('click', '#contactIconDesktopManuals', function (e) {

    const contact_countryphysicalde = $('label[for="contactUsCountries"]').closest('.a-dropdown__container');
    const contact_languagesphysicalde = $('label[for="contactUsLanguages"]').closest('.a-dropdown__container');
    const $cdde = $search.getLocalStorage('curr-country-cd') ? $search.getLocalStorage('curr-country-cd') : '';
    const $curr_langde = $search.getLocalStorage('curr-lang') ? $search.getLocalStorage('curr-lang') : '';

    if (contact_countryphysicalde.length && contact_languagesphysicalde.length) {

        if ($cdde) {
            contact_countryphysicalde.find('select').val($cdde);
        }
        if ($curr_langde) {
            let $langph = $formsManuals.getLanguageManuals($curr_langde);
            contact_languagesphysicalde.find('select').val($langph[0]);
        }
    }
});

//mobile modal

$(document).on('click', '#contactTextMobileManuals', function (e) {
    const contact_countryphysicalmb = $('label[for="contactUsCountriesMobile"]').closest('.a-dropdown__container');
    const contact_languagesphysicalmb = $('label[for="contactUsLanguagesMobile"]').closest('.a-dropdown__container');
    const $cdmb = $search.getLocalStorage('curr-country-cd') ? $search.getLocalStorage('curr-country-cd') : '';
    const $curr_langmb = $search.getLocalStorage('curr-lang') ? $search.getLocalStorage('curr-lang') : '';

    if (contact_countryphysicalmb.length && contact_languagesphysicalmb.length) {
        if ($cdmb) {
            contact_countryphysicalmb.find('select').val($cdmb);
        }
        if ($curr_langmb) {
            let $langmb = $formsManuals.getLanguageManuals($curr_langmb);
            contact_languagesphysicalmb.find('select').val($langmb[0]);
        }
    }
});