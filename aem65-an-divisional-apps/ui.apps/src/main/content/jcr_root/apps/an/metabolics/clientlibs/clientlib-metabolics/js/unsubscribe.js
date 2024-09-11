let appJson = "application/json";
let country_code = $("input[name='x-country-code']").val();
let application_id = $("input[name='x-application-id']").val();
let preffered_language = $("input[name='x-preferred-language']").val();
let unsubscription_url;
let confirm_unsubscribe = document.querySelector('[name="thankyouPage"]').value;

$(document).ready(function () {

    $("#unsubscribeForm").find(".o-form-container__error-msg").addClass("errorunsub");
    $("#unsubEmailAddress").attr({ maxLength: 64 });
    $("#unsubConfirmEmailAddress").attr({ maxLength: 64 });

    unsubscription_url = $("#unsubscribeForm").find(".o-form-container__main-form").prop("action");
    $("#unsubscribeForm").find(".o-form-container__main-form").attr('action', '');

    $("#unsubscribeButton").click(function (event) {
        event.preventDefault();
    });
});


//keyupfunction function for validating email adress.
$("#unsubConfirmEmailAddress,#unsubEmailAddress").on("keyup change blur", function () {

    if ($("#unsubEmailAddress").val() != $("#unsubConfirmEmailAddress").val() && $("#unsubConfirmEmailAddress").val() != '') {
        $("p.validationmsg").css({ "display": "block", "color": "rgb(228, 0, 43)" });
        $("#unsubscribeButton").attr("disabled", "disabled");
        setTimeout(function () {
            $("#unsubscribeButton").attr("disabled", true)
        }, 25)

    }
    else if ($("#unsubEmailAddress").val() == "" || $("#unsubConfirmEmailAddress").val() == "") {
        $("p.validationmsg").css("display", "none");
        $("#unsubscribeButton").attr("disabled", "disabled");
    }
    else {
        $("p.validationmsg").css("display", "none");
        $("#unsubscribeButton").removeAttr("disabled");
    }
});


function userUnSubscription(data) {
    const formDataJson = JSON.stringify(data);
    const commonPropsAjax = ajaxPropertyCommon(formDataJson, unsubscription_url);
    jQuery.ajax({
        ...commonPropsAjax,
        success: function (results) {
            const { errorCode, status } = results;
            if (status && errorCode === 0) {
                $(".o-form-container__error-msg").hide();
                window.location = confirm_unsubscribe;
            }
        },
        fail: function (jqXHR, textStatus, error) {
            return false;
        }
    }).fail(function (jqXHR, textStatus, error) {
    });
}

// ajax common property function
function ajaxPropertyCommon(formDataJson, api_URL) {
    return {
        url: api_URL,
        method: "POST",
        headers: {
            "Content-Type": appJson,
            "x-country-code": country_code,
            "x-application-id": application_id,
            "x-preferred-language": preffered_language
        },
        data: formDataJson,
        dataType: "json",
        async: false,
        beforeSend: function () {
        }
    };
}

//click function on form submit capturing form data

$("#unsubscribeButton").click(function (e) {
    e.preventDefault();
    $(this).attr("disabled", "disabled");

    let formData = {

        userInfo: {
            email: jQuery("#unsubEmailAddress").val(),
        },

        action: jQuery("#actionValue").val(),

    };
    let gSiteKey = $('[data-site-key]').attr('data-site-key');
    if (typeof grecaptcha != 'undefined') {

        grecaptcha.ready(function () {
            grecaptcha.execute(gSiteKey, {
                action: 'submit'
            }).then(function (captcha) {
                formData['captchaValue'] = captcha;
                userUnSubscription(formData);
            }).catch(function (error) {


            });
        });

    }
});