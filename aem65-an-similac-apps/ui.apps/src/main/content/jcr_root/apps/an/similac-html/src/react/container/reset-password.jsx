import * as React from "react";
import { Formik, Form, Field } from "formik";
import swal from 'sweetalert'
import { SvgIcon } from "../common/common";
import InputField from "../components/InputField";
import HtmlTag from "../components/HtmlTag";
import Help from "../components/Help";

import validations from "../common/validations";
import { makeCall, getErrorMessage, getMessageForReg } from "../common/api";
import Button from "../components/Button";
import Focus from "../components/ErrorMessage/focus";
import FormError from "../components/ErrorMessage/FormError";
import PasswordStrength from "../components/PasswordStrength";
import Recaptcha from "../components/Recaptcha";
import getCaptchaToken,{captchaTypeObj, reCaptchaVType} from "../common/recaptcha";
class ResetPassword extends React.Component {
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
      showPass: {},
      formName,
      formError: "", 
      captchaValue: ""
    }
  }

  showToggle = (e, name) => {
    const { showPass = {} } = this.state;
    this.setState({
      showPass: {
        ...showPass,
        [name]: !showPass[name]
      }

    })
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
  
  checkError = (prom, errorMessage, name) => {
    if (prom instanceof Promise) {
      const refC = this.formRef.current;
      const currentError = refC.errors && refC.errors[name] || "";
      prom.then((result) => {
        if (typeof result === "boolean" && result === true) {
          return errorMessage;
        } else if (typeof result === "string") {
          return result;
        }
        return undefined;
      }).then(message => {
        if (name) {
          refC.setFieldError(name, message);
        }
      });
      if (currentError === errorMessage) {
        return errorMessage;
      }
      return undefined;
    } else if (prom) {
      return errorMessage;
    }
    return undefined;
  };

  componentDidMount() {
    this.gSiteKey = jQuery("#gSiteKey").length && jQuery("#gSiteKey").val();
  }

  makeValidations = (validateArray = [], name = "", type = "text", values = {}) => (
    value
  ) => {
    let _type =
      type === "textbox" || typeof type === "undefined" ? "text" : type;
    for (var item in validateArray) {
      const { errorType, errorMessage, ...otherErrorData } = validateArray[item];
      const validationMess =
        validations[errorType] && validations[errorType](value, _type, otherErrorData, values);
      if (validationMess) {
        return this.checkError(
          validationMess,
          errorMessage,
          name
        );
      }
    }
  };

  onSubmitValues = async (values) => {
    const { actionPath } = this.props.data;
    const URL = "?" + (window.location.href).split('?')[1];
    const urlParams = new URLSearchParams(URL);

    const password = Object.values(values)[0];
    const confirm_password = Object.values(values)[1];
    const resetToken = urlParams.get('token');
    const captchaToken =await getCaptchaToken(this.props.data.enableRecaptcha, this.gSiteKey);
    let data = { "password": password, "confirmPassword": confirm_password, "resetToken": resetToken,"captchaValue": captchaToken, "captchaType" : reCaptchaVType };

    data = JSON.stringify(data);

    let ajaxConfig = {
      "url": actionPath,
      data: data
    }
    return await makeCall(ajaxConfig).then(results => {
      return results;
    })
  }

  render() {
    const { fields } = this;
    const { showPass = {}, formName, formError } = this.state;
    const { initialValues } = this.setInitialState(fields);

    return (
      <div>
        <Formik
          initialValues={initialValues}

          onSubmit={async(values, actions) => {
            values.captchaType = reCaptchaVType;
            values.captchaValue = await getCaptchaToken(this.props.data.enableRecaptcha, this.gSiteKey);
            if (!actions.isSubmitting) {
              return this.onSubmitValues(values).then((result) => {
                ABBOTT.gtm.buildAndPush.formTracking('reset-password', 'click', 'reset-password_submit');
                const { errorCode, response, status } = result;
                if ((errorCode === 0 && status === true)) {
                  ABBOTT.gtm.buildAndPush.formTracking('reset-password', 'submit', 'reset-password_submit');
                  jQuery('#resetPassword').hide();
                  jQuery('.successMessage').show();
                }
                else {
                 this.setState({captchaValue:''});
                 actions.setSubmitting(false);
                  if( response.i18nMessageKey){
                    const dataValue = getMessageForReg(response.i18nMessageKey);
                    this.setState({ formError: dataValue });
                    }
                    else{
                      const dataValue = getMessageForReg(errorCode);
                      this.setState({ formError: dataValue });
                    }
                }

                return result;
              }).catch(([jqXHR = {}]) => {
                this.setState({captchaValue:''});
                const { errorMessage = getMessageForReg(GEN_ERR) } = getErrorMessage(jqXHR) || {};
                actions.setSubmitting(false);
                this.setState({ formError: errorMessage });
              });
            }
          }}
        >
          {(validatorObj) => {
            const {
              values,
              /* and other goodies */
            } = validatorObj;
            return (
              <Form className="similac-form">
                {fields.map(({ label, name, maxLength, validations, ...field }, index) => {

                  if (field.type === "textbox") {
                    return (
                      <Field
                        key={name + "textbox" + field.type + index}
                        label={label}
                        name={name}
                        type={
                          (field.type === "textbox" && "text") || field.type
                        }
                        maxLength={maxLength}
                        validate={this.makeValidations(
                          validations,
                          name,
                          field.type
                        )}
                        as={InputField}
                      />
                    );
                  }
                  if (field.type === "password") {
                    const isShowPass = !!showPass[name];
                    return (
                      <Field
                        key={name + "textbox" + field.type + index}
                        label={label}
                        name={name}
                        isShowPass={isShowPass}
                        type={(() => isShowPass ? "text" : "password")()}
                        icon={<SvgIcon name={name} icon={isShowPass ? "show" : "hide"} onClick={this.showToggle} />}
                        fieldId="showpasswordField"
                        iconClickable={true}
                        maxLength={maxLength}
                        validate={this.makeValidations(
                          validations,
                          name,
                          field.type,
                          values
                        )}
                        as={InputField}
                      />
                    );
                  }else if ( field.type === "captcha" && this.props.data.enableRecaptcha === "true") {
                    return (
                      <Field
                      name={name}
                      sitekey={field.sitekey}
                      as={Recaptcha}
                      size={field.size}
                      type={field.type}
                      fieldId={this.props.captchaId && this.props.captchaId}  
                      />
                    );  
                  } 
                  else if (field.type === "passwordstrength") {
                    const isShowPass = !!showPass[name];
                    return (
                      <Field
                        key={name + "textbox" + field.type + index}
                        label={label}
                        name={name}
                        isShowPass={isShowPass}
                        type={(() => isShowPass ? "text" : "password")()}
                        icon={<SvgIcon name={name} icon={isShowPass ? "show" : "hide"} onClick={this.showToggle} />}
                        fieldId="showpasswordField"
                        iconClickable={true}
                        maxLength={maxLength}
                        validate={this.makeValidations(
                          validations,
                          name,
                          field.type,
                          values
                        )}
                        passwordStrength={field.passwordStrength}
                        as={PasswordStrength}
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

export default ResetPassword;
