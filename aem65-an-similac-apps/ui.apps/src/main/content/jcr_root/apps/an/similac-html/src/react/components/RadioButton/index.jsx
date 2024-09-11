import React, { useEffect } from "react";
import { ErrorMessage, useFormikContext } from "formik";

const Radio = React.memo(
  ({
    label,
    name,
    fieldsType,
    sourceValue,
    value,
    btnClassName,
    onChange,
    onBlur,
  }) => {
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
        <div className="row">
          {sourceValue &&
            sourceValue.map((radio, index) => {
              const _radioValue = typeof(radio.value) === "boolean"? Boolean(radio.value).toString(): String(radio.value).toString();
              return (
                <div className={btnClassName}>
                  <div
                    key={id + _radioValue + index}
                    className={`form-check form-check-inline radio-button-set w-100`}
                  >
                    <label className="radio-button-wrapper">
                      <input
                        className="radio-input"
                        type={"radio"}
                        id={id + _radioValue}
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={_radioValue}
                        checked={value === _radioValue}
                      />
                      <span className="radio-label">{radio.label}</span>
                    </label>
                  </div>
                </div>
              );
            })}
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

export default Radio;
