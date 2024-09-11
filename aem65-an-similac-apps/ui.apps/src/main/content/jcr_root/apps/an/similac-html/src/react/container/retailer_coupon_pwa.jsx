import React from "react";
import moment from "moment";
import { makeCall, sendFormData, getMessageForReg } from "../common/api";

import TPGWalmartCoupon from "../container/retailer-coupon/tpg_walmart";
import AmazonCoupon from "../container/retailer-coupon/amazon";
import TargetOfflineCoupon from "../container/retailer-coupon/target_offline";
import TargetOnlineCoupon from "../container/retailer-coupon/target_online";
export default class RetailerCouponPwa extends React.Component {
  constructor(props) {
    super(props);
    this.aemData = props.aemData;
    this.state = {
      retailer: "",
      profileInfo: {},
      retailerError: false,
      nonDOEligibleUser: false,
      offerCode: "",
      showPaper: true,
      retailerCoupon: this.aemData.currentOffers,
      selectedKey: null,
      assignedRetailer: null,
      selectretailerbtn: false,
      selectbtn: false,
      toggleRedeemPopup: false,
      expiringLaterOfferSorted: {}
    };
  }

    /**
   * Call on component load
   */

  componentDidMount() {
    if (ABBOTT.utils.isUserLoggedIn()) {
      this.getProfileInfo();
      setTimeout(() => {
        $("#overlay").css('display', 'none');
      }, 4000);
    }
  }

  /**
   *  Method to get user my profile  information from AWS
   */

  getProfileInfo = () => {
    let ajaxConfig = {
      url: this.aemData.actionPathGetProfile,
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-country-code": "US",
        "x-application-id": "similac",
        "x-preferred-language": "en-US",
        "x-id-token": ABBOTT.utils.getSessionInfo()
      }
    };

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

  pwaExitPopup = (redirectUrl) => {
    window.customwarnOnLeave(redirectUrl);
  }

  submitRedeem = (url, code) => {
    var tempInput = document.createElement("input");
    tempInput.value = code;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    let formData = {
      category: "redeemOffer",
      offerPreferenceInfo: {
        offerCode: code
      }
    };

    let ajaxConfig = {
      headers: {
        "x-id-token": ABBOTT.utils.getSessionInfo()
      }
    };

    sendFormData(this.aemData.actionPath, formData, ajaxConfig).then(
      success => {
        this.getProfileInfo();
        let deviceAgent = navigator.platform;
        let ios = deviceAgent.toLowerCase().match(/(mac|iphone|ipod|ipad)/);
        if (ios) {
          window.open(url, "_self");
        } else {
          window.open(url, "_blank");
        }
        return success;
      },
      fail => {

      }
    );
  };
  submitMarkRedeem = () => {
    this.state.isActiveCode = !this.state.isActiveCode;
    this.setState({ ...this.state });

  };
  isConfirmMarkRedeem = () => {
    this.setState({ isActiveCode: true })
  };

  confirmRedeemPopup = () => {
    this.state.toggleRedeemPopup = true;
    this.setState({ ...this.state });
    setTimeout(() => {
      $('#pwa-confirm-redeem').modal('show');
    }, 200);
  }

  copyToClip = (couponCodeCopy) => {
    var tempInput = document.createElement("input");
    tempInput.value = couponCodeCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  }

  render() {
    let pwaCardDetails = {};
    if (window.sessionStorage.getItem('ObjectCardData') != null) {
      pwaCardDetails = JSON.parse(window.sessionStorage.getItem('ObjectCardData'));
      pwaCardDetails.OfferRetailer = pwaCardDetails.OfferRetailer.toLowerCase();
    }
    
    let assignedRetailerDetails = {};
    if (window.sessionStorage.getItem('assignedRetailer') != null) {
      assignedRetailerDetails = JSON.parse(window.sessionStorage.getItem('assignedRetailer'));
      pwaCardDetails.OfferRetailer = assignedRetailerDetails.assignedOfferRetailer.toLowerCase();
      pwaCardDetails.OfferType = assignedRetailerDetails.assignedOfferType;
      if (assignedRetailerDetails.assignedOfferType === "TARGET_CC") {
        pwaCardDetails.OfferRetailer = 'target-online';
      } else if (assignedRetailerDetails.assignedOfferType === "TARGET_BC") {
        pwaCardDetails.OfferRetailer = 'target-in-store';
      }
	  if (assignedRetailerDetails.assignedOfferType === "TPGLINK") {
		  pwaCardDetails.offerImg = pwaCardDetails.tpgOfferImg;
	  }
      window.sessionStorage.setItem('ObjectCardData',JSON.stringify(pwaCardDetails));
      window.sessionStorage.setItem('couponCode',assignedRetailerDetails.assignedOfferCode);
      pwaCardDetails = JSON.parse(window.sessionStorage.getItem('ObjectCardData'));
    }

    if (window.sessionStorage.getItem('couponCode') != null) {
      couponCode = window.sessionStorage.getItem('couponCode');
    }

    const { currentOffers, retailer, barCodeGenerate, actionPath = {} } = this.aemData;

    return (
      <>
        {
        pwaCardDetails?.OfferRetailer === "tpg" && 
        <TPGWalmartCoupon currentOffers={currentOffers} pwaExitPopup={(url) => this.pwaExitPopup(url)} couponCode={couponCode} /> ||
          pwaCardDetails?.OfferRetailer === "amazon" && 
          <AmazonCoupon 
            currentOffers={currentOffers} 
            submitRedeem={this.submitRedeem}
            couponCode={couponCode}
            copyToClip={(code) => this.copyToClip(code)} 
            pwaExitPopup={(url) => this.pwaExitPopup(url)} /> ||
          pwaCardDetails?.OfferRetailer === "target-in-store" && 
          <TargetOfflineCoupon
            offerData={assignedRetailerDetails}
            offerLabel={currentOffers}
            retailerLabel={retailer}
            aemData={actionPath}
            barCode={barCodeGenerate}
            showMark={true}
            couponCode={couponCode}
          /> || pwaCardDetails?.OfferRetailer === "target-online" && 
          <TargetOnlineCoupon
            offerData={assignedRetailerDetails}
            offerLabel={currentOffers}
            retailerLabel={retailer}
            aemData={actionPath}
            barCode={barCodeGenerate}
            showMark={true}
            couponCode={couponCode}
            copyToClip={(code)=>this.copyToClip(code)}
            pwaExitPopup={(url) => this.pwaExitPopup(url)}
          />
           || null}
      </>
    );
  };
}
