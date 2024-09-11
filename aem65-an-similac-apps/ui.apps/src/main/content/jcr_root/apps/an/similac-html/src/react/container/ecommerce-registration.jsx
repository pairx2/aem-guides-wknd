import * as React from "react";
import { Formik, Form, Field } from "formik";
import moment from "moment";
import InputField from "../components/InputField";
import InputMasker from "../components/InputMasker";
import HtmlTag from "../components/HtmlTag";
import Help from "../components/Help";
import Checkbox from "../components/Checkbox";
import Radio from "../components/Radio";
import RadioButton from "../components/RadioButton";
import Dropdown from "../components/DropdownSet";
import validations, { parseDateDDMMYYYY } from "../common/validations";
import Divider from "../components/Divider";
import Button from "../components/Button";
import LinkButton from "../components/Button/link";
import CalendarSet from "../components/CalendarSet";
import GoogleAPI from "../components/GoogleAPI";
import Focus from "../components/ErrorMessage/focus";
import RtfDisplay from "../components/RtfDisplay";
import FormError from "../components/ErrorMessage/FormError";
import { sendFormData, getErrorMessage, getMessageForReg } from "../common/api";
import { groupFieldsWithConfig } from "../common/regFunctions";
import { flattenObject } from "../common/apiToLocal";
import PasswordStrength from "../components/PasswordStrength";
import { SvgIcon } from "../common/common";
import UserAlert from "../components/UserInfo";
import ReCaptcha from "../components/Recaptcha";
import getCaptchaToken,{captchaTypeObj, reCaptchaVType} from "../common/recaptcha";
class EcommerceRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.apiFields = [];
    this.submitted = false;
    props.data.fields.push(captchaTypeObj);
    const { formName, fields: flds = [] } = props.data;

    const {
      fields = [],
      isGoogleApiPresent = false,
      googleApiFields = []
    } = this.initFieldSate(flds || []);
    this.gSiteKey = "";
    this.state = {
      fields,
      gigyaData: {},
      fieldsType: {},
      initialValues: {},
      formName,
      formError: "",
      showPass: {},
      showAddressFields: "",
      isShowPassConfirm: false,
      isGoogleApiPresent,
      googleApiFields,
      showUserAlert: false,
      userAlertMessage: "",
      provider: "",
      premature: false,
      captchaValue:""
    };
   
    window.regObj = this;
  }

  ssmOptState = (values = {}) => {
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

  showToggleConfirm = e => {
    this.setState({
      isShowPassConfirm: !this.state.isShowPassConfirm
    });
  };

  showAddressFields = (boolFlag, googleApiFields = []) => {
    this.setState({
      showAddressFields: boolFlag,
      googleApiFields
    });
  }; 

  initFieldSate = (_fields = []) => {
    
    let isGoogleApiPresent = false;
    let googleApiFields = [];
    
    const fields = _fields.map(item => {
      const _item = this.updateFieldType(item);
      const {
        name: _name = "",
        type = "",
        value: _value = "",
        initValue = ""
      } = _item;

      const name = _name
        ? String(_name)
            .trim()
            .replace(/[ ]/g, "_")
        : _name;
      let value = initValue ? initValue : _value;
      if (ABBOTT.cookie("profile")) {
        let profileRead = JSON.parse(ABBOTT.cookie("profile"));
        const lineOne =
          profileRead.lineOne !== undefined && profileRead.lineOne !== ""
            ? profileRead.lineOne
            : "";
        const lineTwo =
          profileRead.lineTwo !== undefined && profileRead.lineTwo !== ""
            ? profileRead.lineTwo
            : "";
        const city =
          profileRead.city !== undefined && profileRead.city !== ""
            ? profileRead.city
            : "";
        const state =
          profileRead.state !== undefined && profileRead.state !== ""
            ? profileRead.state
            : "";
        const zipCode =
          profileRead.zipCode !== undefined && profileRead.zipCode !== ""
            ? profileRead.zipCode
            : "";

        if (name === "address") {
          value =
            lineOne +
            (city ? ", " + city : "") +
            (state ? ", " + state : "") +
            (zipCode ? ", " + zipCode : "");
            window.sessionStorage.setItem("addressPrepopulated",true);
        }
        if (name === "lineTwo") {
          value = lineTwo;
        }    
        
      }

      if (!isGoogleApiPresent && type === "googleApi") {
        isGoogleApiPresent = true;
        googleApiFields = ["zipCode", "state", "city"];
      }
      return {
        ..._item,
        name,
        value
      };
    });
    return {
      fields,
      isGoogleApiPresent,
      googleApiFields
    };
  };

  setGigyaData = (gigyaData = {}, gigyaFields = []) => {
    const { values = {} } = this.formRef.current;
    var gigyKeys = Object.keys(gigyaData);
    var fields = this.state.fields
      .map(item => {
        if (gigyaFields.includes(item.name)) {
          gigyaFields = gigyaFields.filter(_item => _item === item.name);
        } else {
          item.value = values[item.name] || item.value;
        }
        this.setState({
          showUserAlert: true,
          provider: gigyaData.loginProvider
        });
        return gigyKeys.includes(item.name)
          ? {
              ...item,
              value: gigyaData[item.name],
              disabled: item.name === "userName"
            }
          : item;
      })
      .concat(
        gigyaFields.map(field => ({
          type: "hidden",
          name: field,
          categoryType: "userInfo",
          value: gigyaData[field]
        }))
      )
      .filter(item => {
        if (
          this.props.data &&
          this.props.data.hasOwnProperty("redirectOnSuccessURLNeosure") &&
          item.name === "password"
        ) {
          return false;
        }
        return true;
      });
    const { initialValues } = this.setInitialState(fields);
    this.setState({
      gigyaData,
      fields,
      initialValues,
      formError: ""
    });
  };

  checkLocalData = formName => {
    return localStorage.getItem(formName);
  };

  deleteLocalData = formName => {
    return localStorage.removeItem(formName);
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

    const { gigyaData } = this.state;

    localApiDataParsed &&
      localApiDataParsed.map(item => {
        if (
          !fields.find(
            ({ name }) => name === item.name && gigyaData && !gigyaData[name]
          )
        ) {
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
      .reduce((accumulator, { name, value, type, apiFlag }) => {
        let _value = value;
        if (
          gigyaData &&
          !gigyaData[name] &&
          !apiFlag &&
          localDataParsed &&
          localDataParsed.hasOwnProperty(name)
        ) {
          const localValue = localDataParsed[name].value;
          if (type === "calender" && localValue) {
            _value = moment(localValue).format("MM/DD/YYYY");
          } else {
            _value = localValue;
          }
        }

        return Object.assign(accumulator, {
          [name]: _value
        });
      }, {});

    return { initialValues };
  };
 
  componentDidMount() {
    this.gSiteKey = jQuery("#gSiteKey").length && jQuery("#gSiteKey").val();
    const { initialValues } = this.setInitialState(this.state.fields);
    const { formType } = this.props.data;
    this.setState({ initialValues });

    if (
      window.localStorage.getItem("purchaser_type") === "subscription_user" &&
      window.localStorage.getItem("purchaser_type") !== undefined
    ) {
      jQuery(".ssm-subscription").show();
    } else {
      jQuery(".ssm-one-time-purchase").show();
    }  

  }
   
  checkError = (prom, errorMessage, name) => {
    if (prom instanceof Promise) {
      const refC = this.formRef.current;
      const currentError = (refC.errors && refC.errors[name]) || "";
      prom
        .then(result => {
          if (typeof result === "boolean" && result === true) {
            return errorMessage;
          } else if (typeof result === "string") {
            return result;
          }
          return undefined;
        })
        .then(message => {
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

  makeValidations = (
    validateArray = [],
    name = "",
    type = "text",
    values = {},
    disabled = false
  ) => async value => {
    let _type =
      type === "textbox" || typeof type === "undefined" ? "text" : type;
    for (var item in validateArray) {
      const { errorType, errorMessage, ...otherErrorData } = validateArray[
        item
      ];
      let validationMess;
      if(errorType === "emailAsync"){
        this.gSiteKey = jQuery("#gSiteKey").length && jQuery("#gSiteKey").val();
           values.captchaValue = await getCaptchaToken(this.props.data.enableRecaptcha, this.gSiteKey, "ecommerce-registration");
           values.captchaType = reCaptchaVType;
           values.captchaAccountId = window.btoa(values.email);
           values.captchaAction = "ecommerce-registration";
         validationMess =
        validations[errorType] &&
        validations[errorType](value, _type, otherErrorData, values, disabled);
      } else {
        validationMess =
        validations[errorType] &&
        validations[errorType](value, _type, otherErrorData, values, disabled);
      }
    
      if (validationMess) {
        return this.checkError(validationMess, errorMessage, name);
      }
    }
  };

  onSubmitValues = async values => {
    let { actionPath } = this.props.data;
    const {
      eventCategory,
      eventType,
      actionPathToUpdateProfile
    } = this.props.data;
    const { provider = "" } = this.state;
    const _config = { headers: {} };
    const xIdToken = ABBOTT.cookie("x-id-token");
    if (xIdToken) {
      _config.headers["x-id-token"] = xIdToken;
    }

    let ga_type = "";
    if (provider !== "") {
      ga_type = "social-registration_submit_" + provider;
    } else {
      ga_type = eventType + "_submit";
    }
    ABBOTT.gtm.buildAndPush.formTracking(eventCategory, "click", ga_type);
    let filteredValues = this.state.fields;

    const purchaser_type = window.localStorage.getItem("purchaser_type");
    if (
      purchaser_type !== "subscription_user" ||
      purchaser_type === undefined
    ) {
      if (values["ssm-opt-in"].toString() !== "true") {
        filteredValues = this.state.fields.filter(
          ({ name }) =>
            name !== "confirmpassword" &&
            name !== "ssm-opt-in" &&
            name !== "category" &&
            name !== "address" &&
            name !== "enableDigital" &&
            name !== "product"
        );

        filteredValues = filteredValues.filter(
          item =>
            item.categoryType !== "addresses[]" &&
            item.categoryType !== "children[]" &&
            item.categoryType !== "consents[]" &&
            item.categoryType !== "offerPreferenceInfo[]"
        );
        filteredValues[
          filteredValues.findIndex(item => item.name == "userType")
        ].value = "similac-ecom";

        values.userType = "similac-ecom";
      } else {
        filteredValues = this.state.fields.filter(
          ({ name }) => name !== "ssm-opt-in" && name !== "category"
        );
      }
    } else if (purchaser_type === "subscription_user") {
      if (xIdToken) {
        actionPath = actionPathToUpdateProfile;
        filteredValues = this.state.fields.filter(
          ({ name }) =>
            name !== "ssm-opt-in" &&
            name !== "autoLogin" &&
            name !== "confirmpassword" &&
            name !== "approved" &&
            name !== "date" &&
            name !== "firstName" &&
            name !== "lastName" &&
            name !== "userName" &&
            name !== "rememberMe"
        );

        filteredValues = filteredValues.filter(
          item => item.categoryType !== "consents[]"
        );
        values.type = "PA";
      } else {
        filteredValues = this.state.fields.filter(
          ({ name }) => name !== "ssm-opt-in" && name !== "category"
        );
      }
    }

    return await sendFormData(
      actionPath,
      ...groupFieldsWithConfig(values, filteredValues, _config)
    ).then(results => {
      return results;
    });
  };


  saveToLocal = (values = {}, response = {}) => {
    const { fields } = this.state;
    const { saveLocal } = this.props.data;
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
            case "googleApi":
            case "calender":
              return true;
          }
          return false;
        })
        .reduce((acc, { name, type }) => {
          acc[name] = {
            type,
            value: values.hasOwnProperty(name) ? values[name] : ""
          };
          return acc;
        }, {});

      window.localStorage.setItem(saveLocal, JSON.stringify(saveValues));
      const fieldDataApi = flattenObject(response);
      window.localStorage.setItem(
        saveLocal + "___API",
        JSON.stringify(fieldDataApi)
      );
    }
  };
  

  render() {
    const {
      showPass = {},
      initialValues,
      fields,
      formName,
      formError,
      showAddressFields,
      googleApiFields,
      isGoogleApiPresent,
      showUserAlert,
      userAlertMessage,
      isShowPassConfirm,
      provider = ""
    } = this.state;
    const { eventCategory, eventType } = this.props.data;

    return (
      <div>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          innerRef={this.formRef}
          onSubmit={ async (values, actions) => {
            values.captchaType = reCaptchaVType;
            values.captchaValue = await getCaptchaToken(this.props.data.enableRecaptcha, this.gSiteKey, "ecommerce-registration");
            values.captchaAccountId = window.btoa(values.email);
            values.captchaAction = "ecommerce-registration";
            if (!actions.isSubmitting) {
              return this.onSubmitValues(values)
                .then(result => {
                  const { errorCode, response, status } = result;
                  if (errorCode === 0 && status === true) {
                    let xIdToken = ABBOTT.cookie("x-id-token");

                    let ga_type = "";
                    if (provider !== "") {
                      ga_type = "social-registration_submit_" + provider;
                    } else {
                      ga_type = eventType + "_submit";
                    }
                    ABBOTT.gtm.buildAndPush.formTracking(
                      eventCategory,
                      "submit",
                      ga_type
                    );
                    let birthDate = "";
                    let childweeks;
                    if (values.birthDate) {
                      birthDate = moment(values.birthDate).format("MM/DD/YYYY");
                      let currentDate = moment();
                      childweeks = currentDate.diff(birthDate, "week");
                      let gtm_weeks, absWeeks;
                      if (childweeks >= 0) {
                        absWeeks = Math.abs(childweeks);
                        gtm_weeks = "plus-" + absWeeks;
                      } else {
                        absWeeks = Math.abs(childweeks);
                        gtm_weeks = "minus-" + absWeeks;
                      }
                      ABBOTT.gtm.buildAndPush.formTracking(
                        eventCategory,
                        "submit",
                        ga_type + "_weeks-to-birth_" + gtm_weeks
                      );
                    }
                    this.saveToLocal(values, response);
                    if (this.checkLocalData(formName + "___API")) {
                      this.deleteLocalData(formName + "___API");
                    }

                    const {
                      offerPreferenceInfo: { product = "" } = {}
                    } = response;
                    if (values.birthDate && response.userInfo) {
                      response.userInfo.dob = values.birthDate;
                      response.userInfo.weeks = childweeks;
                    }
                    let userSubTypeNeo = "";
                    response.children?.forEach(child => {
                      if (child.activeChild && child.premature) {
                        userSubTypeNeo = "neosure";
                      } else if (child.premature) {
                        userSubTypeNeo = "neosure";
                      }
                    });

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

                    let cookieConfig = {
                      path: "/",
                      domain: "similac.com"
                    };
                    
                    if (response.userInfo) {
                      response.userInfo.userSubType = "strongmoms";
                    }

                    if (firstName && userType === "similac-ssm") {
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
                          userSubType,
                          dob,
                          weeks
                        }),
                        cookieConfig
                      );
                      if (idToken && !ABBOTT.cookie("x-id-token")) {
                        ABBOTT.cookie("x-id-token", idToken, cookieConfig);
                      }
                    } else if (firstName && userType === "similac-ecom") {
                      ABBOTT.cookie(
                        "profile",
                        JSON.stringify({
                          firstName,
                          lastName,
                          email,
                          UID,
                          idToken,
                          userType
                        }),
                        cookieConfig
                      );

                      if (idToken && !ABBOTT.cookie("x-id-token")) {
                        ABBOTT.cookie("x-id-token", idToken, cookieConfig);
                      }
                    }
                    else if (!response.userInfo) {
                      let updatedProfile = JSON.parse(ABBOTT.cookie("profile"));
                      updatedProfile.userType = "similac-ssm";

                      ABBOTT.cookie(
                        "profile",
                        JSON.stringify(updatedProfile),
                        cookieConfig
                      );
                    }
                    window.location = this.props.data.redirectOnSuccessURL;
                  } else {
                    this.setState({captchaValue:''});
                    actions.setSubmitting(false);
                    if (errorCode === 500) {
                      const dataValue = getMessageForReg("GEN_ERR");
                      this.setState({ formError: dataValue });
                    } else if (errorCode === 400) {
                      if (response.i18nMessageKey) {
                        const dataValue = getMessageForReg(
                          response.i18nMessageKey
                        );
                        this.setState({ formError: dataValue });
                      } else {
                        const dataValue = getMessageForReg(errorCode);
                        this.setState({ formError: dataValue });
                      }
                    } else if (errorCode === 403) {
                      const dataValue = getMessageForReg(errorCode);
                      this.setState({ formError: dataValue });
                    } else {
                      const dataValue = getMessageForReg("GEN_ERR");
                      this.setState({ formError: dataValue });
                    }
                  }

                  return result;
                })
                .catch(([jqXHR = {}]) => {
                  getErrorMessage(jqXHR) || {};
                  actions.setSubmitting(false);

                  this.setState({ formError: getMessageForReg("GEN_ERR") });
                });
            }
          }}
        >
          {({ values, errors, setFieldValue }) => {
            return (
              <Form className="similac-form">
                {fields.map(
                  ({ label, name, validations, renderOn, ...field }, index) => {
                    const {
                      fieldName = "",
                      value = "",
                      fieldMapped = "",
                      magento = "",
                      ecomOnly = ""
                    } = renderOn || {};

                    /**One time purchase user Form generation */
                    if (
                      (fieldName &&
                        values &&
                        window.localStorage.getItem("purchaser_type") !==
                          "subscription_user") ||
                      window.localStorage.getItem("purchaser_type") ===
                        undefined
                    ) {
                      let otherField = values[fieldName];
                      otherField =
                        typeof otherField === "boolean"
                          ? Boolean(otherField).toString()
                          : otherField;

                      let valueField =
                        typeof value === "boolean"
                          ? Boolean(value).toString()
                          : value;

                      if (otherField === undefined || otherField === "") {
                        if (
                          otherField !== valueField &&
                          (name !== "captchaValue" &&
                            name !== "confirmpassword")
                        ) {
                          return null;
                        }
                      } else if (otherField !== undefined) {
                        if (otherField !== valueField) {
                          return null;
                        }
                      }
                    }                   

                    /** Subscription user form generation */
                    if (
                      values &&
                      (window.localStorage.getItem("purchaser_type") ===
                        "subscription_user" &&
                        window.localStorage.getItem("purchaser_type") !==
                          undefined)
                    ) {
                      if (name === "ssm-opt-in") {
                        return null;
                      }
                      let otherField = values[fieldName];
                      otherField =
                        typeof otherField === "boolean"
                          ? Boolean(otherField).toString()
                          : otherField;

                      let valueField =
                        typeof value === "boolean"
                          ? Boolean(value).toString()
                          : value;

                      if (name === "weeksEarly") {
                        if (otherField !== valueField) {
                          return null;
                        }
                      }

                      let magentoField =
                        typeof magento === "boolean"
                          ? Boolean(magento).toString()
                          : magento;
                      if (
                        magentoField === "false" &&
                        ABBOTT.cookie("x-id-token")
                      ) {
                        return null;
                      }
                      let ecomOnlyField =
                        typeof ecomOnly === "boolean"
                          ? Boolean(ecomOnly).toString()
                          : ecomOnly;
                      if (
                        magentoField === "false" &&
                        ecomOnlyField === "true"
                      ) {
                        return null;
                      }
                    }

                    if (fieldMapped && values) {
                      const dateValue = values[fieldMapped];
                      const parsedDate =
                        dateValue && parseDateDDMMYYYY(dateValue);
                      const dateScenario =
                        parsedDate && new Date() <= parsedDate ? true : false;
                      if (dateScenario || !parsedDate) {
                        return null;
                      }
                    }

                    if (isGoogleApiPresent && !showAddressFields) {
                      if (googleApiFields.indexOf(name) !== -1) {
                        return null;
                      }
                    }
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
                            field.type,
                            values,
                            field.disabled
                          )}
                          className={field.btnClassName}
                          as={InputMasker}
                        />
                      );
                    } else if (field.type === "captcha" && this.props.data.enableRecaptcha === "true") {
                      return (
                        <Field
                          name={name}
                          type={field.type}
                          size={field.size}
                          sitekey={field.sitekey}
                          as={ReCaptcha}
                        />
                      );
                    } else if (field.type === "rte") {
                      return (
                        <RtfDisplay
                          key={name + field.html.slice(10) + index}
                          label={label}
                          className={field.btnClassName}
                          html={field.html || ""}
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
                    } else if (field.type === "checkbox") {
                      return (
                        <Field
                          key={name + "checkbox" + label + index}
                          label={label}
                          name={name}
                          type={"checkbox"}
                          imagePath={field.imagePath}
                          fieldsType={field.fieldType}
                          sourceValue={field.sourceValue}
                          validate={this.makeValidations(
                            validations,
                            name,
                            field.type,
                            values,
                            field.disabled
                          )}
                          as={Checkbox}
                        />
                      );
                    } else if (field.type === "calender") {
                      return (
                        <Field
                          key={"calander" + name + index}
                          label={label}
                          name={name}
                          validate={this.makeValidations(
                            validations,
                            name,
                            field.type,
                            values,
                            field.disabled
                          )}
                          as={CalendarSet}
                        />
                      );
                    } else if (field.type === "radio") {
                      return (
                        <Field
                          key={"radio" + name + index}
                          label={label}
                          name={name}
                          sourceValue={field.sourceValue}
                          fieldsType={field.fieldType}
                          validate={this.makeValidations(
                            validations,
                            name,
                            field.type
                          )}
                          as={Radio}
                        />
                      );
                    } else if (field.type === "radio-button") {
                      return (
                        <Field
                          key={"radio-button" + name + index}
                          label={label}
                          name={name}
                          sourceValue={field.sourceValue}
                          fieldsType={field.fieldType}
                          btnClassName={field.btnClassName}
                          validate={this.makeValidations(
                            validations,
                            name,
                            field.type,
                            values,
                            field.disabled
                          )}
                          as={RadioButton}
                        />
                      );
                    } else if (field.type === "dropdown") {
                      return (
                        <Field
                          key={"dropdown" + name + index}
                          label={label}
                          name={name}
                          placeholder={field.placeholder}
                          options={field.sourceValue}
                          validate={this.makeValidations(
                            validations,
                            name,
                            field.type
                          )}
                          fetchApi={field.fetchApi}
                          displayLabelFormat={field.displayLabelFormat}
                          valueFormat={field.valueFormat}
                          as={Dropdown}
                        />
                      );
                    } else if (field.type === "googleApi") {
                      return (
                        <Field
                          key={"googleApi" + name + index}
                          label={label}
                          name={name}
                          showAddressFields={this.showAddressFields}
                          maxLength={field.maxLength}
                          placeholder={field.placeholder}
                          options={field.sourceValue}
                          validate={this.makeValidations(
                            validations,
                            name,
                            field.type,
                            values,
                            field.disabled
                          )}
                          fetchApi={field.fetchApi}
                          as={GoogleAPI}
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
                    } else if (
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
                    } else if (field.type === "formError") {
                      return (
                        <FormError
                          key={field.type + index + name + index}
                          name={formName}
                          formError={formError}
                        />
                      );
                    } else if (field.type === "userAlert") {
                      return (
                        <UserAlert
                          key={field.type + index + name + index}
                          alertMessage={(() =>
                            showUserAlert
                              ? this.props.data.socialRegisterMessage
                              : "")()}
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

export default EcommerceRegistration;