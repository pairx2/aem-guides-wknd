import React from "react";

const Button = ({ label, type = "button", className,disabled,onClick, primary, inlineBtn=false, parentContext, id }) => {
  
  let onClickCall = onClick;
  if(parentContext){
    onClickCall = parentContext;
  }
  
  if(inlineBtn){
    return (
        <button
          type={type}
          className={`btn ${primary ? "btn-primary":""} ${className||""}`}
          onClick={onClickCall}
          disabled={disabled}
		  id={id}
        >
          {label}
        </button>
    );
  }
  return (
    <fieldset className="form-group similac-form-group">
      <button
        type={type}
        className={`btn ${primary ? "btn-primary":""} ${className||""}`}
        onClick={onClickCall}
        disabled={disabled}
		id={id}
      >
        {label}
      </button>
    </fieldset>
  );
};

export default Button;
