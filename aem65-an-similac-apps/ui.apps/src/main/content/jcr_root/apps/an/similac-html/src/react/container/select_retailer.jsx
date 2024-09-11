import React from "react";
import moment from 'moment';
import { makeCall, sendFormData, getErrorMessage } from "../common/api";

import { flattenObject } from "../common/apiToLocal";

export default class SelectRetailer extends React.Component {
  constructor(props) {
    super(props);
    this.aemData = props.aemData;
    this.state = {
      retailer: "",
      profileInfo: {},
      retailerError: false,
      nonDOEligibleUser:false,
      offerCode: "",
      showPaper: true
    };
    this.checkLogin = this.checkLogin.bind(this);
  }

  checkLocalData = formName => {
    return window.sessionStorage.getItem(formName);
  };

  updateSession = (value, formName, retailer, response) => {

    let localData___API = this.checkLocalData(formName + "___API");
    let localDataParsedApi = "";
    let feed = "";
    if (localData___API) {
      localDataParsedApi = JSON.parse(localData___API);
      feed = {
        categoryType: "offerPreferenceInfo",
        name: "retailer",
        value: value
      };
      localDataParsedApi.push(feed);
      window.sessionStorage.setItem(
        formName + "___API",
        JSON.stringify(localDataParsedApi)
      );
    } else if (!localData___API && retailer === "retailerOnline") {
      feed = {
        offerPreferenceInfo: {
          retailer: value,
          enableDigital: true,
          channel: "email"
        },
        category: "digitalOffer"
      };
      localDataParsedApi = feed;
      window.sessionStorage.setItem(
        "Sign In Form___API",
        JSON.stringify(localDataParsedApi)
      );
    } else if (!localData___API && retailer === "retailerOffline") {
      const fieldDataApi = flattenObject(response);
      window.sessionStorage.setItem(
        formName + "___API",
        JSON.stringify(fieldDataApi)
      );
      localData___API = this.checkLocalData(formName + "___API");
      localDataParsedApi = JSON.parse(localData___API);
      feed = {
        categoryType: "offerPreferenceInfo",
        name: "retailer",
        value: value
      };
      localDataParsedApi.push(feed);
      window.sessionStorage.setItem(
        formName + "___API",
        JSON.stringify(localDataParsedApi)
      );
    }
  };

  getProfileID = () => {
    const URL = "?" + window.location.href.split("?")[1];
    const urlParams = new URLSearchParams(URL);
    let memberId = urlParams.get("memberId") || urlParams.get("Id") || urlParams.get("id");
    if(memberId){
		let buffer = new Buffer(memberId, 'base64')
		buffer = buffer.toString();
		const memId=(buffer.split("|"));
		return memId[0];
   }else{
    return memberId;
   }
  };

  checkLogin() {
    return ABBOTT.cookie("x-id-token");
  }

  /**
   * Call on component load
   */
  componentDidMount() {
    if (ABBOTT.utils.isUserLoggedIn()) {

    this.getProfileInfo();
    }
  }

  /**
     *  Method to get user my profile  information from AWS
     */
  getProfileInfo = () => {
    let ajaxConfig = {
      "url": this.aemData.actionPathGetProfile,
      "method": "GET",
      "headers": {
        "content-type": "application/json",
        "x-country-code": "US",
        "x-application-id": "similac",
        "x-preferred-language": "en-US",
        "x-id-token": ABBOTT.utils.getSessionInfo()
      }
    }

    makeCall(ajaxConfig).then(results => {
    if (results.status) {
      this.setState({
        profileInfo: results.response,
        offerCode: results.response.offerPreferenceInfo.offerCode,
        showPaper: !results.response.offerPreferenceInfo.enableDigital
      });
    }
    });
  };
  /**
   * Method on selecting retailer
   * @param {string} value
   */
  selectRetailer = value => {
      const { profileInfo, offerCode } = this.state;
      let actionPath = this.aemData.actionPath;

      let formData = {
        offerPreferenceInfo: {
          retailer: value,
          enableDigital: true,
          channel: "email"
        },
        category: "digitalOffer"
      };

      if (offerCode && offerCode !== "") {
        formData.offerPreferenceInfo.offerCode = offerCode;
      }
      const loginToken = this.checkLogin();
      const localSavedDate = this.aemData.registrationFormName;
      const redirectToRegistration = this.aemData.registerPageUrl;
      const actionPathLookupUser = this.aemData.actionPathLookupUser;
      let memberId = this.getProfileID();

      if (!loginToken) {
        if (window.sessionStorage.getItem(localSavedDate + "___API") && !memberId) {
          this.updateSession(value, localSavedDate);
          window.location.href = redirectToRegistration;
        } else if (!window.sessionStorage.getItem(localSavedDate + "___API")) {
          if (!memberId) {
            this.updateSession(value, localSavedDate, "retailerOnline");
            window.location.href = redirectToRegistration;
          } else {
            let ajaxConfigOnLoad = {
              url: actionPathLookupUser,
              data: JSON.stringify({ memberId })
            };

            makeCall(ajaxConfigOnLoad).then(results => {
              const { response } = results;
          
              const userPersonalInfo = { "memberId": memberId, "lastName": response.userInfo.lastName, "zipCode": response.addresses.zipCode, "targetSystem": "anie" }
              window.sessionStorage.setItem(localSavedDate, JSON.stringify(userPersonalInfo));
              this.updateSession(
                value,
                localSavedDate,
                "retailerOffline",
                response
              );
              window.location.href = redirectToRegistration;
            });
          }
        }
      } else {
       
        let _config = {
          headers: {
            "x-id-token": loginToken
          }
        };
        sendFormData(actionPath, formData, _config).then(success => {
          const { errorCode, status, response } = success;
          if(errorCode === 400 && status === true && response.i18nMessageKey === "UP-1003"){
            this.setState({ nonDOEligibleUser: true});
          }
          else if((errorCode === 400 && status === true && response.i18nMessageKey === "UP-1002") || errorCode === 500){
            this.setState({retailerError: true});
          }
          else{
            let offerParam =
              offerCode && offerCode !== "" ? "" : "#thanksDigital";
            window.location.href = this.aemData.myOfferPageUrl + offerParam;
          
          }
        },
          fail =>{ console.log(fail); 

          }
        );

      }
  };

  /**
   * Method to select paper offer
   */
  submitPaperOffer = () => {
    ABBOTT.gtm.buildAndPush.formTracking('retailer-connect', 'click', 'digital-offers_stay-paper-check');
    if (ABBOTT.utils.isUserLoggedIn()) {
    let formData = {
      offerPreferenceInfo: {
        enableDigital: false
      },
      category: "paperOffer"
    };

    let ajaxConfig = {
      "url": this.aemData.actionPath,
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "x-country-code": "US",
        "x-application-id": "similac",
        "x-preferred-language": "en-US",
        "x-id-token": ABBOTT.utils.getSessionInfo()
      }
    }

    makeCall(ajaxConfig).then(success => {
        window.location.href = this.aemData.myOfferPageUrl + "#thanksPaper";
        return success;
      },
        fail => { console.log(fail); 
          }
    );
    } else {
      window.location.href = this.aemData.loginPageUrl;
    }
  };

  render() {
    const aemData = this.aemData;
    const { retailer } = this.aemData;
    const { retailerError, showPaper, nonDOEligibleUser } = this.state;

    return (
      <>
        {aemData && (
          <>
            <p className="font-brandon-bold text-smalt">{retailer.title}</p>
            <div className="row">
              {Object.keys(retailer.retailersList).map(key => (
                <div className="col-12 col-md-6 mb-2_813 retailer-select-card">
                  <div className="row bg-alice-blue py-1_875 mx-0 h-100">
                    <div className="col-6 col-md-5 col-lg-4">
                      <img
                        src={retailer.retailersList[key].imgUrl}
                        className="w-100"
                      />
                    </div>
                    <div className="col-6 col-md-7 col-lg-7 pl-0 py-1">
                      <p className="font-roboto-bold text-smalt mb-1_25">
                        {retailer.retailersList[key].label}
                      </p>
                      <a
                        className="font-brandon-bold text-tangerine select-retailer"
                        data-gtm ={retailer.retailersList[key].dataGtmLabel}
                        onClick={() =>
                          this.selectRetailer(retailer.retailersList[key].value)
                        }
                      >
                        {retailer.selectRetailerLabel}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {retailerError && <p className="font-roboto-reg text-error">
              {retailer.error}</p>
            }
            {nonDOEligibleUser && <p className="font-roboto-reg text-error">
            {this.aemData.errorUpdateProfileNonDOUser}</p>
            }
              
           {showPaper && <a
              className="font-roboto-reg text-tangerine d-flex mb-2_813 select-paper"
              onClick={this.submitPaperOffer}
            >
              {retailer.deSelectRetailerLabel}
            </a>}
          </>
        )}
      </>
    );
  }
}
