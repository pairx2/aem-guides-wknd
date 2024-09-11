/** Sample Freestyle Form logic
 *
 * To make use of the Wizard validation
 * - set the 'Next' button to disabled in the AEM Button dialog by checking the 'Disable button' checkbox
 * - for each step of the wizard another Form Container needs to be added give each one, through the dialog an ID that contains the "quiz" or "registration" (Eg. 'freestyle_quiz_greece' or 'freestyle_registration_greece')
 */

function getWizardStep(step) {
  let wizardStep;
  document.querySelectorAll('.o-wizard__container .o-wizard__content').forEach(item => {
    if (item.querySelector(`.o-form-container[id*="${step}"]`)) wizardStep = item;
  })
  return wizardStep;
}

function getAllQuestions() {
  return getWizardStep('quiz').querySelector('.form-container').querySelectorAll('.options');
}

function parseMobilePhoneCompatible(value) {
  return (value.consentName === "1" && value.consentValue === true) ||
    (value.consentName === "0" && value.consentValue === false);
}

function countCorrectAnswers() {
  let result = 0;
  getAllQuestions().forEach(question => {
    question.querySelectorAll("[type='radio']").forEach(radio => {
      if (radio.checked && (radio.value !== 'undefined' && radio.value === 'true')) result++;
    })
  });
  return result;
}

function removeQuestionsRandomly(questionArr, requiredQuestionsNo) {
  let removed = new Set();
  while (removed.size < questionArr.length - requiredQuestionsNo) {
    let idx = Math.floor(Math.random() * questionArr.length);
    questionArr[idx].remove();
    removed.add(idx);
  }
}

function toggleFormCompleteMsgs(isSuccess) {
  	$(".o-wizard-container__error-msg").hide();
  	$(".o-wizard-container__success-msg").hide();
  	
  if (isSuccess) {
    $("[id='failure-sample-freestyle'],[id*='failure-quiz']").parent().hide();
    $("[id='success-sample-freestyle'],[id*='success-quiz']").parent().show();
  } else {
    $("[id='failure-sample-freestyle'],[id*='failure-quiz']").parent().show();
    $("[id='success-sample-freestyle'],[id*='success-quiz']").parent().hide();
  }

}

function showLastStep(isSuccess) {
  toggleFormCompleteMsgs(isSuccess);

  $("[data-wizarditem]").hide();
  $("[data-wizarditem='2']").show();

  $(".wizard-step")
    .addClass("a-wizard__step--complete")
    .addClass("a-wizard__step--inactive")
    .removeClass("a-wizard__step--incomplete");
}

function updateButton(buttonEl, isEnabled) {
  if (isEnabled !== 'undefined') {
    buttonEl.disabled = !isEnabled;
  } else {
    buttonEl.disabled = !buttonEl.disabled;
  }
}

function setupQuizWizardValidation(quizForm) {
  const quizWizardFormEl = quizForm.querySelector('.o-form-container__element .o-form-container__main-form');
  const quizWizardButton = quizForm.querySelector('.o-wizard__btn button.btn');

  quizWizardFormEl.addEventListener("click", () => {
    const totalWizardFieldsets = quizWizardFormEl.querySelectorAll('fieldset.radio').length;
    let totalFieldsetsChecked = quizWizardFormEl.querySelectorAll('input:checked').length;

    const enableButton = (totalWizardFieldsets === totalFieldsetsChecked);
    updateButton(quizWizardButton, enableButton);
  });
}

function setupRegistrationFormValidation(registrationForm) {
  const formSubmitButton = registrationForm.querySelector('.o-wizard__btn button[type="submit"]');

  registrationForm.addEventListener("click", () => {
    let textFieldsValid = !!(registrationForm.querySelectorAll('.validation-require').length < 1 &&
      registrationForm.querySelectorAll('.validation-error').length < 1);

    let checkboxesValid = false;
    const totalRequiredCheckboxes = registrationForm.querySelectorAll('fieldset.checkbox input[data-required="true"]').length;
    let totalCheckedCheckedBoxes = registrationForm.querySelectorAll('fieldset.checkbox input[data-required="true"]:checked').length;
    if (totalRequiredCheckboxes <= totalCheckedCheckedBoxes) checkboxesValid = true;

    let radioInputsValid = false;
    const totalRequiredRadios = registrationForm.querySelectorAll('fieldset.radio input[data-required="true"]').length;
    if (totalRequiredRadios === 0) {
      radioInputsValid = true;
    } else {
      registrationForm.querySelectorAll('fieldset.radio').forEach(item => {
        if (item.querySelectorAll('input[data-required="true"]:checked').length > 0) radioInputsValid = true;
      });
    }

    const enableButton = (textFieldsValid && radioInputsValid && checkboxesValid);
    updateButton(formSubmitButton, enableButton);
  });
}

function onLoadSampleFreestyle(data) {
  if (isOnPublish()) {
    $("[id='success-sample-freestyle'],[id*='success-quiz']").parent().hide();
    $("[id='failure-sample-freestyle'],[id*='failure-quiz']").parent().hide();
  }

  let questionsToDisplay, numberOfQuestions = $('#numberOfQuestions').val();
  if(numberOfQuestions == undefined || numberOfQuestions == null || numberOfQuestions == '') {
      questionsToDisplay = 2;
  } else {
      questionsToDisplay = parseInt(numberOfQuestions);
  }

  let eSamplingStatus = getItemSessionStorage('eSampling', true);
  
  if (eSamplingStatus == 'already-subscribed') {
    showLastStep(false);
  } else if (isOnPublish() && !!getWizardStep('quiz')) {
    removeQuestionsRandomly(getAllQuestions(), questionsToDisplay);
  }

  let getWizStepQuiz = getWizardStep('quiz');
  let getWizStepReg = getWizardStep("registration");

  if (getWizStepQuiz) {
    setupQuizWizardValidation(getWizStepQuiz);
  }
  if (getWizStepReg) {
    setupRegistrationFormValidation(getWizStepReg);
  }
}

$(document).ready(function () {

  let getWizStepQuiz = getWizardStep('quiz');
  let getWizStepReg = getWizardStep("registration");

  if (!!$('.o-form-container__element .o-wizard__container').length && !!(getWizStepQuiz || getWizStepReg)) {
    onLoadSampleFreestyle();
  }
});

