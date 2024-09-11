// ================== Pre-Registration Form ==================

const preRegistrationForm = document.querySelector(
  "#pre-registration-form form"
);
const registerFormSubmitBtn = document.getElementById("registerFormSubmit");

const onBeforeNavEcommRegisterCall = () => {
  showLoadingSpinner(registerFormSubmitBtn);
};

const onNavEcommRegisterError = () => {
  hideLoadingSpinner(registerFormSubmitBtn);
};

const onNavEcommRegisterSuccess = () => {
  hideLoadingSpinner(registerFormSubmitBtn);

  // Serialize pre-registration form and save it to localStorage
  if (preRegistrationForm) {
    const formData = new FormData(preRegistrationForm);
    const preRegistrationFormData = {};

    for (let entry of formData) {
      preRegistrationFormData[entry[0]] = entry[1];
    }

    localStorage.setItem(
      "preRegistrationData",
      JSON.stringify(preRegistrationFormData)
    );
  }
};

// ====================== Questionnaire ======================

const questionnaireFormSubmit = document.getElementById(
  "questionnaireFormSubmit"
);

const onUpdateRequestQuestionnaire = (data) => {
  const enteredEmail = data.body["email"];
  const recaptchaResponse = data.body["g-recaptcha-response"];
  const answers = [];

  // Delete everything but the questions
  delete data.body["email"];
  delete data.body["g-recaptcha-response"];
  delete data.body["requestType"];
  delete data.body["node"];

  // Create ansers array with all the values
  $.each(data["body"], function (key, value) {
    var newObj = {
      SURVEY_QUESTION: key,
      SURVEY_ANSWER: "",
    };

    // Check if value is array
    if (Array.isArray(value)) {
      var newArr = [];
      // Return the input with radio option checked
      newArr = $.grep(value, function (n, i) {
        return n.consentValue == true;
      });
      newObj["SURVEY_ANSWER"] = newArr[0].consentName;
    } else {
      newObj["SURVEY_ANSWER"] = value;
    }

    answers.push(newObj);
  });

  // Filter and update answer array for values as "others"
  var othersArr = $.grep(answers, function (n, i) {
    let ques = n.SURVEY_QUESTION;
    let quesOther = ques.lastIndexOf("::others");
    return quesOther > -1;
  });

  $.each(othersArr, function (key, val) {
    var newQues = val.SURVEY_QUESTION.split("::")[0];
    var newObj = {
      SURVEY_QUESTION: newQues,
      SURVEY_ANSWER: val.SURVEY_ANSWER,
    };

    // Get index of existing question and answer obj from answers array
    let index = answers.findIndex(function (element) {
      if (element) {
        return element["SURVEY_QUESTION"] === newQues;
      }
    });
    // Replace the question and answer obj with newObj.
    answers[index] = newObj;

    // Get index of existing question and answer obj with value as "others"
    let removeIndex = answers.findIndex(function (element) {
      if (element) {
        return element["SURVEY_QUESTION"] === val.SURVEY_QUESTION;
      }
    });

    // Remove the question
    answers.splice(removeIndex, 1);
  });

  data["body"] = {
    "g-recaptcha-response": recaptchaResponse,
    email: enteredEmail,
    answers: answers,
  };

  return data;
};

const onBeforeNavEcommQuestionnaireCall = () => {
  showLoadingSpinner(questionnaireFormSubmit);
};

const onNavEcommQuestionnaireError = () => {
  hideLoadingSpinner(questionnaireFormSubmit);
};

const onNavEcommQuestionnaireSuccess = () => {
  hideLoadingSpinner(questionnaireFormSubmit);
  localStorage.removeItem("preRegistrationData");
};

window.addEventListener("load", () => {
  const questionnaireForm = document.querySelector("#questionnaireForm form");

  /**
   * If this page has questionnaire form:
   * - Get pre-registration data from localStorage
   * - Set hidden inputs with these values
   */
  if (questionnaireForm) {
    const preRegistrationData = JSON.parse(
      localStorage.getItem("preRegistrationData")
    );

    if (preRegistrationData) {
      for (let key in preRegistrationData) {
        const hiddenInput = questionnaireForm.querySelector(
          `input[name=${key}]`
        );
        if (hiddenInput) {
          hiddenInput.value = preRegistrationData[key];
        }
      }
    }
  }
});
