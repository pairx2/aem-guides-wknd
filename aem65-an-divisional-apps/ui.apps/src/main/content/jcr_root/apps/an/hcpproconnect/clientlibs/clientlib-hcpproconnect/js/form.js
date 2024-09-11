let url = window.location.href;
$("#conemail").parent().parent().append(`<span class="form-text a-input-field--text-require matchemail"><em class="abt-icon-exclamation"></em>Email does not match</span>`);
$(".matchemail").hide();

$("#conSecondEmail").parent().parent().append(`<span class="form-text a-input-field--text-require secondMatchemail"><em class="abt-icon-exclamation"></em>Email does not match</span>`);
$(".secondMatchemail").hide();

$('#secondaryEmail, #conSecondEmail').on("input", function () {
  validateConfirmPassword('#secondaryEmail', '#conSecondEmail','.secondMatchemail', false);
  toggleSecondaryRequired($('#secondaryEmail').val());
});

$('#email, #conemail').on("input", function () {
  validateConfirmPassword('#email', '#conemail','.matchemail', true);
});

let json = localStorage.getItem("userProfile");
let submitButton = $('#email').parents('form').find(':submit');
let jsonArray;

if (json !== null && json !== 'undefined') {
  jsonArray = JSON.parse(json);
}


function validateConfirmPassword(emailId, conEmailId, matchemailClass, isRequired) {
  let confirmEmailValue = $(conEmailId).val();
  let emailValue = $(emailId).val();
  if(!isRequired && emailValue == '' && confirmEmailValue == '') {
      $(matchemailClass).hide();
      $(conEmailId).css('border-color', '#d9d9d6');
      $(matchemailClass).removeClass('showError');
      $(matchemailClass).parent().removeClass('validation-error');
      return;
  }
  if (confirmEmailValue != '') {
    if ((emailValue != confirmEmailValue)) {
      $(matchemailClass).show();
      $(matchemailClass).parent().addClass('validation-error');
      $(conEmailId).css('border-color', '#e4002b');
    } else {
      if (url.indexOf("profile-overview") > -1) {
        if (jsonArray.userInfo.email == emailValue && jsonArray.userInfo.email == confirmEmailValue) {
          setTimeout(function () {
            submitButton.prop("disabled", true);
          }, 200);
        } else {
          setTimeout(function () {
            submitButton.prop("disabled", false);
          }, 200);
        }
      }

      clearMatchEmailValidation(matchemailClass, conEmailId);
    }
  }
}

verifyEachField('#conemail','.matchemail');
verifyEachField('#conSecondEmail','.secondMatchemail');

function verifyEachField(conEmailId, matchemailClass) {
  if ($(conEmailId)[0]) {
    let getForm = $(conEmailId).parents('form')

    getForm.find(':input').on("input", function () {
      checkMessageActive(matchemailClass);
    });

    function checkMessageActive(matchemail) {
      if ($(matchemail).is(":visible")) {
        submitButton.addClass('disabled').css('pointer-events', 'none');
      } else {
        submitButton.removeClass('disabled').css('pointer-events', '');
      }
    }
  }
}
//for fix
function clearMatchEmailValidation(matchemailClass, conEmailId) {
    $(matchemailClass).hide();
    $(conEmailId).css('border-color', '#d9d9d6');
    $(matchemailClass).removeClass('showError');
    $(matchemailClass).parent().removeClass('validation-error');
}

function toggleSecondaryRequired(textValue) {
    if(textValue) {
        $('#custom-required-mark').remove();
        $('#custom-required-text').remove();
        let requiredMark = $(`<span class="a-input-field--required" id="custom-required-mark">*</span>`);
        let requiredErrorText = $(`<span class="form-text a-input-field--text-require" id="custom-required-text">
                                    <em class="abt-icon abt-icon-exclamation"></em>Please confirm your email address</span>`);
        $('#conSecondEmail').parents('.a-input-field').removeAttr('data-required');
        $('#conSecondEmail').parents('.a-input-field').attr('data-required', 'true');
        $('#conSecondEmail').attr("required", "true");
        $('#conSecondEmail').parent().siblings('.form-label.a-input-label').append(requiredMark);
        $('.secondMatchemail').after(requiredErrorText);
    } else {
        $('#conSecondEmail').parents('.a-input-field').removeAttr('data-required');
        $('#conSecondEmail').attr("required", "false");
        $('#conSecondEmail').parents('.form-group.a-form-grp').removeClass('validation-require');
        $('#custom-required-mark').remove();
    }
}

$(".a-input-field--text-require").each(function() {
  if ($(this).find("em").length === 0) {
    $(this).prepend('<em class="abt-icon abt-icon-exclamation"></em>');
  }
});