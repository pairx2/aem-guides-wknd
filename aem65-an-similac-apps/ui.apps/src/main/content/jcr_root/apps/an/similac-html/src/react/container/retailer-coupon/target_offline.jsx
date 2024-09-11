import React, { useState, useEffect } from "react";
import moment from "moment";
import { makeCall } from "../../common/api";


const TargetOfflineCoupon = props => {
  const [showPromoCode, setShowPromoCode] = useState(true);
  const [showBarcode, setBarcode] = useState(false);
  const [barCodeURL, setbarCodeURL] = useState("");
  const [offerMode, setOfferMode] = useState("");
  const [couponCode, setCouponCode] = useState("");


  let { offerData, offerLabel, retailerLabel, aemData, barCode } = props;

  let endDate = moment(offerData.assignedOfferExpiryDate);
  let currentDate = moment();
  let cardLabel;
  let imgURL;
  let online, store;

  let newOfferTarget;

  cardLabel = offerLabel.newOfferTarget;
  newOfferTarget = true;

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

        makeCall(ajaxConfigBarCode).then(result => {

          imgURL = "data:image/jpg;base64," + result.response;
          setbarCodeURL(imgURL);
          setCouponCode(code);
          setOfferMode(cardLabel.offerCriteriaStore);
          setBarcode(true);

        }, (fail) => {
          console.log(fail);
          console.log(url);
        })
    }, (fail) => {
      console.log(fail);
      console.log(url);
    })
  };

  let pwaCardDetails = {};
  if (window.sessionStorage.getItem('ObjectCardData') != null) {
    pwaCardDetails = JSON.parse(window.sessionStorage.getItem('ObjectCardData'));
  }
  useEffect(() => {
    updateOpenedCard(
      offerLabel.newOfferTarget.pageUrl,
      props.couponCode,"store"
    )
  }, []);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: offerLabel?.openOfferTarget?.title }} className="pwa-retailer-bottom-text pwaTargetOfflineTopText">
      </div>
      <div className="card-offer-wrap col-12 col-md-12 col-lg-4 mb-4 pwaTargetOnlineCoupon">
        <div
          className={"card card-offer text-center target h-100"}
        >
          <p className="card-header pwaTargetHeader">
            <span className="col-6 leftspan text-white text-bg-mild-red font-weight-bold d-inline-block card-text-small border-red">
              <img src={offerLabel.couponLogo} alt=""/>
            </span>
            <span className="col-6 rightspan text-black font-weight-bold d-inline-block card-text-small border-black">
            {offerLabel?.titleExpire}{" "}
              {moment(offerData.assignedOfferExpiryDate).format("MM/DD/YY")}
            </span>
          </p>
          <div className="card-body">
            <img
              src={offerLabel.targetImgUrl}
              className="w-100 mb-3 mt-2 posterImg"
              alt=""
            />
            <h4 className="font-weight-bold text-mild-red px-3 pwaTargetSaveText">
              <span dangerouslySetInnerHTML={{ __html: cardLabel.title ? cardLabel.title : "" }}></span>
              {pwaCardDetails.Offervalue && pwaCardDetails.OfferTypelabel && (pwaCardDetails.Offervalue + " " + cardLabel.title1)}
            </h4>
            <p className="font-weight-bold text-black mb-0 px-3 pwaTargetOfferValue">
              <span dangerouslySetInnerHTML={{ __html: cardLabel.subTitle2 }}></span>
              {" $"}{pwaCardDetails.Offervalue}{" "}
              <span dangerouslySetInnerHTML={{ __html: cardLabel.subTitle3 }}></span><br/>
              <span className='pwa-offer-card-earnPoints' dangerouslySetInnerHTML={{ __html: pwaCardDetails?.earnPointsText }}></span>{" "}
            </p>

            <p className="text-black card-text-small mt-2 mb-0 px-3 pwaTargetOfflineValid">
              {<span dangerouslySetInnerHTML={{ __html: cardLabel.offerCriteriaStore }}></span>}
            </p>
            <div id="barcode" className="px-3">
              <p className="mb-0 barCodeSection">
                {barCodeURL && <img src={barCodeURL} alt="bar-code" className="w-100"/>}
              </p>
              <p className="pwaTargetOfflineValid"> {props.couponCode}</p>
            </div>
            <p className="text-black card-text-small px-3 text-left pwaTargetTerms">
            {offerLabel?.newOfferTarget?.offerDescription1}{" "}{"$"}{pwaCardDetails.Offervalue}{" "}{offerLabel?.newOfferTarget?.offerDescription2}
            </p>
          </div>
        </div>
      </div>

    </>
  );
};

export default TargetOfflineCoupon;

