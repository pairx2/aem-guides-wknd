import React, { useState }  from "react";
import moment from "moment";
import { makeCall } from "../../common/api";


const TargetCoupon = props => {
  const [showPromocode, setPromocode] = useState(false);
  const [showBarcode, setBarcode] = useState(false);
  const [barCodeURL,setbarCodeURL] = useState("");
  const [offerMode,setOfferMode] = useState("");
  const [couponCode,setCouponCode] = useState("");


  let { offerData, offerLabel, retailerLabel, aemData, barCode } = props;
  
  // Calculate offer validity
  let endDate = moment(offerData.offerExpiryDate);
  let currentDate = moment();
  let validDays = endDate.diff(currentDate, "days");
  let cardLabel;
  let imgURL;

  let openOfferTarget, redeemedOfferTarget, newOfferTarget;
  // Check if offer opened
  if (offerData.offerRedeemed === false && offerData.offerOpenedDate) {
    cardLabel = offerLabel.openOfferTarget;
    openOfferTarget = true;
  }
  // Check offer redeemed
  else if (offerData.offerRedeemed === true) {
    cardLabel = offerLabel.redeemedOfferTarget;
    redeemedOfferTarget = true;
  } else {
    // Check offer is new
    cardLabel = offerLabel.newOfferTarget;
    newOfferTarget = true;
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
  const updateOpenedCard = (url, code, redemptiontype) => {
    let codeArr=code;
    codeArr=codeArr.split("|");
    let formData = {
        "category": "redeemOffer",
        "offerPreferenceInfo": {
            "offerCode": redemptiontype === "online" ? codeArr[0] : codeArr[1]
        }
    };
    let formDataBarCode = {
          "offerCode": redemptiontype === "online" ? codeArr[0] : codeArr[1],
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
       if(redemptiontype==="online"){
        setCouponCode(codeArr[0]);
        setOfferMode(cardLabel.offerCriteriaOnline);

        setPromocode(true);
       }else if(redemptiontype === "store"){
        makeCall(ajaxConfigBarCode).then(result => {

          imgURL="data:image/jpg;base64,"+result.response;
          setbarCodeURL(imgURL);
          setCouponCode(codeArr[1]);
          setOfferMode(cardLabel.offerCriteriaStore);
       setBarcode(true);
       
        }, (fail) => {
          console.log(fail);
          console.log(url);
      })
       }
    }, (fail) => {
        console.log(fail);
        console.log(url);
    })
};

  

  return (
    <>
      {validDays >= 0 && (
        <div className="card-offer-wrap col-12 col-md-6 col-lg-4 mb-4">
          <div
            className={"card card-offer text-center target"}
          >
            <p className="card-header">
              <span className="col-6 text-white text-bg-mild-red font-weight-bold d-inline-block card-text-small border-red">
               <img src={offerLabel.couponLogo}/>
              </span>
             
              {!redeemedOfferTarget && (
              <span className="col-6 text-black font-weight-bold d-inline-block card-text-small border-black">
                {cardLabel.expiryTitle}{" "}
                {moment(offerData.offerExpiryDate).format("MM/DD/YY")}
              </span>
              )}

            {redeemedOfferTarget && (
              <span className="col-6 text-black font-weight-bold d-inline-block card-text-small border-black">
                 {cardLabel.expiryTitle}
              </span>
              )}
            </p>

            <div className="card-body">
              <img
                src={offerLabel.targetImgUrl}
                className="w-100 mb-3 mt-3 posterImg"
              />
        {!redeemedOfferTarget && (<h4 className="font-weight-bold text-mild-red px-3">
        <span dangerouslySetInnerHTML={{__html:cardLabel.title}}></span>
              {offerData.offerValue}{" "}
              <span dangerouslySetInnerHTML={{__html:cardLabel.title1}}></span>
           
            
              </h4>)}
              {redeemedOfferTarget && (<h4 className="font-weight-bold text-mild-red px-3">
              <span dangerouslySetInnerHTML={{__html:cardLabel.title}}></span>
              {offerData.offerValue}{" "}
              <span dangerouslySetInnerHTML={{__html:cardLabel.title1}}></span>
           
              </h4>)}

              
              <p className="font-weight-bold text-black mb-1 px-3">
               <span dangerouslySetInnerHTML={{__html:cardLabel.subTitle1}}></span><span dangerouslySetInnerHTML={{__html:cardLabel.subTitle}}></span>
              </p>
              {redeemedOfferTarget && (
                 <p className="font-weight-bold text-black">{moment(offerData.offerRedeemedDate).format("MM/DD/YY")}</p>
              )}
             
                  <p className={`text-black card-text-small ${redeemedOfferTarget? "text-left px-2":""} mb-0`}>
                    {offerMode?offerMode:cardLabel.offerCriteria}
                  </p>
                  {!redeemedOfferTarget && (
                <>
                {openOfferTarget && !showPromocode && !showBarcode && (<div className="offerOpened mb-4 mt-3">
                <p className="mb-0 font-weight-bold">{cardLabel.openedOfferTitle}</p>
                <p className="mb-0">{cardLabel.openedOfferInfo}</p>
                </div>)}
                
                 {(!showPromocode && !showBarcode) && (
                     
                  <div className="offerClaimBtn mt-3">
                    <a
                      className="btn btn-primary col-9 mb-3"
                      onClick={() => updateOpenedCard(
                          retailerLabel.retailersList[
                            offerData.offerRetailer.toLowerCase()
                          ].pageUrl,
                          offerData.offerCode,"online")
                      }
                    >
                      {cardLabel.buttonLabelOnline}
                    </a>
                    <a
                      className="btn btn-primary col-9 mb-3"
                      onClick={
                        () => updateOpenedCard(
                          retailerLabel.retailersList[
                            offerData.offerRetailer.toLowerCase()
                          ].pageUrl,
                          offerData.offerCode,"store"
                        )
                    }
                
                    >
                      {cardLabel.buttonLabelStore}
                    </a>
                  </div>
                  )}
                   {(showPromocode && !showBarcode) && (
                  <div id="promocode" className="px-3 mt-3">
                    <p className="mb-0 font-weight-bold">{cardLabel.promoCodeTitle}</p>
                    <p className="text-mild-orange"><a onClick={() => openCoupon(cardLabel.promoURL)}
                     className="text-decoration-underline">{couponCode}</a> </p>
                  </div>
                   )}
                    {(showBarcode && !showPromocode) && (
                  <div id="barcode"  className="px-3">
                    <p className="mb-0 barCodeSection"><img src={barCodeURL} width="100%"/></p>
                    <p className="card-text-small"> {couponCode}</p>
                  </div>
                   )}
                  <p className="text-black card-text-small mb-2 px-3 text-left">
                    {cardLabel.offerDescription1}{" "}{"$"}{offerData.offerValue}{" "}{cardLabel.offerDescription2}
                  </p>
                </>
              )}
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TargetCoupon;



const updateOfferMode = (offerText,offerMode) =>{
 let offerModeUpdated=   offerText.replace("<sup>$</sup>X", "<sup>$</sup>" + offerMode)
return offerModeUpdated;
} 

const updateOfferValue$ = (offerText,offerValue) =>{
let offerValueUpdated=   offerText.replace("$X", "$" + offerValue)
 return offerValueUpdated;
 } 
 const updateOfferValue$XX = (offerText,offerValue) =>{
 let offerValueUpdated=   offerText.replace("$XX", "$" + offerValue)
  return offerValueUpdated;
  } 

