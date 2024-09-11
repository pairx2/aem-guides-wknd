import React from "react";

const LinkButton = ({ label, href = "#", className, fieldId,  primary, type = "link", inlineBtn = "", dataGtmLabel="" }) => {
  if (inlineBtn) {
    return (
      <a
        href={href} data-gtm={dataGtmLabel}
        className={type === "linkButton" ? `btn ${primary ? "btn-primary" : ""} ${className || ""} inline-btn` : `inline-btn ${className || ""}`}
      >
        {label}
      </a>
    )
  }
  return (
    <fieldset id = {fieldId} className="form-group similac-form-group">
      <a
        href={href} data-gtm={dataGtmLabel}
        className={type === "linkButton" ? `btn ${primary ? "btn-primary" : ""} ${className || ""}` : `${className || ""}`}
      >
        {label}
      </a>
    </fieldset>
  );
};

export default LinkButton;
