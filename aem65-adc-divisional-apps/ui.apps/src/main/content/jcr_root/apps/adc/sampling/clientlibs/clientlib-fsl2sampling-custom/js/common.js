/**
 * Site Common Js
 **/

$(document).ready(function () {

    //input selector for All wizard fields
    const inputselector = 'input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([readonly]), textarea, [data-js-component="form-dropdown"]';

    //input trigger to enable/disble wizard next button
    $(inputselector).on('change', function (e) {
        var thisForm = $(this).closest('form');
        var btnSubmit = thisForm.siblings('.o-form-container__buttons').find('button[type="submit"]');

        //all wizard next buttons
        var wizNextBtn = thisForm.closest('fieldset.o-wizard__content').find('.o-wizard__btn .button-div:not(.o-wizard__btn--back) .btn:not([type="submit"])');

        //wizard submit button
        var wizSubmitBtn = thisForm.closest('fieldset.o-wizard__content').find('.o-wizard__btn .button-div:not(.o-wizard__btn--back) .btn[type="submit"]');

        //all formcontainer submit buttons
        var btnSubmitAll = $(this).closest('.o-wizard__container').find('.o-form-container__buttons button[type="submit"]');


        //show/hide others input field for radio option others
        if ($(this).attr('type') === "radio") {
            if ($(this).val().trim() === 'others') {
                showHideOthersField($(this), true);
            } else {
                showHideOthersField($(this), false);
            }
        }

        setTimeout(function () {
            var btnState = btnSubmit.prop('disabled'); //check the disable status of internal form-conatiner within wizard fieldset

            //if the submit button is enabled/disabled than enabled/disabled the wizard next button resp.
            wizNextBtn.prop('disabled', btnState);

            var btnStateAll = true; //check the disable status of all the submit buttons of internal form-conatiner within wizard fieldset
            btnSubmitAll.each(function() {
                if ($(this).prop('disabled')) {
                    btnStateAll = false;
                }
            });

            //if all the submit buttons are enabled/disabled than enabled/disabled the wizard next button resp.
            wizSubmitBtn.prop('disabled', !btnStateAll);


        }, 500);

    });

    //datepicker change event code
    $('.a-date-picker .a-input-control').on('keyup',function(){
        $(this).trigger('change');
    });


    //wizard scroll to top.
    $('.o-wizard fieldset.o-wizard__content .o-wizard__btn .button-div .btn:not([type="submit"])').on('click', function () {
        var wizID = $(this).closest('[data-js-component="wizard"]').attr('id');
        setTimeout(function () {
            focusAnimateToId(wizID);
        }, 500);
    });

    //form hide all errors on click of submit button
    $('.formcontainer button[type="submit"]').on('click', function () {
        //hide all errors
        $('#apierror, #apierror_400').hide();
    });

});


//function to show/hide input field for radio option selected as "others"
function showHideOthersField(rfield, show) {
    //get the id of radio field and split by hyphen(-) to get the key
    let rfieldId = rfield.closest('fieldset.radio').attr('id');
    let rfieldIdArr = rfieldId.split('-');
    let rfieldKey = '#' + rfieldIdArr[0] + '-others'; //id of next input field

    let nextField = $(rfieldKey).closest('.a-input-field'); //next input field
    if (show) {
        nextField.css('display', 'block');
    } else {
        nextField.hide();
    }
}

//showHide Api Errors
function showHideApiError(error) {
	console.log("in show hide api error");

    let errorCode = error.errorCode;

    let i18nKey, i18KeyEle;
	let additionalProps, userType ;
    if(error.response) {
        i18nKey = error.response.i18nMessageKey ? error.response.i18nMessageKey : "";

		if(error.response.additionalProperties){
			additionalProps = error.response.additionalProperties ;
			userType = error.response.additionalProperties.userType ;
			console.log("additionalProps is : " + additionalProps);
			console.log("userType is : " + userType);
		}

		if(userType) {
				i18nKey = i18nKey + "-" + userType ;
				console.log("errorId : i18nKey  is : " + i18nKey);
			}

    } else {
        i18nKey = "";
    }

	console.log("errorCode is " + errorCode);
	console.log("i18nKey is " + i18nKey);


    i18KeyEle = (i18nKey !== "" && $('#'+i18nKey).length > 0) ? true : false;

	console.log("i18KeyEle is " + i18KeyEle);

    $('#page-spinner').hide();


    if(errorCode === 400 && i18nKey !== "" && i18KeyEle) {
        //hide error500 modal
        $('#btnModalError500-modal').hide();
        $('#btnModalError500-modal .generic-modal--close').trigger('click');

        //show matched 400 error
        $('#apierror .text .cmp-text, #apierror_400 .text .cmp-text').hide();
		$('#'+i18nKey).css('display', 'block');

        $('#apierror, #apierror_400').css('display', 'block');

    } else {
        //hide all errors
        $('#apierror, #apierror_400').hide();

        //show error500 modal
        $('#redirect-buttons #btnModalError500').parent('.m-popup').trigger('click');
    }
}


//function to check the cookies on each page
function checkCookie(page) {

    //get all the href values of redirect buttons
    var accessCodeCheckPage = $('#redirect-buttons #btnAccessCodeCheckPage').attr('href');
    var questionnairePage = $('#redirect-buttons #acsBtnQuestionnairePage').attr('href');
    var userRegistrationPage = $('#redirect-buttons #acsBtnRegistrationPage').attr('href');
    var userLoginPage = $('#redirect-buttons #btnLoginPage').attr('href');

    //check accessCode
    var accessCode = getCookie('accessCode');

    //check accessCodeStatus
    var acsState;
    var acsCodeStatus = getCookie('accessCodeStatus');
    if(acsCodeStatus !== "") {
        acsCodeStatus = JSON.parse(acsCodeStatus);
        acsState = acsCodeStatus.statusReason;
    }

    //check jwtToken
    var jwtToken = getCookie('jwtToken');

    switch(page) {
        case "access-code" :
            if (accessCode === "" || acsState === "" || acsState === undefined || acsState === "Redeemed" || acsState === "InvalidAccessCode") {
                window.location.pathname = accessCodeCheckPage;
            }
            else if (accessCode && accessCode!="") {
                window.location.pathname = questionnairePage;
            }
            break;
        case "questionnaire" :
            if (accessCode === "" || accessCode===null ) {
                window.location.pathname = accessCodeCheckPage;
            } else if (accessCode !== "" && acsState !== "" && acsState !== undefined && acsState !== "Redeemed" && acsState !== "InvalidAccessCode" && acsState === "ProductSelected") {
                window.location.pathname = userRegistrationPage;
            }
            break;
        case "user-registration" :
           if (accessCode===null || accessCode === "") {
                window.location.pathname = accessCodeCheckPage;
           } else if (accessCode !== "" && acsState !== "" && acsState !== undefined && acsState !== "Redeemed" && acsState !== "InvalidAccessCode" && acsState === "ConsentSigned") {
               window.location.pathname = questionnairePage;
           }
            break;
        case "user-login" :
            //user-login condition check not used
            if (accessCode === "" || accessCode === null) {
                window.location.pathname = accessCodeCheckPage;
            }
            break;
        case "order-confirm" :
            if(jwtToken === "") {
                window.location.href = window.location.origin + userLoginPage;
            }
            break;
    }

}

//focus animate to id
function focusAnimateToId(id) {
    var headerHeight = $(".abbott-wrapper .header .o-header__sticky-section").height();
    var targetElement = $('#'+id);
    if (targetElement != undefined) {
        $('html, body').animate({
            'scrollTop': targetElement.offset().top - headerHeight - 30 //30 is the extra margin-top
        }, 300);
    }
}
