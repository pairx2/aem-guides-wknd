/**********************************
Formcontainer component
**********************************/
//js to expand and collapse the checkboxes
$(document).ready(function () {
  // Verify if 'case' ID is present or not, if yes, then move it to class attribute
  if ($('[id*="case"]').length && isOnPublish()) {
    $('[id*="case"]').each(function () {
      let idList = $(this).attr("id").split(" ");
      let newIdList = idList.filter(function (val) {
        return val !== "case";
      });
      $(this).attr("id", newIdList);
      $(this).addClass("case");
    });
  }

  if ($(".form-newsletter-thankyou-page").length > 0 && isOnPublish()) {
    $("#form-option-expand-options").addClass("d-none");
    $("#form-option-open-options").on("click", function () {
      if (
        $("#form-option-open-options input.a-checkbox__input").is(":checked")
      ) {
        $("#form-option-expand-options").removeClass("d-none");
      } else {
        $("#form-option-expand-options").addClass("d-none");
      }
    });
  }

  //Auto populate date value in global optout form
  if ($(".form-global--optout").length > 0 && isOnPublish()) {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    let emailEle = $(".form-global--optout").find("#custemail");
    let address1Ele = $(".form-global--optout").find("#address1");
    let cityEle = $(".form-global--optout").find("#city");
    let postalCodeEle = $(".form-global--optout").find("#zip");
    let stateEle = $(".form-global--optout").find(
      '.a-dropdown__menu[name="state"]'
    );
    let emailPlaceHolder =
      emailEle.attr("placeholder").indexOf("*") > 1
        ? emailEle.attr("placeholder").slice(0, -1)
        : emailEle.attr("placeholder");
    let address1PlaceHolder =
      address1Ele.attr("placeholder").indexOf("*") > 1
        ? address1Ele.attr("placeholder").slice(0, -1)
        : address1Ele.attr("placeholder");
    let cityPlaceHolder =
      cityEle.attr("placeholder").indexOf("*") > 1
        ? cityEle.attr("placeholder").slice(0, -1)
        : cityEle.attr("placeholder");
    let postalCodePlaceHolder =
      postalCodeEle.attr("placeholder").indexOf("*") > 1
        ? postalCodeEle.attr("placeholder").slice(0, -1)
        : postalCodeEle.attr("placeholder");
    let statePlaceHolder =
      stateEle.prev().text().indexOf("*") > 1
        ? stateEle.prev().text().slice(0, -1)
        : stateEle.prev().text();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    emailEle.attr("placeholder", emailPlaceHolder + "*");
    address1Ele.attr("placeholder", address1PlaceHolder + "*");

    const formattedDate = String(mm) + String(dd) + String(yyyy);
    $(".form-global--optout .form-group .input-group #oodate").val(
      formattedDate
    );

    // As we don't have option to select maxlength from AEM authoring, we are setting from JS.
    setMaxLength("prefix", 5);
    setMaxLength("firstname", 30);
    setMaxLength("middlename", 30);
    setMaxLength("lastname", 30);
    setMaxLength("suffix", 5);
    setMaxLength("custemail", 60);
    setMaxLength("address1", 60);
    setMaxLength("address2", 60);
    setMaxLength("address3", 60);
    setMaxLength("city", 60);
    setMaxLength("zip", 10);
    setMaxLength("oosource", 60);
    setMaxLength("createdby", 60);

    // Setting limit for number,tel input fields
    limitNumberFieldsValue("ccc", 3);
    limitNumberFieldsValue("phone", 10);
    limitNumberFieldsValue("fax", 10);
    limitNumberFieldsValue("oodate", 8);

    function setMaxLength(inputId, maxLengthValue) {
      $(`.form-global--optout .form-group .input-group #${inputId}`).prop(
        "maxLength",
        maxLengthValue
      );
    }

    function limitNumberFieldsValue(inputId, maxLengthValue) {
      $(`.form-global--optout .form-group .input-group #${inputId}`).on(
        "input",
        function () {
          if ($(this).val().length >= maxLengthValue) {
            const value = $(this).val();
            $(this).val(value.substring(0, maxLengthValue));
          }
        }
      );
    }

    $(
      `.form-global--optout .o-form-container .form-container .fields .a-input-field .form-group .input-group .a-input-control`
    ).each(function () {
      $(this).on("change", function () {
        if ($(this).val().trim() !== "") {
          $(this).addClass("a-input-control--non-empty");
        } else {
          $(this).removeClass("a-input-control--non-empty");
        }
      });
    });

    $('.form-global--optout .btn[type="reset"]').on("click", function () {
      setTimeout(function () {
        $(".form-global--optout .form-group .input-group #oodate").val(
          formattedDate
        );
        $(
          `.form-global--optout .o-form-container .form-container .fields .a-input-field .form-group .input-group .a-input-control`
        ).each(function () {
          if ($(this).hasClass("a-input-control--non-empty")) {
            $(this).removeClass("a-input-control--non-empty");
          }
        });
      }, 300);
    });

    function emailRequired() {
      emailEle.attr("placeholder", emailPlaceHolder + "*");
      emailEle.attr("required", "");
      emailEle.parents(".a-input-field").attr("data-required", true);
      address1Ele.attr("placeholder", address1PlaceHolder);
      address1Ele.removeAttr("required");
      address1Ele.parents(".form-group").removeClass("validation-require");
      address1Ele.parents(".a-input-field").attr("data-required", false);
    }

    function emailNotRequired() {
      emailEle.attr("placeholder", emailPlaceHolder);
      emailEle.removeAttr("required");
      emailEle.parents(".form-group").removeClass("validation-require");
      emailEle.parents(".a-input-field").attr("data-required", false);
      address1Ele.attr("placeholder", address1PlaceHolder + "*");
      address1Ele.attr("required", "");
      address1Ele.parents(".a-input-field").attr("data-required", true);
      cityEle.attr("placeholder", cityPlaceHolder + "*");
      cityEle.attr("required", "");
      cityEle.parents(".a-input-field").attr("data-required", true);
      postalCodeEle.attr("placeholder", postalCodePlaceHolder + "*");
      postalCodeEle.attr("required", "");
      postalCodeEle.parents(".a-input-field").attr("data-required", true);
      stateEle.prev().text().indexOf(statePlaceHolder) !== -1 &&
        stateEle.prev().text(statePlaceHolder + "*");
      stateEle.parents(".a-input-field").attr("data-required", true);
    }

    function allAreRequired() {
      emailEle.attr("placeholder", emailPlaceHolder + "*");
      emailEle.attr("required", "");
      emailEle.parents(".a-input-field").attr("data-required", true);
      address1Ele.attr("placeholder", address1PlaceHolder + "*");
      address1Ele.attr("required", "");
      address1Ele.parents(".a-input-field").attr("data-required", true);
      cityEle.attr("placeholder", cityPlaceHolder + "*");
      cityEle.attr("required", "");
      cityEle.parents(".a-input-field").attr("data-required", true);
      postalCodeEle.attr("placeholder", postalCodePlaceHolder + "*");
      postalCodeEle.attr("required", "");
      postalCodeEle.parents(".a-input-field").attr("data-required", true);
      stateEle.prev().text().indexOf(statePlaceHolder) !== -1 &&
        stateEle.prev().text(statePlaceHolder + "*");
      stateEle.parents(".a-input-field").attr("data-required", true);
    }

    emailEle.on("change", function () {
      if ($(this).val().trim() !== "") {
        emailRequired();
      } else {
        if (
          address1Ele.val().trim() === "" &&
          cityEle.val().trim() === "" &&
          postalCodeEle.val().trim() === "" &&
          stateEle.find("li.selected").length == 0
        )
          allAreRequired();
        else emailNotRequired();
      }
    });

    address1Ele
      .add(cityEle)
      .add(postalCodeEle)
      .on("change", function () {
        if ($(this).val().trim() !== "" && emailEle.val().trim() === "") {
          emailNotRequired();
        } else {
          if (
            address1Ele.val().trim() === "" &&
            cityEle.val().trim() === "" &&
            postalCodeEle.val().trim() === "" &&
            stateEle.find("li.selected").length == 0
          )
            allAreRequired();
        }
      });

    stateEle.find("li").on("click", function () {
      if (emailEle.val().trim() === "") {
        emailNotRequired();
      } else {
        if (
          address1Ele.val().trim() === "" &&
          cityEle.val().trim() === "" &&
          postalCodeEle.val().trim() === ""
        )
          allAreRequired();
      }
    });
  }

  //Added extra class for input for detecting not empty input
  if (
    ($(".unsubscribe-form-style").length ||
      $(".sign-up-form-style").length ||
      $(".newslettersignup-form").length ||
      $(".contact-us--var-2").length) &&
    isOnPublish()
  ) {
    $(this)
      .find(".form-group .input-group .a-input-control")
      .on("input", function () {
        if ($(this).val().trim() !== "") {
          $(this).addClass("a-input-control--non-empty");
        } else {
          $(this).removeClass("a-input-control--non-empty");
        }
      });
  }

  //function to check checkbox and input value in newslettersignup form
  if ($(".newslettersignup-form").length > 0 && isOnPublish()) {
    setTimeout(function () {
      disableSubmitBtn(true);
      if (getItemSessionStorage("consentTypes") != "undefined") {
        let consentTypes = JSON.parse(getItemSessionStorage("consentTypes"));

        // Check the session value existance and check the checkboxes as needed
        consentTypes &&
          consentTypes.length &&
          consentTypes.forEach(function (consent) {
            let checkEle = $(".newslettersignup-form").find(
              `input[value=${consent.consentName}]`
            );
            if (checkEle.length) {
              consent.consentValue
                ? checkEle.prop("checked", true)
                : checkEle.prop("checked", false);
              checkBoxStatusUpdate(checkEle);
            }
          });
      }
      $(".newslettersignup-form .a-checkbox .a-checkbox__input").each(
        function () {
          $(this).change(function () {
            checkBoxStatusUpdate($(this));
          });
        }
      );
      $(
        ".newslettersignup-form .a-input-field .input-group .a-input-control"
      ).each(function () {
        $(this).on("input focusout", function () {
          setTimeout(
            function () {
              if (
                $(this).parents(".form-group").hasClass("validation-require") ||
                $(this).parents(".form-group").hasClass("validation-error") ||
                $(this).parents(".form-group").hasClass("validation-regex")
              ) {
                disableSubmitBtn(true);
              } else if ($(this).val().trim() !== "") {
                disableSubmitBtn(false);
              } else {
                if (isEveryCheckboxEmpty() && isEveryInputEmpty()) {
                  disableSubmitBtn(true);
                } else {
                  disableSubmitBtn(false);
                }
              }
            }.bind(this),
            300
          );
        });
      });
      function isEveryCheckboxEmpty() {
        if (
          $(".newslettersignup-form .a-checkbox .a-checkbox__input:checked")
            .length <= 0
        ) {
          return true;
        }
        return false;
      }
      function isEveryInputEmpty() {
        $(
          ".newslettersignup-form .a-input-field .input-group .a-input-control"
        ).each(function () {
          if ($(this).val().trim() !== "") {
            return false;
          }
        });
        return true;
      }

      function disableSubmitBtn(status) {
        $(
          '.newslettersignup-form .o-form-container__buttons .button .btn[type="submit"]'
        ).prop("disabled", status);
      }

      // Function to check the checkbox checked status
      function checkBoxStatusUpdate(ele) {
        if (ele.is(":checked")) {
          ele
            .parent()
            .addClass("a-checkbox--active")
            .children(".a-checkbox__custom")
            .attr("aria-checked", true);
          disableSubmitBtn(false);
        } else {
          ele
            .parent()
            .removeClass("a-checkbox--active")
            .children(".a-checkbox__custom")
            .attr("aria-checked", false);
          if (isEveryCheckboxEmpty() && isEveryInputEmpty()) {
            disableSubmitBtn(true);
          } else {
            disableSubmitBtn(false);
          }
        }
      }
    }, 1000);
  }

  //function for contact-us form to add error validation colors
  if ($(".contact-us-form").length > 0 && isOnPublish()) {
    validateContactUsFields("email");
    validateContactUsFields("name");
    validateContactUsFields("tel-home");
    validateContactUsFields("address");
    validateContactUsFields("referenceEmail");
    validateContactUsFields("verifyEmail");
    validateContactUsFields("fname");
    validateContactUsFields("lname");
    validateContactUsFields("zipcode");
    validateContactUsFields("message");

    function validateContactUsFields(id) {
      const mandatoryFieldIds = [
        "email",
        "name",
        "address",
        "tel-home",
        "referenceEmail",
        "verifyEmail",
        "fname",
        "lname",
        "zipcode",
        "message",
      ];

      $(
        `.contact-us-form .o-form-container .form-container .fields .a-input-field .form-group .input-group .a-input-control`
      ).each(function () {
        $(this).on("focusin", function () {
          $(this).addClass("input-control--focus");
        });

        $(this).on("focusout", function () {
          $(this).removeClass("input-control--focus");
        });
      });
      $(
        `.contact-us-form .o-form-container .form-container .fields .a-input-field .form-group .input-group .a-input-control#${id}`
      ).on("change", function () {
        if (mandatoryFieldIds.includes(id)) {
          if ($(this).val().trim() !== "") {
            $(this).addClass("input-control--non-empty");
          } else {
            $(this).removeClass("input-control--non-empty");
          }
        }
      });
      $(
        `.contact-us-form .o-form-container .form-container .fields .a-input-field .form-group .input-group .a-input-control#${id}`
      ).on("input", function () {
        if (mandatoryFieldIds.includes(id) && id === "tel-home") {
          if ($(this).val().length > 10) {
            $(this).addClass("form-input--num-exceed");
          } else {
            $(this).removeClass("form-input--num-exceed");
          }
        }
      });
      $(
        `.contact-us-form .o-form-container .o-form-container__buttons .button .btn#reset`
      ).on("click", function () {
        $(
          `.contact-us-form .o-form-container .fields .a-input-field .form-group .input-group .a-input-control`
        ).each(function () {
          if ($(this).hasClass("input-control--non-empty")) {
            $(this).removeClass("input-control--non-empty");
          }
          if ($(this).hasClass("form-input--num-exceed")) {
            $(this).removeClass("form-input--num-exceed");
          }
        });

        $(
          `.contact-us-form .o-form-container .fields .a-input-field .form-group.validation-require`
        ).each(function () {
          if ($(this).hasClass("validation-require")) {
            $(this).removeClass("validation-require");
          }
        });

        $(
          `.contact-us-form .o-form-container .fields .a-input-field .form-group.validation-regex`
        ).each(function () {
          if ($(this).hasClass("validation-regex")) {
            $(this).removeClass("validation-regex");
          }
        });

        $(
          `.contact-us-form .o-form-container .fields .a-input-field .form-group.validation-error`
        ).each(function () {
          if ($(this).hasClass("validation-error")) {
            $(this).removeClass("validation-error");
          }
        });
        $(
          ".contact-us-form .o-form-container .form-container .options .a-dropdown .a-dropdown__field"
        ).each(function () {
          $(this).parent().removeClass("a-dropdown--valid");
          $(this).parent().removeClass("a-dropdown--error");
          $(this).parent().removeClass("a-dropdown--focus");
        });
      });
    }
    $(
      `.contact-us-form .o-form-container .form-container .options .a-dropdown .a-dropdown__field`
    ).each(function () {
      $(this).on("click", function () {
        $(this).parent().addClass("a-dropdown--focus");
        if ($(this).parent().hasClass("a-dropdown--valid")) {
          $(this).parent().removeClass("a-dropdown--valid");
        }
        if ($(this).children(".a-dropdown-selected").length) {
          $(this).parent().removeClass("a-dropdown--error");
        }
      });

      $(this).on("focusout", function () {
        $(this).parent().removeClass("a-dropdown--focus");
        $(this).parent().removeClass("a-dropdown--valid");
        $(this).parent().removeClass("a-dropdown--error");
        const isDropdownSelected = $(this).children(
          ".a-dropdown-selected"
        ).length;
        if (isDropdownSelected) {
          $(this).parent().addClass("a-dropdown--valid");
        } else {
          $(this).parent().addClass("a-dropdown--error");
        }
      });
    });
  }

  // EDUPO form
  if ($(".form-variation--eudpo").length > 0 && isOnPublish()) {
    // Delay the code by 1 sec so that platform code would run and upload field would be ready
    setTimeout(function () {
      let establishYourIdentityEle = $(".form-variation--eudpo").find(
        '.a-input-control[name="EstablishyourIdentity"]'
      );
      let hasRequiredAttr =
        typeof establishYourIdentityEle.attr("required") != undefined &&
        establishYourIdentityEle.attr("required") !== false
          ? true
          : false;
      if (hasRequiredAttr) {
        establishYourIdentityEle.removeAttr("required");
        establishYourIdentityEle
          .parents(".a-input-field")
          .removeAttr("data-required");
      }
      establishYourIdentityEle.parents(".fields.text").addClass("d-none");
      let fileUploaderLabelEle = $(".form-variation--eudpo").find(
        ".m-file-uploader .filepond--drop-label .m-file-uploader__label-action"
      );
      let fileUploaderLabel = fileUploaderLabelEle.text();
      let fileUploaderLabelRequired = fileUploaderLabel + "*";
      let fileUploaderLabelWithOptional = fileUploaderLabel + " (optional)";
      fileUploaderLabelEle.text(fileUploaderLabelWithOptional);

      $(".form-variation--eudpo")
        .find('ul[name="ConfirmDataSubject"] li')
        .on("click", function () {
          let dataVal = $(this).attr("data-optionvalue").toLowerCase();
          if (dataVal === "no") {
            hasRequiredAttr && establishYourIdentityEle.attr("required", "");
            if (hasRequiredAttr) {
              establishYourIdentityEle.attr("required", "");
              establishYourIdentityEle
                .parents(".a-input-field")
                .attr("data-required", "true");
            }
            establishYourIdentityEle
              .parents(".fields.text")
              .removeClass("d-none");
          } else {
            if (hasRequiredAttr) {
              establishYourIdentityEle.removeAttr("required");
              establishYourIdentityEle
                .parents(".a-input-field")
                .removeAttr("data-required");
            }
            establishYourIdentityEle.parents(".fields.text").addClass("d-none");
          }
        });

      $(".form-variation--eudpo")
        .find('ul[name="IwishTo"] li')
        .on("click", function () {
          let dataVal = $(this).attr("data-optionvalue");
          if (dataVal === "upload data") {
            fileUploaderLabelEle.text(fileUploaderLabelRequired);
            $(".form-variation--eudpo")
              .find(
                '.m-file-uploader div[data-js-component="file-upload"] .filepond--browser'
              )
              .attr("required", "");
            $(".form-variation--eudpo")
              .find('.m-file-uploader div[data-js-component="file-upload"]')
              .attr("data-required", "true");
          } else {
            fileUploaderLabelEle.text(fileUploaderLabelWithOptional);
            $(".form-variation--eudpo")
              .find(
                '.m-file-uploader div[data-js-component="file-upload"] .filepond--browser'
              )
              .removeAttr("required");
            $(".form-variation--eudpo")
              .find('.m-file-uploader div[data-js-component="file-upload"]')
              .removeAttr("data-required");
          }
        });

      $(".form-variation--eudpo")
        .find('.btn[type="reset"]')
        .on("click", function () {
          $(".form-variation--eudpo")
            .find(".m-file-uploader__removefile")
            .click();
        });
    }, 1000);
  }

  //Verify email based on email provided
  //Verify email ID field to have ID: verifyEmail
  //Email ID to compare with to have ID: referenceEmail
  if (
    $("#verifyEmail").length &&
    $("#referenceEmail").length &&
    isOnPublish()
  ) {
    $("#verifyEmail, #referenceEmail").on("keyup change input", function () {
      let verifyEmailHTML = $(this)
        .parents(".form-container")
        .find("#verifyEmail");
      let verifyEmailVal = verifyEmailHTML.val().toLowerCase();
      let referenceEmailVal = $(this)
        .parents(".form-container")
        .find("#referenceEmail")
        .val()
        .toLowerCase();

      // Settimeout to let the platform code run first
      setTimeout(function () {
        if (
          verifyEmailVal &&
          verifyEmailVal.length &&
          referenceEmailVal &&
          referenceEmailVal.length &&
          referenceEmailVal !== verifyEmailVal
        ) {
          verifyEmailHTML
            .parents('div[data-component="input-field"]')
            .addClass("validation-error");
        } else {
          verifyEmailHTML
            .parents('div[data-component="input-field"]')
            .removeClass(
              "validation-error validation-require validation-regex"
            );
        }
      }, 200);
    });
  }

  /* On click of Reset button, all the error messages has to be cleared */
  /* Applying the event on document so that this applies to form inside popup/xf as well */
  $(document).on("click", '.btn[type="reset"]', function () {
    $(this)
      .parents(".formcontainer")
      .find(".validation-error")
      .removeClass("validation-error");
    $(this)
      .parents(".formcontainer")
      .find(".validation-require")
      .removeClass("validation-require");
    $(this)
      .parents(".formcontainer")
      .find(".validation-regex")
      .removeClass("validation-regex");
  });

  /* Form to be hidden as it will be trigger from JS */
  if (isOnPublish() && $("#triggerFormForNewUser").length) {
    $("#triggerFormForNewUser").parent().hide(); // ID to be used inside the hidden form container
  }

  /* Copywrite contact us form */
  $(".a-dropdown__menu").click(function () {
    var that = this;
    setTimeout(function () {
      if (
        $($(that).parent().find(".a-dropdown-selected")).length &&
        isOnPublish()
      ) {
        $(that).parent().addClass("active-selection");
      }
    }, 1000);
  });
  $("button[type='reset']").click(function () {
    $(".container-variation--copyright input[required]").removeClass(
      "valid-input"
    );
    $(".container-variation--copyright .a-dropdown__field").removeClass(
      "active-selection"
    );
  });
  $(".container-variation--copyright input[required]").keyup(function () {
    if ($(this).val().length > 0) {
      $(this).addClass("valid-input");
    } else {
      $(this).removeClass("valid-input");
    }
  });

  $(".container-variation--copyright .tooltips").each(function () {
    $(this).parent().parent().parent().parent().addClass("tooltip-fields");
  });
});
