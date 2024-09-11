let overlayLoader = jQuery("#overlay");
let appJson = "application/json";
let country_code = $("input[name='x-country-code']").val();
let application_id = $("input[name='x-application-id']").val();
let preffered_language = $("input[name='x-preferred-language']").val();
let thank_you_page = document.querySelector('[name="thankyouPage"]').value;
let subscription_url;
let maxProductSelected = jQuery("#maxProductErrorMessage").val();
let emailduplication_error = jQuery("#emailAddressError").val();
let checked_product;
let product_Lvl;

let checkboxList = [];
let productName;


//  error message function on checkbox selection
function Check(e, index, level, product) {

    if (!e.checked) {
        checkboxList = [];
        $(".errormsg_maxproducts").html(
            "<span class='maxproducterror'>" + maxProductSelected + "</span>"
        );
    }
    if (e.checked && checkboxList.length === 0) {
        checkboxList.push({ id: e.id, selectedVal: e.checked, index: index });
        window.localStorage.setItem("product_level", level);
        checked_product = $('#productCheckboxes input.a-checkbox__input:checked').val();
        productName = product;
    } else {
        $(".errormsg_maxproducts").html(
            "<span class='maxproducterror'>" + maxProductSelected + "</span>"
        );
        e.checked = false;
        return;
    }

    if ($(".errormsg").html()) {
        $(".errormsg").html("");
    }

    if ($(".errormsg_maxproducts").html()) {
        $(".errormsg_maxproducts").html("");
    }
}



function getValueOrDefault(paramVal) {
    return paramVal === null ? "" : paramVal;
}

function getBooleanValue(paramVal) {
    return !(paramVal === undefined || paramVal === null || paramVal === "undefined");
}

function getAddressVal(paramVal, googleVal) {
    return paramVal ? paramVal.trim() : googleVal.trim();
}

function getAddressOption(addr) {
    return addr.length > 1 ? addr[0] : jQuery(addrLineOne).val();
}

// utm parameters
const queryString = new URLSearchParams(window.location.search);
const parameters = {};
for (let value of queryString.keys()) {
    parameters[value] = queryString.get(value);
}
const keys = Object.keys(parameters);
const reqparams = ["utm_campaign", "utm_source", "utm_content", "utm_term", "utm_medium"];
if (keys.length > 0) {
    keys.forEach(e => {
        if (reqparams.includes(e)) {
            sessionStorage.setItem('MediaTracking', JSON.stringify(parameters));
        }

    })
}

// function for user subscription api call    
function userSubscription(data) {
    const formJsonData = JSON.stringify(data);
    const commonAjaxProps = ajaxCommonProperty(formJsonData, subscription_url);
    jQuery.ajax({
        ...commonAjaxProps,
        success: function (results) {
            checkboxList = [];
            $("#submit").removeAttr("disabled");
            const { errorCode, status, response } = results;
            if (status && errorCode === 0) {
                window.location = thank_you_page;
            } else if (status && errorCode === 400 && response.i18nMessageKey === "REG-USER-1030") {
                $('.o-form-container__error-msg').show();
                $(".o-form-container__element").append("<div class='emailMsgError'>" + emailduplication_error + "</div>");
                $(".a-dropdown-selected").replaceWith("<span class=a-dropdown__placeholder>State</span>");
                $(".a-dropdown__menu").find(".selected").removeClass("selected");
                $("#submit").attr("disabled", true);
            }
            else {
                $('.o-form-container__error-msg').show();
                $(".a-dropdown-selected").replaceWith("<span class=a-dropdown__placeholder>State</span>");
                $(".a-dropdown__menu").find(".selected").removeClass("selected");
            }
        },
        fail: function (jqXHR, textStatus, error) {
            checkboxList = [];
            $("#submit").removeAttr("disabled");
            $('.o-form-container__error-msg').show();
            $(".a-dropdown-selected").replaceWith("<span class=a-dropdown__placeholder>State</span>");
            $(".a-dropdown__menu").find(".selected").removeClass("selected");
            return false;
        }
    }).fail(function (jqXHR, textStatus, error) {
        $("#submit").removeAttr("disabled");
        $('.o-form-container__error-msg').show();
        $(".a-dropdown-selected").replaceWith("<span class=a-dropdown__placeholder>State</span>");
         $(".a-dropdown__menu").find(".selected").removeClass("selected");
    });
}

// ajax common property function
function ajaxCommonProperty(formJsonData, apiURL) {
    return {
        url: apiURL,
        method: "POST",
        headers: {
            "Content-Type": appJson,
            "x-country-code": country_code,
            "x-application-id": application_id,
            "x-preferred-language": preffered_language
        },
        data: formJsonData,
        dataType: "json",
        async: false,
        beforeSend: function () {
        }
    };
}

//click function on form submit capturing form data

$("#submit").click(function (e) {
    e.preventDefault();
    $(this).attr("disabled", "disabled");
    let date = new Date().toLocaleDateString();

    if (window.localStorage.getItem("product_level") === "level1") {
        product_Lvl = "L1";
    }
    else if (window.localStorage.getItem("product_level") === "level2") {
        product_Lvl = "L2";
    }

    let formData = {
        userInfo: {
            email: jQuery("#userEmailAddress").val(),
            firstName: jQuery("#userFirstName").val(),
            lastName: jQuery("#userLastName").val(),
            phoneNumber: jQuery("#userPhoneNumber").val(),
        },

        addresses: [
            {
                zipCode: jQuery("#userZipCode").val(),
                city: jQuery("#userCity").val(),
                state: $(".a-dropdown-selected").text().trim(),
                country: country_code,
                lineTwo: jQuery("#userAddressLine2").val(),
                street: jQuery("#userStreetAddress").val()
            }
        ],
        consents: [
            {
                consentName: document.querySelector('[name="opt-in"]').value,
                consentValue: document.querySelector('[name="opt-in"]').checked,
                consentUpdatedTime: date.split("/").join("-")
            }
        ],
        marketingParamInfo: [
            {
                marketingParamName: "utm_campaign",
                marketingParamValue: getValueOrDefault(queryString.get("utm_campaign")) ? getValueOrDefault(queryString.get("utm_campaign")) : ""
            },
            {
                marketingParamName: "utm_medium",
                marketingParamValue: getValueOrDefault(queryString.get("utm_medium")) ? getValueOrDefault(queryString.get("utm_medium")) : ""
            },
            {
                marketingParamName: "utm_content",
                marketingParamValue: getValueOrDefault(queryString.get("utm_content")) ? getValueOrDefault(queryString.get("utm_content")) : ""
            },
            {
                marketingParamName: "utm_source",
                marketingParamValue: getValueOrDefault(queryString.get("utm_source")) ? getValueOrDefault(queryString.get("utm_source")) : ""
            },
            {
                marketingParamName: "utm_term",
                marketingParamValue: getValueOrDefault(queryString.get("utm_term")) ? getValueOrDefault(queryString.get("utm_term")) : ""
            }

        ],
        productsSelected: [
            {
                productName: checked_product,
                productLevel: product_Lvl
            }
        ]
    };

    let gSiteKey = $('[data-site-key]').attr('data-site-key');
    if (typeof grecaptcha != 'undefined') {

        grecaptcha.ready(function () {
            grecaptcha.execute(gSiteKey, {
                action: 'submit'
            }).then(function (captcha) {
                formData['captchaValue'] = captcha;
                userSubscription(formData);
            }).catch(function (error) {

            });
        });

    }

});

function checkClass(){
    if ($(window).width() <= 800) {
        $("#productCheckboxes")
            .find(".col-12")
            .addClass("col-6");
        $("#productCheckboxes")
            .find(".col-6")
            .removeClass("col-12");
        let column = $("#productCheckboxes")
            .find(".col-6:nth-child(2)")
            .html();
        $("#productCheckboxes")
            .find(".col-6:first-child")
            .append(column);
        $("#productCheckboxes")
            .find(".col-6:nth-child(2)")
            .addClass("col2_rem");
        $(".col2_rem .options:lt(5)").remove();
        let cloumn2 = $("#productCheckboxes")
            .find(".col-6:nth-child(3)")
            .html();
        $("#productCheckboxes")
            .find(".col2_rem")
            .append(cloumn2);
        let cloumn3 = $("#productCheckboxes")
            .find(".col-6:nth-child(4)")
            .html();
        $("#productCheckboxes")
            .find(".col2_rem")
            .append(cloumn3);
        $("#productCheckboxes")
            .find(".col-6:nth-child(3)")
            .addClass("col3_rem");
        $("#productCheckboxes")
            .find(".col-6:nth-child(4)")
            .addClass("col4_rem");
        $("#productCheckboxes")
            .find(".col-6")
            .removeClass("col-12");
        $(".col3_rem ").remove();
        $(".col4_rem ").remove();
        $("#productCheckboxes")
            .find(".col-6:first-child")
            .addClass("col1_rem");
        $(".col1_rem  .options:last-child").remove();
    }
}
// logics to be applied on page load
$(document).ready(function () {

    $("#userEmailAddress").on("blur", function () {
        $(".emailMsgError").hide();
    });
    $(".a-dropdown__field").on("click", function () {
        $(".emailMsgError").hide();
    });

    $("#userFirstName").attr({ maxLength: 40 });
    $("#userLastName").attr({ maxLength: 40 });
    $("#userEmailAddress").attr({ maxLength: 64 });
    $("#userStreetAddress").attr({ maxLength: 85 });
    $("#userAddressLine2").attr({ maxLength: 50 });
    $("#userCity").attr({ maxLength: 40 });

    subscription_url = $("#subscribeForm").find(".o-form-container__main-form").prop("action");
    $("#subscribeForm").find(".o-form-container__main-form").attr('action', '');

    $("#submit").click(function (event) {
        event.preventDefault();
    });

    function checkFormValidation() {
        let isFormValid = true;
        $('.o-form-container__main-form input:required').each(function () {
            if ($(this).val() === '') {
                isFormValid = false;
            }
        });

        if (isFormValid && $('#productCheckboxes input.a-checkbox__input:checked').length > 0 && $(".a-dropdown__menu").find(".selected").text() != "") {

            if (document.querySelectorAll(".validation-error").length > 0) {
                $('button#submit').prop("disabled", true);
            }

            else if (document.querySelectorAll(".validation-regex").length > 0) {
                $('button#submit').prop("disabled", true);
            }
            else if (document.querySelectorAll(".validation-require").length > 0) {
                $('button#submit').prop("disabled", true);
            }
            else if(!document.querySelector("#spi-opt-in-options .a-checkbox__input").checked){
                $('button#submit').prop("disabled", true); 
            }
            else {
                $('button#submit').removeAttr("disabled");
            }

        } else {
            $('button#submit').attr("disabled", "disabled");
            $('button#submit').prop("disabled", true);
        }
    }

    $(document).click(function () {
        setTimeout(function () { checkFormValidation() }, 0)
    });

    $('input').keyup(function () {
        checkFormValidation();
    })

    $('.o-form-container__main-form .a-input-label').addClass('sr-only');
    checkClass();

    // form reset
    $("#reset").click(function (event) {
        $("#form-container").trigger("reset");
        $(".a-dropdown-selected").replaceWith("<span class=a-dropdown__placeholder>State</span>");
        localStorage.removeItem('product_level')
        checkboxList = [];
        $(".fields")
            .find(".form-group")
            .removeClass("validation-error");
        $(".fields")
            .find(".form-group")
            .removeClass("validation-regex");
        $(".fields")
            .find(".form-group")
            .removeClass("validation-require");
        $(".errormsg_maxproducts").hide();
    });

    // checkbox selection
    $('fieldset[id^="level"]')
        .find("input[type=checkbox]")
        .each(function () {
            $(this).on("change", function (e) {
                let product = $(this).val();
                let parentId = $(this)
                    .parent()
                    .parent()
                    .parent()
                    .attr("id");
                if (parentId && parentId.indexOf("level") >= 0) {
                    let level = parentId.split("-")[0];
                    let index = level.charAt(level.length - 1);
                    Check(e.currentTarget, index, level, product);
                }
            });
        });

});