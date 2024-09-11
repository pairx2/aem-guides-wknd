const getCaptchaToken = async function (enableRecaptcha, gSiteKey="") {
    var captchaToken = "";
    if (enableRecaptcha != "true") { // if captcha not enabled
        return captchaToken;
    }
    const isEnterpriseRecaptchaEnabled = jQuery("input[name=enterpriseRecaptcha]").length ? jQuery("input[name=enterpriseRecaptcha]").val() : false;
    var captchaCount = 0;
    var captchaToken = "";
    return new Promise(resolve => {
        var checkCaptchaValue = setInterval(() => {
            captchaCount++;
            if (captchaToken === '') {
                if (isEnterpriseRecaptchaEnabled) {
                    grecaptcha.enterprise.execute();
                    captchaToken = grecaptcha.enterprise.getResponse();
                    if (captchaToken.length > 1) {
                        resolve(captchaToken);
                        clearInterval(checkCaptchaValue);
                    }
                } else {
                    grecaptcha.execute()
                    captchaToken = grecaptcha.getResponse();
                    if (captchaToken.length > 1) {
                        resolve(captchaToken);
                        clearInterval(checkCaptchaValue);
                    }
                }
                if (captchaCount > 50) {
                    clearInterval(checkCaptchaValue);
                }
            }
        }, 200);
    });
}
const captchaTypeObj = {
    fieldType:"undefined",
    name: "captchaType",
    type:"hidden",
    value:""
};

let entRecaptcha = document.querySelector("input[name=enterpriseRecaptcha]") ? document.querySelector("input[name=enterpriseRecaptcha]").value : false;
let reCaptchaVType = "NON_ENT";
if(entRecaptcha){
    reCaptchaVType = "ENT";
}

export {captchaTypeObj};
export {reCaptchaVType};
export default getCaptchaToken;