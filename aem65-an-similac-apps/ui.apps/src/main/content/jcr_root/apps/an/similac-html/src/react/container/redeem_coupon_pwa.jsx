import React from "react";
import moment from "moment";
import { makeCall, sendFormData, getMessageForReg } from "../common/api";
import Button from "../components/Button";
import OfferCard from "../components/OfferCardV2PWA";
import TargetCoupon from "../components/TargetCouponV2";
import { flattenObject } from "../common/apiToLocal";
import RedeemConfirmation from "../components/RedeemConfirmationPWA";
import Overlay from "../components/Markredeem";

export default class RedeemCouponPwa extends React.Component {
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
      redeem: this.aemData.currentOffers,
      selectedKey: null,
      assignedRetailer: null,
      selectretailerbtn: false,
      selectbtn: false,
      toggleRedeemPopup: false
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
  confirmCouponPopup = () => {
    this.state.toggleRedeemPopup = true;
    this.setState({...this.state});
    setTimeout(() => {
      $('#pwa-confirm-redeem').modal('show');
    }, 200);
  }
  confirmRedeemRedirect = () => {
    window.location.href = this?.aemData?.currentOffers?.retailerPageURL;
  }
  backToOffers = () => {
    $('#overlay').css('z-index', "2000");
    let couponCode = "";
    if (window.sessionStorage.getItem('couponCode') != null) {
      couponCode = window.sessionStorage.getItem('couponCode');
    }
    let formData = {
      category: "markRedeem",
      offerPreferenceInfo: {
        offerCode: couponCode
      }
    };

    let ajaxConfig = {
      headers: {
        "x-id-token": ABBOTT.utils.getSessionInfo()
      }
    };
    sendFormData(this.aemData.actionPath, formData, ajaxConfig).then(result => {

      const { errorCode, response, status } = result;
      if (errorCode === 0 && status === true) {
        window.location.href = this?.aemData?.currentOffers?.shippingLink;
      }

    })
      .catch(([jqXHR = {}]) => {
        if (result.errorCode === 500) {
          const dataValue = getMessageForReg("GEN_ERR");
          $("#template.global-error p").html(dataValue);
          $("#template").show();
          $("html, body").animate({ scrollTop: 0 }, "slow");
        } else {
          this.setState({ formError: getMessageForReg(result.errorCode) });
        }
      }
      );
  };
 

  render() {

    let pwaCardDetails = {};
    if (window.sessionStorage.getItem('ObjectCardData') != null) {
      pwaCardDetails = JSON.parse(window.sessionStorage.getItem('ObjectCardData'));
    }
    let retailerName=pwaCardDetails.OfferRetailer;
    
    if(retailerName != null && retailerName != "")
     retailerName =retailerName.toLowerCase();
    if(retailerName == "tpg" ) retailerName="multiple-in-store";   
    let dataGtmRedeemOffer=this?.aemData?.currentOffers?.dataGtmRedeemOffer;
    let dataGtmMarkRedeemed= this?.aemData?.currentOffers?.dataGtmMarkRedeemed;
    let dataGtmSelectMarkRedeemed=dataGtmMarkRedeemed;
    if(dataGtmRedeemOffer != null && dataGtmRedeemOffer != ""){
      dataGtmRedeemOffer=dataGtmRedeemOffer.replace("#selectretailer#",retailerName);
    }
    if(dataGtmMarkRedeemed != null && dataGtmMarkRedeemed != ""){
      dataGtmMarkRedeemed=dataGtmMarkRedeemed.replace("#selectretailer#",retailerName);
    }
    if(dataGtmSelectMarkRedeemed != null && dataGtmSelectMarkRedeemed != ""){
      dataGtmSelectMarkRedeemed=dataGtmSelectMarkRedeemed.replace("click","select");
      dataGtmSelectMarkRedeemed=dataGtmSelectMarkRedeemed.replace("#selectretailer#",retailerName);
    }
  

    return (
      <>
      { this.state.toggleRedeemPopup ? 
                <div className="modal fade" id="pwa-confirm-redeem" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                            <img className="close" data-dismiss="modal" aria-label="Close" src="/content/dam/an/similac/global/icons/retailer/pwa-retailerpopup-close.png" />
                        </div>
                        <div className="modal-body">
                            <p className="pwa-popup-body-text">{this?.aemData?.currentOffers?.markAsRedeemed?.redeemSelection}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" data-gtm={dataGtmSelectMarkRedeemed + "-no"} className="btn btn-secondary pwa-popup-no" data-dismiss="modal">{this?.aemData?.currentOffers?.markAsRedeemed?.cancelRedeemLabel}</button>
                            <button type="button" data-gtm={dataGtmSelectMarkRedeemed + "-yes"} onClick={() => this.backToOffers()} className="btn btn-primary pwa-popup-yes">{this?.aemData?.currentOffers?.markAsRedeemed?.submitRedeemLabel}</button>
                        </div>
                      </div>
                  </div>
                </div> : null
      }
        <div class="card-offer-wrap row">
          <div class="pwa-offer-container">
            <div class="pwa-offer-card-left col-9">
              <div>
                <h4 class="pwa-offer-card-heading"><span dangerouslySetInnerHTML={{ __html: pwaCardDetails.title ? pwaCardDetails.title : ""}}></span>
                  {pwaCardDetails.Offervalue && pwaCardDetails.OfferTypelabel && (" $" + pwaCardDetails.Offervalue)}{" "}
                   <span className='pwa-offer-card-earnPoints' dangerouslySetInnerHTML={{ __html: pwaCardDetails?.earnPointsText }}></span>
                </h4>
              </div>
              <div class="pwa-offer-card-para">
                <span dangerouslySetInnerHTML={{ __html: pwaCardDetails.offerPara }}></span>
                <span className="pwa-days">{pwaCardDetails.validDays >= 0 ? " " + pwaCardDetails.validDays : ""} {pwaCardDetails.moredaysLabel ? pwaCardDetails.moredaysLabel : ""}</span>
              </div>
            </div>
            <div class="pwa-offer-card-right">
              <img src={pwaCardDetails.offerImg} class="product-img w-100" alt=""/>
            </div>
          </div>
        </div>
        <div className="container text-center">          
          <button data-gtm={dataGtmRedeemOffer} onClick={() => this.confirmRedeemRedirect()} className={"pwa-select-retailer-btn pwa-select-retailer-btn-redeem"}>{this?.aemData?.currentOffers?.buttonLabelRedeem}</button>
        </div>
        <div className="pwa-retailer-ask pwa-retailer-ask-redeem">
          {this?.aemData?.currentOffers?.buttonLabelSelectRetailer}
        </div>
        <div className="container text-center">
          <button  data-gtm={dataGtmMarkRedeemed} onClick={() => this.confirmCouponPopup()}
           className={"pwa-retailer-coupon-btn"}>{this?.aemData?.currentOffers?.retailerAlreadySelected}</button>
        </div>
        <div className="row">
        <div className="pwa-retailer-bottom-text-redeem">
        {this?.aemData?.currentOffers?.digitalMessage}
        </div>
        </div>
        <div>
          <div className="do-footer-redeem" dangerouslySetInnerHTML={{ __html: this.aemData?.scanModule?.offerTabFootnote }}></div>
        </div>
      </>
    );
  };
}
