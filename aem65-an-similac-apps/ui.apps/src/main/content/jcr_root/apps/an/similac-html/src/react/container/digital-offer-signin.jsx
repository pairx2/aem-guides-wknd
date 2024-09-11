import * as React from "react";
import { Formik, Form, Field, useFormikContext } from "formik";
import InputField from "../components/InputField";
import HtmlTag from "../components/HtmlTag";
import {
  makeCall,
  sendFormData,
  getErrorMessage,
  getMessageForReg
} from "../common/api";
import Button from "../components/Button";
import Focus from "../components/ErrorMessage/focus";
import { groupFieldsWithConfig } from "../common/regFunctions";
import FormError from "../components/ErrorMessage/FormError";
import validations from "../common/validations";
import "../../js/social-login";
import { SvgIcon } from "../common/common";
import SocialLogin from "../components/SocialLogin";
import Divider from "../components/Divider";
import { flattenObject } from "../common/apiToLocal";
import LinkButton from "../components/Button/link";
import PasswordStrength from "../components/PasswordStrength";
import ReCaptcha from "../components/Recaptcha";
import getCaptchaToken,{captchaTypeObj, reCaptchaVType} from "../common/recaptcha";
class DigitalOfferSignIn extends React.Component {
  constructor(props) {
    super(props);

    //kount Create a Session ID
    const uuid = () => {
      const r = crypto.randomUUID().replace(/-/g, '');
      return r.toString();
    };
    
    //Adding campaign field to digital offer login
    const campaignField = {
      fieldType:"userDefined",
      name: "campaign",
      type:"hidden",
      value:""
    }
    const kountSessionID = uuid();
    const riskSessionObj = {
      fieldType: "userDefined",
      name: "riskSessionValue",
      type: "hidden",
      value: kountSessionID
    }
    const riskCheckObj = {
      fieldType: "userDefined",
      name: "riskCheck",
      type: "hidden",
      value: true
    }
    props.doSignIn.fields.push(campaignField);
    props.doSignIn.fields.push(captchaTypeObj);
    props.doCreatePassword.fields.push(captchaTypeObj);
    props.doCreatePassword.fields.push(riskSessionObj);
    props.doCreatePassword.fields.push(riskCheckObj);
    this.submitted = false;
    this.apiFields = [];
    this.checkLogin = this.checkLogin.bind(this);
    this.gSiteKey = "";
    this.state = {
      fields: [],
      fieldsType: {},
      initialValues: {},
      showPass: {},
      upemailid: null,
      formName: "",
      formError: "",
      formToRender: "",
      actionPath: "",
      actionPathOnLoad: "",
      redirectOnPartiallyRegistered: "",
      redirectOnSuccessURL: "",
      formTitle: "",
      isShowPass: false,
      errorUpdateProfile: "",
      errorUpdateProfileNonDOUser: "",
      captchaValue: "",
      captchaAccountId: "",
      campaignVal: ""
    };   
     this.setUserDO = true //initialize DO flag for DO decision
  }

  showToggle = e => {
    this.setState({
      isShowPass: !this.state.isShowPass
    });
  };


  showToggleS = (e, name) => {
    const { showPass = {} } = this.state;
    this.setState({
      showPass: {
        ...showPass,
        [name]: !showPass[name]
      }
    });
  };

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
      if(name === "loginID")
      {
      
        value =  window.sessionStorage.getItem("userName");
      }
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
  updatePassword = () => {
    let email = this.state.upemailid;
    const { forgotPasswordActionPath } = this.props.data;
    email = JSON.stringify({ email });
    jQuery("#updatepassword-popup").modal("hide");
    let ajaxConfig = {
      url: forgotPasswordActionPath,
      data: email
    };
    return makeCall(ajaxConfig).then(results => {
      return results;
    });
  };

  componentDidMount = values => {
    this.gSiteKey = jQuery("#gSiteKey").length && jQuery("#gSiteKey").val();
    const userInfo = window.sessionStorage.getItem("CreatePasswordForm___API");
    const formToRender = userInfo ? doCreatePassword : doSignIn;

    let users= {};
    let campaign='',  medium='', content='', source='', term = '';
    if(sessionStorage.getItem('MediaTracking')!=null){
    users =  JSON.parse(sessionStorage.getItem('MediaTracking'));
    campaign =  users.utm_campaign !=null? users.utm_campaign:""; 
    medium=  users.utm_medium !=null? users.utm_medium:"";
    content = users.utm_content !=null? users.utm_content:"";
    source =  users.utm_source !=null? users.utm_source:"";
    term = users.utm_term? users.utm_term:"";
  }

    formToRender.fields.map((data)=>{
      if(data.categoryType  === 'additionalProfileProperties' && data.name === "campaign"){
        data.initValue = campaign
      }else if(data.categoryType  === 'additionalProfileProperties' && data.name === "medium"){
        data.initValue = medium
      }else if(data.categoryType  === 'additionalProfileProperties' && data.name === "content"){
        data.initValue = content
      }else if(data.categoryType  === 'additionalProfileProperties' && data.name === "source"){
        data.initValue = source
      }else if(data.categoryType  === 'additionalProfileProperties' && data.name === "term"){
        data.initValue = term
      } else if(data.fieldType  === 'userDefined' && data.name === "campaign"){
        this.setState({
          campaignVal: campaign
        });
      } 
    })
   
   
    const {
      fields: flds = [],
      fieldsType,
      formName = "CreatePasswordForm",
      actionPath,
      actionPathOnLoad,
      redirectOnPartiallyRegistered,
      redirectOnSuccessURL,
      errorUpdateProfile,
      errorUpdateProfileNonDOUser,
      formTitle
    } = formToRender;
    const { fields = [] } = this.initFieldSate(flds || []);
    const { initialValues } = this.setInitialState(fields, formName);
    this.setState({
      formToRender: formToRender,
      fields,
      formName,
      actionPath,
      errorUpdateProfile,
      errorUpdateProfileNonDOUser,
      initialValues
    });
    if (document.getElementById("updatePassword")) {
      document
        .getElementById("updatePassword")
        .addEventListener("click", () => {
          this.updatePassword();
        });
    }
  };

  checkLogin() {
    return ABBOTT.cookie("x-id-token");
  }

  checkLocalData = formName => {
    return window.sessionStorage.getItem(formName);
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

  saveToLocal = (response = {}) => {
    const { formName } = this.state.formToRender;

    const fieldDataApi = flattenObject(response);
    window.sessionStorage.setItem(
      formName + "___API",
      JSON.stringify(fieldDataApi)
    );
  };
  setInitialState = (fields, formName) => {

    const localData = this.checkLocalData(formName);
    const localDataApi = this.checkLocalData(formName + "___API");
    let localDataParsed = "";
    let localApiDataParsed = "";
    if (localData) {
      localDataParsed = JSON.parse(localData);
      if (localDataApi) {
        const _local = JSON.parse(localDataApi);
        localApiDataParsed = _local.map(item => ({
          ...item,
          type: "hidden",
          apiFlag: true
        }));
      }
    }

    localApiDataParsed &&
      localApiDataParsed.map(item => {
        //get value of DO flag and set DO option
        if(item.name === "enableDigital" && !item.value){
          this.setUserDO = false;
        }
        if (!fields.find(({ name }) => name === item.name)) {
          this.apiFields.push(item);
        } else {
          localDataParsed[item.name] = item;
        }
      });

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

        return Object.assign(accumulator, {
          [name]: _value
        });
      }, {});

    return { initialValues };
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

  storeAccountInfo = (response, register) => {
   
 /**set cookie expiry time to one day */

    let cookieConfig = {
      path: '/',
      domain: 'similac.com',
     
    };
    if(!register){
       
const { accountInfo: { profile, UID = "", data: { userType = "" } } = {} }= response;
      const { dob = "", weeks = "", userSubType = "", lineOne = "", country = "", city = "", state = "", zipCode = "" } ="";

    console.log(JSON.stringify({ ...profile, UID, userType, dob, weeks, userSubType, lineOne, country, city, state, zipCode }));
  
    ABBOTT.cookie("profile", JSON.stringify({ ...profile, UID, userType, dob, weeks, userSubType, lineOne, country, city, state, zipCode }), cookieConfig);
    }
    else{
      const {
        userInfo: {
          firstName = "",
          lastName = "",
          address = "",
          city = "",
          country = "",
          userName: email = "",
          state = "",
          zip = "",
          uid: UID = "",
          idToken = "",
          userType = "",
          userSubType = "",
          dob = "",
          weeks = ""
        } = {}
      } = response;
      console.log(JSON.stringify({
        firstName,
        lastName,
        address,
        city,
        country,
        email,
        state,
        zip,
        UID,
        idToken,
        userType,
        dob,
        weeks
      }));
        
  
      ABBOTT.cookie(
        "profile",
        JSON.stringify({
          firstName,
          lastName,
          address,
          city,
          country,
          email,
          state,
          zip,
          UID,
          idToken,
          userType,
          dob,
          weeks
        }),
        cookieConfig
      );

    }
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

  checkLocalData = formName => {
    return window.sessionStorage.getItem(formName);
  };

  onSubmitValues = async values => {
    const { actionPath, eventCategory, eventType } = this.state.formToRender;
    //set DO value based child weeks child weeks
    if(!this.setUserDO){
      this.apiFields.push({
        "value": false,
        "name": "enableDigital",
        "path": [
            "offerPreferenceInfo",
            "enableDigital"
        ],
        "categoryType": "offerPreferenceInfo",
        "type": "hidden",
        "apiFlag": true
      });
    }
    let filteredValues = this.apiFields;
	  window.sessionStorage.setItem('promoOfferSwitchDO', true);
    let ga_type = eventType + "_submit";

    ABBOTT.gtm.buildAndPush.formTracking(eventCategory, "click", ga_type);
   
    return await sendFormData(
      actionPath,
      ...groupFieldsWithConfig(values, this.state.fields.concat(filteredValues))
    )
      .then(results => {
        return results;
      })
      .then(async results => {
        const { response, errorCode, status } = results;
        
        if (errorCode === 0 && status === true) {
          if (!window.sessionStorage.getItem("CreatePasswordForm___API")) {
          this.storeAccountInfo(response);
          }
          else{
            window.sessionStorage.setItem("setOpenDisruptor",true);
            this.storeAccountInfo(response,"register");
          }
          return results;
        } else {
         
          return results;
        }
      });
  };



  render() {
    const {
      isShowPass,
      showPass = {},
      initialValues,
      fields,
      formName,
      formError,
      formToRender,
      actionPath,
      errorUpdateProfile,
      errorUpdateProfileNonDOUser
    } = this.state;
    const { eventCategory, eventType } = this.state.formToRender;

    return (
      <div>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={ async (values, actions) => {
            if(!window.sessionStorage.getItem("CreatePasswordForm___API")){
              values.campaign = this.state.campaignVal;
            }
            values.captchaType = reCaptchaVType;
            values.captchaValue = await getCaptchaToken("true", this.gSiteKey);
            values.captchaAccountId = window.btoa(values.loginID);
            values.captchaAction = "digital-offer-signin";
            $("#overlay").show();
            if (!actions.isSubmitting) {
              return this.onSubmitValues(values)
                .then(result => {
                  this.setState({ upemailid: values.loginID });

                  const { errorCode, status, response } = result;
                  const retailer = JSON.parse(
                    window.sessionStorage.getItem("Sign In Form___API")
                  )
                    ? JSON.parse(
                        window.sessionStorage.getItem("Sign In Form___API")
                      ).offerPreferenceInfo.retailer
                    : null;
                  if (errorCode === 0 && status === true) {

                    let ga_type = eventType + "_submit_" + retailer;

                    ABBOTT.gtm.buildAndPush.formTracking(
                      eventCategory,
                      "submit",
                      ga_type
                    );

                    if (formToRender && formToRender.redirectOnSuccessURL) {
                      let offerParam = "#thanksDigital";

                      window.location =
                        formToRender.redirectOnSuccessURL + offerParam;
                    }
                  } else if (
                    errorCode === 400 &&
                    response.i18nMessageKey === "PM-1004"
                  ) {
                    jQuery("#updatepassword-popup").modal("show");
                    this.setState({captchaValue:''});
                  } else {
                    actions.setSubmitting(false);
                    let ga_type =
                      eventType + "_incorrect-password-try-again_" + retailer;

                    ABBOTT.gtm.buildAndPush.formTracking(
                      eventCategory,
                      "failed",
                      ga_type
                    );

                    if (response.i18nMessageKey === "UP-1002") {
                      this.setState({
                        formError: formToRender.errorUpdateProfile
                      });
                    } else if (response.i18nMessageKey === "UP-1003") {
                      this.setState({
                        formError: formToRender.errorUpdateProfileNonDOUser
                      });
                    } else if (response.i18nMessageKey === "AUTH-1005") {
                      this.setState({
                        formError: response.statusReason
                      });
                      if (errorCode === 400) {
                        //gtm for invalid captcha
                        ABBOTT.gtm.buildAndPush.formTracking(
                          "sign-in",
                          "error",
                          "login_recaptcha-decline"
                        );
                      }
                    } else {
                      if (response.i18nMessageKey) {
                        this.setState({
                          formError: getMessageForReg(response.i18nMessageKey)
                        });
                      } else {
                       
                        this.setState({
                          formError: getMessageForReg("GEN_ERR")
                        });
                      }
                    }
                    this.setState({captchaValue:''});
                  }

                  return result;
                })
                .catch(({ jqXHR = {} }) => {
                  const { status } = jqXHR;
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
              isSubmitting,
              showPass = {}
              /* and other goodies */
            } = validatorObj;

            return (
              <Form className="similac-form">
                {fields.map(
                  ({ label, name, validations, value, ...field }, index) => {
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
                          type={(() => (isShowPass ? "text" : "password"))()}
                          icon={
                            <SvgIcon
                              icon={isShowPass ? "show" : "hide"}
                              onClick={this.showToggle}
                            />
                          }
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
                    } else if (field.type === "passwordstrength") {
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
                          maxLength={field.maxLength}
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
                    } else if (field.type === "socialLogin") {
                      return (
                        <SocialLogin
                          key={"dropdown" + name + index}
                          name={name}
                          actionPath={actionPath}
                          formName={formName}
                          onLoginSuccess={this.storeAccountInfo}
                          {...field}
                          getToken={getCaptchaToken}
                          utmCampaign = {this.state.campaignVal}
                          enableRecaptcha = {"true"}
                          reCaptchaType = {reCaptchaVType}
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
                    else if (field.type === "captcha") {
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
                    else if (field.type === "htmltag") {
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
                      return (
                        <Divider
                          key={label + index}
                          className={field.className}
                        >
                          {label}
                        </Divider>
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
                    } else if (field.type === "hidden") {
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
                    else if (
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

export default DigitalOfferSignIn;
