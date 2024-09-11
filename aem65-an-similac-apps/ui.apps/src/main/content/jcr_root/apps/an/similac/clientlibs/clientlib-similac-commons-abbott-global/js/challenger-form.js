const EMPTY = 'empty';
const WEAK = 'weak';
const MEDIUM = 'medium';
const STRONG = 'strong';
const VERYSTRONG = 'verystrong';
const xIcon  = "abt-icon-cross";
const tickIcon = "abt-icon-tick"
var welcomePage;
//function to update the tooltip suggestions
function toolTipSuggestions() {
    var passwordVal = jQuery('#password').val();
    var hasNumber = new RegExp('[0-9]'); // digit only
    var hasUpperCase =  new RegExp('[A-Z]'); // uppercase
    var hasLowerCase =  new RegExp('[a-z]'); // lowercase
    var hasSpecialChar = new RegExp('[#?!@$%^&*-]') // spacial char
    //length check
    if(passwordVal.length > 7 && passwordVal.length < 26){
        jQuery('.indicator--minlen').removeClass(xIcon).addClass(tickIcon);
    } else{
        jQuery('.indicator--minlen').removeClass(tickIcon).addClass(xIcon);
    }
    //if password has number
    if(hasNumber.test(passwordVal)){
        jQuery('.indicator--number').removeClass(xIcon).addClass(tickIcon);
    } else{
        jQuery('.indicator--number').removeClass(tickIcon).addClass(xIcon);
    }
    //if password has alphabate with one upper case and one lowercase
    if(hasLowerCase.test(passwordVal) && hasUpperCase.test(passwordVal)){
        jQuery('.indicator--alpha').removeClass(xIcon).addClass(tickIcon);
    } else{
        jQuery('.indicator--alpha').removeClass(tickIcon).addClass(xIcon);
    }
    //if password has special char
    if(hasSpecialChar.test(passwordVal)){
        jQuery('.indicator--spchar').removeClass(xIcon).addClass(tickIcon);
    } else{
        jQuery('.indicator--spchar').removeClass(tickIcon).addClass(xIcon);
    }
}

// function check the password strength
function progressIndicator() {
    var pwd = jQuery("#password").val();
    var strongRegExp = new RegExp(jQuery("#isStrong").val());
    var medRegExp = new RegExp(jQuery("#isMedium").val());
    const isStrong = strongRegExp.test(pwd);
    if (pwd.length < 1) {
        jQuery('.password-progressbar .progress').removeClass(VERYSTRONG+' '+STRONG+' '+MEDIUM+' '+WEAK);
        jQuery('.password-progressbar .progress').addClass(EMPTY);
    }
    if (pwd.length >= 1 && !isStrong) {
        jQuery('.password-progressbar .progress').removeClass(VERYSTRONG+' '+STRONG+' '+MEDIUM);
         jQuery('.password-progressbar .progress:first-child').addClass(WEAK);
         jQuery('.password-progressbar .progress:not(:first-child)').addClass(EMPTY); 
    }
    if (pwd.length === 8 && isStrong) {
        jQuery('.password-progressbar .progress').removeClass(VERYSTRONG+' '+STRONG+' '+WEAK);
         jQuery('.password-progressbar .progress').addClass(EMPTY);
         jQuery('.password-progressbar .progress:nth-child(-n+2)').addClass(MEDIUM);
        
    }
    if (pwd.length >= 9 && isStrong) {
        jQuery('.password-progressbar .progress').removeClass(VERYSTRONG+' '+MEDIUM+' '+WEAK);
        jQuery('.password-progressbar .progress').addClass(EMPTY);
        jQuery('.password-progressbar .progress:nth-child(-n+3)').addClass(STRONG);
        if (medRegExp.test(value)) {
            jQuery('.password-progressbar .progress').removeClass(VERYSTRONG+' '+STRONG+' '+WEAK);
            jQuery('.password-progressbar .progress').addClass(EMPTY);
            jQuery('.password-progressbar .progress:nth-child(-n+2)').addClass(MEDIUM);
        }
    }
    if (pwd.length >= 11 && isStrong) {
        jQuery('.password-progressbar .progress').removeClass(MEDIUM+' '+STRONG+' '+WEAK);
        jQuery('.password-progressbar .progress').addClass(VERYSTRONG);
        if (medRegExp.test(value)) {
            jQuery('.password-progressbar .progress').removeClass(VERYSTRONG+' '+STRONG+' '+WEAK);
            jQuery('.password-progressbar .progress').addClass(EMPTY);
            jQuery('.password-progressbar .progress:nth-child(-n+2)').addClass(MEDIUM);
        }
    }
    
}

jQuery(document).on('click','#productName-options .a-radio--vertical',function(){
    let selectedRadio =  jQuery('#productName-options').find('input[name="product-name"]:checked').val();
    if(selectedRadio === "NEOSURE"){
        jQuery('.o-form-container__wrapper .form-container fieldset#premature-id-options').show(); 
    } else {
        jQuery('.o-form-container__wrapper .form-container fieldset#premature-id-options').hide();
    }
});

jQuery(document).on('click','#openAddress',function(){
    jQuery(this).parent().hide();
    jQuery('#challengerForm .lineTwo').show();  
});
// Functions releated to Challenger form starts
jQuery(document).ready(function() {
    if(isChallengerForm){
        jQuery('.passwordId .a-input-field--text-regex').addClass(D_NONE);
        jQuery('button.m-accordion__icon-wrapper').attr("type", "button");
        jQuery('#challengerForm .form-row.password-progressbar')
            .next('.form-row')
            .find('.col:first').addClass('col-9').removeClass('col');
    
        jQuery('#password').keyup(progressIndicator); // show progress indicator on password enter
        // call tooltip function
        jQuery('.tooltip-pwd .a-tooltip').on('click', toolTipSuggestions );
        jQuery('.tooltip-pwd .a-tooltip').hover(toolTipSuggestions);

        // change the redirection path
        welcomePage =  jQuery('#welcomePage').val();
        if(document.querySelector('input[name="product-name"]')){
            document.querySelectorAll('input[name="product-name"]').forEach(function(radioEle){
                radioEle.addEventListener("change", function(){
                    var birthDate = new Date(document.querySelector('input[name="birthdate"').value);
                    var currentDate = new Date();
                    var childWeeks = Math.ceil(
                        (currentDate - birthDate) / (7 * 24 * 60 * 60 * 1000)
                    );    
                    if(event.target.value.toUpperCase() === "ALIMENTUM"){
                        welcomePage = aliementumWelcomePage;
                        if(jQuery(formName).val().toUpperCase() !== "DIGITALREWARDS"){
                            document.querySelector('input[name="bonusOffer"]').checked = true;
                            document.getElementById('bonusOffer-options').style.display = 'none';
                        }
                        jQuery('#premature-id-options input').prop("checked", false);  
                    }
                    if(event.target.value.toUpperCase() === "NEOSURE"){
                        welcomePage = neosureWelcomePage;
                        if(jQuery(formName).val().toUpperCase() !== "DIGITALREWARDS"){
                            document.querySelector('input[name="bonusOffer"]').checked = true;
                            document.getElementById('bonusOffer-options').style.display = 'none';
                        }
                    }
                    if(event.target.value.toUpperCase().includes("STRONGMOMS")){
                        welcomePage = jQuery('#welcomePage').val();
                        if(childWeeks >= -39 && childWeeks <= 65){
                            document.getElementById('bonusOffer-options').style.display = 'block';
                        } else {
                            document.getElementById('bonusOffer-options').style.display = 'none';
                        }
                        jQuery('#premature-id-options input').prop("checked", false);
                    }
                });
            });
        }

        // Style the accordion for mobile
        if(window.screen.width < 768 ){
            if(document.getElementById('productName-options')){
                var radioDiv = jQuery('#productName-options  > div.a-radio').slice(0, 1);
                radioDiv.find('label').find('span:first').css({
                position : 'relative',
                    top: '20px',
                    left : '18px'
                });
                jQuery('#productName-options  > div.a-radio').slice(1,2).css('margin-top','16px');
            }
        }
        preSelectedAlimentumNeosure();
    } 
});

function preSelectedAlimentumNeosure(){
    //Logic to pre-select 'Alimentum' or 'NeoSure' on Core Registration Page
    let rewardURLstr = new URLSearchParams(window.location.search);
    let campaignValue = rewardURLstr.get("utm_campaign");
    if (campaignValue == 'sim-alimentum-hcp' || campaignValue == 'sim-neosure-hcp') {
        let RadioButtonChecked = jQuery('#productName-options').find('input[name="product-name"]:checked').val();
            if (RadioButtonChecked === 'STRONGMOMS1' || RadioButtonChecked === 'STRONGMOMS4') {
                jQuery('#bonusOffer-options').show();
            } else {
                jQuery('#bonusOffer-options').hide();
            }
        jQuery(".m-accordion__icon-wrapper").attr('aria-expand',"false");
        jQuery('.m-accordion__body.collapse').addClass("show");
        jQuery('.abt-icon-plus').parent().removeClass('icon-visible');
        jQuery('.abt-icon-minus').parent().addClass('icon-visible');
    }
    if (campaignValue == 'sim-alimentum-hcp') {
        let checkbox_alimentum = jQuery('#ALIMENTUM').next('input[type="radio"]');
        checkbox_alimentum.prop('checked', true);
    } else if (campaignValue == 'sim-neosure-hcp') {
        let checkbox_neosure = jQuery('#NEOSURE').next('input[type="radio"]');
        checkbox_neosure.prop('checked', true);
        jQuery('.o-form-container__wrapper .form-container fieldset#premature-id-options').show();
    }
}

// Functions to identify if birthdate enter as future date or not
function isFutureBirthDate() {
    var datePickerVal = jQuery('input[name="birthdate"]');
    var birthdate = datePickerVal.val();
    if (birthdate) {
        const dateVal = new Date(birthdate);
        if (new Date() < dateVal) {
            return true;
        }
        return false;
    }
}
