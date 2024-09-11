function calculate_age(dobString, e) {
    let age = -1;
    if (dobString) {
        if (!isNaN(Date.parse(dobString))) {
            const dobArray = dobString.split('-');
            if (dobArray[1] == 2) {
                const isleap = (dobArray[0] % 4 == 0 && (dobArray[0] % 100 != 0 || dobArray[0] % 400 == 0));
                if (dobArray[2] > 29 || (dobArray[2] == 29 && !isleap)) {
                    $(e.target).closest('.a-form-grp').addClass('validation-error-msg');
                    $(e.target).closest('.a-form-grp').find('.a-date-picker--error').addClass('validation-error-msg');
                    $(e.target).closest('.a-form-grp').find('.a-date-picker--error-date').addClass('show');
                }
            }
            const optimizedDOB = dobString.replace(/-/g, "/");
            const dob = new Date(optimizedDOB);
            const currentDate = new Date().toJSON().slice(0,10)+' 01:00:00';
            age = ~~((Date.now(currentDate) - dob) / (31557600000));
        }
    } else {
        age = 18;
    }
    return age;
}

function formatDateofBirth(dateString, dateFormat) {
    let dateOfBirth = "";
    let day, month, year, rxDatePattern;
    let inputDate = dateString;
    if (!(inputDate == "" || inputDate == undefined)) {
        let dateArray = inputDate.split('/');
        if (dateArray.length > 0) {
        switch (dateFormat) {
            case 'MM/DD/YYYY':
            day = dateArray[1];
            month = dateArray[0];
            year = dateArray[2];
            rxDatePattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
            break;

            case 'DD/MM/YYYY':
            day = dateArray[0];
            month = dateArray[1];
            year = dateArray[2];
            rxDatePattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
            break;

            case 'YYYY/MM/DD':
            day = dateArray[2];
            month = dateArray[1];
            year = dateArray[0];
            rxDatePattern = /^\d{4}\/\d{1,2}\/\d{1,2}$/;
            break;

            case 'YYYY/DD/MM':
            day = dateArray[1];
            month = dateArray[2];
            year = dateArray[0];
            rxDatePattern = /^\d{4}\/\d{1,2}\/\d{1,2}$/;
        }
        if (inputDate.match(rxDatePattern) != null)
            dateOfBirth = year + "-" + month + "-" + day;
        else
            dateOfBirth = "invalid-pattern";

        }
    }
    return dateOfBirth;
}

function validateDatePicker(e, popupFlag, dateStg, dateFormat,  ageLimit, popupId="#notEligible") {
    const dateString = formatDateofBirth(dateStg, dateFormat);
    validateLeapYear(dateString, e);
    const validAge = validateAge(dateString, ageLimit);
    if (!validAge) {
        setTimeout(function(){
            if(popupFlag) {
                $(popupId).show().addClass("show");
                $(e.target).val('');
                $(e.target).focus();
                $(e.target).closest('.a-form-grp').find('.a-date-picker--error-date').removeClass('show');
            }else{
                $(e.target).closest('.a-form-grp').addClass('validation-error-msg');
                $(e.target).closest('.a-form-grp').find('.a-date-picker--error').addClass('validation-error-msg');
                $(e.target).closest('.a-form-grp').find('.a-date-picker--error-date').addClass('show');
            }               
        }, 100);            
    } 
}

function validateAge(dateString, ageLimit)  {
    const getDob = new Date(dateString);
    const selectedMonth = getDob.getUTCMonth(), selectedYear = getDob.getUTCFullYear(), selectedDay = getDob.getUTCDate();
    let mydate = new Date(), currdate = new Date(), setDate = new Date();
    mydate.setFullYear(selectedYear, selectedMonth, selectedDay);
    setDate.setFullYear(mydate.getUTCFullYear() + ageLimit, selectedMonth, selectedDay);
    
    return (setDate - currdate) === 0 || (setDate - currdate) < 0;
}

function validateLeapYear(dobString, e) {
    if (dobString  && dobString != ' ') {
        if (!isNaN(Date.parse(dobString))) {
            const dobArray = dobString.split('-');
            if (dobArray[1] == 2) {
                const isleap = (dobArray[0] % 4 == 0 && (dobArray[0] % 100 != 0 || dobArray[0] % 400 == 0));
                if (dobArray[2] > 29 || (dobArray[2] == 29 && !isleap)) {
                    $(e.target).closest('.a-form-grp').addClass('validation-error-msg');
                    $(e.target).closest('.a-form-grp').find('.a-date-picker--error').addClass('validation-error-msg');
                    $(e.target).closest('.a-form-grp').find('.a-date-picker--error-date').addClass('show');
                }
            }
        }
    } 
}

function setMaxLengthToField(elem, max_length_num) {
    $(elem).attr('maxlength', max_length_num);
}

function showBtnSpinner(id) {
    let btnSubmit = document.getElementById(id);
    let btnSpinner = btnSubmit.closest('.a-button');
    btnSpinner.classList.add('a-button--spinner');
    btnSubmit.disabled = true;
 }
 
 function hideBtnSpinner(id) {
    let btnSubmit = document.getElementById(id);
    let btnSpinner = btnSubmit.closest('.a-button');
    btnSpinner.classList.remove('a-button--spinner');
    btnSubmit.disabled = false;
 }

 const  getHiddenVarValue = (fieldName) => {
    const hiddenEml = document.querySelector(`input[type="hidden"][name="${fieldName}"]`)?.value || '';
    return hiddenEml;
}
