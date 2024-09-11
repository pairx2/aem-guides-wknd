import React, { Component } from 'react';

export default function TPGWalmartCoupon({ currentOffers, pwaExitPopup, couponCode }) {
  let pwaCardDetails = {};
  //Analytic
  let redeemed = currentOffers?.dataGtmMarkRedeemed;
  if (redeemed != null && redeemed != "") {
    redeemed = redeemed.replaceAll("#id#", "multiple-in-store");
    redeemed = redeemed.replaceAll("#label#", "redeem-now");
  }
  if (window.sessionStorage.getItem('ObjectCardData') != null) {
    pwaCardDetails = JSON.parse(window.sessionStorage.getItem('ObjectCardData'));
  }

  var offerType = pwaCardDetails.OfferType.toLowerCase();
  var titlePara;
  let topImage, bottomImage;
  let bogoTitle;
  let bogoSubTitle;
  let offerIndex = currentOffers.tpgOffers.map(function(e) { return e.offerType; }).indexOf(offerType);
  let offerTypes = ['tpgmomcare', 'tpgpampers', 'tpgpampersclub', 'tpgpmoms', 'tpgbogo12do'];
  if (offerTypes.includes(offerType)) {
    titlePara = pwaCardDetails.offerPara;
    var lastIndex = titlePara.lastIndexOf(" ");
    titlePara = titlePara.substring(0, lastIndex);
    topImage = pwaCardDetails.offerImg;
    bottomImage = currentOffers?.tpgOffers[offerIndex]?.imgSMUrl;
  } else {
    titlePara = currentOffers?.tpgOffers[offerIndex]?.redeemedOffer?.title;
    topImage = currentOffers?.tpgOffers[offerIndex]?.tpgOfferImage;
    bottomImage = pwaCardDetails.offerImg;
  }

  if(offerType === 'tpgbogo12do'){
    bogoTitle = currentOffers?.tpgOffers[offerIndex]?.newOffer?.title;
    bogoSubTitle = currentOffers?.tpgOffers[offerIndex]?.newOffer?.subTitle;
  }
  

  return (
    <>
      <div className="pwa-retailer-bottom-text pwaRetailerTopText mb-4">
        {currentOffers?.tpgOffers[offerIndex]?.title}
      </div>
      <div className="container">
        <a
          data-gtm={redeemed}
          onClick={() => pwaExitPopup("https://"+couponCode)}
          className="btn btn-primary col-12 pwaExternalLink mt-4">{currentOffers?.buttonLabelRedeem}
        </a>
      </div>
      <div class="container pwa-retailer-coupon mt-4">
        <div class="pwa-offer-container">
          <div class="pwa-offer-card-right">
            <img src={topImage} className="product-img w-100" alt="" />
          </div>
          <div class="pwa-offer-card-left">
            {offerType === 'tpgbogo12do' ? (
              <>
                <h4 className='pwa-bogo-offer-card-heading pwaSaveSubTitle mb-0'>
                  <span dangerouslySetInnerHTML={{ __html: bogoTitle }}></span>
                </h4>
                <div class="pwa-offer-card-para pwaRetailerValue mt-1 bold-text-bogo">
              <span dangerouslySetInnerHTML={{__html: bogoSubTitle}}></span>
            </div>
              </>
            ) : (
              <>
                <h4 className='pwa-offer-card-heading pwaSaveSubTitle mb-0'>
                  <span dangerouslySetInnerHTML={{ __html: pwaCardDetails?.title }}></span>
                  {pwaCardDetails.Offervalue && pwaCardDetails.OfferTypelabel && (" $" + pwaCardDetails.Offervalue)}{" "}<br />
                  <span className='pwa-offer-card-earnPoints' dangerouslySetInnerHTML={{ __html: pwaCardDetails?.earnPointsText }}></span>
                </h4>
                <div class="pwa-offer-card-para pwaRetailerValue mt-1">
              <span dangerouslySetInnerHTML={{__html: titlePara}}></span>
            </div>
              </>
            )}

            
            <div class="pwa-offer-card-img text-center mt-2">
              <img src={bottomImage} className="product-img" alt="" />
            </div>
            <div className="pwa-retailer-bottom-text pwaTextMiddle pb-0 pt-0 mt-3 mb-1">{currentOffers?.tpgOffers[offerIndex]?.subTitle}</div>
          </div>
        </div>
      </div>
    </>
  );
}