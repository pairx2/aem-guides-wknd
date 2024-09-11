import React, { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import FieldLoader from "../FieldLoader";
const InputField = ({
  label,
  name,
  type,
  value,
  error,
  touched,
  isShowPass,
  fieldId,
  maxLength,
  disabled,
  autocomplete,
  className,
  fieldLoader,
  iconClickable = false,
  onChange = () => null,
  onBlur = () => null,
  onClick = () => null,
  validator,
  rules = "",
  subComponent = null,
  onFocus = () => null,
  getNode = () => null,
  icon,

}) => {
  const id = "react-form-field-" + name;


  const { submitCount, setFieldTouched, ...props } = useFormikContext();
  useEffect(() => {
    if (submitCount > 0 && !!!touched) {
      setFieldTouched(name, true);
    }
  }, [submitCount]);


  const [isFocused, setFocus] = useState(false);
  const [hide, setHide] = useState(false);

  const textInput = useRef(null);

  const handleAutoFill = (e) => {
    if (e.animationName === "onAutoFillStart") {
      setHide(true);
    }
  };

  useEffect(() => {
    getNode(textInput);
  }, [isShowPass]);

  return (
    <fieldset id={fieldId}
      className={`form-group similac-form-group ${isFocused ? "isFocused" : "isBlured"
        } ${((hide || value) && "input-contents") || ""} ${className || ""}`}
    >
      <label htmlFor={id} className="similac-label-floating">
        {label}
      </label>

      <input
        ref={textInput}
        type={type || "text"}
        className={`form-control ${(error && touched && "is-invalid") || ""}`}
        id={id}
        name={name}
        disabled={disabled}
        autocomplete={autocomplete || ""}
        maxLength={maxLength || 999}
        onChange={(e) => onChange && onChange(e) & setHide(false)}
        onClick={onClick}

        value={value}
        onAnimationStart={handleAutoFill}
        onFocus={() => setFocus(true) & setHide(false) & onFocus(true)}
        onBlur={(e) => setFocus(false) & setHide(false) & onBlur(e)}
      />
      <span className={`input-icon ${iconClickable ? 'clickable' : ''}`}>{icon}</span>
      {subComponent}
      <ErrorMessage name={name} >
        {msg => (<div
          className="invalid-feedback similac-error-group "
          dangerouslySetInnerHTML={{ __html: msg }}
        />)}
      </ErrorMessage>
      {fieldLoader ? <FieldLoader name={name} /> : ""}
    </fieldset>
  );
};

export default InputField;
