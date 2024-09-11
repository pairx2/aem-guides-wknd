//Below function to change JSON structure as per Service API
function updateCreateApplicationCycle(formData) {
    var headerLanguage = document.querySelector('input[name="x-preferred-language"]').value;
    var headerCountryCode  = document.querySelector('input[name="x-country-code"]').value;
    var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    var jwtToken = getCookie('id.token');
    formData.headers = {
        'x-country-code': headerCountryCode,
        'x-application-id': headerApplicationId,
        'x-preferred-language': headerLanguage,
        'x-id-token': jwtToken,
        'Content-Type': 'application/json'        
    }
    formData.body = {
            type:"AwardApplicationCycle",
            name: formData.body.applicationCycleDisplayName,
            startDate: formData.body.applicationCycleStartDate,
            endDate: formData.body.applicationCycleEndDate     
    }
    return formData
}

function updateCreateJudgeAssessmentCycle(formData){
    var headerLanguage = document.querySelector('input[name="x-preferred-language"]').value;
    var headerCountryCode  = document.querySelector('input[name="x-country-code"]').value;
    var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    var jwtToken = getCookie('id.token');
    var affiliatedId = document.querySelector('ul[name="affiliated-application-cycles"] .selected').getAttribute('data-id');
    formData.headers = {
        'x-country-code': headerCountryCode,
        'x-application-id': headerApplicationId,
        'x-preferred-language': headerLanguage,
        'x-id-token': jwtToken,
        'Content-Type': 'application/json'        
    }
    formData.body = {
            type:"JudgeAssessmentCycle",
        	status:"ACTIVE",
            name: formData.body.applicationCycleDisplayName,
            startDate: formData.body.applicationCycleStartDate,
            endDate: formData.body.applicationCycleEndDate,
            links:[
                      {
                         type: "AwardApplicationCycle",
                         id: affiliatedId
                      }   
                  ]
    }
    return formData
}

function editApplicationCycle(formData){
    var headerLanguage = document.querySelector('input[name="x-preferred-language"]').value;
    var headerCountryCode  = document.querySelector('input[name="x-country-code"]').value;
    var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    var jwtToken = getCookie('id.token');
    var editAppId = document.querySelector('ul[name="name-application-cycle"] .selected').getAttribute('data-id');
    var editAppHashContent = document.querySelector('ul[name="name-application-cycle"] .selected').getAttribute('data-hashedContent');
    formData.headers = {
        'x-country-code': headerCountryCode,
        'x-application-id': headerApplicationId,
        'x-preferred-language': headerLanguage,
        'x-id-token': jwtToken,
        'Content-Type': 'application/json'        
    }
    formData.body = {
            type:"AwardApplicationCycle",
            name: formData.body.editapplicationCycleDisplayName,
            id: editAppId,
            _hashedContent: editAppHashContent,
            startDate: formData.body.applicationCycleStartDate,
            endDate: formData.body.applicationCycleEndDate   
    }
    return formData
}

function editJudgeAssessmentCycle(formData){
    var headerLanguage = document.querySelector('input[name="x-preferred-language"]').value;
    var headerCountryCode  = document.querySelector('input[name="x-country-code"]').value;
    var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    var jwtToken = getCookie('id.token');

    var editJudgeId = document.querySelector('ul[name="name-assessment-cycle"] .selected').getAttribute('data-id');
    var editJudgeHashContent = document.querySelector('ul[name="name-assessment-cycle"] .selected').getAttribute('data-hashedContent');

    formData.headers = {
        'x-country-code': headerCountryCode,
        'x-application-id': headerApplicationId,
        'x-preferred-language': headerLanguage,
        'x-id-token': jwtToken,
        'Content-Type': 'application/json'        
    }
    formData.body = {
            type:"JudgeAssessmentCycle",
            name: formData.body.editassessmentCycleDisplayName,
            id: editJudgeId,
            _hashedContent: editJudgeHashContent,
            startDate: formData.body.applicationCycleStartDate,
            endDate: formData.body.applicationCycleEndDate  
    }
    return formData
}

// Create cycle application cycle error function
function onErrorCreateApplication(response) {
    $(".o-form-container__error-msg").hide();
    showToolsApiError('.create-app-cycle-specific-error-messages', '#create-app-cycle-generic-error-message', response);
}

// Create assessment-cycle error function
function onErrorCreateAssessmentCycle(response) {
    $(".o-form-container__error-msg").hide();
    showToolsApiError('.create-assessment-cycle-specific-error-messages', '#createassessment-general-error-message', response);
}

// Create assessment-cycle error function
function onErrorEditAppCycle(response) {
    $(".o-form-container__error-msg").hide();
    showToolsApiError('.edit-app-cycle-specific-error-messages', '#edit-app-cycle-general-error-message', response);
}

// Create assessment-cycle error function
function onErrorEditAssessmentCycle(response) {
    $(".o-form-container__error-msg").hide();
    showToolsApiError('.edit-assessment-cycle-specific-error-messages', '#edit-assessment-cycle-general-error-message', response);
}

