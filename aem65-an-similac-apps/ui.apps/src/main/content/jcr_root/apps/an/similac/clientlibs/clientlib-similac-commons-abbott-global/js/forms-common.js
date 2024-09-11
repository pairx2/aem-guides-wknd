var cache = {};
var autoService,
    placeService = null;
var dateValidationError = ".a-date-picker .a-input-field--text-require";
var inputPreemie = "input[name='preemie']";
var inputPreemieChecked = 'input[name="preemie"]:checked';
var ulDropDownLi = "ul.a-dropdown__menu li";
var confirmPasswordId = '#confirmPassword';
var ecomUserRedirect = "#ecomUserRedirect";
var ssmCheckBox = 'input[name="ssm-opt-in"]';
var dataConfirmPass = 'data-confirm-password';
var oFormContainer = ".o-form-container__main-form";
var similacEcom = 'similac-ecom';
var addrLineOne = "#lineOne";
var cityClass = ".city";
var zipClass = ".zipCode";
var formName = "#formName";
var mediaParam = {};
var momcarwmtValue = 'sim-momcare-walmart';
var digitalOfferCampaign = "sim-digital-offer-strongmoms";
var digitalOfferHCPKit = "sim-digital-offer-conversion";
var D_NONE = 'd-none';
var floatingLabelClass = "similac-label-floating";
var formGroupClass = ".form-group";
var dataRequired = "data-required";
var formLabel = "label";
var stateIdOption = "#state-id-options";
var preemieOptionAge = "#preemie-age-options";
var preemieOptionId = "#premature-id-options";
var blueColor = "#002f87!important";
var ainputField = ".a-input-field";
var babyDefaultText = "Baby's Birthday or Anticipated Arrival*";
var typeSelect = "Type or Select a Date";
var signUpButtonId = "#button-id";
var appJson = "application/json";
var xIdToken = "x-id-token";
var domainName = "similac.com";
var aDropdownSelected = ".a-dropdown-selected";
var fieldLoader = ".field-loader-userName";
var emailError = ".emailError";
var userTyped = false;
var isMicroSite = false;
var campaignList = ['sim-momcare-walmart', 'sim-digital-offer-strongmoms', 'sim-digital-offer-conversion'];
var cacheMode, placeRequest, sessionToken;
var mediaTrackingSessionJSON = {};
var setHCPpromo = false;
var userPhoneNumber = "";
var isChallengerForm = false;
var placesOptions = {
    types: ['geocode'],
    componentRestrictions: {
        country: 'us'
    }
};
var emailId;
var datePickerVal;
var dateTimeOut;
var value= ""; var  formError= ""; var  vJzipCode= ""; var  jQzipCode= ""; var  cityId= ""; var  htmlBody= "";
var templatePara= ""; var  templateBody= ""; var  columnControl= ""; var  topText= ""; var  formContainer= ""; var  bottomConatiner= ""; var  dataValue= "";
var overlayLoader= ""; var  babyBirthYearError= ""; var  babyBirthYearErrorNeo= ""; var  eventCategory= ""; var  eventType= ""; var  swalTitleText= "";
var swalMessageText= ""; var  input= ""; var  welcomePage= ""; var  neosureWelcomePage= ""; var  aliementumWelcomePage= ""; var  formNameNeosure= "";
var aboutYouTooltip= ""; var  aboutYourChildTooltip= ""; var  ecomUserProfileCookie= ""; var  userXidToken= ""; var  parsedEcomProfile= "";
var productName= ""; var  lineOneRef= ""; var  lineOneParent= ""; var  dateformatText= ""; 

var addrTopDistance = "";
var addrLeftDistance = "";
var addrRightDistance = "";

// Delete sessionstorage
window.sessionStorage.removeItem("isNeosurePage");
window.sessionStorage.removeItem("isChallengerForm");
window.sessionStorage.removeItem("formNeosure");

var checkLoggedInUser = function(loggedUserType){
    var isUserLoggedIn = false;
    if(userXidToken && parsedEcomProfile && parsedEcomProfile.userType === loggedUserType){
        isUserLoggedIn = true;
    }
    
    return isUserLoggedIn;
}
var isEnableKount;
var kountSessionID;
var additionalOptin;
var kountConfig = {};
jQuery(document).ready(function() {
    window.sessionStorage.removeItem("scriptLoaded");
    window.sessionStorage.removeItem("lineone");
    additionalOptin = jQuery("#additional-optin-options");
    isChallengerForm =  jQuery("#challengerForm").length ? true : false;
    value = document.getElementById("lineOne") && document.getElementById("lineOne").value;
    formError = jQuery("#form-error");
    vJzipCode = document.getElementById("zipcode-id");
    jQzipCode = jQuery("#zipcode-id");
    cityId = jQuery("#city-id");
    datePickerVal = jQuery('input[name="birthdate"]');
    emailId = jQuery("#email_id");
    htmlBody = jQuery("html, body");
    templatePara = jQuery("#template.global-error p");
    templateBody = jQuery("#template");
    columnControl = jQuery("#global-register-top .column-control");
    topText = jQuery("#top-text-id");
    formContainer = jQuery(".formcontainer #register-global-id");
    bottomConatiner = jQuery("#bottom-container");
    dataValue = jQuery('#oasisGenError').val();
    overlayLoader = jQuery("#overlay");
    babyBirthYearError = jQuery('#babyBirthYearErr').val();
    babyBirthYearErrorNeo = jQuery('#babyBirthYearErrNeoSure').val();
    eventCategory = jQuery('#eventCategory').val();
    eventType = jQuery('#eventType').val();
    swalTitleText = jQuery("#swal-title-text");
    swalMessageText = jQuery("#swal-message-text");
    input = document.getElementById("lineOne");
    welcomePage =  jQuery('#welcomePage').val();
    neosureWelcomePage = jQuery('#neosureWelcomePage').val();
    aliementumWelcomePage = jQuery('#alimentumWelcomePage').val()
    formNameNeosure = jQuery(formName).val().toLowerCase();
    aboutYouTooltip = jQuery('#aboutYouTooltip').val();
    aboutYourChildTooltip = jQuery('#aboutYourChildTooltip').val();
    ecomUserProfileCookie = ABBOTT.cookie("profile");
    userXidToken = ABBOTT.cookie(xIdToken);
    parsedEcomProfile = ecomUserProfileCookie && JSON.parse(ecomUserProfileCookie);
    productName = jQuery("#product").val();
    lineOneRef = jQuery('#lineOne');
    lineOneParent = lineOneRef.parents(formGroupClass);
    dateformatText = jQuery('#dateFormatText').val();
    addrTopDistance = jQuery('#lineOne').offset().top;
    addrLeftDistance = jQuery('#lineOne').offset().left;
    addrRightDistance = jQuery(window).width() - (jQuery('#lineOne').offset().left + jQuery('#lineOne').outerWidth());
    window.sessionStorage.setItem("productName", productName);
     //Kount initialization
     isEnableKount = jQuery('.o-form-container__wrapper').parent('div').attr("data-kount") === "true";
     if(isEnableKount){
         const kountClientId = jQuery("input[name=kountClientID]").length ? jQuery("input[name=kountClientID]").val() : "101722";
         const kountEnvironment = jQuery("input[name=kountEnvironment]").length ? jQuery("input[name=kountEnvironment]").val() : "TEST";
         const isSPA = (jQuery("input[name=isSPA]").val() === "true"); 
         kountConfig = {
         "clientID": kountClientId,
         "environment": kountEnvironment,
         "isSinglePageApp": isSPA
         }
         kountSessionID = uuid();
    }
    //show & Hide image based on utm campaign value
    var registerURLstr = new URLSearchParams(window.location.search); // get the query params
    var campaignValue = registerURLstr.get("utm_campaign"); // get the campaign value 
    var mediaTrackingSession = sessionStorage.getItem('MediaTracking'); //
    if(mediaTrackingSession){
        mediaTrackingSessionJSON = JSON.parse(mediaTrackingSession);
    }
    if((mediaTrackingSessionJSON.utm_campaign && mediaTrackingSessionJSON.utm_campaign.toLowerCase() === digitalOfferHCPKit ) || campaignValue === digitalOfferHCPKit){
        jQuery('#hcpKitImg .cmp-container.fast_reg.registration_custom').removeClass(D_NONE);
        jQuery('#rewardImg').addClass(D_NONE);
        setHCPpromo = true;
    } 

    if(sessionStorage.getItem('MediaTracking') !== null || ABBOTT.cookie('MediaTracking')) {
        var mediaQuery = ABBOTT.cookie('MediaTracking') ? ABBOTT.cookie('MediaTracking') : sessionStorage.getItem('MediaTracking');
        mediaParam = JSON.parse(mediaQuery);
    }
    window.sessionStorage.setItem("formNeosure",formNameNeosure);
    jQuery(confirmPasswordId).parents('.fields').hide();
    jQuery(confirmPasswordId).removeAttr('required').parents('.a-input-field').removeAttr(dataRequired);
    jQuery(confirmPasswordId).parents(ainputField).attr(dataConfirmPass,false);
    jQuery(fieldLoader).hide();
    jQuery(emailError).hide(); 

    if(jQuery(stateIdOption).length > 0){
        jQuery("#state-id-options .a-dropdown").attr("tabindex",0);
    }    
    if(jQuery(preemieOptionAge).length> 0 ){
        jQuery("#preemie-age-options .a-dropdown").attr("tabindex",0);
    }

    const checkLoggedInSSM = (jQuery(formName).val().toLowerCase() !== 'oasis')? checkLoggedInUser('similac-ssm'):"";
    if(checkLoggedInSSM){
        window.location.href = jQuery('#userProfile').val();
    }
    jQuery('form').attr("autocomplete", "off");
    jQuery("input#city-id").attr('maxlength', '40')
        .parents(".fields")
        .addClass("city");
    jQuery("input#zipcode-id").attr('maxlength', '10')
        .parents(".fields")
        .addClass("zipCode");
    jQuery("input#first-name").attr('maxlength', '40')
        .parents(".fields")
        .addClass("shortField firstName");
    jQuery("input#last-name").attr('maxlength', '40')
        .parents(".fields")
        .addClass("shortField lastName");
    jQuery("#lineTwo").parents(".fields")
            .addClass("lineTwo");
    jQuery("input#password").attr({
        maxlength:'25',
        name:"password",
        autocomplete: "nope",
        }).parents(".fields").addClass("passwordId");
        emailId.attr({
            maxlength: '64',
            name: "emailId",
            autocomplete: "nope"
        });
    jQuery("#lineOne, #lineTwo").attr('maxlength', '60');
    jQuery("#phone_number").attr('maxlength', '10');
    !isChallengerForm && jQuery(".passwordId .form-group .input-group").after(
        '<div class="password-empty" id="password-meter"><div class="password-strength-meter">Password Strength: <span>No Password</span></div></div>'
    );

    formError.remove();
    /* Add tool tip */
    jQuery("#about_container .tooltips .tooltip-wrapper").attr({
        "data-content": aboutYouTooltip,
        "data-toggle": "popover",
        "data-placement": "right",
        "data-trigger": "focus"
    });
    jQuery(".o-form-container__wrapper .column-control .tooltips .tooltip-wrapper").attr({
        "data-content": aboutYourChildTooltip,
        "data-toggle": "popover",
        "data-placement": "right",
        "data-trigger": "focus"
    });
    jQuery("#about_container .tooltips .tooltip-wrapper").popover();
    jQuery(".o-form-container__wrapper .column-control .tooltip-wrapper").popover();
    removeDisableForm();
    document
    .getElementById("button-id")
    .addEventListener("click", registrationSubmit);
document
    .getElementsByName("birthdate")[0]
    .addEventListener("blur", validateDate);
document.addEventListener("click", () =>{
    validateDate();
    addClassForNotGoogleAddress();
});

document.getElementById("lineOne").addEventListener("blur", addrFocusOut);
document
    .getElementById("password")
    .addEventListener("keyup", strengthIndicator);
jQuery('.passwordId .icon-right').html('<svg viewBox="0 0 100 100" class="sim-icon"><use href="#icon-hide"></use></svg>');

clearSocialProvider();
    if(jQuery(formName).val().toLowerCase() === 'neosure'){
        jQuery('input[name="preemie"][value="earlier"]').prop('checked',true);
        jQuery(preemieOptionId).show();
        jQuery(preemieOptionAge).show();
    }
    if(mediaParam.utm_campaign && mediaParam.utm_campaign.toLowerCase() === momcarwmtValue) {
        jQuery('#momcarewmt .text span').removeClass(D_NONE);
    }
    if(mediaParam.utm_campaign && mediaParam.utm_campaign.toLowerCase() === digitalOfferCampaign) {
        jQuery('#digitalOfferSSM .text span').removeClass(D_NONE);
    }
    if(window.localStorage.getItem('registraionForm___API')){
        fastRegister();
     }
     // Add floating CSS class to fields if they have pre-filed value
     floatFieldwithValue();
     // Add display none to psudo field of date selector
     jQuery('.a-date-picker__input-hidden').addClass(D_NONE);

     //Push campaign to array for sweepstake
    if(jQuery('#sweepPage').val() === "true"){
        const sweepCookieConfig = {
            expires: 1, //set expire to 24 hrs
            path: "/",
            domain: domainName
        };
        if(!ABBOTT.cookie('MediaTracking')) {
            ABBOTT.cookie("MediaTracking", sessionStorage.getItem('MediaTracking'), sweepCookieConfig);
        }
        setTimeout(function(){
        let sweepCookie = JSON.parse(ABBOTT.cookie('MediaTracking'));
        if(sweepCookie.utm_campaign && sweepCookie.utm_campaign.toLowerCase() === "sim-mysimilac-sweepstakes"){
            sessionStorage.setItem('sweepPopUp',true);
            campaignList.push("sim-mysimilac-sweepstakes");
        }
        },500); 
    
    }
    // Set Calander alignment
    if(window.screen.width >= 768 ){
        jQuery('.litepicker').addClass('d-none');
        var topDistance = jQuery('.a-date-picker').offset().top;
        var leftDistance = jQuery('.a-date-picker').offset().left;
        var popupFlag = false;    
        jQuery('.a-date-picker .icon').click(function(){
        topDistance = jQuery('.a-date-picker').offset().top;
        leftDistance = jQuery('.a-date-picker').offset().left;
         var setCss = setTimeout(function(){
            jQuery('.litepicker').css({
                top: topDistance + 85,
                left: leftDistance
            });
            jQuery('.litepicker').removeClass('d-none');
             popupFlag = true;
             if(popupFlag){
               clearTimeout(setCss);  
             }
         }, 0);
         
         });
    }
    // trigger click to show the button
    jQuery('body').trigger('click');
    document.addEventListener("DOMContentLoaded",initAutocomplete); 
    document.addEventListener("DOMContentLoaded",floatFieldwithValue);  

    //bind event to dynamic date picker element
    datePickerVal.keyup(function(){
        jQuery('.a-date-picker--error-date').addClass(D_NONE);
        jQuery('.a-date-picker--error-format').addClass(D_NONE);
        var usrFrmType = jQuery(formName).val();
        var dateVal = datePickerVal.val();
        if(dateTimeOut){
            clearTimeout(dateTimeOut);
        }
        dateTimeOut = setTimeout(function () {
            var validFormat = dateVal.length > 1 && validateDateFormat(dateVal);
            jQuery(dateValidationError).css('display', 'none').text('');
            if (validFormat) {
                isChallengerForm && $('input[name="birthdate"]').parents('.form-group').removeClass('validation-error-msg');
                validateChildDate(dateVal, usrFrmType);
            } else {
                isChallengerForm && $('input[name="birthdate"]').parents('.form-group').addClass('validation-error-msg');
                if (dateVal.length < 1) {
                    jQuery(dateValidationError).css('display', 'block').text("Date is required.");
                } else {
                    jQuery(dateValidationError).css('display', 'block').text(dateformatText);
                }
            }
        }, 500);
        preSelectedAlimentumNeosure();
    })


    datePickerVal.click(function(e) {
        e.stopPropagation();
        jQuery(this).closest(".datepicker").removeClass("datepicker");
        !isChallengerForm && jQuery(this)
            .parents(formGroupClass)
            .find(formLabel)
            .addClass(floatingLabelClass);
        !isChallengerForm && jQuery(this)
            .parents(formGroupClass)
            .find(formLabel)
            .html(typeSelect);
        jQuery(this).css("color", blueColor);
        if(!jQuery(this).val() && !isChallengerForm){
            jQuery(this).addClass("datePlaceholder");
        }
    });

    jQuery(".a-date-picker .icon").click(function(e) {
        !isChallengerForm && jQuery(this)
            .parents(formGroupClass)
            .find(formLabel)
            .addClass(floatingLabelClass);
        !isChallengerForm && jQuery(this)
            .parents(formGroupClass)
            .find(formLabel)
            .html(typeSelect);
        datePickerVal.css("color", blueColor);
    });

    lineOneRef.on('keyup',initAutocomplete);
    
    //Call Kount SDK
    if(isEnableKount){
		kountSDK(kountConfig, kountSessionID);
    }
    
    //Check sselected state
    jQuery('#state-id-options ul.a-dropdown__menu li').click(function(){
        let stateAbbr = jQuery(this).data('optionvalue');
        handleAdditionalOptIn(stateAbbr);
    });
});

jQuery(document).on('submit','form',function(event){
    event.preventDefault();
});
jQuery(document).on('click','.a-dropdown__menu', function() {
    var checkState = setInterval(function() {
        if (jQuery("#state-id-options span").hasClass("a-dropdown-selected")) {
            jQuery("#state-id-options p").hide();
            clearInterval(checkState);
        }
    }, 10);
    removeDisableForm();
});
// Function to toggle passowrd view
jQuery(document).on('click',".passwordId .icon-right", function() {
    var passwordInput = jQuery("#password");
    if(passwordInput.attr("type") === "password"){
        passwordInput.attr("type", "text");
        jQuery('.passwordId .icon-right .sim-icon use').attr('href', "#icon-show");
    } else{
        passwordInput.attr("type", "password");
        jQuery('.passwordId .icon-right .sim-icon use').attr('href', "#icon-hide");
    }
});

//code added for T&C checkbox
jQuery(document).on('click',"#spi-id-options .a-checkbox__input",function(){
    if(jQuery("#spi-id-options .a-checkbox__input").is(":checked"))
    {
        jQuery("#spi-id-options .a-checkbox__custom").attr("aria-checked",true);
        jQuery("#spi-id-options").removeClass("validation-require");
        removeDisableForm();
    }else{
        jQuery("#spi-id-options .a-checkbox__custom").attr("aria-checked",false);
        jQuery("#spi-id-options").addClass("validation-require");
    }        
});
// Load social login when element is loaded
document.addEventListener("DOMContentLoaded", function() {
   var setIcons = setInterval(function(){
    if (jQuery("#socialRegisterDiv").length > 0 && jQuery("#socialRegisterDiv_uiContainer").length === 0) {
        ABBOTT.socialLogin("", "socialRegisterDiv", onLogin, error);
    } else {
        jQuery('.field-loader.field-loader-socialIcons').hide();
        clearInterval(setIcons);
    }
   }, 100);
});

// bind function to dynamic AT element
jQuery(document).on('click','input[name="preemie"]',function() {
    if (jQuery(this).val() === "earlier") {
        jQuery(`${preemieOptionAge} ${ainputField}`).attr(dataRequired, true);
    } else {
        jQuery(`${preemieOptionAge} ${ainputField}`).removeAttr(dataRequired);
        jQuery(`${preemieOptionAge} ${ulDropDownLi}`).removeClass("selected");
        removeDisableForm();
    }
});
jQuery(document).on('click', '.day-item', function() {
    var selectedDate = datePickerVal.val();
    var userFormType = jQuery(formName).val();
    !isChallengerForm && jQuery(this)
    .parents(formGroupClass)
    .find(formLabel)
    .addClass(floatingLabelClass);
!isChallengerForm && jQuery(this)
    .parents(formGroupClass)
    .find(formLabel)
    .html(typeSelect);
datePickerVal.css("color", blueColor);
    validateChildDate(selectedDate, userFormType);
});

// validate baby child date
function validateChildDate(childD, frmType){
    var checkBabyYear = checkBabyBirthYear(childD,frmType);
    if (checkBabyYear && childD) {
        removeDisableForm();
        jQuery(dateValidationError).css('display', 'block').html(babyBirthYearError)
    } else if(childD === '') {
        jQuery(dateValidationError).css('display', 'block').text("Date is required.")
    } else {
        jQuery(dateValidationError).css('display', 'none').text("Date is required.")
        isChallengerForm && $('input[name="birthdate"]').parents('.form-group').removeClass('validation-error-msg');
    }
    validateDate();
    // Condition to pre-select 'Alimentum' or 'NeoSure' on Core Registration Page
    let rewardURLstr = new URLSearchParams(window.location.search);
    let campaignValue = rewardURLstr.get("utm_campaign");
    if ((campaignValue != 'sim-alimentum-hcp' && campaignValue != 'sim-neosure-hcp') || (isFutureBirthDate())) {
        handleUserDOoptIn(childD);
    }
    if(jQuery(formName).val().toLowerCase() === 'neosure'){
        jQuery('input[name="preemie"][value="earlier"]').prop('checked',true);  
    }
}


// Limit year range on dynamic AT element 
jQuery(document).on('click','.a-date-picker .a-input-grp',function() {
    yearLimitFunction();
});
jQuery(document).on('click','.a-date-picker span.icon-right', function() {
    yearLimitFunction();
});
jQuery(document).on('change', '.month-item-year, .month-item-name', function() {
    yearLimitFunction();
});
jQuery(document).on('click', '.button-next-month, .button-previous-month', function() {
    yearLimitFunction();
});
jQuery(document).on('click','.a-date-picker .icon',function(){
    yearLimitFunction();
});

function yearLimitFunction(){
const currYr = new Date().getFullYear();
const minYr = Number(currYr - Number(jQuery('#pastYrLimit').val()));
const maxYr = Number(currYr + Number(jQuery('#futureYrLimit').val()));   
    setTimeout(function(){
    jQuery('.litepicker .month-item-year option').filter(function(){
           return parseInt(this.value, 10) < minYr || parseInt(this.value, 10) > maxYr;
        }).remove();
    },100);
}

function addClassForNotGoogleAddress(){
    if(jQzipCode.val().length > 0 && !isChallengerForm){
        jQzipCode.parents(formGroupClass)
        .find(formLabel)
        .addClass(floatingLabelClass);
    }
    if(cityId.val().length > 0 && !isChallengerForm){
        cityId.parents(formGroupClass)
        .find(formLabel)
        .addClass(floatingLabelClass);
    }
}

async function verfiyUserExist() {
        jQuery(emailError).hide()
        var emailRegex = validateEmailPattern();
        if(jQuery('#email_id').val().length > 0 && emailRegex.test(jQuery('#email_id').val())){
            let captchaToken = await getCaptchaToken();
            var formData = {
                userName:jQuery('#email_id').val(),
                userType:"strongmoms",
                captchaValue : captchaToken,
                captchaType : reCaptchaType
            };
            formData = JSON.stringify(formData);
            $.ajax({
                url: document.getElementById("verify-email-exists").value,
                method: "POST",
                headers: {
                    "content-type": appJson,
                    "x-country-code": "US",
                    "x-application-id": "similac",
                    "x-preferred-language": "en-US"
                },
                data: formData,
                dataType: "json",
                async: true,
                 beforeSend: function() {
                     jQuery(fieldLoader).show();
                },
                success: function(results) {
                jQuery(fieldLoader).hide();
        if(results && results.response.loginIdentity && results.response.loginIdentity === true ) {
                jQuery(emailError).show();
                jQuery(emailError).addClass('text-danger');
            }
            else{
                jQuery(emailError).hide();
            }
        }
        });

        }
    }

function hideFormOnError() {
    templatePara.html(dataValue);
    templateBody.show();
    htmlBody.animate({ scrollTop: 0 }, "slow");
    columnControl.hide();
    topText.hide();
    formContainer.hide();
    bottomConatiner.hide();
    overlayLoader.hide();
    return false;
}

function hideFormonPageLoad() {
    columnControl.hide();
    topText.hide();
    formContainer.hide();
    bottomConatiner.hide();
    overlayLoader.show();
}

function getGoogleMapInstance() {
    return new Promise((resolve, reject) => {
        const { google } = window;
        if (google) {
            return resolve(google);
        } else {
            return reject("Error");
        }
    });
}

function validateDate() {
    var inputDate = datePickerVal.val();
    if (inputDate) {
        const m = new Date(inputDate);
        if (new Date() >= m) {
            !isChallengerForm && jQuery(preemieOptionId).show();
            isChallengerForm && jQuery('#challengerForm .accordion').show();
            jQuery(`${preemieOptionId} ${inputPreemie}`).attr(dataRequired, true);
            removeDisableForm();
        } else {
            isChallengerForm && jQuery('#challengerForm .accordion').hide();
            jQuery(preemieOptionAge).hide();
            jQuery(preemieOptionId).hide();
            jQuery(`${preemieOptionId} ${inputPreemie}`).removeAttr(dataRequired);
            jQuery(`${preemieOptionAge} ${ainputField}`).removeAttr(dataRequired);
            jQuery(`${preemieOptionAge} ${aDropdownSelected}`).text("");
            removeDisableForm();
        }
    }
}


function checkBabyBirthYear(dobValue, product = '') {
    var date = new Date(dobValue);
    var validDate = false;
    if (date && typeof date === "object" && product.toLowerCase() !== 'neosure') {
        const curYear = new Date().getFullYear();
        const targYear = date.getFullYear();
        const startYear = curYear - 5;
        const endYear = curYear + 1;
        validDate = !(targYear >= startYear && targYear <= endYear)
    }
    if (date && typeof date === "object" && product.toLowerCase() === 'neosure') {
        babyBirthYearError = babyBirthYearErrorNeo;
        const currentDate = new Date();
            if(date.getTime() > currentDate.getTime()){
                return true;
            }
    }
    return validDate;
}


function handleUserDOoptIn(childDob){
    var childDobF = new Date(childDob);
    var currDate = new Date();
     var childWeeks = Math.ceil(
         (currDate - childDobF) / (7 * 24 * 60 * 60 * 1000)
     );
     if(childWeeks < 1){
        welcomePage = jQuery('#welcomePage').val();
		jQuery('#productName-options input').length && jQuery('#productName-options input').prop("checked", false);
		jQuery('#premature-id-options input').length && jQuery('#premature-id-options input').prop("checked", false);
     }
     var doOption =   jQuery("#bonusOffer-options");
    if (mediaParam.utm_campaign && campaignList.includes(mediaParam.utm_campaign.toLowerCase())) {
        doOption.hide();      
        doOption.parent().next('div p.footnote').hide();
        selectFalseValueDoOffer();
    } else if(childWeeks >= -39 && childWeeks <= 65 &&
        (!mediaParam.utm_campaign || (mediaParam.utm_campaign && !campaignList.includes(mediaParam.utm_campaign.toLowerCase())))
    ) {
        //Logic for hide/show DO section in case of previous/future date
        doOption.show();
        if (!isFutureBirthDate()) {
            let RadioButtonChecked = jQuery('#productName-options').find('input[name="product-name"]:checked').val();
            if ((RadioButtonChecked === 'ALIMENTUM' || RadioButtonChecked === 'NEOSURE')) {
                doOption.hide(); //Hide in case of Alimentum/Neosure Selected
            }
        }
        
        if(!isChallengerForm){
            doOption.parent().next('div p.footnote').show();
        }
        selectFalseValueDoOffer();
    } else{
        jQuery("#bonusOffer-options input[name=bonusOffer][value=false]").prop("checked", true);
        doOption.hide();      
        doOption.parent().next('div p.footnote').hide();
        sessionStorage.setItem('birthdayWeekNegative', true);
    }	
}

// Bind event to dynamic AT element
jQuery(document).on('click',"input[type='radio'][name='preemie']",function() {
    var rad = jQuery("input[type='radio'][name='preemie']:checked").val();
    if (rad === "earlier") {
        jQuery(preemieOptionAge).show();
    } else if (rad === "later") {
        jQuery(preemieOptionAge).hide();
        jQuery(`${preemieOptionAge} ${aDropdownSelected}`).text("");
        removeDisableForm();
    }
});

function strengthIndicator() {
    var pwd = jQuery("#password").val();
    var strongRegExp = new RegExp(jQuery("#isStrong").val());
    var medRegExp = new RegExp(jQuery("#isMedium").val());
    let strengths = "";
    let strengthval = "";
    const isStrong = strongRegExp.test(
        pwd
    );
    if (pwd.length < 1) {
        strengths = "No Password";
        strengthval = "empty";
    }
    if (pwd.length >= 1 && !isStrong) {
        strengths = "Weak";
        strengthval = "weak";
    }
    if (pwd.length === 8 && isStrong) {
        strengths = "Medium";
        strengthval = "medium";
    }
    if (pwd.length >= 9 && isStrong) {
        strengths = "Strong";
        strengthval = "strong";
        if (medRegExp.test(value)) {
            strengths = "Medium";
            strengthval = "medium";
        }
    }
    if (pwd.length >= 11 && isStrong) {
        strengths = "Very Strong";
        strengthval = "veryStrong";
        if (medRegExp.test(value)) {
            strengths = "Medium";
            strengthval = "medium";
        }
    }
    jQuery("#password-meter").attr("class", "password-" + strengthval);
    jQuery("#password-meter span").html(strengths);
}

function addrFocusOut() {
    if (
        input.value.length < 5 ||
        (window.sessionStorage.getItem("lineone") && input.value !== window.sessionStorage.getItem("lineone"))
    ) {
        showAddrrFields();
    } else {
        validateAddress();
    }
    var checkAddrTimeout = setTimeout(function(){
        jQuery('.pacBox').addClass(D_NONE).removeClass('d-block');
        clearTimeout(checkAddrTimeout);
    },300);
}

/*Validate address with correct format and show/hide feilds */ 
function validateAddress(){
    var usrAddr = jQuery(addrLineOne).val();
    var usrAddrArr = usrAddr.split(',');
    if(usrAddrArr.length > 3 && usrAddrArr[3]){
        hideAddrFields();
        removeDisableForm();
    } else {
        showAddrrFields();
    }
}


function initAutocomplete() {
    cache = {};
    cacheMode = 0;
    var tempDiv = document.createElement("div");
    tempDiv.className = "google-map-div";
    tempDiv.style.display = "none";
    document.body.appendChild(tempDiv);
    if(!autoService){
        autoService = new google.maps.places.AutocompleteService();
    }
    if(!sessionToken){
        sessionToken = new google.maps.places.AutocompleteSessionToken();
    }
    if(!placeService){
        placeService = new google.maps.places.PlacesService(tempDiv); //html "div" required!!
    }
    placeRequest = {
        delay: 0,
        minLength: 5,
        source: function (request, response) {
            if (jQuery("#lineOne").hasClass("check-select")) {
                jQuery("#lineOne").removeClass("check-select");
            }
            var term = request.term;
            placesOptions.input = jQuery("#lineOne").val();
            placesOptions.sessionToken = sessionToken;  // adding session to group API calls in discrete call
            if (placesOptions.input.length > 0) {
                if ((cache) && (term in cache) && (cacheMode === 1)) {
                    response(cache[term]);
                    return;
                } //check cache if its same address lookup otherwise call API
                autoService.getPlacePredictions(placesOptions,
                    function (predictions, status) {
                        var predictionArray = (status != google.maps.places.PlacesServiceStatus.OK) ? [] : jQuery.map(predictions,
                            function (p) {
                                return {
                                    label: p.description,
                                    ref: p.place_id,
                                    url: "javascript:placesDetailsFill('" + p.place_id + "');" //not necessary, <a href=""> is better
                                };
                            }
                        ); //prediction array
                        if (cacheMode === 1) {
                            cache[term] = predictionArray;
                        }
                        response(predictionArray);
                        if(predictionArray.length > 0) {
                        
                        hideAddrFields() // Hide address field
                        //reset the height 
                         addrTopDistance = jQuery('#lineOne').offset().top;

                        var pacC = '<div class="pac-container pac-logo" style="width: 100%;">';
                        var pacCEnd = '</div>';
                        var suggestionHtml = "";
                        predictionArray.forEach(function(addressTxt){
                        suggestionHtml += `<div class="pac-item" onclick="placesDetailsFill('${addressTxt.ref}', '${addressTxt.label}')"><span class="pac-icon pac-icon-marker"></span><span class="pac-item-query">${addressTxt.label}</span></div>`; 
                        });

                        var prediecthtml = pacC + suggestionHtml + pacCEnd;
                        jQuery('.pacBox').html(prediecthtml);
                        jQuery('.pacBox').css({
                            position: 'absolute',
                            top: addrTopDistance + 15,
                            left: addrLeftDistance,
                            right: addrRightDistance
                        });
                        jQuery('.pacBox').addClass('d-block').removeClass(D_NONE);
                        removeDisableForm();
                    } else {
                        jQuery('.pacBox').addClass(D_NONE).removeClass('d-block');
                        validateAddress();
                    }
                        return;
                    }
                );
            } 
        },
    };

    //This binds the jQuery UI autocomplete to the autocomplete field
    jQuery("#lineOne").autocomplete(placeRequest);
}

function placesDetailsFill(place_Id, addrLabel) {
    jQuery("#lineOne").addClass("check-select").val(addrLabel);
    placeService.getDetails({
        placeId: place_Id
    }, function (place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            fillInAddress(place);
        }
    });
    jQuery('.pacBox').addClass(D_NONE).removeClass('d-block');
}

//Bind event to dynamic AT element
jQuery(document).on('blur','input',function(e) {
    var inputVal = jQuery(this).val();
    if (jQuery.trim(inputVal).length < 1 && jQuery(this).attr('name') !== 'birthdate' && !isChallengerForm) {
        jQuery(this)
            .parents(formGroupClass)
            .find(formLabel)
            .removeClass(floatingLabelClass);
    }
    if(jQuery(this).attr('name') === 'birthdate'){
        jQuery(this).removeClass("datePlaceholder");
    }
});

jQuery(document).on('focus',"input",function() {
    !isChallengerForm && jQuery(this)
        .parents(formGroupClass)
        .find(formLabel)
        .addClass(floatingLabelClass);
});

jQuery(document).click(function(e) {
    //check if button is clicked AND SPI checkbox not checked
    if(e.target.id == 'signUpClick'){
        var checkClick = setInterval(function(){
        if(jQuery('#spi-id-options').hasClass('validation-require')){
            clearInterval(checkClick);
        }
        if(!jQuery("#spi-id-options .a-checkbox__input").is(":checked") && !jQuery('#spi-id-options').hasClass('validation-require')){
           jQuery(signUpButtonId).trigger('click'); 
        }
        },100);
    }
    //Check WA/NV checkbox validation
    if(e.target.id == 'button-id' || e.target.innerText === "Complete Sign-Up"){
        if(!jQuery("#additional-optin-options .a-checkbox__input").is(":checked") && 
        additionalOptin.is(':visible') && additionalOptin.length){
			additionalOptin.addClass("validation-require");
		}
	}
    //set floating label to datepicker field if value present
    if(datePickerVal){
        var inputVal = datePickerVal.val();
        if (jQuery.trim(inputVal).length < 1 && !isChallengerForm) {
            datePickerVal
                .parents(formGroupClass)
                .find(formLabel)
                .removeClass(floatingLabelClass);
            datePickerVal
                .parents(formGroupClass)
                .find(formLabel)
                .html(babyDefaultText);
            datePickerVal.css("color", "#ffffff!important");
            datePickerVal.removeClass("datePlaceholder");
        } else {
            !isChallengerForm && datePickerVal
                .parents(formGroupClass)
                .find(formLabel)
                .addClass(floatingLabelClass);
            !isChallengerForm && datePickerVal
                .parents(formGroupClass)
                .find(formLabel)
                .html(typeSelect);
            datePickerVal.css("color", blueColor);
        }
        //remove field error if YY format value is valid
        if(datePickerVal.val().length){
            var validDateFormatKeyup = datePickerVal.val().length > 1 && validateDateFormat(datePickerVal.val());
            if(validDateFormatKeyup){
                isChallengerForm && datePickerVal.parents('.form-group').removeClass('validation-error-msg');
            } else {
                isChallengerForm && datePickerVal.parents('.form-group').addClass('validation-error-msg');
            }		
        }
    }
});


function fillInAddress(place) {
    let addLineOne =  jQuery('#lineOne').val();
    let addArr = addLineOne.split(",");
    if (place) {
        const { address_components = [] } = place;
        const commonTypesMap = {
            postal_code: { api: "zipCode", nameType: "long_name" },
            country: { api: "country", nameType: "short_name" },
            administrative_area_level_1: { api: "state", nameType: "short_name" },
            administrative_area_level_2: { api: "state", nameType: "short_name" },
            locality: { api: "city", nameType: "long_name" },
            sublocality: { api: "city", nameType: "long_name" },
            neighborhood: { api: "neighborhood", nameType: "long_name" },
            route: { api: "route", nameType: "long_name" },
            street_number: { api: "street_number", nameType: "long_name" }
        };

        const tempData = {};

        address_components.forEach(({ types = [], ...names }) => {
            types.map(typeName => {
                if (commonTypesMap.hasOwnProperty(typeName)) {
                    const commonMap = commonTypesMap[typeName];
                    const apiKey = commonMap["api"];
                    const _value = names[commonMap["nameType"]];
                    tempData[apiKey] = _value;
                }
            return typeName;
            });
        });

        const lineOne = [tempData["street_number"], tempData["route"]]
            .filter(item => item)
            .join(" ");
        const zipCode = tempData["zipCode"] || "";
        const city = tempData["city"] || "";
        const checkEcom = checkLoggedInUser(similacEcom);

        //Show the additional opt in for WA/NV
        handleAdditionalOptIn(tempData["state"]);
        if (lineOne === "" || addArr[2] === undefined || !tempData["zipCode"] || !tempData["city"] || !tempData["state"] ) {
            if(lineOne ===''){
                lineOneRef.val("");
                lineOneParent.find(formLabel)
               .removeClass(floatingLabelClass);
               lineOneParent.find('.form-text.a-input-field--text-require')
               .addClass('d-block')
               .find('.abt-icon').addClass('lineone-custom-error');

            }
            cityId.val("");
            jQzipCode.val("");
            if(zipCode !=='' && !isChallengerForm){
                jQzipCode.val(zipCode).parents(formGroupClass)
                .find(formLabel)
                .addClass(floatingLabelClass);
            }
            if(city !== '' && !isChallengerForm){
                cityId.val(city).parents(formGroupClass)
                .find(formLabel)
                .addClass(floatingLabelClass);
            }
            jQuery(".city").show();
            jQuery(".zipCode").show();
            jQuery(stateIdOption).show();
            jQuery(stateIdOption +' p').show();
        }
        if(!userTyped && checkEcom && window.localStorage.getItem("purchaser_type") === "subscription_user" && lineOne.toUpperCase() !== parsedEcomProfile.lineOne.toUpperCase()){
            jQuery(".city").show();
            jQuery(".zipCode").show();
            jQuery(stateIdOption).show();    
            cityId.val(parsedEcomProfile.city);
            jQzipCode.val(parsedEcomProfile.zipCode);
            addrStateBinding(parsedEcomProfile.state);
            //Show the additional opt in for WA/NV
            handleAdditionalOptIn(tempData["state"]);  
        } else if (lineOne !== "" && tempData["zipCode"] && tempData["city"] && tempData["state"] && addArr[2] !== undefined){
            lineOneParent.find('.form-text.a-input-field--text-require')
               .removeClass('d-block')
               .find('.abt-icon').removeClass('lineone-custom-error');
            const address = [
                    lineOne,
                    tempData["city"],
                    tempData["state"],
                    tempData["zipCode"]
                ]
                .filter(item => item)
                .join(", ");
            jQuery(addrLineOne).val(address);
            window.sessionStorage.setItem("lineone", address);
            //Show the additional opt in for WA/NV
            handleAdditionalOptIn(tempData["state"]);
            jQuery(".city")
                .val("")
                .hide();
            jQuery(".zipCode")
                .val("")
                .hide();
            jQuery(stateIdOption).hide();
            
            jQzipCode.val(tempData["zipCode"]);
            cityId.val(tempData["city"]);
            jQuery(`${stateIdOption} ${ainputField}`).removeAttr(dataRequired);
        }
    }
}

function addrStateBinding(stateName){
    var stateTxt;
    jQuery('#state-id-options ul li').removeClass('selected');
    jQuery('#state-id-options ul li').each(function(){
        if(jQuery(this).data('optionvalue') === stateName || jQuery.trim(jQuery(this).text()) === stateName){
            jQuery(this).addClass('selected');
            stateTxt = jQuery(this).text();
        }
        });
        jQuery('#state-id-options').find('span.a-dropdown__placeholder')
        .addClass('a-dropdown-selected')
        .removeClass('a-dropdown__placeholder').text(stateTxt);
        jQuery('#state-id-options span.a-dropdown-selected').text(stateTxt);
}

function doGeocode(prefillAddress = "", isEcom = false, ecomProfile="") {
    var addr = prefillAddress;
    if(prefillAddress.length < 1){
         addr = document.getElementById("lineOne").value;
    }
    // Get geocoder instance
    var geocoder = new google.maps.Geocoder();
    // Geocode the address
    geocoder.geocode({
            address: addr
        },
        function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var a = results[0].place_id;
                getGoogleMapInstance().then(() => {
                    var tempDiv = document.createElement("div");
                    tempDiv.className = "google-map-div";
                    tempDiv.style.display = "none";
                    document.body.appendChild(tempDiv);
                    placeService = new window.google.maps.places.PlacesService(tempDiv);
                   // for prefill only
                   if(isEcom && window.localStorage.getItem("purchaser_type") === "subscription_user"){
                    callGooglePlaceForEcom(a, addr,placeService)
                    } else{
                        callGooglePlaceForEcom(a, addr,placeService);
                    }
                });
            } else {
                if(isEcom && window.localStorage.getItem("purchaser_type") === "subscription_user"){
                    jQuery(cityClass).show();
                    jQuery(zipClass).show();
                    jQuery(stateIdOption).show();
                    addrStateBinding(ecomProfile && ecomProfile.state);
                }
            } 
        }
    );
}

function callGooglePlaceForEcom(pId, addr, gPlaceService){
    var lenApproved = "";
    if (addr.length > 4) {
        lenApproved = "valid";
    }
    lenApproved &&
    gPlaceService &&
    gPlaceService.getDetails({
                placeId: pId,
                fields: ["address_components"]
            },
            function(_a, _status) {
                _status === window.google.maps.places.PlacesServiceStatus.OK ?
                    fillInAddress(_a) :
                    console.log(status);
            }
        );
}

function showAddrrFields(){
    jQuery(cityClass).show().find('input').val('');
    jQuery(zipClass).show().find('input').val('');
    jQuery(stateIdOption).show();
}

//Hide manual fields
function hideAddrFields(){
    jQuery(cityClass).hide();
    jQuery(zipClass).hide();
    jQuery(stateIdOption).hide();
}

function gtmTag(){
    let gaType = "";
    gaType = eventType + "_submit";
    if(window.sessionStorage.getItem('loginProvider')){
        gaType = "social-registration_submit_" + window.sessionStorage.getItem('loginProvider');
    }
    return gaType;
}

function setFlagToStorage() {
    var formType = jQuery("#formType").val();
    if(jQuery("#formType")[0] && window.sessionStorage){
        sessionStorage.setItem("formType",formType);
    }
}
//kount Create a Session ID
function uuid() {
    var r = crypto.randomUUID().replace(/-/g, '');
    return r.toString();
}

async function registrationSubmit(e) {
    var progressError = false;
    if(isChallengerForm && jQuery('#productName-options').find('input[name="product-name"]').is(":checked")){
      productName =  jQuery('#productName-options').find('input[name="product-name"]:checked').val();
      progressError = jQuery('.progress.col').hasClass('weak');
    }

    //Call function to set form type in local storage
    setFlagToStorage();
    var shouldLogin = true;
    var formProductVal = jQuery(formName).val();
    if(formProductVal.toLowerCase() === 'microsite'){
        shouldLogin = false;
        isMicroSite = true;
    }
    //code for checking whether element is present in DOM
   let checkbox_present=false;
   let add_checkbox_present =false;
   if(additionalOptin.length && additionalOptin.is(":visible")){
    add_checkbox_present = true;
   }
   if(jQuery(".options #spi-id-options").length > 0)
   {
     checkbox_present=true;
   }
   // get address selection
   var stateval = getSelectedState();
   var requiredInput = emptyRequiredField(); 
   var addrArr = jQuery(addrLineOne).val().split(",");
   var hasStateSelected = true;
   var getStateSelected = getAddressVal(stateval, addrArr[2]);
   if(getStateSelected === "" || getStateSelected === null || !getStateSelected){
        hasStateSelected = false;
        jQuery(stateIdOption +' p').show();
        if(jQuery(ssmCheckBox).length > 0 && !jQuery(ssmCheckBox).is(":checked")){
            hasStateSelected = true;
            jQuery(stateIdOption +' p').show();
        }
   }
    if (!jQuery(".a-input-field--text-error").is(":visible") &&
        !jQuery(".a-input-field--text-require").is(":visible") &&
        !jQuery(".a-input-field--text-regex").is(":visible") &&
        !jQuery("#emailExists .emailError").is(":visible") &&
        jQuery(".fields input:visible").val().length > 0 &&
        !progressError &&
        ((checkbox_present === true && jQuery("#spi-id-options .a-checkbox__input").is(":checked")) || checkbox_present === false) &&
        ((add_checkbox_present === true && jQuery("#additional-optin-options .a-checkbox__input").is(":checked")) || add_checkbox_present === false) &&
        hasStateSelected && !requiredInput
    ) {
        e.preventDefault();
        if(jQuery(ssmCheckBox).length > 0 && !jQuery(ssmCheckBox).is(":checked") && 
        window.localStorage.getItem("purchaser_type") !=="subscription_user") {
            ecomRegisterSubmit(e, isEnableKount);
        } else {
        let captchaTokenRegistration = await getCaptchaToken();
        formError.remove();
        jQuery('.invalid-feedback-display').remove();
        
        const gaType = gtmTag();
		ABBOTT.gtm.buildAndPush.formTracking(eventCategory, "click", gaType);
        var birthDate = new Date(datePickerVal.val());
        var currentDate = new Date();
        var childWeeks = Math.ceil(
            (currentDate - birthDate) / (7 * 24 * 60 * 60 * 1000)
        );
        var timneOffset = birthDate.getTimezoneOffset();
        birthDate = new Date(birthDate.getTime() - timneOffset * 60 * 1000);

        var queryString = new URLSearchParams(window.location.search);
        
        var checkWeeks = String(jQuery(`${preemieOptionAge} ${ulDropDownLi}.selected`).data('optionvalue'));
        var adoptd =  jQuery("#adopted-id-options input:checked").val();
        var digitalCouponOptIn = jQuery("#bonusOffer-options input:checked").val();
        var formData={
            autoLogin: shouldLogin,
            captchaValue: captchaTokenRegistration,
			captchaType: reCaptchaType,
            captchaAccountId : window.btoa(emailId.val()),
            captchaAction : "registration",
            userInfo: {
                userType: jQuery("#userType").val(),
                userName: emailId.val(),
                firstName: jQuery("#first-name").val(),
                lastName: jQuery("#last-name").val(),
                adult: true,
                unlockPamersClub: getBooleanValue(jQuery("#pampers-id-options input:checked").val()),
                offerNotification: jQuery("#offerNotification").val(),
                rememberMe: getBooleanValue(jQuery("#remember-id-options input:checked").val())
            },
            addresses: [{
                type: jQuery("#type").val(),
                zipCode: getAddressVal(jQzipCode.val(), addrArr[3]),
                city: getAddressVal(cityId.val(), addrArr[1]),
                state: getAddressVal(stateval, addrArr[2]),
                country: jQuery("#country").val(),
                lineOne: getAddressOption(addrArr),
                lineTwo: jQuery("#lineTwo").val()
            }],
            children: [{
                name: jQuery("#name").val(),
                birthDate: birthDate.toISOString(),
                gender: jQuery("#gender").val(),
                weeksEarly: getValueOrUnknown(checkWeeks),
                premature: getBooleanValue(checkWeeks),
                adopted: getBooleanValue(adoptd)  
            }],
            consents: [{
                type: getValueOrUnknown(jQuery("#consent-type").val()),
                approved: getBooleanValue(jQuery("#approved").val()),
                date: new Date().toLocaleDateString("fr-CA")
            }],
            offerPreferenceInfo: {
                enableDigital: false,
                product: productName
            },
            additionalProfileProperties: {
                campaign: getValueOrDefault(queryString.get("utm_campaign")),
                medium: getValueOrDefault(queryString.get("utm_medium")),
                content: getValueOrDefault(queryString.get("utm_content")),
                source: getValueOrDefault(queryString.get("utm_source")),
                term: getValueOrDefault(queryString.get("utm_term")),
                qrcode: getValueOrDefault(queryString.get("qr_code")),
            },
            address: { address: jQuery(addrLineOne).val()}
        };
		//Kount Payload
		if(isEnableKount){
			formData["riskSessionValue"] = kountSessionID;    
			formData["riskCheck"] = "true";
		}
		
		
        if(jQuery("#bonusOffer-options input").length){
            formData.children[0]['adopted'] =   null;
            formData.offerPreferenceInfo['digitalCouponOptIn'] = digitalCouponOptIn;
            if(digitalCouponOptIn === 'true'){
                formData = await setAutoDO(formData);
            }
        }
        //Auto enroll for ALIMENTUM & NEOSURE
        if((jQuery(formName).val().toUpperCase() === "ALIMENTUM" || 
        jQuery(formName).val().toUpperCase() === "NEOSURE" || 
        jQuery(formName).val().toUpperCase() === "DIGITALREWARDS") &&
        (childWeeks >= -39 && childWeeks <= 65)){
            formData = await setAutoDO(formData);
        }

        if(isChallengerForm && jQuery(inputPreemieChecked).val() === "earlier"){
            formData.children[0].premature = true;
            formData.children[0].weeksEarly = 32;
        }
        if(isChallengerForm && jQuery(inputPreemieChecked).val() === "later"){
            formData.children[0].premature = true;
            formData.children[0].weeksEarly = 33;
        }
        

        //check and set media tracking
        if(sessionStorage.getItem('MediaTracking') !== null){
            formData = await checkNUpdateUTM(formData);
        }

        //Set AutoDO for Target Micro website
        if(productName === "TARGET_MICRO_WEBSITE"){
            formData = await setAutoDO(formData);
        }

        //Fraud Prevention | Google Recaptcha Key update 
        formData["captchaAccountId"] = window.btoa(emailId.val());
        formData["captchaAction"] = "registration";

        // set DO opt in
        formData = await registerTypeAndDOEnabled(formData,childWeeks);

        //Submit registration based on phone number field 
        if(jQuery('#phone_number').length && jQuery('#phone_number').val().length > 9 ){
           var userContacts = [{
                        number: userPhoneNumber
                        }];
           var smsService = {
                        type: "SMS_Enrolment",
                        approved: true,
                        date: new Date().toLocaleDateString("fr-CA")
                    }
            formData.consents.push(smsService);
            formData.contacts = userContacts;
            userSMSConsent(decideRegistrationType, formData, childWeeks);
        }
        //Submit regisration if phone number field is present but not filled or phonenumber field is not present during A/B testing
        if(!jQuery('#phone_number').length || (jQuery('#phone_number').length && !jQuery('#phone_number').val().length)) {
            decideRegistrationType(formData, childWeeks);
        }
    }
    } else {
        registerErrorBlock();
    }
}

function emptyRequiredField(){
    var requiredField = false;
    jQuery(".a-input-field").each(function(index,item) {
        if(jQuery(item).find("input").is(":visible") && jQuery(item).data("required") == true && !jQuery(item).find("input").val()){
            requiredField = true;
        }
        
    });
    
    return requiredField;	
}

function registerErrorBlock(){
    var isStateSelected = getSelectedState();
    if(isStateSelected.length < 1 && jQuery("#state-id-options .a-dropdown__field").is(":visible")) {
        jQuery("#state-id-options p").show();
    }
    jQuery('.a-input-field .a-form-grp input').each(function(){
        if(jQuery(this).val().length < 1 && jQuery(this).is(":visible")){
           jQuery(this).parents('.a-form-grp').addClass('validation-require');
        }
    });
    if(!jQuery("#spi-id-options .a-checkbox__input").is(":checked")){
        jQuery("#spi-id-options").addClass("validation-require");
    }
    // Additional checkbox error if present
    if(additionalOptin.length && additionalOptin.is(":visible") && 
       !jQuery("#additional-optin-options .a-checkbox__input").is(":checked")){
        additionalOptin.addClass("validation-require");
    }
    jQuery(signUpButtonId).attr("disabled", "disabled");
    var scrollTopHeight = oFormContainer;
    if(jQuery('.checkbox--text-require').is(":visible")){
        scrollTopHeight = jQuery(oFormContainer).find(".checkbox--text-require:visible");
    }
    if(jQuery('#smsConsentDecline p').is("visible")){
        scrollTopHeight = jQuery(oFormContainer).find(".smsConsentDecline p");
    }
    if(jQuery('.radio--text-require').is(":visible")){
        scrollTopHeight = jQuery(oFormContainer).find(".radio--text-require:visible:first");
    }
    if(jQuery("#state-id-options p").is(":visible")){
        scrollTopHeight = jQuery(oFormContainer).find("#state-id-options");
    }
    if(jQuery(".a-input-field--text-regex").is(":visible")){
        scrollTopHeight = jQuery(oFormContainer).find('.a-input-field--text-regex:visible:first');
    }
    if(jQuery(".a-input-field--text-error").is(":visible")){
        scrollTopHeight = jQuery(oFormContainer).find('.a-input-field--text-error:visible:first');
    }
    if(jQuery(".a-input-field--text-require").is(":visible")){
        scrollTopHeight = jQuery(oFormContainer).find(".a-input-field--text-require:visible:first");
    }
    if(jQuery(".emailError").is(":visible")){
        scrollTopHeight = oFormContainer;
    }
    htmlBody.animate({
        scrollTop: jQuery(scrollTopHeight).offset().top - 50
    }, 2000);

    // Remove require from phone number and address line 
    jQuery('#phone_number').parents('.a-form-grp').removeClass('validation-require');
    jQuery('#lineTwo').parents('.a-form-grp').removeClass('validation-require');
    
}

async function checkNUpdateUTM(regFormData){
        regFormData.additionalProfileProperties.campaign =  mediaParam.utm_campaign !==null? mediaParam.utm_campaign:""; 
        regFormData.additionalProfileProperties.medium=  mediaParam.utm_medium !==null? mediaParam.utm_medium:"";
        regFormData.additionalProfileProperties.content = mediaParam.utm_content !==null? mediaParam.utm_content:"";
        regFormData.additionalProfileProperties.source =  mediaParam.utm_source !==null? mediaParam.utm_source:"";
        regFormData.additionalProfileProperties.term = mediaParam.utm_term !==null? mediaParam.utm_term:"";
        regFormData.additionalProfileProperties.qrcode = mediaParam.qr_code !==null? mediaParam.qr_code:"";
        if(setHCPpromo){
            regFormData.additionalProfileProperties.altPromoPage = "rewards";
        }
        if( mediaParam.utm_campaign && campaignList.includes(mediaParam.utm_campaign.toLowerCase())) {
            regFormData = await setAutoDO(regFormData);
        }

  return regFormData;
}


/*
Set DO optin for MOMCAREWMT campaign
@params {formObj} to update the DO property
*/
function setAutoDO(formObj) {
    formObj.offerPreferenceInfo.enableDigital = true;
    formObj.offerPreferenceInfo.retailer = "TBUNIVERSAL";
    formObj.offerPreferenceInfo.channel = "website";

    return formObj
}

function decideRegistrationType(usrfrmData,w){
    if(!jQuery(".a-input-field--text-require").is(":visible") &&
        !jQuery('.radio--text-require').is(":visible") &&
        !jQuery("#state-id-options p").is(":visible")
        ){
        var checkEcom = checkLoggedInUser(similacEcom);
        if(checkEcom && window.localStorage.getItem("purchaser_type") === "subscription_user"){
            var ecomToSSMForm = convertEcomToSSM();
                ecomToSSMForm.addresses = usrfrmData.addresses;
                ecomToSSMForm.children = usrfrmData.children;
                ecomToSSMForm.offerPreferenceInfo = usrfrmData.offerPreferenceInfo;
                updateEcomToSSM(ecomToSSMForm);
        } else {
            submitRegistrationData(usrfrmData, w);
        }
    } else{
        registerErrorBlock()
    }
}

function registerTypeAndDOEnabled(formObj,weeks){
    if (weeks >= -39 && weeks <= 65 && 
        window.sessionStorage.getItem("oasisEmail") !== null && 
        window.sessionStorage.getItem("oasisEmail") !== undefined ) {
        formObj.offerPreferenceInfo.enableDigital = true;
        formObj.offerPreferenceInfo.retailer = "TBUNIVERSAL";
        formObj.offerPreferenceInfo.channel = "website";
    }
    if(window.localStorage.getItem('registraionForm___API')){
        formObj.userInfo.anieProfileId = jQuery('#anieProfileId').val();
    }
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && isMicroSite){
        formObj.offerPreferenceInfo.product = jQuery(formName).val() + '_MOBILE';
    }
    if(window.sessionStorage.getItem('loginProvider')){
        formObj.userInfo.uid = window.sessionStorage.getItem('socialUid');
        formObj.userInfo.registrationToken = window.sessionStorage.getItem('socialToken');
    } else {
        formObj.userInfo.password = jQuery("#password").val();
    }
    return formObj;
}

function getSelectedState(){
  return  jQuery(`${stateIdOption} ${ulDropDownLi}`).hasClass("selected") ?
            jQuery(`${stateIdOption} ${ulDropDownLi}.selected`).data('optionvalue').trim()
            : "";
}

function getValueOrDefault(paramVal) {
    return paramVal === null ? "" : paramVal;
}

function getValueOrUnknown(paramVal) {
    if(paramVal === undefined || paramVal === null || paramVal === ""){
        return "Unknown";
    }
    return paramVal;
}

function getBooleanValue(paramVal) {
    if(paramVal === undefined || paramVal === null || paramVal === "undefined"){
        return false;
    }
    return true;
}

function getAddressVal(paramVal, googleVal = "") {
    return paramVal ? paramVal.trim() : googleVal.trim();
}

function getAddressOption(addr){
   return addr.length > 1 ? addr[0] : jQuery(addrLineOne).val();
}


function submitGTMTracking(totalWeeks){
    let gaType = "";
    let gtmWeeks, absWeeks;
    gaType = eventType + "_submit";
    if(window.sessionStorage.getItem('loginProvider')){
        gaType = "social-registration_submit_" + window.sessionStorage.getItem('loginProvider');
      }
      ABBOTT.gtm.buildAndPush.formTracking(eventCategory, "submit", gaType);
      if (totalWeeks >= 0) {
          absWeeks = Math.abs(totalWeeks);
          gtmWeeks = "plus-" + absWeeks;
      } else {
          absWeeks = Math.abs(totalWeeks);
          gtmWeeks = "minus-" + absWeeks;
      }
      ABBOTT.gtm.buildAndPush.formTracking(
          eventCategory,
          "submit",
          gaType+'_weeks-to-birth_'+gtmWeeks
        );

}

function ajaxCommonProperty(formJsonData, apiURL){
    return {
        url: apiURL,
        method: "POST",
        headers: {
            "content-type": appJson,
            "x-country-code": "US",
            "x-application-id": "similac",
            "x-preferred-language": "en-US"
        },
        data: formJsonData,
        dataType: "json",
        async: true,
        beforeSend: function() {
            overlayLoader.show();
        }
    }
}
function updateProfileCookie(results,oasisEmail) {
    const lc = ABBOTT.cookie("profile");
          var lp = JSON.parse(lc);

          let sortedChildren = [];
          let youngChild, childWeeks;
          if (results.response.children) {
            sortedChildren = results.response.children
              ?.sort(({ birthDate: b1 = "" }, { birthDate: b2 = "" }) => {
                return new Date(b1) - new Date(b2);
              })
              .filter(({ deleted = false }) => !deleted);

            if (sortedChildren.length) {
              youngChild = sortedChildren[sortedChildren.length - 1];
            }
          }
          if (youngChild) {
            
            var birthDateNew = new Date(datePickerVal.val());
        var currentDate = new Date();
        childWeeks = Math.trunc(
            (currentDate - birthDateNew) / (7 * 24 * 60 * 60 * 1000)
        );
        var timneOffset = birthDateNew.getTimezoneOffset();
        birthDateNew = new Date(birthDateNew.getTime() - timneOffset * 60 * 1000);
            lp.dob = birthDateNew;
            lp.weeks = childWeeks;
          }
          ABBOTT.removeCookie("profile");
          const cookieConfig = {
            path: "/",
            domain: domainName,
            secure:true,
            HttpOnly:true
          };
          ABBOTT.cookie("profile", JSON.stringify(lp), cookieConfig);
         
          const {
            lineOne = "",
            lineTwo = "",
            country = "",
            city = "",
            state = "",
            zipCode = ""
          } =
            results.response.addresses &&
            results.response.addresses.length > 0 &&
            results.response.addresses[0];
            ABBOTT.cookie("profile", JSON.stringify(
              {...lp, lineOne, lineTwo, country, city, state, zipCode}
              ), cookieConfig);
              callRedirectDecision(oasisEmail);
  }

  function ajaxCommonPropertyGetProfile(apiURL) {
    return {
      url: apiURL,
      method: "GET",
      headers: {
        "content-type": appJson,
        "x-country-code": "US",
        "x-application-id": "similac",
        "x-preferred-language": "en-US",
        "x-id-token": ABBOTT.utils.getSessionInfo()
      },
      async: true,
      beforeSend: function() {
        overlayLoader.show();
      }
    };
  }

function submitRegistrationData(data, totalWeeks) {
    const formJsonData = JSON.stringify(data);
    const commonAjaxProps = ajaxCommonProperty(formJsonData, document.getElementById("register-user").value);
    jQuery.ajax({
       ...commonAjaxProps,
        success: function(results) {
            const { errorCode, response, status } = results;
            if (status && errorCode === 0) {
				// check Kount validation
				if(response.i18nMessageKey && response.i18nMessageKey.includes('RISK')){
					// Track KOUNT error
                    errorGASubmitData(errorCode, response);
                    const getErrorText = getMessageForReg(response.i18nMessageKey);
					jQuery(oFormContainer).prepend(`<p class="invalid-feedback-display similac-error-group" id="form-error"> ${getErrorText} </p>`);
					var kountFormError = jQuery("#form-error");
                    kountFormError.show();
                    if(jQuery('#about_you').length){
                        jQuery('#container-register-global '+oFormContainer+' #form-error').hide();
                    }
					overlayLoader.hide();
					htmlBody.animate({
						scrollTop: kountFormError.offset().top - jQuery('.reversible-cart-block').height()
					}, 2000);
					
					return false;
				}
                //this variable is used for Samples page only
                var oasisEmail = window.sessionStorage.getItem("oasisEmail");
               //Call GTM
                submitGTMTracking(totalWeeks);
                //Execute Get profile call
                if(jQuery(formName).val().toLowerCase() === 'microsite'){
                    window.location.href = welcomePage;
                }
                if(jQuery(formName).val().toLowerCase() !== 'microsite'){
                const {
                    userInfo: {
                        firstName = "",
                        lastName = "",
                        address = "",
                        city = "",
                        country = "",
                        userName: email = "",
                        state = "",
                        zip = "",
                        uid: UID = "",
                        idToken = "",
                        userType = "",
                        userSubType = "",
                        dob = "",
                        weeks = "",
                        contactEmail = ""
                    } = {}
                } = response;
                const cookieConfig = {
                    path: "/",
                    domain: domainName,
                    secure:true,
                    HttpOnly:true
                };
                ABBOTT.cookie(
                    "profile",
                    JSON.stringify({firstName,lastName,address,city,country,email,state,zip,UID,idToken,userType,userSubType,dob,weeks,contactEmail}),
                    cookieConfig
                );
                const commonAjaxPropsGetProfile = ajaxCommonPropertyGetProfile(
                    document.getElementById("profile-info").value
                  );
                 jQuery.ajax({
                  ...commonAjaxPropsGetProfile,
                  success: function(results1) {
                    if (results1.status && results1.errorCode === 0) {
                        updateProfileCookie(results1,oasisEmail);
                      
                    }
                  }
                });
                //set oasis cookie if exist
                if (!ABBOTT.cookie(xIdToken)) {
                    ABBOTT.cookie(xIdToken, idToken, cookieConfig);
                    clearSocialProvider();
                }
                window.sessionStorage.removeItem('MediaTracking');
                window.localStorage.removeItem('registraionForm___API');
            }

            } else {
                overlayLoader.hide();
                //track captcha error code
                if(errorCode === "AUTH-1005"){
					let gaType = "";
					gaType = eventType+"_invalid-captcha-error"
					ABBOTT.gtm.buildAndPush.formTracking(eventCategory, "submit", gaType);
				}
                const errorText= formSubmitAPIError(errorCode, response);
                jQuery(oFormContainer).prepend(`<p class="invalid-feedback-display similac-error-group" id="form-error"> ${errorText} </p>`);
                formError = jQuery("#form-error");
                formError.show()
                htmlBody.animate({
                    scrollTop: formError.offset().top - jQuery('.reversible-cart-block').height()
                }, 2000);
                errorGASubmitData(errorCode, response);
                clearSocialProvider();
            }
        }
    });
}
// Track form submit error
function errorGASubmitData(errCode, res){
    ABBOTT.gtm.buildAndPush.formTracking(
        eventCategory,
        "error",
        `registration_oops-error-message_errocode-${errCode}_reason-${res.statusReason}`
      );
}

function clearSocialProvider(){
    window.sessionStorage.removeItem('loginProvider');
    window.sessionStorage.removeItem('socialUid');
    window.sessionStorage.removeItem('socialToken');
    window.sessionStorage.removeItem('socialRegister');
}

function callRedirectDecision(oEmail){
    clearSocialProvider();
    if(oEmail && oEmail.trim().length > 0) {
        setOasisCookie(oEmail);
        profileUpdate();
    }
    //Challenger Form redirect
    if (!isFutureBirthDate()) {
        challengerFormRedirectPreSelect();
    } 
    challengerFormRedirect();
    
    if(jQuery(formName).val().toLowerCase() === 'alimentum'){
        window.location.href = welcomePage;
    }
    if(jQuery(formName).val().toLowerCase() === 'microsite'){
        window.location.href = welcomePage;
    }
    if(jQuery(formName).val().toLowerCase() === 'digitalrewards'){
        window.location.href = welcomePage;
    }
    if(jQuery(formName).val().toLowerCase() === 'neosure' && jQuery(inputPreemieChecked).val() !== "earlier"){
        window.location.href = jQuery('#coreWelcomePage').val();
    }
    if(jQuery(formName).val().toLowerCase() === 'neosure' && jQuery(inputPreemieChecked).val() === "earlier"){
        window.location.href = welcomePage;
    }
    if (jQuery(inputPreemieChecked).val() === "earlier" && oEmail === null && jQuery(formName).val().toLowerCase() === 'strongmoms') {
        window.sessionStorage.setItem("isNeosurePage",true);   
        window.location.href = neosureWelcomePage;
    }
    if (jQuery(inputPreemieChecked).val() !== "earlier" && oEmail === null && jQuery(formName).val().toLowerCase() === 'strongmoms') {
            window.location.href = welcomePage;
    }    
    if (jQuery(ecomUserRedirect).val() !== undefined && jQuery(formName).val().toLowerCase() === 'ecomregister') {
        window.localStorage.removeItem('purchaser_type');
        window.location.href = jQuery(ecomUserRedirect).val();
    }
}

//Challenger Form Redirection Logic
function challengerFormRedirect(){
    if(isChallengerForm && jQuery('#productName-options').find('input[name="product-name"]').is(":checked")){
       productName =  jQuery('#productName-options').find('input[name="product-name"]:checked').val();
       window.sessionStorage.setItem('isChallengerForm', true);
        if(productName.toLowerCase() === "neosure"){
            window.sessionStorage.setItem("isNeosurePage",true);
            window.location.href = neosureWelcomePage;
        }
        else if(productName.toLowerCase() === "alimentum"){
            window.location.href = aliementumWelcomePage;
        } else{
            window.location.href = welcomePage;
        }
    }
}

//Challenger Form Redirection Logic for Preselected options
function challengerFormRedirectPreSelect() {
    let rewardURLstrNew = new URLSearchParams(window.location.search);
    let campaignValueStr = rewardURLstrNew.get("utm_campaign");
    if (campaignValueStr == 'sim-alimentum-hcp' || campaignValueStr == 'sim-neosure-hcp') {
        let productNameChecked = jQuery('#productName-options').find('input[name="product-name"]:checked').val();
        if (productNameChecked.toLowerCase() === "neosure") {
            welcomePage = neosureWelcomePage;
        }
        if (productNameChecked.toLowerCase() === "alimentum") {
            welcomePage = aliementumWelcomePage;
        }
    }
}

function removeDisableForm() {
    setTimeout(function() {
        if (!jQuery(".a-input-field--text-error").is(":visible") &&
            !jQuery(".a-input-field--text-require").is(":visible") &&
            !jQuery(".a-input-field--text-regex").is(":visible")
        ) {
            jQuery(signUpButtonId).removeAttr("disabled");
        }
        else {
            jQuery(signUpButtonId).attr("disabled", "disabled");
        }
    }, 100);
}


jQuery(document).on('click','.social-icons-list li a', function(e){
    var url = jQuery(this).attr('href');
e.preventDefault();
swal({
    title: swalTitleText.val(),
    text: swalMessageText.val(),
    type: "warning",
    className: "similac-modal",
    buttons: {
        confirm: {
          text: "OK",
          value: true,
          visible: true,
          className: "",
          closeModal: true
        },
        cancel: {
          text: "Cancel",
          value: false,
          visible: true,
          className: "",
          closeModal: true,
        }
      }
  }).then(function(isConfirm) {
    if (isConfirm) {
        window.open(url, '_blank');
      }
});

});

var getMessage = (errorCode, errorCodeInfo = []) => {
    return errorCodeInfo.find((item) => (item.errorCode.toString().trim() === String(errorCode).toString()));
}

var getMessageForReg = (errorCode) => {
    const {errorCodeInfo=[]} = (window.errorCodeData || {});
    const mess = getMessage(errorCode,errorCodeInfo);
    if(mess){
        const {errorMessage} = mess;
        return errorMessage;
    }
    else{
        return "";
    }
};

function formSubmitAPIError(errCode, response){
    let errDataValue = "";
    const errorCode = errCode;
    if (errorCode === 500) {
        errDataValue = getMessageForReg("GEN_ERR");
      } else if (errorCode === 400) {
        if (response.i18nMessageKey) {
            errDataValue = getMessageForReg(response.i18nMessageKey);
        } else {
            errDataValue = getMessageForReg(errorCode);
        }
      } else if (errorCode === 403) {
        errDataValue = getMessageForReg(errorCode);
      } else {
        errDataValue = getMessageForReg("GEN_ERR");
      }
     
    return errDataValue;  
}
function errorHandle(){
    var emailRegex = validateEmailPattern();
    if(jQuery('#email_id').val().length > 0 && !emailRegex.test(jQuery('#email_id').val())){
        jQuery(emailError).hide();
    }
}

function validateEmailPattern(){
    var emailRegexString = jQuery('#email_id').attr('data-regex');
    var emailPatternStr = emailRegexString.substring(1, emailRegexString.length-1);
    return new RegExp(emailPatternStr);
}
//adding class on pageload
function floatFieldwithValue(){
    if (jQuery.trim(emailId.val()).length > 0 && !isChallengerForm) {
        emailId
            .parents(formGroupClass)
            .find(formLabel)
            .addClass(floatingLabelClass);
    }
    if (jQuery.trim(jQuery("#password").val()).length > 0 && !isChallengerForm) {
        jQuery('#password')
            .parents(formGroupClass)
            .find(formLabel)
            .addClass(floatingLabelClass);
    }
}
/* function to validate date format mm/dd/yyyy
@param {dateString}
@return boolean
*/
function validateDateFormat(dateString){
     // Get Regex string and convert to Regex object   
    var dateFormatStr4 = jQuery('#datePattern').val(); //Pattern to check YYYY
    var dateFormatStr2 = jQuery('#datePattern2').val(); //Pattern to check YY
    var datePattern4 = dateFormatStr4.substring(1, dateFormatStr4.length-1);
    var dateRegex4 =  new RegExp(datePattern4);

    var datePattern2 = dateFormatStr2.substring(1, dateFormatStr2.length-1);
    var dateRegex2 =  new RegExp(datePattern2);

    // check date format with regular expression      
    if(dateString.match(dateRegex4) || dateString.match(dateRegex2) ){      
        var operator = dateString.split('/');      
        //Split day,month and year
        var month= parseInt(operator[0]);      
        var day = parseInt(operator[1]);      
        var year = parseInt(operator[2]);      
                
        // Create array list of days of a month      
        var monthDays = [31,28,31,30,31,30,31,31,30,31,30,31];      
        if (month==1 || month>2){      
            if (day>monthDays[month-1]){      
                //Check if the date is not out of its range      
                return false;      
            }      
        }else if (month==2){      
            var leapYear = false;      
            if ( (!(year % 4) && year % 100) || !(year % 400)) {      
                leapYear = true;      
            }      
            if ((leapYear == false) && (day>=29) || ((leapYear==true) && (day>29))){      
                return false;      
            }  
        }      
    }else{   
        return false;      
    }      
    return true;        
}

function userSMSConsent(usrFunction, arg1, arg2){
    var myHtml = document.createElement("div");
    jQuery(myHtml).addClass('smsConsentBox').html(jQuery('#smsConsentText p').html());
    swal({
        title: swalTitleText.val(),
        content: myHtml,
        type: "warning",
        className: "similac-modal",
        buttons: {
            confirm: {
              text: "I Agree",
              value: true,
              visible: true,
              className: "",
              closeModal: true
            },
            cancel: {
              text: "I do not Agree",
              value: false,
              visible: true,
              className: "",
              closeModal: true,
            }
          }
      }).then(function(isConfirm) {
		  if(isConfirm){
            usrFunction(arg1, arg2);
            jQuery('#phone_number').removeClass('consent-error');
            jQuery('#smsConsentDecline p').hide();
          } else{
            jQuery('#phone_number').addClass('consent-error')
            .parent('.input-group')
            .siblings('span.a-input-field--text-help').hide();
            jQuery('#smsConsentDecline p').show();
            jQuery(signUpButtonId).attr("disabled", "disabled");
          }
    });
}

//Phone number format
var phoneNumericStr =  jQuery('#phoneNumeric').length ? jQuery('#phoneNumeric').val() : ""; // get the pattern from authoring 
var phoneNumericPattern = phoneNumericStr.substring(1, phoneNumericStr.length-1);
var phoneNumericRegx = new RegExp(phoneNumericPattern,  "g"); // create regex object 
var phoneDigitOnly =  new RegExp('^\\d+$');
jQuery(document).on('blur',"#phone_number",function() {
    var phonePatternStr =  jQuery('#phonePattern').val();
    var phonePattern = phonePatternStr.substring(1, phonePatternStr.length-1);
    var phonePatternRegx = new RegExp(phonePattern);
    jQuery(this).val(jQuery(this).val().replace(phonePatternRegx, "$1-$2-$3"));
    userPhoneNumber = jQuery("#phone_number").val().replace(phoneNumericRegx, ''); 
	if(userPhoneNumber.length > 9 && phoneDigitOnly.test(userPhoneNumber) || !jQuery("#phone_number").val().length){
		jQuery("#phone_number").parents('.a-form-grp').find('.a-input-field--text-error').hide();
	} else {
		jQuery("#phone_number").parents('.a-form-grp').find('.a-input-field--text-error').show().css({display :'block', color:'red'});
	}

});

jQuery(document).on('keyup',"#phone_number",function() {
    userPhoneNumber = jQuery("#phone_number").val().replace(phoneNumericRegx, '');
    if((phoneDigitOnly.test(jQuery(this).val()) && userPhoneNumber.length > 9) || !jQuery(this).val().length){
        jQuery(this).removeClass('consent-error');
        jQuery(this).parents('.a-form-grp').removeClass('validation-require');
        jQuery(this).parents('.a-form-grp').find('.a-input-field--text-error').hide();
    } 
    else {
        jQuery(this).addClass('consent-error');
        jQuery(this).parents('.a-form-grp').addClass('validation-require');
        jQuery(this).parents('.a-form-grp').find('.a-input-field--text-error').show().css({display:'block',color:'red'});
    }
    jQuery('#smsConsentDecline p').hide();
    jQuery('#phone_number').parent('.input-group')
                .siblings('span.a-input-field--text-help').show();
                removeDisableForm();
});

jQuery(document).on('keydown','#phone_number', function(){
	jQuery(this).val(jQuery(this).val().replace(phoneNumericRegx, ''));
});


document.addEventListener("DOMContentLoaded",function(){
    var checkCount = 0;
    var checkAutoFill = setInterval(function(){
        if(jQuery('#password').length && jQuery('#password').css('background-color') === "rgb(232, 240, 254)"){
            emailId
                .parents(formGroupClass)
                .find(formLabel)
                .addClass(floatingLabelClass);
            jQuery('#password')
                .parents(formGroupClass)
                .find(formLabel)
                .addClass(floatingLabelClass);
            clearInterval(checkAutoFill);
        }
        checkCount++;
        if(checkCount > 20){
            clearInterval(checkAutoFill);
        }    
    },500);
});


// Set SMS consent box alignment
jQuery("#button-id").click(function(e){
    e.preventDefault();
    setTimeout(function(){
    if(jQuery(".smsConsentBox").length >=1){
        jQuery(".smsConsentBox").addClass("text-left");
      }
     }, 1000);
});

//Handle WA/NV opt in
function handleAdditionalOptIn(stateValue = ""){
    if(additionalOptin.length){
        //remove whitespace and make it uppercase before compairing
        stateValue = stateValue.trim(); 
        if(stateValue.toUpperCase() === "WA" || stateValue.toUpperCase() === "NV") {
            additionalOptin.show(); 
            additionalOptin.find('input[type="checkbox"]').attr(dataRequired, true);
        } else {
            // This block should hide and set required false in future as per coming update
            additionalOptin.show();
        }
    }
}

function selectFalseValueDoOffer(){
    if (jQuery("#bonusOffer-options input[name=bonusOffer]:checked").val() === 'false' && !sessionStorage.getItem('birthdayWeekNegative')) {
        jQuery("#bonusOffer-options input[name=bonusOffer][value=false]").prop("checked", true);
    } else {
        jQuery("#bonusOffer-options input[name=bonusOffer][value=true]").prop("checked", true);
    }
    sessionStorage.removeItem('birthdayWeekNegative');
}
