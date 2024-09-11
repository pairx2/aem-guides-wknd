import React, { useState, useRef } from "react";

const InputField = ({
  label,
  name,
  type,
  value,
  onChange,
  validator,
  rules = "",
}) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    /* handleSubmit,
    isSubmitting,
    and other goodies */
  } = validator;
  const inputValue = values[name];
  const id = "react-form-field-" + name;

  const [isFocused, setFocus] = useState(false);
  const [hide, setHide] = useState(false);

  const textInput = useRef(null);

  const handleAutoFill = (e) => {
    if (e.animationName === "onAutoFillStart") {
      setHide(true);
      setTimeout(() => {
        textInput.current.value; // Fix for autofill
      }, 50);
    }
  };

  return (
    <fieldset
      className={`form-group similac-form-group ${
        (!isFocused && "isFocused") || ""
      } ${((hide || inputValue) && "input-contents") || ""}`}
    >
      <label htmlFor={id} className="similac-label-floating">
        {label}
      </label>
      <input
        ref={textInput}
        type={type || "text"}
        className={`form-control ${errors[name] && touched[name] && "is-invalid" || ''}`}
        id={id}
        name={name}
        onChange={(e) => handleChange(e) & setHide(false)}
        value={inputValue}
        onAnimationStart={handleAutoFill}
        onFocus={() => setFocus(true) & setHide(false)}
        onBlur={(e) => setFocus(false) & setHide(false) & handleBlur(e)}
      />
      <div className="invalid-feedback similac-error-group ">
        {/* {validator.message(name, inputValue, rules)} */}
        {errors[name] && touched[name] && errors[name]}
      </div>
    </fieldset>
  );
};

const MemoizedInputField = React.memo(InputField);
export default MemoizedInputField;
