/**
 * Get a free meter Form
 **/

$(function () {
    let getMeterForm = $(".free-meter-form-container");
    if (getMeterForm.length > 0) {
        $("#phone_number").mask('999-999-9999');

    }
});


function getErrorMessage() {
    $('.o-form-container__success-msg').hide();
    $('.error-msg-wrapper').css("display", "block");
    $('.error-msg-wrapper a').remove();
    $('.error-msg-wrapper').append("<a class='close-err-msg'></a>");
}

$(document).ready(function () {
    $(window).on("load",function () {
        if (sessionStorage.getItem("binNumber") != null && sessionStorage.getItem("groupNumber") != null && sessionStorage.getItem("memberNumber") != null) {
            let bin_number = $('#card_thankyou').find('p:first-child').find("a").text().replace("{bin}", sessionStorage.getItem("binNumber"));
            $('#card_thankyou').find('p:first-child').find("a").text(bin_number);
            let group_number = $('#card_thankyou').find('p:nth-child(2)').find("a").text().replace("{group}", sessionStorage.getItem("groupNumber"));
            $('#card_thankyou').find('p:nth-child(2)').find("a").text(group_number);
            let member_number = $('#card_thankyou').find('p:last-child').find("a").text().replace("{member}", sessionStorage.getItem("memberNumber"));
            $('#card_thankyou').find('p:last-child').find("a").text(member_number);
        }
    });
});
