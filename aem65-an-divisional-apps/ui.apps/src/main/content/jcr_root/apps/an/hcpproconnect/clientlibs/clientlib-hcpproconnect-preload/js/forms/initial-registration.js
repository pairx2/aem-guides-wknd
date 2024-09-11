const DCR_TYPE_NEW = 'New - New HCO';
const DCR_TYPE_EXISTING = 'New - Existing HCO';
let sampleRegistration = false;
let validatedEmail = false;

$(document).ready(function () {
    //thankyou page for autoconversion
    if(localStorage.hasOwnProperty("autoConversion") && !hasUrlParameter("isActivated")) {
        showLoading();
         let autoConversion =  localStorage.getItem("autoConversion");
        if(autoConversion == 'true') {
            $("#registration-success-message p").text($("#autoconversion-success-message").val());
        } else {
            $("#registration-success-message p").text($("#autoconversion-not-meet-success-message").val());
        }
         setTimeout(function () {
            hideLoading();
         }, 1000);
    }

    if ($("#initialRegistrationForm").length > 0) {
        if (isCountryCodeUK()) {
            $("#dropdown_label_regBillingStateSelect")
                .removeClass('a-dropdown__placeholder')
                .addClass('a-dropdown-selected');
            $("#initial-registration-popup-xf").remove();
            prepop();
        }
    }

    $('#initialregistrationmobilenumber').on('keyup', function () {
        let value = $(this).val();
        setTimeout(function () { }, 0);
        $(this).val($(this).attr("value") + value.substring(3));
    });

    enableRegbtn();
});

function enableRegbtn(){
    setTimeout(function() {
	    $('#registrationSubmit').removeAttr('disabled');
				  
		$( "#initialRegistrationForm input[type='text'], #initialRegistrationForm input[type='password'],#initialRegistrationForm input[type='email'],#initialRegistrationForm input[type='tel']" ).on( "keyup", function() {
			setTimeout(function() {
					$('#registrationSubmit').removeAttr('disabled');
			}, 100);	
		} );
		
		$( "#initialRegistrationFormPopup input[type='text'], #initialRegistrationFormPopup input[type='password'],#initialRegistrationFormPopup input[type='email'],#initialRegistrationFormPopup input[type='tel']" ).on( "keyup", function() {
			setTimeout(function() {
				$('#registrationSubmit').removeAttr('disabled');
			}, 100);	
		} );
		
		$( " #initialRegistrationForm .a-dropdown,  #initialRegistrationFormPopup .a-dropdown,#initialRegistrationForm input[type='checkbox'], #initialRegistrationFormPopup input[type='checkbox']" ).on("change", function() {
		    $('#registrationSubmit').removeAttr('disabled');
		});

		$( "body" ).on("click", function() {
		    $('#registrationSubmit').removeAttr('disabled');
		});
				
		$("#registrationSubmit span").click(function (){
			$('#registrationSubmit').removeAttr('disabled');
		
			let checkboxId='registrationAreaOfSpecialty';
			let checkboxOptions = $('#' + checkboxId + '-options');
			setTimeout(function () {
				if (checkboxOptions.length && checkboxOptions.is(":visible") && (checkboxOptions.find('.a-checkbox__custom[aria-checked=true]').length == 0) ) {
					checkboxOptions.addClass('validation-require');     
				}	
                scrolltoError();			
			}, 100);   
                
        });
       
    }, 100);
}

function scrolltoError(){
    let scrollTopHeight =$("#registrationSubmit"),
        scrollTopHeight2 =$("#registrationSubmit"),
        scrollTopHeight3 =$("#registrationSubmit");
    if ($(".a-input-field--text-require").is(":visible")) {
        scrollTopHeight = $('.a-input-field--text-require:visible:first').closest('.validation-require');
    }
    if ($(".checkbox--text-require").is(":visible")) {
        scrollTopHeight2 = $('.checkbox--text-require:visible:first').closest('.validation-require');
    }	
    if($(".a-input-field--text-regex").is(":visible")){
        scrollTopHeight3 = $('.a-input-field--text-regex:visible:first').closest('.validation-regex');
    }
    
    if($('#initialRegistrationFormPopup').length ==0){
		scrollTopHeight= Math.min($(scrollTopHeight).offset().top,$(scrollTopHeight2).offset().top,$(scrollTopHeight3).offset().top);
        $('html, body').animate({scrollTop: scrollTopHeight - $(".o-header__sticky-section").height() }, 2000);
    }
    else{
		scrollTopHeight= Math.min($(scrollTopHeight)[0].offsetTop,$(scrollTopHeight2)[0].offsetTop,$(scrollTopHeight3)[0].offsetTop);
        $('#initialRegistrationFormPopup').animate({ scrollTop: scrollTopHeight },2000); 
    }

}

/** Initial Registration -- starts**/
function userInfo_data(data,userRegDetails,phone){
    if (data.headers['x-country-code'] == "IN") {
        userRegDetails.userInfo['phone'] = phone.substring(1);
        userRegDetails.userInfo['licenseID'] = data.body.licenseID;

        if (data.body.orgName == undefined) {
            userRegDetails.userInfo['orgName'] = "";
        }
    }
    if (data.headers['x-country-code'] == "TH") {
        userRegDetails.userInfo['phone'] = phone.substring(1);
        userRegDetails.userInfo['licenseID'] = data.body.licenseID;
        userRegDetails.userInfo['preferredLanguage'] = data.body.preferredLanguage;
    }
    return userRegDetails;
}


function updateRequestInitialRegistration(data) {
    if (data.headers['x-secret-header'] || data.headers['x-secret-header'] == '') {
        data.headers['x-secret-header'] = $('#secretHeader').val();
    }
    const regionNames = new Intl.DisplayNames(
        ['en'], { type: 'region' }
    );

    let phone = data.body.phone;
    let country = regionNames.of(data.headers['x-country-code']);

    let userRegDetails;

    userRegDetails = {
        "userInfo": {
            "preregistration": true,
            "email": data.body.email,
            "title": data.body.title,
            "firstName": data.body.firstName,
            "lastName": data.body.lastname,
            "Postcode": data.body.postcode,
            "orgName": data.body.orgName,
            "billingStreet": $('#registrationStreet').val(),
            "billingCity": $('#registrationCity').val(),
            "billingState": $('#registrationState').val(),
            "role": data.body.role,
            "country": country,
            "dcrType": DCR_TYPE_NEW
        }
    }

    if (isCountryCodeUK()) {
        let isDcrTypeNew = localStorage.getItem('isDcrTypeNew');
        let dcrType = (isDcrTypeNew === 'true') ? DCR_TYPE_NEW : DCR_TYPE_EXISTING;
        let registrationDate = new Date();
        userRegDetails.userInfo['areaOfSpecialty'] = getMultiCheckboxValue("registrationAreaOfSpecialty", "; ");
        userRegDetails.userInfo['dcrType'] = dcrType;
        userRegDetails.userInfo['personalEmail'] = data.body.personalEmail ? data.body.personalEmail : "";
        userRegDetails.userInfo['orgNameText'] = data.body.orgNameText ? data.body.orgNameText : "";
        userRegDetails.userInfo['phone'] = phone;
        userRegDetails.userInfo['dcrRecordType'] = "01209000000afHzAAI";
        userRegDetails.userInfo['portalRegistrationDateTime'] = registrationDate.toISOString();
        userRegDetails.userInfo['id'] = country;
        userRegDetails.userInfo['orgName'] = data.body.orgName ? data.body.orgName : "";
        userRegDetails.userInfo['password'] = data.body.password ? data.body.password : "";

        if ($("#flavour-container").length > 0) {
            sampleRegistration = true;
            validatedEmail = isWhiteListDomain(data.body.email);
            userRegDetails.userInfo['sampleRegistration'] = "true";
            userRegDetails.userInfo['validatedEmail'] = validatedEmail.toString();
        }
    }

    userRegDetails = userInfo_data(data,userRegDetails,phone);


    userRegDetails['captchaValue'] = data.body['g-recaptcha-response'];

    sessionStorage.removeItem('lite-user');
    data.body = userRegDetails;
    return data;
}

function onBeforeInitialRegistration() {
    if($("#initialRegistrationFormPopup").length > 0) {
        $("#page-spinner").addClass('page-spinner-popup');
    }
    showLoading();
}

function sampleRegistration_list(){
    if(sampleRegistration) {
        if(validatedEmail) {
            localStorage.setItem("autoConversion","true");
        } else {
            localStorage.setItem("autoConversion","false");
        }
    }
}
function onSuccessInitialRegistration(data) {

    if (data.errorCode == 0) {
        hideLoading();
        localStorage.removeItem("autoConversion");
        sampleRegistration_list();
        if (data.response.hasOwnProperty('accountInfo')) {
            let salutions = data.response.accountInfo.userInfo.additionalProperties.title + " ";
            let name = "";

            if ($("input[name=x-country-code]").val() === "UK")
                name = data.response.accountInfo.userInfo.lastName;
            else
                name = data.response.accountInfo.userInfo.firstName;

            sessionStorage.setItem("existingHcpName", salutions + name);

            let thankyouPage = $('input[name="thankyouPage"]')?.val();
            let existinhHcpThankyouPage = thankyouPage.replace("new", "existing");
            $('input[name="thankyouPage"]')?.val(existinhHcpThankyouPage);
        }
        sessionStorage.setItem('lite-user', 'true');
        hideLoading();
    } else if (data.errorCode == 400 && data.response.i18nMessageKey === "REG-USER-1034") {
        let thankyouExisting = $('input[name="thankyouPage"]')?.val();
        let existingHcpThankyouPage = thankyouExisting.replace("new", "existing");
        $('input[name="thankyouPage"]')?.val(existingHcpThankyouPage);
        $(".o-form-container__error-msg").hide();
        window.location.href = $('input[name="thankyouPage"]')?.val() + ".html";
    } else {
        onErrorInitialRegistration(data);
    }

    localStorage.removeItem('isDcrType');
}

function onErrorInitialRegistration(error) {
    if (error.errorCode == 400 && error.response.i18nMessageKey === "REG-USER-1034") {
        onSuccessInitialRegistration(error);
    } else {
        showApiError(error?.response);
    }

    hideLoading();
}
/**
**  Verify Email if part of the whitelist domains
**  email - email to be verified.
**/
function isWhiteListDomain_data(email,returnval){
   let whiteListDomain = /(@[a-z]+\.)nobles.dhss.gov.im$/g
    if (email.match(whiteListDomain)) {
        returnval = true;
    }
    whiteListDomain = /@mpft.nhs.uk$/g
    if (email.match(whiteListDomain)) {
        returnval = true;
    }
    whiteListDomain = /@hexagone.life$/g
    if (email.match(whiteListDomain)) {
        returnval = true;
    }  
    return returnval;
}
function isWhiteListDomain(email) {
    email = email.toLowerCase();
    let returnval=false;
    let whiteListDomain = /abbott.com$/g
    if (email.match(whiteListDomain)) {
        returnval = true;
    }
    whiteListDomain = /(@[a-z]+\.)nhs.net$/g
    if (email.match(whiteListDomain)) {
        returnval = true;
    }
    whiteListDomain = /(@[a-z]+\.)nhs.uk$/g
    if (email.match(whiteListDomain)) {
        returnval = true;
    }
    whiteListDomain = /(@[a-z]+\.)co.uk$/g
    if (email.match(whiteListDomain)) {
        returnval = true;
    }
    whiteListDomain = /(@[a-z]+\.)com$/g
    if (email.match(whiteListDomain)) {
        returnval = true;
    }
    whiteListDomain = /(@[a-z]+\.)uk$/g
    if (email.match(whiteListDomain)) {
        returnval = true;
    }
    whiteListDomain = /(@[a-z]+\.)org.uk$/g
    if (email.match(whiteListDomain)) {
        returnval = true;
    }
    whiteListDomain = /(@[a-z]+\.)net$/g
    if (email.match(whiteListDomain)) {
        returnval = true;
    }
    whiteListDomain = /(@[a-z]+\.)ac.uk$/g
    if (email.match(whiteListDomain)) {
        returnval = true;
    }
    whiteListDomain = /(@[a-z]+\.)gov.im$/g
    if (email.match(whiteListDomain)) {
        returnval = true;
    }
    whiteListDomain = /(@[a-z]+\.)hscni.net$/g
    if (email.match(whiteListDomain)) {
        returnval = true;
    }
    whiteListDomain = /@nhs.scot$/g
    if (email.match(whiteListDomain)) {
        returnval = true;
    }
    whiteListDomain = /(@[a-z]+\.)nhs.scot$/g
    if (email.match(whiteListDomain)) {
        returnval = true;
    }
    whiteListDomain = /@wales.nhs.uk$/g
    if (email.match(whiteListDomain)) {
        returnval = true;
    }
    returnval = isWhiteListDomain_data(email,returnval);
    return returnval;
}