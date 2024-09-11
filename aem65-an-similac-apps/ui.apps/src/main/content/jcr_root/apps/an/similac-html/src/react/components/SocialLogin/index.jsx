import React, { Component } from "react";
import swal from "sweetalert";
import { sendFormData, getErrorMessage } from "../../common/api";
const {
  jsonSocialLoginData: {
    registrationURL = "",
    accountLinkingURL = "",
    socialLoginSuccessURL = "",
    myOffersURL = ""
  } = {}
} = window;

const redirectOnSuccessURLOasis =
  "/content/an/similac/us/en/account/offers.html";

export default class SocialLogin extends Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.onError = this.onError.bind(this);
    this.state = {
      formError: "",
      provider: "",
      captchaValue:""
    };
  }

  async onLogin(e) {
    const {
      UID: uid = "",
      UIDSignature: uidsignature = "",
      signatureTimestamp: signaturetimestamp = "",
      provider
    } = e;
    this.setState({ provider: provider.name });

    const config = {
      headers: {
        rememberme: false,
        uid,
        uidsignature,
        signaturetimestamp
      }
    };

   if(!this.isPWA()){
    ABBOTT.gtm.buildAndPush.formTracking(
      "sign-in",
      "click",
      "social-sign-in_submit"
    );
   } else{
    ABBOTT.gtm.buildAndPush.formTracking(
      "sign-in",
      "click",
      "pwa_social-sign-in_submit"
    );
   }

    const captchaToken = await this.props.getToken("true");
    await sendFormData(this.props.actionPath, {captchaType : this.props.reCaptchaType, captchaValue: captchaToken, campaign: this.props.utmCampaign, altPromoPage: this.props.altPromoCode}, config)
      .then(async result => {
        const { errorCode, response, status } = result;
        const { onLoginSuccess = () => null } = this.props;

        if (errorCode === 0 && status === true) {
          if(!this.isPWA()){
            ABBOTT.gtm.buildAndPush.formTracking(
              "sign-in",
              "submit",
              "social-sign-in_submit_" + provider.name
            );
          } else{
            ABBOTT.gtm.buildAndPush.formTracking(
              "sign-in",
              "submit",
              "pwa_social-sign-in_submit_" + provider.name
            );
          }

          if (!window.sessionStorage.getItem(this.props.formName + "___API")) {

            await onLoginSuccess(response);
            if (
              typeof jsonData !== "undefined" &&
              jsonData.formName === "checkoutLogin"
            ) {
      
              return;
            } else 
              if (doSignIn && doSignIn.formName === "DO SignIn Form") {
                this.redirectURL(doSignIn.redirectOnSuccessURL);
              }
              else {
                this.redirectURL(socialLoginSuccessURL);
              }
          } else {
            const data = await onLoginSuccess();
            if (data.response.i18nMessageKey === "UP-1002") {
              this.setState(
                { formError: this.props.errorUpdateProfile },
                () => {
                  $(".errorMessage").html(this.state.formError);
                }
              );
              //Check if user is getting any error by using swal(errorMessage, "", "error")
            } else if (data.response.i18nMessageKey === "UP-1003") {
              this.setState(
                {
                  formError: this.props.errorUpdateProfileNonDOUser
                },
                () => {
                  $(".errorMessage").html(this.state.formError);
                }
              );
            } else {
              let updatedMyOffersURL = myOffersURL + "#thanksDigital";
              this.redirectURL(updatedMyOffersURL);
            }
          }

          // Check if user is getting any message by using swal("Login Success", "", "success");
        } else {
          const { errorMessage = "Failed to Login" } =
            getErrorMessage(result) || {};
          // Check if user is getting any error by using swal(errorMessage, "", "error")
        }

        return result;
      })
      .catch(([jqXHR = {}]) => {
        const { errorMessage = "Failed to Login" } =
          getErrorMessage(jqXHR) || {};
        swal(errorMessage, "", "error");
      });
  }
  onError = e => {
    const { errorCode } = e;
    switch (errorCode) {
      case "200009":
        this.onAccountsLinked(e);
        break;
      case "403043":
        this.onLoginIdentifierExists(e);
        break;
      case "206001":
      default:
        this.onAccountRegistrationPending(e);
    }
  };
  getCurrentURL = () => {
    const { protocol, hostname } = window.location;
    return `${protocol}//${hostname}`;
  };
  urlWithoutHash = _url => {
    let url = new URL(_url, this.getCurrentURL());
    url.hash = "";
    return url.toString();
  };
  isSameUrls = (url1, url2) => {
    return this.urlWithoutHash(url1) === this.urlWithoutHash(url2);
  };

  isPWA = () => {
    if (window.location.href.indexOf("/app") > -1) {
        return true;
    }
    return false;
  }
  redirectURL = url => {
    if (!this.isSameUrls(url, window.location.href)) {
      window.location = url;
    }
  };
  onAccountRegistrationPending = e => {
    if (
      typeof jsonData !== "undefined" &&
      jsonData.formName === "checkoutLogin"
    ) {
      $(".errorMessage").html(jsonData.chekoutLoginErrorMessage);
    } else {
      this.redirectURL(registrationURL);
    }
  };

  onAccountsLinked = e => {
    //Check if user is redirected to accountLinking
    // console.log(e, "onAccountsLinked");
  };
  onLoginIdentifierExists = e => {
 
    const { response: { regToken = "", id_token = "", loginID = "" } = {} } = e;
    if (window.sessionStorage) {
      sessionStorage.setItem("regToken", regToken);
      sessionStorage.setItem("id_token", id_token);
      sessionStorage.setItem("loginID", loginID);
      sessionStorage.setItem("provider", this.state.provider);
      if (
        typeof jsonData !== "undefined" &&
        jsonData.formName === "checkoutLogin"
      ) {
        sessionStorage.setItem("userDirectedFrom", jsonData.formName);
      }
      let oasisEmail = window.sessionStorage.getItem("oasisEmail");
        this.redirectURL(accountLinkingURL);
    } else this.redirectURL(accountLinkingURL);
  };

  onScrollResize = e=> {	
    if(jQuery('#SocialLoginDivStaticId').length){	
        ABBOTT.socialLogin("", "SocialLoginDivStaticId", this.onLogin, this.onError );
        e.stopPropagation();	
    }	
    else if(jQuery('#SocialLoginDiv-1Id').length){	
        ABBOTT.socialLogin("", "SocialLoginDiv-1Id", this.onLogin, this.onError );	
        e.stopPropagation();	
    }
    else if(jQuery('#SocialLoginDivCheckoutId').length){	
        ABBOTT.socialLogin("", "SocialLoginDivCheckoutId", this.onLogin, this.onError );	
        e.stopPropagation();	
    }
    else if (window.location.href.indexOf("/app/login") > -1) {
      if (jQuery("#SocialLoginDivId").length) {
        ABBOTT.socialLogin("", "SocialLoginDivId", this.onLogin, this.onError);
        e.stopPropagation();
      }
    }
    return "";	
};
  componentDidMount() {
    const { name } = this.props;
    if(jQuery('#SocialLoginDivStaticId').length || jQuery('#SocialLoginDiv-1Id').length || jQuery('#SocialLoginDivId').length || jQuery('#SocialLoginDivCheckoutId').length){
      window.ABBOTT.socialLogin("", `${name}Id`, this.onLogin, this.onError);
    }
    window.addEventListener('scroll', this.onScrollResize);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScrollResize);
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    const { name } = this.props;
    const { formError } = this.state;
    return (
      <div>
        <p className="errorMessage"></p>
        <fieldset className={`form-group similac-form-group`}>
          <div id={`${name}Id`} /><div className='field-loader field-login-loader mb-4 mt-4'><div className='bullet-wrap'><div className='bullet b-1'></div><div className='bullet b-2'></div><div className='bullet b-3'></div></div></div>
        </fieldset>
      </div>
    );
  }
}
