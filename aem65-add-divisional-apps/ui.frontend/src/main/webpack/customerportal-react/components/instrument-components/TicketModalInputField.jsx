import React from "react";
import PropTypes from "prop-types";

export const TicketModalInputField = (props) => {
  const {
    placeholder,
    label,
    required,
    name,
    onInput,
    isDisabled,
    className,
    maxLength
  } = props;
  return (
<div className={`fields text ${className}`}>
   <div className="a-input-field mt-0 ticket-modal-input-field"
        data-required="true">
      <div className="form-group a-form-grp"
           data-component="input-field">

         <label className="form-label a-input-label">{label}
           {(required == true) && (<span className="a-input-field--required">*</span>)}
         </label>
         <div className="input-group a-input-grp">
            <textarea id='modal-comment-textarea'
                 className="form-control a-input-control"
                 placeholder={placeholder}
                 aria-label="{label}"
                 onInput={onInput}
                 name={name}
                 type="text"
                 disabled={isDisabled}
                 maxLength={maxLength}
                 required={required}/>
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


TicketModalInputField.defaultProps = {
  placeholder: null,
  label: null,
  required: false,
  name: null,
  onInput: null,
  isDisabled: false,
  className: "",
  maxLength: null
};

TicketModalInputField.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onInput: PropTypes.func,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
  maxLength: PropTypes.number
};

export default TicketModalInputField;

