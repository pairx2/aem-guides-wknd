let ssoData;
let searchUserurl = new URL($('#session-api-url').val());
let searchUserurlOrigin = searchUserurl.origin;
let loginURL = $('#istat-login').attr('href');
let customerURL = $('#customer-home').attr('href');
let partnerURL = $('#partner-home').attr('href');
let employeeURL = $('#employees-home').attr('href');
let completeProfileURL = $('#complete-profile').attr('href');
let dashboardURL = $('#dashboard-page').attr('href');
let repairManualURL = $('#repair-manual-home')?.attr('href');
let headerLanguage = window.location.pathname.split('/')[2];

$(document).ready(function () {
    setTimeout(() => {
        if(loginURL){
            localStorage.setItem('loginURL', loginURL);
        }
    }, 500);
    setTimeout(function () {
        let customSpinner = $('.a-spinner:last').html();
        $('<div class="custom-spinner spinner-active d-none">' + customSpinner + '</div>')?.insertAfter('.a-spinner:last');
        $('.a-dropdown__menu li .a-dropdown__icon')?.closest('span')?.remove();
        $('[name="istatProduct"]').closest('.options').hide();
        $('[name="serialNumber"]').closest('.fields').hide();
        $('[name="topics"]').closest('.options').hide();
        $('[name="language"]').closest('.options').hide();
        $('[name="istatProduct"]').closest('.a-dropdown').removeAttr('data-required');
        $('[name="topics"]').closest('.a-dropdown').removeAttr('data-required');
        $('[name="language"]').closest('.a-dropdown').removeAttr('data-required');
        $('[name="serialNumber"]').closest('.a-input-field').removeAttr('data-required');
        $('[name="serialNumber"]').removeAttr('required');
    }, 99)
    dropDownFieldCheck();
    requiredFieldCheck();
    $('.a-dropdown__menu li')?.on('click', function(){
        setTimeout(()=>{
            $(this).closest('.a-dropdown__field').removeClass('active');
        }, 250);
        let selectedValue = $(this).attr('data-optionvalue');
        if($(this).hasClass('selected')){
            return;
        }
        if($(this).closest('.a-dropdown__menu').attr('name') == 'country' && $('[data-conditional-variable="'+selectedValue+'"]').length == 0){
            return;
        }
        let fieldName = $('[data-conditional-case="' + selectedValue + '"]').closest('[data-conditional-variable]').attr('data-conditional-variable')?$('[data-conditional-case="' + selectedValue + '"]').closest('[data-conditional-variable]').attr('data-conditional-variable'):$(this).closest('.a-dropdown__menu').attr('name');
        let conditionalCaseValue = $('[data-conditional-variable="' + fieldName + '"]').find('[data-conditional-case="' + selectedValue + '"]').attr('data-conditional-case')?.replace('$', '/');
        document.querySelectorAll('.conditional__case[fieldname^="'+fieldName+'"]').forEach(el =>{
            $(el).hide();
            let firsValue = $(el).find('.a-dropdown__menu li:first').find('span').text();
            $(el).find('.a-dropdown__menu').find('li').removeClass('selected').removeAttr('aria-selected');
            $(el).find('.a-dropdown__field > span').text(firsValue);
        })
        
        $('[data-conditional-variable="' + fieldName + '"]').find('.conditional__case').hide();
        $('[data-conditional-variable="' + fieldName + '"]').find('.conditional__case').find('.set-required').removeAttr('required');
        $('[data-conditional-variable="' + fieldName + '"]').find('.conditional__case').find('.set-data-required').removeAttr('data-required');
        $('[data-conditional-variable="' + fieldName + '"]').find('.conditional__case').find('input[type=text]').val('');
        $('[data-conditional-variable="' + fieldName + '"]').find('.conditional__case').find('textarea').val('');
        $('[data-conditional-variable="' + fieldName + '"]').find('.conditional__case').find('input[type=checkbox]').prop('checked', false);
        $('[data-conditional-variable="' + fieldName + '"]').find('.conditional__case').find('input[type=radio]').prop('checked', false);
        
        if (selectedValue == conditionalCaseValue) {
            $('[data-conditional-variable="' + fieldName + '"]').find('[data-conditional-case="' + conditionalCaseValue + '"]').find('.set-required').attr('required', true);
            $('[data-conditional-variable="' + fieldName + '"]').find('[data-conditional-case="' + conditionalCaseValue + '"]').find('.set-data-required').attr('data-required', 'true');
            $('[data-conditional-variable="' + fieldName + '"]').find('[data-conditional-case]').hide();
            $('[data-conditional-variable="' + fieldName + '"]').find('[data-conditional-case="' + conditionalCaseValue + '"]').show();
            let fieldNameValue = fieldName;
            let fieledNameexist = $(this).closest(".conditional__case").attr('fieldname');
            if(fieledNameexist){
                fieldNameValue = fieledNameexist+"_"+fieldName;
            }
            $('[data-conditional-variable="' + fieldName + '"]').find('[data-conditional-case="' + conditionalCaseValue + '"]').attr("fieldname",fieldNameValue);
        }
        let thisEle = $(this);
        let scrollTopValue = window.scrollY;
      	setTimeout(function(){
           thisEle.closest('form').find('input:last:visible').each(function(){
                if($(this).val().length > 0){
                    $(this).closest('label').click();
                    $(this).closest('label').click();
                }
            });
            $("html, body").animate({ scrollTop: scrollTopValue }, 0);
       },250);

    });
    CustomerTypeCheck();
    
    loginUrlCheckOne();
    loginUrlCheckTwo();
    idTokenCookieCheck();
    setTimeout(() => {
        cognitoUserCheck();
    }, 500);
    headerLangCheck();
    dashboardURLCheck();
    setTimeout(function(){
        $('.myProfileLinks .m-link-stack--content').find('li').each(function(){
            let $this = $(this);
            myProfileLinksCheck($this);
        });
    },550)
    secureUrlCheck();
    setTimeout(() => {
        let customerType = sessionStorage.getItem('customerType');
        let customerCategory = sessionStorage.getItem('customerCategory');
        $('.m-mega-menu__sub-list a[href]').on('click', function(e){
            let $this = $(this);
            megaMenuValidation($this, customerType, e, customerCategory);
        }); 
    }, 550);

    $('[name="email"]').on('focus', function(){            
        $("#email-focus").show();        
    });
    $('[name="email"]').on('blur', function(){        
        $("#email-focus").hide();    
    });

    passwordFocus();

    $('ul[name="country"] li').on('click',function(){
        let curEle = $(this);            
        setTimeout(function(){
            if(curEle.hasClass("selected")){
                curEle.closest(".a-dropdown").removeClass('validation-require');
            }
        },500)
    });

});

function dropDownFieldCheck() {
    if ($('.o-form-container__main-form .a-dropdown__field').length > 1 && $('.o-form-container__main-form .a-dropdown__field').find('[name="technical-support"]').length == 1) {
        $('.o-form-container__main-form .a-dropdown__field').on('click', function (e) {
            e.stopPropagation();
            $('.o-form-container__main-form .a-dropdown__field').not($(this)).removeClass('active');
            setTimeout(() => {
                $(this).toggleClass('active');
            }, 100);

        });
        $('.o-form-container__main-form .a-dropdown__field .a-dropdown__menu li').on('click', function () {
            $(this).closest('.a-dropdown__menu').find('li').not($(this)).removeClass('selected').removeAttr('aria-selected');
            setTimeout(() => {
                $(this).addClass('selected').attr('aria-selected', 'true').closest('.a-dropdown__field').removeClass('active');
                $(this).closest('.a-dropdown').find('.a-dropdown__field>span').removeClass('a-dropdown__placeholder').addClass('a-dropdown-selected');
            }, 111);
            setTimeout(() => {
                $(this).closest('.a-dropdown').find('.a-dropdown__field>span').text($(this).find('span').text());
            }, 211);
        });

    }
}

function requiredFieldCheck() {
    $('[data-conditional-case]').each(function () {
        $(this).find('[required]')?.addClass('set-required');
        if (!$(this).find('[required]').is(':visible')) {
            $(this).find('[required]').removeAttr('required');
        }
        $(this).find('[data-required]')?.addClass('set-data-required');
        if (!$(this).find('[data-required]').is(':visible')) {
            $(this).find('[data-required]').removeAttr('data-required');
        }
    });
}

function CustomerTypeCheck() {
    if ($('[name="customerType"]').length > 0) {
        $('[name="customerType"]').closest('.a-dropdown__field').find('>span').on('DOMSubtreeModified', function () {
            let selectValue = $(this)?.text()?.trim();
            let selectedValue;
            $(this).next()?.find('li').each(function () {
                if ($(this).find('span')?.text()?.trim() == selectValue) {
                    selectedValue = $(this).attr('data-optionvalue')?.trim();
                }
            });
            if ((selectedValue == 'hospitalPublic' || selectedValue == 'HOSPITAL_PUBLIC') || (selectedValue == 'hospitalPrivate' || selectedValue == 'HOSPITAL_PRIVATE') || (selectedValue == 'nonHospital' || selectedValue == 'NON_HOSPITAL')) {
                $('[name="istatProduct"]').closest('.a-dropdown').attr('data-required', true);
                $('[name="serialNumber"]').closest('.a-input-field').attr('data-required', true);
                $('[name="serialNumber"]').attr('required', true);
                $('[name="topics"]').closest('.a-dropdown').attr('data-required', true);
                $('[name="language"]').closest('.a-input-field').attr('data-required', true);
                $('[name="istatProduct"]').closest('.options').show();
                $('[name="serialNumber"]').closest('.fields').show();
                $('[name="topics"]').closest('.options').show();
                $('[name="language"]').closest('.options').show();
            }
            else if (selectedValue == 'repair-center' || selectedValue == 'REPAIR_CENTER') {
                $('[data-conditional-case="OUTSIDE_US_RC"], [data-conditional-case="US_RC"]').addClass('hide-role');
            }
            else {
                $('[name="istatProduct"]').closest('.options').hide();
                $('[name="serialNumber"]').closest('.fields').hide();
                $('[name="topics"]').closest('.options').hide();
                $('[name="language"]').closest('.options').hide();
                $('[name="istatProduct"]').closest('.a-dropdown').removeAttr('data-required');
                $('[name="topics"]').closest('.a-dropdown').removeAttr('data-required');
                $('[name="language"]').closest('.a-dropdown').removeAttr('data-required');
                $('[name="serialNumber"]').closest('.a-input-field').removeAttr('data-required');
                $('[name="serialNumber"]').removeAttr('required');
            }
        });
    }
}

function loginUrlCheckOne() {
    if (window.location.href.indexOf('/log-in.html') >= 0) {
        let token_id = getCookie('id_token');
        if (token_id.length > 1) {
            callSession(false);
        }
        deleteCookie('id_token');
        deleteCookie('userGroup');
        deleteCookie('userFirstName');
        deleteCookie('cognitoUsername');
        deleteCookie('currUserFirstName');
        deleteCookie('currUserLastName');
        deleteCookie('currUserAddress');
        deleteCookie('currUserState');
        deleteCookie('currUserCity');
        deleteCookie('currUserDivision');
        deleteCookie('currUserCountry');
        deleteCookie('currUserPinCode');
        deleteCookie('currUserGroup');
        localStorage.removeItem('gpoc-page-mapping');
        sessionStorage.removeItem('jwtToken');
        sessionStorage.removeItem('customerType');
        sessionStorage.removeItem('customerCategory');
        sessionStorage.removeItem('customerRole');
        sessionStorage.removeItem('userFirstName');
        sessionStorage.removeItem('jwtToken');
        sessionStorage.removeItem('LoggedInTime');
        deleteCookie('userFirstName');
        sessionStorage.setItem('documentReferrer', document.referrer);
    }
}

function loginUrlCheckTwo() {
    if (sessionStorage.getItem('jwtToken') == null && window.location.href.indexOf('/' + headerLanguage + '/log-in.html') < 0 && getCookie('id_token').length > 0) {
        callSession(false);
        deleteCookie('id_token');
        deleteCookie('userGroup');
        deleteCookie('userFirstName');
        localStorage.removeItem('gpoc-page-mapping');
        $('.header').removeClass('loggedIn');
    }
}

function idTokenCookieCheck() {
    if (window.location.href.indexOf('/secure/') >= 0 || getCookie('id_token').length > 0) {
        setTimeout(() => {
            $('#istat-registration')?.closest('.link').hide();
            $('#istat-login')?.closest('.link').hide();
            $('#covid-19-home')?.closest('.link').hide();
            $('.m-mega-menu__mobile #istat-registration')?.closest('.link').hide();
            $('.m-mega-menu__mobile #istat-login')?.closest('.link').hide();
            $('.m-mega-menu__mobile #covid-19-home')?.closest('.link').hide();
            let firstName = sessionStorage.getItem('userFirstName');
            $('#user-name')?.find('span').text(firstName);
            $('.m-mega-menu__mobile #user-name')?.find('span').text(firstName);
            $('#my-profile')?.closest('.linkstack').addClass('active-link').show();
            $('.m-mega-menu__mobile #my-profile')?.closest('.linkstack').addClass('active-link').show();
            $('.m-mega-menu__mobile #my-account')?.closest('.link').addClass('active-link').show();
            $('.m-mega-menu__mobile #logout')?.closest('.link').addClass('active-link').show();
            $('#user-name')?.closest('.link').addClass('active-link').show();
            $('#customer-home')?.closest('.link').addClass('active-link').show();
            $('#partner-home')?.closest('.link').addClass('active-link').show();
            $('.m-mega-menu__mobile #my-profile')?.closest('.linkstack').addClass('active-link').show();
            $('.m-mega-menu__mobile #user-name')?.closest('.link').addClass('active-link').show();
            $('.m-mega-menu__mobile #customer-home')?.closest('.link').addClass('active-link').show();
            $('.m-mega-menu__mobile #partner-home')?.closest('.link').addClass('active-link').show();
            $('.header').addClass('loggedIn');
            let userType = sessionStorage.getItem('customerType');
            if (userType == 'abbottEmployees') {
                $('#employees-home')?.closest('.link').addClass('active-link').show();
                $('.m-mega-menu__mobile #employees-home')?.closest('.link').addClass('active-link').show();
            }
        }, 500);
    }
}

function cognitoUserCheck() {
    if (getCookie('cognitoUsername').length > 0) {
        $('.o-header-v2-group a[href]').each(function () {
            if ($(this).attr('id') == 'istat-registration' || $(this).attr('id') == 'istat-login') {
                $(this).closest('.link').hide();
                setTimeout(function () {
                    let firstName = getCookie('currUserFirstName');
                    if (firstName) {
                        $('#user-name').find('span').text(firstName);
                        $('#user-name')?.closest('.link').addClass('active-link').show();
                        $('.m-mega-menu__mobile #user-name').find('span').text(firstName);
                        $('.m-mega-menu__mobile #user-name')?.closest('.link').addClass('active-link').show();
                    }
                }, 500);
                setTimeout(function () {
                    $('.header').addClass('loggedIn');
                    $('#employees-home')?.closest('.link').addClass('active-link').show();
                    $('#customer-home')?.closest('.link').addClass('active-link').show();
                    $('#my-profile')?.closest('.linkstack').addClass('active-link').show();
                    $('.m-mega-menu__mobile #employees-home')?.closest('.link').addClass('active-link').show();
                    $('.m-mega-menu__mobile #customer-home')?.closest('.link').addClass('active-link').show();
                    $('.m-mega-menu__mobile #my-profile')?.closest('.linkstack').addClass('active-link').show();
                }, 550);
                $('.myProfileLinks .m-link-stack--content').find('li:first a').attr("href", "javascript:;");
                $('.myProfileLinks .m-link-stack--content').find('li:first a').unbind().on('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    alert('Abbott user details cannot be edited');
                });
                $('.m-mega-menu__mobile #my-account').attr("href", "javascript:;");
                $('.m-mega-menu__mobile #my-account').unbind().on('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    alert('Abbott user details cannot be edited');
                });
            }
        });
    }
}

function headerLangCheck() {
    if (window.location.href.indexOf('/' + headerLanguage + '/loginsso.html') >= 0) {
        setTimeout(() => {
            $('.custom-spinner').removeClass('d-none');
        }, 100);
        let accessToken = (window.location.href).split('#')[1].split('&')[0].split('access_token=')[1];
        setCookie('id_token', accessToken, '');
        sessionStorage.setItem("jwtToken", accessToken);
        $.ajax({
            url: searchUserurlOrigin + '/api/private/profile/profile-info',
            type: "GET",
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            "headers": {
                "x-application-id": headerApplicationId,
                'x-country-code': 'US',
                'x-preferred-language': 'en',
                "x-id-token": accessToken
            },
            success: function (data) {
                if (data) {
                    ssoData = data.response.userInfo;
                    if (ssoData) {
                        setCookie('cognitoUsername', ssoData.userName);
                        setCookie('currUserFirstName', ssoData.firstName);
                        setCookie('currUserLastName', ssoData.lastName);
                        setCookie('currUserAddress', ssoData.street);
                        setCookie('currUserState', ssoData.additionalProperties?.state);
                        setCookie('currUserCity', ssoData.additionalProperties?.city);
                        setCookie('currUserDivision', ssoData.additionalProperties?.division);
                        setCookie('currUserCountry', ssoData.additionalProperties?.country);
                        setCookie('currUserPinCode', ssoData.additionalProperties?.zip);
                        setCookie('currUserGroup', ssoData.additionalProperties?.groups);
                        let enable = true;
                        let sessionApiUrl = window.location.origin + '/api/private/profile/session';
                        const requestOptions = {
                            method: 'GET',
                            headers: {
                                'Content-Type': getRequestHeader('Content-Type'),
                                'x-id-token': getCookie('id_token'),
                                'x-application-id': headerApplicationId,
                                'x-country-code': 'US',
                                'x-preferred-language': 'en'
                            },
                            mode: 'cors',
                            cache: 'no-cache'
                        };
                        fetch(sessionApiUrl + "?enable=" + enable, requestOptions)
                            .then(function (response) {
                                headerLangCheckOne(response);
                                return response;
                            }).catch(function () {
                                setTimeout(() => {
                                    $('.custom-spinner').addClass('d-none');
                                }, 100);
                            });
                    }
                }
            },
            error: function (error) {
                setTimeout(() => {
                    $('.custom-spinner').addClass('d-none');
                }, 100);
            }
        });
    }
}

function headerLangCheckOne(response) {
    if (response.status == 200) {
        setTimeout(() => {
            $('.custom-spinner').addClass('d-none');
        }, 100);
        let currOrigin = window.location.origin;
        let docReferrer = sessionStorage.getItem('documentReferrer');
        if ((docReferrer)?.indexOf('/secure/') >= 0 && (docReferrer)?.indexOf(currOrigin) >= 0) {
            window.location.href = docReferrer;
        } else {
            if (ssoData['additionalProperties']?.groups?.includes('Prod-Admin')) {
                window.location.href = dashboardURL;
            }
            else {
                window.location.href = customerURL;
            }
        }
    }
}

function dashboardURLCheck() {
    let dashboardURLArray = dashboardURL?.split('/');
    let adminFolder;
    if (dashboardURLArray?.length > 0) {
        for (let i = 0; i < dashboardURLArray.length; i++) {
            if (dashboardURLArray[i] == 'secure') {
                adminFolder = dashboardURLArray[i + 1];
            }
        }
        if (adminFolder) {
            if (adminFolder.indexOf('.html') >= 0) {
                adminFolder = adminFolder.replace('.html', '');
            }
            dashboardURLCheckOne(adminFolder);
        }
    }
}

function dashboardURLCheckOne(adminFolder) {
    if (window.location.href.indexOf('/' + adminFolder + '/') >= 0 && getCookie('wcmmode') != 'edit') {
        let currentUserGroup = getCookie('currUserGroup');
        if (currentUserGroup) {
            if (!currentUserGroup.includes('admin')) {
                window.location.href = loginURL;
            }
        }
    }
}

function myProfileLinksCheck($this) {
    if ($this.find('a').text().toLowerCase().indexOf('dashboard') >= 0) {
        $this.hide();
    }
    if (getCookie('currUserGroup') && $this.find('a').text().toLowerCase().indexOf('dashboard') >= 0) {
        if (getCookie('currUserGroup').includes('Prod-Admin')) {
            $this.show();
            $('.m-mega-menu__mobile #dashboard-home')?.closest('.link').addClass('active-link').show();
        }
        else {
            $this.hide();
            $('.m-mega-menu__mobile #dashboard-home')?.closest('.link').removeClass('active-link').hide();
        }
    }
}

function secureUrlCheck() {
    if (window.location.href.indexOf('/secure/') >= 0) {
        setTimeout(() => {
            let customerType = sessionStorage.getItem('customerType');
            let customerCategory = sessionStorage.getItem('customerCategory');
            secureUrlCheckOne(customerType);
            secureUrlCheckTwo(customerType, customerCategory);
            secureUrlCheckThree(customerType, customerCategory);
            secureUrlCheckFour(customerType, customerCategory);
            if (window.location.href.indexOf(employeeURL) >= 0 && (customerType == 'repairCenter' || customerType == 'REPAIR_CENTER')) {
                window.location.href = repairManualURL;
            }

        }, 550);
    }
}

function secureUrlCheckFour(customerType, customerCategory) {
    if (window.location.href.indexOf(employeeURL) >= 0 && ((customerType == 'hospitalPublic' || customerType == 'hospitalPrivate' || customerType == 'nonHospital' || customerType == 'HOSPITAL_PUBLIC' || customerType == 'HOSPITAL_PRIVATE' || customerType == 'NON_HOSPITAL') || ((customerType == 'distributionPartner' || customerType == 'DISTRIBUTION_PARTNER') && (customerCategory == 'us' || customerCategory == 'US')))) {
        window.location.href = customerURL;
    }
    if (window.location.href.indexOf(employeeURL) >= 0 && (customerType == 'distributionPartner' || customerType == 'DISTRIBUTION_PARTNER') && (customerCategory == 'outsideUs' || customerCategory == 'OUTSIDE_US')) {
        window.location.href = partnerURL;
    }
}

function secureUrlCheckThree(customerType, customerCategory) {
    if (window.location.href.indexOf(repairManualURL) >= 0 && (customerType == 'distributionPartner' || customerType == 'DISTRIBUTION_PARTNER') && (customerCategory == 'outsideUs' || customerCategory == 'OUTSIDE_US')) {
        window.location.href = partnerURL;
    }
    if (window.location.href.indexOf('/repair-manual.html') >= 0 && ((customerType == 'hospitalPublic' || customerType == 'hospitalPrivate' || customerType == 'nonHospital' || customerType == 'HOSPITAL_PUBLIC' || customerType == 'HOSPITAL_PRIVATE' || customerType == 'NON_HOSPITAL') || ((customerType == 'distributionPartner' || customerType == 'DISTRIBUTION_PARTNER') && (customerCategory == 'us' || customerCategory == 'US')))) {
        window.location.href = customerURL;
    }
    if (window.location.href.indexOf('/repair-manual.html') >= 0 && (customerType == 'distributionPartner' || customerType == 'DISTRIBUTION_PARTNER') && (customerCategory == 'outsideUs' || customerCategory == 'OUTSIDE_US')) {
        window.location.href = partnerURL;
    }
    
}

function secureUrlCheckTwo(customerType, customerCategory) {
    if (window.location.href.indexOf('/secure/support/customers.html') >= 0 && (customerType == 'repairCenter' || customerType == 'REPAIR_CENTER')) {
        window.location.href = repairManualURL;
    }
    if (window.location.href.indexOf('/secure/support/partners.html') >= 0 && (customerType == 'repairCenter' || customerType == 'REPAIR_CENTER')) {
        window.location.href = repairManualURL;
    }
    if (window.location.href.indexOf('/secure/support/partners.html') >= 0 && (customerType == 'hospitalPublic' || customerType == 'hospitalPrivate' || customerType == 'nonHospital' || customerType == 'HOSPITAL_PUBLIC' || customerType == 'HOSPITAL_PRIVATE' || customerType == 'NON_HOSPITAL')) {
        window.location.href = customerURL;
    }
    if (window.location.href.indexOf(repairManualURL) >= 0 && ((customerType == 'hospitalPublic' || customerType == 'hospitalPrivate' || customerType == 'nonHospital' || customerType == 'HOSPITAL_PUBLIC' || customerType == 'HOSPITAL_PRIVATE' || customerType == 'NON_HOSPITAL') || ((customerType == 'distributionPartner' || customerType == 'DISTRIBUTION_PARTNER') && (customerCategory == 'us' || customerCategory == 'US')))) {
        window.location.href = customerURL;
    }    
}

function secureUrlCheckOne(customerType) {
    if (customerType == 'hospitalPublic' || customerType == 'hospitalPrivate' || customerType == 'nonHospital' || customerType == 'HOSPITAL_PUBLIC' || customerType == 'HOSPITAL_PRIVATE' || customerType == 'NON_HOSPITAL') {
        $('#partner-home')?.closest('.link').hide();
        $('.m-mega-menu__mobile #partner-home')?.closest('.link').hide();
    }
    if ((customerType == 'repairCenter' || customerType == 'REPAIR_CENTER')) {
        $('#partner-home')?.closest('.link').hide();
        $('#customer-home')?.closest('.link').hide();
        $('#repair-manual-home')?.closest('.link').addClass('active-link').show();
        $('.m-mega-menu__mobile #partner-home')?.closest('.link').hide();
        $('.m-mega-menu__mobile #customer-home')?.closest('.link').hide();
        $('.m-mega-menu__mobile #repair-manual-home')?.closest('.link').addClass('active-link').show();

    }
    if ((customerType == 'distributionPartner' || customerType == 'DISTRIBUTION_PARTNER')) {
        if ($('#distribution-home').length == 0) {
            $('#partner-home')?.find('span').text('DISTRIBUTION HOME').closest('.link').addClass('active-link').show();
        }
        else {
            $('#partner-home')?.closest('.link').hide();
            $('#distribution-home')?.closest('.link').addClass('active-link').show();
            $('.m-mega-menu__mobile #partner-home')?.closest('.link').hide();
            $('.m-mega-menu__mobile #distribution-home')?.closest('.link').addClass('active-link').show();
        }
    }
}

function megaMenuValidation($this, customerType, e, customerCategory) {
    if ($this.attr('href').indexOf('/secure/') >= 0) {
        megaMenuValidationOne($this, customerType, e, customerCategory);
        megaMenuValidationTwo($this, customerType, customerCategory, e);
        megaMenuValidationThree($this, customerType, customerCategory, e);
        if ($this.attr('href').indexOf(employeeURL) >= 0 && (customerType == 'distributionPartner' || customerType == 'DISTRIBUTION_PARTNER') && (customerCategory == 'outsideUs' || customerCategory == 'OUTSIDE_US')) {
            e.preventDefault();
            alert('You are not authorized to access this page');
        }
        if ($this.attr('href').indexOf(employeeURL) >= 0 && (customerType == 'repairCenter' || customerType == 'REPAIR_CENTER')) {
            e.preventDefault();
            alert('You are not authorized to access this page');
        }
    }
    else {
        window.location.href = $this.attr('href');
    }
}

function megaMenuValidationThree($this, customerType, customerCategory, e) {
    if ($this.attr('href').indexOf(employeeURL) >= 0 && ((customerType == 'hospitalPublic' || customerType == 'hospitalPrivate' || customerType == 'nonHospital' || customerType == 'HOSPITAL_PUBLIC' || customerType == 'HOSPITAL_PRIVATE' || customerType == 'NON_HOSPITAL') || (customerType == 'distributionPartner' && customerCategory == 'us'))) {
        e.preventDefault();
        alert('You are not authorized to access this page');
    }
}

function megaMenuValidationTwo($this, customerType, customerCategory, e) {
    if ($this.attr('href').indexOf(repairManualURL) >= 0 && (customerType == 'distributionPartner' || customerType == 'DISTRIBUTION_PARTNER') && (customerCategory == 'outsideUs' || customerCategory == 'OUTSIDE_US')) {
        e.preventDefault();
        alert('You are not authorized to access this page');
    }
    if ($this.attr('href').indexOf('/repair-manual.html') >= 0 && ((customerType == 'hospitalPublic' || customerType == 'hospitalPrivate' || customerType == 'nonHospital' || customerType == 'HOSPITAL_PUBLIC' || customerType == 'HOSPITAL_PRIVATE' || customerType == 'NON_HOSPITAL') || ((customerType == 'distributionPartner' || customerType == 'DISTRIBUTION_PARTNER') && (customerCategory == 'us' || customerCategory == 'US')))) {
        e.preventDefault();
        alert('You are not authorized to access this page');
    }
    if ($this.attr('href').indexOf('/repair-manual.html') >= 0 && (customerType == 'distributionPartner' || customerType == 'DISTRIBUTION_PARTNER') && (customerCategory == 'outsideUs' || customerCategory == 'OUTSIDE_US')) {
        e.preventDefault();
        alert('You are not authorized to access this page');
    }    
}

function megaMenuValidationOne($this, customerType, e, customerCategory) {
    if ($this.attr('href').indexOf('/secure/support/customers.html') >= 0 && (customerType == 'repairCenter' || customerType == 'REPAIR_CENTER')) {
        e.preventDefault();
        alert('You are not authorized to access this page');
    }
    if ($this.attr('href').indexOf('/secure/support/partners.html') >= 0 && (customerType == 'repairCenter' || customerType == 'REPAIR_CENTER')) {
        e.preventDefault();
        alert('You are not authorized to access this page');
    }
    if ($this.attr('href').indexOf('/secure/support/partners.html') >= 0 && (customerType == 'hospitalPublic' || customerType == 'hospitalPrivate' || customerType == 'nonHospital' || customerType == 'HOSPITAL_PUBLIC' || customerType == 'HOSPITAL_PRIVATE' || customerType == 'NON_HOSPITAL')) {
        e.preventDefault();
        alert('You are not authorized to access this page');
    }
    if ($this.attr('href').indexOf(repairManualURL) >= 0 && ((customerType == 'hospitalPublic' || customerType == 'hospitalPrivate' || customerType == 'nonHospital' || customerType == 'HOSPITAL_PUBLIC' || customerType == 'HOSPITAL_PRIVATE' || customerType == 'NON_HOSPITAL') || ((customerType == 'distributionPartner' || customerType == 'DISTRIBUTION_PARTNER') && (customerCategory == 'us' || customerCategory == 'US')))) {
        e.preventDefault();
        alert('You are not authorized to access this page');
    }
}

function passwordFocus() {
    if ($('#change-password .o-form-container__main-form [name="password"]').length > 0 == $('#change-password .o-form-container__main-form [name="newPassword"]').length > 0) {
        $('#change-password .o-form-container__main-form [name="newPassword"]').on('focus keyup input change', function () {
            setTimeout(() => {
                $(this).closest('.form-group').removeClass('validation-error');
                $('#change-password .o-form-container__main-form [name="confirmPassword"]').removeAttr('disabled');
            },
                75);
            if ($(this).val().length > 3) {
                if ($(this).val() === $(this).closest('.fields').prev('.fields').find('[name="password"]').val()) {
                    setTimeout(() => {
                        $(this).closest('.form-group').addClass('validation-error');
                        $('#confirmpassword-submit').attr('disabled', true);
                        $('#change-password .o-form-container__main-form [name="confirmPassword"]').attr('disabled', true);
                    },
                        100);
                } else {
                    setTimeout(() => {
                        $(this).closest('.form-group').removeClass('validation-error');
                        passwordFocusOne();
                    },
                        100);
                }
            }
        });
    }
}

function passwordFocusOne() {
    if (($('#change-password .o-form-container__main-form [name="confirmPassword"]').val().length > 0) && !($('#change-password .o-form-container__main-form [name="confirmPassword"]').closest('.form-group').hasClass("validation-error") && ($('#change-password .o-form-container__main-form [name="confirmPassword"]').closest('.form-group').hasClass("validation-regex") && ($('#change-password .o-form-container__main-form [name="confirmPassword"]').closest('.form-group').hasClass("validation-require"))))) {
        $('#confirmpassword-submit').removeAttr('disabled');
        $('#change-password .o-form-container__main-form [name="confirmPassword"]').removeAttr('disabled');
    }
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

$(window).on("load", function() {
    if ($('.o-form-container__main-form [name="confirmEmail"]').length > 0) {
        $('.o-form-container__main-form [name="confirmEmail"]').on('focus keyup input change', function () {
            let $this = $(this);
            confirmEmailCheck($this);
        });
        $('.o-form-container__main-form input, .o-form-container__main-form textarea').on('keyup change blur', function () {
            setTimeout(() => {
                if ($(this).closest('.validation-error').find('.a-input-field--text-error').length > 0) {
                    if ($(this).closest('.validation-error').find('.a-input-field--text-error').text().length == 0) {
                        $(this).closest('.validation-error').find('.a-input-field--text-error').closest('.validation-error').removeClass('validation-error')
                    }
                }
                if($('.validation-error:visible').length > 0){
                    $('#register-submit').attr('disabled', true);
                }
            }, 5);
        });
        $('.o-form-container__main-form [name="confirmEmail"]').on('focus keyup input change blur', function (e) {
            e.preventDefault();
            $(this).closest('.form-group').removeClass('validation-error');
            let $this = $(this);
            confirmEmailCheck($this);
        });
        $('.o-form-container__main-form [name="email"]').on('focus keyup input change blur', function (e) {
            e.preventDefault();
            $(this).closest('.fields').next('.text').next('.fields').find('.form-group').removeClass('validation-error');
            let $this = $(this);
            emailFocusCheck($this);
        });
    }
});

function confirmEmailCheck($this) {
    if ($this.val().length > 3) {
        if ($this.val() != $this.closest('.fields').prev('.text').prev('.fields').find('[name="email"]').val()) {
            setTimeout(() => {
                $this.closest('.form-group').addClass('validation-error');
                $('#register-submit').attr('disabled', true);
            }, 50);
        }
        else {
            setTimeout(() => {
                $this.closest('.form-group').removeClass('validation-error');
                $('#register-submit').removeAttr('disabled');
            }, 50);
        }
    }
}

function emailFocusCheck($this) {
    if ($this.val().length > 3) {
        if ($this.val() != $this.closest('.fields').next('.text').next('.fields').find('[name="confirmEmail"]').val()) {
            setTimeout(() => {
                if ($this.closest('.fields').next('.text').next('.fields').find('[name="confirmEmail"]').val().length > 3) {
                    $this.closest('.fields').next('.text').next('.fields').find('.form-group').addClass('validation-error');
                    $('#register-submit').attr('disabled', true);

                }
            }, 50);
        }
        else {
            setTimeout(() => {
                $this.closest('.fields').next('.text').next('.fields').find('.form-group').removeClass('validation-error');
                $('#register-submit').removeAttr('disabled');
            }, 50);
        }
    }
}
