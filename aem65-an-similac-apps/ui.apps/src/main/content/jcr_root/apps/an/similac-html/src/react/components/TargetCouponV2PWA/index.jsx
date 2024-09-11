import React, { useState } from "react";
import moment from "moment";
import { makeCall } from "../../common/api";


const TargetCoupon = props => {
  const [showPromocode, setPromocode] = useState(false);
  const [showBarcode, setBarcode] = useState(false);
  const [barCodeURL, setbarCodeURL] = useState("");
  const [offerMode, setOfferMode] = useState("");
  const [couponCode, setCouponCode] = useState("");
  

  let { offerData, offerLabel, retailerLabel, aemData, barCode } = props;

  offerData.offerRetailer = offerData.assignedOfferRetailer ? offerData.assignedOfferRetailer : offerData.offerRetailer;
  offerData.offerExpiryDate = offerData.assignedOfferExpiryDate ? offerData.assignedOfferExpiryDate : offerData.offerExpiryDate;
  offerData.offerCode = offerData.assignedOfferCode ? offerData.assignedOfferCode : offerData.offerCode;
  offerData.offerValue = offerData.assignedOfferValue ? offerData.assignedOfferValue : offerData.offerValue;
  offerData.offerType = offerData.assignedOfferType ? offerData.assignedOfferType : offerData.offerType;

  // Calculate offer validity
  let endDate = moment(offerData.offerExpiryDate);
  let currentDate = moment();
  let validDays = endDate.diff(currentDate, "days");
  let cardLabel;
  let imgURL;
  let online, store;

  let newOfferTarget;

  // Check for new offer
  cardLabel = offerLabel.newOfferTarget;
  newOfferTarget = true;

  //Set retailer name 
  var offerRetailerName = offerData.offerRetailer;
  var offerRetailerType = offerData.offerType;

  if (offerData.offerType) {

    if (offerData.offerType.toLowerCase() === "target_cc") {
      online = true;
      offerRetailerName = 'target-online';
    }
    else if (offerData.offerType.toLowerCase() === "target_bc") {
      store = true;
      offerRetailerName = 'target-in-store';
    }
  }

  const openCoupon = (url) => {
    let deviceAgent = navigator.platform;
    let ios = deviceAgent.toLowerCase().match(/(mac|iphone|ipod|ipad)/);
    if (ios) {
      window.open(url, '_self');
    } else {
      window.open(url, '_blank');
    }
  }
  const copyToClip = (couponCode) => {
    var tempInput = document.createElement("input");
    tempInput.value = couponCode;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  }
  const updateOpenedCard = (url, code, redemptiontype) => {
    let formData = {
      "category": "redeemOffer",
      "offerPreferenceInfo": {
        "offerCode": code
      }
    };
    let formDataBarCode = {
      "offerCode": code,
      "type": "bar"
    };

    let ajaxConfig = {
      "url": aemData,
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "x-country-code": "US",
        "x-application-id": "similac",
        "x-preferred-language": "en-US",
        "x-id-token": ABBOTT.utils.getSessionInfo()
      },
      "data": JSON.stringify(formData)
    }

    let ajaxConfigBarCode = {
      "url": barCode,
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "x-country-code": "US",
        "x-application-id": "similac",
        "x-preferred-language": "en-US",
        "x-id-token": ABBOTT.utils.getSessionInfo()
      },
      "data": JSON.stringify(formDataBarCode)
    }


    makeCall(ajaxConfig).then(success => {
      if (redemptiontype === "online") {
        copyToClip(code);
        setCouponCode(code);
        setOfferMode(cardLabel.offerCriteriaOnline);
        setPromocode(true);
      } else if (redemptiontype === "store") {
        makeCall(ajaxConfigBarCode).then(result => {
          imgURL = "data:image/jpg;base64," + result.response;
          setbarCodeURL(imgURL);
          setCouponCode(code);
          setOfferMode(cardLabel.offerCriteriaStore);
          setBarcode(true);

        }, (fail) => {
          console.log(fail);
        })
      }
    }, (fail) => {
      console.log(fail);
    })
  };


  const storeCoupon = (url, code, ObjectCard) => {
    window.sessionStorage.removeItem('ObjectCardData');
    window.sessionStorage.setItem("couponCode", code);
    window.sessionStorage.setItem("ObjectCardData", JSON.stringify(ObjectCard));
    window.location = url;
  };

  const ObjectCard = {
    'title': cardLabel.title,
    'Offervalue': offerData.offerValue,
    'OfferTypelabel': cardLabel.showOfferValue,
    'offerPara': cardLabel.subTitle1,
    'validDays': validDays,
    'moredaysLabel': offerLabel.moreDaysLabel,
    'offerImg': offerLabel.targetImgUrl,
    'OfferRetailer': offerRetailerName,
    'OfferType': offerRetailerType,
    'earnPointsText': offerLabel.earnPointsText
  }

  return (
    <>
      {(validDays >= 0)  && (
        <>
          <div className="card-offer-wrap col-12 col-lg-4 ">
            <div className="pwa-offer-container">
              <div className="pwa-offer-card-left col-9">
                <div>
                  <h4 className="pwa-offer-card-heading">
                    <span dangerouslySetInnerHTML={{ __html: cardLabel.title }}></span>
                    {" "} {(" $" + offerData.offerValue)} {" "}
                   <span className='pwa-offer-card-earnPoints' dangerouslySetInnerHTML={{ __html: offerLabel?.earnPointsText }}></span>
                  </h4>
                </div>
                <div className="pwa-offer-card-para">
                  <span
                    dangerouslySetInnerHTML={{ __html: cardLabel.subTitle1 }}
                  ></span>{" "}<span className="pwa-days">{validDays}{" "}{offerLabel.moreDaysLabel}</span>
                </div>
                {(!showPromocode && !showBarcode) && (
                  <div className="pwa-offer-card-link">
                    {online && (
                      <a
                        data-gtm={offerLabel.dataGtmRedeemOffer}
                        onClick={() => storeCoupon(
                          offerLabel.shippingLink,
                          offerData.offerCode,
                          ObjectCard)
                        }
                      >
                        {offerLabel.buttonLabelRedeem}
                      </a>)}
                    {store && (
                      <a
                        data-gtm={offerLabel.dataGtmRedeemOffer}
                        onClick={
                          () => storeCoupon(
                            offerLabel.shippingLink,
                            offerData.offerCode, 
                            ObjectCard
                          )
                        }
                      >
                        {offerLabel.buttonLabelRedeem}
                      </a>
                    )}

                  </div>
                )}

              </div>
              <div className="pwa-offer-card-right" >
                <img src={offerLabel.targetImgUrl} className="product-img w-75" style={{ paddingLeft: '10' }} alt="" />
              </div>
            </div>
          </div>
        </>)}
    </>
  );
};

export default TargetCoupon;



const updateOfferMode = (offerText, offerMode) => {
  let offerModeUpdated = offerText.replace("<sup>$</sup>X", "<sup>$</sup>" + offerMode)
  return offerModeUpdated;
}

const updateOfferValue$ = (offerText, offerValue) => {
  let offerValueUpdated = offerText.replace("$X", "$" + offerValue)
  return offerValueUpdated;
}
const updateOfferValue$XX = (offerText, offerValue) => {
  let offerValueUpdated = offerText.replace("$XX", "$" + offerValue)
  return offerValueUpdated;
} 