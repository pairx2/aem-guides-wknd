$(() => {
  $('[data-js-component="formcontainer"] form input.form-control').on('keypress', (e) => {
    if (e.which === 13) {
      const $formContainer = $(e.target).closest('[data-js-component="formcontainer"]');
      const isWizard = $formContainer.is('[data-js-component="wizard"] [data-js-component="formcontainer"]');
      const $container = isWizard ? $formContainer.closest('[data-wizarditem]') : $formContainer;

      $container.find('button[type="submit"]').first().click();
    }
  });
});

$('#myfreestyle-forgot-pswd').on('keypress click paste',function(e) {
  if(e.which == 13) {
      $('#myfreestyle-forgot-pswd input[type="email"]').prop('disabled', true);
      $('#myfreestyle-forgot-pswd input[type="email"]').css('background-color', '#FFF');
}
  if ($('#myfreestyle-forgot-pswd button[type="submit"]').is(':disabled')) {
    return;
  }
  else {
    $('#myfreestyle-forgot-pswd button[type="submit"]').removeAttr("type").attr("type", "button");
  }
});

$('#myfreestyle-forgot-pswd').on('paste', function (e) {
  $('#myfreestyle-forgot-pswd button[type="submit"]').removeAttr("type").attr("type", "button");
});

function handleErrorShowTooltip (errorShowElem) {
  if(errorShowElem?.querySelector('.tooltip-pwd-title')){
    errorShowElem?.querySelector('.tooltip-pwd-title').remove()
  }
  if(errorShowElem?.querySelector('.tooltip-pwd-table')){
    errorShowElem?.querySelector('.tooltip-pwd-table').remove()
  }
}

//hide password req tooltip
let element = document.querySelector('[data-js-component="formcontainer"] .a-input-password-strength .tooltip-pwd')?.setAttribute("style", "display:none;")

$('[data-js-component="formcontainer"] form [type="password"]').on('input keypress click paste change copy cut', (e)=>{
    
  const formContainerData =  $(e.target).closest('[data-js-component="formcontainer"]');
  let errorShowElem = formContainerData[0]?.querySelector('.a-input-password-strength');
  let inputPasswordFieldTooltipTitle = errorShowElem?.querySelector('[data-original-title]');

  if (inputPasswordFieldTooltipTitle) {
    const handleClassChange = function (mutations) {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "data-original-title") {
          let dataVal = inputPasswordFieldTooltipTitle?.getAttribute('data-original-title');

          handleErrorShowTooltip (errorShowElem);

          if (errorShowElem) {
            errorShowElem.insertAdjacentHTML("beforeend", dataVal);
          }
        }
      });
    };
      
    const observer = new MutationObserver(handleClassChange);
    const observerConfig = {
      attributes: true,
      attributeOldValue: true,
    };

    observer.observe(inputPasswordFieldTooltipTitle, observerConfig);
  }
});