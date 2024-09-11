import React, { useEffect } from "react";
import InputMask from 'react-input-mask';
import { ErrorMessage, useFormikContext } from "formik";

const InputMasker = ({ fieldId, name, value, label, error, touched, onBlur,mask="999-999-9999", ...props }) => {
  const id = "react-form-field-" + name;
  const isFocused = false, hide = false;
  const { submitCount, setFieldTouched } = useFormikContext();
  useEffect(() => {
    if (submitCount > 0 && !!!touched) {
      setFieldTouched(name, true);
    }
  }, [submitCount]);
  const handleBlur = (e) => {
    if (!touched) {
      setFieldTouched(name, true);
    }
    onBlur(e);
  }
  return (
    <fieldset id={fieldId}
      className={`form-group similac-form-group ${isFocused ? "isFocused" : "isBlured"
        } ${((hide || value) && "input-contents") || ""}`}
    >
      <label htmlFor={id} className="similac-label-floating">
        {label}
      </label>
      <InputMask
        class={`form-control ${(error && touched && "is-invalid") || ""}`}
        name={name}
        value={value}
        mask={mask}
        onBlur={handleBlur}
        {...props} />
      <ErrorMessage name={name} >
        {msg => (<div
          className="invalid-feedback similac-error-group "
          dangerouslySetInnerHTML={{ __html: msg }}
        />)}
      </ErrorMessage>
    </fieldset>)
}

export default InputMasker;
