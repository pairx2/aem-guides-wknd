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
  // check amazon/ tpg offers
  let isAmazon = offerData.offerRetailer.toLowerCase() === "amazon";
  let isUnassignedOffer = offerData.offerRetailer.toLowerCase() === "tbuniversal" && offerData.offerType.toLowerCase() === "universaldo";
  let isGGUnassignedOffer = offerData.offerRetailer.toLowerCase() === "tbuniversal" && offerData.offerType.toLowerCase() === "gguniversaldo";
  let isTpgBogoOffer = offerData.offerRetailer.toLowerCase() === "tpg" && offerData.offerType.toLowerCase() === "tpgbogo12do";
    
  let isTpg = offerData.offerRetailer.toLowerCase() === "tpg";
   let offerTypeLabel,offerImg;
   let offerTypeInner = [];
   offerLabel.tpgOffers.map(offerItem => {
     if(offerItem.offerType===offerData.offerType.toLowerCase()){
      offerTypeInner=offerItem;
     }
   })

   if(isAmazon){
    let amazonImg =
    offerData.offerValue === 5
      ? offerLabel.saveFiveImgUrl
      : offerLabel.saveTenImgUrl;
       offerImg=amazonImg;
       offerTypeLabel=offerLabel.amazonOffer;
   }
   else if(isTpg){
       offerImg = offerTypeInner.tpgOfferImage;
       offerTypeLabel = offerTypeInner;
   }
   else if(isUnassignedOffer) {
      offerImg = offerLabel.tpgImgUrl;
      offerTypeLabel = offerLabel.unassignedOffer;
   }
   else if (isGGUnassignedOffer) {
      offerImg = offerLabel.ggImgUrl;
      offerTypeLabel = offerLabel.unassignedOffer;
  }

    const storeCoupon = (url, code) => {
   
         window.sessionStorage.setItem("couponCode", code);
         window.location = url;
       
  };
  return (
    <div className="card-offer-wrap col-12 col-md-6 col-lg-4 mb-4">
      <div className="card card-offer text-center px-2 h-100 bg-alice-blue">
        <div className="card-body">
          <div className="mb-0_5">
            {isTpgBogoOffer ? (
              <>
                <h4 className="font-brandon-bold font-title-bogo-offer text-smalt">
                  <span dangerouslySetInnerHTML={{ __html: offerTypeLabel.title }}></span>
                  
                </h4>
                <p className="font-brandon-bold font-text-offer-bogo text-smalt">
              <span dangerouslySetInnerHTML={{ __html: offerTypeLabel.subTitle }}
              ></span><br /><span className='card-offer-earnPoints-bogo' dangerouslySetInnerHTML={{ __html: offerLabel?.earnPointsText }}></span>
            </p>
              </>
            ) : (
              <>
                <h4 className="font-brandon-bold font-title-offer text-smalt">
                  <span dangerouslySetInnerHTML={{ __html: offerTypeLabel.title }}></span>
                  {offerData.offerValue && offerTypeLabel.showOfferValue && (" $" + offerData.offerValue)}
                  <br /><span className='card-offer-earnPoints' dangerouslySetInnerHTML={{ __html: offerLabel?.earnPointsText }}></span>
                </h4>
                <p className="font-brandon-bold font-text-offer text-smalt">
              <span
                dangerouslySetInnerHTML={{ __html: offerTypeLabel.subTitle }}
              ></span>
            </p>
              </>
            )
            }

            
            <img src={offerImg} className="product-img w-100" />
            {(isUnassignedOffer || isGGUnassignedOffer) && (
              <>
                <a
                  className="btn btn-primary col-12  my-0_938"
                  data-gtm={offerTypeLabel.dataGtmLabel}
                  onClick={() => storeCoupon(offerLabel.retailerPageURL, offerData.offerCode)}
                >
                  {offerLabel.buttonLabelSelectRetailer}
                </a>
              </>
            )}

            {isAmazon &&
              <p className="font-brandon-bold text-tangerine font-code-offer">
                {offerData.offerCode}
              </p>
            }
            {(!isUnassignedOffer && !isGGUnassignedOffer) && (
              <>
                <a
                  className="btn btn-primary col-12  my-0_938"
                  data-gtm={offerLabel.dataGtmRedeemOffer}
                  onClick={() => props.submitRedeem(isAmazon ? offerLabel.amazonOffer.pageUrl : "https://" + offerData.offerCode, offerData.offerCode)}
                >
                  {offerLabel.buttonLabelRedeem}
                </a>
                {props.showMark && (
                  <a
                    className="btn btn-secondary col-12  my-0_938"
                    data-gtm={offerLabel.dataGtmMarkRedeemed}
                    onClick={() => props.submitMarkRedeem(isAmazon ? offerLabel.amazonOffer.pageUrl : "https://" + offerData.offerCode, offerData.offerCode)}
                  >
                    {offerLabel.buttonLabelMarkRedeem}
                  </a>
                )}
              </>
            )}
            <img
              src={
                isAmazon
                  ? offerLabel.amazonOffer.imgSMUrl
                  : isTpg
                    ? offerTypeInner.imgSMUrl
                    : ""
              }
              className="retailer-img"
            />
            {(isUnassignedOffer || isGGUnassignedOffer) && (
              <>
                <p className="footnote font-roboto-reg mb-2_938 text-smalt">
                  {" "}
                  <span dangerouslySetInnerHTML={{ __html: offerLabel.selectRetailerNote }}></span>
                </p>
              </>
            )}
          </div>
          
          {isTpgBogoOffer ? (
            <>
              <div className="footnote font-roboto-reg text-smalt">
                <p><span dangerouslySetInnerHTML={{ __html: offerTypeInner.offerDisclaimer }}></span></p><br />
                <p>
                  <span dangerouslySetInnerHTML={{ __html: offerLabel.offerAvailableLabel }}></span> {validDays}{" "}
                  <span dangerouslySetInnerHTML={{ __html: offerLabel.moreDaysLabelBogo }}></span>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="footnote font-roboto-reg text-smalt position-bottom">
                <p>
                  <span dangerouslySetInnerHTML={{ __html: offerLabel.offerAvailableLabel }}></span> {validDays}{" "}
                  <span dangerouslySetInnerHTML={{ __html: offerLabel.moreDaysLabel }}></span>
                </p>
                {isTpg && !isTpgBogoOffer && (
                  <p class="offer_disclaimer"><span dangerouslySetInnerHTML={{ __html: offerTypeInner.offerDisclaimer }}></span></p>
                )}
                {offerData.isHcpOffer && isUnassignedOffer && (
                  <p><span dangerouslySetInnerHTML={{ __html: offerLabel.hcpInfo.offerText }}></span></p>
                )}
              </div>
            </>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default OfferCard;