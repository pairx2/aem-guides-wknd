function isSingleMode(ele){
    return ele.attr('data-type') === 'single' ? true : false
}
function checkDisabledPastYears(disableDate, ele){
    return disableDate === 'pastYears' ? +ele.attr('data-disabled-years') : 0
}
function checkPastYearsDate(disableDate, disabledPastDate, initDate){
    return disableDate === 'pastYears' ? disabledPastDate : new Date(new Date().setFullYear(initDate.getFullYear() + 100))
}
function checkMinYear(disableDate, initYear){
    return disableDate === 'past' ? initYear : new Date(new Date().setFullYear(initYear - 100)).getFullYear()
}
function checkMaxYear(disableDate, initYear){
    return disableDate === 'future' ? initYear : new Date(new Date().setFullYear(initYear + 100)).getFullYear()
}
function checkMinDate(disableDate, initDate, initYear){
    return disableDate === 'past' ? initDate.setHours(0, 0, 0, 0) : new Date(new Date().setFullYear(initYear - 100))
}
function checkMaxDate(disableDate, initDate, pastYearsDate){
    return disableDate === 'future' ? initDate : pastYearsDate;
}

function formDatePicker(id) {
    let targetEl = $(id);

    if (targetEl.length == 0) {
        return;
    }

    setTimeout(function () {

        let dateContainer = targetEl.find('[data-js-component="date-picker"]');

        dateContainer.each(function () {
            let ele = $(this),
                icon = ele.find('.icon'),
                initDate = new Date(),
                initYear = initDate.getFullYear(),
                getLanguage = $('html')[0].lang,
                dateFormat = ele.attr('data-date-format'),
                disableDate = ele.attr('data-disable-date'),
                datePickerInputElements = ele.find('.a-input-grp'),
                formGroupDiv = ele.find('.a-input-field .form-group'),
                singleMode = isSingleMode(ele),
                disabledPastYears = checkDisabledPastYears(disableDate, ele),
                disabledPastDate = new Date(initDate.setFullYear(initYear - disabledPastYears)),
                datePickerElemStartHidden = ele.find('.a-date-picker__input-start .hidden-start-date'),
                datePickerElemEndHidden = ele.find('.a-date-picker__input-end .hidden-end-date'),
                pastYearsDate = checkPastYearsDate(disableDate, disabledPastDate, initDate),
                minYear = checkMinYear(disableDate, initYear),
                maxYear = checkMaxYear(disableDate, initYear),
                minDate = checkMinDate(disableDate, initDate, initYear),
                maxDate = checkMaxDate(disableDate, initDate, pastYearsDate);

            if (ele.find('.a-input-control[id*="ph-datepicker"]')) {
                let maxRange = ele.find('.a-input-control').attr('id').split('max')[1];

                if (disableDate === 'pastYears') {
                    minYear = disabledPastDate.getFullYear() - parseInt(maxRange);
                    maxYear = initYear;
                    initDate = disabledPastDate;
                } else if (disableDate === 'past') {
                    maxYear = initYear + parseInt(maxRange);
                    maxDate = new Date(new Date().setFullYear(initDate.getFullYear() + parseInt(maxRange)));
                } else {
                    minDate = new Date(new Date().setFullYear(initYear - parseInt(maxRange)));
                    minYear = new Date(new Date().setFullYear(initYear - parseInt(maxRange))).getFullYear();
                }
            }

            if (typeof disableDate === 'undefined') {
                maxDate = null;
                minDate = null;
                minYear = new Date(new Date().setFullYear(initYear - 100)).getFullYear();
                maxYear = new Date(new Date().setFullYear(initYear + 100)).getFullYear();
            }

            function startDatePicker() {
                ele.litepicker = new Litepicker({
                    element: datePickerElemStartHidden[0],
                    elementEnd: datePickerElemEndHidden[0],
                    singleMode: singleMode,
                    autoRefresh: true,
                    autoApply: true,
                    maxDate: maxDate,
                    minDate: minDate,
                    startDate: initDate,
                    lang: getLanguage,
                    dropdowns: {
                        minYear: minYear,
                        maxYear: maxYear,
                        months: true,
                        years: true,
                    },
                    format: dateFormat,
                    onSelect: function () {
                        formGroupDiv.removeClass("validation-require");
                        let startDate = ele.find('.a-date-picker__input-start .hidden-start-date').val(),
                            endDate = ele.find('.a-date-picker__input-end .hidden-end-date').val();

                        ele.find('.a-date-picker__input-start .a-input-control').val(startDate);
                        ele.find('.a-date-picker__input-end .a-input-control').val(endDate);

                        datePickerInputElements.addClass('selected');

                        setTimeout(function () {
                            ele.find(".a-input-control").focus();
                            ele.find(".a-input-control").blur();
                        }, 500)

                       ele.litepicker.hide();
                    }
                });
            }

            icon.on("click", function (e) {
                e.stopPropagation();

                $('.litepicker').remove();
                startDatePicker();

                $(this).siblings(".a-input-control").focus();
                $(this).closest(".input-group").addClass("active");

                ele.litepicker.show();
            });
        });
    }, 100);
}

function initDatePicker() {
    const formId = ['#ph-growth', '#ph-growth-sg', '#ph-datepicker-general', '#ph-sample-request-form','#ph-sample-request-form-ensure', '#ph-sample-request-form-pediasure', '#ph-sample-request-form-glucerna', '#ph-sample-request-form-similac'];

    $.each(formId, function (i, val) {
        if ($(val).length > 0) {
            formDatePicker(val);
        }
    });
}

function initNewsLetter() {
    let formID = $('#ph-footer-newsletter-signup'),
        getLength = formID.find('.form-container .fields').length,
        fieldInput = '';

    if (getLength === 0) {
        return;
    }

    switch (getLength) {
        case 1:
            fieldInput = "ph-input-field-1";
            break;
        case 2:
            fieldInput = "ph-input-field-2";
            break;
        case 3:
            fieldInput = "ph-input-field-3";
            break;
    }

    formID.find('.form-container').addClass(fieldInput);
}

function buttonToggle(otpBtn, that, ref){
    if (that.val() && !that.parents('.form-group').hasClass('validation-regex')) {
        if (ref.val() && !ref.parents('.form-group').hasClass('validation-regex')) {
            otpBtn.attr('disabled', false);
        }
    } else {
        otpBtn.attr('disabled', true);
    }
}
function otpReturn(el) {
    if (el.parents('.cmp-experiencefragment').is('#ph-footer-newsletter-signup')) {
        return;
    }
}
function returnDialing(dialingCode, mobilePhone){
    if (dialingCode == "+66" || dialingCode == "+84") {
        return mobilePhone.val().replace(mobilePhone.val()[0], dialingCode);
    } else {
        return (dialingCode + mobilePhone.val());
    }
}
function setOtpBehavior() {
    let otpField = $('#ph-otp-field');
    let otpBtn = $('#ph-otp-container .btn');
    let email = $('input[name="emailAddress"]');
    let mobilePhone = $('input[name="mobilePhone"]');
    let loadingMsg = $('#ph-otp-msg--loading');
    let successMsg = $('#ph-otp-msg--success');
    let errorExceed = $('#ph-otp-msg--exceed');
    let errorFailed = $('#ph-otp-msg--failed');

    loadingMsg.hide();
    successMsg.hide();
    errorExceed.hide();
    errorFailed.hide();
    otpField.attr('disabled', true);
    otpBtn.attr('disabled', true);

    if (otpField.length <= 0) {
		return; 
    }

    email.on('keydown, keyup', function() {
        enableOTPButton($(this), mobilePhone)
    })

    mobilePhone.on('keydown, keyup', function() {
        enableOTPButton($(this), email)
    })

    function enableOTPButton(el, ref) {
        let that = $(el);
        
        otpReturn(el);

        setTimeout(function() {
            buttonToggle(otpBtn, that, ref);
        },100)                
    }
    otpBtn.on('click', function(e) {
  		e.preventDefault();
        let apiURL = $('#session-api-url').val();
        let apiDomain = (new URL(apiURL)).hostname;
        let otpURL = "https://" + apiDomain + "/api/public/profile/otp";
        let preferredLanguage = $('input[name="x-preferred-language"]').val();
        let countryCode = $('input[name="x-country-code"]').val();
        let appId = $('input[name="x-application-id"]').val();
        let dialingCode = $('input[name="dialingCode"]').val();
        let mobilePhone_dialingCode;

        mobilePhone_dialingCode = returnDialing(dialingCode, mobilePhone);

        let apiData = {
            "email": email.val(),
            "phoneNumber": (dialingCode != null) ? mobilePhone_dialingCode : mobilePhone.val(),
        };

        errorFailed.hide();
        loadingMsg.show();
        otpBtn.attr('disabled', true);

        $.ajax({
            url: otpURL,
            headers: { 
                'x-application-id': appId, 
                'x-country-code': countryCode,
                'x-preferred-language': preferredLanguage,
                'Content-Type': 'application/json'
            },
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(apiData),
            success: function(data){
                loadingMsg.hide();
                email.attr('disabled', true);
                mobilePhone.attr('disabled', true);
         		otpBtn.attr('disabled', true);

                if (data.errorCode == 0) {
                    otpField.attr('disabled', false);
                    successMsg.show();
                } else if (data.errorCode == 1022) {
                    otpField.attr('disabled', true);
                    errorExceed.show();
                } else {
                    otpField.attr('disabled', true);
                    errorFailed.show();
                }
            },
            error: function(){
                loadingMsg.hide();
              	errorFailed.show();
                otpBtn.attr('disabled', false);
            }
        });
    })
}

function setOptionRedirect() {
    let optionRedirect = $('.options');
    let optionRedirectId = '#ph-option-redirect-options';
    let magicNumber = 100; 

    optionRedirect.each(function() {
        if ($(this).parents('.a-container').length > 0) {
            $(this).parents('.a-container').addClass('options-container').css('z-index',magicNumber);
            magicNumber--;
        }

        if ($(this).find('.drop-down').is(optionRedirectId)) {
            let options = $(this).find('.a-dropdown__menu li');

            options.each(function() {
                let url = $(this).attr('data-optionvalue');
                
                if (url) {
                    $(this).on('click',function() {
                        window.location.href = url;
                    })
                }
            });
        }
    });

    $('.footer').parents('.abbott-wrapper').addClass('footer-container').css('z-index', magicNumber);
    $('#pageContent .root:first-child').addClass('active');
    $('#ph-footer-cookie-consent, #consent-banner').insertAfter('.footer-container');
}

function dropdownAutomation() {
    let optionCity = $('#ph-city-options'),
        optionDistrict = $('#ph-district-options'),
        optionSubDistrict = $('#ph-subdistrict-options'),
        disPlaceholder = optionDistrict.find('.a-dropdown__placeholder').html(),
        subPlaceholder = optionSubDistrict.find('.a-dropdown__placeholder').html();

    function apiRequest(ele, selected) {
        let apiURL = $('#session-api-url').val(),
            apiDomain = (new URL(apiURL)).hostname,
            url = "https://" + apiDomain + "/api/public/lookup/referencedata",
            preferredLanguage = $('input[name="x-preferred-language"]').val(),
            countryCode = $('input[name="x-country-code"]').val();

        if (ele[0].id == 'ph-district-options') {
            url = url + '?referenceType=country_district&language='+ preferredLanguage +'&parentType=country_city&parentValue=' + selected;
        } else if (ele[0].id == 'ph-subdistrict-options') {
            url = url + '?referenceType=sub_district&language='+ preferredLanguage +'&parentType=country_district&parentValue=' + selected;
        }

        $.ajax({
            method: "GET",
            url: url,
            headers: {
                "x-application-id": 'anfamily',
                "x-country-code": countryCode,
                "x-preferred-language": preferredLanguage
            }
        }).done(function (data) {
            generateList(ele, data.response);
        });
    }

    function generateList(ele, list) {
        let dropdownMenu = $(ele).find(".a-dropdown__container .a-dropdown__field .a-dropdown__menu"),
            items = [];

        if  (dropdownMenu.find('li').length != 0) {
            dropdownMenu.find('li').remove();
        }

        $.each(list, function (i, el) {
            items.push(`<li data-optionvalue="${el.key}"><span>${el.value}</span></li>`);
        });

        dropdownMenu.append(items);

        onSelectDropdown(ele);
    }

    function onSelectDropdown(ele) {
        let list = $(ele).find('.a-dropdown__field li');

        list.on('click', function () {
            let value = $(this).data('optionvalue');

            if (ele[0].id == "ph-city-options") {
                dropdownDistrict(value);
            } else if (ele[0].id == 'ph-district-options') {
                dropdownSubDistrict(value);
            }
        });
    }

    function onChangeElement(ele) {
        let placeHolder = ele[0].id == 'ph-district-options' ? disPlaceholder : subPlaceholder;

        if (ele.length != 0) {
            ele.find('.a-dropdown__field').removeClass('disabled');
            ele.find('.a-dropdown__field .a-dropdown-selected').remove();
            
            if (ele.find('.a-dropdown__placeholder').length == 0) {
                ele.find(".a-dropdown__field").append("<span class='a-dropdown__placeholder'>"+ placeHolder +"</span");
            }
        }

        if (optionSubDistrict.length != 0 && ele[0].id == 'ph-district-options') {
            optionSubDistrict.find('.a-dropdown__field').addClass('disabled');
            optionSubDistrict.find('.a-dropdown__field .a-dropdown-selected').remove();

            if (optionSubDistrict.find('.a-dropdown__placeholder').length == 0) {
                optionSubDistrict.find(".a-dropdown__field").append("<span class='a-dropdown__placeholder'>"+ subPlaceholder +"</span");
            }
        }
    }

    function dropdownCity() {
        onSelectDropdown(optionCity);

        if (optionDistrict.length != 0) {
            optionDistrict.find('.a-dropdown__field').addClass('disabled')
        }

        if (optionSubDistrict.length != 0) {
            optionSubDistrict.find('.a-dropdown__field').addClass('disabled')
        }
    }

    function dropdownDistrict(value) {
        apiRequest(optionDistrict, value);
        onChangeElement(optionDistrict);
    }

    function dropdownSubDistrict(value) {
        if (optionSubDistrict.length != 0) {
            apiRequest(optionSubDistrict, value);
            onChangeElement(optionSubDistrict);
        }
    }

    dropdownCity();
}

function checkFieldValue(optionEL){
    let count = 0, value = 0;
	$.each(optionEL, function () {
		if ($(this).find('input[type="radio"]').is(':checked')) {
			let getValue = $(this).find('input[type="radio"]:checked').val();
			count++;
			value = value + parseInt(getValue);
		}
	});
	return [count, value];
}
let serialize = function(obj) {
    let str = [];
    for (let p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

function articleForm() {
    let targetEl = $('#ph-sarcf-questionnaire'),
        optionEL = targetEl.find('.options'),
        resultTrue = targetEl.find("#ph-questionaire-result-true"),
        resultFalse = targetEl.find("#ph-questionaire-result-false"),
        submitBtn = targetEl.find('[type="submit"]'),
        finalResult = 0;

    if (targetEl.length == 0) {
        return;
    }

    resultTrue.hide();
    resultFalse.hide();
    submitBtn.attr('disabled', true);

    function resultLogic(val) {
        let getParam = targetEl.find('#ph-sarcf-result').val();

        if (getParam <= val) {
            resultTrue.show();
            resultFalse.hide();
        } else {
            resultTrue.hide();
            resultFalse.show();
        }
    }

    function checkFields() {
        let [optionCount, value] = checkFieldValue(optionEL);

        if (optionEL.length == optionCount) {
            submitBtn.attr('disabled', false);
        	finalResult = value;
        }
    }

    $.each(optionEL, function () {
        let radio = $(this).find('.a-radio');

        radio.on('click', function () {
            let inputEL = $(this).find('input[type="radio"]'),
                inputAll = $(this).parent().find('input[type="radio"]');

            resultTrue.hide();
            resultFalse.hide();

            inputAll.prop('checked', false);
            inputEL.prop('checked', true);
            checkFields();
        });
    });


    submitBtn.on('click', function(e) {
        e.preventDefault();
        submitBtn.attr('disabled', true);
        resultLogic(finalResult);

        let apiURL = $('#session-api-url').val();
        let apiDomain = (new URL(apiURL)).hostname;
        let rheaURL = "https://" + apiDomain + "/api/public/eform/eforms";
        let countryCode = $('input[name="x-country-code"]').val();
        let trackingId = $('[name="GATrackingId"]').val();
        let questionArray = [];

        const urlParams = new URLSearchParams(window.location.search);

        $('input[type="radio"]:checked').each(function() {
            let checkedVal = $(this).val();
            questionArray.push(checkedVal);
        })

        let postData = {
            'StrengthResponse': questionArray[0],
            'AssistanceWalkingResponse': questionArray[1],
            'RiseChairResponse': questionArray[2],
            'ClimbResponse': questionArray[3],
            'FallsResponse': questionArray[4],
            'UTMSource': urlParams.get('utm_source'),
            'UTMCampaign': urlParams.get('utm_campaign'),
            'UTMMedium': urlParams.get('utm_medium'),
            'GATrackingId': trackingId,
            'GAClientId': getCookie('_gid'),
            'Result': finalResult
         };        

        $.ajax({
            url: rheaURL,
            headers: { 
                'x-country-code': countryCode,
                'x-application-id': 'anfamily'
            },
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            data: serialize(postData),
            success: function(data){
                if (data.errorCode == 0) {
                    submitBtn.attr('disabled', true);
                } else {
                    submitBtn.attr('disabled', false);
                }
            },
            error: function(){
                submitBtn.attr('disabled', false);
            }
        });
    })
}

function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
        let [key,value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
}

function showWeeksOfPregnancy(el, status) {        
    if (status == "false") {
        el.parents('.a-dropdown').attr('data-required', false);
        el.parents('.options').hide();
    } else {
           el.parents('.a-dropdown').attr('data-required', true);
        el.parents('.options').show();
    }
}
function customForSimilacMum() {
    let areYouPregnant = $('[name="areYouPregnant"]');
    let areYouPregnantSelected = areYouPregnant.find('li.selected');
    let weeksOfPregnancy = $('[name="weeksOfPregnancy"]');
    let dateOfBirth = $('[name="chidlDateOfBirth"]');
    let placeholder = weeksOfPregnancy.parent().find('.a-dropdown__placeholder').text();

    if(weeksOfPregnancy.length > 0 && dateOfBirth.length > 0) {
        showWeeksOfPregnancy(weeksOfPregnancy, "false");
        dateOfBirth.parents('.datepicker').hide();

        if (areYouPregnantSelected.length > 0) {
            if(areYouPregnantSelected.attr('data-optionvalue') == 'false' || areYouPregnantSelected.attr('data-optionvalue') == "False") {
                dateOfBirth.parents('.datepicker').show();
            } else {
                showWeeksOfPregnancy(weeksOfPregnancy, "true");
            }
        }

        areYouPregnant.find('li').on('click', function() {
			let selectedValue = $(this).attr('data-optionvalue');
            if (selectedValue == "True" || selectedValue == "true") {
                showWeeksOfPregnancy(weeksOfPregnancy, "true");
               	dateOfBirth.parents('.datepicker').hide();
               	dateOfBirth.val('');
            } else {
				showWeeksOfPregnancy(weeksOfPregnancy, "false");
                weeksOfPregnancy.parent().find('.a-dropdown-selected').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text(placeholder);
				weeksOfPregnancy.find('li').removeClass('selected').removeAttr('aria-selected');
               	dateOfBirth.parents('.datepicker').show();
            }	
        })
    }    
}

function verifyAddressExperian(inp) {
    let submitButton;
    let inputName = inp;

    if ($('[name="' + inputName + '"]')[0]) {
        submitButton = $('[name="' + inputName + '"]').parents('form').next().find(':submit');
        submitButton.addClass('disabled').css('pointer-events', 'none');

        $(':input[required]:visible').on("input", function() {
            if (this.name === inputName) {
                submitButton.addClass('disabled').css('pointer-events', 'none');
            } else  {
                checkMessageActive();
            }
        });
    
        $('input[type=checkbox]').change( function() {
            checkMessageActive();
        });
    
        function checkMessageActive() {
            if ($('#ph-address-msg--success').hasClass('active')) {
                submitButton.removeClass('disabled').css('pointer-events', '');
            } else {
                submitButton.addClass('disabled').css('pointer-events', 'none');
            }
        }
    }
}

function getFormAddress() {
    let postalCode = $('[name="postalCode"]');
    let unitNo = $('[name="unitNo"]');
    let addressOptions = $('[name="addressOptions"]');
    let addressOptionsPlaceholder = addressOptions.parent().find('.a-dropdown__placeholder').text();
	let address = $('[name="address"]');

    let apiURL = $('#session-api-url').val();

    let apiDetails = {
        apiDomain: (new URL(apiURL)).hostname,
        preferredLanguage: $('input[name="x-preferred-language"]').val(),
        countryCode: $('input[name="x-country-code"]').val(),
        appId: $('input[name="x-application-id"]').val()
    }

    let checkAddressURL = "https://" + apiDetails.apiDomain + "/api/public/lookup/checkaddress";
    let formattedAddressURL = "https://" + apiDetails.apiDomain + "/api/public/lookup/formatted-address";

    let msgData = {
        msgLoading: $('#ph-address-msg--loading'),
        msgSuccess: $('#ph-address-msg--success'),
        msgFailed: $('#ph-address-msg--failed')
    }

    addressOptions.parents('.options').hide();
    addressOptions.parents('.a-dropdown').attr('data-required', false);
    address.attr('type','hidden').parents('.fields').css('height', 0)
    
    unitNo.on('blur', function() {
        validateAddress($(this), postalCode)
    })

    postalCode.on('keydown, keyup', function() {
        hideAddressDropdown($(this))
        
        if ($(this).val().length >= 6 && unitNo.val() != "") {
            validateAddress($(this), unitNo)
        }
    })

    unitNo.on('keydown, keyup', function() {
        hideAddressDropdown($(this))
    })

    function hideAddressDropdown(el) {
        let that = $(el); 
        setTimeout(function() {
            if (!that.val() || that.parents('.form-group').hasClass('validation-regex')) {
                addressOptions.parents('.options').hide();
                addressOptions.parents('.a-dropdown').attr('data-required', false);
                msgData.msgLoading.removeClass('active');
                msgData.msgFailed.removeClass('active');
                msgData.msgSuccess.removeClass('active');
            }
        },100)
    }

    function validateAddress(el, ref) {
        let that = $(el); 

        addressOptions.parents('.options').hide();
        addressOptions.parents('.a-dropdown').attr('data-required', false);

        setTimeout(function() {
            if (that.val() && !that.parents('.form-group').hasClass('validation-regex')) {
                if (ref.val() && !ref.parents('.form-group').hasClass('validation-regex')) {
                    getAddress();
                }
            } else {
                msgData.msgLoading.removeClass('active');
                msgData.msgFailed.removeClass('active');
                msgData.msgSuccess.removeClass('active');
                addressOptions.parents('.options').hide();
                addressOptions.parents('.a-dropdown').attr('data-required', false);
            }
        },100)
    }

    let formInp = {
        unitNo: unitNo,
        postalCode: postalCode, 
        address: address, 
        addressOptions: addressOptions
    }

    function getAddress() {
        let apiData = {
            "unitNo":"#" + $(unitNo).val(),
            "postalCode": $(postalCode).val(),
            "countryId": "SGF"
        }

        msgData.msgLoading.addClass('active');
        msgData.msgFailed.removeClass('active');
        msgData.msgSuccess.removeClass('active');

        $.ajax({
            url: checkAddressURL,
            headers: { 
                'x-application-id': apiDetails.appId, 
                'x-country-code': apiDetails.countryCode,
                'x-preferred-language': apiDetails.preferredLanguage,
                'Content-Type': 'application/json'
            },
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(apiData),
            success: function(data){
                if (data.errorCode == 0) {
                    if (data.response.proposedAddress.length > 1) {
                    	setAddressDropdown(data.response.proposedAddress)
                    } else {
                        formattedAddressSG(data.response.proposedAddress[0].globalAddressId, formattedAddressURL, apiDetails, formInp, msgData) 
					}

                } else {
                    msgData.msgLoading.removeClass('active');
                    msgData.msgFailed.addClass('active');
                    msgData.msgSuccess.removeClass('active');
                }
            },
            error: function(){
                msgData.msgLoading.removeClass('active');
                msgData.msgFailed.addClass('active');
                msgData.msgSuccess.removeClass('active');
            }
        });
    }

    verifyAddressExperian('unitNo');

    function setAddressDropdown(dataAddress) {
		let addressHTML = "";
        $.each(dataAddress, function(index,data) {
            addressHTML += "<li data-optionvalue='"+data.globalAddressId+"'><span>"+data.address+"</span></li>"
        });
        addressOptions.empty().append(addressHTML);
        addressOptions.parent().find('.a-dropdown-selected').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text(addressOptionsPlaceholder);

        msgData.msgLoading.removeClass('active');
        addressOptions.parents('.options').show();
        addressOptions.parents('.a-dropdown').attr('data-required', true);
        $('.o-form-container__buttons button[type="submit"]').attr('disabled', true);

        addressOptions.find('li').on('click',function() {
			let globalAddressId = $(this).attr('data-optionvalue');
            formattedAddressSG(globalAddressId, formattedAddressURL, apiDetails, formInp, msgData);
            addressOptions.parents('.options').hide();
            msgData.msgLoading.addClass('active');
        });
    }
}

function formattedAddressSG(globalAddressId, formattedAddressURL, apiDetails, formInp, msgData) {
    let apiData = { "addressGlobalId": globalAddressId }
    let submitButton = $('[name="unitNo"]').parents('form').next().find(':submit');

    $.ajax({
        url: formattedAddressURL,
        headers: { 
            'x-application-id': apiDetails.appId, 
            'x-country-code': apiDetails.countryCode,
            'x-preferred-language': apiDetails.preferredLanguage,
            'Content-Type': 'application/json'
        },
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(apiData),
        success: function(data){
            if (data.errorCode == 0) {
                (data.response.streetLine2 != "") ? formInp.unitNo.val(data.response.streetLine2.replace("#","")) : formInp.unitNo.val("00");
                formInp.postalCode.val(data.response.zipCode);
                formInp.address.val(data.response.streetLine1);
                formInp.addressOptions.parents('.options').hide();
                formInp.addressOptions.parents('.a-dropdown').attr('data-required', false);

                msgData.msgLoading.removeClass('active');
                msgData.msgSuccess.addClass('active');
                msgData.msgFailed.removeClass('active');

                submitButton.removeClass('disabled').css('pointer-events', '');

            } else {
                msgData.msgLoading.removeClass('active');
                msgData.msgFailed.addClass('active');
                msgData.msgSuccess.removeClass('active');
                $('.o-form-container__buttons button[type="submit"]').attr('disabled', false);
            }
        },
        error: function(){
            msgData.msgLoading.removeClass('active');
            msgData.msgFailed.addClass('active');
            msgData.msgSuccess.removeClass('active');
            $('.o-form-container__buttons button[type="submit"]').attr('disabled', false);
        }
    });
}

function getFormAddressAU() {
    let sampleAddress = $('#ph-sample-request-form--address');
    let postalCode = sampleAddress.find('[name="postalCode"]');
    let postalAddress = sampleAddress.find('[name="postalAddress"]');
    let suburb = sampleAddress.find('[name="suburb"]');
    let state = sampleAddress.find('[name="state"]');
	let address = sampleAddress.find('[name="address"]');
    let suburbPlaceholder = suburb.parent().find('.a-dropdown__placeholder').text();
    let statePlaceholder = state.parent().find('.a-dropdown__placeholder').text();

    let apiURL = $('#session-api-url').val();

    let apiDetails = {
        apiDomain: (new URL(apiURL)).hostname,
        preferredLanguage: $('input[name="x-preferred-language"]').val(),
        countryCode: $('input[name="x-country-code"]').val(),
        appId: $('input[name="x-application-id"]').val(),
    }

    let checkAddressURL = "https://" + apiDetails.apiDomain + "/api/public/lookup/checkaddress";
    let formattedAddressURL = "https://" + apiDetails.apiDomain + "/api/public/lookup/formatted-address";

    let msgData = {
        msgLoading: sampleAddress.find('#ph-address-msg--loading'),
        msgSuccess: sampleAddress.find('#ph-address-msg--success'),
        msgFailed: sampleAddress.find('#ph-address-msg--failed'),
        msgSelect: sampleAddress.find('#ph-address-msg--select')
    }

    let postalAddressDropdownHTML = '<div class="postal-address-dropdown"><ul class="a-dropdown__menu"></ul></div>';

    postalAddress.parent().append(postalAddressDropdownHTML);
    address.attr('type','hidden').parents('.fields').css('height', 0);
    postalCode.parents('.fields').addClass('disabled');
    state.parents('.options').addClass('disabled');
    suburb.parents('.options').addClass('disabled');
        
    let typingTimer;                
    let doneTypingInterval = 2000; 

    postalAddress.on('keyup', function(){
        clearTimeout(typingTimer);
        let that = $(this);

        if($(this).val().length > 5 && !$(this).parent().hasClass('active')) {
            typingTimer = setTimeout(function(){
                msgData.msgLoading.addClass('active');
                that.parent().addClass('active');
                validateAddress(that);
            }, doneTypingInterval);
        }
    });

    postalAddress.on('input', function() {
        $(this).parent().removeClass('active selected');
        $(this).removeClass('validation-error');
        $('.postal-address-dropdown').removeClass('active').hide();
        $('.postal-address-dropdown').find('ul').empty();
        resetField();
    })

    postalAddress.on('click', function() {
        if($('.postal-address-dropdown').find('li').length > 0){
            $('.postal-address-dropdown').addClass('active').show();
        }
    })

    let postalAddressDropdown = $('.postal-address-dropdown');

    function resetField(){
        postalAddressDropdown.removeClass('active').hide();
        msgData.msgLoading.removeClass('active');
        msgData.msgFailed.removeClass('active');
        msgData.msgSuccess.removeClass('active');
        msgData.msgSelect.removeClass('active');
        address.val('');
        suburb.parent().find('.a-dropdown-selected').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text(suburbPlaceholder);
        postalCode.val('');
        state.parent().find('.a-dropdown-selected').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text(statePlaceholder);
    }

    function validateAddress(el) {
        let that = $(el); 

        setTimeout(function() {
            if (that.val() && !that.parents('.form-group').hasClass('validation-regex')) {
                getAddress();
            } else {
                msgData.msgLoading.removeClass('active');
                msgData.msgFailed.removeClass('active');
                msgData.msgSuccess.removeClass('active');
                msgData.msgSelect.removeClass('active');
            }
        },100)
    }

    let formInp = {
        postalAddress: postalAddress,
        address: address,
        postalCode: postalCode, 
        suburb: suburb, 
        state: state
    }

    function getAddress() {
        let apiData = {
            "postalAddress": $(postalAddress).val(),
            "countryId": "AUS"
        }

        msgData.msgLoading.addClass('active');
        msgData.msgFailed.removeClass('active');
        msgData.msgSuccess.removeClass('active');
        msgData.msgSelect.removeClass('active');

        $.ajax({
            url: checkAddressURL,
            headers: { 
                'x-application-id': apiDetails.appId, 
                'x-country-code': apiDetails.countryCode,
                'x-preferred-language': apiDetails.preferredLanguage,
                'Content-Type': 'application/json'
            },
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(apiData),
            success: function(data){
                if (data.errorCode == 0 && data.response.responseCode == 'validaddress') {
                    setAddressDropdown(data.response.proposedAddress)
                } else {
                    msgData.msgLoading.removeClass('active');
                    msgData.msgFailed.addClass('active');
                    msgData.msgSuccess.removeClass('active');
                    msgData.msgSelect.removeClass('active');
                }
            },
            error: function(){
                msgData.msgLoading.removeClass('active');
                msgData.msgFailed.addClass('active');
                msgData.msgSuccess.removeClass('active');
                msgData.msgSelect.removeClass('active');
            }
        });
    }

    verifyAddressExperian('postalAddress');

    function setAddressDropdown(dataAddress) {
		let addressHTML = "";
        $.each(dataAddress, function(index,data) {
            addressHTML += "<li data-optionvalue='"+data.globalAddressId+"'><span>"+data.address+"</span></li>"
        });
        postalAddressDropdown.find('ul').empty().append(addressHTML);
        msgData.msgLoading.removeClass('active');
        msgData.msgSelect.addClass('active');

        $('.o-form-container__buttons button[type="submit"]').attr('disabled', true);
        postalAddressDropdown.show();
        postalAddressDropdown.addClass('active');

        postalAddressDropdown.find('li').on('click',function() {
            $(this).addClass('selectedColor').siblings().removeClass('selectedColor')
			let globalAddressId = $(this).attr('data-optionvalue');
            $('.o-form-container__buttons button[type="submit"]').attr('disabled', true);
            postalAddressDropdown.hide();
            postalAddressDropdown.removeClass('active');
            msgData.msgLoading.addClass('active');
            msgData.msgFailed.removeClass('active');
            msgData.msgSuccess.removeClass('active');
            msgData.msgSelect.removeClass('active');
            postalAddress.parent().addClass('selected');
            postalAddress.removeClass('validation-error');
            formattedAddressAU(globalAddressId, formattedAddressURL, apiDetails, formInp, msgData);
        });
    }

    $(document).mouseup(function(e) {
        // hide dropdown when click outside
        let container = $(".postal-address-dropdown");

        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.removeClass('active').hide();

            if(!container.parent().hasClass('selected') && container.find('li').length > 0) {
                container.siblings().addClass('validation-error')
            }
        }
    });
}

function formattedAddressAU(globalAddressId, formattedAddressURL, apiDetails, formInp, msgData) {
    let apiData = { "addressGlobalId": globalAddressId }
    let submitButton = $('[name="postalAddress"]').parents('form').next().find(':submit');

    $.ajax({
        url: formattedAddressURL,
        headers: { 
            'x-application-id': apiDetails.appId, 
            'x-country-code': apiDetails.countryCode,
            'x-preferred-language': apiDetails.preferredLanguage,
            'Content-Type': 'application/json'
        },
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(apiData),
        success: function(data){
            if (data.errorCode == 0) {
                let dataAddr = data.response.address + ' ' + data.response.streetLine2;
                let dataPostalCode = data.response.postalCode;
                let dataState = data.response.state;
                let dataSuburb = data.response.suburb;
                formInp.postalAddress.val(dataAddr);
                formInp.address.val(dataAddr);
                formInp.postalCode.val(dataPostalCode)
                getSuburbStateExperian(dataSuburb, dataState, formInp.suburb, formInp.state)

                msgData.msgLoading.removeClass('active');
                msgData.msgSuccess.addClass('active');
                msgData.msgFailed.removeClass('active');
                msgData.msgSelect.removeClass('active');

                submitButton.removeClass('disabled').css('pointer-events', '');
            } else {
                msgData.msgLoading.removeClass('active');
                msgData.msgFailed.addClass('active');
                msgData.msgSuccess.removeClass('active');
                msgData.msgSelect.removeClass('active');

                $('.o-form-container__buttons button[type="submit"]').attr('disabled', false);
            }
        },
        error: function(){
            msgData.msgLoading.removeClass('active');
            msgData.msgFailed.addClass('active');
            msgData.msgSuccess.removeClass('active');
            msgData.msgSelect.removeClass('active');

            $('.o-form-container__buttons button[type="submit"]').attr('disabled', false);
        }
    });
}

function getSuburbStateExperian(su, st, suburb, state) {
    let dataSuburb = su.toLowerCase().trim();
    let dataState = st.toLowerCase().trim();

    let apiURL = $('#session-api-url').val();
    let apiDomain = (new URL(apiURL)).hostname;
    let suburbAPI = "https://" + apiDomain + "/api/public/lookup/referencedata?referenceType=state_city&language=en";

    let countryCode = $('[name="x-country-code"]').val();
    let lang = $('[name="x-preferred-language"]').val();
    let sessionSuburb = JSON.parse(sessionStorage.getItem('suburbList'));

    if (!sessionSuburb) {
        $.ajax({
            method: "GET",
            url: suburbAPI,
            headers: {
                "x-application-id": 'anfamily',
                "x-country-code": countryCode,
                "x-preferred-language": lang,
            }
        }).done(function (data) {
            sessionStorage.setItem('suburbList', JSON.stringify(data.response));
            sessionSuburb = JSON.parse(sessionStorage.getItem('suburbList'));
            setSuburbState(sessionSuburb);
        });
    } else {
        setSuburbState(sessionSuburb);
    }
    
    function getState(ds) {
        let stateCode;

        state.find('li').each(function() {
            let stateText = $(this).find('span').text().toLowerCase().trim();
            if (stateText == ds) {
                stateCode = $(this).attr('data-optionvalue');
            }
        })

        return stateCode;
    }

    function setSuburbState(dataList) {
        let stateCode = getState(dataState);

        $.each(dataList, function(index, data) {
            let suburbVal = data.value.toLowerCase().trim();

            if(data.parentKey == stateCode && suburbVal == dataSuburb) {
                suburb.find('li').attr('data-optionvalue', data.key);
                suburb.find('li span').text(data.value.toLowerCase());
            }
        });

        state.find('li[data-optionvalue="'+stateCode+'"]').click();
        state.parents('.a-dropdown__field').removeClass('active');
        suburb.find('li').click();
        suburb.parents('.a-dropdown__field').removeClass('active');
    }
}

function getStateCity() {
    let stateEl = $('[name="stateCode"]');
    let cityEl = $('[name="cityCode"]');
    let cityOptionsPlaceholder = cityEl.parent().find('.a-dropdown__placeholder').text();

    let apiURL = $('#session-api-url').val();
    let apiDomain = (new URL(apiURL)).hostname;
    let preferredLanguage = $('input[name="x-preferred-language"]').val();
    let countryCode = $('input[name="x-country-code"]').val();
   	let getCityURL = "https://" + apiDomain + "/api/public/lookup/referencedata?referenceType=country_city&language=en&parentType=state";

    if (countryCode != "MY" && countryCode != "IN") {
        return; 
    }

    if (stateEl.length > 0 && cityEl.length > 0) {
		cityEl.parents('.options').addClass('disabled');

        stateEl.find('li').on('click', function() {
            let selectedState = $(this).attr('data-optionvalue');
            getCity(selectedState);
            cityEl.empty();
        })

        stateEl.parents('.options').on('click', function() {
            $('[name="cityCode"]').parent().removeClass('active');
        })
        
        cityEl.parents('.options').on('click', function() {
            $('[name="stateCode"]').parent().removeClass('active');
        })
    }

    function getCity(selectedState) {
        if (selectedState) {
            $.ajax({
                url: getCityURL + "&parentValue=" + selectedState,
                headers: { 
                'x-application-id': 'anfamily', 
                'x-country-code': countryCode,
                'x-preferred-language': preferredLanguage,
                'Content-Type': 'application/json'
            },
           	type: "GET",
           	contentType: "application/json",
           	success: function(data){
                if (data.errorCode == 0 && data.response.length > 0) {
                    setCityDropdown(data.response);
                }
            },
            error: function(){
             	console.error("Failed to load MY Cities");
            }
        });
        }
    }

    function setCityDropdown(dataCity) {
		let cityHTML = "";
        $.each(dataCity, function(index,data) {
            cityHTML += "<li data-optionvalue='"+data.key+"'><span>"+data.value+"</span></li>"
        });

        cityEl.empty().append(cityHTML);
        cityEl.parent().find('.a-dropdown-selected').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text(cityOptionsPlaceholder);
        cityEl.parents('.options').removeClass('disabled');
    }
}

// get city District SubDistrict
let countryCode_ = $('input[name="x-country-code"]').val();
let subDistrictEl = $('[name="subDistrictCode"]');
let subDistrictOptionsPlaceholder = subDistrictEl.parent().find('.a-dropdown__placeholder').text();
let preferredLanguage_ = $('input[name="x-preferred-language"]').val(); 
let api_URL = $('#session-api-url').val();  
let api_Domain = (new URL(api_URL)).hostname;  
function setDropdown(el, response, placeholder) {
    let HTML = "";
    let getSubDistrictURL = "https://" + api_Domain + "/api/public/lookup/referencedata?referenceType=sub_district&language=en&parentType=country_district";
    $.each(response, function(index,data) {
        HTML += "<li data-optionvalue='"+data.key+"'><span>"+data.value+"</span></li>"
    });

    el.empty().append(HTML);
    el.parent().find('.a-dropdown-selected').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text(placeholder);
    dropdownDisabled(el, response);  
    if (countryCode_ == "ID" && el.attr('name') == "districtCode") {
        el.find('li').on('click', function() {
            let selectedItem = $(this).attr('data-optionvalue');
            getAPI(getSubDistrictURL, selectedItem, subDistrictEl, subDistrictOptionsPlaceholder);
            subDistrictEl.empty();
             subDistrictEl.parents('.options').addClass('disabled');
            subDistrictEl.parent().find('.a-dropdown-selected').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text(subDistrictOptionsPlaceholder);
        })
    }
}
function getAPI(path, selectedItem, el, placeholder) {
    if (selectedItem) {
        $.ajax({
            url: path + "&parentValue=" + selectedItem,
            headers: { 
            'x-application-id': 'anfamily', 
            'x-country-code': countryCode_,
            'x-preferred-language': preferredLanguage_,
            'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
               success: function(data){
                if (data.errorCode == 0 && data.response.length > 0) {
                    setDropdown(el, data.response, placeholder);
                }
                }
        });
    }
}
function dropdownDisabled(el, response){
    if (response.length > 0) {
        el.parents('.options').removeClass('disabled');
        if(el.parent().hasClass('disabled')) {
            el.parent().removeClass('disabled');
        }
    }
}
function getCityDistrictSubDistrict() {
    let cityEl = $('[name="cityCode"]');
    let districtEl = $('[name="districtCode"]');
    let districtOptionsPlaceholder = districtEl.parent().find('.a-dropdown__placeholder').text();   
   	let getDistrictURL = "https://" + api_Domain + "/api/public/lookup/referencedata?referenceType=country_district&language=en&parentType=country_city";
    
    if (countryCode_ == "PH") {
        setForPH();
    } else if (countryCode_ == "ID") {
        setForID();
    }

    function setForPH() {
        if (cityEl.length > 0 && districtEl.length > 0) {
            districtEl.parents('.options').addClass('disabled');

            $(document).on('click', '[name="cityCode"] li', function () {
			    let selectedItem = $(this).attr('data-optionvalue');
                getAPI(getDistrictURL, selectedItem, districtEl, districtOptionsPlaceholder);
                districtEl.empty();
            });

            districtEl.parents('.options').on('click', function() {
                $('[name="cityCode"]').parent().removeClass('active');
            });

            cityEl.parents('.options').on('click', function() {
                $('[name="districtCode"]').parent().removeClass('active');
            });
        }
    }

    function setForID() {
        if (cityEl.length > 0 && districtEl.length > 0 && subDistrictEl.length > 0) {
            districtEl.parents('.options').addClass('disabled');
            subDistrictEl.parents('.options').addClass('disabled');

            $(document).on('click', '[name="cityCode"] li', function () {
                let selectedItem = $(this).attr('data-optionvalue');
                getAPI(getDistrictURL, selectedItem, districtEl, districtOptionsPlaceholder);
                districtEl.empty();
                subDistrictEl.parents('.options').addClass('disabled');
                subDistrictEl.parent().find('.a-dropdown-selected').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text(subDistrictOptionsPlaceholder);
            });

            cityEl.parents('.options').on('click', function() {
                $('[name="districtCode"]').parent().removeClass('active');
                $('[name="subDistrictCode"]').parent().removeClass('active');
            });

            districtEl.parents('.options').on('click', function() {
                $('[name="cityCode"]').parent().removeClass('active');
				$('[name="subDistrictCode"]').parent().removeClass('active');
            });

            subDistrictEl.parents('.options').on('click', function() {
                $('[name="districtCode"]').parent().removeClass('active');
				$('[name="cityCode"]').parent().removeClass('active');
            });
        }
    }    
}

let childMonths = $('[name="childMonths"]');
let childMonthsPlacehoder = $('#ph-dropdown-month-options .a-dropdown__placeholder').text().trim();
let hiddenDOB = $('[name="dateOfBirth"]');
let hiddenChildDOB = $('[name="childDOB"]');
let hiddenDOBGrowthCheck = $('[name="childDateOfBirth"]');
function checkChildMonths(){
    if ($(this).attr('data-optionvalue') == "2") {
        childMonths.css('padding-top', '16px');
        childMonths.find('[data-optionvalue="0"]').addClass('hidden');
        for (let i = 1; i <= 11 ; i++) {
            childMonths.find('[data-optionvalue="'+i+'"]').removeClass('hidden');
        }
        resetMonths();
    } else if ($(this).attr('data-optionvalue') == "10" && $('html')[0].lang == "en-IN" && $('#ph-growth').length > 0) {
        childMonths.css('padding-top', '0px');
        childMonths.find('[data-optionvalue="0"]').removeClass('hidden');
        for (let i = 11; i >= 1 ; i--) {
            childMonths.find('[data-optionvalue="'+i+'"]').addClass('hidden');
        }
        resetMonths();
    } else {
        childMonths.css('padding-top', '0px');
        for (let i = 0; i <= 11 ; i++) {
            childMonths.find('[data-optionvalue="'+i+'"]').removeClass('hidden');
        }
    }
}
function resetMonths () {
    $('#ph-dropdown-month-options .a-dropdown__menu li.selected').removeClass('selected');
    $('#ph-dropdown-month-options').find(childMonths).parent().find('.a-dropdown-selected').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text(childMonthsPlacehoder);
    hiddenDOB.val("");
    hiddenChildDOB.val("");
    hiddenDOBGrowthCheck.val("");
}

function getChildYearsMonths() {
    let childYears = $('[name="childYears"]');
    if (!childYears.length > 0 || !childMonths > 0) {
        return; 
    }

    childYears.find('li').on('click',function() {
        checkSelectedOption();
        checkChildMonths(); 
    })

    childMonths.find('li').on('click',function() {
        checkSelectedOption();
    })

    function checkSelectedOption () {
        setTimeout(function(){
            let yearsLength = childYears.find('li.selected').length;
            let monthsLength = childMonths.find('li.selected').length;

            if (yearsLength > 0 && monthsLength > 0) {
                let selectedYears = childYears.find('li.selected').attr('data-optionvalue');
                let selectedMonths = childMonths.find('li.selected').attr('data-optionvalue');
                let selectedDate = Number(1);

                let currentDate = new Date();
                currentDate.setFullYear(currentDate.getFullYear() - selectedYears);
                currentDate.setMonth(currentDate.getMonth() - selectedMonths);
                currentDate.setDate(selectedDate);

                hiddenDOB.val(currentDate.toLocaleDateString("en-AU"));
                hiddenChildDOB.val(currentDate.toLocaleDateString("en-AU"));
                hiddenDOBGrowthCheck.val(currentDate.toLocaleDateString("en-AU"));
            }	
        },500)
    }
}

function addInputPrefix () {
	let targetId = $('#ph-input-prefix');
    targetId.each(function() {
		let textPrefix = $(this).parents('.form-group').find('.a-input-field--text-help').text().trim();
        let textPrefixHTML = '<label class="ph-input-prefix">'+textPrefix+'</label>';
        $(this).parent().prepend(textPrefixHTML);
    })
}

$(window).resize(function () {
    initDatePicker();
});

function suburbAutocomplete() {
    let apiURL = $('#session-api-url').val();
    let apiDomain = (new URL(apiURL)).hostname;
    let suburbAPI = "https://" + apiDomain + "/api/public/lookup/referencedata?referenceType=state_city&language=en";

    let countryCode = $('[name="x-country-code"]').val();
    let lang = $('[name="x-preferred-language"]').val();

	let dropdown = $('#ph-dropdown-autocomplete-options');
    let suburbEL = $('#ph-dropdown-autocomplete-options').find('[name="suburb"]');
    let sessionSuburb = JSON.parse(sessionStorage.getItem('suburbList'));
    let stateEL = $('[name="state"]');

    let placeholder = dropdown.find('.a-dropdown__title-text').text();
    let searchInputHTML = '<div class="dropdown-search"><label class="color-grey" name="suburbsearch" contentEditable="true" placeholder="'+placeholder+'">'+placeholder+'</label></div>'

    if (dropdown.length < 1 && countryCode != 'AU') {
        return;
    }

    function getSuburb() {
        $.ajax({
            method: "GET",
            url: suburbAPI,
            headers: {
                "x-application-id": 'anfamily',
                "x-country-code": countryCode,
                "x-preferred-language": lang,
            }
        }).done(function (data) {
            sessionStorage.setItem('suburbList', JSON.stringify(data.response));
			sessionSuburb = JSON.parse(sessionStorage.getItem('suburbList'));
            setSuburb(sessionSuburb);
        });

    }

    function getState(parentKey) {
        let stateText;
        $('[name="state"]').find('li').each(function() {
			let stateCode = $(this).attr('data-optionvalue');
            if (stateCode == parentKey) {
				stateText = $(this).find('span').text();
            }
        })
        return stateText;
    }

    function setSuburb (dataList) {
        let suburbHTML = '';
        let counter = 0;

        $.each(dataList, function(index, data) {
            if (counter >= 50) {
                return false;
            }

            let stateText = getState(data.parentKey);
            suburbHTML += "<li data-optionvalue='"+data.key+"' data-parent-option-value='"+data.parentKey+"'><span>"+upperToCapitalized(data.value)+","+stateText+"</span></li>";
            counter++;
        });

        suburbEL.find('li').remove();
        suburbEL.append(suburbHTML);

        suburbEL.find('li').on('click', function() {
            let statekey = $(this).attr('data-parent-option-value');
            stateEL.find('li[data-optionvalue="'+statekey+'"]').click();
            stateEL.parents('.a-dropdown__field').removeClass('active');
        })
    }

	stateEL.parents('.options').addClass('disabled');

    if (!sessionSuburb) {
        getSuburb();
    } else {
        setSuburb(sessionSuburb);
    }

    dropdown.find('.a-dropdown__field').click(function(){
        if ($('[name="suburbsearch"]').text().trim() == "") {
            $('[name="suburbsearch"]').text(placeholder).addClass('color-grey');
        } 
    })

    if ($('.dropdown-search').length == 0) {
        suburbEL.prepend(searchInputHTML);
    }
    dropdownSearch();
}
const dropdownSearch = () =>{
    $('.dropdown-search').click(function(e){
        e.stopPropagation();
        
        if ($(this).find('[name="suburbsearch"]').text().trim() == placeholder.trim()) {
            $(this).find('[name="suburbsearch"]').text('').removeClass('color-grey');
        } 
    })
    
    $('.dropdown-search label').on('input', function() {
        let userInput = $(this).text().toLowerCase();

        if (userInput.length > -1) {
            let matchingitems = sessionSuburb.filter(item => item.value.toLowerCase().includes(userInput));
            setSuburb(matchingitems);
        }
    });
}

function querySearchValue(queryParams){
    if($('[name="querySearchName"]').length && $('[name="querySearchName"]').val() != '' && $('[name="querySearchInputField"]').length && $('[name="querySearchInputField"]').val() != '') {
		let querySearchName = $('[name="querySearchName"]').val().replaceAll("'","").replaceAll('"','').split(",");
		let querySearchInputField = $('[name="querySearchInputField"]').val().replaceAll("'","").replaceAll('"','').split(",");
		if(querySearchName.length == querySearchInputField.length) {
			for(let queryLength=0;queryLength<querySearchName.length;queryLength++) {
				if(queryParams.get(querySearchName[queryLength]) != null && $('[name="'+querySearchInputField[queryLength]+'"]').length) {
					let searchValueAdd = queryParams.get(querySearchName[queryLength]).replaceAll(" ","+");
					$('[name="'+querySearchInputField[queryLength]+'"]').val(searchValueAdd);
				}
			}
		}
	}
}
function campaignNameUrl(queryParams){
    let urlCampaignName = queryParams.get("campaign_name");
	if(urlCampaignName != null && $('[name="campaignName"]').length) {
		urlCampaignName = urlCampaignName.replaceAll(" ","+");
		$('[name="campaignName"]').val(urlCampaignName);
	}
}
function utmMediumUrl(queryParams){
    let urlUtmMedium = queryParams.get("utm_medium");
	if(urlUtmMedium != null && $('[name="utmMedium"]').length) {
		urlUtmMedium = urlUtmMedium.replaceAll(" ","+");
		$('[name="utmMedium"]').val(urlUtmMedium);
	}
}
function utmSourceUrl(queryParams){
    let urlUtmSource = queryParams.get("utm_source");
	if(urlUtmSource != null && $('[name="utmSource"]').length) {
		urlUtmSource = urlUtmSource.replaceAll(" ","+");
		$('[name="utmSource"]').val(urlUtmSource);
	}
}
function utmContentUrl(queryParams){
    let urlUtmContent = queryParams.get("utm_content");
	if(urlUtmContent != null && $('[name="utmContent"]').length) {
		urlUtmContent = urlUtmContent.replaceAll(" ","+");
		$('[name="utmContent"]').val(urlUtmContent);
	}
}
function utmCampaign(queryParams){
    let urlUtmCampaign = queryParams.get("utm_campaign");
	if(urlUtmCampaign != null && $('[name="utmCampaign"]').length) {
		urlUtmCampaign = urlUtmCampaign.replaceAll(" ","+");
		$('[name="utmCampaign"]').val(urlUtmCampaign);
	}
}
function checkFormAddress(){
    if ($('[name="unitNo"]').length && ('[name="addressOptions"]').length && $('input[name="x-country-code"]').val() == 'SG') {
        getFormAddress();
    }

    if($('#ph-sample-request-form--address').find('[name="postalAddress"]').length && $('input[name="x-country-code"]').val() == 'AU') {
        getFormAddressAU();
    }
}
function cityList(){
    let cityList;
    if($("[name='cityCode']").length && $("[name='cityCode'] li").length && $("[name='cityCode'] li").length > 100) {
        cityList = $("[name='cityCode']").html();
        $("[name='cityCode']").empty().append(cityList);
    }
}
$(document).ready(function () {
    initDatePicker();
    initNewsLetter();
    setOtpBehavior();
    setOptionRedirect();
    dropdownAutomation();
    articleForm();
    customForSimilacMum();  
    checkFormAddress()
    getStateCity();
    getCityDistrictSubDistrict();
	setTimeout(function () {
		cityList();
	}, 1000);
	if($('[name="x-country-code"]').val().toLowerCase() == "my" && $('[name="x-preferred-language"]').val().toLowerCase() == "en" && location.search != "" && location.search.indexOf("?q") == -1) {
		let queryString = new URL(window.location).search;
		document.querySelectorAll("[href]").forEach(link => {
			let current = link.href;
			link.href = `${current}${current.includes('?') ? queryString.replace('?', '&') : queryString}`;
		});
	}
    getChildYearsMonths();
    addInputPrefix();
    suburbAutocomplete();
	const queryParams = new URLSearchParams(window.location.search);
    querySearchValue(queryParams);
	campaignNameUrl(queryParams);
	utmMediumUrl(queryParams);	
    utmSourceUrl(queryParams);
	utmContentUrl(queryParams);
	utmCampaign(queryParams);
	let urlUtmTerms = queryParams.get("utm_terms");
	if(urlUtmTerms != null && $('[name="utmTerms"]').length) {
		urlUtmTerms = urlUtmTerms.replaceAll(" ","+");
		$('[name="utmTerms"]').val(urlUtmTerms);
	}
	let urlUtmString = queryParams.get("utm_string");
	if(urlUtmString != null && $('[name="utmString"]').length) {
		urlUtmString = urlUtmString.replaceAll(" ","+");
		$('[name="utmString"]').val(urlUtmString);
	}
	let urlOrgId = queryParams.get("orgid");
	if(urlOrgId != null && $('[name="channel"]').length) {
		urlOrgId = urlOrgId.replaceAll(" ","+");
		$('[name="channel"]').val(urlOrgId);
	}
});