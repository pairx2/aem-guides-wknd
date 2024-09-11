/**
 * Consents and Questionnaire
 **/
$(document).ready(function () {

    //check if the page is questionnaire
    let fsl2WizardFormQuestionnaire = $('#fsl2WizardFormQuestionnaire');

    if(fsl2WizardFormQuestionnaire.length > 0 && wcmmodeOff) {
        //check cookies questionnaire and redirect to homepage if accesscode not existing
        checkCookie('questionnaire');
    }

    //hide all others input fields
    var inputOthers = fsl2WizardFormQuestionnaire?.find(':input[name$="::others"]');
    inputOthers.each(function () {
        if (wcmmodeOff) {
            $(this).closest('.a-input-field').hide();
        }
    });

    //check if the form-conatiner is consents check
    let fsl2ConsentsForm = $('#fsl2ConsentsForm');

    if(fsl2ConsentsForm.length > 0 && wcmmodeOff) {

        fsl2ConsentsForm?.closest('fieldset.o-wizard__content').find('.o-wizard__btn').hide();
    }
    //hide all questions
    for(var i=1;i<=$("#totalQuestions").val();i++){
        if($("#Q"+i+"-options")!=null){
            $("#Q"+i+"-options").hide();
        }
        else{
            break;
        }
    }

    fsl2WizardFormQuestionnaire?.find("fieldset:nth-child(4)")?.find('.o-wizard__btn')?.hide();
    fsl2WizardFormQuestionnaire?.find("fieldset:nth-child(4)")?.find("button[name='Continue']")?.hide();
    $("#nextAttemptQuestionnaire").hide();
    $("#incorrectQuestionnaire").hide();
    //attempts update
    if(getCookie("attempt2")!=""){
        $("#Q"+getCookie("Question")+"-options").hide();
        $("#questionaireSubmit").hide();
        $('#fsl2WizardFormQuestionnaire')?.find("fieldset:nth-child(4)")?.find('.o-wizard__btn')?.hide();
        if(getCookie("attempt3")!=""){
            $("#incorrectQuestionnaire").show();
        }else {
            $("#nextAttemptQuestionnaire").show();
        }
    }else if(getCookie("attempt1")!="" ){

        $("#Q"+getCookie("Question")+"-options").hide();
        $("#questionaireSubmit").hide();
        $('#fsl2WizardFormQuestionnaire')?.find("fieldset:nth-child(4)")?.find('.o-wizard__btn')?.hide();
        $("#nextAttemptQuestionnaire").show();

    }else{

        getNewQuestion($("#totalQuestions").val());

    }

	 // hide all dropdowns only in publish mode
    if(wcmmodeOff){
        hideAllDropdowns();
    }

});
//updateQuestions
function getNewQuestion(n){
    var currentQuesId = "#Q"+getCookie("Question")+"-options";
    $(currentQuesId).hide();
    $(currentQuesId+">div>label>input[type='radio']").attr("data-required",false);

    var randomQuesId =  randomizeQues(n);
    setCookie("Question",randomQuesId);
    randomQuesId = "#Q"+randomQuesId+"-options";
    $(randomQuesId).show();
    $(randomQuesId+">div>label>input[type='radio']").attr("data-required",true);
    $('#fsl2WizardFormQuestionnaire')?.find("fieldset:nth-child(4)")?.find('.o-wizard__btn')?.show();
    $("#questionaireSubmit").show();
    $("#questionaireSubmit").prop("disabled",true);
}
//Randomize
function randomizeQues(len){

    let rand = 0;
    do{
        rand = Math.floor(Math.random() * len) ;
    }while(rand==0 || rand==getCookie("attempt1") || rand ==getCookie("attempt2"));
    return rand;

}
//Enable submit button on question selection
$("input[type='radio']").on('change', function() {
    if($("#Q"+getCookie("Question")+"-options>div>label>input[type='radio']").is(":checked")){
        $("#questionaireSubmit").removeAttr("disabled");
    }else{
        $("#questionaireSubmit").prop("disabled",true);
    }
});

//on submit question
$("#questionaireSubmit").on("click", function(){
    //check answer
    if(getCookie("Question")!="" && $("#Q"+getCookie("Question")+"-options>div>label>input[type='radio']:checked").val()=="1"){
        deleteCookie("Question");
        deleteCookie("attempt1");
        deleteCookie("attempt2");
        deleteCookie("attempt3");
        $('#fsl2WizardFormQuestionnaire').find("fieldset:nth-child(4)").find('.o-wizard__btn').find("button[name='Continue']").trigger("click");
		 //Updating data layer changes for the questionaire success
        console.log("pushing the data layer updates for Qualifizierungsfrage Success");
        pushDataLayerUpdates('Pageview', '/de-de/qualifizierungsfrage-success','Qualifizierungsfrage Success');
        return;
    }else{
        //attempts update
        if(getCookie("attempt2")!=""){
            $("#Q"+getCookie("Question")+"-options").hide();
            setCookie("attempt3","1");
            $("#questionaireSubmit").hide();
            $('#fsl2WizardFormQuestionnaire')?.find("fieldset:nth-child(4)")?.find('.o-wizard__btn')?.hide();
			//pushing the data layer changes for the Qualifizierungsfrage Fail
    		console.log("pushing the data layer updates for Qualifizierungsfrage fail");
        	pushDataLayerUpdates('Pageview', '/de-de/qualifizierungsfrage-fail','Qualifizierungsfrage Fail');
            $("#incorrectQuestionnaire").show();
        }else if(getCookie("attempt1")!=""){
			//Updating data layer changes for the questionaire failure
			console.log("pushing the data layer updates for Qualifizierungsfrage Fail 2");
			pushDataLayerUpdates('Pageview', '/de-de/qualifizierungsfrage-try-2-fail','Qualifizierungsfrage-Fail-2');
            setCookie("attempt2",getCookie("Question"));
            $("#Q"+getCookie("Question")+"-options").hide();
            $("#questionaireSubmit").hide();
            $('#fsl2WizardFormQuestionnaire')?.find("fieldset:nth-child(4)")?.find('.o-wizard__btn')?.hide();
            $("#nextAttemptQuestionnaire").show();
        }else{
			//Updating data layer changes for the questionaire failure
			console.log("pushing the data layer updates for Qualifizierungsfrage Fail 1");
			pushDataLayerUpdates('Pageview', '/de-de/qualifizierungsfrage-try-1-fail','Qualifizierungsfrage-Fail-1');
            setCookie("attempt1",getCookie("Question"));
            $("#Q"+getCookie("Question")+"-options").hide();
            $("#questionaireSubmit").hide();
            $('#fsl2WizardFormQuestionnaire')?.find("fieldset:nth-child(4)")?.find('.o-wizard__btn')?.hide();
            $("#nextAttemptQuestionnaire").show();
        }
    }
});
//on retry attempt
$("#retryQuestionnaire").on("click", function(){
    $("#nextAttemptQuestionnaire").hide();
    getNewQuestion($("#totalQuestions").val());
});
//fsl3ConsentForm wizard button
function wizardNextButton(isdisable, isspinner, isShow) {

    var wizardBtn = $('#fsl2ConsentsForm').closest('fieldset.o-wizard__content').find('.o-wizard__btn');
    var wizNextBtn = wizardBtn.find('.button-div:not(.o-wizard__btn--back) .btn');

    if(isShow) {
        wizardBtn.css('display', 'flex');
    } else {
        wizardBtn.hide();
    }

    wizNextBtn.prop('disabled', isdisable);
    if (isspinner) {
        wizNextBtn.parents('.a-button').addClass('a-button--spinner');
    } else {
        wizNextBtn.parents('.a-button').removeClass('a-button--spinner');
    }

}


/** Consents and Questionnaire -- end**/

/** Device Check Drop down starts   **/

$('#deviceBrand-options li').click(function(){
    var deviceBrand = $(this).attr('data-optionvalue');
    var deviceOptions = deviceBrand + "Devices-options" ;
    hideAllDropdowns();
    $("#"+deviceOptions).show();

    $("#"+deviceOptions).click(function(){
        $("#sensorManualCheck").removeAttr('style');
    });
});

function hideAllDropdowns(){
    $("#samsungDevices-options").hide();
    $("#appleDevices-options").hide();
    $("#nokiaDevices-options").hide();
    $("#onePlusDevices-options").hide();
    $("#googleDevices-options").hide();
    $("#lgDevices-options").hide();
    $("#huaweiDevices-options").hide();
    $("#sonyDevices-options").hide();
    $("#xiaomiDevices-options").hide();
    $("#motorolaDevices-options").hide();
    $("#htcDevices-options").hide();
    $("#sensorManualCheck").attr('style', 'pointer-events:none;opacity: 0.5; background-color :#63666a');
}

/** Device Check Drop down ends   **/

/** Product selection starts here  **/

$('#sensorReader').click(function(e){
	 console.log("pushing the data layer updates for Sensor Reader Selection and Name and DOB");
     pushDataLayerUpdates('Pageview', '/de-de/anmelden-bestellen','Anmelden und Bestellen');
	 pushDataLayerUpdates('Pageview', '/de-de/registrieren','Name und Geburtsdatum');
     e.preventDefault();
     updateProduct("sensorReader");
     setCookie('productSel','SensorReader');
    });
/**
$('#onlySensor').click(function(e){
     e.preventDefault();
     updateProduct("sensor");
    });
**/
$('#sensorLanding').click(function(e){
	 console.log("pushing the data layer updates for Sensor Selection");
     pushDataLayerUpdates('Pageview', '/de-de/anmelden-bestellen','Anmelden und Bestellen');
     e.preventDefault();
     updateProduct("sensorLanding");
    });

$('#sensorSmartCheck').click(function(e){
     e.preventDefault();
	 //Pushing the data layer changes for the name and dob
     console.log("pushing the data layer updates for Name und Geburtsdatum");
     pushDataLayerUpdates('Pageview', '/de-de/registrieren','Name und Geburtsdatum');
     updateProduct("sensorValidated");
    });

$('#sensorManualCheck').click(function(e){
     e.preventDefault();
     updateProduct("sensorValidatedManually");
     setCookie('productSel','SensorOnly');
    });

var settings ;
function updateProduct(productType) {
    $('#page-spinner').show();
    $('#productErrorMsg').hide();

	var productList = ["sensor"] ;
    var redirectUrl = $('#acsBtnRegistrationPage').attr('href') ;
    if(productType == "sensorLanding"){
   		redirectUrl = $('#acsBtnCompabilityPage').attr('href');
    }
	if(productType == "sensorValidatedManually"){
   		redirectUrl = $('#sensorManualCheck').attr('href');
    }
    if(productType == "sensorReader"){
    	productList =["sensor","reader"];
    }

    var acsURL = $('#fsl2WizardFormQuestionnaire form').attr('action');
    var obj = {action:"updateProductSelection",userInfo:{additionalProperties:{"accessCode": getCookie('accessCode'),"productList": productList}}};
    var myJSON = JSON.stringify(obj);
    settings = {
        "url": acsURL,
        "method": "POST",
        "headers": {
            "x-application-id": 'fsl2sampling',
            "x-country-code": 'DE',
            "x-preferred-language": 'de',
            "Content-Type": "application/json"
        },
        data:myJSON
    };

	updateProductAjax().then(function(response) {
        //var i18nKey = response.response.i18nMessageKey ? response.response.i18nMessageKey : ""
    	// Run this when your request was successful
        if (response.errorCode==0) {
            $('#apierror, #apierror_400').hide();
            $('#page-spinner').hide();
			if(productType !== "sensorLanding"){
				var acsCodeStatus = {
						"statusReason": "ProductSelected",
						"allowUser": "true"
						}
				setCookie('accessCodeStatus', JSON.stringify(acsCodeStatus), '');
			}
			window.location.href = redirectUrl;
			//window.location.href = $('#acsBtnRegistrationPage').attr('href');
        }else{
            //$('#redirect-buttons #btnModalError500').parent('.m-popup').trigger('click');
            onErrorProductRegistration(response);
        }
	});
}

function updateProductAjax() {
    // returns a promise that can be used later.
    return $.ajax(settings);
}

function onErrorProductRegistration(error) {
    $('#page-spinner').hide();
    $('#productErrorMsg').show();
    showHideApiError(error);
}

/** Product selection ends here  **/

/** Back button in T&C start here **/
$('#selfButton').click(function(e){
	e.preventDefault();
	window.location.href = document.referrer;
});

/** Back button in T&C end here **/


/** Updated to swap the product selection to reader sensor on the compatible check page **/
$('#swapToReaderSensor').click(function(e){
	e.preventDefault();
	console.log("swapping to sensor reader selection");
    setCookie('productSel','SensorReader');
    updateProduct("sensorReader");
});
