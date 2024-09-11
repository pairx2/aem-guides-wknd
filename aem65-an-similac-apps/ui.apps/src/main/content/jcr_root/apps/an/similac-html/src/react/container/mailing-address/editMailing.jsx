import * as React from "react";
import { Formik, Form, Field } from "formik";
import moment from "moment";
import InputField from "../../components/InputField";
import InputMasker from "../../components/InputMasker";
import HtmlTag from "../../components/HtmlTag";
import Help from "../../components/Help";
import Checkbox from "../../components/Checkbox";
import Radio from "../../components/Radio";
import RadioButton from "../../components/RadioButton";
import Dropdown from "../../components/DropdownSet";
import validations, { parseDateDDMMYYYY } from "../../common/validations";
import Divider from "../../components/Divider";
import Button from "../../components/Button";
import LinkButton from "../../components/Button/link";
import CalendarSet from "../../components/CalendarSet";
import GoogleAPI from "../../components/GoogleAPI";
import Focus from "../../components/ErrorMessage/focus";
import RtfDisplay from "../../components/RtfDisplay";
import FormError from "../../components/ErrorMessage/FormError";
import {
  sendFormData,
  getErrorMessage,
  getMessageForReg,
  makeCall
} from "../../common/api";
import { groupFieldsWithConfig } from "../../common/regFunctions";
import { flattenObject } from "../../common/apiToLocal";
import PasswordStrength from "../../components/PasswordStrength";
import { SvgIcon } from "../../common/common";

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.apiFields = [];
    this.submitted = false;
    const { formName, fields: flds = [], initData } = props.data;
    const {
      fields = [],
      isGoogleApiPresent = false,
      googleApiFields = []
    } = this.initFieldSate(flds || [], initData);

    this.state = {
      fields,
      gigyaData: {},
      fieldsType: {},
      initialValues: initData,
      formName,
      formError: "",
      showPass: {},
      showAddressFields: "",
      isGoogleApiPresent,
      googleApiFields,
      needClaimOffer: false
    };
  }

  /**
   *  Method to get user my profile  information from AWS
   */

  showToggle = (e, name) => {
    const { showPass = {} } = this.state;
    this.setState({
      showPass: {
        ...showPass,
        [name]: !showPass[name]
      }
    });
  };

  showAddressFields = (boolFlag, googleApiFields = []) => {
    this.setState({
      showAddressFields: boolFlag,
      googleApiFields
    });
  };

  

  getProfileCall = () => {
    let { actionPathGetProfile, actionPath } = this.props.data;
    let ajaxConfig = {
      "url": actionPathGetProfile,    
      method: "GET",
      contentType: "application/json",
        headers: {
          "content-type": "application/json",
          "x-country-code": "US",
          "x-application-id": "similac",
          "x-preferred-language": "en-US", 
          "x-id-token": ABBOTT.utils.getSessionInfo()
        }
    }
    makeCall(ajaxConfig).then((resultProfile) => {
   
        const { response, status, errorCode } = resultProfile;
        if (errorCode === 0 && status === true) {
          let needClaimeOffer = false;
          if (
            response.hcpInfo &&
            response.hcpInfo.offers &&
            response.hcpInfo.offers.length > 0
          ) {
            response.hcpInfo &&
              response.hcpInfo.offers.forEach(offer => {
                if (
                  !offer.offerClaimDate ||
                  offer.offerClaimDate === "undefined" ||
                  offer.offerClaimDate === null
                ) {
                  needClaimeOffer = true;
                }
              });
          }
          if (needClaimeOffer) {
            var formData = { category: "claimOffers" };
            formData = JSON.stringify(formData);
            let ajaxConfig1 = {
              url:actionPath,
              method: "POST",
              data:formData,
              contentType: "application/json",
              headers: {
                "content-type": "application/json",
                "x-country-code": "US",
                "x-application-id": "similac",
                "x-preferred-language": "en-US", 
                "x-id-token": ABBOTT.utils.getSessionInfo()
              }
            };

           makeCall(ajaxConfig1).then((updateProfile) => {
                jQuery("#overlay").hide();
                if (
                  updateProfile.errorCode === 0 &&
                  updateProfile.status === true
                ) {
                  window.location.reload();
                } else {
                  templatePara.html(dataGenValue);
                  templateBody.show();
                  htmlBody.animate({ scrollTop: 0 }, "slow");
                }
              
            });
          }
          else{
            window.location.reload();
          }
        } else {
          jQuery("#overlay").hide();
          templatePara.html(dataGenValue);
          templateBody.show();
          htmlBody.animate({ scrollTop: 0 }, "slow");
        }
      
    });
  };

  initFieldSate = (_fields = [], initData = {}) => {
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
      if (initData && initData[_name]) {
        value = initData[_name];
      }

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

          window.sessionStorage.setItem("addressPrepopulated", true);
          var googleDefined = setInterval(function() {
            if (window.google) {
              $("#react-form-field-address").focus();
              clearInterval(googleDefined);
            }
          }, 100);
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
    const { initialValues } = this.setInitialState(
      fields,
      this.props.initData || {}
    );
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

  setInitialState = (fields, initData = {}) => {
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
        if (initData && initData.hasOwnProperty(name)) {
          _value = initData[name];
        }

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
    const { initialValues } = this.setInitialState(
      this.state.fields,
      this.props.initData || {}
    );

    this.setState({ initialValues });
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
  ) => value => {
    let _type =
      type === "textbox" || typeof type === "undefined" ? "text" : type;
    for (var item in validateArray) {
      const { errorType, errorMessage, ...otherErrorData } = validateArray[
        item
      ];
      const validationMess =
        validations[errorType] &&
        validations[errorType](value, _type, otherErrorData, values, disabled);
      if (validationMess) {
        return this.checkError(validationMess, errorMessage, name);
      }
    }
  };

  onSubmitValues = async values => {
    const { actionPath } = this.props.data;
    ABBOTT.gtm.buildAndPush.formTracking(
      "edit-address",
      "click",
      "edit-address_submit"
    );
    return await sendFormData(
      actionPath,
      ...groupFieldsWithConfig(
        values,
        this.state.fields.concat(this.apiFields),
        {
          headers: {
            "x-id-token": ABBOTT.cookie("x-id-token")
          }
        }
      )
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
      isGoogleApiPresent
    } = this.state;


    return (
      <div>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          innerRef={this.formRef}
          onSubmit={(values, actions) => {
            if (!actions.isSubmitting) {
              return this.onSubmitValues(values)
                .then(result => {
                  const { errorCode, response, status } = result;
                  let {
                    redirectOnSuccessURLNeosure,
                    redirectOnSuccessURL
                  } = this.props.data;
                  if (errorCode === 0 && status === true) {
                    ABBOTT.gtm.buildAndPush.formTracking(
                      "edit-address",
                      "submit",
                      "edit-address_submit"
                    );
                    this.saveToLocal(values, response);
                    if (this.checkLocalData(formName + "___API")) {
                      this.deleteLocalData(formName + "___API");
                    }
                    const _values = this.formRef.current.initialValues;
                    const profileString = ABBOTT.cookie("profile") || "{}";
                    const profileJSON = JSON.parse(profileString);

                    profileJSON.firstName = _values.firstName || "";
                    profileJSON.lastName = _values.lastName || "";
                    profileJSON.address = values.address || "";
                    profileJSON.city = values.city || "";
                    profileJSON.country = _values.country || "";
                    profileJSON.state = values.state.label || "";
                    profileJSON.lineOne = values.lineOne || "";
                    profileJSON.lineTwo = values.lineTwo || "";
                    profileJSON.email = _values.userName || "";
                    profileJSON.zip = values.zipCode || _values.zip || "";
                    if(window.sessionStorage.getItem('oasisEmail')){
                      profileJSON.oasisEmail = window.sessionStorage.getItem('oasisEmail');
                    }
                    let cookieConfig = {
                      path: "/",
                      domain: "similac.com"
                    };

                    if (profileJSON.firstName) {
                      ABBOTT.cookie("profile", JSON.stringify(profileJSON), cookieConfig);
                    }

                    this.props.setProfileData &&
                      this.props.setProfileData(_values);
                    this.props.setShowEdit && this.props.setShowEdit();
                    if (window.sessionStorage.getItem("oasisEmail")) {
                     window.location.reload();
                    } else {
                      if (
                        this.props.data &&
                        redirectOnSuccessURLNeosure &&
                        values["premature"] === "true"
                      ) {
                        window.location = redirectOnSuccessURLNeosure;
                      } else if (this.props.data && redirectOnSuccessURL) {
                        window.location = redirectOnSuccessURL;
                      }
                    }

                  } else {
                    this.saveToLocal(values, response);
                    const { errorMessage = getMessageForReg("GEN_ERR") } =
                      getErrorMessage(result) || {};
                    actions.setSubmitting(false);
                   
                    if (errorCode === 500) {
                      const dataValue = getMessageForReg("GEN_ERR");
                      console.log(dataValue);
                      $("#template.global-error p").html(dataValue);

                      $("#template").show();
                    } else {
                      this.setState({ formError: errorMessage });
                    }
                  }

                  return result;
                })
                .catch(([jqXHR = {}]) => {
                  this.saveToLocal(values, response);
                  const { errorMessage = getMessageForReg("GEN_ERR") } =
                    getErrorMessage(jqXHR) || {};
                  actions.setSubmitting(false);

                  this.setState({ formError: errorMessage });
                });
            }
          }}
        >
          {({ values, errors }) => {
            return (
              <Form className="similac-form">
                {fields.map(
                  ({ label, name, validations, renderOn, ...field }, index) => {
                    const { fieldName = "", value = "", fieldMapped = "" } =
                      renderOn || {};

                    if (fieldName && values) {
                      let otherField = values[fieldName];
                      otherField =
                        typeof otherField === "boolean"
                          ? Boolean(otherField).toString()
                          : otherField;
                      let valueField =
                        typeof value === "boolean"
                          ? Boolean(value).toString()
                          : value;
                      if (otherField !== valueField) {
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

                    if (field.type === "textbox" || field.type === "password") {
                      return (
                        <Field
                          key={name + "textbox" + field.type + index}
                          label={label}
                          name={name}
                          type={
                            (field.type === "textbox" && "text") || field.type
                          }
                          className={field.btnClassName}
                          disabled={field.disabled || false}
                          fieldLoader={field.fieldLoader || false}
                          maxLength={field.maxLength}
                          validate={this.makeValidations(
                            validations,
                            name,
                            field.type,
                            values,
                            field.disabled
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
                            field.type,
                            values,
                            field.disabled
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
                            field.type,
                            values,
                            field.disabled
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

export default Registration;
