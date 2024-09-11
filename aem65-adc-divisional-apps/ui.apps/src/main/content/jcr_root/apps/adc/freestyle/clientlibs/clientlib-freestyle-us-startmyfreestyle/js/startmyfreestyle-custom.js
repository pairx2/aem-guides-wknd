$(function () {
  const wcmEdit = $("#wcmMode").val();
  $('body').addClass('wcmEnabled');
  if (wcmEdit == "true") {
    return false;
  }
    $('body').removeClass('wcmEnabled');
    hideMessage();

    const form = $('#getstarted');
    let for_whom = form.find('#for-whom-options input[name="for-whom"]');
    let for_whom_someone = form.find('#for-whom-someone-options input[name="for-whom-someone"]');
    let consent = form.find('input[name="agree"]');
    let product_type = form.find('#productType-options input[name="productType"]');
    let product_type_myself = form.find('#productTypeMyself-options input[name="productType"]');
    let is_18 = form.find('#isCaregiverAge-options input[name="ageSelection"]');
    let is_18_err_msg = form.find('#isCaregiver18YearError');
    let myselfForm = form.find('#myselfForm');
    let someOneForm = form.find('#someOneForm');
    let CaregiverDobError = form.find('#isCaregiverDobError');
    let MyselfFs2AgeError = form.find('#isMyselfFs2AgeError');
    let MyselfFs14AgeError = form.find('#isMyselfFs14AgeError');
    let Fs2AgeError = form.find('#fs2AgeError');
    let Fs14AgeError = form.find('#fs14AgeError');
    let zipcode = form.find('input[name="zipCode"]');
    let dob = form.find('input[name="dob_myself"] , input[name="dob_someone"]');
    let minAge = 18;
    let is_caregiver;
    let device_selected = true;
    let device_selected_myself = true;
    const selectDropdownProduct = form.find('#productTypeFSL3-options .a-dropdown');

    let android = $('[name="android"]').val();
    if(android) {
      form.find('#productType-options').hide();
      form.find('#productTypeMyself-options').hide();
    }

    // Not allowing user to pass zipcode more than 5 char
    zipcode.on('keyup', function () {
      $(this).val($(this).val().slice(0,Math.min($(this).val().length,5)));
    });

    for_whom.on('change', function () {
      is_caregiver = $(this).val().toLowerCase() === 'someoneles';
      setMinAge(device_selected_myself,is_caregiver);
      showHideForms(is_caregiver);
      is_18_err_msg.hide();
      is_18.prop('checked', false);
    });

    for_whom_someone.on('change', function () {
      is_caregiver = $(this).val().toLowerCase() === 'someoneles';
      setMinAge(device_selected,is_caregiver);
      showHideForms(is_caregiver);
      const setFocusChecked = [
        () => {},
        () => {
          for_whom[0].checked = true;
          for_whom[0].focus();
        }
      ];
      setFocusChecked[Number(!is_caregiver)]();
      is_18_err_msg.hide();
      is_18.prop('checked', false);
    });

    const checkProductIdType = selectDropdownProduct?.length > 0 ? selectDropdownProduct : product_type;
    const checkProductIdTypeSelf = selectDropdownProduct?.length > 0 ? selectDropdownProduct : product_type_myself;
    const hideAllId = (id=[]) => id.forEach(id => id?.hide());

    checkProductIdType?.on('change', function () {
      hideAllId([MyselfFs2AgeError,MyselfFs14AgeError,Fs2AgeError,Fs14AgeError]);
    });

    checkProductIdTypeSelf?.on('change', function () {
      hideAllId([MyselfFs2AgeError,MyselfFs14AgeError,Fs2AgeError,Fs14AgeError]);
    });



    /* Error Validation */
    // is18 error validation
    const showErrorMessage = () => {
      is_18_err_msg.show();
    }
    const hideErrorMessage = () => {
      is_18_err_msg.hide();
    }
    is_18.on('change', function () {
      let user_selection = $(this).val().toLowerCase();
      const actions = {
        'no': showErrorMessage,
        'yes': hideErrorMessage
      }
      const defaultAction = hideErrorMessage;
      (actions[user_selection] || defaultAction)();
      updateConsentAndMessage(user_selection);
    });

    function updateConsentAndMessage(user_selection){
      consent[1].checked = user_selection === 'no';
      consent[1].disabled = user_selection === 'no';
    }

    // Check the user Age eligibility
    function checkDOB(selectedMonth, selectedYear, selectedDay, ele) {
      let mydate = new Date(), currdate = new Date(), setDate = new Date();
      mydate.setFullYear(selectedYear, selectedMonth, selectedDay);
      setDate.setFullYear(mydate.getUTCFullYear() + minAge, selectedMonth, selectedDay);
      const actions = [
          () => hideAllId([CaregiverDobError,MyselfFs2AgeError,MyselfFs14AgeError,Fs2AgeError,Fs14AgeError]),
          () => showErrors(ele)
       ];
     actions[+(setDate-currdate >0)]();
    }

    // Run when DOB field change

    dob.on( dob?.attr('type') == 'text' ? 'keyup' :'change', function () {
      $(this).val().length == 10 && (() =>{
      let getDob = new Date($(this).val());
      let selectedMonth = getDob.getUTCMonth(), selectedYear = getDob.getUTCFullYear(), selectedDay = getDob.getUTCDate();
        checkDOB(selectedMonth, selectedYear, selectedDay, $(this));
      })();
    });

  

    $("#btn_getstarted").click(function() {
        showForm();
    });

    $("#btn_backtoform").click(function() {
        showForm();
    });

    function showForm() {
        $('#getstarted').show();
        hideMessage();
        document.getElementById("myselfForm").querySelector('form').reset();
        document.getElementById("someOneForm").querySelector('form').reset();
        $("#myselfForm .o-form-container__error-msg").hide();
        $("#someOneForm .o-form-container__error-msg").hide();
        $('html, body').animate({
          scrollTop: $('#getstarted').offset().top - 85
        }, 1000);
    }

    function hideMessage() {
        $("#thankyou_message").hide();
        $("#thankyou_message_fs14").hide();
        $("#signup_message").hide();
        $("#thankyou_message_fs3").hide();
        $("#thankyou_message_fs3_plus_system").hide();

    }

    const setMinAge = (device_selected,is_caregiver)  => {
      let age = minAge;
      minAge = age-(device_selected && is_caregiver) * 14;
    };

    const showErrorForCaregiver = () => {
      const errorCareGiver = {
        true : () => Fs2AgeError.show(),
        false: () => Fs14AgeError.show()
       };
      errorCareGiver[device_selected]();
    };

    const showErrorForMyself = () => {
      const errorMyself = {
        true : () => MyselfFs2AgeError.show(),
        false : () => MyselfFs14AgeError.show()
      };
      errorMyself[device_selected_myself]();
    };

    const showErrors = (ele) => {
      const errorHandlers = {
        true : () => showErrorForCaregiver(),
        false : () => showErrorForMyself(),
        undefined: () => showErrorForMyself()
      };
      errorHandlers[is_caregiver === undefined ? 'undefined': is_caregiver]();
      ele.val('');
    };
    const showHideForms = (is_caregiver) => {
      switch (is_caregiver){
        case false:
          myselfForm.addClass('active').show();
          someOneForm.removeClass('active').hide();
          break;
        case true:
          myselfForm.removeClass('active').hide();
          someOneForm.addClass('active').show();
          for_whom_someone[1].checked = true;
          break;
        default:
          break;
      }
    }
});