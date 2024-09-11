import React from "react";
import moment from "moment";

const OfferCard = props => {
  let { offerData, offerLabel } = props;
  offerData.offerRetailer = offerData.assignedOfferRetailer ? offerData.assignedOfferRetailer : offerData.offerRetailer;
  offerData.offerExpiryDate = offerData.assignedOfferExpiryDate ? offerData.assignedOfferExpiryDate : offerData.offerExpiryDate;
  offerData.offerCode = offerData.assignedOfferCode ? offerData.assignedOfferCode : offerData.offerCode;
  offerData.offerValue = offerData.assignedOfferValue ? offerData.assignedOfferValue : offerData.offerValue;
  offerData.offerType = offerData.assignedOfferType ? offerData.assignedOfferType : offerData.offerType;

  // calculate offer validity
  let endDate = moment(offerData.offerExpiryDate);
  let currentDate = moment();
  let validDays = endDate.diff(currentDate, "days");

  // check amazon / tpg offers
  let isAmazon = offerData.offerRetailer.toLowerCase() === "amazon";
  let isUnassignedOffer = offerData.offerRetailer.toLowerCase() === "tbuniversal" && offerData.offerType.toLowerCase() === "universaldo";
  let isGGUnassignedOffer = offerData.offerRetailer.toLowerCase() === "tbuniversal" && offerData.offerType.toLowerCase() === "gguniversaldo";
  let isTpgBogoOffer = offerData.offerRetailer.toLowerCase() === "tpg" && offerData.offerType.toLowerCase() === "tpgbogo12do";
  let isTpg = offerData.offerRetailer.toLowerCase() === "tpg";
  let offerTypeLabel, offerImg;
  let offerTypeInner = [];
  offerLabel.tpgOffers.map(offerItem => {
    if (offerItem.offerType === offerData.offerType.toLowerCase()) {
      offerTypeInner = offerItem;
    }
  })

  if (isAmazon) {
    let amazonImg =
      offerData.offerValue === 5
        ? offerLabel.saveFiveImgUrl
        : offerLabel.saveTenImgUrl;
    offerImg = offerLabel.amazonOffer.imgSMUrl;
    offerTypeLabel = offerLabel.amazonOffer;
  }
  else if (isTpg) {
    offerImg = offerTypeInner.tpgOfferImage;
    offerTypeLabel = offerTypeInner;
  }
  else if (isUnassignedOffer) {
    offerImg = offerLabel.tpgImgUrl;
    offerTypeLabel = offerLabel.unassignedOffer;
  }
  else if (isGGUnassignedOffer) {
      offerImg = offerLabel.ggImgUrl;
      offerTypeLabel = offerLabel.unassignedOffer;
  }


  var storeCoupon = (url, code, ObjectCard) => {
    window.sessionStorage.removeItem('ObjectCardData');
    window.sessionStorage.setItem("couponCode", code);
    window.sessionStorage.setItem("ObjectCardData", JSON.stringify(ObjectCard));
    window.location = url;
  };
  const ObjectCard = {
    'title': offerTypeLabel.title,
    'Offervalue': offerData.offerValue,
    'OfferTypelabel': offerTypeLabel.showOfferValue,
    'offerPara': isTpgBogoOffer ? offerTypeInner.newOffer.subTitle : offerTypeLabel.subTitle,
    'validDays': validDays,
    'moredaysLabel': offerLabel.moreDaysLabel,
    'offerImg': offerImg,
    'OfferRetailer': offerData.offerRetailer,
    'OfferType': offerData.offerType,
    'tpgOfferImg': offerTypeInner.tpgOfferImage,
    'earnPointsText':  isTpgBogoOffer ? "" : offerLabel.earnPointsText
  }
  return (
    <>
      {(validDays >= 0) && (
        <>
          <div className="card-offer-wrap col-12 col-lg-4 ">
            <div className="pwa-offer-container">
              <div className="pwa-offer-card-left col-9">
                <div>
                  <h4 className="pwa-offer-card-heading">
                    <span dangerouslySetInnerHTML={{ __html: offerTypeLabel.title }}></span>
                    {offerData.offerValue && offerTypeLabel.showOfferValue && (" $" + offerData.offerValue + " ")}
                    {isTpgBogoOffer ? (
                        <>
                          <div className='pwa-offer-card-earnPoints-bogo' dangerouslySetInnerHTML={{ __html: offerLabel.earnPointsText }}></div>
                        </>
                      ) : (
                        <>
                          <span className='pwa-offer-card-earnPoints' dangerouslySetInnerHTML={{ __html: offerLabel.earnPointsText }}></span>
                        </>
                      )
                    }
                  </h4>
                </div>
                
                <div className="pwa-offer-card-para">
                {(isTpgBogoOffer) && (
                  <>
                     <span className="bogo-subTitle" dangerouslySetInnerHTML={{ __html: offerTypeInner.newOffer.subTitle }}></span>
                  </>
                )}
                  <span
                    dangerouslySetInnerHTML={{ __html: offerTypeLabel.subTitle }}
                  ></span>{" "}<span className="pwa-days">{validDays}{" "}{offerLabel.moreDaysLabel}</span>
                </div>

                {(isUnassignedOffer || isGGUnassignedOffer) && (
                  <>
                    <div className="pwa-offer-card-link">
                      <a
                        data-gtm={offerLabel.dataGtmLabel}
                        onClick={() => storeCoupon(offerLabel.retailerPageURL, offerData.offerCode, ObjectCard)}
                      >
                        {offerLabel.buttonLabelSelectRetailer}
                      </a>
                    </div>
                  </>
                )}
                {/* "amazon/TPG" */}
                {(!isUnassignedOffer && !isGGUnassignedOffer && !isTpgBogoOffer) && (
                  <>
                    <div className="pwa-offer-card-link">
                      <a
                        data-gtm={offerLabel.dataGtmRedeemOffer}
                        onClick={() => storeCoupon(offerLabel.shippingLink, offerData.offerCode, ObjectCard)}
                      >
                        {offerLabel.buttonLabelRedeem}
                      </a>

                    </div>
                  </>
                )}
                {(isTpgBogoOffer) && (
                  <>
                    <div className="pwa-offer-card-link">
                      <a
                        data-gtm={offerLabel.dataGtmRedeemOffer}
                        onClick={() => storeCoupon(offerLabel.retailerCouponPageURL, offerData.offerCode, ObjectCard)}
                      >
                        {offerTypeInner.newOffer.buttonLabel}
                      </a>

                    </div>
                  </>
                )}
              </div>
              {(isUnassignedOffer || isGGUnassignedOffer) && (
                <>
                  <div className="pwa-offer-card-right" >
                    <img src={offerImg} className="product-img w-100" alt=""/>
                  </div>
                </>
              )}
              {(!isUnassignedOffer && !isGGUnassignedOffer) && (
                <>
                  <div className="pwa-offer-card-right" >
                    <img src={offerImg} className="product-img w-100" alt=""/>
                  </div>
                </>
              )}

            </div>
          </div>
        </>)}
    </>
  );
};

export default OfferCard;