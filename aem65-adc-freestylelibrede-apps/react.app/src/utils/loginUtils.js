import { isSocialLoginEnable } from "../api/esl.auth.service";
import { deleteCookie, getCookie } from "./cookieUtils";
import { BOOLEAN_STRING, SOCIAL_ACCOUNT, SUCCESS_CODE, UNDEFINED, WCM_MODE_EDIT } from "./enums";
import { getUrlParameter } from "./getParams";
import { getRequiredSiteData } from "./siteData";
import { i18nLabels } from "./translationUtils";

const LS = window.localStorage;
const SS = window.sessionStorage;

const loginComponent = document.querySelector('[data-react-component="login"]');
export const contextData = loginComponent ? JSON.parse(loginComponent.dataset.jsonString) : '';

export const setRedirection = () => {
    if (getUrlParameter('isCheckout') === BOOLEAN_STRING.TRUE) {
        LS.setItem('redirectTo', getUrlParameter('redirectTo'));
        LS.setItem('isCheckout', BOOLEAN_STRING.TRUE);
    }
}

export const removeRedirectToAndIsCheckoutItems = () => {
    LS.removeItem('isCheckout');
    LS.removeItem('redirectTo');
};

export const handleLogin = (isCheckout, isSocialLogin, customer, loginSuccessLink, redirectHashTab, magentoSuccessCode) => {
    setModalFlags(customer, magentoSuccessCode);
    if (isCheckout === BOOLEAN_STRING.TRUE && isSocialLogin && LS.getItem('redirectTo')) {
        const redirectLink = LS.getItem('redirectTo');
        removeRedirectToAndIsCheckoutItems();
        window.location = `${redirectLink}&isSocialSignIn=${isSocialLogin}`;
    } else if (customer?.email === getCookie('registrationCheckoutFlag')) {
        const redirectLink = getCookie('registrationRedirectLink');
        deleteCookie('registrationCheckoutFlag');
        deleteCookie('registrationRedirectLink');
        removeRedirectToAndIsCheckoutItems();
        window.location = encodeURI(redirectLink);
    } else if (loginSuccessLink || contextData.loginSuccessLink) {
        if (redirectHashTab) {
            window.location = encodeURI(loginSuccessLink ? loginSuccessLink + redirectHashTab : contextData.loginSuccessLink + redirectHashTab);
        }
        else {
            window.location = encodeURI(loginSuccessLink || contextData.loginSuccessLink);
        }
    }
}

const setModalFlags = (customer, magentoSuccessCode) => {
    if(magentoSuccessCode){
        sessionStorage.removeItem(SUCCESS_CODE);
    }
    if (LS.getItem('otpModal') == undefined) {
        LS.setItem('otpModal', BOOLEAN_STRING.TRUE);
    }
    if (SS.getItem('techTrainingPopup') == undefined && customer?.technical_instructions?.length > 0 && customer?.payer_number !== null && customer?.health_insurance_number !== null) {
        SS.setItem('techTrainingPopup', BOOLEAN_STRING.TRUE);
    }
    if (SS.getItem('dataConsentModal') == undefined && !customer?.data_processing) {
        SS.setItem('dataConsentModal', BOOLEAN_STRING.TRUE);
    }
}

export const setSocialLogin = (user) => {
    const sessionDetail = isSocialLoginEnable ? user?.attributes : user?.signInUserSession?.idToken?.payload;
    const userDetails = {
        userName: isSocialLoginEnable ? sessionDetail?.username : user.username,
        userId: isSocialLoginEnable ? sessionDetail?.username : sessionDetail?.identities[0]?.userId,
        providerName: isSocialLoginEnable ? sessionDetail?.username?.split('_')[0] : sessionDetail?.identities[0]?.providerName,
        firstName: isSocialLoginEnable ? sessionDetail.first_name : sessionDetail['custom:FirstName'],
        lastName: isSocialLoginEnable ? sessionDetail.last_name : sessionDetail['custom:LastName'],
        email: sessionDetail.email,
        isSocialLogin: true
    };
    return userDetails;
}

export const setLoginErrorCode = (e) => {
    let LoginErrorCode = [];
    if (e?.graphQLErrors?.length > 0) {
        LoginErrorCode = e.graphQLErrors.map(err => err.code);
    } else if (e?.networkError || typeof e.response === UNDEFINED) {
        LoginErrorCode.push(e.networkError.statusCode || '503');
    }
    return LoginErrorCode;
}

export const setSocialLoginUrl = (isSocialLogin) => {
    if (contextData.createAccountLink) {
        window.setTimeout(() => (window.location = `${contextData.createAccountLink}?isSocialSignIn=${isSocialLogin}&registrationRedirect=true`), 500);
    }
}

export const recaptchaReset = (isRecaptcha) => {
    if(isRecaptcha) window?.grecaptcha?.enterprise?.reset()
}

export const checkSocialLogin = (user) => {
    return (user.username?.toLowerCase().indexOf(SOCIAL_ACCOUNT.FACEBOOK) !== -1 || user.username?.toLowerCase().indexOf(SOCIAL_ACCOUNT.GOOGLE) !== -1);
}

export const checkUserDetails = (email, password, socialLoginCode, isEslAuthenticationEnable) => {
    return (email && password) || (socialLoginCode && isEslAuthenticationEnable);
}

export const checkEsl = (isEslAuthenticationEnable, message) => {
    return isEslAuthenticationEnable ? message.errorCode : i18nLabels.COGNITO_EXCEPTIONS.Lambda_ErrorCode_4001;
}

export const checkException = (message) => {
    return message.code || i18nLabels.COGNITO_EXCEPTIONS.UserNotFoundException;
}

export const checkWCMLoginPageUrl = () => {
    return getRequiredSiteData('loginPageUrl')?.length > 0 && getRequiredSiteData('wcmmode') !== WCM_MODE_EDIgetRequiredSiteData('loginPageUrl')?.length > 0 && getRequiredSiteData('wcmmode') !== WCM_MODE_EDIT;
}