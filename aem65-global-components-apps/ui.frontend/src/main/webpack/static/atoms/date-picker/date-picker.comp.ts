import Litepicker from 'litepicker';
const DataPickerFn = function() {
    'use strict';
    class DatePicker {
        constructor(ele) {

            let $ele = $(ele),
                jsElem = ele,
                $disablePastinFutureCal = $ele.attr('data-disabled-pastinfuturecal'),
                $disablePastinFutureDaysCal = $ele.attr('data-disabled-pastandfuturedays'),
                $litepickerDiv = $ele.find('.litepicker'),
                $disableWeekend = $ele.attr('data-disabled-weekend'),
                $disableAfterMonths = Number($ele.attr('data-disabled-aftermonths')),
                $disableAfterDays = Number($ele.attr('data-disabled-afterdays')),
                $disableBeforeDays = Number($ele.attr('data-disabled-beforedays')),
                $datePickerInputElements = $ele.find('.a-input-grp'),
                $inputElems = $ele.find('.a-input-control'),
                $inputElemsIcon = $ele.find('.icon'),
                $datePickerElemStart = $ele.find('.a-date-picker__input-start .a-input-control'),
                $datePickerElemStartHidden = $ele.find('.a-date-picker__input-start .hidden-start-date'),
                $datePickerElemEnd = $ele.find('.a-date-picker__input-end .a-input-control'),
                $datePickerElemEndHidden = $ele.find('.a-date-picker__input-end .hidden-end-date'),
                $formatErrorDiv = $ele.find('.a-date-picker--error-format'),
                $rangeErrorDiv = $ele.find('.a-date-picker--error-range'),
                $dateErrorDiv = $ele.find('.a-date-picker--error-date'),
                $formGroupDiv = $ele.find('.a-input-field .form-group'),
                $formGroupHelpMessage = $ele.find('.a-input-field--help-msg .form-group'),
                $errorContainerDiv = $ele.find('.a-date-picker--error'),
                $disabledPastYears = $ele.attr('data-disable-date') === 'pastYears' ? +$ele.attr('data-disabled-years') : 0,
                $disabledPastDate = new Date(new Date().setFullYear(new Date().getFullYear() - $disabledPastYears)),
                $minYear = 1920,
                $disablePastFutureMonths = ($ele.attr('data-disable-date') === 'future' && $disablePastinFutureCal),
                $disablePastFutureDays = ( $ele.attr('data-disable-date') === 'futureDays' && $disablePastinFutureDaysCal) ,
                $lockDays = $disableBeforeDays > 0 && ($ele.attr('data-disable-date') === 'futureDays') ? true : false,
                $lockDaysArr = [],
                $disableFutureCalender = $disableAfterMonths  && ($ele.attr('data-disable-date') === 'future') ? new Date(new Date().setMonth(new Date().getMonth() + $disableAfterMonths)) : $disableAfterDays ? new Date(new Date().setDate(new Date().getDate() + $disableAfterDays)) : new Date(),
                $maxDate = $ele.attr('data-disable-date') === 'future' || ($disableAfterDays && $ele.attr('data-disable-date') === 'futureDays') ? $disableFutureCalender : $ele.attr('data-disable-date') === 'pastYears' ? $disabledPastDate : new Date('2120-12-31'),
                $minDate =  $disablePastFutureMonths || $disablePastFutureDays ? new Date().setHours(0, 0, 0, 0): ($ele.attr('data-disable-date') === 'past' ? new Date().setHours(0, 0, 0, 0) : new Date('1920-01-01')),
                $singleMode = $ele.attr('data-type') === 'single' ? true : false,
                $dateFormat = $ele.attr('data-date-format'),
                $dynamicDateRange = $ele.attr('data-dynamic-date-range')  === 'true',
                $allowedDates = [],
                $isCorrectDate,
                $isRangeValidated: false,
                showError,
                removeErrors,
                generateDatepicker,
                checkErrors,
                renderDate,
                checkEmptyDateValidation,
                that,
                isTouched = false,
				enableMonthDropdown = $ele.attr('data-enable-dropdown-month') === 'true',
				enableYearDropdown = $ele.attr('data-enable-dropdown-year')  === 'true';

            that = this;

            /**
             * @condition
             * @desc This condtion genrates the locksdays period range
             */
            if($lockDays){
                function pad(n){return n<10 ? '0'+n : n};
                var _lockStartDate = new Date();
                var _lockEndDate = new Date(new Date().setDate(new Date().getDate() + $disableBeforeDays));
                var _lockDays = [`${_lockStartDate.getFullYear()}-${pad(_lockStartDate.getMonth()+1)}-${pad(_lockStartDate.getDate())}`, `${_lockEndDate.getFullYear()}-${pad(_lockEndDate.getMonth()+1)}-${pad(_lockEndDate.getDate())}`];
                $lockDaysArr.push(_lockDays);
            };

            if($dynamicDateRange){
              function pad(n){return n<10 ? '0'+n : n};
              var _lockStartDate = new Date();
              var _earliestDate = new Date(JSON.parse(localStorage.getItem('dateRange'))?.earliest);
              var _latestedDate = new Date(JSON.parse(localStorage.getItem('dateRange'))?.latest);
              var _maxDate = $maxDate;
              var _scheduledDate = JSON.parse(localStorage.getItem('dateRange'))?.scheduledDate;
              var _lockEarliestDays = [`${_lockStartDate.getFullYear()}-${pad(_lockStartDate.getMonth()+1)}-${pad(_lockStartDate.getDate())}`, `${_earliestDate.getFullYear()}-${pad(_earliestDate.getMonth()+1)}-${pad(_earliestDate.getDate()-1)}`];
              var _lockLatestDays = [`${_latestedDate.getFullYear()}-${pad(_latestedDate.getMonth()+1)}-${pad(_latestedDate.getDate()+1)}`, `${_maxDate.getFullYear()}-${pad(_maxDate.getMonth()+1)}-${pad(_maxDate.getDate())}`];
              $lockDaysArr.push(_lockEarliestDays, _lockLatestDays, _scheduledDate);              
            };


            /**
             * @function
             * @desc This function generates date picker
             */
            generateDatepicker = function() {
                that.litepicker = new Litepicker({
                    element: $datePickerElemStartHidden[0],
                    elementEnd: $datePickerElemEndHidden[0],
                    singleMode: $singleMode,
                    autoRefresh: true,
                    autoApply: true,
                    maxDate: $maxDate,
                    minDate: $minDate,
                    lockDays: $lockDaysArr,
                    disableWeekends: $disableWeekend,
                    dropdowns: {
                        minYear: $minYear,
                        maxYear: 2120,
                        months: enableMonthDropdown,
                        years: enableYearDropdown,
                    },
                    format: $dateFormat,

                    onSelect: function(date1, date2) {
                       removeErrors();
                       $formGroupDiv.removeClass("validation-require");
                       $datePickerInputElements.removeClass("active");
                       if (!isTouched) {
                         isTouched = true;
                         renderDate(date1, date2);
                        //  Manually triggering the keyup event ('a' key) to validate the datepicker field when selecting date via datepicker
                        const element =  ele.querySelector(".a-input-control");
                        element.dispatchEvent(
                           new KeyboardEvent("focusout", {
                             key: "a",
                           })
                         );
                         element.dispatchEvent(
                            new KeyboardEvent("keyup", {
                              key: "a",
                            })
                          );
                         return isTouched;
                       }
                    }
                });
                localStorage.removeItem('dateRange');
            }

            generateDatepicker();


            $inputElemsIcon.on("click", function (e) {
              e.stopPropagation();
             // removed since "keyup" got changed to "focusout" (105) out on year picker click dispatches focusout hance it close the light picker
            // $(this).siblings(".a-input-control").focus();
              isTouched = false;
              $(this).closest(".input-group").addClass("active");
              that.litepicker.show();
            });

            $(document).on("click", function (event) {
              if ($datePickerInputElements.hasClass("active")) {
                $datePickerInputElements.removeClass("active");
              }
            });

            // On every focusout validate datepicker value
            $inputElems.on('focusout', function (e) {
              e?.stopPropagation();
              var currEle = $(this);
              var currEleCont = currEle.closest(".a-date-picker");
              var currEleType = currEleCont.attr("data-type");

              let date1:any = currEleType === "range" ? (<HTMLInputElement>currEleCont.find('.a-input-control')[0]).value : currEle.val();
              let date2:any = currEleType === "range" ? (<HTMLInputElement>currEleCont.find('.a-input-control')[1]).value : '';
              if (currEleType === "range") {
                  if ((!$singleMode && (date1.length == 0 || date2.length == 0)) || ($singleMode && date1.length == 0)) {
                  $datePickerInputElements.removeClass('selected');
                }
                if (!$singleMode && (date1.length != 0 || date2.length != 0)) {
                    checkErrors(date1, date2);
                }
                if (!$singleMode && (date1.length == 0 && date2.length == 0)) {
                    removeErrors();
                }
              }
              else {
                if ($singleMode && date1.length != 0) {
                  $formGroupDiv.removeClass("validation-require");
                  checkErrors(date1);
                }
                if ($singleMode && date1.length === 0) {
                  // Remove error when field is empty so that required msg only appears
                  $formGroupDiv.addClass("validation-require");
                  removeErrors();
                }
              }
              $ele.find('.litepicker').hide();
              isTouched = false;
              return isTouched;
            });
            // for Android date-formate
            $(".a-date-picker .a-input-control").on("keyup",  function (e : any)  {

                let keyCode = e?.currentTarget?.value ?  e?.currentTarget?.value : '';

                const userAgent = navigator.userAgent || navigator.vendor;
                const isAndroid = /android/i.test(userAgent);

                let isValid = /^[0-9]+$/.test(keyCode?.replace(/\\|\//g,''));

                if (isValid && isAndroid) {
                    let currEle = $(e.target);
                    let dateVal: any = keyCode;
                    let curEleDateFormat = $(e.target).closest('.a-date-picker').attr("data-date-format");
                    formateDate(curEleDateFormat, dateVal, currEle, e);

                } else if (isAndroid && !isValid){
                    e.preventDefault();
                }

            });

            // On Keypress check key and validate accordingly
            $(".a-date-picker .a-input-control").on("keypress", function (e) {
              let keyCode = e.keyCode || e.which;
              // check and allow only numbers
              let keyValue = String.fromCharCode(keyCode);
              let isValid = /^[0-9]+$/.test(keyValue);
              let currEle = $(this);
              let dateVal: any = currEle.val();
              let curEleDateFormat = currEle.closest(".a-date-picker").attr("data-date-format");

              // if input is valid then mask the date value as per defiend format
              if (isValid) {
                formateDate(curEleDateFormat, dateVal, currEle, e);
               } else {
                e.preventDefault();
              }

            });

            const formateDate = (curEleDateFormat, dateVal, currEle, eleEvt:any = {}) => {

                    if ((curEleDateFormat == "MM/DD/YYYY" || curEleDateFormat == "DD/MM/YYYY") && (eleEvt.keyCode && eleEvt.keyCode != 8)) {
                      if (dateVal.match(/^\d{2}$/) !== null || dateVal.match(/^\d{2}\/\d{2}$/) !== null) {
                        currEle.val(dateVal + "/");
                      }
                    } else if ((curEleDateFormat == "YYYY/MM/DD" || curEleDateFormat == "YYYY/DD/MM") && (eleEvt.keyCode && eleEvt.keyCode != 8)) {
                        if (dateVal.match(/^\d{4}$/) !== null || dateVal.match(/^\d{4}\/\d{2}$/) !== null) {
                            currEle.val(dateVal + "/");
                        }
                    } else if (curEleDateFormat == "MM-DD-YYYY" || curEleDateFormat == "DD-MM-YYYY") {
                        if (dateVal.match(/^\d{2}$/) !== null || dateVal.match(/^\d{2}\-\d{2}$/) !== null) {
                            currEle.val(dateVal + "-");
                          }
                    } else if (curEleDateFormat == "YYYY-MM-DD" || curEleDateFormat == "YYYY-DD-MM") {
                        if (dateVal.match(/^\d{4}$/) !== null || dateVal.match(/^\d{4}\-\d{2}$/) !== null) {
                            currEle.val(dateVal + "-");
                        }
                    } else {
                      return false;
                    }

            }


            /**
             * @function
             * @desc This function checks errors
             */
            checkErrors = function(date1, date2) {
                let formatError = false,
                    dateError = false,
                    rangeError = false,
                    dateObj1,
                    dateObj2;

                let formatDate1 = date1.split('/').filter(Boolean),
                    formatDate2;

                if (formatDate1.length != 3) {
                    formatDate1 = date1.split('-').filter(Boolean)
                }

                // Checking Format Errors

                let formatError1 = that.checkFormatError(date1, formatDate1);
                if ($singleMode && formatError1 == true) {
                    showError('format');
                    formatError = true;
                }
                if (!$singleMode) {
                    formatDate2 = date2.split('/').filter(Boolean);

                    if (formatDate2.length != 3) {
                        formatDate2 = date2.split('-').filter(Boolean)
                    }

                    let formatError2 = that.checkFormatError(date2, formatDate2);
                    if (formatError1 == true || formatError2 == true) {
                        showError('format');
                        formatError = !$singleMode && date2 == '' || date1 == '' ? false : true;
                    }
                }


                if (!formatError) {
                    // Check Date Errors
                    let dateError1 = that.splitSelectedDate(formatDate1, $dateFormat, $minYear, $minDate, $maxDate);

                    if ($singleMode) {
                        if (dateError1[0] == false) {
                          showError("date");
                          dateError = true;
                        } else {
                          removeErrors();
                        }
                        dateObj1 = new Date(dateError1[3] + '/' + dateError1[2] + '/' + dateError1[1]);
                    }

                    if (!$singleMode) {
                        let dateError2 = that.splitSelectedDate(formatDate2, $dateFormat, $minYear, $minDate, $maxDate);
                        if (dateError1[0] == false || dateError2[0] == false) {
                          showError("date");
                          dateError = true;
                        } else {
                          removeErrors();
                        }
                        dateObj1 = new Date(dateError1[3] + '/' + dateError1[2] + '/' + dateError1[1]);
                        dateObj2 = new Date(dateError2[3] + '/' + dateError2[2] + '/' + dateError2[1]);
                    }

                }

                if (!formatError && !dateError && !$singleMode) {
                    // Check Range Error
                    rangeError = that.checkRangeError(formatDate1, formatDate2, $dateFormat, $minYear, $minDate, $maxDate);
                    if (rangeError) {
                        showError('range');
                    }

                }

                if (!$singleMode && !formatError && !dateError && !rangeError) {
                    that.litepicker.setDateRange(dateObj1, dateObj2);
                }

                if ($singleMode && !formatError && !dateError) {
                    that.litepicker.setDate(dateObj1);
                }

            }

            /**
             * @function
             * @desc This function handles all error messages
             */
            showError = function($errorType) {

                $formGroupDiv.addClass('validation-error-msg');
                $errorContainerDiv.addClass('validation-error-msg');
                $formGroupHelpMessage?.addClass('validation-error validation-error-msg');

                switch ($errorType) {
                    case 'format':
                        $rangeErrorDiv.removeClass('show');
                        $dateErrorDiv.removeClass('show');
                        $formatErrorDiv.addClass('show');
                        that.litepicker.destroy();
                        generateDatepicker();
                        that.litepicker.clearSelection();
                        that.litepicker.hide();
                        break;
                    case 'date':
                        $rangeErrorDiv.removeClass('show');
                        $formatErrorDiv.removeClass('show');
                        $dateErrorDiv.addClass('show');
                        that.litepicker.destroy();
                        generateDatepicker();
                        that.litepicker.clearSelection();
                        that.litepicker.hide();
                        break;
                    case 'range':
                        $formatErrorDiv.removeClass('show');
                        $dateErrorDiv.removeClass('show');
                        $rangeErrorDiv.addClass('show');
                        that.litepicker.destroy();
                        generateDatepicker();
                        that.litepicker.clearSelection();
                        that.litepicker.hide();
                        break;
                }

                $inputElems.each(function(e) {
                    $datePickerInputElements.removeClass('selected');
                });
            }

            /**
             * @function
             * @desc To remove errors
             */

            removeErrors = function() {
                $ele.find('.validation-error-msg').removeClass('validation-error-msg');
                $ele.find('.a-date-picker--error .show').removeClass('show');

                $formGroupDiv.removeClass('validation-error-msg validation-error validation-regex');
                $errorContainerDiv.removeClass('validation-error-msg');
                $formGroupHelpMessage?.removeClass('validation-error validation-error-msg');
            }
            /**
             * @function
             * @desc To render dates in the input boxes
             */

            renderDate = function() {
                let startDate = $ele.find('.a-date-picker__input-start .hidden-start-date').val();
                $ele.find('.a-date-picker__input-start .a-input-control')?.val(startDate);

                //trigger keypress event after value update, to validate the form field
                let startInput = jsElem.querySelector('.a-date-picker__input-start .a-input-control');
                startInput?.dispatchEvent(new KeyboardEvent('keypress', {
                    cancelable: true
                }));

                let endDate = $ele.find('.a-date-picker__input-end .hidden-end-date').val();
                $ele.find('.a-date-picker__input-end .a-input-control')?.val(endDate);

                //trigger keypress event after value update, to validate the form field
                let endInput = jsElem.querySelector('.a-date-picker__input-end .a-input-control');
                endInput?.dispatchEvent(new KeyboardEvent('keypress', {
                    cancelable: true
                }));

                $datePickerInputElements.addClass('selected');
                that.litepicker.hide();

                if (startDate === endDate) {
                    checkErrors(startDate, endDate);
                }

            }

            checkEmptyDateValidation = function() {
                $inputElems.on('keyup', function(e) {
                    if (e.keyCode != 9 && !$(this).val() && !$(this).closest('.a-form-grp').hasClass('validation-error-msg') && (!$datePickerElemStart.val() || (!$singleMode && $datePickerElemEnd && !$datePickerElemEnd.val()))) {
                        that.litepicker.destroy();
                        generateDatepicker();
                        that.litepicker.hide();
                        $datePickerInputElements.find('input').val('');
                    }
                });
            }

            checkEmptyDateValidation();
        }

        /**
         * @function
         * @desc To check Range error
         */


        checkRangeError = function(fromValue, toValue, $dateFormat, $minYear, $minDate, $maxDate) {
            if (fromValue == '' || toValue == '') return true;
            let $splitFromDate = this.splitSelectedDate(fromValue, $dateFormat, $minYear, $minDate, $maxDate);
            let $splitToDate = this.splitSelectedDate(toValue, $dateFormat, $minYear, $minDate, $maxDate);
            let fromDate = new Date($splitFromDate[3] + '/' + $splitFromDate[2] + '/' + $splitFromDate[1]);
            let toDate = new Date($splitToDate[3] + '/' + $splitToDate[2] + '/' + $splitToDate[1]);

            if (toDate > fromDate) {
                return false;
            }
            return true;
        }

        /**
         * @function
         * @desc To check format error
         */

        checkFormatError = function(date, formatDate) {
            if ((formatDate[0] === date || formatDate.length != 3)) {
                return true;
            } else if (!/^\d+$/.test(formatDate.join().replaceAll(',', ''))) {
                return true;
            }
            return false;
        }

        /**
         * @function
         * @desc To split selected date
         */


        splitSelectedDate = function(formatEnteredDate, dateformat, $minYear, $minDate, $maxDate) {
            if (dateformat == 'MM/DD/YYYY' || dateformat == 'MM-DD-YYYY') {
                let selectDay = formatEnteredDate[1];
                let selectMonth = formatEnteredDate[0];
                let selectYear = formatEnteredDate[2];
                let newFormatEnteredDate = new Date(+selectYear,+selectMonth-1,+selectDay);
                let $isDateValidated = this.dateValidationCheck(newFormatEnteredDate, selectDay, selectMonth, selectYear, $minYear, $minDate, $maxDate);
                return [$isDateValidated, selectDay, selectMonth, selectYear];
            } else if (dateformat == 'DD/MM/YYYY' || dateformat == 'DD-MM-YYYY') {
                let selectDay = formatEnteredDate[0];
                let selectMonth = formatEnteredDate[1];
                let selectYear = formatEnteredDate[2];
                let newFormatEnteredDate = new Date(+selectYear,+selectMonth-1,+selectDay);
                let $isDateValidated = this.dateValidationCheck(newFormatEnteredDate, selectDay, selectMonth, selectYear, $minYear, $minDate, $maxDate);
                return [$isDateValidated, selectDay, selectMonth, selectYear];
            } else if (dateformat == 'YYYY/MM/DD' || dateformat == 'YYYY-MM-DD') {
                let selectDay = formatEnteredDate[2];
                let selectMonth = formatEnteredDate[1];
                let selectYear = formatEnteredDate[0];
                let newFormatEnteredDate = new Date(+selectYear,+selectMonth-1,+selectDay);
                let $isDateValidated = this.dateValidationCheck(newFormatEnteredDate, selectDay, selectMonth, selectYear, $minYear, $minDate, $maxDate);
                return [$isDateValidated, selectDay, selectMonth, selectYear];
            } else if (dateformat == 'YYYY/DD/MM' || dateformat == 'YYYY-DD-MM') {
                let selectDay = formatEnteredDate[1];
                let selectMonth = formatEnteredDate[2];
                let selectYear = formatEnteredDate[0];
                let newFormatEnteredDate = new Date(+selectYear,+selectMonth-1,+selectDay);
                let $isDateValidated = this.dateValidationCheck(newFormatEnteredDate, selectDay, selectMonth, selectYear, $minYear, $minDate, $maxDate);
                return [$isDateValidated, selectDay, selectMonth, selectYear];
            } else {
                return false;
            }
        }


        /**
         * @function
         * @desc To check date validation
         */

        dateValidationCheck = function(newFormatEnteredDate, selectDay, selectMonth, selectYear, $minYear, $minDate, $maxDate) {

            if ((selectMonth < 1 || selectMonth > 12) || (selectDay < 1 || selectDay > 31) || ((selectMonth == 4 || selectMonth == 6 || selectMonth == 9 || selectMonth == 11) && selectDay == 31) || (selectYear < $minYear) || (newFormatEnteredDate > $maxDate) || (newFormatEnteredDate < $minDate)) {
                return false;
            } else if ((selectDay <= 9 && selectDay[0] != 0) || (selectMonth <= 9 && selectMonth[0] != 0)) {
                // checking leading zero when date/month is less than or equal to 9
                return false;
            } else if (selectMonth == 2) {
                var isleap = (selectYear % 4 == 0 && (selectYear % 100 != 0 || selectYear % 400 == 0));
                if (selectDay > 29 || (selectDay == 29 && !isleap)) {
                    return false;
                }
            } else if ((newFormatEnteredDate.getDay() == 0 || newFormatEnteredDate.getDay() == 6) && $disableWeekend ){
                return false;
            } else {
                return true;
            }
        }

    }

    $(function() {
        document.querySelectorAll('[data-js-component="date-picker"]').forEach(function(ele) {
            new DatePicker(ele);
        });
    })

};

const subscriptionId = new URLSearchParams(document.location.search).get('subscriptionId');
if(subscriptionId) {
  const intervalId = setInterval(() => {
    const test = JSON.parse(localStorage.getItem('dateRange'));
    if(test) {
      DataPickerFn();
      clearInterval(intervalId);
    }
  }, 1500)
  setTimeout(() => {
    clearInterval(intervalId);
  }, 15000)
} else {
  DataPickerFn();
}
