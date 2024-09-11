import * as React from "react";

import { Formik, Form, Field, useFormikContext } from "formik";
import InputMasker from "../components/InputMasker";
import HtmlTag from "../components/HtmlTag";
import validations from "../common/validations";
import Button from "../components/Button";
import Focus from "../components/ErrorMessage/focus";
import FormError from "../components/ErrorMessage/FormError";
import { makeCall, sendFormData, getErrorMessage } from "../common/api";
import { groupFieldsWithConfig } from "../common/regFunctions";
import Checkbox from "../components/Checkbox";

class SMSNotification extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.submitted = false;
    const { formName, fields: flds = [] } = props.data;
    const { fields = [] } = this.initFieldSate(flds || []);

    this.state = {
      fields,
      fieldsType: {},
      initialValues: {},
      formName,
      formError: "",
      captchaValue: ""
    };
  }

  initFieldSate = (_fields = []) => {
    const fields = _fields.map(item => {
      const _item = this.updateFieldType(item);
      const { name: _name = "", value: _value = "", initValue = "" } = _item;
      const name = _name ? String(_name).trim() : _name;
      const value = initValue ? initValue : _value;
      return {
        ..._item,
        name,
        value
      };
    });
    return {
      fields
    };
  };

  updateFieldType = (item = {}) => {
    const { sourceValue, type, value, fieldType: ft } = item;
    if (ft) {
      return item;
    }
    const _item = { ...item };
    if (type === "checkbox" && typeof sourceValue === "undefined") {
      _item["fieldType"] = typeof true;
    } else if (type === "hidden") {
      _item["fieldType"] = typeof value;
    } else if (sourceValue !== null) {
      if (typeof sourceValue === "object") {
        if (Array.isArray(sourceValue) && sourceValue.length) {
          _item["fieldType"] = typeof sourceValue[0].value;
        } else {
          _item["fieldType"] = "object";
        }
      } else {
        _item["fieldType"] = typeof sourceValue;
      }
    } else {
      _item["fieldType"] = typeof "string";
    }
    return _item;
  };

  setInitialState = fields => {
    const { formName } = this.props.data;

    const initialValues = fields
      .filter(({ type }) => {
        switch (type) {
          case "googleApi":
          case "text":
          case "tel":
          case "checkbox":
          case "hidden":
            return true;
          default:
            return false;
        }
      })
      .reduce((accumulator, { name, value, apiFlag }) => {
        let _value = value;

        return Object.assign(accumulator, {
          [name]: _value
        });
      }, {});

    return { initialValues };
  };

  componentDidMount() {
    if (!this.checkLogin()) {
      window.location.replace('/content/an/similac/us/en/app/login.html');
      return;
    }
    const { initialValues } = this.setInitialState(this.state.fields);
    this.setState({ initialValues });
    if (document.getElementById("pwa-sms-notnowbtn")) {
      document
        .getElementById("pwa-sms-notnowbtn")
        .addEventListener("click", () => {
          this.backToPreviousPage();
        });
    }
    $("#react-form-field-smsselect").click((e) => {
      ABBOTT.gtm.buildAndPush.formTracking(
        "sms-notification",
        "click",
        "pwa_personal-info_sms-notification_checkbox"
      );
    });
  }

  componentDidUpdate(){
    $("#react-form-field-smsselect").change(function () {
      var ischecked = $(this).is(':checked');
      if (!ischecked) {
        $('.similac-form-pwa-sms .checkbox-container').addClass('sms-notify');
      }
      else {
        $('.similac-form-pwa-sms .checkbox-container').removeClass('sms-notify');
      }
    });
  }

  waitUntil = async (captchaToken) => {
    return await new Promise(resolve => {
      var checkCaptchaValue = setInterval(() => {
        if (captchaToken === '') {
          window.grecaptcha.execute();
          captchaToken = window.grecaptcha.getResponse();
          if (captchaToken != "") {
            this.setState({ captchaValue: captchaToken });
            resolve(captchaToken);
            clearInterval(checkCaptchaValue);
          }
        }
      }, 100);
    })
  }

  checkError = (prom, errorMessage) => {
    if (prom instanceof Promise) {
      return prom.then(result => {
        if (typeof result === "boolean" && result === true) {
          return errorMessage;
        } else if (typeof result === "string") {
          return result;
        }
        return undefined;
      });
    } else if (prom) {
      return errorMessage;
    }
    return undefined;
  };

  makeValidations = (
    validateArray = [],
    name = "",
    type = "text",
    values = {}
  ) => value => {
    let _type =
      type === "textbox" || typeof type === "undefined" ? "text" : type;
    for (var item in validateArray) {
      const { errorType, errorMessage, ...otherErrorData } = validateArray[
        item
      ];
      const validationMess =
        validations[errorType] &&
        validations[errorType](value, _type, otherErrorData, values);
      if (validationMess) {
        return this.checkError(validationMess, errorMessage);
      }
    }
  };

  checkLogin() {    
    return ABBOTT.cookie("x-id-token");
  }
    /**
   *  Method to get user my profile  information from AWS
   */
  getProfileInfo = () => {
    const { actionPath } = this.props.data;
    let ajaxConfig = {
      url: actionPath,
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-country-code": "US",
        "x-application-id": "similac",
        "x-preferred-language": "en-US",
        "x-id-token": ABBOTT.utils.getSessionInfo()
      }
    };

    makeCall(ajaxConfig).then(results => {
      if (results.status) {
        let cookieConfig = {
          path: "/",
          domain: "similac.com"
        };
        this.backToPreviousPage();
      }    
    });
  };

  onSubmitValues = async values => {
    const { actionPathToUpdateProfile } = this.props.data;
    let formData = {
      userInfo: {
        "mobileNumber" : values && values.phone ? values.phone.replace(/\D/g, '') : "",
      },
      category: "profileInfo"
    };
    const loginToken = this.checkLogin();
    
    let _config = {
      headers: {
        "x-id-token": loginToken
      }
    };
    return await sendFormData(
      actionPathToUpdateProfile,
      formData,
      _config,
    ).then(results => {
      return results;
    });
  };

  checkBoxValidation = () => {
    if ($('#react-form-field-smsselect:checked').length > 0) {
      return true;
    }
    return false;
  }

  backToPreviousPage = () => {
	ABBOTT.gtm.buildAndPush.formTracking(
      "sms-notification",
      "click",
      "pwa_personal-info_add-phone-no_not-now"
    );
    let lpc;
    let smsSeenUser = "";
    let lp = ABBOTT.cookie("profile");
    if (lp) {
      lpc = JSON.parse(lp);
      smsSeenUser = lpc.email && lpc.email;
    }
    const cookieConfig = {
      path: "/",
      domain: "similac.com",
      expires: 1000
    };
    ABBOTT.cookie("pwaNotificationStatus"+smsSeenUser, JSON.stringify({ pwaNotificationStatus: true }), cookieConfig);
    if (window.history.length <= 3) {
      window.location = this.props.data.redirectOnSuccessURL;
    } else {
      window.history.go(-1);
    }
  }


  render() {
    const {
      initialValues,
      fields,
      formName,
      formError
    } = this.state;
    return (
      <div>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          innerRef={this.formRef}
          onSubmit={ async (values, actions) => {
          $('.similac-form-pwa-sms .checkbox-container').removeClass('sms-notify');
          if (!this.checkBoxValidation()) {
            $('.similac-form-pwa-sms .checkbox-container').addClass('sms-notify');
            return false;
          }
            if (!actions.isSubmitting) {
              return this.onSubmitValues(values)
                .then(result => {
                  const { errorCode, response, status } = result;
                  if (errorCode === 0 && status === true) {
                    if (this.props.data && this.props.data.redirectOnSuccessURL) {
                      this.getProfileInfo();
                    }
                  } else {
                    const { errorMessage = "Failed to submit" } =
                      getErrorMessage(result) || {};
                    actions.setSubmitting(false);
                    this.setState({ formError: errorMessage });
                  }
                  return result;
                })
                .catch(([jqXHR = {}]) => {
                  const { errorMessage = "Failed to submit" } =
                    getErrorMessage(jqXHR) || {};
                  actions.setSubmitting(false);
                  this.setState({ formError: errorMessage });
                });
            }
          }}
        >
          {({ values, errors, resetForm, setFieldValue }) => {
            return (
              <Form className="similac-form-pwa-sms">
                {fields.map(
                  (
                    {
                      label,
                      name,
                      row,
                      validations,
                      className,
                      disabled,
                      spellCheck,
                      mappedField,
                      ...field
                    },
                    index
                  ) => {
                    let _disabled = disabled;
                    if (values[mappedField] && values) {

                      if(name === "other"){
                        if(values[mappedField].value === "Other" ){
                          _disabled = false;
                        }
                        else{
                          _disabled = true;
                        }
                      }
                    
                      if(values[mappedField].value != "Other" && values["other"] !=""){
                        setFieldValue("other","");
                      }
                    }
                    if (field.type === "tel") {
                      return (
                        <Field
                          key={name + "tel" + field.type + index}
                          label={label}
                          name={name}
                          type={field.type}
                          maxLength={field.maxLength}
                          validate={this.makeValidations(
                            validations,
                            name,
                            field.type
                          )}
                          as={InputMasker}
                        />
                      );
                    } else if (field.type === "checkbox") {
                      return (
                        <Field
                          key={name + "checkbox" + label + index}
                          label={label}
                          name={name}
                          type={"checkbox"}
                          imagePath={field.imagePath}
                          fieldsType={field.fieldType}
                          validate={this.makeValidations(
                            validations,
                            name,
                            field.type
                          )}
                          as={Checkbox}
                        />
                      );
                    } else if (field.type === "captcha") {
                      return (
                        <Field
                          key={name + "captcha" + index}
                          label={label}
                          name={name}
                          type={field.type}
                          validate={this.makeValidations(
                            validations,
                            name,
                            field.type
                          )}
                          theme={field.theme}
                          sitekey={field.sitekey}
                          as={ReCaptcha}
                          size={field.size}
                        />
                      );
                    } else if (field.type === "htmltag") {
                      return (
                        <HtmlTag
                          key={label + field.tagName + index}
                          label={label}
                          className={field.btnClassName}
                          tagName={field.tagName}
                          id={field.id}
                          help={
                            (field.help && <Help data={field.help} />) || null
                          }
                        />
                      );
                    } else if (
                      field.type === "button" ||
                      field.type === "submit"
                    ) {
                      return (
                        <Button
                          key={field.type + index + name + index}
                          label={label}
                          className={field.btnClassName}
                          {...field}
                        />
                      );
                    } else if (field.type === "formError") {
                      return (
                        <FormError
                          key={field.type + index + name + index}
                          name={formName}
                          formError={formError}
                        />
                      );
                    }
                  }
                )}
                <Focus
                  formName={formName}
                  fields={fields}
                  formError={formError}
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

export default SMSNotification;
