/**
 *
 * @param {string} dateString date in DD/MM/YYYY format
 * @returns date in YYYY-MM-DD format
 */


 function updateRequestMyFreestyleUKCallback(data) {
  let body = data.body;

  body['time'] = (body['time'] || []).find((option) => option.consentValue)?.consentName;
  body['consent'] = true;

  delete body['node'];

  return data;
}

(function ($, document) {
  $(document).ready(() => {
    const $callBackFormContainer = $("#call-back-form");

    if (!$callBackFormContainer.length) {
      return;
    }

    const $callBackForm = $callBackFormContainer.find("form");
    const $datePicker = $callBackForm.find("#callback-date-picker");
    const $timeSlots = $callBackFormContainer.find(
      "#callback-time-options .a-radio"
    );
    const $submitBtn = $callBackFormContainer.find(
      "#contactButtonSendReq-IEEN"
    );

    const dispatchConditionalEvent = (name, value) => {
      window.dispatchEvent(
        new CustomEvent("conditional-component-change", {
          detail: {
            value,
            var: name,
          },
        })
      );
    };

    

    /**
     *
     * @param {string} date date in YYYY-MM-DD format
     * @returns available appointment time slots for the given date
     */
    const getAppointments = async (date, recaptchatok) => {
      const { eslEndpoint } = eslConfigDatasets();
      const url = `${eslEndpoint + ESL_EPT?.GET_APPOINTMENT_SLOTS}`;
      const headers = { ...getPageDataAttributes() };
      const requestOptions = {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          date,
          'g-recaptcha-response': recaptchatok
        }),
      };

      const data = await fetch(url, requestOptions);
      return await data.json();


    };

    

    /**
     * Hides and deselects all time slot radio buttons
     */
    const hideTimeSlots = () => {
      $timeSlots.each((i, element) => {
        const $timeWrapper = $(element);
        const $radioButton = $timeWrapper.find('input[type="radio"]');

        $radioButton.prop("checked", false);
        $submitBtn.prop("disabled", true);
        $timeWrapper.hide();
      });
    };



    $datePicker.on("keyup", async (e) => {
      const selectedDate = $datePicker.val();
      dispatchConditionalEvent("isDateSelected", false);
      
      const datasitek = $('#call-back-form').attr('data-site-key');
      let recaptchatok; 
      let res = '';
      if (parseDate(selectedDate)) {
        dispatchConditionalEvent("isDateSelected", "loading");
        grecaptcha.ready(function () {
          grecaptcha.execute(datasitek, {
            action: 'submit'
          })
            .then(function (token) {
              recaptchatok = token;
              const getApp = async () => {
                res = await getAppointments(selectedDate, recaptchatok);
                
                
                  const appointments = res?.response?.data?.appointments;

                  if (appointments?.time) {
                    dispatchConditionalEvent("isDateSelected", true);
                    displayTimeSlots(appointments.time);
                  } else {
                    dispatchConditionalEvent("isDateSelected", "noneAvailable");
                    hideTimeSlots();
                  }
                
                return res;
              }
              getApp();
            });
        });
      }
    });
  });

  const parseDate = (str) => {
    let validateDate = /^\d{2}[-/]\d{2}[-/]\d{4}$|^\d{4}[-/]\d{2}[-/]\d{2}$/.test(str)

    let disableFutureDays = $('[data-js-component="date-picker"]') ? $('[data-js-component="date-picker"]').attr('data-disabled-afterdays') : null;
    let disableWeekned = $('[data-js-component="date-picker"]') ? $('[data-js-component="date-picker"]').attr('data-disabled-weekend') : null;
    let dateFormat = $('[data-js-component="date-picker"]') ? $('[data-js-component="date-picker"]').attr('data-date-format') : null;
          
    if(validateDate){
      return validateReturnDate(disableFutureDays,disableWeekned,dateFormat,str);
    }
  else{
      $('.a-date-picker--error-format').addClass('show') //wrong format date
      $('.a-date-picker--error-date').removeClass('show')
      $('.a-date-picker__input-start .a-input-field .form-group').addClass('validation-error-msg')
      $('.a-date-picker--error').addClass('validation-error-msg')
      return false
    } 
}

/**
     * Display radio buttons of available time slots, and hide all others
     * @param {string[]} times List of available time slots
     */
 const displayTimeSlots = (times) => {
  const $callBackFormContainer = $("#call-back-form");
  const $timeSlotsnm = $callBackFormContainer.find(
    "#callback-time-options .a-radio"
  );
  const $submitBtnm = $callBackFormContainer.find(
    "#contactButtonSendReq-IEEN"
  );
  $submitBtnm.prop("disabled", true);

  $timeSlotsnm.each((i, element) => {
    const $timeWrapper = $(element);
    const $radioButton = $timeWrapper.find('input[type="radio"]');
    $radioButton.prop("checked", false);

    if (times.includes($radioButton.val())) {
      $timeWrapper.show();
    } else {
      $timeWrapper.hide();
    }
  });
};

const validateReturnDate = (disableFutureDays,disableWeekned,dateFormat,str) => {
  let currentDate = new Date()
      let todayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() )
      let endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + Number(disableFutureDays) );
     
      let dateArray = str.includes("/") ? str.split("/") : str.split("-")
      let dateFormatArray = str.includes("/") ? dateFormat.split("/") : dateFormat.split("-")
  let check = dateArray[dateFormatArray.indexOf("MM")] <= 12 && dateArray[dateFormatArray.indexOf("DD")] <= 31 ? true : false
      
      if(check){                                                  // DD - MM format 
        let selectedDate = new Date(dateArray[dateFormatArray.indexOf("YYYY")], Number(dateArray[dateFormatArray.indexOf("MM")])-1, dateArray[dateFormatArray.indexOf("DD")])
        let range = todayDate <= selectedDate && selectedDate <= endDate ? true : false
        let week = false;
        if(disableWeekned && (selectedDate.getDay() == 6 || selectedDate.getDay() == 0)){
            week = true; 
        }
        if(range && !week){
          $('.a-date-picker--error-date').removeClass('show')
          $('.a-date-picker--error-format').removeClass('show')
          $('.a-date-picker--error').removeClass('validation-error-msg')
          $('.a-date-picker__input-start .a-input-field .form-group').removeClass('validation-error-msg')

          return true
        }
      }
      $('.a-date-picker--error-date').addClass('show') //invalid date
      $('.a-date-picker--error-format').removeClass('show')
      $('.a-date-picker--error').addClass('validation-error-msg')
      $('.a-date-picker__input-start .a-input-field .form-group').addClass('validation-error-msg')
      return false
}

})(jQuery, document);