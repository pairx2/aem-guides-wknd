const saveEmailToValidate = () => {
  // sending email to be used on resend confirmation email page
  const userEmail = getNestedObject(
    document.querySelector("#userName"),
    "value"
  );
  localStorage.setItem(commonConst.RESENT_EMAIL_STORAGE, userEmail);
};

const createConditionalEvent = (value, variable) => {
  return new CustomEvent("conditional-component-change", {
    detail: {
      value,
      var: variable,
    },
  });
};

// true if over 18, false if less than 18
const isAdult = (userDate) => {
  const optimizedUserDate = userDate.replace(/-/g, "/");
  const dateOfBirth = new Date(optimizedUserDate);
  const currentDate = new Date().toJSON().slice(0, 10) + " 01:00:00";
  const calculatedAge = ~~((Date.now(currentDate) - dateOfBirth) / 31557600000);

  if (calculatedAge >= 18) {
    return true;
  }
  return false;
};

const getPageDataAttributes = () => {
  return {
    "x-preferred-language": getNestedObject(
      document.getElementsByName("x-preferred-language")[0],
      "value"
    ),
    "x-country-code": getNestedObject(
      document.getElementsByName("x-country-code")[0],
      "value"
    ),
    "x-application-id": getNestedObject(
      document.getElementsByName("x-application-id")[0],
      "value"
    ),
  };
};

const addEventHandlers = (type, handlers = []) => {
  if (!type || !handlers.length) {
    // Missing required parameters
    throw new Error("Type and handlers parameters needed");
  }

  handlers.forEach((v) => {
    if (getNestedObject(document.querySelectorAll(v.selector), "length")) {
      document.querySelectorAll(v.selector).forEach((el) => {
        el.addEventListener(type, v.handler);
      });
    }
  });
};

/**
 * Adds new (or shows existing) loading spinner on a button
 */
const showLoadingSpinner = (button) => {
  if (!button) {
    return;
  } else if (button.querySelector(".abt-icon.abt-icon-spinner")) {
    // Loading spinner already exists, show it:
    button.querySelector(".abt-icon.abt-icon-spinner").display = "block";
  } else {
    // Create loading spinner element and add it to the button:
    const spinner = document.createElement("i");
    spinner.classList.add("abt-icon", "abt-icon-spinner");
    button.insertBefore(spinner, button.firstChild);
  }
};

/**
 * Hides an existing loading spinner on a button
 */
const hideLoadingSpinner = (button) => {
  if (!button) {
    return;
  } else if (button.querySelector(".abt-icon.abt-icon-spinner")) {
    // Hide loading spinner:
    button.querySelector(".abt-icon.abt-icon-spinner").display = "none";
  }
};

window.addEventListener("load", () => {
  /**
   * For all forms with datepickers, add an event listener that will check if
   * the entered age is < 18 years old. If so:
   *  - Dispatch signUpAdult event to display an error message (must be authored on each form)
   *  - Disable the form's submit button
   */

  const forms = document.querySelectorAll(".o-form-container");

  for (let i = 0; i < forms.length; i++) {
    const currentForm = forms[i];
    const datePickers = currentForm.querySelectorAll(".a-date-picker input");

    for (let j = 0; j < datePickers.length; j++) {
      datePickers[j].addEventListener("keyup", (event) => {
        const enteredDate = event.currentTarget.value;
        let signUpAdultEvent;

        if (enteredDate && !isAdult(enteredDate)) {
          const submitButton = currentForm.querySelector(
            'button[type="submit"]'
          );

          // Disable submit button:
          if (submitButton) {
            submitButton.setAttribute("disabled", "disabled");
          }

          signUpAdultEvent = createConditionalEvent("noAdult", "signUpAdult");
        } else {
          signUpAdultEvent = createConditionalEvent(null, "signUpAdult");
        }

        // Display error message if user isn't adult:
        window.dispatchEvent(signUpAdultEvent);
      });
    }
  }
});
