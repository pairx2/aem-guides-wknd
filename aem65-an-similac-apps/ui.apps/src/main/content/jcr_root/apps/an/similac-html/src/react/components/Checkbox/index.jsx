import React, { useEffect } from "react";
import { ErrorMessage, useFormikContext } from "formik";

const Checkbox = React.memo(
  ({ label, name, value, sourceValue, onBlur, onChange, imagePath,fieldId}) => {
    const id = "react-form-field-" + name;
    const imgString = imagePath ? `<img src="${imagePath}" alt="logo"/><br/>` : '';
    const { submitCount, setFieldTouched } = useFormikContext();
    useEffect(() => {
      if (submitCount > 0) {
        setFieldTouched(name, true);
      }
    }, [submitCount]);

    const srcValue = typeof sourceValue === "undefined" ? true : sourceValue;

    return (
      <fieldset id={fieldId} className={`form-group similac-form-group`}>
        <div className="form-check checkbox-container">
          <span className="checkbox-wrapper">
            <label htmlFor={id}>
              <input
                type="checkbox"
                name={name}
                id={id}
                className="form-check-input"
                onChange={onChange}
                onBlur={onBlur}
                value={srcValue}
                checked={value}
              />
              <span
                className="checkbox-inner"
                aria-hidden="true"
                role="presentation"
              ></span>
            </label>
          </span>

          {(label && (
            <label
              className="form-check-label"
              htmlFor={id}
              dangerouslySetInnerHTML={{ __html: imgString + label }}
            ></label>
          )) ||
            ""}
        </div>

        <ErrorMessage name={name} >
          {msg => (<div
            className="invalid-feedback similac-error-group "
            dangerouslySetInnerHTML={{ __html: msg }}
          />)}
        </ErrorMessage>
      </fieldset>
    );
  }
);

export default Checkbox;