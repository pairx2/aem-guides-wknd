const signUpBtn = document.querySelector("#sign-up-form button[type='submit']");

const onNavEcommRegistrationBeforeRequest = () => {
  showLoadingSpinner(signUpBtn);
};

const onNavEcommRegistrationSuccess = (data) => {
  hideLoadingSpinner(signUpBtn);
  saveEmailToValidate();
  window.dispatchEvent(new CustomEvent("registrationSuccess"));
};

const cleanNavEcommRegistrationErrorsConditionals = () => {
  const signUpEmailEvent = createConditionalEvent("false", "signUpEmail");
  window.dispatchEvent(signUpEmailEvent);
  const formHasErrorEvent = createConditionalEvent("false", "formHasError");
  window.dispatchEvent(formHasErrorEvent);
  const signUpAdultEvent = createConditionalEvent("false", "signUpAdult");
  window.dispatchEvent(signUpAdultEvent);
};

const onNavEcommRegistrationError = (data) => {
  const errorMessageFromAuthor = getNestedObject(
    document.querySelector(".o-form-container__error-msg"),
    "innerText"
  );

  const erroMessage = getNestedObject(
    window.i18nErrorLookup(data),
    "response.statusReason"
  );
  const errorKey = getNestedObject(data, "response.i18nMessageKey");
  const dateOfBirth = getNestedObject(
    document.querySelector("#dateOfBirth"),
    "value"
  );
  let idToScroll = "#sign-up-form [data-conditional-case='show']";
  const form = document.querySelector("#sign-up-form");

  cleanNavEcommRegistrationErrorsConditionals();

  // If email already has an account
  if (errorKey === "REG-USER-1030") {
    const signUpEmailEvent = createConditionalEvent("exists", "signUpEmail");
    window.dispatchEvent(signUpEmailEvent);
    idToScroll = "#userName";

    // Disable form
    const formSubmitBtn = form.querySelector('[type="submit"]');
    formSubmitBtn.setAttribute("disabled", "disabled");
    const formInputs = form.querySelectorAll(".a-input-control");
    const formCheckboxes = form.querySelectorAll(".a-checkbox__input");
    const formRadios = form.querySelectorAll(".a-radio__input");
    const inputs = [...formInputs, ...formCheckboxes, ...formRadios];

    inputs.forEach((input) => {
      if (input) {
        input.setAttribute("disabled", "disabled");
      }
    });
  } else {
    const formHasErrorEvent = createConditionalEvent("show", "formHasError");
    window.dispatchEvent(formHasErrorEvent);

    document.querySelector(
      "#sign-up-form [data-conditional-variable='formHasError'] .m-alert__para"
    ).innerHTML = erroMessage || errorMessageFromAuthor;
  }

  // If user isn't adult
  if (dateOfBirth && !isAdult(dateOfBirth)) {
    const signUpAdultEvent = createConditionalEvent("noAdult", "signUpAdult");
    window.dispatchEvent(signUpAdultEvent);
  }

  // Scroll to Error
  const yOffset =
    -getNestedObject(
      document.querySelector(".o-header__sticky-section"),
      "offsetHeight"
    ) || 0;
  const element = document.querySelector(idToScroll);
  let y = 0;
  if (element) {
    y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
  }

  window.scrollTo({ top: y, behavior: "smooth" });

  hideLoadingSpinner(signUpBtn);
};
