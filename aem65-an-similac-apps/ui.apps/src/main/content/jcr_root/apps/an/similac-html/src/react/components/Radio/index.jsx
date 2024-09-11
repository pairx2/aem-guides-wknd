import React, { useEffect } from "react";
import { ErrorMessage, useFormikContext } from "formik";

const Radio = React.memo(
  ({ label, name, sourceValue, onBlur, value,fieldsType, errors, touched, onChange }) => {
    const id = "react-form-field-" + name;
    const { submitCount, setFieldTouched } = useFormikContext();
    useEffect(() => {
      if (submitCount > 0) {
        setFieldTouched(name, true);
      }
    }, [submitCount]);

    return (
      <fieldset className={`form-group similac-form-group`}>
        {(label && (
          <div>
            <label className="radio-group-label">{label}</label>
          </div>
        )) ||
          null}
        {sourceValue &&
          sourceValue.map((radio, index) => {
            const _radioValue = typeof(radio.value) === "boolean"? Boolean(radio.value).toString(): String(radio.value).toString();
            return (
              <div
                key={id + radio.value + index}
                className="form-check form-check-inline radio-set"
              >
                <span className="radio-wrapper">
                  <label>
                    <input
                      className="radio-input"
                      type={"radio"}
                      id={id + radio.value + index}
                      name={name}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={_radioValue}
                      checked={value === _radioValue}
                    />
                    <span
                      className="radio-inner"
                      aria-hidden="true"
                      role="presentation"
                    ></span>
                  </label>
                </span>
                {(radio.label && (
                  <label
                    className="form-check-label"
                    htmlFor={id + radio.value + index}
                  >
                    {radio.label}
                  </label>
                )) ||
                  null}
              </div>
            );
          })}

        <div className="invalid-feedback similac-error-group ">
          <ErrorMessage name={name} />
        </div>
      </fieldset>
    );
  }
);

export default Radio;