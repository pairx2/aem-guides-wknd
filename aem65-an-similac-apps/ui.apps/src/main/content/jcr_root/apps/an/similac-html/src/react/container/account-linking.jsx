import * as React from "react";
import { Formik, Form, Field, useFormikContext } from "formik";
import swal from "sweetalert";
import Checkbox from "../components/Checkbox";
import InputField from "../components/InputField";
import HtmlTag from "../components/HtmlTag";
import RegistrationCaptcha from "../components/Captcha";
import validations from "../common/validations";
import {
  makeCall,
  sendFormData,
  getErrorMessage,
  getMessageForReg
} from "../common/api";
import Button from "../components/Button";
import Divider from "../components/Divider";
import Focus from "../components/ErrorMessage/focus";
import FormError from "../components/ErrorMessage/FormError";
import { groupFields } from "../common/regFunctions";
import PasswordStrength from "../components/PasswordStrength";
import { SvgIcon } from "../common/common";
import Recaptcha from "../components/Recaptcha";
import getCaptchaToken,{captchaTypeObj, reCaptchaVType} from "../common/recaptcha";

class AccountLinking extends React.Component {
  constructor(props) {
    super(props);
    this.submitted = false;
    props.data.site.fields.push(captchaTypeObj);
    props.data.social.fields.push(captchaTypeObj);
    props.data.reRegister.fields.push(captchaTypeObj);
    const { formName, fields: flds = [] } = props.data;
    const { fields = [] } = this.initFieldSate(flds || []);
    this.formRef = React.createRef();

    this.checkLogin = this.checkLogin.bind(this);
    this.gSiteKey = "";
    this.state = {
      fields,
      gigyaData: {},
      fieldsType: {},
      initialValues: {},
      formName,
      formError: "",
      responseReceived: false,
      provider: "",
      showPass: {},
      isShowPassConfirm: false,
      captchaValue: "",
      captchaAccountId:"",
    };
  }

  showToggle = (e, name) => {
    const { showPass = {} } = this.state;
    this.setState({
      showPass: {
        ...showPass,
        [name]: !showPass[name]
      }
    });
  };

  showToggleConfirm = e => {
    this.setState({
      isShowPassConfirm: !this.state.isShowPassConfirm
    });
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

  checkLogin() {
    return ABBOTT.cookie("x-id-token");
  }

  initFieldSate = (_fields = []) => {
    const fields = _fields.map(item => {
      const _item = this.updateFieldType(item);
      const { name: _name = "", value: _value = "", initValue = "" } = _item;
      const name = _name
        ? String(_name)
            .trim()
            .replace(/[ ]/g, "_")
        : _name;
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

  getProviders = providerName => {
    return providerName != "site";
  };

  setStateFieldsDynamic = responseKey => {
    this.setState({
      fields: jsonData[responseKey].fields.map(item =>
        item.hasOwnProperty("name")
          ? {
              ...item,
              name: String(item.name)
                .trim()
                .replace(/[ ]/g, "_")
            }
          : item
      )
    });
  };

  componentDidMount(values) {
    this.gSiteKey = jQuery("#gSiteKey").length && jQuery("#gSiteKey").val();
    let reg_token = { registrationToken: sessionStorage.getItem("regToken") };
    const { actionPathLinkingAccount } = this.props.data;
    const { actionPath } = this.props.data;
    const { redirectOnSuccessURL } = this.props.data;
    const { myOffersURL } = this.props.data;

    let data = JSON.stringify(reg_token);

    let ajaxConfigOnLoad = {
      url: actionPathLinkingAccount,
      data: data
    };
    ABBOTT.gtm.buildAndPush.formTracking(
      "social-account-connect",
      "page-load",
      "social-account-connect"
    );
    makeCall(ajaxConfigOnLoad).then(resultData => {
      if (resultData.errorCode === 500) {
        const dataValue = getMessageForReg("GEN_ERR");
        $("#template.global-error p").html(dataValue);
        $("#template").show();
      }
      const responseType =
      resultData.response.conflictingAccount.loginProviders;
      const type = responseType.includes("site");

      if (type) {
        if (responseType.length == 1) {
          this.setStateFieldsDynamic("site");
        } else {
          this.setStateFieldsDynamic("reRegister");
        }
      } else {
        this.setStateFieldsDynamic("social");
      }

      this.setState({ responseReceived: true });
      const { initialValues } = this.setInitialState(this.state.fields);
      initialValues.loginID = window.sessionStorage.getItem("loginID") || "";
      this.setState({ initialValues });

      let providers = responseType.filter(this.getProviders);
      providers = providers.join();
      this.setState({ provider: providers });
      var gigya_url = jQuery("#gigyaURL").val();
      
      var newThis=this;
      jQuery.getScript(gigya_url).done(function(script, textStatus) {
        window.gigya.socialize.showLoginUI({
          version: 2,
          showTermsLink: "false",
          height: "auto",
          width: "100%",
          containerID: "SocialLoginDivAccountLinking",
          buttonsStyle: "fullLogoColored",
          enabledProviders: providers,
          loginMode: "link",
          regToken: window.sessionStorage.getItem("regToken") || "",
          onLogin: function(e) {},

          onError: async e => {
            ABBOTT.gtm.buildAndPush.formTracking(
              "social-account-connect",
              "click",
              newThis.state.provider
            );
            if (e.errorCode === "200009") {
              if (newThis.state.captchaValue === "") {
                let token = await getCaptchaToken(this.props.data.enableRecaptcha, this.gSiteKey);
                  newThis.setState({ captchaValue: token });
              }              
              let ajaxConfigLogin = {
                url: actionPath,
                headers: {
                  registrationtoken: e.response.regToken,
                  rememberme: false
                },
                data: JSON.stringify({ captchaValue: newThis.state.captchaValue, captchaType : reCaptchaVType })
              };

              makeCall(ajaxConfigLogin).then(resultData => {

                const { errorCode, status, response } = resultData;
                if (errorCode === 0 && status === true) {
                  ABBOTT.storeAccountInfo(response);
                  let offerParam = "#thanksDigital";
                  let offerURLUpdated =
                  newThis.props.data.myOffersURL + offerParam;
                  let purchaserType = window.localStorage.getItem(
                    "purchaser_type"
                  );
                  let userOrigin = window.sessionStorage.getItem(
                    "userDirectedFrom"
                  );
                  if (newThis.props.data && newThis.props.data.redirectOnSuccessURL) {
                    if (!userOrigin || userOrigin !== "checkoutLogin") {
                      window.location = window.sessionStorage.getItem(
                        "Sign In Form___API"
                      )
                        ? offerURLUpdated
                        : newThis.props.data.redirectOnSuccessURL;
                    } else if (userOrigin === "checkoutLogin") {
                      if (
                        purchaserType === "subscription_user" &&
                        response.accountInfo.data.userType === "similac-ecom"
                      ) {
                        window.sessionStorage.removeItem("userDirectedFrom");
                        window.location = newThis.props.data.redirectOnSuccessURLSubscription;
                      } else {
                        window.sessionStorage.removeItem("userDirectedFrom");
                        window.location = newThis.props.data.checkoutPageURL;
                      }
                    }
                  }
                } else {
                  if (errorCode === 500) {
                    const dataValue = getMessageForReg("GEN_ERR");
                    console.log(dataValue);
                    $("#template.global-error p").html(dataValue);

                    $("#template").show();
                  } else {
                    this.setState({ formError: getMessageForReg("GEN_ERR") });
                  }
                }
              });
            }
          },
          onButtonClicked: function(e) {
          },
          cid: ""
        });
      });
    });
  }
  
  setGigyaData = (gigyaData = {}, gigyaFields = []) => {
    var gigyKeys = Object.keys(gigyaData);
    var fields = this.state.fields
      .map(item => {
        if (gigyaFields.includes(item.name)) {
          gigyaFields = gigyaFields.filter(_item => _item === item.name);
        }

        return gigyKeys.includes(item.name)
          ? { ...item, value: gigyaData[item.name] }
          : item;
      })
      .concat(
        gigyaFields.map(field => ({
          type: "hidden",
          name: field,
          categoryType: "userInfo",
          value: gigyaData[field]
        }))
      );
    this.setState({
      gigyaData,
      fields,
      formError: ""
    });
  };

  setInitialState = fields => {
    const { formName } = this.props.data;
    const initialValues = fields
      .filter(({ type }) => {
        switch (type) {
          case "textbox":
          case "text":
          case "checkbox":
          case "dropdown":
          case "captcha":
            return true;
          default:
            return false;
        }
      })
      .reduce((accumulator, { name, value }) => {
        let _value = value;
        return Object.assign(accumulator, {
          [name]: _value
        });
      }, {});

    return { initialValues };
  };

  onLoginSuccess = async () => {
    const loginToken = this.checkLogin();
    const { actionPathToUpdateProfile } = this.props.data;
    if (window.sessionStorage.getItem("Sign In Form___API")) {
      const formData = window.sessionStorage.getItem("Sign In Form___API");
      let ajaxConfigOnLoad = {
        url: actionPathToUpdateProfile,
        headers: {
          "x-id-token": loginToken
        },
        data: formData
      };

      return await makeCall(ajaxConfigOnLoad).then(resultData => {
        return resultData;
      });
    }
  };

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

  onSubmitValues = async values => {
    const { actionPath } = this.props.data;
    const filteredValues = this.state.fields.filter(
      ({ name }) => name !== "confirmpassword"
    );
    let remember_me = false;
    if (values && values["rememberMe"]) {
      remember_me = true;
    }
    const _config = {
      headers: {
        rememberme: remember_me,
        registrationtoken: sessionStorage.getItem("regToken")
      }
    };

    return await sendFormData(
      actionPath,
      groupFields(values, filteredValues),
      _config
    )
      .then(results => {

        return results;
      })
      .then(async results => {
        if (window.sessionStorage.getItem("Sign In Form___API")) {
          const data = await this.onLoginSuccess();
          if (data.errorCode === 0 && data.status === true) {
            return results;
          }
        } else {
          return results;
        }
      });
  };

  render() {
    if (!this.state.responseReceived) {
      return null;
    }

    const {
      showPass = {},
      initialValues,
      isShowPassConfirm,
      fields,
      formName,
      formError = ""
    } = this.state;

    return (
      <div>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={async (values, actions) => {
            $("#overlay").show();
              values.captchaType = reCaptchaVType;  
              values.captchaValue = await getCaptchaToken(this.props.data.enableRecaptcha, this.gSiteKey);
              values.captchaAccountId = window.btoa(values.loginID);
              values.captchaAction = "account-linking";
            if (!actions.isSubmitting) {
              return this.onSubmitValues(values)
                .then(result => {
                  const { errorCode, status, response } = result;
                  if (errorCode === 0 && status === true) {
                    ABBOTT.storeAccountInfo(response);
                    if (
                      this.props.data &&
                      this.props.data.redirectOnSuccessURL
                    ) {
                      let offerParam = "#thanksDigital";
                      let offerURLUpdated =
                        this.props.data.myOffersURL + offerParam;
                      let purchaserType = window.localStorage.getItem(
                        "purchaser_type"
                      );
                      let userOrigin = window.sessionStorage.getItem(
                        "userDirectedFrom"
                      );
                      if (!userOrigin || userOrigin !== "checkoutLogin") {
                        window.location = window.sessionStorage.getItem(
                          "Sign In Form___API"
                        )
                          ? offerURLUpdated
                          : this.props.data.redirectOnSuccessURL;
                      } else if (userOrigin === "checkoutLogin") {
                        if (
                          purchaserType === "subscription_user" &&
                          response.accountInfo.data.userType === "similac-ecom"
                        ) {
                          window.sessionStorage.removeItem("userDirectedFrom");
                          window.location = this.props.data.redirectOnSuccessURLSubscription;
                        } else {
                          window.sessionStorage.removeItem("userDirectedFrom");
                          window.location = this.props.data.checkoutPageURL;
                        }
                      }
                    }
                  } else {
                    this.setState({ captchaValue: "" });
                    const { errorMessage = getMessageForReg(errorCode) } =
                      getErrorMessage(errorCode) || {};
                    actions.setSubmitting(false);
                    if (errorCode === 500) {
                      $("#template.global-error p").html(errorMessage);

                      $("#template").show();
                    } else if (
                      errorCode === 400 &&
                      response.i18nMessageKey === "AUTH-1005"
                    ) {
                      this.setState({ formError: response.statusReason });
                    } else if (
                      errorCode === 400 &&
                      response.i18nMessageKey &&
                      response.i18nMessageKeyAvailable !== false
                    ) {
                      const errMessage = getMessageForReg(
                        response.i18nMessageKey
                      );
                      this.setState({ formError: errMessage });
                    } else {
                      this.setState({ formError: errorMessage });
                    }
                  }

                  return result;
                })
                .catch(({ jqXHR = {} }) => {
                  const { status } = jqXHR;
                  const { errorMessage = getMessageForReg(errorCode) } =
                    getErrorMessage(status) || {};
                  actions.setSubmitting(false);
                  if (results.errorCode === 500) {
                    $("#template.global-error p").html(errorMessage);

                    $("#template").show();
                  } else {
                    this.setState({ formError: errorMessage });
                  }
                });
            }
          }}
        >
          {validatorObj => {
            const {
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue
              /* and other goodies */
            } = validatorObj;

            return (
              <Form className="similac-form">
                {fields.map(({ label, name, validations, ...field }, index) => {
                  if (field.type === "textbox") {
                    return (
                      <Field
                        key={name + "textbox" + field.type + index}
                        label={label}
                        name={name}
                        type={
                          (field.type === "textbox" && "text") || field.type
                        }
                        maxLength={field.maxLength}
                        validate={this.makeValidations(
                          validations,
                          name,
                          field.type,
                          values,
                          field.disabled
                        )}
                        disabled={field.disabled || false}
                        fieldLoader={field.fieldLoader || false}
                        as={InputField}
                      />
                    );
                  }
                  if (field.type === "password") {
                    return (
                      <Field
                        key={name + "textbox" + field.type + index}
                        label={label}
                        name={name}
                        isShowPass={isShowPassConfirm}
                        type={(() =>
                          isShowPassConfirm ? "text" : "password")()}
                        icon={
                          <SvgIcon
                            icon={isShowPassConfirm ? "show" : "hide"}
                            onClick={this.showToggleConfirm}
                          />
                        }
                        fieldId="showpasswordField"
                        iconClickable={true}
                        maxLength={field.maxLength}
                        validate={this.makeValidations(
                          validations,
                          name,
                          field.type,
                          values
                        )}
                        as={InputField}
                      />
                    );
                  } else if (field.type === "passwordstrength") {
                    const isShowPass = !!showPass[name];
                    return (
                      <Field
                        key={name + "textbox" + field.type + index}
                        label={label}
                        name={name}
                        type={(() => (isShowPass ? "text" : "password"))()}
                        isShowPass={isShowPass}
                        className={field.btnClassName}
                        icon={
                          <SvgIcon
                            name={name}
                            icon={isShowPass ? "show" : "hide"}
                            onClick={this.showToggle}
                          />
                        }
                        fieldId="showpasswordField"
                        iconClickable={true}
                        maxLength={maxLength}
                        validate={this.makeValidations(
                          validations,
                          name,
                          field.type,
                          values,
                          field.disabled
                        )}
                        passwordStrength={field.passwordStrength}
                        as={PasswordStrength}
                      />
                    );
                  } else if (
                    field.type === "captcha" &&
                    this.props.data.site.enableRecaptcha === "true"
                  ) {
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
                  } else if (field.type === "divider") {
                    return <Divider key={label + index}>{label}</Divider>;
                  }
                  else if (field.type === "checkbox") {
                    return (
                      <Field
                        key={name + "checkbox" + label + index}
                        label={label}
                        name={name}
                        type={"checkbox"}
                        imagePath={field.imagePath}
                        validate={this.makeValidations(
                          validations,
                          name,
                          field.type
                        )}
                        as={Checkbox}
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

export default AccountLinking;
