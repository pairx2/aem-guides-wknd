/** User Reset Password -- starts**/
function updatenewResetPassword(data) {
    let newrestPasskey = window.location.search.split('resetToken=')[1].split('==')[0];
    delete data.body['requestType'];
    delete data.body['node'];
  
     data.body = {
         password: data.body.newPassword,
         confirmPassword: data.body.newPasswordConfirm,
         additionalProperties:{
            consents: [
                {
                    type: "PERSONAL_DATA_PROCESSING",
                    approved: data.body.agreeTerms
                },
                {
                    type: "TERMS_AND_CONDITIONS",
                    approved: data.body.readPolicy
                }
            ]  
    
        },       
            resetToken: newrestPasskey,
            captchaValue:  data.body['g-recaptcha-response']
     }
     delete data.body['g-recaptcha-response'];
     return data
 }
 
 
 function onBeforenewResetPassword() {
     showLoading();
 }
 
 function onSuccessnewResetPassword(data) {
     if (data.errorCode == 0) {
         hideLoading();
     } else {
         onErrorForgotPassword(data);
     }
 }
 
 function onErrornewResetPassword(error) {     
 
    showApiError(error?.response?.i18nMessageKey);
 
     hideLoading();
 }
 /** User Reset Password -- ends**/