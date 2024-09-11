const onNavEcommForgotPassSuccess = (data) => {
  const forgotPassEvent = createConditionalEvent(true, "ChangePassword");
  window.dispatchEvent(forgotPassEvent);
};
