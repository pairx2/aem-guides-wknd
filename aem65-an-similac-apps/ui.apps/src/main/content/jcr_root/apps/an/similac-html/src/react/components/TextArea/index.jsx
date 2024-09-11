import React, { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";

const Textarea = ({ label,
  name,
  touched,
  maxLength,
  error,
  row,
  spellCheck,

  value,
  onChange = () => null,
  onBlur = () => null,
  onClick = () => null,


  onFocus = () => null,

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


  const handleAutoFill = (e) => {
    if (e.animationName === "onAutoFillStart") {
      setHide(true);
    }
  };


  return (
    <>
      <fieldset className={`form-group textarea-wrapper similac-form-group ${isFocused ? "isFocused" : "isBlured"
        } ${((hide || value) && "input-contents") || ""}`}>

        <label htmlFor={id} className="similac-label-floating">

          {label}
        </label>
        <textarea
          className={`form-control ${(error && touched && "is-invalid") || ""}`}
          id={id}
          row={row}
          name={name}
          maxLength={maxLength || 1000}
          onChange={(e) => onChange && onChange(e) & setHide(false)}
          onClick={onClick}
          value={value || ""}
          spellCheck={spellCheck}
          onAnimationStart={handleAutoFill}
          onFocus={() => setFocus(true) & setHide(false) & onFocus(true)}
          onBlur={(e) => setFocus(false) & setHide(false) & onBlur(e)}
        > </textarea>






        <ErrorMessage name={name} >
          {msg => (<div
            className="invalid-feedback similac-error-group "
            dangerouslySetInnerHTML={{ __html: msg }}
          />)}
        </ErrorMessage>
      </fieldset>
    </>
  );

};


export default Textarea;