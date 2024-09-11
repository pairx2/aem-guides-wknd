import { BOOLEAN_STRING, SINGLE_EMPTY_SPACE, ZERO } from "../../utils/enums";

const LS = window.localStorage;
export const updateOtpModalFlag = () => {
    if(LS.getItem('otpModal') == BOOLEAN_STRING.TRUE){
        LS.setItem('otpModal', BOOLEAN_STRING.FALSE);
    }
}

export const setMobileNumber = (mobile_phone) => {
    if(mobile_phone?.[1]) 
        return `+${mobile_phone?.[2]?.dialCode} ${mobile_phone[1].startsWith(ZERO) ? mobile_phone[1].replace(ZERO,'').replaceAll(SINGLE_EMPTY_SPACE,'') : mobile_phone[1].replaceAll(SINGLE_EMPTY_SPACE,'')}`;
    else 
        return '';
}

export const setLandlineNumber = (landline_phone) => {
    if(landline_phone?.[1]) 
        return `+${landline_phone?.[2]?.dialCode} ${landline_phone[1].startsWith(ZERO) ? landline_phone[1].replace(ZERO,'').replaceAll(SINGLE_EMPTY_SPACE,'') : landline_phone[1].replaceAll(SINGLE_EMPTY_SPACE,'')}`;
    else 
        return '';
}

export const getValidationErrorClassName = (validationError, error, isDragging) => {
    if(validationError || error) 
        return 'error';
    else
        return isDragging ? 'blue' : 'grey';
}