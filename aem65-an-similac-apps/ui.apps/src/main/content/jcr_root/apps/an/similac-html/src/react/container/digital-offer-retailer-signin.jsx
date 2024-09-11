import * as React from "react";
import { Formik, Form, Field } from "formik";
import InputField from "../components/InputField";
import HtmlTag from "../components/HtmlTag";
import { sendFormData, getErrorMessage } from "../common/api";
import Button from "../components/Button";
import Focus from "../components/ErrorMessage/focus";
import { groupFields } from "../common/regFunctions";
import FormError from "../components/ErrorMessage/FormError";
import validations from "../common/validations";
import Divider from "../components/Divider";

class DigitalOfferRetailerSignIn extends React.Component {
  constructor(props) {
    super(props);
    this.submitted = false;
    const { formName, fields: flds = [] } = props;
    const { fields = [] } = this.initFieldSate(flds || []);

    this.state = {
      fields,
      fieldsType: {},
      initialValues: {},
      formName,
      formError: ""
    };
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

        return Object.assign(accumulator, {
          [name]: _value
        });
      }, {});

    return { initialValues };
  };

  componentDidMount() {
    const { initialValues } = this.setInitialState(this.state.fields);
    this.setState({ initialValues });
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
    const { actionPath } = this.props.dorLogin;
    return await sendFormData(
      actionPath,
      groupFields(values, this.state.fields)
    ).then(results => {
      return results;
    });
  };

  render() {
    const { initialValues, fields, formName, formError } = this.state;
    return (
      <div>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={(values, actions) => {
            if (!actions.isSubmitting) {
              return this.onSubmitValues(values)
                .then(result => {
                  const { errorCode, status } = result;
                  if (errorCode === 0 && status === true) {
                    if (
                      this.props.dorLogin &&
                      this.props.dorLogin.redirectOnSuccessURL
                    ) {
                      window.location =this.props.dorLogin.redirectOnSuccessURL;
                    }
                  }
                  else {
                    const { errorMessage = "Failed to submit" } =
                      getErrorMessage(errorCode) || {};
                    actions.setSubmitting(false);
                    this.setState({ formError: errorMessage });
                  }

                  return result;
                })
                .catch(({ jqXHR = {} }) => {
                  const { status } = jqXHR;
                  const { errorMessage = "Failed to submit" } =
                    getErrorMessage(status) || {};
                  actions.setSubmitting(false);
                  this.setState({ formError: errorMessage });
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
              isSubmitting
              /* and other goodies */
            } = validatorObj;

            return (
              <Form className="similac-form">
                {fields.map(
                  (
                    { label, name, validations, maxLength, value, ...field },
                    index
                  ) => {
                    if (field.type === "textbox" || field.type === "password") {
                      return (
                        <Field
                          key={name + "textbox" + field.type + index}
                          label={label}
                          name={name}
                          maxLength={maxLength}
                          type={
                            (field.type === "textbox" && "text") || field.type
                          }
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
                    }else if (field.type === "divider") {
                      return <Divider key={label + index}>{label}</Divider>;
                    }else if (
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

        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={(values, actions) => {
            if (!actions.isSubmitting) {
              return this.onSubmitValues(values)
                .then(result => {
                  const { errorCode, status } = result;
                  if (errorCode === 0 && status === true) {
                    if (
                      this.props.dorRegistration &&
                      this.props.dorRegistration.redirectOnSuccessURL
                    ) {
                      window.location =this.props.dorRegistration.redirectOnSuccessURL;
                    }
                  }
                  else {
                    const { errorMessage = "Failed to submit" } =
                      getErrorMessage(errorCode) || {};
                    actions.setSubmitting(false);
                    this.setState({ formError: errorMessage });
                  }

                  return result;
                })
                .catch(({ jqXHR = {} }) => {
                  const { status } = jqXHR;
                  const { errorMessage = "Failed to submit" } =
                    getErrorMessage(status) || {};
                  actions.setSubmitting(false);
                  this.setState({ formError: errorMessage });
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
              isSubmitting
              /* and other goodies */
            } = validatorObj;

            return (
              <Form className="similac-form">
                {fields.map(
                  (
                    { label, name, validations, maxLength, value, ...field },
                    index
                  ) => {
                    if (field.type === "textbox" || field.type === "password") {
                      return (
                        <Field
                          key={name + "textbox" + field.type + index}
                          label={label}
                          name={name}
                          maxLength={maxLength}
                          type={
                            (field.type === "textbox" && "text") || field.type
                          }
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
                    }else if (field.type === "divider") {
                      return <Divider key={label + index}>{label}</Divider>;
                    }else if (
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

export default DigitalOfferRetailerSignIn;


