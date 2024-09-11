import "core-js/features/url";
import "core-js/features/url-search-params";
import * as React from "react";
import { Formik, Form, Field, useField } from "formik";
import moment from "moment";
import swal from "sweetalert";
import { SvgIcon } from "../../common/common";
import InputField from "../../components/InputField";
import InputMasker from "../../components/InputMasker";
import HtmlTag from "../../components/HtmlTag";
import SocialLogin from "../../components/SocialLogin";
import Help from "../../components/Help";
import Checkbox from "../../components/Checkbox";
import Radio from "../../components/Radio";
import RadioButton from "../../components/RadioButton";
import Dropdown from "../../components/DropdownSet";
import validations from "../../common/validations";
import Divider from "../../components/Divider";
import Button from "../../components/Button";
import LinkButton from "../../components/Button/link";
import CalendarSet from "../../components/CalendarSet";
import GoogleAPI from "../../components/GoogleAPI";
import Focus from "../../components/ErrorMessage/focus";
import FormError from "../../components/ErrorMessage/FormError";
import {
  sendFormData,
  getErrorMessage,
  getMessageForReg
} from "../../common/api";
import { groupFieldsWithConfig } from "../../common/regFunctions";
import { flattenObject } from "../../common/apiToLocal";
import { setLocalStorage } from "../../common/localStorageState";
import "../../../js/social-login";
import { makeCall } from "../../common/api";
import Recaptcha from "../../components/Recaptcha";
import getCaptchaToken,{captchaTypeObj, reCaptchaVType} from "../../common/recaptcha";


class LoginDialog extends React.Component {
  constructor(props) {
    super(props);
    let users= {};
    let campaign='';
    let qrcode = '';
    let campaignField = {};
    let productField = {};
    let qrField = {};
    let setPromoField = {};
    let campaignDoOpt = false;
    let setPromoCode = "";
    let hasProduct = false;
    let campaignProfile = false;
    if(sessionStorage.getItem("productName") === "TARGET_MICRO_WEBSITE"){
      productField = {
        fieldType:"undefined",
        name:"product",
        type:"hidden",
        value: ""
      }
      hasProduct = true;
      props.data.fields.push(productField);
    }
    if(sessionStorage.getItem('MediaTracking')!=null){
    users =  JSON.parse(sessionStorage.getItem('MediaTracking'));
    campaign =  users.utm_campaign !=null? users.utm_campaign:"";
    if(campaign === "sim-momcare-walmart" || 
       campaign === "sim-digital-offer-conversion"
       ) {
       campaignField = {
        fieldType:"undefined",
        name: "campaign",
        type:"hidden",
        value:""
      }
      props.data.fields.push(campaignField);
      if(campaign === "sim-digital-offer-conversion"){
        setPromoField = {
          fieldType:"hidden",
          name: "altPromoPage",
          type:"hidden",
          value:true
        }
        props.data.fields.push(setPromoField);
        setPromoCode = "rewards";
      }
      campaignDoOpt = true;
    }
   
  }
  if(ABBOTT.cookie('MediaTracking')) {
    let sweepCookie = JSON.parse(ABBOTT.cookie('MediaTracking'));
    if(sweepCookie.utm_campaign && sweepCookie.utm_campaign.toLowerCase() === "sim-mysimilac-sweepstakes"){
      campaign = sweepCookie.utm_campaign;
      qrcode =  sweepCookie.qr_code !=null? sweepCookie.qr_code:""; 
      campaignField = {
        fieldType:"undefined",
        name: "campaign",
        type:"hidden",
        value:""
      };
      qrField = {
        fieldType:"undefined",
        name: "qrcode",
        type:"hidden",
        value:""
      };
    
      props.data.fields.push(campaignField);
      props.data.fields.push(qrField);
      campaignDoOpt = true;
    }
  }
  let redirectPath = props.data.redirectOnSuccessURLOasis
                    ? props.data.redirectOnSuccessURLOasis
                    :"/account/offers.html";
  // To direct the page based on the scenario
  if(sessionStorage.getItem('MediaTracking')){
    let utmCheck = JSON.parse(sessionStorage.getItem('MediaTracking'));
    let utmdata = utmCheck ? utmCheck.utm_term:"";
    let utmAuthorData = document.getElementById("utmData").value.split(",");
    if(utmAuthorData.includes(utmdata)){
      campaignProfile = true;
    }
  }
    props.data.fields.push(captchaTypeObj);
    const { formName, fields: flds = [] } = props.data;
    const { fields = [] } = this.initFieldSate(flds || []);
    this.gSiteKey = "";
    this.state = {
      isShowPass: false,
      formName,
      fields,
      processing: false,
      dob: "",
      weeks: "",
      userSubType: "",
      upemailid: null,
      captchaValue: "",
      captchaAccountId: "",
      campaignVal: campaign,
      qrcode: qrcode,
      campaignDO: campaignDoOpt,
      setPromoCode,
      hasProduct,
      offersPage: redirectPath,
      campaignProfile,
      loginIDval: sessionStorage.getItem("oasisEmail")
        ? sessionStorage.getItem("oasisEmail").trim()
        : ""
    };
  }

  showToggle = e => {
    this.setState({
      isShowPass: !this.state.isShowPass
    });
  };

  updateFieldType = (item = {}) => {
    const { sourceValue, type, value, fieldType: ft } = item;
    if (ft) {
      return item;
    }
    const _item = { ...item };
    if (type === "checkbox" && typeof sourceValue === "undefined") {
      _item["fieldType"] = typeof true;
    } else if (type === "hidden") {
      _item["fieldType"] = typeof value;
    } else if (sourceValue !== null) {
      if (typeof sourceValue === "object") {
        if (Array.isArray(sourceValue) && sourceValue.length) {
          _item["fieldType"] = typeof sourceValue[0].value;
        } else {
          _item["fieldType"] = "object";
        }
      } else {
        _item["fieldType"] = typeof sourceValue;
      }
    } else {
      _item["fieldType"] = typeof "string";
    }
    return _item;
  };

  initFieldSate = (_fields = []) => {
    const fields = _fields.map(item => {
      const _item = this.updateFieldType(item);
      const { name: _name = "", value: _value = "", initValue = "" } = _item;
      const name = _name
        ? String(_name)
            .trim()
            .replace(/[ ]/g, "_")
        : _name;
      const value = initValue ? initValue : _value;
      return {
        ..._item,
        name,
        value
      };
    });
    return {
      fields
    };
  };

  setInitialState = () => {
    const initialValues = { email: "", password: "" };
    return { initialValues };
  };

  checkError = (prom, errorMessage) => {
    if (prom instanceof Promise) {
      return prom.then(result => {
        if (typeof result === "boolean" && result === true) {
          return errorMessage;
        } else if (typeof result === "string") {
          return result;
        }
        return undefined;
      });
    } else if (prom) {
      return errorMessage;
    }
    return undefined;
  };

  storeAccountInfo = async (
    { accountInfo: { profile, UID = "", data: { userType = "" } } = {} },
    _state
  ) => {
    let _data = _state;
    let social = "";
    if (_state === undefined || _state === "") {
      await this.getProfileInfo(UID).then(res => {
        _data = res;
        social = "true";
      });
    }

    const {
      dob = "",
      weeks = "",
      userSubType = "",
      lineOne = "",
      lineTwo = "",
      country = "",
      city = "",
      state = "",
      zipCode = "",
      contactEmail,
      needClaimeOffer,
      isUserDO
    } = _data;
    /**set cookie expiry time to one day */

    let cookieConfig = {
      path: "/",
      domain: "similac.com",
      secure:true,
      HttpOnly:true
    };
    let getCookie = ABBOTT.cookie("profile");
    let parsedCookie = getCookie ? JSON.parse(getCookie) : {};

    ABBOTT.cookie(
      "profile",
      JSON.stringify({
        ...parsedCookie,
        ...profile,
        UID,
        userType,
        dob,
        weeks,
        userSubType,
        lineOne,
        lineTwo,
        country,
        city,
        state,
        zipCode,
        contactEmail
      }),
      cookieConfig
    );

    if (window.sessionStorage.getItem("oasisEmail")) {
      let oasisEmail = window.sessionStorage.getItem("oasisEmail").trim();
      ABBOTT.cookie(
        "profile",
        JSON.stringify({ ...parsedCookie, ...profile, oasisEmail }),
        cookieConfig
      );
    }
    if (social !== "true") {
      if (
        window.sessionStorage.getItem("oasisEmail") &&
        needClaimeOffer === false
      ) {
        ABBOTT.cookie(
          "profile",
          JSON.stringify({
            ...parsedCookie,
            ...profile,
            UID,
            userType,
            dob,
            weeks,
            userSubType,
            lineOne,
            lineTwo,
            country,
            city,
            state,
            zipCode,
            contactEmail
          }),
          cookieConfig
        );

        window.location = this.state.offersPage;
      } else {
        return;
      }
     }
    if(userType === "similac-ecom" && window.localStorage.getItem("purchaser_type") === "subscription_user" && this.props.data.formName === "checkoutLogin"){
       window.location = this.props.data.redirectOnSuccessURLSubscription;
     }
     else if(window.sessionStorage.getItem('oasisEmail') && social === "true" && needClaimeOffer === true){
        this.updateClaimOffers();
     } else if(window.sessionStorage.getItem('oasisEmail') && social === "true" && needClaimeOffer === false){
        window.location = this.state.offersPage;
     } else if(window.sessionStorage.getItem('oasisEmail') && social != "true" && needClaimeOffer === true){
      this.updateClaimOffers();
    } else if(this.state.campaignDO === true || sessionStorage.getItem('productName')=== "TARGET_MICRO_WEBSITE"){
        this.updateUserProfile(isUserDO);
    }
     else{
        window.location = this.props.data.redirectOnSuccessURL;
     }
  }

  makeValidations = (validateArray = [], name = "", type = "text") => value => {
    let _type =
      type === "textbox" || typeof type === "undefined" ? "text" : type;
    for (var item in validateArray) {
      const { errorType, errorMessage, ...otherErrorData } = validateArray[
        item
      ];
      const validationMess =
        validations[errorType] &&
        validations[errorType](value, _type, otherErrorData);
      if (validationMess) {
        return this.checkError(validationMess, errorMessage);
      }
    }
  };

  onSubmitValues = async values => {
    const { actionPath, eventCategory, eventType } = this.props.data;
    let ga_type = eventType + "_submit";
    ABBOTT.gtm.buildAndPush.formTracking(eventCategory, "click", ga_type);

    this.setState({ formError: "" });
    return await sendFormData(
      actionPath,
      ...groupFieldsWithConfig(values, this.state.fields, { async: true })
    ).then(results => {
      this.setState({ processing: false });
      return results;
    });
  };


  updatePassword = () => {
    let email = this.state.upemailid;
    const { forgotPasswordActionPath } = this.props.data;
    email = JSON.stringify({ email });
    jQuery("#updatepassword-popup").modal("hide");
    let ajaxConfig = {
      url: forgotPasswordActionPath,
      data: email
    };
    return makeCall(ajaxConfig).then(
      success => {
        jQuery("#updatePasswordConfirm-popup").modal("show");
        return success;
      },
      fail => {
        console.log(fail);
      }
    );
  };

  componentDidMount() {
    this.gSiteKey = jQuery("#gSiteKey").length && jQuery("#gSiteKey").val();
    window.sessionStorage.removeItem("promoOfferSwitchDO");
    const oasisEmail = sessionStorage.getItem("oasisEmail") && sessionStorage.getItem("oasisEmail").trim();
    if (oasisEmail) {
      jQuery("section#similac-container-id #ssm-text").hide();
      jQuery("#login .ssm-form-text").hide();
      jQuery("section#similac-hcp-container").show();
      jQuery("section#hcp-disclaimer-container").show();
      jQuery(".hcp-form-text").show();
      jQuery(".hcp-forgot-password-text").css("display", "inline-block");
      jQuery("#login #react-form-field-loginID")
        .prop("readonly", true)
        .addClass("grayedOut");
    }
    if(sessionStorage.getItem("sweepPopUp")){
      jQuery('#similac-container-id').hide();
      jQuery('#sweep-container-id .cmp-container').removeClass('d-none');
      jQuery('.ssm-account-text').addClass('d-none');
      jQuery('.sweep-form-text').removeClass('d-none');
  }

    $(".errorMessage").html("");
    if (document.getElementById("updatePassword")) {
      document
        .getElementById("updatePassword")
        .addEventListener("click", () => {
          this.updatePassword();
        });
    }

  }

  updateClaimOffers = async () => {
    let data = JSON.stringify({
      category: "claimOffers"
    });
      let ajaxConfig = {
        url: this.props.data.actionPathToUpdateProfile,
        method: "POST",
        contentType: "application/json",
        headers: {
          "content-type": "application/json",
          "x-country-code": "US",
          "x-application-id": "similac",
          "x-preferred-language": "en-US", 
          "x-id-token": ABBOTT.utils.getSessionInfo()
        },
        data:data,
      };
       await makeCall(ajaxConfig).then(
        results => {
          if (results.errorCode === 0) {
            window.location = this.state.offersPage;
          } else {
            const dataValue = getMessageForReg("GEN_ERR");
            $("#template.global-error p").html(dataValue);
            $("#template").show();
            return false;
          }
        },
      fail => {
        console.log(fail);
      }
    );
  };

  /**
   * Method to update user profile as DO OPT-IN with MOMCAREWMT promocode
   */

   updateUserProfile = async (userDo) =>{
    if((this.state.campaignDO === true || sessionStorage.getItem('productName') === "TARGET_MICRO_WEBSITE" ) && !userDo ){
    let data = {
        category: "digitalOffer",
        offerPreferenceInfo: {
          retailer: "TBUNIVERSAL",
          enableDigital: true,
          channel: "website"
        }
      };
      let ajaxConfig = {
        headers: {
          "x-id-token": ABBOTT.utils.getSessionInfo()
        }
      };
      sessionStorage.removeItem("productName");
      sendFormData(this.props.data.actionPathToUpdateProfile, data, ajaxConfig)
      .then(async results => {
        const {errorCode } = results;
        if (errorCode !== 0) {
          const dataValue = getMessageForReg(errorCode);
          $("#template.global-error p").html(dataValue);
          $("#template").show();
          $("html, body").animate({ scrollTop: 0 }, "slow");
          return false;
        } else{
          this.doRedirectDecide();
        }
      })
      .catch(([jqXHR = {}]) => {
        const dataValue = getMessageForReg("GEN_ERR");
        $("#template.global-error p").html(dataValue);
        $("#template").show();
        return false;
      });
   } else {
    this.doRedirectDecide();
   }
  }

/* update user profile redirect common logic */

doRedirectDecide = () =>{
  let docookieConfig = {
    path: "/",
    domain: "similac.com",
    expires: -1
  };
  ABBOTT.removeCookie('DO', docookieConfig);
  if(this.state.campaignVal === "sim-digital-offer-strongmoms"){
    window.location = this.state.offersPage
  } else {
    window.location = this.props.data.redirectOnSuccessURL;
  }
}
  /**
   *  Method to get user my profile  information from AWS
   */
  getProfileInfo = async uid => {
    let ajaxConfig = {
      url: this.props.data.actionPathGetProfile,
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-country-code": "US",
        "x-application-id": "similac",
        "x-preferred-language": "en-US",
        "x-id-token": ABBOTT.utils.getSessionInfo()
      }
    };
   
    return await makeCall(ajaxConfig).then(
      results => {
        const { response } = results;

        const { lineOne, lineTwo, country, city, state, zipCode } =
          results.response.addresses && results.response.addresses.length > 0
            ? results.response.addresses[0]
            : "";
        // if oasis user directly login has claimed HCP offers
        let needClaimeOffer = false;
        if (
          !window.sessionStorage.getItem("oasisEmail") &&
          results.response.hcpInfo &&
          results.response.hcpInfo.offers &&
          results.response.hcpInfo.offers.length > 0
        ) {
          let hasClaimeOffer = false;
          results.response.hcpInfo &&
            results.response.hcpInfo.offers.forEach(offer => {
              if (
                offer.offerClaimDate &&
                offer.offerClaimDate !== "undefined" &&
                offer.offerClaimDate !== null
              ) {
                hasClaimeOffer = true;
              }
            });

          let cookieConfig = {
            path: "/",
            domain: "similac.com",
            secure:true,
            HttpOnly:true
          };
          if (hasClaimeOffer) {
            var contactEmail = results.response.userInfo.contactEmail
              ? results.response.userInfo.contactEmail
              : "";
            ABBOTT.cookie(
              "profile",
              JSON.stringify({
                oasisEmail: results.response.userInfo.userName,
                contactEmail
              }),
              cookieConfig
            );
          }
        }

        if (
          window.sessionStorage.getItem("oasisEmail") &&
          results.response.hcpInfo &&
          results.response.hcpInfo.offers &&
          results.response.hcpInfo.offers.length > 0
        ) {
          results.response.hcpInfo &&
            results.response.hcpInfo.offers.forEach(offer => {
              if (
                !offer.offerClaimDate ||
                offer.offerClaimDate === "undefined" ||
                offer.offerClaimDate === null
              ) {
                needClaimeOffer = true;
              }
            });

          let cookieConfig = {
            path: "/",
            domain: "similac.com",
            secure:true,
            HttpOnly:true
          };
          var contactEmailOne = results.response.userInfo.contactEmail
            ? results.response.userInfo.contactEmail
            : "";
          ABBOTT.cookie(
            "profile",
            JSON.stringify({  
                  oasisEmail: window.sessionStorage.getItem("oasisEmail").trim(),
                  contactEmailOne
            }),
            cookieConfig
          );
        }
        if (
          window.sessionStorage.getItem("oasisEmail") &&
          results.response.userInfo.userType === "similac-ecom"
        ) {
          let cookieConfig = {
            path: "/",
            domain: "similac.com",
            secure:true,
            HttpOnly:true
          };
          var contactEmailTwo = results.response.userInfo.contactEmail
            ? results.response.userInfo.contactEmail
            : "";
          ABBOTT.cookie(
            "profile",
            JSON.stringify({  
                  oasisEmail: window.sessionStorage.getItem("oasisEmail").trim(),
                  contactEmailTwo
            }),
            cookieConfig
          );
        }
        
        const {
          offerPreferenceInfo: { product = "", enableDigital = false } = {},
          children = []
        } = response;
        let isUserDO = false;
        if (results.status ) {
          if(results.response.userInfo.userType !== "similac-ecom"){
             if(response.offerPreferenceInfo.retailer && 
              response.offerPreferenceInfo.retailer.toLowerCase() === "tbuniversal"){
              isUserDO = true;
             }
            }
          let userSubType = "";
          const sortChildren = children
            .sort(({ birthDate: b1 = "" }, { birthDate: b2 = "" }) => {
              return new Date(b1) - new Date(b2);
            })
            .filter(({ deleted = false }) => !deleted);
          let actChild;
          let youngChild;
          if (sortChildren.length) {
            actChild = children.find(({ activeChild = false }) => activeChild);
            if (!actChild) {
              actChild = sortChildren[sortChildren.length - 1];
            }
            youngChild = sortChildren[sortChildren.length - 1];
            if (actChild.premature) {
              userSubType = "neosure";
            }
          }
          if (product.toLowerCase() === "alimentum") {
            userSubType = "alimentum";
          } else if (!userSubType) {
            userSubType = "strongmoms";
          }

          if (youngChild) {
            let birthDate = moment(youngChild.birthDate).format("MM/DD/YYYY");
            let currentDate = moment();
            let childweeks = currentDate.diff(birthDate, "week");
            // DO weeks logic
            if (childweeks >= -39 && childweeks <= 64 && !enableDigital) {
              if (ABBOTT.cookie("DO")) {
                var lc = ABBOTT.cookie("DO");
                var lp = JSON.parse(lc);

                if (lp.UID !== uid) {
                  let cookieConfig = {
                    path: "/",
                    domain: "similac.com"
                  };
                  ABBOTT.cookie(
                    "DO",
                    JSON.stringify({ UID: uid, status: true }),
                    cookieConfig
                  );
                }
              } else {
                let cookieConfig = {
                  path: "/",
                  domain: "similac.com"
                };
                ABBOTT.cookie(
                  "DO",
                  JSON.stringify({ UID: uid, status: true }),
                  cookieConfig
                );
              }
            }
            this.setState({ dob: birthDate, weeks: childweeks, userSubType });
            return {
              dob: birthDate,
              weeks: childweeks,
              userSubType,
              lineOne: lineOne ? lineOne : "",
              lineTwo: lineTwo ? lineTwo : "",
              country: country ? country : "",
              city: city ? city : "",
              state: state ? state : "",
              zipCode: zipCode ? zipCode : "",
              needClaimeOffer,
              isUserDO
            };
          }
          this.setState({ dob: "", weeks: "", userSubType });
          return {
            dob: "",
            weeks: "",
            userSubType,
            lineOne: lineOne ? lineOne : "",
            lineTwo: lineTwo ? lineTwo : "",
            country: country ? country : "",
            city: city ? city : "",
            state: state ? state : "",
            zipCode: zipCode ? zipCode : "",
            needClaimeOffer,
            isUserDO
          };
        }

        return {};
      },
      fail => {
        return true;
      }
    );
  };


  render() {
    const {
      isShowPass,
      fields,
      formName = "",
      formError = "",
      processing = false
    } = this.state;
    const {
      toggleLogin = () => null,
      data: { actionPath }
    } = this.props;
    const { eventCategory, eventType } = this.props.data;

    return (
      <div>
        <Formik
          initialValues={{  loginID: this.state.loginIDval, 
                            password: "", 
                            captchaValue:this.state.captchaValue, 
                            campaign: this.state.campaignVal,
                            qrcode: this.state.qrcode,
                            altPromoPage: this.state.setPromoCode,
                            product: "",
                            captchaType : ""
                        }}
          onSubmit={ async (values, actions) => {
            values.campaign = this.state.campaignVal;
            values.qrcode = this.state.qrcode;
            values.product = sessionStorage.getItem("productName") === 'TARGET_MICRO_WEBSITE' ? 'TARGET_MICRO_WEBSITE': "";
            values.captchaType = reCaptchaVType;
            values.captchaValue = await getCaptchaToken(this.props.data.enableRecaptcha, this.gSiteKey, "login");
            values.captchaAccountId = window.btoa(values.loginID);
            values.captchaAction = "login";
            if (!actions.isSubmitting) {
              return this.onSubmitValues(values)
                .then(result => {
                  this.setState({ upemailid: values.loginID });
                  const { errorCode, response, status } = result;
                  if (errorCode === 0 && status === true) {
                    window.sessionStorage.setItem('userLastLogin',response.accountInfo.lastLogin);
                    let ga_type = eventType + "_submit";
                    ABBOTT.gtm.buildAndPush.formTracking(
                      eventCategory,
                      "submit",
                      ga_type
                    );
                    this.getProfileInfo(response.accountInfo.UID).then(res => {
                      this.storeAccountInfo(response, res);
                      let prevURL = document.referrer;
                      let isPrevURL = prevURL.includes(
                        this.props.data.historyRedirectUrl
                      );
                      if (
                        this.props.data &&
                        this.props.data.redirectToPreviousPage &&
                        this.props.data.redirectToPreviousPage === "true"
                      ) {
                        window.history.go(-1);
                      } else if (
                        this.props.data &&
                        this.props.data.redirectOnSuccessURL &&
                        !window.sessionStorage.getItem("oasisEmail") &&
                        !this.state.campaignDO &&
                        !this.state.hasProduct &&
                        !this.state.campaignProfile
                      ) {
                        let userType = ABBOTT.utils.getCurrentUserType();
                        if (
                          (userType !== "similac-fullaccount" ||
                            userType !== "similac-ssm") &&
                          userType === "similac-ecom"
                        ) {
                          if (
                            window.localStorage.getItem("purchaser_type") ===
                            "subscription_user"
                          ) {
                            window.location = this.props.data.redirectOnSuccessURLSubscription;
                          } else if (isPrevURL) {
                            window.location = this.props.data.historyRedirectUrl;
                          } else {
                            window.location = this.props.data.redirectOnSuccessURL;
                          }
                        } else if (isPrevURL) {
                          window.location = this.props.data.historyRedirectUrl;
                        } else {
                          window.location = this.props.data.redirectOnSuccessURL;
                        }
                      } else if (this.state.campaignProfile) {
                        window.location = document.getElementById("profilepage").value;
                      } else if (
                        window.sessionStorage.getItem("oasisEmail") &&
                        res.needClaimeOffer === true
                      ) {
                        this.updateClaimOffers();
                      } else if (
                       window.sessionStorage.getItem("oasisEmail") &&
                        res.needClaimeOffer === false
                      ) {
                        window.location = this.state.offersPage;
                      } else if (this.state.campaignDO || sessionStorage.getItem('productName')=== "TARGET_MICRO_WEBSITE") {
                          this.updateUserProfile(res.isUserDO);
                       } else {
                        window.location.reload();
                      }
                      toggleLogin();
                    });
                  } else if (status === false) {
                    this.setState({captchaValue:''});
                    const { errorMessage = getMessageForReg("GEN_ERR") } =
                      getErrorMessage(result) || {};
                    this.setState({ formError: errorMessage });
                  } else if (
                    errorCode === 400 &&
                    response.i18nMessageKey === "PM-1004"
                  ) {
                    this.setState({captchaValue:''});
                    jQuery("#updatepassword-popup").modal("show");
                  } else {
                    this.setState({captchaValue:''});
                    let ga_type = eventType + "_incorrect-password-try-again";
                    ABBOTT.gtm.buildAndPush.formTracking(
                      eventCategory,
                      "failed",
                      ga_type
                    );
                    if (errorCode) {
                      if (errorCode === 400 &&
                        response.i18nMessageKey === "AUTH-1005") {
                        //gtm for invalid captcha
                        ABBOTT.gtm.buildAndPush.formTracking(
                          "sign-in",
                          "error",
                          "login_recaptcha-decline"
                        );
                      }
                      const { errorMessage = getMessageForReg(errorCode) } =
                        getErrorMessage(result) || {};
                      actions.setSubmitting(false);
                      this.setState({ processing: false });
                      this.setState({ formError: errorMessage });
                    } else {
                      const { errorMessage = getMessageForReg("GEN_ERR") } =
                        getErrorMessage(result) || {};
                      actions.setSubmitting(false);
                      this.setState({ processing: false });
                      this.setState({ formError: errorMessage });
                    }
                  }

                  return result;
                })
                .catch(([jqXHR = {}]) => {
                  let ga_type = eventType + "_incorrect-password-try-again";
                  ABBOTT.gtm.buildAndPush.formTracking(
                    eventCategory,
                    "failed",
                    ga_type
                  );

                  this.setState({ formError: getMessageForReg("GEN_ERR") });
                });
            }
          }}
        >
          {({ values, errors }) => {
            {
            }
            return (
              <Form className="similac-form" autocomplete="off">
                {fields.map(
                  ({ label, name, validations:newValidations, renderOn, ...field }, index) => {
                    const { fieldName = "", value = "" } = renderOn || {};
                    {
                    }
                    if (field.type === "textbox") {
                      return (
                        <Field
                          key={name + "textbox" + field.type + index}
                          label={label}
                          name={name}
                          type={
                            (field.type === "textbox" && "text") || field.type
                          }
                          maxLength={field.maxLength}
                          validate={this.makeValidations(
                            newValidations,
                            name,
                            field.type
                          )}
                          as={InputField}
                          autocomplete={field.autocomplete}
                        />
                      );
                    }
                    if (field.type === "password") {
                      return (
                        <Field
                          key={name + "textbox" + field.type + index}
                          label={label}
                          name={name}
                          isShowPass={isShowPass}
                          type={(() => (isShowPass ? "text" : "password"))()}
                          icon={
                            <SvgIcon
                              icon={isShowPass ? "show" : "hide"}
                              onClick={this.showToggle}
                            />
                          }
                          fieldId="showpasswordField"
                          iconClickable={true}
                          maxLength={field.maxLength}
                          validate={this.makeValidations(
                            newValidations,
                            name,
                            field.type
                          )}
                          as={InputField}
                          autocomplete={field.autocomplete}
                        />
                      );
                    } else if (field.type === "tel") {
                      return (
                        <Field
                          key={name + "tel" + field.type + index}
                          label={label}
                          name={name}
                          type={field.type}
                          maxLength={field.maxLength}
                          validate={this.makeValidations(
                            newValidations,
                            name,
                            field.type
                          )}
                          as={InputMasker}
                        />
                      );
                    } else if ( field.type === "captcha" && this.props.data.enableRecaptcha === "true") {
                      return (
                        <Field
                        name={name}
                        sitekey={field.sitekey}
                        as={Recaptcha}
                        size={field.size}
                        type={field.type}
                        fieldId={this.props.captchaId}  

                        />
                      );  
                    } else if (field.type === "htmltag") {
                      return (
                        <HtmlTag
                          key={label + field.tagName + index}
                          label={label}
                          className={field.btnClassName}
                          tagName={field.tagName}
                          help={
                            (field.help && <Help data={field.help} />) || null
                          }
                        />
                      );
                    } else if (field.type === "divider") {
                      return (
                        <Divider
                          key={label + index}
                          className={field.className}
                        >
                          {label}
                        </Divider>
                      );
                    } else if (field.type === "checkbox") {
                      return (
                        <Field
                          key={name + "checkbox" + label + index}
                          label={label}
                          name={name}
                          type={"checkbox"}
                          imagePath={field.imagePath}
                          fieldsType={field.fieldType}
                          validate={this.makeValidations(
                            newValidations,
                            name,
                            field.type
                          )}
                          as={Checkbox}
                        />
                      );
                    } else if (field.type === "calender") {
                      return (
                        <Field
                          key={"calander" + name + index}
                          label={label}
                          name={name}
                          validate={this.makeValidations(
                            newValidations,
                            name,
                            field.type
                          )}
                          as={CalendarSet}
                        />
                      );
                    } else if (field.type === "radio") {
                      return (
                        <Field
                          key={"radio" + name + index}
                          label={label}
                          name={name}
                          sourceValue={field.sourceValue}
                          fieldsType={field.fieldType}
                          validate={this.makeValidations(
                            newValidations,
                            name,
                            field.type
                          )}
                          as={Radio}
                        />
                      );
                    } else if (field.type === "radio-button") {
                      return (
                        <Field
                          key={"radio-button" + name + index}
                          label={label}
                          name={name}
                          sourceValue={field.sourceValue}
                          fieldsType={field.fieldType}
                          btnClassName={field.btnClassName}
                          validate={this.makeValidations(
                            newValidations,
                            name,
                            field.type
                          )}
                          as={RadioButton}
                        />
                      );
                    } else if (field.type === "dropdown") {
                      return (
                        <Field
                          key={"dropdown" + name + index}
                          label={label}
                          name={name}
                          placeholder={field.placeholder}
                          options={field.sourceValue}
                          validate={this.makeValidations(
                            newValidations,
                            name,
                            field.type
                          )}
                          fetchApi={field.fetchApi}
                          displayLabelFormat={field.displayLabelFormat}
                          valueFormat={field.valueFormat}
                          as={Dropdown}
                        />
                      );
                    } else if (field.type === "socialLogin") {
                      return (
                        <SocialLogin
                          key={"dropdown" + name + index}
                          name={name}
                          actionPath={actionPath}
                          onLoginSuccess={this.storeAccountInfo}
                          {...field}
                          getToken={getCaptchaToken}
                          utmCampaign = {this.state.campaignVal} 
                          altPromoCode = {this.state.setPromoCode}
                          enableRecaptcha = {this.props.data.enableRecaptcha}
                          reCaptchaType = {reCaptchaVType}
                        />
                      );
                    } else if (field.type === "googleApi") {
                      return (
                        <Field
                          key={"googleApi" + name + index}
                          label={label}
                          name={name}
                          placeholder={field.placeholder}
                          options={field.sourceValue}
                          validate={this.makeValidations(
                            newValidations,
                            name,
                            field.type,
                            values
                          )}
                          fetchApi={field.fetchApi}
                          as={GoogleAPI}
                        />
                      );
                    } else if (
                      field.type === "button" ||
                      field.type === "submit"
                    ) {
                      return (
                        <Button
                          key={field.type + index + name + index}
                          label={label}
                          className={field.btnClassName}
                          disabled={processing}
                          {...field}
                        />
                      );
                    } else if (
                      field.type === "link" ||
                      field.type === "linkButton"
                    ) {
                      return (
                        <LinkButton
                          key={field.type + index + name + index}
                          label={label}
                          className={field.btnClassName}
                          fieldId={field.id}
                          {...field}
                        />
                      );
                    } else if (field.type === "formError") {
                      return (
                        <FormError
                          key={field.type + index + name + index}
                          name={formName}
                          formError={formError}
                        />
                      );
                    } else if (field.type === "hidden") {
                      return (
                        <Field
                          key={name + "textbox" + field.type + index}
                          type={"text"}
                          style={{ display: "none" }}
                          name={name}
                          value={field.value}
                          as={"input"}
                        />
                      );
                    }
                  }
                )}
                <Focus
                  formName={formName}
                  fields={fields}
                  formError={formError}
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

export default LoginDialog;
