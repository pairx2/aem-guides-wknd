// init function on page load
var fieldLoader = ".field-loader-userName";
var emailError = ".emailError";
var xIdToken = "x-id-token";
jQuery(document).ready(function() {
    window.sessionStorage.removeItem("scriptLoaded");
    jQuery(fieldLoader).hide();
    jQuery(emailError).hide();
    document
    .getElementById("email_id")
    .addEventListener("blur", verfiyUserExist);
    document
    .getElementById("email_id")
    .addEventListener("keyup", errorHandle);
    removeDisableForm();
    if(ABBOTT.cookie(xIdToken)){
        window.location.href = jQuery('#userProfile').val();
    }
});
    
    // Load social login
    document.addEventListener("DOMContentLoaded", function() {
       var setIcons = setInterval(function(){
        if (jQuery("#socialRegisterDiv").length > 0 && jQuery("#socialRegisterDiv_uiContainer").length === 0) {
            ABBOTT.socialLogin("", "socialRegisterDiv", onLogin, error);
        } else {
            jQuery('.field-loader.field-loader-socialIcons').hide();
            clearInterval(setIcons);
        }
       }, 100);
    })
    
    
    // Fast Register logic
    function dobFormat(cDate){
        const apiDate = new Date(cDate);
        var date = new Date(apiDate.getTime() + Math.abs(apiDate.getTimezoneOffset() *60000 ) );
        return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + 
        '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();  
    }
    
    function floatClass(selector) {
      jQuery(selector)
                    .parents(formGroupClass)
                    .find(formLabel)
                    .addClass(floatingLabelClass);
    
    }
    
    function fastRegister(){
        var fastReg = window.localStorage.getItem('registraionForm___API');
        var fastRegObj = JSON.parse(fastReg)
        fastRegObj.forEach(function(el){
        switch(el.name){
        case "userName" :
        jQuery('#email_id').val(el.value);
        floatClass('#email_id');
        break;
        case "firstName" :
        jQuery('#first-name').val(el.value);
        floatClass('#first-name');
        break;
        case "lastName" :
        jQuery('#last-name').val(el.value);
        floatClass('#last-name');
        break;
        case "anieProfileId" :
        jQuery('#anieProfileId').val(el.value);
        break;
        case "lineOne" :
        jQuery('#lineOne').val(el.value);
        floatClass('#lineOne');
        break;
        case "zipCode" :
        jQuery('#zipcode-id').val(el.value);
        floatClass('#zipcode-id');
        break;
        case "city" :
        jQuery('#city-id').val(el.value);
        floatClass('#city-id');
        break;
        case "state" :
        var stateTxt;
        jQuery('#state-id-options ul li').removeClass('selected');
        jQuery('#state-id-options ul li').each(function(){
        if(jQuery(this).data('optionvalue') === el.value){
            jQuery(this).addClass('selected');
            stateTxt =  jQuery(this).text();
        }
        });
        jQuery('#state-id-options').find('span.a-dropdown__placeholder').addClass('a-dropdown-selected').removeClass('a-dropdown__placeholder').text(stateTxt);
        jQuery('#state-id-options span.a-dropdown-selected').text(stateTxt);
        break;
        case "birthDate" :
        jQuery('input[name="birthdate"]').val(dobFormat(el.value));
        floatClass('input[name="birthdate"]');
         validateDate();
        break;
        }
        });
    
        formatAddressLineOne(jQuery(addrLineOne).val());
    }
    
    
    function formatAddressLineOne(lineOneAddr){
        var lOne = lineOneAddr.split(",");
        var updatedLineOne = `${lOne[0].trim()}, ${cityId.val()}, ${jQuery('#state-id-options ul li.selected').data('optionvalue')}, ${jQzipCode.val()}`;
        jQuery('#lineOne').val(updatedLineOne);
        jQuery('#lineTwo').val(lOne[1]);
        floatClass('#lineTwo');
        verfiyUserExist();
    }