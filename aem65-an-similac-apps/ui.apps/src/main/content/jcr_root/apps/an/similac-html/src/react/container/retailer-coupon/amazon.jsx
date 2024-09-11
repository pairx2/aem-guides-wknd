import React, { Component } from 'react';

const AmazonCoupon = props => {
  let { currentOffers } = props;
  let pwaCardDetails = {};
  //Analytic
  let use_on_amazon = currentOffers?.dataGtmMarkRedeemed;
  let copy_promo_code = currentOffers?.dataGtmMarkRedeemed;
  if (use_on_amazon != null && use_on_amazon != "") {
    use_on_amazon = use_on_amazon.replaceAll("#id#", "amazon");
    use_on_amazon = use_on_amazon.replaceAll("#label#", "use-on-amazon");
  }
  if (copy_promo_code != null && copy_promo_code != "") {
    copy_promo_code = copy_promo_code.replaceAll("#id#", "amazon");
    copy_promo_code = copy_promo_code.replaceAll("#label#", "copy-promo-code");
  }
  if (window.sessionStorage.getItem('ObjectCardData') != null) {
    pwaCardDetails = JSON.parse(window.sessionStorage.getItem('ObjectCardData'));
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

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: currentOffers?.amazonOffer.title }} className="pwa-retailer-bottom-text pwaRetailerTopText">
      </div>
      <div className="container">
        <a
          onClick={() => props.pwaExitPopup(currentOffers.amazonOffer.pageUrl)}         
          data-gtm={use_on_amazon}
          className="btn btn-primary col-12 pwaExternalLink">{currentOffers?.amazonOffer?.newOffer?.buttonLabel}</a>
        <a  
          onClick={() => props.copyToClip(props.couponCode)}
          data-gtm={copy_promo_code}
          className="btn btn-primary col-12 pwaExternalLink pwaCopyPromoCode">{currentOffers?.amazonOffer?.openOffer?.buttonLabel}</a>
      </div>
      <div class="container pwa-retailer-coupon mt-3">
        <div class="pwa-offer-container">
          <div class="pwa-offer-card-right">
            <img src={currentOffers?.tpgImgUrl} class="product-img w-100" alt=""/>
          </div>
          <div class="pwa-offer-card-left">
            <h4 class="pwa-offer-card-heading pwaRetailerSaveText pwaSaveSubTitle mb-0">
              <span dangerouslySetInnerHTML={{__html:pwaCardDetails?.title}}></span>
              {pwaCardDetails.Offervalue && pwaCardDetails.OfferTypelabel && (" $" + pwaCardDetails.Offervalue)}
              {" "}<span className='pwa-offer-card-earnPoints' dangerouslySetInnerHTML={{ __html: pwaCardDetails?.earnPointsText }}></span>
            </h4>
            <div class="pwa-offer-card-para pwaRetailerValue mt-1">
              <span dangerouslySetInnerHTML={{__html:currentOffers?.amazonOffer?.redeemedOffer?.subTitle}}></span>
            </div>
            <p className="pwaPromoCodeText pwaAmazonPromo pwaTextWrap mb-0 mt-2 px-3">
              <a className="text-decoration-underline">{props.couponCode}</a> 
            </p>
            <div class="pwa-offer-card-img text-center mt-2">
              <img src={currentOffers?.amazonOffer.imgSMUrl} className="product-img" alt=""/>
            </div>
            <div className="pwa-retailer-bottom-text pwaRetailerTerms pwaTextMiddle mt-0 mb-1 pt-0 pb-0">{currentOffers?.amazonOffer.subTitle}</div>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default AmazonCoupon;
