import React, { useState, useRef, useEffect } from "react";
import InputMask from 'react-input-mask';
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
  className,
  fieldLoader,
  iconClickable,
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
    <fieldset id={id}
      className={`form-group similac-form-group ${isFocused ? "isFocused" : "isBlured"
        } ${((hide || value) && "input-contents") || ""} ${className || ""}`}
    >
      <label htmlFor={id} className="similac-label-floating">
        {label}
      </label>

      {<InputMask
        class={`form-control ${(error && touched && "is-invalid") || ""}`}
        name={name}
        value={value}
        mask={"99/99/9999"}
        
        onBlur={(e) => setFocus(false) & setHide(false) & onBlur(e)}
        onClick={onClick}
        disabled={disabled}
        onChange={(e) => {
          onChange && onChange(e);
          setHide(false);
        }}
        {...props} />}
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
