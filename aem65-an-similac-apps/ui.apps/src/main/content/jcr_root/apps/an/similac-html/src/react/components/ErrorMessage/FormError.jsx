import React from "react";

const FormError = ({name,formError}) => {

   
    return formError && (
        <fieldset className="form-group similac-form-group" data-scroll={name}>
            <input name={name} type="hidden" />
            <div className="invalid-feedback similac-error-group " dangerouslySetInnerHTML={{__html: formError} }>
               
            </div>
        </fieldset>
    ) || null
}

export default FormError;