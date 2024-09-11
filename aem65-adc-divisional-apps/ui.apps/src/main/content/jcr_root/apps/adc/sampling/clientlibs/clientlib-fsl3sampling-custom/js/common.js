/**
 * Site Common Js
**/

$(document).ready(function () {

    if (!document.querySelector("#ent_captcha") && $('body').attr('data-enable-enterprise-recaptcha') === 'true') {
        const script = document.createElement('script');
        script.src = $('body').attr('data-captcha-script-src');
        script.async = true;
        script.defer = true;
        script.id = "ent_captcha";
        document.head.appendChild(script);
	}

    //input selector for All wizard fields
    const inputselector = 'input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([readonly]), textarea, [data-js-component="form-dropdown"]';

    //input trigger to enable/disble wizard next button
    $(inputselector).on('change', function (e) {
        let thisForm = $(this).closest('form');
        let btnSubmit = thisForm.siblings('.o-form-container__buttons').find('button[type="submit"]');

        //all wizard next buttons
        let wizNextBtn = thisForm.closest('fieldset.o-wizard__content').find('.o-wizard__btn .button-div:not(.o-wizard__btn--back) .btn:not([type="submit"])');

        //wizard submit button
        let wizSubmitBtn = thisForm.closest('fieldset.o-wizard__content').find('.o-wizard__btn .button-div:not(.o-wizard__btn--back) .btn[type="submit"]');

        //all formcontainer submit buttons
        let btnSubmitAll = $(this).closest('.o-wizard__container').find('.o-form-container__buttons button[type="submit"]');


        //show/hide others input field for radio option others
        if ($(this).attr('type') == "radio") {
            if (($(this).val().trim()).indexOf('others') > -1) {
                showHideOthersField($(this), true);
            } else {
                showHideOthersField($(this), false);
            }
        }

        setTimeout(function () {
            let btnState = btnSubmit.prop('disabled'); //check the disable status of internal form-conatiner within wizard fieldset

            //if the submit button is enabled/disabled than enabled/disabled the wizard next button resp.
            wizNextBtn.prop('disabled', btnState);

            let btnStateAll = true; //check the disable status of all the submit buttons of internal form-conatiner within wizard fieldset
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
        setTimeout(function () {
            scrollToTop();
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

    let errorCode = error.errorCode;

    let i18nKey, i18KeyEle;
    if(error.response) {
        i18nKey = error.response.i18nMessageKey ? error.response.i18nMessageKey : ""
    } else {
        i18nKey = "";
    }

    i18KeyEle = (i18nKey !== "" && $('#'+i18nKey).length > 0) ? true : false;

    $('#page-spinner').hide();

    if(errorCode == 400 && i18nKey !== "" && i18KeyEle) {
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
    let questionnairePage = $('#redirect-buttons #acsBtnQuestionnairePage').attr('href');
    let userRegistrationPage = $('#redirect-buttons #acsBtnRegistrationPage').attr('href');
    let userLoginPage = $('#redirect-buttons #btnLoginPage').attr('href');

  //check accessCode
  let accessCode = getCookie('accessCode');

  //check accessCodeStatus
  let acsState;
  let acsCodeStatus = getCookie('accessCodeStatus');
  if(acsCodeStatus !== "") {
    acsCodeStatus = JSON.parse(acsCodeStatus);
    acsState = acsCodeStatus.statusReason;
  }

  //check jwtToken
  let jwtToken = getCookie('jwtToken');

  switch(page) {
    case "questionnaire" :
     if (accessCode !== "" && acsState !== "" && acsState !== undefined && acsState !== "Redeemed" && acsState !== "InvalidAccessCode" && acsState === "ProductSelected") {
        window.location.pathname = userRegistrationPage;
      }
      break;
    case "user-registration" :
   if ((accessCode == "" || acsState == "" || acsState == undefined || acsState == "Redeemed" || acsState == "InvalidAccessCode")||(accessCode !== "" && acsState && acsState !== "Redeemed" && acsState !== "InvalidAccessCode" && acsState !== "QuestionnaireCompleted")) {
     window.location.pathname = questionnairePage;
   }
      break;
    case "user-login" :
      if ((accessCode == "" || acsState == "" || acsState == "Redeemed" || acsState == "InvalidAccessCode")||(accessCode !== "" && acsState !== "" && acsState !== undefined && acsState !== "Redeemed" && acsState !== "InvalidAccessCode" && acsState !== "QuestionnaireCompleted")) {
        window.location.pathname = questionnairePage;
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
    let headerHeight = $(".abbott-wrapper .header .o-header__sticky-section").height();
    let targetElement = $('#'+id);
    if (targetElement != undefined) {
        $('html, body').animate({
            'scrollTop': targetElement.offset().top - headerHeight - 30 //30 is the extra margin-top
        }, 300);
    }
}

//scroll to top
function scrollToTop() {
    $('html, body').animate({
        scrollTop: 0
    }, 300);
}


/**
 * @function
 * @desc function isValidDate to validate the proper date
 * @param {String} date 'dd-mm-yyyy' {or any other sperator from below option}
 * @param {String} seperator ['/' or '.' or '-']
 * @param {String} allowdates ['past' or 'future' or '']
 * @param {String} format
 * @returns true or false
 */
function isValidDate(date, seperator, format, allowdates) {

    //parse date from the input string
    let dateArr = date.split(seperator);
    let {dd, mm, yy} = parseDate(dateArr, format, seperator); 
    let isValidDateFormat = validDateFormat(dd, mm, yy);
    if(isValidDateFormat){
        return  checkAllowedDates(dd, mm, yy, allowdates);
    } else {
        return false;
    }
}
function parseDate(dateArr, format, seperator) {

    let dd, mm, yy;
    let dateformate1 = 'dd' + seperator + 'mm' + seperator + 'yyyy';
    let dateformate2 = 'mm' + seperator + 'dd' + seperator + 'yyyy';
    let dateformate3 = 'yyyy' + seperator + 'mm' + seperator + 'dd';
    let dateformate4 = 'yyyy' + seperator + 'dd' + seperator + 'mm';

    switch (format) { // match the format
        case dateformate1:
            dd = dateArr[0]; mm = dateArr[1]; yy = dateArr[2];
            break;
        case dateformate2:
            dd = dateArr[1]; mm = dateArr[0]; yy = dateArr[2];
            break;
        case dateformate3:
            dd = dateArr[2]; mm = dateArr[1]; yy = dateArr[0];
            break;
        case dateformate4:
            dd = dateArr[2]; mm = dateArr[0]; yy = dateArr[1];
            break;
        default:
    }

    return { dd, mm, yy };
}

function validDateFormat(dd,mm,yy,allowdates) {
    //check the date, month and year
    let dateCheck = /^(0[1-9]|[12]\d|3[01])$/;
    let monthCheck = /^(0[1-9]|1[0-2])$/;
    let yearCheck = /^\d{4}$/;
    let isValidDateFormat = true;
    if (monthCheck.test(mm) && dateCheck.test(dd) && yearCheck.test(yy)) {
        let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (mm == 1 || mm > 2) {
            if (dd > ListofDays[mm - 1]) {
                isValidDateFormat = false;
            }
        }
        if (mm == 2) {
           if(!isLeapYear(yy,dd)) {
             isValidDateFormat = false;
           }
        } 
    return isValidDateFormat;
    }

    }
    function isLeapYear(yy,dd) {
        let leapYear = false;
               if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                   leapYear = true;
               }
               if ((!leapYear && dd >= 29) || (leapYear && dd > 29)) {
                   return false;
               }
           }

    function checkAllowedDates(dd, mm, yy, allowdates) {
    //check if the date is valid based on the allowdates values.
    let isValidDateCheck, inputDate, inputFullYear;
   
        inputDate = new Date(yy, mm - 1, dd);
        inputFullYear = inputDate.getFullYear();

        let currentDate = new Date();
        let currentFullYear = currentDate.getFullYear();

        currentDate = currentDate.setHours(0,0,0,0);
        inputDate = inputDate.setHours(0,0,0,0);

        if(allowdates == 'past') {
            isValidDateCheck = (inputDate <= currentDate && 1900 < inputFullYear && inputFullYear <= currentFullYear) ? true : false;
        } else if (allowdates == 'future') {
            isValidDateCheck = (inputDate >= currentDate && currentFullYear <= inputFullYear && inputFullYear < 2100) ? true : false;
        } else {
            isValidDateCheck = ((inputDate <= currentDate || inputDate >= currentDate) && 1900 < inputFullYear && inputFullYear < 2100) ? true : false;
        }

    return isValidDateCheck;
    
}

/**
 * @function
 * @desc function to mask date
 * @param {Object} elm
 * @param {String} seperator
 * @param {String} format
 */
function dateInputMask(elm, seperator, format) {
    elm.addEventListener('keypress', function (e) {
        if (e.keyCode < 47 || e.keyCode > 57) {
            e.preventDefault();
        }

        let len = elm.value.length;

        let dateformate1 = 'dd'+seperator+'mm'+seperator+'yyyy';
        let dateformate2 = 'mm'+seperator+'dd'+seperator+'yyyy';
        let dateformate3 = 'yyyy'+seperator+'mm'+seperator+'dd';
        let dateformate4 = 'yyyy'+seperator+'dd'+seperator+'mm';

        switch(format) {
            case dateformate1 :
            case dateformate2 :
                // If at a particular place, let the user type the seperator
                // i.e., 12/12/1212
                if (len !== 1 || len !== 3) {
                    addSeparator(e);
                }
                // If not added, include bydefault
                if (len === 2 || len === 5) {elm.value += seperator;}

                break;
            case dateformate3 :
            case dateformate4 :
                // If at a particular place, let the user type the seperator
                // i.e., 1212/12/12
                if (len !== 3 || len !== 7) {
                    addSeparator(e);
                }
                // If not added, include bydefault
                if (len === 4 || len === 7) {elm.value += seperator;}

                break;
            default:
        }
    });
}
function addSeparator (e) {
    if (e.keyCode == 47) {
        e.preventDefault();
    } 
}
