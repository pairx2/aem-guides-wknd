import "core-js/features/url";
import "core-js/features/url-search-params";
import * as React from "react";
import { Formik, Form, Field, useField } from "formik";
import moment from "moment";
import { SvgIcon } from "../../common/common";
import InputField from "../../components/InputField";
import validations from "../../common/validations";
import Checkbox from "../../components/Checkbox";
import Button from "../../components/Button";
import Focus from "../../components/ErrorMessage/focus";
import PwaFormError from "../../components/ErrorMessage/PwaFormError";
import SocialLogin from "../../components/SocialLogin";
import Divider from "../../components/Divider";
import HtmlTag from "../../components/HtmlTag";
import Recaptcha from "../../components/Recaptcha";
import {
  sendFormData,
  getErrorMessage,
  getMessageForReg
} from "../../common/api";
import { groupFieldsWithConfig } from "../../common/regFunctions";
import "../../../js/social-login";
import { makeCall } from "../../common/api";
import getCaptchaToken,{captchaTypeObj, reCaptchaVType} from "../../common/recaptcha";
class PwaLoginDialog extends React.Component {
  constructor(props) {
    super(props);
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
      campaignVal: "",
      setPromoCode: "",
      offersPage: props.data.redirectOnSuccessURLOasis 
                  ? props.data.redirectOnSuccessURLOasis
                  :"/app/account/offers.html",
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
      loyaltyScanBonusesEarnedState = "",
      loyaltyScansSinceLastRewardState = "",
      gpasScansTodayLimit = "",
      contactEmail,
      needClaimeOffer
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
        loyaltyScanBonusesEarnedState,
        loyaltyScansSinceLastRewardState,
        gpasScansTodayLimit,
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
            loyaltyScanBonusesEarnedState,
            loyaltyScansSinceLastRewardState,
            gpasScansTodayLimit,
            contactEmail
          }),
          cookieConfig
        );

        window.location = this.state.offersPage;
      } else {
        return;
      }
    }
    if (userType === "similac-ecom" && window.localStorage.getItem("purchaser_type") === "subscription_user" && this.props.data.formName === "checkoutLogin") {

      window.location = this.props.data.redirectOnSuccessURLSubscription;
    }
    else {
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

  componentDidMount() {
	this.gSiteKey = jQuery("#gSiteKey").length && jQuery("#gSiteKey").val();
    // Check if the user is in a PWA APP mode
    this.gSiteKey = jQuery("#gSiteKey").length && jQuery("#gSiteKey").val();
    const  isDownloadBanner = ABBOTT.cookie("isDownloadBanner");
    const isStandalonePWA = (window.navigator.standalone || (window.matchMedia('(display-mode: standalone)').matches));
    if (!isStandalonePWA && !isDownloadBanner) {
      var downloadBannerTitle = this.findValueFromJson(this.props.data.fields, 'download-banner-title');
      downloadBannerTitle = downloadBannerTitle?.value;

      var downloadBannerText = this.findValueFromJson(this.props.data.fields, 'download-banner-text');
      downloadBannerText = downloadBannerText?.value;

      var downloadBannerImage = this.findValueFromJson(this.props.data.fields, 'download-banner-image');
      downloadBannerImage = downloadBannerImage?.value;

      var downloadButtonText = this.findValueFromJson(this.props.data.fields, 'download-banner-btn-text');
      downloadButtonText = downloadButtonText?.value;

      var downloadBannerCloseIcon = this.findValueFromJson(this.props.data.fields, 'banner-close-icon');
      downloadBannerCloseIcon = downloadBannerCloseIcon?.value;

      if(typeof downloadBannerTitle != 'undefined' && typeof downloadBannerText != 'undefined' && typeof downloadBannerImage != 'undefined' && typeof downloadButtonText != 'undefined' && typeof downloadBannerCloseIcon != 'undefined')
      {
        const bannerString = `<div class="downloadPopup-banner">
        <div class="downloadPopup-logo"><img src="${downloadBannerImage}"></div>
        <div class="downloadPopup-container">
          <div class="downloadPopup-content">
            <p>${downloadBannerTitle}</p>
            <p>${downloadBannerText}</p>
          </div>
        </div>
        <div class="bannerAddBtn">
            <button class="btn btn-primary btnAdd type="BUTTON" id="bannerAdd" onclick="showDownloadPopupAddbutton()">${downloadButtonText}</button>
            </div>
        <div class="close-button-container">
        <img onclick="downloadPopupBannerClose()" src="${downloadBannerCloseIcon}">
        </div>
        </div>`;
        $('header').append(bannerString);
      }
    }    
    //Get gpasID querystring from URL and saving in the cookie code start
    let getQueryString = this.getUrlParameter("c");
    if (getQueryString) {
      ABBOTT.removeCookie("gpasID; path=/; domain=.similac.com");
      let cookieConfig = {
        path: "/",
        domain: "similac.com",
        secure:true,
        HttpOnly:true
      };
      ABBOTT.cookie(
        "gpasID",
        getQueryString,
        cookieConfig
      );
    }
    
    sessionStorage.clear();
    
    /** Get gpasID querystring from URL and saving in the cookie code ends */

    let checkInvalidGpasID = window.sessionStorage.getItem("invalidGpasID");//false
    if (this.checkLogin() && (checkInvalidGpasID != false)) {
      var lc = ABBOTT.cookie("profile");
      var lp = JSON.parse(lc);
      let userType = lp.userType;
      if (userType == 'similac-ssm') {
        let productpackUrl = this.findValueFromJson(this.props.data.fields, 'product-lookup');
        this.getGpasProductData(productpackUrl.value).then(res => {
          var checkInvalidGpasID = window.sessionStorage.getItem("invalidGpasID");
          if (checkInvalidGpasID != false) {
            this.getProfileInfo(lp.UID).then(res => {
              let chkValidgPasID = window.sessionStorage.getItem("validGpasID");
              if (chkValidgPasID) {
                this.redirectToValidScreenWithScan(res);
              } else {
                window.location = this.props.data.redirectOnSuccessURL;
              }
            }
            )
          }
        })
      }
      else{
        ABBOTT.removeCookie("profile; path=/; domain=.similac.com");
        ABBOTT.removeCookie("x-id-token; path=/; domain=.similac.com;");
      }
    }
    else {
      window.sessionStorage.removeItem("promoOfferSwitchDO");
      
      if (sessionStorage.getItem("pwaErrorMsg")) {
        const { errorMessage = getMessageForReg("GEN_ERR") } = {};
        this.setState({ formError: errorMessage });
        sessionStorage.removeItem('pwaErrorMsg');
      }

      $(".errorMessage").html("");
      //gtm   
      ABBOTT.gtm.buildAndPush.formTracking(
        "pwa-load",
        "load",
        "pwa_login-url"
      );
    }
  }

  /**
 * @method
 * @desc API call to get data for the gpas code
 * @param {string} URL value parameter
 */
  getGpasProductData = async (apiURL) => {
    let cparameter = this.getUrlParameter("c");
    if (cparameter != "") {
      var gpasIdCookie =  ABBOTT.cookie('gpasID');
      var request_body = {
        code: gpasIdCookie,
        userLanguage: navigator.language || navigator.userLanguage
      };

      let ajaxConfig = {
        url: apiURL,
        method: "POST",
        contentType: "application/json",
        headers: {
          "content-type": "application/json",
          "x-country-code": "US",
          "x-application-id": "ansimilacprdchk",
          "x-preferred-language": "en"
        },
        data: JSON.stringify(request_body),
      };
      await makeCall(ajaxConfig).then(
        results => {
          const { response, errorCode } = results;
          const { errMessage = getMessageForReg('GEN_ERR') } = getErrorMessage('GEN_ERR') || {};
          if (errorCode === 500 || errorCode === 504 || errorCode === 400) {
            $("#template.global-error p").html(errMessage);
            $("#template").show();
            window.sessionStorage.setItem("invalidGpasID", true);
            e.preventDefault();
          } else {
            const gpasResponse = response;
            var attr_names = [];
            var attr_prod = gpasResponse.attributes;
            // If API call successful but attribute array itself are missing
            if (!attr_prod && results.errorCode === 0) {
            } else if (attr_prod !== undefined && results.errorCode === 0) {
              for (let x in attr_prod) {
                if (attr_prod[x].name.indexOf('date') != '-1') {
                  attr_names.push([this.camelizeStr(attr_prod[x].name), this.formatDate(attr_prod[x].value)]);
                } else {
                  attr_names.push([this.camelizeStr(attr_prod[x].name), attr_prod[x].value]);
                }
              }
            }
            const apiResponseData = this.arrayToObj(attr_names);
            let formData = {
              "category": "gpas",
              "gpasActivityInfo": []
            };
            var gpasLocation = gpasResponse.location;
            if(Object.keys(gpasLocation).length === 0){
              gpasLocation = null;
            }
            
            const scanDate = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
            if(gpasResponse.code){
              window.sessionStorage.setItem("validGpasID", true);
            }
            const apiResponseOtherFields = { "code": gpasResponse.code, "location": gpasLocation, "authenticationAttempts": gpasResponse.authenticationAttempts, "productName": gpasResponse.product.name, "reason": gpasResponse.reason, "scanDate": scanDate};
            const mergedResponse = { ...apiResponseOtherFields, ...apiResponseData };
            formData.gpasActivityInfo.push(mergedResponse);
            const loginToken = this.checkLogin();
            let _config = {
              headers: {
                "x-id-token": loginToken
              }
            };
            return sendFormData(this.props.data.actionPathToUpdateProfile, formData, _config).then(success => {
              return success;
            });
          }
        },
        fail => {
          console.log(fail);
        }
      );
    }
    return {};
  }

  /**
   * @method 
   * @desc method for valid url to after scan
   * * @param {res} Response value parameter
   */
  redirectToValidScreenWithScan(res) {
    
    var loyaltyScanBonusesEarned = res.loyaltyScanBonusesEarnedState;
    var loyaltyScansSinceLastReward = res.loyaltyScansSinceLastRewardState;
    var gpasScansToday = res.gpasScansTodayLimit;

    var dailyScanLimit = this.findValueFromJson(this.props.data.fields, 'dailyScanLimit');
    dailyScanLimit = dailyScanLimit.value;

    var loyaltyScanLimit = this.findValueFromJson(this.props.data.fields, 'loyaltyScanLimit');
    loyaltyScanLimit = loyaltyScanLimit.value;

    var confirmationPage = this.findValueFromJson(this.props.data.fields, 'scan-confirmation');
    confirmationPage = confirmationPage.value;

    var scanLimitPage = this.findValueFromJson(this.props.data.fields, 'scan-limit');
    scanLimitPage = scanLimitPage.value;

    var bonusPage = this.findValueFromJson(this.props.data.fields, 'scan-bonus');
    bonusPage = bonusPage.value;

    var doubleBonusPage = this.findValueFromJson(this.props.data.fields, 'scan-double-bonus');
    doubleBonusPage = doubleBonusPage.value;

    if (gpasScansToday > dailyScanLimit) {
      window.location = scanLimitPage;
    } else if (loyaltyScansSinceLastReward > loyaltyScanLimit) {
      window.location = scanLimitPage;
    } else if (loyaltyScanBonusesEarned >= 2) {
      window.location = doubleBonusPage;
    } else if (loyaltyScansSinceLastReward == loyaltyScanLimit) {
      window.location = bonusPage;
    } else {
      window.location = confirmationPage;
    }
  }

  checkLogin() {
    return ABBOTT.cookie("x-id-token");
  }

  getUrlParameter = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  findValueFromJson = (data, key) => {
    return data.find(x => x.id == key);
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
    $("#overlay").css('display', 'block');
    return await makeCall(ajaxConfig).then(
      results => {
        const { response } = results;

        const { lineOne, lineTwo, country, city, state, zipCode } =
          results.response.addresses && results.response.addresses.length > 0
            ? results.response.addresses[0]
            : "";
        let needClaimeOffer = false;
        let loyaltyScanBonusesEarnedState = 0;
        let loyaltyScansSinceLastRewardState = 0;
        let activeChildNode = results.response?.children.findIndex(({ activeChild = true }) => activeChild);
        if (typeof activeChildNode !== undefined) {
          loyaltyScanBonusesEarnedState = results.response?.children[activeChildNode]?.loyaltyScanBonusesEarned;
          loyaltyScansSinceLastRewardState = results.response?.children[activeChildNode]?.loyaltyScansSinceLastReward;
        }
        let gpasScansTodayLimit = results.response.userInfo.gpasScansToday;
        if(!results.response.offerPreferenceInfo.hasOwnProperty('retailer')) {
          window.sessionStorage.setItem("nonDo",true);
        }

        if ("similac-ssm" !== results.response?.userInfo?.userType) {
          sessionStorage.setItem("userType", "ecom");
          ABBOTT.removeCookie("profile; path=/; domain=.similac.com");
          ABBOTT.removeCookie("x-id-token; path=/; domain=.similac.com;");
          return;
        } else if (
          window.sessionStorage.getItem("oasisEmail") &&
          results.response?.userInfo?.userType === "similac-ecom"
        ) {
          let cookieConfig = {
            path: "/",
            domain: "similac.com",
            secure:true,
            HttpOnly:true
          };
          var contactEmail = results.response?.userInfo?.contactEmail
            ? results.response?.userInfo?.contactEmail
            : "";
          ABBOTT.cookie(
            "profile",
            JSON.stringify({
              oasisEmail: window.sessionStorage.getItem("oasisEmail").trim(),
              contactEmail
            }),
            cookieConfig
          );
        }
        const {
          offerPreferenceInfo: { product = "", enableDigital = false } = {},
          children = []
        } = response;
        if (results.status) {
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
              loyaltyScanBonusesEarnedState: loyaltyScanBonusesEarnedState,
              loyaltyScansSinceLastRewardState: loyaltyScansSinceLastRewardState,
              gpasScansTodayLimit: gpasScansTodayLimit,
              needClaimeOffer
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
            loyaltyScanBonusesEarnedState: "",
            loyaltyScansSinceLastRewardState: "",
            needClaimeOffer
          };
        }
        
        return {};
        
      },
      fail => {
        console.log(fail);
        return true;
      }
    );
  };

  /** Camel casing to strings*/
  camelizeStr = (str) => {
    str = str.toLowerCase();
    str = str.split(' ').map(a => a.trim()).map(a => a[0].toUpperCase() + a.substring(1)).join("");
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  /**date formatting */
  formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  /**Convert Array to Object */
  arrayToObj = (arr) => {
    let obj = {};
    arr.forEach((v) => {
      let key = v[0];
      let value = v[1];
      obj[key] = value;
    });
    return obj;
  }

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
    const userTypeVal = sessionStorage.getItem("userType");

    //Show & Hide Banner pop up
    $(".pwa-close-popup").click((e) => {
      $("#downloadPwa-banner-chrome").modal("hide");
      $("#downloadPwa-banner-safari").modal("hide");
    });
  
    return (
      <div>
        <Formik
          initialValues={{ loginID: this.state.loginIDval, password: "", captchaValue: this.state.captchaValue, campaign: this.state.campaignVal, altPromoPage: this.state.setPromoCode }}
          onSubmit={async (values, actions) => {
            values.campaign = this.state.campaignVal;
            
            values.captchaType = reCaptchaVType;
            values.captchaValue = await getCaptchaToken(this.props.data.enableRecaptcha, this.gSiteKey, "pwa-login");
            values.captchaAccountId = window.btoa(values.loginID);
            values.captchaAction = "pwa-login";
            if (!actions.isSubmitting) {
              return this.onSubmitValues(values)
                .then(result => {
                  this.setState({ upemailid: values.loginID });
                  const { errorCode, response, status } = result;
                  if (errorCode === 0 && status === true) {
                    let ga_type = eventType + "_submit";
                    ABBOTT.gtm.buildAndPush.formTracking(
                      eventCategory,
                      "submit",
                      ga_type
                    );
                    if (response.accountInfo?.data?.userType == 'similac-ecom') {
                      const { errorMessage = getMessageForReg("GEN_ERR") } = getErrorMessage(result) || {};
                      this.setState({ formError: errorMessage });
                    }
                    else {
                      let urlProductPack = this.findValueFromJson(this.props.data.fields, 'product-lookup');
                      this.getGpasProductData(urlProductPack.value).then(res => {
                        var checkInvalidGpasID = window.sessionStorage.getItem("invalidGpasID");
                        if (checkInvalidGpasID != false) {
                          this.getProfileInfo(response.accountInfo.UID).then(res => {
                            this.storeAccountInfo(response, res);
                            let chkValidgPasID = window.sessionStorage.getItem("validGpasID");
                            if (chkValidgPasID) {
                              this.redirectToValidScreenWithScan(res);
                              window.stop;
                              return;
                            }
                            else{
                              
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
                              } 
                              else if (
                                this.props.data &&
                                this.props.data.redirectOnSuccessURL &&
                                !window.sessionStorage.getItem("oasisEmail") &&
                                !this.state.campaignDO
                              ) {
                                let userType = ABBOTT.utils.getCurrentUserType();
                                if (
                                  (userType !== "similac-fullaccount" ||
                                    userType !== "similac-ssm") &&
                                  userType === "similac-ecom"
                                ) {
                                  if (isPrevURL) {
                                    window.location = this.props.data.historyRedirectUrl;
                                  } else {
                                    window.location = this.props.data.redirectOnSuccessURL;
                                  }
                                } else if (isPrevURL) {
                                  window.location = this.props.data.historyRedirectUrl;
                                } else {
                                  window.location = this.props.data.redirectOnSuccessURL;
                                }
                              }
                              else {
                                window.location.reload();
                              }
                              toggleLogin();
                            }
                          })
                        }
                      })
                    }
                    
                  } else if (status === false) {
                    this.setState({ captchaValue: '' });
                    const { errorMessage = getMessageForReg("GEN_ERR") } =
                      getErrorMessage(result) || {};
                    this.setState({ formError: errorMessage });
                  } else if (
                    errorCode === 400 &&
                    response.i18nMessageKey === "PM-1004"
                  ) {
                    this.setState({ captchaValue: '' });
                  } else {
                    this.setState({ captchaValue: '' });
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
                          "pwa_login_recaptcha-decline"
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
            return (
              <Form className="similac-form" autocomplete="off">
                {fields.map(
                  ({ label, name, validations, renderOn, ...field }, index) => {
                    const { fieldName = "", value = "" } = renderOn || {};
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
                            validations,
                            name,
                            field.type
                          )}
                          as={InputField}
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
                              icon={isShowPass ? "show-gray" : "hide-gray"}
                              onClick={this.showToggle}
                            />
                          }
                          fieldId="showpasswordField"
                          iconClickable={true}
                          maxLength={field.maxLength}
                          validate={this.makeValidations(
                            validations,
                            name,
                            field.type
                          )}
                          as={InputField}
                        />
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
                            validations,
                            name,
                            field.type
                          )}
                          as={Checkbox}
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
                    } else if ( field.type === "captcha" && this.props.data.enableRecaptcha === "true") {
                      return (
                        <Field
                          name={name}
                          sitekey={field.sitekey}
                          as={Recaptcha}
                          size={field.size}
                          type={field.type}
                          fieldId={this.props.captchaId && this.props.captchaId}
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
                    } else if (field.type === "formError" && userTypeVal === "ecom") {
                      sessionStorage.removeItem("userType");
                      return (
                        <PwaFormError
                          key={field.type + index + name + index}
                          name={formName}
                          formError={userTypeVal}
                        />
                      );
                    } else if (field.type === "formError" && userTypeVal === null) {
                      return (
                        <PwaFormError
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

export default PwaLoginDialog;
