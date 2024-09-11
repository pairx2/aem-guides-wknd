import * as React from "react";
import { Formik, Form, Field } from "formik";
import swal from 'sweetalert'

import InputField from "../components/InputField";
import HtmlTag from "../components/HtmlTag";

import validations from "../common/validations";
import { makeCall, getErrorMessage, getMessageForReg } from "../common/api";
import Button from "../components/Button";
import Focus from "../components/ErrorMessage/focus";
import FormError from "../components/ErrorMessage/FormError";
import Recaptcha from "../components/Recaptcha";
import getCaptchaToken,{captchaTypeObj, reCaptchaVType} from "../common/recaptcha";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.fields = props.data.fields.map(item =>
      item.hasOwnProperty('name') ? ({ ...item, name: String(item.name).trim().replace(/[ ]/g, '_') }) : item
    );
    this.submitted = false;
    props.data.fields.push(captchaTypeObj);
    const { formName, fields: flds = [] } = props.data;
    this.gSiteKey = "";
    this.state = {
      formName,
      formError: "",
      captchaValue: "",
      captchaAccountId: ""
    }
  }

  setInitialState = (fields) => {
    const initialValues = fields
      .filter((item) => item.type === "textbox")
      .reduce((accumulator, field) => {
        return Object.assign(accumulator, {
          [field.name]: field.value,
        });
      }, {});

    return { initialValues };
  };

  checkError = (prom, errorMessage) => {
    if (prom instanceof Promise) {
      return prom.then((result) => {
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

  makeValidations = (validateArray = [], name = "", type = "text") => (
    value
  ) => {
    let _type =
      type === "textbox" || typeof type === "undefined" ? "text" : type;
    for (var item in validateArray) {
      const { errorType, errorMessage, ...otherErrorData } = validateArray[item];
      const validationMess =
        validations[errorType] && validations[errorType](value, _type, otherErrorData);
      if (validationMess) {
        return this.checkError(
          validationMess,
          errorMessage
        );
      }
    }
  };


  setErrors = (values, fields) => {
    const errors = fields.reduce((accumulator, field) => {
      if (field.name && field.validations) {
        field.validations.some(({ type, messsage }) => {
          if (
            validations[type] &&
            validations[type](values[field.name], field.type)
          ) {
            accumulator[field.name] = messsage;
            return true;
          }
          return false;
        });
      }
      return accumulator;
    }, {});
    return errors;
  };
  onSubmitValues = async (values) => {
    const { actionPath } = this.props.data;
    let email = values["EMAIL_ADDRESS"];
    let captchaValue = values["captchaValue"];
    let captchaType = values["captchaType"];
    let captchaAccountId = values["captchaAccountId"];
    let captchaAction = values["captchaAction"];
    let ajaxConfig = {
      "url": actionPath,
      data: JSON.stringify({ email, captchaValue, captchaType, captchaAccountId, captchaAction })
    }
    return await makeCall(ajaxConfig).then(results => {
      return results;
    })
  }


  componentDidMount() {
    this.gSiteKey = jQuery("#gSiteKey").length && jQuery("#gSiteKey").val();
  }

  render() {
    const { fields } = this;
    const { formName, formError } = this.state;
    const { initialValues } = this.setInitialState(fields);

    return (
      <div>
        <Formik
          initialValues={initialValues}

          validate={(values) => {
          }}
          onSubmit=
          {async (values, actions) => {
            values.captchaType = reCaptchaVType;
            values.captchaValue = await getCaptchaToken(this.props.data.enableRecaptcha, this.gSiteKey, "forgot-password");
            values.captchaAccountId = window.btoa(values.EMAIL_ADDRESS);
            values.captchaAction = "forgot-password";
            $("#overlay").show();
            if (!actions.isSubmitting) {
              return this.onSubmitValues(values).then((result) => {
                ABBOTT.gtm.buildAndPush.formTracking('forgot-password', 'click', 'forgot-password_submit');
                const { errorCode, response, status } = result;
                if ((errorCode === 0 && status === true)) {
                  ABBOTT.gtm.buildAndPush.formTracking('forgot-password', 'submit', 'forgot-password_submit');
                  jQuery('#forgotPassword').hide();
                  jQuery('.successMessage').show();
                }
                else {
                  const { errorMessage = getMessageForReg(errorCode) } = getErrorMessage(result) || {};
                  actions.setSubmitting(false);
                  this.setState({captchaValue:''});
                  this.setState({ formError: errorMessage });
                }

                return result;
              }).catch(([jqXHR = {}]) => {
                const { errorMessage = getMessageForReg("GEN_ERR") } = getErrorMessage(jqXHR) || {};
                actions.setSubmitting(false);
                this.setState({ formError: errorMessage });
              });
            }
          }}
        >
          {(validatorObj) => {
            const {
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            } = validatorObj;
            
            return (
              <Form className="similac-form">
                {fields.map(({ label, name, validations, ...field }, index) => {
                  if (field.type === "textbox" || field.type === "password") {
                    return (
                      <Field
                        key={name + "textbox" + field.type + index}
                        label={label}
                        name={name}
                        maxLength={field.maxLength}
                        type={
                          (field.type === "textbox" && "text") || field.type
                        }
                        validate={this.makeValidations(
                          validations,
                          name,
                          field.type
                        )}
                        as={InputField}
                      />
                    );
                  } else if (
                    field.type === "formError"
                  ) {
                    return (
                      <FormError
                        key={field.type + index + name + index}
                        name={formName}
                        formError={formError}
                      />
                    );
                  } else if (field.type === "htmltag") {
                    return (
                      <HtmlTag
                        key={label + field.tagName + index}
                        label={label}
                        className={field.btnClassName}
                        tagName={field.tagName}
                        help={
                          (field.help && <Help data={field.help} />) || null
                        }
                      />
                    );
                  } else if (field.type === "captcha" && this.props.data.enableRecaptcha === "true") {
                    return (
                      <Field
                        name={name}
                        sitekey={field.sitekey}
                        as={Recaptcha}
                        size={field.size}
                        type={field.type}
                      />
                    );
                  }
                  else if (
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
                  }
                })}
                <Focus formName={formName} fields={fields} formError={formError} />
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

export default ForgotPassword;
