import React from "react";
import { SvgIcon } from "../../common/common";

const PwaFormError = ({ name, formError  }) => {
    let errorMsgText = 'The email address or password you entered does not match our records for current Rewards members. Please try again or visit <a href="https://www.similac.com">Similac.com</a> to reset your password or create an account.';

    return formError && (
        <fieldset className="form-group similac-form-group form-error-msg" data-scroll={name}>
            <SvgIcon className="error-info-icon" icon={"alert-circle-outline-information"} />
            <div className="error-msg">
                <span dangerouslySetInnerHTML={{__html:errorMsgText}}></span>
            </div>
        </fieldset>
    ) || null
}
export default PwaFormError;