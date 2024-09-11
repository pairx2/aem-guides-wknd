import * as React from "react";
import { Formik } from "formik";
import InputField from "../components/InputField";
import HtmlTag from "../components/HtmlTag";
import Help from "../components/Help";
import Checkbox from "../components/Checkbox";
import Radio from "../components/Radio";
import RadioButton from "../components/RadioButton";
import Dropdown from "../components/DropdownSet";
import validations from "../common/validations";
import Divider from "../components/Divider";
import Button from "../components/Button";
import CalendarSet from "../components/CalendarSet";

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.fields = props.data.fields;
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

  render() {
    const { fields } = this;

    const { initialValues } = this.setInitialState(fields);

    return (
      <div>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            return this.setErrors(values, fields);
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
            }, 400);
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
              /* and other goodies */
            } = validatorObj;
            return (
              <form className="similac-form" onSubmit={handleSubmit}>
                {fields.map((field, index) => {
                  const commonProps = {
                    value: values[field.name],
                    errors: errors[field.name],
                    touched: touched[field.name],
                    onChange: handleChange,
                    onBlur: handleBlur,
                  };
                  if (field.type === "textbox" || field.type === "password") {
                    return (
                      <InputField
                        key={field.name + index}
                        label={field.label}
                        type={
                          (field.type === "textbox" && "text") || field.type
                        }
                        name={field.name}
                        {...commonProps}
                      />
                    );
                  } else if (field.type === "htmltag") {
                    return (
                      <HtmlTag
                        key={field.label + index}
                        label={field.label}
                        className={field.className}
                        componentType={field.componentType}
                        help={
                          (field.help && <Help data={field.help} />) || null
                        }
                      />
                    );
                  } else if (field.type === "checkbox") {
                    return (
                      <Checkbox
                        key={field.name + index}
                        label={field.label}
                        name={field.name}
                        {...commonProps}
                      />
                    );
                  } else if (field.type === "calender") {
                    return (
                      <CalendarSet
                        key={"calander" + field.name + index}
                        label={field.label}
                        name={field.name}
                        {...commonProps}
                      />
                    );
                  } else if (field.type === "radio") {
                    return (
                      <Radio
                        key={field.name + index}
                        label={field.label}
                        name={field.name}
                        sourceValue={field.sourceValue}
                        validator={validatorObj}
                        {...commonProps}
                      />
                    );
                  } else if (field.type === "radio-button") {
                    return (
                      <RadioButton
                        key={field.name + index}
                        label={field.label}
                        name={field.name}
                        sourceValue={field.sourceValue}
                        btnClassName={field.btnClassName}
                        validator={validatorObj}
                        {...commonProps}
                      />
                    );
                  } else if (field.type === "dropdown") {
                    return (
                      <Dropdown
                        key={field.name + index}
                        label={field.label}
                        name={field.name}
                        placeholder={field.placeholder}
                        options={field.sourceValue}
                        validator={validatorObj}
                        {...commonProps}
                      />
                    );
                  } else if (field.type === "divider") {
                    return (
                      <Divider key={field.label + index}>{field.label}</Divider>
                    );
                  } else if (
                    field.type === "button" ||
                    field.type === "submit"
                  ) {
                    return (
                      <Button
                        key={field.type + index + field.name + index}
                        {...field}
                        {...commonProps}
                      />
                    );
                  }

                  return (
                    <div>
                      <h4>
                        Missing ------ {field.label} {field.type}
                      </h4>
                    </div>
                  );
                })}
              </form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

export default Registration;
