import React, {useRef, useState} from "react";
import PropTypes from "prop-types";

export const InputField = (props) => {
  const {
    placeholder,
    label,
    required,
    name,
    onInput,
    isDisabled,
    className,
    maxLength,
    inputType,
  } = props;
  const inputRef = useRef();
  const [val, setVal] = useState("");
  React.useEffect(() => {
    if (isDisabled) {
      inputRef.current.value = "";
      inputRef.current.blur();
      if (onInput && typeof onInput == "function") {
        onInput("");
      }
    }
  }, [isDisabled])
  
  return (
<div className={`fields text m-search-bar ${className}`}>
   <div className="a-input-field mt-0"
        data-required="true">
      <div className="form-group a-form-grp"
           data-component="input-field">

         <label className="form-label a-input-label">{label}
           {(required == true) && (<span className="a-input-field--required">*</span>)}
         </label>
         <div className="input-group a-input-grp">
            <input className="form-control a-input-control"
                 placeholder={placeholder}
                 aria-label="{label}"
                 onInput={(ev) => {
                  const value = ev?.target?.value;
                  if(inputType === "alph-number") {
                      const regex = /^[0-9a-zA-Z(\-)]+$/; //this will admit letters, numbers and dashes
                      if (value.match(regex) || value === "") {
                        setVal(value);
                        onInput(ev);
                      }
                  } else {
                    onInput(ev);
                    setVal(value);
                  }
                 }}
                 name={name}
                 value={val}
                 disabled={isDisabled}
                 maxLength={maxLength}
                 required={required}
                 ref={inputRef}/>
         </div>
         <span className="form-text a-input-field--text-error">
         <em className="abt-icon abt-icon-exclamation">
         </em>
         </span>

      </div>
   </div>
</div>
  );
};


InputField.defaultProps = {
  placeholder: null,
  label: null,
  required: false,
  name: null,
  onInput: null,
  isDisabled: false,
  className: "",
  maxLength: null,
  inputType: "text",
};

InputField.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onInput: PropTypes.func,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
  maxLength: PropTypes.number,
  inputType: PropTypes.string,
};

export default InputField;

