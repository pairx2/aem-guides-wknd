import * as React from "react";
import { Formik, Form, Field} from "formik";
import InputField from "../../components/InputField";
import HtmlTag from "../../components/HtmlTag";
import Help from "../../components/Help";
import ReCaptcha from "../../components/Recaptcha";
import {
  makeCall,
  sendFormData,
  getErrorMessage,
  getMessageForReg
} from "../../common/api";
import Button from "../../components/Button";
import Focus from "../../components/ErrorMessage/focus";
import {
  groupFieldsWithConfig,
  convertToISODate
} from "../../common/regFunctions";
import FormError from "../../components/ErrorMessage/FormError";
import validations from "../../common/validations";
import Divider from "../../components/Divider";
import { flattenObject } from "../../common/apiToLocal";
import moment from "moment";
import PasswordStrength from "../../components/PasswordStrength";
import getCaptchaToken,{captchaTypeObj, reCaptchaVType} from "../../common/recaptcha";
class DigitalOfferRetailerRegister extends React.Component {
  constructor(props) {
    super(props);
    this.submitted = false;
    props.fields.push(captchaTypeObj);
    const { formName, fields: flds = [] } = props;
    const { fields = [] } = this.initFieldSate(flds || []);
    this.gStieKey = "";
    this.state = {
      fields,
      fieldsType: {},
      initialValues: {},
      formName,
      formError: "",
      showPass: {},
      userName:"",
      captchaValue: ""
    };
    console.log(this.state.userName);
   
  }

  getProfileID = () => {
    const URL = "?" + window.location.href.split("?")[1];
    const urlParams = new URLSearchParams(URL);
    let memberId = urlParams.get("memberId") || urlParams.get("Id") || urlParams.get("id");
    if(memberId){
    // changing Buffer object to atob bcoz its not supported in upgraded Node version  
		let buffer = atob(memberId)
		buffer = buffer.toString();
		const memId=(buffer.split("|"));
		return memId[0];
   }else{
    return memberId;
   }
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

  showToggle = (e, name) => {
    const { showPass = {} } = this.state;
    this.setState({
      showPass: {
        ...showPass,
        [name]: !showPass[name]
      }
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

        if (name === "memberId") {
          // Set the value of 'memberId' to the pre-populated value
          _value = this.getProfileID();
        }

        return Object.assign(accumulator, {
          [name]: _value
        });
      }, {});

    return { initialValues };
  };
 
  //promo offer lookup with email string on page load
 async componentDidMount() {
  this.gSiteKey = jQuery("#gSiteKey").length && jQuery("#gSiteKey").val();
    const { initialValues } = this.setInitialState(this.state.fields);
    this.setState({ initialValues });
    let memberId = this.getProfileID();
    let values={};
    let captchaValue = await getCaptchaToken("true", this.gSiteKey);
    if(!memberId){
      window.sessionStorage.removeItem("userName");
      window.sessionStorage.removeItem(this.props.saveLocal);
      window.sessionStorage.removeItem(this.props.saveLocal+ "___API");
    }
    else{
      let ajaxConfigOnLoad = {
        url: this.props.actionPath,
        data: JSON.stringify({ memberId,captchaValue,captchaType: reCaptchaVType })
      };

      makeCall(ajaxConfigOnLoad).then(results => {
       
        const { additionalProfileProperties, userInfo } = results.response;
        console.log(JSON.stringify(results));
        window.sessionStorage.setItem("userName",userInfo.userName);
       
        if(additionalProfileProperties && additionalProfileProperties.webAccountSource && additionalProfileProperties.webAccountSource !== undefined && additionalProfileProperties.webAccountSource!== null){
      window.sessionStorage.removeItem(this.props.saveLocal);
      window.sessionStorage.removeItem(this.props.saveLocal+ "___API");
      window.location.href= this.props.redirectOnSuccessURL;
    }
      else{
        this.saveToLocal(values, results.response);
        window.location.href= this.props.redirectOnSuccessURL;
        
      }
         
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
  saveToLocal = (values = {}, response = {}) => {
    const { fields } = this.state;
    const { saveLocal } = this.props;
    if (fields && saveLocal) {
      const saveValues = fields
        .filter(({ type }) => {
          switch (type) {
            case "textbox":
            case "text":
            case "tel":
            case "checkbox":
            case "dropdown":
            case "radio":
            case "radio-button":
            case "calender":
              return true;
          }
          return false;
        })
        .reduce((acc, { name, type }) => {
          console.log(name);
          console.log(type);
          acc[name] = {
            type,
            value: values.hasOwnProperty(name) ? values[name] : ""
          };

          return acc;
        }, {});

      window.sessionStorage.setItem(saveLocal, JSON.stringify(saveValues));

      const dobRead = response.children[0].birthDate;

      const sdate = new Date(dobRead);
      const utcSDate = sdate.toISOString();
      const from_date = utcSDate.replace(".000", "");
      response.children[0].birthDate = from_date;
      //calculate child weeks
      let childBirthDate = moment(dobRead).format("MM/DD/YYYY");
      let currentDate = moment();
      let childweeks = currentDate.diff(childBirthDate, "week");
      let feed = {};
      if (childweeks >= -39 && childweeks <= 64) {
       feed = {
        categoryType: "offerPreferenceInfo",
        name: "retailer",

        value: "TBUNIVERSAL"
      };
    } else {
      feed = {
        categoryType: "offerPreferenceInfo",
        name: "enableDigital",

        value: false
      };
    }
      let feed1 = {
        categoryType: "offerPreferenceInfo",
        name: "channel",
        value: "website"
      };
  
     let fieldDataApi = flattenObject(response)
     fieldDataApi=fieldDataApi.filter(_item => _item.name !==  "webAccountSource");
     fieldDataApi.push(feed);
     fieldDataApi.push(feed1);
      window.sessionStorage.setItem(
        saveLocal + "___API",
        JSON.stringify(fieldDataApi)
      );
    }
  };

  onSubmitValues = async values => {
    const { actionPath, eventCategory, eventType } = this.props;
    
    return await sendFormData(
      actionPath,
      ...groupFieldsWithConfig(values, this.state.fields)
    ).then(results => {
      return results;
    });

   
  };


  render() {
    const {
      initialValues,
      fields,
      formName,
      formError,
      userName
      
    } = this.state;
    const {eventCategory,
      eventType}= this.props;
      
    return (
      <div>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={ async (values, actions) => {
            values.captchaType = reCaptchaVType;
            values.captchaValue = await getCaptchaToken("true", this.gSiteKey);
            if (!actions.isSubmitting) {
              return this.onSubmitValues(values)
                .then(result => {
                
                  const { errorCode, response, status } = result;
                  if (errorCode === 0 && status === true) {
                
                    let ga_type = eventType + "_sign-up-button_submit";
                    ABBOTT.gtm.buildAndPush.formTracking(
                      eventCategory,
                      "click",
                      ga_type
                    );
                    if (this.props && this.props.redirectOnSuccessURL) {
                      if(response.additionalProfileProperties && response.additionalProfileProperties.webAccountSource && response.additionalProfileProperties.webAccountSource !== undefined && response.additionalProfileProperties.webAccountSource!== null){
                        this.setState({ formError: this.props.errorUpdateProfile });
                      }
                      else{
                      window.sessionStorage.setItem("userName",response.userInfo.userName);
                      this.saveToLocal(values, response);

                      window.location = this.props.redirectOnSuccessURL;
                    }
                    }
                  } else {
                    const { errorMessage = "Failed to submit" } =
                      getErrorMessage(errorCode) || {};
                      this.setState({captchaValue:''});
                    actions.setSubmitting(false);                   
                    if (result.errorCode === 500) {                      
                      let ga_type = eventType + '_received-error-message'; 
                      ABBOTT.gtm.buildAndPush.formTracking(eventCategory, "error", ga_type);
                      const dataValue = getMessageForReg("GEN_ERR");                      
                      $("#template.global-error p").html(dataValue);

                      $("#template").show();
                    } else {
                      if (response.i18nMessageKey === "AUTH-1005") {
                        this.setState({
                          formError: response.statusReason
                        });
                      } else{
                        this.setState({ formError: errorMessage });
                      }
                                            
                    }
                  }

                  return result;
                })
                .catch(({ jqXHR = {} }) => {
                  const { status } = jqXHR;
                  const { errorMessage = "Failed to submit" } =
                    getErrorMessage(status) || {};
                  actions.setSubmitting(false);
                  
                  if (result.errorCode === 500) {
                    let ga_type = eventType + '_received-error-message'; 
                    ABBOTT.gtm.buildAndPush.formTracking(eventCategory, "error", ga_type);
                    const dataValue = getMessageForReg("GEN_ERR");
                    
                    $("#template.global-error p").html(dataValue);

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
              handleSubmit,
              isSubmitting
            } = validatorObj;

            return (
              <Form className="similac-form">
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
                    
                    else if (field.type === "passwordstrength") {
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
                    }
                    else if (field.type === "formError") {
                      return (
                        <FormError
                          key={field.type + index + name + index}
                          name={formName}
                          formError={formError}
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
                          fieldId="id-captcha-do-register-div" //To avoid conflict of 2 recaptcha conflict on same page
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

export default DigitalOfferRetailerRegister;
