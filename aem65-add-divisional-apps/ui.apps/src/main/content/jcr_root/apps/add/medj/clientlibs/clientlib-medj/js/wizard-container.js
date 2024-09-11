// Custom DOM customization scripts
function RegisterFormDOMCustomization() {
    $('.o-wizard__content .a-container .a-container__column:first-child').addClass('offset-lg-2');
    $('#UserRegisterFormWrap input[name="designation"]').closest('.layoutcontainer.m-layout-container').css('z-index', '0');
    
    // Adding Bootstrap row and column for Step 1 newsletter
    var regNewsletterSubCont = document.querySelector('#register-newseletter-subs-wrap');
    regNewsletterSubCont.classList.add('container');
    $('#register-newseletter-subs-wrap .options').wrap('<div class="col-12 col-lg-7 offset-lg-2 newsletter-col-wrap"></div>');
    $('#register-newseletter-subs-wrap .newsletter-col-wrap').wrap('<div class="row"></div>');
    
    // Adding Bootstrap row and column for Step 1 newsletter
    regNewsletterSubCont = document.querySelector('#register-privacy-policy-wrap');
    regNewsletterSubCont.classList.add('container');
    $('#register-privacy-policy-wrap .options').wrap('<div class="col-12 col-lg-10 offset-lg-2 privacy-policy-col-wrap"></div>');
    $('#register-privacy-policy-wrap .privacy-policy-col-wrap').wrap('<div class="row"></div>');

    var nextBtnStep1Parent = document.querySelector('#UserRegisterFormWrap button[name="nextBtnStep1"]').closest('.button');
    nextBtnStep1Parent.classList.add('a-button','a-button--primary');
    var RegisterNextBtnStep2Parent = document.querySelector('#UserRegisterFormWrap button[name="nextBtnStep2"]').closest('.button');
    RegisterNextBtnStep2Parent.classList.add('a-button','a-button--primary');
    var backBtnStep2Parent = document.querySelector('#UserRegisterFormWrap button[name="backBtnStep2"]').closest('.button');
    backBtnStep2Parent.classList.add('a-button','a-button--secondary');
    var backBtnStep3Parent = document.querySelector('#UserRegisterFormWrap button[name="backBtnStep3"]').closest('.button');
    backBtnStep3Parent.classList.add('a-button','a-button--secondary');
    var registerFormSubmitParent = document.querySelector('#UserRegisterFormWrap button[name="registerFormSubmit"]').closest('.button');
    registerFormSubmitParent.classList.add('a-button','a-button--primary');   
    
    // Even listener function to preview form field values
    RegisterNextBtnStep2Parent.addEventListener('click', function() {
        var lastNameValue = document.querySelector('#UserRegisterFormWrap input[name="lastName"]').value;
        var registerPrevSurname = document.querySelector('#UserRegisterFormWrap #registerPrevSurname p');
        registerPrevSurname.innerHTML = lastNameValue;
        var firstNameValue = document.querySelector('#UserRegisterFormWrap input[name="firstName"]').value;
        var registerPrevGivenname = document.querySelector('#UserRegisterFormWrap #registerPrevGivenname p');
        registerPrevGivenname.innerHTML = firstNameValue;
        var medicalInstitutionValue = document.querySelector('#UserRegisterFormWrap input[name="medicalInstitution"]').value;
        var registerPrevMediInst = document.querySelector('#UserRegisterFormWrap #registerPrevMediInst p');
        registerPrevMediInst.innerHTML = medicalInstitutionValue;
        var workPhoneValue = document.querySelector('#UserRegisterFormWrap input[name="workPhone"]').value;
        var registerPrevWorkphone = document.querySelector('#UserRegisterFormWrap #registerPrevWorkphone p');
        if(workPhoneValue) {registerPrevWorkphone.innerHTML = workPhoneValue}
        var specialityValue = document.querySelector('#UserRegisterFormWrap input[name="speciality"]').value;
        var registerPrevBelongs = document.querySelector('#UserRegisterFormWrap #registerPrevBelongs p');
        registerPrevBelongs.innerHTML = specialityValue;
        var occupationValue = document.querySelector('#UserRegisterFormWrap ul[name="occupation"] .selected').innerText;
        var registerPrevOccup = document.querySelector('#UserRegisterFormWrap #registerPrevOccup p');
        registerPrevOccup.innerHTML = occupationValue;
        var designationValue = document.querySelector('#UserRegisterFormWrap input[name="designation"]').value;
        var registerPrevPosition = document.querySelector('#UserRegisterFormWrap #registerPrevPosition p');
        if(designationValue) {registerPrevPosition.innerHTML = designationValue}
        var emailValue = document.querySelector('#UserRegisterFormWrap input[name="email"]').value;
        var registerPrevEmail = document.querySelector('#UserRegisterFormWrap #registerPrevEmail p');
        registerPrevEmail.innerHTML = emailValue;
        
        var registerPrevSubsLabel = document.querySelector('#UserRegisterFormWrap #registerPrevSubsLabel');
        var articlesValue = document.querySelector('#register-newseletter-subs-wrap input[value="articles"]').checked;
        var articlesText = document.querySelector('#register-newseletter-subs-wrap input[value="articles"]').parentNode.querySelector('.a-checkbox__text').innerText;
        var registerPrevSubsArticle = document.querySelector('#UserRegisterFormWrap #registerPrevSubsArticle p');

        var eventsOrSeminarValue = document.querySelector('#register-newseletter-subs-wrap input[value="eventsOrSeminar"]').checked;
        var eventsOrSeminarText = document.querySelector('#register-newseletter-subs-wrap input[value="eventsOrSeminar"]').parentNode.querySelector('.a-checkbox__text').innerText;
        var registerPrevSubsSemEvents = document.querySelector('#UserRegisterFormWrap #registerPrevSubsSemEvents p');

        var promotionalInformationValue = document.querySelector('#register-newseletter-subs-wrap input[value="promotionalInformation"]').checked;
        var promotionalInformationText = document.querySelector('#register-newseletter-subs-wrap input[value="promotionalInformation"]').parentNode.querySelector('.a-checkbox__text').innerText;
        var registerPrevSubsPromo = document.querySelector('#UserRegisterFormWrap #registerPrevSubsPromo p');

        (articlesValue || eventsOrSeminarValue || promotionalInformationValue) ? registerPrevSubsLabel.style.display = 'block' : registerPrevSubsLabel.style.display = 'none';

        if(articlesValue) {            
            registerPrevSubsArticle.style.display = 'block';
            registerPrevSubsArticle.innerHTML = articlesText.split('(')[0].trim();
        }
        else {            
            registerPrevSubsArticle.style.display = 'none';
        }
        
        if(eventsOrSeminarValue) {
            registerPrevSubsSemEvents.style.display = 'block';
            registerPrevSubsSemEvents.innerHTML = eventsOrSeminarText.split('(')[0].trim();
        }
        else {
            registerPrevSubsSemEvents.style.display = 'none';
        }

        if(promotionalInformationValue) {
            registerPrevSubsPromo.style.display = 'block';
            registerPrevSubsPromo.innerHTML = promotionalInformationText.split('(')[0].trim();
        }
        else {
            registerPrevSubsPromo.style.display = 'none';
        }
    });
}

// Appending maxlength attribute to Register form input fields
function registerFormAttributeSet() {
    document.querySelector('#UserRegisterFormWrap input[name="lastName"]').setAttribute('maxlength', 40);
    document.querySelector('#UserRegisterFormWrap input[name="firstName"]').setAttribute('maxlength', 40);
    document.querySelector('#UserRegisterFormWrap input[name="medicalInstitution"]').setAttribute('maxlength', 200);
    document.querySelector('#UserRegisterFormWrap input[name="workPhone"]').setAttribute('maxlength', 12);
    document.querySelector('#UserRegisterFormWrap input[name="workPhone"]').setAttribute('minlength', 12);
    document.querySelector('#UserRegisterFormWrap input[name="speciality"]').setAttribute('maxlength', 200);
    document.querySelector('#UserRegisterFormWrap input[name="designation"]').setAttribute('maxlength', 200);
    document.querySelector('#UserRegisterFormWrap input[name="password"]').setAttribute('maxlength', 16);
    document.querySelector('#UserRegisterFormWrap input[name="repassword"]').setAttribute('maxlength', 16);
}

// Hiding Success and Error message areas on page load
// Below condtion use for disable the below function in editor mode
if(typeof typeof Granite === 'undefined' ||  typeof Granite.author === 'undefined'){
    function userRegisterCustomMessage() {
        var successMessgaeArea = document.querySelector('#UserRegisterFormWrap #registerSuccessInfo');
        successMessgaeArea.style.display = 'none';
    }
}

// Redirect user to My profile if login
function userRegisterMyProfileRedirect() {
    publicPageRedirectInLogin('#UserRegisterFormWrap', '/secure/my-profile.html');
}

$(document).ready(function () {
    var registerUserForm = document.getElementById('UserRegisterFormWrap');
    if(registerUserForm) {
        RegisterFormDOMCustomization();
        registerFormAttributeSet();
        userRegisterCustomMessage();
        userRegisterMyProfileRedirect();
    }    
});