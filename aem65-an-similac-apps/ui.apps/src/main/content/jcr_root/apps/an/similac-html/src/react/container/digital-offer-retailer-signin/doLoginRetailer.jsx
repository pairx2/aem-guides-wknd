import * as React from "react";
import { Formik, Form, Field } from "formik";
import InputField from "../../components/InputField";
import HtmlTag from "../../components/HtmlTag";
import { sendFormData, getErrorMessage, getMessageForReg } from "../../common/api";
import Button from "../../components/Button";
import Focus from "../../components/ErrorMessage/focus";
import { groupFields } from "../../common/regFunctions";
import FormError from "../../components/ErrorMessage/FormError";
import validations from "../../common/validations";
import Divider from "../../components/Divider";
import { SvgIcon } from "../../common/common";
import LinkButton from "../../components/Button/link";
import PasswordStrength from "../../components/PasswordStrength";
import ReCaptcha from "../../components/Recaptcha";
import getCaptchaToken,{captchaTypeObj, reCaptchaVType} from "../../common/recaptcha";

class DigitalOfferRetailerLogin extends React.Component {
  constructor(props) {
    super(props);
    //Adding campaign field to digital offer login
    const campaignField = {
      fieldType:"userDefined",
      name: "campaign",
      type:"hidden",
      value:""
    }
    props.fields.push(campaignField);
    props.fields.push(captchaTypeObj);
    this.submitted = false;
    const { formName, fields: flds = [] } = props;
    const { fields = [] } = this.initFieldSate(flds || []);
    this.sitekey = "";
    this.state = {
      fields,
      fieldsType: {},
      initialValues: {},
      formName,
      formError: "",
      isShowPass: false,
      upemailid:null,
      userName: "",
      captchaValue: "",
      campaignVal: "",
      captchaAccountId: ""
    };
  }

  getParamFromURL = () => {
    const url = window.location.href;
    let param;
    if (url.includes("?")) {
      param = "?" + url.split("?")[1];
      const valueUrlParams = new URLSearchParams(param);
      let email = valueUrlParams.get("em");
      if (email) {
        try {
          return window.atob(email);
        } catch (error) {
          return null;
        }
      }
    }
  }
  
  
  showToggle = (e) => {
    this.setState({
      isShowPass: !this.state.isShowPass

    })
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
      let value = initValue ? initValue : _value;
     
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
    const initialValues = fields
      .filter(({ type }) => {
        switch (type) {
          case "textbox":
          case "googleApi":
          case "text":
          case "tel":
          case "checkbox":
          case "dropdown":
          case "radio":
          case "radio-button":
          case "calender":
          case "hidden":
            return true;
          default:
            return false;
        }
      })
      .reduce((accumulator, { name, value }) => {
        let _value = value;

        if (name === 'loginID') {
          // Set the value of 'claimCode' to the pre-populated value
          _value = this.getParamFromURL();
        }

        return Object.assign(accumulator, {
          [name]: _value
        });
      }, {});

    return { initialValues };
  };
  updatePassword = () => { 
    let email = this.state.upemailid;
    const { forgotPasswordActionPath } = this.props.data;
    email = JSON.stringify({ email });
    jQuery("#updatepassword-popup").modal("hide");
    let ajaxConfig = {
      "url": forgotPasswordActionPath,
      data: email
    }
    return makeCall(ajaxConfig).then(results => {
      return results;
    }) 
}

  componentDidMount() {
  this.gSiteKey = jQuery("#gSiteKey").length && jQuery("#gSiteKey").val();
	window.sessionStorage.setItem('promoOfferSwitchDO', true);
    const { initialValues } = this.setInitialState(this.state.fields);
    this.setState({ initialValues });
    if(document.getElementById("updatePassword")){
      document.getElementById("updatePassword").addEventListener("click", ()=> {
        this.updatePassword()
      }); 
    }
    let users= {};
    let campaign='';
      if(sessionStorage.getItem('MediaTracking')!=null){
      users =  JSON.parse(sessionStorage.getItem('MediaTracking'));
      campaign =  users.utm_campaign !=null? users.utm_campaign:""; 
      this.setState({
        campaignVal: campaign
      });
    }
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
  storeAccountInfo = ({ accountInfo: { profile, UID = "", data: { userType = "" } } = {} }) => {

    let cookieConfig = {
      path: '/',
      domain: 'similac.com'
    };
    console.log(JSON.stringify({ ...profile, UID, userType }));

    return ABBOTT.cookie("profile", JSON.stringify({ ...profile, UID, userType }), cookieConfig);
  }

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
    const { actionPath, eventCategory, eventType } = this.props;
    return await sendFormData(
      actionPath,
      groupFields(values, this.state.fields)
    ).then(results => {
      return results;
    });
  };

  render() {
    const { isShowPass, initialValues, fields, formName, formError} = this.state;
    const {eventCategory,
      eventType} = this.props;
    return (
      <div>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={ async (values, actions) => {
            values.campaign = this.state.campaignVal;
            values.captchaType = reCaptchaVType;
            values.captchaValue = await getCaptchaToken("true", this.gSiteKey);
            values.captchaAccountId = window.btoa(values.loginID);
            values.captchaAction = "login";
            $("#overlay").show();
            if (!actions.isSubmitting) {
              return this.onSubmitValues(values)
                .then(result => {
                  this.setState({ upemailid: values.loginID });
                  
                  const { errorCode, status, response } = result;
                  if (errorCode === 0 && status === true) { 
                    
                    let ga_type = eventType + '_sign-in-button_submit'; 
                    ABBOTT.gtm.buildAndPush.formTracking(eventCategory, "click", ga_type);
                    ABBOTT.storeAccountInfo(response);
                    if (this.props && this.props.redirectOnSuccessURL) {
                      window.location = this.props.redirectOnSuccessURL;
                    }
                  }
                  else if (errorCode === 400 && response.i18nMessageKey === "PM-1004") {
                    jQuery("#updatepassword-popup").modal("show");
                    this.setState({captchaValue:''});
                  }
                  else if (errorCode === 400 && response.i18nMessageKey === "AUTH-1005") {
                     $("#overlay").hide();
                     this.setState({captchaValue:''});
                     getErrorMessage(errorCode) || {};
                     actions.setSubmitting(false);
                     if (response.i18nMessageKey) {
                       this.setState({ formError: response.statusReason });
                     }
                    //gtm for invalid captcha
                    ABBOTT.gtm.buildAndPush.formTracking(
                      "sign-in",
                      "error",
                      "login_recaptcha-decline"
                    );
                  }
                  else if(errorCode === 400 && response.i18nMessageKey === "AUTH-1001"){
                    let ga_type = eventType + '_forgot-password'; 
                    ABBOTT.gtm.buildAndPush.formTracking(eventCategory, "failed", ga_type);
                    getErrorMessage(errorCode) || {};
                    actions.setSubmitting(false);
                    if (response.i18nMessageKey) {
                      this.setState({ formError: getMessageForReg(response.i18nMessageKey) });
                    }
                    this.setState({captchaValue:''});
                  }
                  else if(errorCode === 500){
                    getErrorMessage(errorCode) || {};
                    actions.setSubmitting(false);
                    let ga_type = eventType + '_received-error-message'; 
                    ABBOTT.gtm.buildAndPush.formTracking(eventCategory, "error", ga_type);
                    this.setState({ formError: getMessageForReg("GEN_ERR") });
                    this.setState({captchaValue:''});
                  }
                  else { 
                    getErrorMessage(errorCode) || {};
                    actions.setSubmitting(false);
                    if (response.i18nMessageKey) {
                      this.setState({ formError: getMessageForReg(response.i18nMessageKey) });
                    }
                    else {
                      this.setState({ formError: getMessageForReg("GEN_ERR") });
                    }
                    this.setState({captchaValue:''});
                  } 
                  return result;
                })
                .catch(({ jqXHR = {} }) => { 
                  const { status } = jqXHR;
                  getErrorMessage(status) || {};
                  actions.setSubmitting(false);
                  this.setState({ formError: getMessageForReg("GEN_ERR") });
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
              handleSubmit,
              isSubmitting
            } = validatorObj;

            return (
              <Form className="similac-form" autocomplete="off">
                {fields.map(
                  (
                    { label, name, validations, value, ...field },
                    index
                  ) => {


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
                            field.type
                          )}
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
                          isShowPass={isShowPass}
                          type={(() => isShowPass ? "text" : "password")()}
                          icon={<SvgIcon icon={isShowPass ? "show" : "hide"} onClick={this.showToggle} />}
                          fieldId="showpasswordField"
                          iconClickable={true}
                          maxLength={field.maxLength}
                          validate={this.makeValidations(
                            validations,
                            name,
                            field.type
                          )}
                          as={InputField}
                        />
                      );
                    }else if (field.type === "captcha") {
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
                    }
                    else if (field.type === "hidden") {
                      return (
                        <Field
                          key={name + "textbox" + field.type + index}
                          type={"text"}
                          style={{ display: "none" }}
                          name={name}
                          value={field.value}
                          as={"input"}
                        />
                      );
                    }
                    else if (field.type === "formError") {
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
                    } else if (field.type === "divider") {
                      return <Divider key={label + index}>{label}</Divider>;
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
                    }else if (
                      field.type === "link" ||
                      field.type === "linkButton"
                    ) {
                      return (
                        <LinkButton
                          key={field.type + index + name + index}
                          label={label}
                          className={field.btnClassName}
                          {...field}
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

export default DigitalOfferRetailerLogin;


