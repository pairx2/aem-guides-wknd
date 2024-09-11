const handleResendEmailMessage = ({ success = true, data }) => {
  const messageToShow = success ? "success" : "error";
  const message = getNestedObject(
    window.i18nErrorLookup(data),
    "response.statusReason"
  );

  if (message) {
    document.querySelector(
      `#resend-email-form [data-conditional-case='${messageToShow}'] .m-alert__para`
    ).innerHTML = message;
  }

  const resendEmailValidationEvent = createConditionalEvent(
    messageToShow,
    "resendEmailValidation"
  );
  window.dispatchEvent(resendEmailValidationEvent);
};

const OnNaveCommResendEmailSuccess = (data) => {
  handleResendEmailMessage({ data });
};

const OnNavEcommResendEmailError = (data) => {
  handleResendEmailMessage({ success: false, data });
};
