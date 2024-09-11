import * as React from "react";

import { Formik, Form, Field, useFormikContext } from "formik";
import InputField from "../components/InputField";
import InputMasker from "../components/InputMasker";
import HtmlTag from "../components/HtmlTag";
import Dropdown from "../components/DropdownSet";
import validations from "../common/validations";
import Divider from "../components/Divider";
import Button from "../components/Button";
import LinkButton from "../components/Button/link";
import GoogleAPI from "../components/GoogleAPI";
import Focus from "../components/ErrorMessage/focus";
import FormError from "../components/ErrorMessage/FormError";
import { sendFormData, getErrorMessage } from "../common/api";
import { groupFieldsWithConfig } from "../common/regFunctions";
import ReCaptcha from "../components/Recaptcha";
import TextArea from "../components/TextArea";
import Checkbox from "../components/Checkbox";
import getCaptchaToken,{captchaTypeObj, reCaptchaVType} from "../common/recaptcha";
class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.submitted = false;
    props.data.fields.push(captchaTypeObj);
    const { formName, fields: flds = [] } = props.data;
    const { fields = [] } = this.initFieldSate(flds || []);
    this.gSiteKey = "";
    this.state = {
      fields,
      fieldsType: {},
      initialValues: {},
      formName,
      formError: "",
      captchaValue: "",
      captchaAccountId:"",
      formSubmitClick: false,
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
      .reduce((accumulator, { name, value, apiFlag }) => {
        let _value = value;

        return Object.assign(accumulator, {
          [name]: _value
        });
      }, {});

    return { initialValues };
  };

  componentDidMount() {
    this.gSiteKey = jQuery("#gSiteKey").length && jQuery("#gSiteKey").val();
    const { initialValues } = this.setInitialState(this.state.fields);
    this.setState({ initialValues });
  }

  componentDidUpdate(){
   
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

  onSubmitValues = async values => {
    const { actionPath } = this.props.data;
    return await sendFormData(
      actionPath,
      ...groupFieldsWithConfig(values, this.state.fields)
    ).then(results => {
      return results;
    });
  };


  //Handle user click to set scroll to field for form error
  handleClick = () => {
    this.setState({formSubmitClick : true}, function(){
      var checkErrorBox = setInterval(function(){
        var scrollTopHeight = $('.similac-form').find(".invalid-feedback.similac-error-group:visible:first");
        if(scrollTopHeight.length){
          clearInterval(checkErrorBox);
          $('html,body').animate({
            scrollTop: $(scrollTopHeight).offset().top - 50
          }, 2000);
          this.setState({formSubmitClick : false});
          }
      },300); 
    });
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
            values.captchaType = reCaptchaVType;
            values.captchaValue = await getCaptchaToken(this.props.data.enableRecaptcha, this.gSiteKey, "contact");
            values.captchaAccountId = window.btoa(values.emailAddress);
            values.captchaAction = "contact";
            if (!actions.isSubmitting) {
              return this.onSubmitValues(values)
                .then(result => {
                  ABBOTT.gtm.buildAndPush.formTracking('contact-us', 'click', 'contact-us_submit');
                  const { errorCode, response, status } = result;
                  if (errorCode === 0 && status === true) {
                    if (
                      this.props.data &&
                      this.props.data.redirectOnSuccessURL
                    ) {
                      ABBOTT.gtm.buildAndPush.formTracking('contact-us', 'submit', 'contact-us_submit');
                      window.location = this.props.data.redirectOnSuccessURL;
                    }
                   
                  } else {

                    const { errorMessage = "Failed to submit" } =
                      getErrorMessage(result) || {};
                      actions.setSubmitting(false);
                      this.setState({ formError: errorMessage });
                      this.setState({captchaValue:''});
                  }

                  return result;
                })
                .catch(([jqXHR = {}]) => {

                  const { errorMessage = "Failed to submit" } =
                    getErrorMessage(jqXHR) || {};
                  actions.setSubmitting(false);
                  this.setState({ formError: errorMessage });
                  this.setState({captchaValue:''});
                });
            }
          }}
        >
          {({ values, errors, resetForm, setFieldValue }) => {
            return (
              <Form className="similac-form">
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
                    if (field.type === "textbox" || field.type === "password") {
                      return (
                        <Field
                          key={name + "textbox" + field.type + index}
                          label={label}
                          name={name}
                          type={
                            (field.type === "textbox" && "text") || field.type
                          }
                          disabled={_disabled}
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
                    } else if (field.type === "textarea") {
                      return (
                        <Field
                          key={name + "textarea" + field.type + index}
                          label={label}
                          name={name}
                          type="textarea"
                          className={className}
                          row={row}
                          spellCheck={spellCheck}
                          validate={this.makeValidations(
                            validations,
                            name,
                            field.type
                          )}
                          as={TextArea}
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
                          onChange={this.handleDropdownChange}
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
                          maxLength={field.maxLength}
                          placeholder={field.placeholder}
                          options={field.sourceValue}
                          zipCodeField={"zip"}
                          validate={this.makeValidations(
                            validations,
                            name,
                            field.type,
                            values
                          )}
                          fetchApi={field.fetchApi}
                          as={GoogleAPI}
                        />
                      );
                    }  else if (field.type === "checkbox") {
                      return (
                        <Field
                          key={name + "checkbox" + label + index}
                          label={label}
                          name={name}
                          fieldId ={field.id}
                          type={"checkbox"}
                          fieldsType={field.fieldType}
                          className={field.btnClassName}
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
                          onClick={this.handleClick}
                        />
                      );
                    } else if (field.type === "reset") {
                      return (
                        <Button
                          key={field.type + index + name + index}
                          label={label}
                          className={field.btnClassName}
                          onClick={() => {resetForm(initialValues); ABBOTT.gtm.buildAndPush.formTracking('contact-us', 'click', 'contact-us_reset'); }}
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
                    } else if (field.type === "hidden" || (field.name === "captchaAccountId")) {
                      return (
                        <Field
                          key={name + "textbox" + field.type + index}
                          type={"text"}
                          style={{ display: "none" }}
                          name={name}
                          value={values.emailAddress}
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

export default ContactUs;
