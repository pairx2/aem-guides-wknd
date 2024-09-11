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
  
  offerData.offerRetailer = offerData.assignedOfferRetailer ? offerData.assignedOfferRetailer : offerData.offerRetailer; 
  offerData.offerExpiryDate = offerData.assignedOfferExpiryDate ? offerData.assignedOfferExpiryDate : offerData.offerExpiryDate;
  offerData.offerCode = offerData.assignedOfferCode ? offerData.assignedOfferCode : offerData.offerCode;
  offerData.offerValue = offerData.assignedOfferValue ? offerData.assignedOfferValue : offerData.offerValue;
  offerData.offerType = offerData.assignedOfferType ? offerData.assignedOfferType : offerData.offerType;
 
  // Calculate offer validity
  let endDate = moment(offerData.offerExpiryDate);
  let currentDate = moment();
  let cardLabel;
  let imgURL;
  let online, store;

  let newOfferTarget;
 
    // Check for new offer
    cardLabel = offerLabel.newOfferTarget;
    newOfferTarget = true;

  if(offerData.offerType){
  
   if(offerData.offerType.toLowerCase() === "target_cc"){
    online = true;
  }
  else if(offerData.offerType.toLowerCase() === "target_bc"){
    store=true
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
  const copyToClip = (couponCode) =>{
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
       if(redemptiontype==="online"){
        copyToClip(code);

        setCouponCode(code);
        setOfferMode(cardLabel.offerCriteriaOnline);

        setPromocode(true);
       }else if(redemptiontype === "store"){
        makeCall(ajaxConfigBarCode).then(result => {

          imgURL="data:image/jpg;base64,"+result.response;
          setbarCodeURL(imgURL);
          setCouponCode(code);
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
      
        <div className="card-offer-wrap col-12 col-md-6 col-lg-4 mb-4">
          <div
            className={"card card-offer text-center target h-100"}
          >
            <p className="card-header">
              <span className="col-6 text-white text-bg-mild-red font-weight-bold d-inline-block card-text-small border-red">
               <img src={offerLabel.couponLogo}/>
              </span>
             
              
              <span className="col-6 text-black font-weight-bold d-inline-block card-text-small border-black">
                {cardLabel.expiryTitle}{" "}
                {moment(offerData.offerExpiryDate).format("MM/DD/YY")}
              </span>
              
            </p>

            <div className="card-body">
              <img
                src={offerLabel.targetImgUrl}
                className="w-100 mb-3 mt-3 posterImg"
              />
       <h4 className="font-weight-bold text-mild-red px-3">
        <span dangerouslySetInnerHTML={{__html:cardLabel.title}}></span>
              {offerData.offerValue}{" "}<br/><span className='card-offer-earnPoints' dangerouslySetInnerHTML={{ __html: offerLabel?.earnPointsText }}></span>
              <br/><span dangerouslySetInnerHTML={{__html:cardLabel.title1}}></span>
           
       </h4>
             

              
       <p className="font-weight-bold text-black mb-1 px-3">
               <span dangerouslySetInnerHTML={{__html:cardLabel.subTitle1}}></span>
               {offerData.offerValue}{" "}
               <span dangerouslySetInnerHTML={{__html:cardLabel.subTitle2}}></span>
              </p>
             
                  <p className="text-black card-text-small mb-0">
                    {online ? <span dangerouslySetInnerHTML={{__html:cardLabel.offerCriteriaOnline}}></span> :  <span dangerouslySetInnerHTML={{__html:cardLabel.offerCriteriaStore}}></span> }
                  </p>
                 
                 
                {(!showPromocode && !showBarcode) && (
                  <div className="offerClaimBtn mt-3">
                  {online && (
                    <a
                      className="btn btn-primary col-12 mb-3"
                      data-gtm={offerLabel.dataGtmRedeemOffer}
                      onClick={() => updateOpenedCard(
                          offerLabel.newOfferTarget.pageUrl,
                          offerData.offerCode,"online")
                      }
                    >
                      {offerLabel.buttonLabelRedeem}
                    </a>)}
                    {store &&(
                    <a
                      data-gtm={offerLabel.dataGtmRedeemOffer} 
                      className="btn btn-primary col-12 mb-3"
                      onClick={
                        () => updateOpenedCard(
                          offerLabel.newOfferTarget.pageUrl,
                          offerData.offerCode,"store"
                        )
                    }
                
                    >
                      {offerLabel.buttonLabelRedeem}
                    </a>
                    )}
                   { props.showMark &&(
                  <a
                      className="btn btn-secondary col-12 mb-3"
                      data-gtm={offerLabel.dataGtmMarkRedeemed} 
                    >
                      {offerLabel.buttonLabelMarkRedeem}
                    </a>
                  )}
                  </div>
                )}
                   {(showPromocode && !showBarcode) && (
                  <div id="promocode" className="px-3 mt-3">
                    <p className="mb-0 font-weight-bold">{cardLabel.promoCodeTitle}</p>
                    <p className="text-mild-orange"><a onClick={() => openCoupon(cardLabel.pageUrl)}
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
                  <span dangerouslySetInnerHTML={{__html:cardLabel.offerDescription1}}></span>{" "}{"$"}{offerData.offerValue}{" "}<span dangerouslySetInnerHTML={{__html:cardLabel.offerDescription2}}></span>
                  </p>
                
              
            </div>
          </div>
        </div>
      
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