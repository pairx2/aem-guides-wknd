const setProductCategoryDataToDB = async (categoryDetails) => {
    const dbName = "MyDatabaseForEIFU";
    const dbVersion = 1;
  
    const openDB = () => {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion);
  
        request.onerror = function (event) {
          console.error("Error opening database:", event.target.error);
          reject(event.target.error);
        };
  
        request.onupgradeneeded = function (event) {
          const db = event.target.result;
  
          // Create an object store (similar to a table) to store our data
          if (!db.objectStoreNames.contains("myObjectStore")) {
            db.createObjectStore("myObjectStore", { keyPath: "division" });
          }
        };
  
        request.onsuccess = function (event) {
          resolve(event.target.result);
        };
      });
    };
  
    const db = await openDB();
  
    // Start a transaction to add data
    const transaction = db.transaction(["myObjectStore"], "readwrite");
  
    transaction.onerror = function (event) {
      console.error("Transaction failed:", event.target.error);
    };
  
    const objectStore = transaction.objectStore("myObjectStore");
  
    // Add the JSON object to the object store
    const addData = () => {
      return new Promise((resolve, reject) => {
        const addRequest = objectStore.add(categoryDetails);
  
        addRequest.onsuccess = function (event) {
          resolve(event.target.result);
        };
  
        addRequest.onerror = function (event) {
          console.error("Error adding JSON object:", event.target.error);
          reject(event.target.error);
        };
      });
    };
  
    await addData();
  
    // Close the transaction
    transaction.oncomplete = function () {
      db.close();
    };
};

const deleteProductCategoryDataToDB = () => {
  const DBDeleteRequest = indexedDB.deleteDatabase("MyDatabaseForEIFU");

  DBDeleteRequest.onerror = function (event) {
    console.error("Error deleting database:", event.target.error);
  };

  DBDeleteRequest.onsuccess = function (event) {
  };
};

const getProductCategoryDataFromDB = async() => {
  const dbName = "MyDatabaseForEIFU";
  const dbVersion = 1;
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = function (event) {
      console.error("Error opening database:", event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = function (event) {
      const db = event.target.result;

      // Start a transaction to retrieve data
      const transaction = db.transaction(["myObjectStore"], "readonly");
      const objectStore = transaction.objectStore("myObjectStore");

      // Use the get method to retrieve the JSON object
      const getRequest = objectStore.get("av");

      getRequest.onsuccess = function (event) {
        if (getRequest.result) {
          resolve(getRequest.result); // Resolve the promise with the data
        } else {
          resolve(null);
        }
      };

      getRequest.onerror = function (event) {
        console.error("Error retrieving JSON object:", event.target.error);
        reject(event.target.error);
      };

      // Close the transaction
      transaction.oncomplete = function () {
        db.close();
      };
    };
  });
};

const $forms = (function(){

    //set country language data for eifu to be used further
    const setLanguageCountryData = function(data){
        if(!data){
            return false;
        }
        let languagesArr = [];

        data.length && data.map(dt => {
            let obj = {
                code: null,
                country: null,
                languages: []
            };
            let langObj = {
                language: null
            };
            let isMatched = false;
            languagesArr.map(lg => {
                let cntry = $search.getName(dt.key).name && $search.getName(dt.key).name.split(' ');
                if(cntry && cntry.length > 1 && cntry[0] === dt.parentKey){
                    cntry = cntry.slice(1,cntry.length).join(" ");
                }
                else{
                    cntry = cntry.join(" ");
                }

                if($search.getName(lg.country).id === $search.getName(cntry).id){
                    langObj.language = $search.getName(dt.value).name;
                    lg.languages.push(langObj);
                    isMatched = true;
                    return;
                }
                return true;
            })
            if(!isMatched){
                let country = $search.getName(dt.key).name && $search.getName(dt.key).name.split(' ');
                if(country && country.length > 1 && country[0] === dt.parentKey){
                    country = country.slice(1,country.length).join(" ");
                }
                else{
                    country = country.join(" ");
                }
                obj.code = $search.getName(dt.parentKey).id ? $search.getName(dt.parentKey).id : $search.getName(dt.key).id;
                obj.country = country;
                langObj.language = $search.getName(dt.value).name;
                obj.languages.push(langObj);
                languagesArr.push(obj);
            }
            return true;
        });
        languagesArr = languagesArr.sort(GetSortOrder("country"));
        return languagesArr;
    }

    //get language details
    //to be called once on initiation
    const getCountryLanguageData = function(){
        const lang = $search.getLocalStorage('languages');
        if(!lang.length){
            //call esl service here and get languages
            const url = $globals.countryLanguageBaseURL && $globals.countryLanguageQueryParam ? $globals.countryLanguageBaseURL +"?"+ $globals.countryLanguageQueryParam : $globals.countryLanguageDefaultURL;
            $.ajax({
                url: url,
                headers:$globals.eslCountryLangHeaderTemplate,
                type: "POST", /* or type:"GET" or type:"PUT" */
                dataType: "json",
                data: {
                },
                success: function (obj) {
                    const dt = setLanguageCountryData(obj.response);
                    $search.setLocalStorage('languages', dt);
                    initForms();
                },
                error: function () {
                    console.log("error fetching country data!!");
                }
            });
        
        }
    }

    //sort data json
    //Comparer Function    
    const GetSortOrder = function(prop) {    
        return function(a, b) {    
            if (a[prop] > b[prop]) {    
                return 1;    
            } else if (a[prop] < b[prop]) {    
                return -1;    
            }    
            return 0;    
        }    
    }

    //filter details using country code
    const getDetailsByCode = function(langArry, code){
        if(!langArry){
            return false;
        }
        return langArry.find(o => o.code === code);
    }

    //initiate country input from JSON
    const initCountryField = function(langArry,parent){
        let listCon = $templates.fieldsetOptionsContainer();
        if(listCon.length){
            listCon = $.parseHTML(listCon);
            const optionsCountry = $(listCon).clone();
            if(parent){
                $(parent).find('.country-option-link').remove();
            }

            let optionDef = `<option class="country-option-link"
                                data-country="${$search.getName($globals.defaultCountry).name}"
                                data-country-cd="${$globals.defaultCountryCode}"
                                value="${$globals.defaultCountryCode ? $globals.defaultCountryCode : $search.getName($globals.defaultCountryCode).id}">
                                    ${$globals.defaultCountryCode ? $globals.defaultCountryCode+ ' '+$search.getName($globals.defaultCountry).name : $search.getName($globals.defaultCountry).name}
                            </option>`
            optionDef = $.parseHTML(optionDef);
            $(optionDef).appendTo(optionsCountry);

            langArry && langArry.map((op) => {
                if(op.code != $globals.defaultCountryCode){
                    let option = `<option class="country-option-link"
                                        data-country="${$search.getName(op.country).name}"
                                        data-country-cd="${op.code}"
                                        value="${op.code ? op.code : $search.getName(op.country).id}">
                                            ${op.code !== $search.getName(op.country).id ? op.code+ ' '+$search.getName(op.country).name : $search.getName(op.country).name}
                                    </option>`
                    option = $.parseHTML(option);
                    $(option).appendTo(optionsCountry);
                } 
                return true;           
            });
            if(parent){
                let title = parent.find('.a-dropdown__title').text();
                parent.find('.a-dropdown__field').addClass('d-none');
                parent.find('.fieldset_option_container').remove();
                parent.append(optionsCountry);
                title = title.split('*')[0];
                parent.find('.fieldset_option_list_default').text(title ? title : $globals.countryDefaultText);
            }           
        }
    }

    //initiate language input from JSON
    const initLanguageField = function(langArry, code, parent){
        let listCon = $templates.fieldsetOptionsContainer();
        if(listCon.length){
            listCon = $.parseHTML(listCon);
            const optionsLanguage = $(listCon).clone();
            if(parent){
                parent.find('.language-option-link').remove();
            }
            
            let langDet = getDetailsByCode(langArry, code);
            if(langDet && langDet.languages){
                langDet.languages.map((op) => {
                    let option = `<option class="language-option-link"
                                        value="${$search.getName(op.language).id}">${$search.getName(op.language).name}
                                    </option>`
                    option = $.parseHTML(option);
                    if(parent.find('.fieldset_option_container').length){
                        $(option).appendTo(parent.find('.fieldset_option_container'));
                    }
                    else{
                        $(option).appendTo(optionsLanguage);
                    }  
                    return true;                 
                });
            }
            if(parent){
                let title = parent.find('.a-dropdown__title').text();
                parent.find('.a-dropdown__field').addClass('d-none');
                if(!parent.find('.fieldset_option_container').length){
                    parent.append(optionsLanguage);
                }
                title = title.split('*')[0];
                parent.find('.fieldset_option_list_default').text(title ? title : $globals.languageDefaultText);
            }
        }       
    }

    //get language code for the language selected
    const getLanguageCode = function(language){
        let langCodes = $('#languagesList').val() ? JSON.parse($('#languagesList').val()) : $globals.languagesList;
        const code = langCodes[language] ? langCodes[language] : $globals.defaultLanguage;
        return code;
    }

    const validateElabelingForm = function(){
        const elabeling_country = $('label[for="elabelingCountries"]').closest('.a-dropdown__container').find('select');
        const elabeling_languages = $('label[for="elabelingLanguages"]').closest('.a-dropdown__container').find('select');
        const elabeling_isHCP = $('#elabelingHCP-options').find('.a-radio--selected').find('input');
        let isFormValid = true;
        if(!elabeling_country.length || !elabeling_languages.length || !elabeling_isHCP){
            return false;
        }
        if(!$(elabeling_country).find('option:selected').val() && $(elabeling_country).closest('.a-dropdown').find('.a-input-field--text-require').length){
            $(elabeling_country).closest('.a-dropdown').find('.a-input-field--text-require').css({'display':'block'});
            $(elabeling_country).css({'background-color': $globals.fieldErrorBackground});
            isFormValid = false;
        }
        if(!$(elabeling_languages).find('option:selected').val() && $(elabeling_languages).closest('.a-dropdown').find('.a-input-field--text-require').length){
            $(elabeling_languages).closest('.a-dropdown').find('.a-input-field--text-require').css({'display':'block'});
            $(elabeling_languages).css({'background-color': $globals.fieldErrorBackground});
            isFormValid = false;
        }
        if(!$(elabeling_isHCP).val() && $(elabeling_isHCP).closest('.a-dropdown').find('.a-input-field--text-require').length){
            $(elabeling_isHCP).closest('.radio').find('.radio--text-require').css({'display':'block'});
            isFormValid = false;
        }

        if(isFormValid){
            $search.setLocalStorage('isHCP', $(elabeling_isHCP).val());
            $search.setLocalStorage('curr-country-cd', $(elabeling_country).find('option:selected').val());
            $search.setLocalStorage('curr-country', $(elabeling_country).find('option:selected').text());
            $search.setLocalStorage('curr-lang', $(elabeling_languages).find('option:selected').val())
        }

        return isFormValid;
    }

    const validateHeaderForm = function(){
        const modal_country = $('.lang-search-country fieldset.drop-down').find('select');
        const modal_languages = $('.lang-search-language fieldset.drop-down').find('select');
        let isFormValid = true;

        if(!modal_country.length || !modal_languages.length){
            return false;
        }
        if(!$(modal_country).find('option:selected').val() && $(modal_country).closest('.a-dropdown').find('.a-input-field--text-require').length){
            $(modal_country).css({'background-color': $globals.fieldErrorBackground});
            $(modal_country).closest('.a-dropdown').find('.a-input-field--text-require').css({'display':'block'});
            isFormValid = false;
        }
        if(!$(modal_languages).find('option:selected').val() && $(modal_languages).closest('.a-dropdown').find('.a-input-field--text-require').length){
            $(modal_languages).css({'background-color': $globals.fieldErrorBackground});
            $(modal_languages).closest('.a-dropdown').find('.a-input-field--text-require').css({'display':'block'});
            isFormValid = false;
        }
        
        if(isFormValid){
            $search.setLocalStorage('curr-country-cd', $(modal_country).find('option:selected').val());
            $search.setLocalStorage('curr-country', $(modal_country).find('option:selected').text());
            $search.setLocalStorage('curr-lang', $(modal_languages).find('option:selected').val());
        }

        return isFormValid;
    }

    //initiate category dropdown from JSON
    const initCategoryDropdownField = function(catArry,parent){
        let listCon = $templates.fieldsetOptionsContainer();
        if(listCon.length){
            listCon = $.parseHTML(listCon);
            const optionsCat = $(listCon).clone();
            if(parent){
                $(parent).find('.category-option-link').remove();
            }
            catArry && catArry.categories && catArry.categories.map((op) => {
                let option = `<option class="category-option-link"
                                    data-cat="${$search.getName(op.category).name}"
                                    value="${op.id}">${$search.getName(op.category).name}
                                </option>`
                option = $.parseHTML(option);
                $(option).appendTo(optionsCat);
                return true;
            });
            if(parent){
                let title = parent.find('.a-dropdown__title').text();
                parent.find('.a-dropdown__field').addClass('d-none');
                parent.find('.fieldset_option_container').remove();
                parent.append(optionsCat);
                title = title.split('*')[0];
                parent.find('.fieldset_option_list_default').text(title ? title : $globals.categoryDefaultText);
            }           
        }
    }

    //initiate sub category drop down from JSON
    const initSubCategoryDropdownField = function(catArry, code, parent){
        let listCon = $templates.fieldsetOptionsContainer();
        if(listCon.length){
            listCon = $.parseHTML(listCon);
            const optionsSubCat = $(listCon).clone();
            if(parent){
                parent.find('.sub-cat-option-link').remove();
            }
            
            const sub = $productCategory.getCategoryDetails(catArry, code);
            if(sub && sub.length && sub[0].subCategories){
                sub[0].subCategories.map((op) => {
                    let option = `<option class="sub-cat-option-link"
                                        value="${$search.getName(op.subcatId).id}">${$search.getName(op.name).name}
                                    </option>`
                    option = $.parseHTML(option);
                    if(parent.find('.fieldset_option_container').length){
                        $(option).appendTo($(parent).find('.fieldset_option_container'));
                    }
                    else{
                        $(option).appendTo(optionsSubCat);
                    } 
                    return true;                  
                });
            }
            if(parent){
                let title = parent.find('.a-dropdown__title').text();
                parent.find('.a-dropdown__field').addClass('d-none');
                if(!parent.find('.fieldset_option_container').length){
                    parent.append(optionsSubCat);
                }
                title = title.split('*')[0];
                parent.find('.fieldset_option_list_default').text(title ? title : $globals.subCategoryDefaultText);
                if(code === 'default'){
                    parent.find('select').attr('disabled', true);
                    parent.find('.a-dropdown__title').addClass('d-none');
                }
                else{
                    parent.find('select').removeAttr('disabled');
                    parent.find('.a-dropdown__title').removeClass('d-none');
                }
            }
        }       
    }

    //initiate products drop down from JSON
    const initProductsDropdownField = function(catArry, cat, subCat, parent){
        let listCon = $templates.fieldsetOptionsContainer();
        if(listCon.length){
            listCon = $.parseHTML(listCon);
            const optionsProducts = $(listCon).clone();
            if(parent){
                parent.find('.product-option-link').remove();
            }
            
            const sub = $productCategory.getSubCategoryDetails(catArry, cat, subCat);
            let products = [];
            if(sub && sub.length && sub[0].products){
                sub[0].products.map((op) => {
                    let isMatched = false;
                    products.length && products.map(p => {
                        if(p === $search.getName(op.arry[0].productname).name){
                            isMatched = true;
                        }
                        return true;
                    })
                    if(!isMatched){
                        products.push($search.getName(op.arry[0].productname).name);
                        let option = `<option class="product-option-link"
                                value="${$search.getName(op.arry[0].productname).id}"
                                data-relatedresource="${$search.getName(op.arry[0].relatedresource).name}">${$search.getName(op.arry[0].productname).name}
                            </option>`
                        option = $.parseHTML(option);
                        if(parent.find('.fieldset_option_container').length){
                            $(option).appendTo($(parent).find('.fieldset_option_container'));
                        }
                        else{
                            $(option).appendTo(optionsProducts);
                        }
                    } 
                    return true;                                    
                });
            }
            if(parent){
                let title = parent.find('.a-dropdown__title').text();
                parent.find('.a-dropdown__field').addClass('d-none');
                if(!parent.find('.fieldset_option_container').length){
                    parent.append(optionsProducts);
                }
                title = title.split('*')[0];
                parent.find('.fieldset_option_list_default').text(title ? title : $globals.productsDefaultText);
                if(cat === 'default' || subCat === 'default'){
                    parent.find('select').attr('disabled', true);
                    parent.find('.a-dropdown__title').addClass('d-none');
                }
                else{
                    parent.find('select').removeAttr('disabled');
                    parent.find('.a-dropdown__title').removeClass('d-none');
                }
            }
        }       
    }

    //initialise search product input
    const initSearchProductField = function(inp, catData){
        let listCon = $templates.inputDatasetContainer();
        if(listCon.length){
            listCon = $.parseHTML(listCon);
            const optionsProducts = $(listCon).clone();

            const products = $productCategory.getAllProducts(catData);
            let uniqueProd = [];
            products.map(op => {
                let isMatched = false;
                uniqueProd.length && uniqueProd.map(p => {
                    if(p === $search.getName(op.productname).name){
                        isMatched = true;
                    }
                    return true;
                });
                if(!isMatched){
                    uniqueProd.push($search.getName(op.productname).name);
                    let option = `<a class="product-search-link" href="javascript:;"
                                        data-category="${$search.getName(op.category).id}"
                                        data-subCategory="${$search.getName(op.subcategory).id}"
                                        data-relatedresource="${$search.getName(op.relatedresource).name}"
                                        data-product="${$search.getName(op.productname).id}"
                                        data-product-name="${$search.getName(op.productname).name}">${$search.getName(op.productname).name}
                                    </a>`
                    option = $.parseHTML(option);
                    $(option).appendTo(optionsProducts);
                }  
                return true;            
            })
            $('#'+inp).closest('.form-group').append(optionsProducts);
        }
    }

    const filterProductInSearch = function(inp, dropdown) {
        var input, filter, div, a, i;
        input = document.getElementById(inp);
        filter = input.value.toUpperCase();
        div = document.getElementById(dropdown);
        a = div && div.getElementsByTagName("a");
        if(a && a.length){
            for (i = 0; i < a.length; i++) {
               let txtValue = a[i].getAttribute('data-product-name');
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    const selected = getFilterTextBold(txtValue, input.value);
                    a[i].innerHTML = selected;
                  a[i].style.display = "";
                } else {
                  a[i].style.display = "none";
                }
            }
        }
    }

    const getFilterTextBold = function(str, filter){
        const searchLen = filter.length;
        const searchIndex = str.toUpperCase().indexOf(filter.toUpperCase());
        const startInd = searchIndex > 0 ? searchIndex : 0;
        const startText = str.substr(0, searchIndex);
        const endText = str.slice((startInd+searchLen));
        const filterText = str.substr(searchIndex, searchLen);
        return startText + '<b>'+filterText+'</b>' + endText;
    }

    const isContactUsValid = function(){
        const contact_country = $('label[for="contactUsCountries"]').closest('.a-dropdown__container').find('select');
        const contact_languages = $('label[for="contactUsLanguages"]').closest('.a-dropdown__container').find('select');
        const contact_category = $('label[for="contactUsCategories"]').closest('.a-dropdown__container').find('select');
        const contact_subCategory = $('label[for="contactUsSubCategories"]').closest('.a-dropdown__container').find('select');
        const contact_products = $('label[for="contactUsProducts"]').closest('.a-dropdown__container').find('select');
        const contact_search = $('#contactUsSearch');
        let isFormValid = true;

        if(!contact_country.find('option:selected').val() || !contact_languages.find('option:selected').val()){
            isFormValid = false;
        }

        if((!contact_category.find('option:selected').val() || 
                !contact_subCategory.find('option:selected').val() || !contact_products.find('option:selected').val())){
            isFormValid = false;
        }

        if(contact_search.attr('isSelected') == 'true'){
            isFormValid = true;
        }

        return isFormValid;
    }


    //initiate all forms in eifu
    const initForms = function(){
        const langArry = $search.getLocalStorage('languages');
        const catDet = sessionStorage.getItem('contactUsDetails') ? JSON.parse(sessionStorage.getItem('contactUsDetails')) : {};
        const parent_country = $('.lang-search-country fieldset.drop-down').find('.a-dropdown__container');
        const parent_language = $('.lang-search-language fieldset.drop-down').find('.a-dropdown__container');
        const elabeling_country = $('label[for="elabelingCountries"]').closest('.a-dropdown__container');
        const elabeling_languages = $('label[for="elabelingLanguages"]').closest('.a-dropdown__container');
        const elabeling_isHCP = $('label[for="elabelingHCP"]').closest('.options');
        const contact_country = $('label[for="contactUsCountries"]').closest('.a-dropdown__container');
        const contact_languages = $('label[for="contactUsLanguages"]').closest('.a-dropdown__container');
        const contact_category = $('label[for="contactUsCategories"]').closest('.a-dropdown__container');
        const contact_subCategory = $('label[for="contactUsSubCategories"]').closest('.a-dropdown__container');
        const contact_products = $('label[for="contactUsProducts"]').closest('.a-dropdown__container');
        const cd = $search.getLocalStorage('curr-country-cd') ? $search.getLocalStorage('curr-country-cd') : '';
        const curr_lang = $search.getLocalStorage('curr-lang') ? $search.getLocalStorage('curr-lang') : '';
        const isHcp = $search.getLocalStorage('isHCP') ? $search.getLocalStorage('isHCP') : '';

        if(parent_country.length && parent_language.length){
            $forms.initCountryField(langArry, parent_country);
            $forms.initLanguageField(langArry,cd, parent_language); 
            if(cd){
                parent_country.find('select').val(cd);            
            }  
            if(curr_lang){
                parent_language.find('select').val(curr_lang);
            }
        }
        if(elabeling_country.length && elabeling_languages.length){
            $forms.initCountryField(langArry, elabeling_country);
            $forms.initLanguageField(langArry, cd, elabeling_languages);
            //removed below code to fix auto-select country and language
           
        }
        if(elabeling_isHCP.length && isHcp){
            elabeling_isHCP.find('.a-radio').removeClass('a-radio--selected').addClass('a-radio--default');
            elabeling_isHCP.find('.a-radio').find('.a-radio__custom').addClass('without-after-content');
            elabeling_isHCP.find('input[value='+isHcp+']').closest('.a-radio').addClass('a-radio--selected').removeClass('a-radio--default');
            elabeling_isHCP.find('input[value='+isHcp+']').closest('.a-radio').find('.a-radio__custom').removeClass('without-after-content');
            $('.a-radio--default').find('input[type="radio"]').removeAttr('checked');
            $('.a-radio--selected').find('input[type="radio"]').attr('checked','true');
        }
        if(contact_country.length && contact_languages.length){
            $forms.initCountryField(langArry, contact_country);
            $forms.initLanguageField(langArry, cd, contact_languages);       
            if(cd){
                contact_country.find('select').val(cd);           
            }  
            if(curr_lang){
                contact_languages.find('select').val(curr_lang);
            } 
        }
        if(catDet && catDet.categories){
            if(contact_category.length){           
                $forms.initCategoryDropdownField(catDet, contact_category);
                $forms.initSubCategoryDropdownField(catDet, 'default', contact_subCategory);
                $forms.initProductsDropdownField(catDet, 'default', 'default', contact_products);
    
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
            $forms.initSearchProductField('contactUsSearch', catDet);
        }
    }

    const getNewUrlWithLangCode = function(lang){
        let langCodeSelected = $globals.languagesList[lang] ? 
                    $globals.languagesList[lang] : $globals.defaultLanguage;
        const oldLang = $globals.languagesList[$search.getLocalStorage('curr-lang')] ? $globals.languagesList[$search.getLocalStorage('curr-lang')] : $globals.defaultLanguage;
        let urlParams = location.pathname ? location.pathname.split('/') : [];
        if(!lang && urlParams.length){
            urlParams.map(pr => {
                if(pr){
                    for (const [key, value] of Object.entries($globals.languagesList)) {
                        if(pr === value){
                            langCodeSelected = $globals.languagesList[key];
                        }
                    }
                }
                return true;
            })
        }
        if(urlParams.length && langCodeSelected && langCodeSelected !== oldLang){
            const index = lang ? urlParams.indexOf(oldLang) : urlParams.indexOf(langCodeSelected);
            if (index !== -1) {
                urlParams[index] = lang ? langCodeSelected : oldLang;
            }
        }
        urlParams = urlParams.join('/');
        return location.origin + urlParams;
    }

    const getQueryParams = function(name){       
        const results = new RegExp('[\?&]' + name + '=([^&#]*)')
                            .exec(location.search);
        let queryVal = null;
    
        if (results !== null){
            queryVal = results[1] || 0;
            sessionStorage.setItem(name, queryVal);
        } 
        return queryVal ? queryVal : false;
    }

    const getProductDetails = async function(productId){
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
        const products = $productCategory.getAllProducts(catData);
        let obj = products.find(o => o.tags.includes($search.getName(productId).id)? o: Array.isArray(o.tags) && o.tags.some(tag => tag.includes($search.getName(productId).id)) ? o : undefined  );
        if(obj && obj.tags){
            return obj;
        }
        else{
            return false;
        }
    }

    const checkCookie = function() {
        const lastCookie = $search.readCookie('isLogged');
        const isMainPg = $('#selectBusinessArea').length;
        if (!isMainPg && !lastCookie) {
            // redirect to index page
            if($globals.indexPageRedirectionPage){
                let currPath = location.pathname ? location.pathname.split('/') : [];
                currPath.map((p,i) => {
                    if(p.split('.html').length > 1){
                        currPath[i] = $globals.indexPageRedirectionPage;
                    }
                    return true;
                });
                const url = currPath.join('/').replace('/hcp','').replace('/nhcp','');
				const curntlang = url.split("/").slice(-2)[0];
                $search.createCookie('isLogged', true, 1);
                $search.setLocalStorage('curr-lang', curntlang);
            }
        }       
    }


    return{
        getCountryLanguageData: getCountryLanguageData,
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
        initForms: initForms,
        getLanguageCode: getLanguageCode,
        getNewUrlWithLangCode: getNewUrlWithLangCode,
        getQueryParams: getQueryParams,
        getProductDetails: getProductDetails,
        checkCookie: checkCookie
    }
})();

$(document).ready(function(){
    $forms.getQueryParams('product');
    // reload page with current country code selected
    const currLang = $search.getLocalStorage('curr-lang');
    const langArry = $search.getLocalStorage('languages');
    if(!langArry || !(langArry && langArry.length)){
        $forms.getCountryLanguageData();
    }
    $forms.initForms();
    if(!$search.checkIfEditorMode() && !$('#selectBusinessArea').length){
        $search.createCookie('isLogged', true, 1);
        window.setInterval($forms.checkCookie, 100);
        if(!currLang){
            $search.eraseCookie('isLogged');
        }
    }
});

//select form for header modal
$(document).on('change', '.lang-search-country select', function(e){
    e.preventDefault();
    const langArry = $search.getLocalStorage('languages');
    const parent_language = $('.lang-search-language fieldset.drop-down').find('.a-dropdown__container');
    $(this).css({'background-color': '#fff'});
    $(this).closest('.a-dropdown').find('.a-input-field--text-require').css({'display':'none'});
    const code = $(this).find('option:selected').val();
    //$(this).attr('country-selected',$(this).find('option:selected').text())
    $forms.initLanguageField(langArry, code, parent_language);
});

//select form for elabeling banner and contact us page
$(document).on('change', 'label[for="elabelingCountries"] ~ select, label[for="contactUsCountries"] ~ select', function(e){
    e.preventDefault();
    const langArry = $search.getLocalStorage('languages');
    let parent_language;
    const code = $(this).find('option:selected').val();
    if($(this).closest('fieldset').attr('id')=== 'elabelingCountries-options'){
        parent_language = $('label[for="elabelingLanguages"]').closest('.a-dropdown__container');
        $forms.initLanguageField(langArry, code, parent_language);
    }
    else{
        parent_language = $('label[for="contactUsLanguages"]').closest('.a-dropdown__container');
        $forms.initLanguageField(langArry, code, parent_language);
        const lang = $('label[for="contactUsLanguages"] ~ select').find('option:selected').val();
        if(code && lang){
            $('#step1Continue').removeClass('disabled');
            $('#step1Continue').prop('disabled', false);
        }
        else{
            $('#step1Continue').addClass('disabled');
            $('#step1Continue').prop('disabled', true);
        }
    }
    $(this).css({'background-color': '#fff'});
    $(this).closest('.a-dropdown').find('.a-input-field--text-require').css({'display':'none'});
});

//remove errors
$(document).on('change', 'label[for="elabelingLanguages"] ~ select, .lang-search-language select, label[for="contactUsLanguages"] ~ select', function(e){
    e.preventDefault();
    $(this).css({'background-color': '#fff'});
    $(this).closest('.a-dropdown').find('.a-input-field--text-require').css({'display':'none'});

    const elabeling_country = $('label[for="elabelingCountries"]').closest('.a-dropdown__container').find('select');
    if($(this).closest('fieldset').attr('id')=== 'elabelingLanguages-options'){
        $search.setLocalStorage('curr-country-cd', elabeling_country.find('option:selected').val());
        $search.setLocalStorage('curr-country', elabeling_country.find('option:selected').text());
        $search.setLocalStorage('curr-lang', $(this).find('option:selected').val());
        $search.setLocalStorage('selectedCountry', elabeling_country.find('option:selected').attr('data-country'));
        sessionStorage.setItem('country', elabeling_country.find('option:selected').text());
        sessionStorage.setItem('language', $(this).find('option:selected').val());
    }
    else if($(this).closest('fieldset').attr('id')=== 'contactUsLanguages-options'){
        const country = $('label[for="contactUsCountries"] ~ select').find('option:selected').val();
        if($(this).find('option:selected').val() && country){
            $('#step1Continue').removeClass('disabled');
            $('#step1Continue').prop('disabled', false);
        }
        else{
            $('#step1Continue').addClass('disabled');
            $('#step1Continue').prop('disabled', true);
        }
    }
});

//radio button toggle
$(document).on('click', '#elabelingHCP-options .a-radio__label', function(){
    const radios = $(this).closest('fieldset');
    radios.find('.a-radio').removeClass('a-radio--selected').addClass('a-radio--default');
    radios.find('.a-radio').find('.a-radio__custom').addClass('without-after-content');
    $(this).closest('.a-radio').removeClass('a-radio--default').addClass('a-radio--selected');
    $(this).closest('.a-radio').find('.a-radio__custom').removeClass('without-after-content');
    $('.a-radio--default').find('input[type="radio"]').removeAttr('checked');
    $('.a-radio--selected').find('input[type="radio"]').attr('checked','true');
    const elabeling_isHCP = $('#elabelingHCP-options').find('.a-radio--selected').find('input');
    $search.setLocalStorage('isHCP', $(elabeling_isHCP).val());
    let role = $search.getLocalStorage('isHCP') ? $search.getLocalStorage('isHCP') : 'NHCP';
    role = role && (role.toUpperCase() === 'Y' || role.toUpperCase() === 'YES' || role.toUpperCase() === 'HCP' || role.toUpperCase() === 'TRUE') ? 'HCP' : 'NHCP';
    sessionStorage.setItem('role', role);
});

//on submit of form
$(document).on('click','#elabelingButton', function(e){
    e.preventDefault();
    const isFormValid = $forms.validateElabelingForm();
    const productIdInQuery = sessionStorage.getItem('product');
    const hcpUrl = $(this).attr('href');
    const nhcpUrl = $globals.nhcpBaseUrl ? $globals.nhcpBaseUrl : (hcpUrl && hcpUrl.replace('/hcp/','/nhcp/'));
    let role = $search.getLocalStorage('isHCP') ? $search.getLocalStorage('isHCP') : 'NHCP';
    role = role && (role.toUpperCase() === 'Y' || role.toUpperCase() === 'YES' || role.toUpperCase() === 'HCP' || role.toUpperCase() === 'TRUE') ? 'HCP' : 'NHCP';
    //set urls for redirection
    const url = (role === 'HCP') ? hcpUrl : nhcpUrl;
    const target = $(this).attr('target') === '_blank' ? '_blank' : '_self';
    //redirect to pdf page if query params present
    if(isFormValid && productIdInQuery){
        $productCategory.callForCategoryDetails(url, target, 'queryParams');    
    }
    else{
        if(isFormValid && url){
            window.open(url, target);
        }
    }  
});

//on click of step 1 continue button
// call esl to fetch details
$(document).on('click','#step1Continue', function(e){
    e.preventDefault();
    const contact_country = $('label[for="contactUsCountries"]').closest('.a-dropdown__container');
    const contact_languages = $('label[for="contactUsLanguages"]').closest('.a-dropdown__container');
    const country = contact_country.find('option:selected').attr('data-country');
    const lang = contact_languages.find('option:selected').val();
    sessionStorage.setItem('contactCountry', country);
    sessionStorage.setItem('contactLanguage', lang);
    $('#contactUsSearch').val('');
    $('#contactUsSearch').attr('isSelected', false);
    $('#contactUsSearch').closest('.input-group').find('.abt-icon').removeClass('abt-icon-cross').addClass('abt-icon-search');
    $productCategory.callForCategoryDetails(null, null, 'contactus');
});

//select form for category link in contact us
$(document).on('change', 'label[for="contactUsCategories"] ~ select', function(e){
    e.preventDefault();
    const catDet = sessionStorage.getItem('contactUsDetails') ? JSON.parse(sessionStorage.getItem('contactUsDetails')) : {};
    const parent_sub_cat = $('label[for="contactUsSubCategories"]').closest('.a-dropdown__container');
    const contact_products = $('label[for="contactUsProducts"]').closest('.a-dropdown__container');
    $(this).css({'background-color': '#fff'});
    $(this).closest('.a-dropdown').find('.a-input-field--text-require').css({'display':'none'});
    const code = $(this).find('option:selected').val();
    //$(this).attr('country-selected',$(this).find('option:selected').text())
    $forms.initSubCategoryDropdownField(catDet, code, parent_sub_cat);
    $('#contactUsSearch').val('');
    $('#contactUsSearch').attr('isSelected', false);
    $('.form-group .input-group .abt-icon').removeClass('abt-icon-cross').addClass('abt-icon-search');
    $('.form-group').find('datalist').css({'display':'none'});
    $forms.initProductsDropdownField(catDet, 'default', 'default', contact_products);
    if($forms.isContactUsValid()){
        $('#step2Continue').removeClass('disabled');
        $('#step2Continue').prop('disabled', false);
    }
    else{
        $('#step2Continue').addClass('disabled');
        $('#step2Continue').prop('disabled', true);
    }
});

//select form for category link in contact us
$(document).on('change', 'label[for="contactUsSubCategories"] ~ select', function(e){
    e.preventDefault();
    const catDet = sessionStorage.getItem('contactUsDetails') ? JSON.parse(sessionStorage.getItem('contactUsDetails')) : {};
    const parent_prod = $('label[for="contactUsProducts"]').closest('.a-dropdown__container');
    $(this).css({'background-color': '#fff'});
    $(this).closest('.a-dropdown').find('.a-input-field--text-require').css({'display':'none'});
    const code_cat = $('label[for="contactUsCategories"]').closest('.a-dropdown__container').find('select').find('option:selected').val();
    const code_sub = $(this).find('option:selected').val();
    //$(this).attr('country-selected',$(this).find('option:selected').text())
    $forms.initProductsDropdownField(catDet, code_cat, code_sub, parent_prod);
    $('#contactUsSearch').val('');
    $('#contactUsSearch').attr('isSelected', false);
    $('.form-group .input-group .abt-icon').removeClass('abt-icon-cross').addClass('abt-icon-search');
    $('.form-group').find('datalist').css({'display':'none'});
    if($forms.isContactUsValid()){
        $('#step2Continue').removeClass('disabled');
        $('#step2Continue').prop('disabled', false);
    }
    else{
        $('#step2Continue').addClass('disabled');
        $('#step2Continue').prop('disabled', true);
    }
});

//select form for category link in contact us
$(document).on('change', 'label[for="contactUsProducts"] ~ select', function(e){
    e.preventDefault();
    $('#contactUsSearch').val('');
    $('#contactUsSearch').attr('isSelected', false);
    $('.form-group .input-group .abt-icon').removeClass('abt-icon-cross').addClass('abt-icon-search');
    $('.form-group').find('datalist').css({'display':'none'});
    if($forms.isContactUsValid()){
        $('#step2Continue').removeClass('disabled');
        $('#step2Continue').prop('disabled', false);
        $('#step2Continue').attr('data-relatedresource', $(this).find('option:selected').attr('data-relatedresource'));
    }
    else{
        $('#step2Continue').addClass('disabled');
        $('#step2Continue').prop('disabled', true);
    }
});

//key event in search product - contact us
//on pressing key in search input
$(document).on('keyup','#contactUsSearch',function(e) {
    
    const contact_category = $('label[for="contactUsCategories"]').closest('.a-dropdown__container');
    const contact_subCategory = $('label[for="contactUsSubCategories"]').closest('.a-dropdown__container');
    const contact_products = $('label[for="contactUsProducts"]').closest('.a-dropdown__container');
    const catDet = sessionStorage.getItem('contactUsDetails') ? JSON.parse(sessionStorage.getItem('contactUsDetails')) : {};
    $('#contactUsSearch').attr('isSelected', false);
    $('#step2Continue').addClass('disabled');
    $('#step2Continue').prop('disabled', true);

    $forms.initCategoryDropdownField(catDet, contact_category);
    $forms.initSubCategoryDropdownField(catDet, 'default', contact_subCategory);
    $forms.initProductsDropdownField(catDet, 'default', 'default', contact_products);

    if($(this).val() && ($(this).val().length > $globals.contactUsShowFilterWordCount || 
        ($(this).val().length > $globals.contactUsShowFilterWordCount && (e.which == 32 || e.which == 13)) || 
            $('#searchProductData').find('a:visible').length)){
            $forms.filterProductInSearch('contactUsSearch','searchProductData');
            $(this).closest('.form-group').find('datalist').css({'display':'block'});
    }
    else{
        $(this).closest('.form-group').find('datalist').css({'display':'none'}); 
    }

    //hide datalist if no filters matched
    if($('#searchProductData').is(':visible') && !$('#searchProductData').find('a:visible').length){
        $(this).closest('.form-group').find('datalist').css({'display':'none'});
    }

    //check for toggling search icon
    if($(this).val() && $(this).val().length){
        $(this).closest('.input-group').find('.abt-icon').removeClass('abt-icon-search').addClass('abt-icon-cross');
    }
    else{
        $(this).closest('.input-group').find('.abt-icon').removeClass('abt-icon-cross').addClass('abt-icon-search');
    }
});

$(document).on('click','.form-group .input-group .abt-icon.abt-icon-cross',function(e) {
    e.preventDefault();
    $('#contactUsSearch').val('');
    $('#contactUsSearch').attr('isSelected', false);
    $(this).removeClass('abt-icon-cross').addClass('abt-icon-search');
    $(this).closest('.form-group').find('datalist').css({'display':'none'});
    if($forms.isContactUsValid()){
        $('#step2Continue').removeClass('disabled');
        $('#step2Continue').prop('disabled', false);
    }
    else{
        $('#step2Continue').addClass('disabled');
        $('#step2Continue').prop('disabled', true);
    }
});


//on click of search drop-down links
$(document).on('click','.product-search-link',async function(e) {
    e.preventDefault();
    // const cat = $(this).attr('data-category');
    // const subcat = $(this).attr('data-subcategory');
    // const prod = $(this).attr('data-product');
    const prod_name = $(this).attr('data-product-name');
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
    const contact_category = $('label[for="contactUsCategories"]').closest('.a-dropdown__container');
    const contact_subCategory = $('label[for="contactUsSubCategories"]').closest('.a-dropdown__container');
    const contact_products = $('label[for="contactUsProducts"]').closest('.a-dropdown__container');
    
    // --- initiate with selected data
    // $forms.initCategoryDropdownField(catDet, contact_category);
    // $forms.initSubCategoryDropdownField(catDet, cat, contact_subCategory);
    // $forms.initProductsDropdownField(catDet, cat, subcat, contact_products);
    // contact_category.find('select').val(cat);
    // contact_subCategory.find('select').val(subcat);
    // contact_products.find('select').val(prod);

    // -- empty form
    if (!$search.checkIfContactUsPage()) {
        $forms.initCategoryDropdownField(catDet, contact_category);
        $forms.initSubCategoryDropdownField(catDet, 'default', contact_subCategory);
        $forms.initProductsDropdownField(catDet, 'default', 'default', contact_products);
    }
    $('#contactUsSearch').val(prod_name);
    $('#contactUsSearch').attr('isSelected', true);
    $('.form-group .input-group .abt-icon').addClass('abt-icon-cross').removeClass('abt-icon-search');
    $('.form-group').find('datalist').css({'display':'none'});
    if($forms.isContactUsValid()){
        $('#step2Continue').removeClass('disabled');
        $('#step2Continue').prop('disabled', false);
        $('#step2Continue').attr('data-relatedresource', $(this).attr('data-relatedresource'));
    }
    else{
        $('#step2Continue').addClass('disabled');
        $('#step2Continue').prop('disabled', true);
    }
});

//Show number instead of complete icon for step wizard 3 
$(document).on('click','#step2Continue',function(e) {
    e.preventDefault();
    let url = $(this).attr('data-relatedresource');
    $('li.wizard-step[data-wizard="2"]').removeClass('a-wizard__step--complete').addClass('a-wizard__step--incomplete');
    if(url.indexOf('.html') == -1){
        url = url + '.html';
    }
    $('#contactUsDetails').find('iframe').attr('src',url);
});

//Show number instead of complete icon for step wizard 2 
$(document).on('click','#step3Back',function(e) { 
    e.preventDefault();
    $('li.wizard-step[data-wizard="1"]').removeClass('a-wizard__step--complete').addClass('a-wizard__step--incomplete');
});
//Show number instead of complete icon for step wizard 1 
$(document).on('click','#step2Back',function(e) { 
    e.preventDefault();
    $('li.wizard-step[data-wizard="0"]').removeClass('a-wizard__step--complete').addClass('a-wizard__step--incomplete');
});

//check for external links
$(document).on('click', '.accordion a', function(e){
    if($('#externalLink-modal').length && $('.accordion').length){
        e.preventDefault();
        const url = $(this).attr('href');
        const target = $(this).attr('target');
        if(url && $templates.isExternalLink(url)){
            $('#externalLink').closest('.m-popup').click();
            $('#goToUrl').attr('href', url);
        }
        else{
            if(url){
                window.open(url, target);
            }    
        }
    }
});

//check for external links and close modal
$(document).on('click', '#cancelRedirection', function(e){
    if($('#externalLink-modal').length){
        e.preventDefault();
        $('#externalLink-modal').find('.generic-modal--close').click();   
    }
});

//check for external links and redirect to url
$(document).on('click', '#goToUrl', function(e){
    if($('#externalLink-modal').length){
        e.preventDefault();
        const url = $(this).attr('href');
        const target = $(this).attr('target');
        if(url){
            window.open(url, target);
        } 
    }
});

$(document).ready(function() {
    if(window.innerWidth > 992){
    $("#section-quickSearch").parent().css( {"max-width": "970px"});
    }
});