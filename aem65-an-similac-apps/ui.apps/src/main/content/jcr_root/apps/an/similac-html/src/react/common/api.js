import "../../js/config";
import "../../js/service.api";

const debounce = require('debounce-promise');

const getConfig = ({ headers = {}, ..._config }) => {
   
    const defaultConfig = {
        "async": true,
        "crossDomain": true,
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-country-code": "US",
            "x-application-id": "similac",
            "x-preferred-language": "en-US",
            "cache-control": "no-cache",
            "Store": window.ABBOTT.config.storeName,
            ...headers
        },
        "processData": false,
        "contentType": "application/json"
    }

    return ({
        ...defaultConfig,
        ..._config
    });
};


const getMagURL = () => {
    var BASE = document.querySelector("#store-base-url");
    if(BASE){
        return BASE.value || "";
    }
    return "";
}

const getAemURL = () => {
    var BASE = document.querySelector("#aem-base-url");
    if(BASE){
        return BASE.value || "";
    }
    return "";
}

const getCurrentURL = () => {
    const {protocol,hostname} = window.location;
    return `${protocol}//${hostname}`;
}

const getAvailableBaseURL = () => {
    return getAemURL() || getCurrentURL();
}

const getMessage = (errorCode, errorCodeInfo = []) => {
    return errorCodeInfo.find((item) => (item.errorCode.toString().trim() === String(errorCode).toString()));
}

const getMessageForReg = (errorCode) => {
    const {errorCodeInfo=[]} = (window.errorCodeData || {});
    const mess = getMessage(errorCode,errorCodeInfo);
    if(mess){

        const {errorMessage} = mess;
        return errorMessage;
    }
    else{
        return ""
    }
}

const getErrorMessage = (data = {}) => {
    const { errorCodeData: { errorCodeInfo = [] } = {} } = window;
    if (typeof data.done == "function" &&
        typeof data.fail == "function" &&
        typeof data.always == "function") {
        
        const {status,responseJSON = {}} = data;
        const parsedJSON = getErrorMessage(responseJSON);
        const {errorMessage=""} = parsedJSON;
        if(errorMessage){
            return parsedJSON;
        }
        return getMessage(status,errorCodeInfo);
    }
    else if (typeof (data) === "object") {
        const {
            errorCode,
            message = "",
            response: {
                statusReason = "",
                i18nMessageKey = ""
            } = {}
        } = data;

        const i18LocalData = i18nMessageKey && getMessage(i18nMessageKey,errorCodeInfo);
        if(i18LocalData) return i18LocalData;
        else if(statusReason) return ({errorMessage: statusReason , errorCode: i18nMessageKey});
        else if(message) return ({errorMessage: message, errorCode:""});
        else if(errorCode) {
            const errorCodeData = getMessage(errorCode,errorCodeInfo);
            if(errorCodeData) return errorCodeData;
        }
        return {};        
    }
    else if (typeof (data) === "string" || typeof (data) === "number") {
        return getMessage(data, errorCodeInfo) || {};
    }
    return {};
}

const makeCall = (config, verifyemailID) => new Promise((resolve, reject) => {
    const _config = getConfig(config);
    const verifyemailIDC = verifyemailID;
    ABBOTT.http.makeAjaxCall(_config, verifyemailIDC).done((result) => {
        resolve(result);
    }).fail((...message) => {
        reject(message);
    })
});

const memoize = (method) => {
    let cache = {};

    return async function () {
        let args = JSON.stringify(arguments);
        cache[args] = cache[args] || method.apply(this, arguments);
        return cache[args];
    };
}


const fetchVerifyEmailExists = debounce(memoize((baseURL, userName = "", type = "", captchaToken = "") => {
    $(".field-loader").show();
    const url = baseURL || "https://ow278jgus1.execute-api.us-east-1.amazonaws.com/dev/api/registration/verify-email-exists";
    const data = JSON.stringify({
        userName,
        userType: "StrongMom",
        captchaValue: captchaToken
    });
    const config = {
        url,
        data,
        async:true
    };

    return makeCall(config, true).then(result => {
        $(".field-loader").hide();
        const { status = false, response = {}, errorCode } = result;
        if (status && errorCode===0) {
            const { loginIdentity } = response;
            return loginIdentity ? true : undefined;
        }
        else{
            return true
        }
      
    }).catch(({ jqXHR = {} }) => {
        $(".field-loader").hide();
        const { status } = jqXHR;
        const { errorMessage = "Sorry, Error in verification" } = getErrorMessage(status) || {};
        return errorMessage;
    });
}), 750);

const fetchVerifyMemberIDExists = debounce(memoize((baseURL, userName = "") => {
 
    const url = baseURL || "https://ow278jgus1.execute-api.us-east-1.amazonaws.com/dev/api/registration/verify-email-exists";
    const data = JSON.stringify({
        userName,
        userType: "StrongMom"
    });
    const config = {
        url,
        data
    };

    return makeCall(config, true).then(result => {
        const { status = false, response = {} } = result;
        if (status) {
            const { loginIdentity } = response;
            return loginIdentity ? true : undefined;
        }
        return "Sorry invalid email";
    }).catch(({ jqXHR = {} }) => {
        const { status } = jqXHR;
        const { errorMessage = "Sorry, Error in verification" } = getErrorMessage(status) || {};
        return errorMessage;
    });
}), 750);

const sendFormData = (baseURL, formData, _config = {}) => {
    const url = baseURL;
    let data = "";
    if(formData){
        data = JSON.stringify(formData);
    }
    const config = {
        url,
        data,
        async: true,
        ..._config
        //api call lag for aws
    };
    
    return makeCall(config)
}



export {
    getConfig,
    makeCall,
    memoize,
    fetchVerifyEmailExists,
    fetchVerifyMemberIDExists,
    sendFormData,
    getErrorMessage,
    getAemURL,
    getMagURL,
    getCurrentURL,
    getAvailableBaseURL,
    getMessageForReg
}