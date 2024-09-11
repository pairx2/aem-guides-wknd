const searchtype = "PM";
const batterysearchtype = "BATTERY";
let modelNumber;
let serialNumber;
const laserAdhesion  = "LASER_ADHESION";
const ICDBattery  = "ICD_BATTERY";
const ICDBatterycd  = "CD";
const lookuptype = "PM_2023"
let entRecaptcha = ($('input[name=enterpriseRecaptcha]').val() === "true");

function UpdatePacemakerRequest(formData) {   

    setTimeout(function() { 
        loadercallback();
    }, 500);


    formData.body = {
        model: formData.body.model,
        serial: formData.body.serial,
        searchType: searchtype,
        lookupType: searchtype,
        captchaValue: formData.body["g-recaptcha-response"]
    }
    return formData;
}

function UpdatenewHeartmateRequest(formData) {   

    setTimeout(function() { 
        loadercallback();
    }, 500);


    formData.body = {
       model: formData.body.model.toUpperCase(),
        serial: formData.body.serial,
        searchType: 'HM3',
        lookupType: 'HEARTMATE_3',
        captchaValue: formData.body["g-recaptcha-response"],
        ...(entRecaptcha) && {captchaAction: "submit"},
        ...(entRecaptcha) && {captchaType: "ENT"}

    }
    return formData;
}

function UpdatenewPacemakerRequest(formData) {   

    setTimeout(function() { 
        loadercallback();
    }, 500);


    formData.body = {
        model: formData.body.model,
        serial: formData.body.serial,
        searchType: searchtype,
        lookupType: lookuptype,
        captchaValue: formData.body["g-recaptcha-response"]
    }
    return formData;
}

function UpdateLaserAdhesionRequest(formData) {  

    setTimeout(function() { 
        loadercallback();
    }, 500);


    formData.body = {
        model: formData.body.model,
        serial: formData.body.serial,
        searchType: searchtype,
        lookupType: laserAdhesion,
        captchaValue: formData.body["g-recaptcha-response"]
    }
    return formData;
}
function UpdateBatteryRequest(formData) {  

	setTimeout(function() { 
         loadercallback();
    }, 500);

    formData.body = {
        model: formData.body.model,
        serial: formData.body.serial,
        searchType: ICDBatterycd,
        lookupType: ICDBattery,
        captchaValue: formData.body["g-recaptcha-response"]
    }
    return formData;
}
function loadercallback(){
    $(".o-form-container__buttons").append('<div class="a-spinner" style="margin:85px 0 0 15px;"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>');
    $(".o-form-container__success-msg").find('p').hide();
}

function UpdateOnSuccess(res){
    let successResponse = res.response;

    $(".o-form-container__buttons").find('.a-spinner').remove();
    $(".o-form-container__success-msg").find('p').show();

    if(successResponse.serial && successResponse.model) {
		let successMsg = "<p>"+$("input[name='successMessage']").val() + "</p>";
        $('.o-form-container__success-msg').empty();
        $('.o-form-container__success-msg').append(successMsg);
        if($("input[name='successmessage']").length !=0){
             $('.o-form-container__success-msg').append("<p>" + $("input[name='successmessage']").val() + "</p>");
        }
    } else {
		let failureMsg = "<p>"+ $("input[name='failureMessage']").val() + "</p>";
		$('.o-form-container__success-msg').empty();
        $('.o-form-container__error-msg').empty();
        $('.o-form-container__error-msg').append(failureMsg);
        if($("input[name='failmessage']").length != 0){
	        $('.o-form-container__error-msg').append("<p>" + $("input[name='failmessage']").val() + "</p>");
        }
    }

}

function UpdateOnSuccessHeartmate(res){
    let successResponse = res.response;

    $(".o-form-container__buttons").find('.a-spinner').remove();
    $(".o-form-container__success-msg").find('p').show();

    if(successResponse.lookupType == true) {
		let successMsg = "<p>"+$("input[name='successMessage']").val() + "</p>";
        $('.o-form-container__success-msg').empty();
        $('.o-form-container__success-msg').append(successMsg);
        if($("input[name='successmessage']").length !=0){
             $('.o-form-container__success-msg').append("<p>" + $("input[name='successmessage']").val() + "</p>");
        }
    } else {
		let failureMsg = "<p>"+ $("input[name='failureMessage']").val() + "</p>";
		$('.o-form-container__success-msg').empty();
        $('.o-form-container__error-msg').empty();
        $('.o-form-container__error-msg').append(failureMsg);
        if($("input[name='failmessage']").length != 0){
	        $('.o-form-container__error-msg').append("<p>" + $("input[name='failmessage']").val() + "</p>");
        }
    }

}


function UpdateOnFail(responseError){

    $(".o-form-container__buttons").find('.a-spinner').remove();
    $(".o-form-container__error-msg").find('p').show();

		let failureMsg = "<p>"+ $("input[name='auth']").val() + "</p>";
        $('.o-form-container__error-msg').empty();
        $('.o-form-container__error-msg').append(failureMsg);
}

(function(){ 

    if($('#model-content-form').length > 0) {
        setTimeout(function () {
            document.querySelector("[name=model]")?.addEventListener('keyup', (event) => { 
                  modelNumber = event.target.value;     
            });
            document.querySelector("[name=serial]")?.addEventListener('keyup', (event) => { 
                    serialNumber = event.target.value;
            });
        }, 1000);
    }
    else {
        setTimeout(function () {

            document.querySelector("[name=model]")?.setAttribute('maxlength',4);
            document.querySelector("[name=model]")?.addEventListener('keyup', (event) => { 
                modelNumber = event.target.value;  
                if(event.target.value.length == 0) {
                    $('.o-form-container__error-msg').empty();
                    $('.o-form-container__success-msg').empty();
                $('.o-form-container__error-msg.active').empty();
                    $('.o-form-container__success-msg.active').empty();
                } 
                    event.target.value = event.target.value.slice(0,event.target.getAttribute('maxlength'));

            });
            document.querySelector("[name=serial]")?.addEventListener('keyup', (event) => { 
                serialNumber = event.target.value;
                if(event.target.value.length == 0) {
                    $('.o-form-container__error-msg').empty();
                    $('.o-form-container__success-msg').empty();
                $('.o-form-container__error-msg.active').empty();
                    $('.o-form-container__success-msg.active').empty();
                }
            });
            document.querySelector("[name=model]")?.addEventListener('keyup', (event) => { 
                let target = event.target; 
                if(event.target.id !== "modelnumber") {
                    if(event.target.value.length > 1 && event.target.value.length < 4) {
                        target.closest('.form-group').querySelector('.a-input-field--text-error').style.display = "block";
                    } 
                    else {
                        target.closest('.form-group').querySelector('.a-input-field--text-error').style.display = "none";
                    }
                }
            });
            document.querySelector("[name=serial]")?.addEventListener('keyup', (event) => { 
                let target = event.target; 
                if(event.target.value.length > 1 && event.target.value.length < 6) {
                    target.closest('.form-group').querySelector('.a-input-field--text-error').style.display = "block";
                } 
                else {
                target.closest('.form-group').querySelector('.a-input-field--text-error').style.display = "none";
            }

            });


        }, 1000);
    }
})();

function UpdateCompleteFunction() {
    document.querySelector("[name=model]").value = modelNumber;
    document.querySelector("[name=serial]").value = serialNumber;
}