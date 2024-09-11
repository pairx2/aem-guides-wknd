

//function to setCookie
function setCookie(cname, cvalue, exdays) {
    let expires = "";
    if (exdays !== '') {
        let d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        expires = "expires="+ d.toUTCString();
    }
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;Secure;";
}

//function to getCookie
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i in ca) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

//function to get Cookies Obj
function getCookiesObj(cname) {
    let cVal = getCookie(cname);
    let cObj = (cVal && cVal !== "") ? JSON.parse(cVal) : cVal;
    return cObj;
}

//function to deleteCookie
function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;Secure;';
}

/** DropDown selector.
 ** dropDownId : Dropdown element ID
 ** textValue : Text to be selected from dropdwon.
**/
function dropdownPopulator(dropDownId, textValue ) {
    let dropdownUl = $("#" + dropDownId).siblings('ul');
    let length = dropdownUl.children().length;
    let value = textValue ? textValue : "";
    for(let i = 0; i < length; i++){
     let elementId = dropdownUl.children()[i].getAttribute('id');
      if( $("#"+elementId).text().trim().toUpperCase() == value.toUpperCase()) {
        dropdownUl.children()[i].setAttribute("aria-selected",true);
        dropdownUl.children()[i].setAttribute("class","selected");
        $("#" + dropDownId).removeClass("a-dropdown__placeholder").addClass("a-dropdown-selected");
        dropdownUl.attr('aria-activedescendant', elementId);
        dropdownUl.attr('aria-expanded', true);
        $("#" + dropDownId).text($("#"+elementId).text().trim());
        break;
      }
    }
}

function getProfileInfo(headers) {
    let siteSearchAPI = $('#headerSearchSuggestApi').attr('data-api');
    let domainName = siteSearchAPI.split('api')[0];
    let profileApi = "api/private/profile/profile-info";
    let fetchProfile = domainName.concat(profileApi);

    let requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };

    return fetch(fetchProfile, requestOptions);
}

function checkAddressByPostcode(headers, postcode) {
    let siteSearchAPI = $('#headerSearchSuggestApi').attr('data-api');
    let domainName = siteSearchAPI.split('api')[0];
    let checkAddressApi = "api/public/lookup/checkaddress";
    let fetchProfile = domainName.concat(checkAddressApi);

    let raw = JSON.stringify({
        "postCode": postcode
    });

    let requestOptions = {
      method: 'POST',
      headers: headers,
      body: raw,
      redirect: 'follow'
    };

    return fetch(fetchProfile, requestOptions);
}

/** Initialize dropdown with searchbar.
 ** dropdownId : Dropdown element ID
**/
function initDropdownWithSearch(dropdownId) {
    let dropdownOptions = $('#' + dropdownId + '-options');

    dropdownOptions.find('.dropdown-search-box').remove();

    let searchBoxElem = `<input type="text" placeholder="Search" tabindex="-1" class="dropdown-search-box form-control a-input-control" readonly>`;
    dropdownOptions.find(".a-dropdown__field > span:first").after(searchBoxElem);

    let searchBox = dropdownOptions.find('.dropdown-search-box');
    let dropdownField = dropdownOptions.find('.a-dropdown__field');
    let dropdownMenu = dropdownOptions.find('.a-dropdown__menu');
    let dropdownItems = dropdownOptions.find('.a-dropdown__field li span');

    dropdownItems.each(function(){
        $(this).removeClass('a-dropdown__option-text');
    });

    dropdownField.click(function() {
        searchBox.val('');
        dropdownItems.show();
    });

    searchBox.on('keyup change', function() {
        let value = this.value.toLowerCase().trim();
        dropdownItems.show().filter(function() {
            let optionValue = $(this).text().toLowerCase().trim();
            return optionValue.indexOf(value) == -1;
        }).hide();
    });

    dropdownField.on("click", function(e) {
        searchBox.blur(function() {
            dropdownField.removeClass('filter-active');
            dropdownMenu.attr("aria-expanded", false);
            $(this).prop('readonly', true);
        })
        .focus(function() {
            dropdownField.addClass('filter-active');
            dropdownMenu.attr("aria-expanded", false);
        })
        .click(function() {
            $(this).prop('readonly', false);
        });

        dropdownMenu.on('mouseover', function(){
            dropdownField.removeClass('filter-active');
            dropdownField.addClass('active');
            dropdownMenu.attr("aria-expanded", true);
        });
    });
}

/** Initialize multiple checkbox.
 ** dropdownId : Checkbox element ID
**/
function initMultiCheckbox(checkboxId) {
    let checkboxOptions = $('#' + checkboxId + '-options');
    let checkboxInputs = checkboxOptions.find('.a-checkbox label input');
    let checkboxSpans = checkboxOptions.find('.a-checkbox label .a-checkbox__custom');
    let checkboxFields = checkboxOptions.find('.a-checkbox__text, .a-checkbox__custom');

    checkboxInputs.each(function() {
        $(this).attr('data-required', false);
        $(this).next().attr('aria-checked', false);
        $(this).removeAttr('data-group-name');
    });

    checkboxSpans.first().prev().attr('data-required', true);

    checkboxFields.bind('click', function() {
        checkboxSpans.first().prev().attr('data-required', false);
        let span = $(this).parent().find('.a-checkbox__custom');

        if(span.attr('aria-checked') === 'false'){
            span.attr('aria-checked', true);
            span.prev().attr('data-required', true);
        } else if(span.attr('aria-checked') === 'true'){
            span.attr('aria-checked', false);
            span.prev().attr('data-required', false);
        }
        
        if(checkboxOptions.find('.a-checkbox__custom[aria-checked=true]').length == 0) {
            setTimeout(function () {
                checkboxOptions.addClass('validation-require');
            }, 100);
            checkboxSpans.first().prev().attr('data-required', true);
        }
    });
}
/** Get the value of multiple checkbox.
 ** dropdownId : Checkbox element ID
**/
function getMultiCheckboxValue(checkboxId, separator) {
    let checkboxOptions = $('#' + checkboxId + '-options');
    let checkboxSpans = checkboxOptions.find('.a-checkbox label .a-checkbox__custom');
    let valueArr = [];
    let valueStr = "";

    checkboxSpans.each(function() {
        if($(this).attr('aria-checked') === 'true') {
            valueArr.push($(this).siblings('.a-checkbox__input').val());
        }
    });

    if(valueArr.length > 0) {
        valueStr = valueArr.join((separator ? separator : "; "));
    }

    return valueStr;
}

function toggleEyeIconPassword() {
    $('.a-input-field .form-group .a-input-grp .icon.icon-right').addClass("abt-icon-eye-slash");
    $('.abt-icon-eye').bind('click');
}

// Code to check for the country value is UK
function isCountryCodeUK() {
    let countryCode = $("input[name='x-country-code']").attr('value');
    return (countryCode.toLowerCase() == "uk");
 }
 
/**
** Register User API
**/
function apiPOSTCall(headers,api,rawData) {
    let siteSearchAPI = $('#headerSearchSuggestApi').attr('data-api');
    let domainName = siteSearchAPI.split('api')[0];
    let urlEndpoint = domainName.concat(api);

    let requestOptions = {
      method: 'POST',
      headers: headers,
      body: rawData,
      redirect: 'follow'
    };
    return fetch(urlEndpoint, requestOptions);
}
//function to get URL parameter
function getUrlParameter(name) {
    name = name.replace(/[\\[]/, '\\[').replace(/[\\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(window.location.href);
    return results === null ? '' : decodeURIComponent(results[1]);
}
//function to check URL parameter
function hasUrlParameter(name) {
    let hasParam = (window.location.href.indexOf(name) > -1) ? true : false;
    return hasParam;
}