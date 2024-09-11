/**
 * Consents and Questionnaire
 **/
function reCaptchaOnLoadCall() {
  let fsl3WizardFormQuestionnaire = $('#fsl3WizardFormQuestionnaire');
  if (fsl3WizardFormQuestionnaire.length > 0 && wcmmodeOff) {
    //check cookies questionnaire
    getAccessCode();
    checkCookie('questionnaire');

  }
}
$(document).ready(function () {
      //check if the page is questionnaire
        let fsl3WizardFormQuestionnaire = $('#fsl3WizardFormQuestionnaire');
        //hide all others input fields
        let inputOthers = fsl3WizardFormQuestionnaire.find(':input[name$="::others"]');
        inputOthers.each(function () {
            $(this).closest('.a-input-field').hide();
        });

    //check if the form-conatiner is consents check
    let fsl3ConsentsForm = $('#fsl3ConsentsForm');

    if(fsl3ConsentsForm.length > 0 && wcmmodeOff) {
        fsl3ConsentsForm.closest('fieldset.o-wizard__content').find('.o-wizard__btn').hide();
    }

});

//fsl3ConsentForm wizard button
function wizardNextButton(isdisable, isspinner, isShow) {

  let wizardBtn = $('#fsl3ConsentsForm').closest('fieldset.o-wizard__content').find('.o-wizard__btn');
  let wizNextBtn = wizardBtn.find('.button-div:not(.o-wizard__btn--back) .btn');
  if(isShow) {
    wizNextBtn.prop('disabled', isdisable);
    wizNextBtn.click();
  } else {
    wizardBtn.hide();
  }
  if (isspinner) {
    wizNextBtn.parents('.a-button').addClass('a-button--spinner');
  } else {
    wizNextBtn.parents('.a-button').removeClass('a-button--spinner');
  }

}

/** Consents and Questionnaire -- end**/


$("#BackBtnToFirstStep").click(function(){
  $("#fsl3ConsentsFormSubmit").css("display", "block");
});
