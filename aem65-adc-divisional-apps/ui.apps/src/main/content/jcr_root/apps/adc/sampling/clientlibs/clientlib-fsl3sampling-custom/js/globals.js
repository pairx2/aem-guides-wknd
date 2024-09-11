/* GLOBAL VARIABLES */

let timeOut = 30000;
let xApplicationId, xCountryCode, xPreferredLanguage, wcmmodeOff;

$(document).ready(function () {
    xApplicationId = $('input[name="x-application-id"]').val();
    xCountryCode = $('input[name="x-country-code"]').val();
    xPreferredLanguage = $('input[name="x-preferred-language"]').val();
    
    wcmmodeOff = $('#wcmMode').val() == 'true' ? false : true;
});