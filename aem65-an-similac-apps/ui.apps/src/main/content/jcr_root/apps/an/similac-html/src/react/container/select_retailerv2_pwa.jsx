import React from "react";
import moment from "moment";
import { makeCall, sendFormData, getMessageForReg } from "../common/api";
import Button from "../components/Button";
import OfferCard from "../components/OfferCardV2PWA";
import TargetCoupon from "../components/TargetCouponV2";
import { flattenObject } from "../common/apiToLocal";
import RedeemConfirmation from "../components/RedeemConfirmationPWA";
import Overlay from "../components/Markredeem";

export default class SelectRetailer extends React.Component {
  constructor(props) {
    super(props);
    this.aemData = props.aemData;
    
    Object.keys(this.props.aemData.retailer.retailersList).forEach(key=>{
      this.props.aemData.retailer.retailersList[key]['isActive']=true; 
    })

    this.state = {
      retailer: "",
      profileInfo: {},
      retailerError: false,
      nonDOEligibleUser: false,
      offerCode: "",
      showPaper: true,
      retailer:this.props.aemData.retailer,
      selectedKey: null,
      assignedRetailer: null, 
      selectretailerbtn: false,
      selectbtn: false
      
    };
    this.checkLogin = this.checkLogin.bind(this);
  }


  checkLocalData = formName => {
    return window.sessionStorage.getItem(formName);
  };

  updateSession = (value, formName, retailer, response) => {
    let localData___API = this.checkLocalData(formName + "___API");
    let localDataParsedApi = "";
    let feed = "";
    if (localData___API) {
      localDataParsedApi = JSON.parse(localData___API);
      feed = {
        categoryType: "offerPreferenceInfo",
        name: "retailer",
        value: value
      };
      localDataParsedApi.push(feed);
      window.sessionStorage.setItem(
        formName + "___API",
        JSON.stringify(localDataParsedApi)
      );
    } else if (!localData___API && retailer === "retailerOnline") {
      feed = {
        offerPreferenceInfo: {
          retailer: value,
          enableDigital: true,
          channel: "email"
        },
        category: "digitalOffer"
      };
      localDataParsedApi = feed;
      window.sessionStorage.setItem(
        "Sign In Form___API",
        JSON.stringify(localDataParsedApi)
      );
    } else if (!localData___API && retailer === "retailerOffline") {
      const fieldDataApi = flattenObject(response);
      window.sessionStorage.setItem(
        formName + "___API",
        JSON.stringify(fieldDataApi)
      );
      localData___API = this.checkLocalData(formName + "___API");
      localDataParsedApi = JSON.parse(localData___API);
      feed = {
        categoryType: "offerPreferenceInfo",
        name: "retailer",
        value: value
      };
      localDataParsedApi.push(feed);
      window.sessionStorage.setItem(
        formName + "___API",
        JSON.stringify(localDataParsedApi)
      );
    }
  };

  getProfileID = () => {
    const URL = "?" + window.location.href.split("?")[1];
    const urlParams = new URLSearchParams(URL);
    let memberId =
      urlParams.get("memberId") || urlParams.get("Id") || urlParams.get("id");
    if (memberId) {
      let buffer = new Buffer(memberId, "base64");
      buffer = buffer.toString();
      const memId = buffer.split("|");
      return memId[0];
    } else {
      return memberId;
    }
  };

  checkLogin() {    
    return ABBOTT.cookie("x-id-token");
  }

  /**
   * Call on component load
   */
  componentDidMount() {
    if (ABBOTT.utils.isUserLoggedIn()) {
      this.getProfileInfo();
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
  /**
   * Method on selecting retailer
   * @param {string} value
   */
  selectRetailer = key => {
   const { retailer } = this.state;
   this.state.selectedKey = key;
    Object.keys(retailer.retailersList).forEach((item) =>{
      if(retailer.retailersList[item].isAvailable){
      if(item == key){
        retailer.retailersList[item].isActive = false;
      } else {
        retailer.retailersList[item].isActive = true;
      }
    }
    })
    this.state.selectbtn = true;
    this.setState({...this.state});  
    
  };

  selectRetailerButton = () =>{
    this.state.selectbtn = true;
    this.state.selectretailerbtn = true;
    let selectedRetailername =this.state.selectedKey;
    let selectedRetailernameGTMkey="";
    if(selectedRetailername ===  "tpg"){
      selectedRetailernameGTMkey="pwa_digital-offers_multiple-in-store";
    }
    if(selectedRetailername ===  "targetonline" ){
      selectedRetailernameGTMkey="pwa_digital-offers_target-online";
    }
    if(selectedRetailername ===  "targetoffline"){
      selectedRetailernameGTMkey="pwa_digital-offers_target-in-store";
    }
    if(selectedRetailername === "amazon" ){
      selectedRetailernameGTMkey="pwa_digital-offers_amazon";
    }
    ABBOTT.gtm.buildAndPush.formTracking(
      "retailer-connect",
      "click",
      selectedRetailernameGTMkey
    );
    this.setState({...this.state});
    setTimeout(() => {
      $('#pwa-confirm-retailer').modal('show');
    }, 200);
  }
  /**
   * Method to select paper offer
   */
  submitPaperOffer = () => {   
    ABBOTT.gtm.buildAndPush.formTracking(
      "retailer-connect",
      "click",
      "digital-offers_stay-paper-check"
    );
    if (ABBOTT.utils.isUserLoggedIn()) {
      let formData = {
        offerPreferenceInfo: {
          enableDigital: false
        },
        category: "paperOffer"
      };

      let ajaxConfig = {
        url: this.aemData.actionPath,
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-country-code": "US",
          "x-application-id": "similac",
          "x-preferred-language": "en-US",
          "x-id-token": ABBOTT.utils.getSessionInfo()
        }
      };

      makeCall(ajaxConfig).then(
        success => {      
          window.location.href = this.aemData.myOfferPageUrl + "#thanksPaper";
          return success;
        },
        fail => {
          console.log(fail);         
        }
      );
    } else {
      window.location.href = this.aemData.loginPageUrl;
    }
  };

  
  isEnableOffer = (key)=>{
    this.state.retailer.retailersList[key]['isActive'] = !this.state.retailer.retailersList[key]['isActive'];
    this.state.selectretailerbtn = false;
    this.state.selectbtn = false;
    this.state.selectedKey = null;    
    this.setState({...this.state});
  }

  offerActivated = (value,retailerOfferType,retailerName) =>{   
    $("#template").hide();
    $('#overlay').css('z-index', "2000");
    let actionPath = this.aemData.actionPath;
    let offerCode = sessionStorage.getItem("couponCode");   
   
    let formData = {
      offerPreferenceInfo: {        
        retailer: retailerName,        
        offerType: retailerOfferType,
        offerCode: offerCode,
      },
      category: "universalOffer"
    };
   
    
    const loginToken = this.checkLogin();;
    
    let _config = {
      headers: {
        "x-id-token": loginToken
      }
    };
    sendFormData(actionPath, formData, _config).then(
      success => {
        const { errorCode, status, response } = success;
        
        if (errorCode === 0 && status === true) {
          sessionStorage.setItem('assignedRetailer', JSON.stringify(success.response));       
          window.location.href = this.state.retailer.retailersList[this.state.selectedKey].pageUrl;
        }
        else if(
          (errorCode === 400 &&
            status === true &&
            response.i18nMessageKey === "UP-1007") 
        ){
          
          const dataValue = getMessageForReg("UP-1007");
          $('#pwa-confirm-retailer').modal('hide');
          $("#template.global-error p").html(dataValue);
          $("#template").show();
          window.scrollTo({
            top:0,
            left:0,
            behavior: 'smooth',
            })
        }else if(
          (errorCode === 400 &&
            status === true &&
            response.i18nMessageKey === "UP-1008") 
        ){
         
          const dataValue = getMessageForReg("UP-1008");
          $('#pwa-confirm-retailer').modal('hide');
          $("#template.global-error p").html(dataValue);
          $("#template").show();
          window.scrollTo({
            top:0,
            left:0,
            behavior: 'smooth',
            })
        }else if(
          (errorCode === 500 &&
            status === false &&
            response.i18nMessageKey === "500") 
        ){
          
          const dataValue = getMessageForReg("UO-500");
          $('#pwa-confirm-retailer').modal('hide');
          $("#template.global-error p").html(dataValue);
          $("#template").show();
          window.scrollTo({
            top:0,
            left:0,
            behavior: 'smooth',
            })
        } else {
          const dataValue = getMessageForReg("500");
          $('#pwa-confirm-retailer').modal('hide');
          $("#template.global-error p").html(dataValue);
          $("#template").show();
          window.scrollTo({
            top:0,
            left:0,
            behavior: 'smooth',
            })
        }      
      },
      fail => {
        console.log(fail);      
      }
    );
    
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
    this.setState({isActiveCode: true})
  };

  
  offerRedeemActivated = offers => {    
    let hcpOfferCode = sessionStorage.getItem("couponCode");
    let formData = {
      category: "markRedeem",
      offerPreferenceInfo: {
        offerCode: offers.isHcpOffer?hcpOfferCode:offers.offerCode
         } 
    };

    let ajaxConfig = {
      headers: {
        "x-id-token": ABBOTT.utils.getSessionInfo()
      }
    };
    sendFormData(this.aemData.actionPath, formData, ajaxConfig) .then(result => {
      
      const { errorCode, response, status } = result;
      if (errorCode === 0 && status === true) {

        window.location.href = this.aemData.myOfferPageUrl;
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
    const aemData = this.aemData;
    const cardClass = "bg-alice-blue";
    const { retailerError, showPaper, nonDOEligibleUser, retailer } = this.state;
    const { currentOffers, actionPath, barCodeGenerate } = aemData;
    let pwaCardDetails= {};
    if (window.sessionStorage.getItem('ObjectCardData') != null) {
       pwaCardDetails = JSON.parse(window.sessionStorage.getItem('ObjectCardData'));
    }
    let retailerKeys = retailer.retailersList ? Object.keys(retailer.retailersList): [];
    const findIndex = retailerKeys.length > 0 ? retailerKeys.indexOf('targetoffline') : "";
    const deleteItem = retailerKeys.length > 0 ? retailerKeys.splice(findIndex, 1) : "";
    retailerKeys.length > 0 && deleteItem != "" ? retailerKeys.splice(2, 0, deleteItem.join('')) : "";
    
    
    let couponCard = ''; 
      if(this.state.assignedRetailer && this.state.assignedRetailer.assignedOfferRetailer.toLowerCase() === "target") {
        couponCard =  this.state.isActiveCode ?<TargetCoupon
          offerData={this.state.assignedRetailer}
          offerLabel={currentOffers}
          retailerLabel={retailer}
          aemData={actionPath}
          barCode={barCodeGenerate}
          submitRedeem={(url, code) =>
          this.submitRedeem(url, code)
        }
        submitMarkRedeem={this.submitMarkRedeem}
        showMark={false}
      />: <Overlay
        currentOffers={currentOffers}
        isEnableOffer={this.isConfirmMarkRedeem}
        offerActivated={() => this.offerRedeemActivated(this.state.assignedRetailer)}
      />  
     } else if (
      this.state.assignedRetailer && this.state.assignedRetailer.assignedOfferRetailer.toLowerCase() === "amazon" ||
      this.state.assignedRetailer && this.state.assignedRetailer.assignedOfferRetailer.toLowerCase() === "tpg"
     ) {
      
        couponCard=this.state.isActiveCode ?<OfferCard
          offerData={this.state.assignedRetailer}
          offerLabel={currentOffers}
          retailerLabel={retailer}
          submitRedeem={(url, code) =>
            this.submitRedeem(url, code)
          }
          submitMarkRedeem={this.submitMarkRedeem}
          showMark={false}
        />: <Overlay
          currentOffers={currentOffers}
          isEnableOffer={this.isConfirmMarkRedeem}
          offerActivated={() => this.offerRedeemActivated(this.state.assignedRetailer)}
        />     
        
       }
       

    return (
      <>
        {aemData && (
          <>       
           {this.state.assignedRetailer == null ?  
           <>
           {  this.state.selectretailerbtn  ? <RedeemConfirmation
                  retailer={retailer}
                  retailersList ={retailer.retailersList}
                  retailerName = {retailer.retailersList[this.state.selectedKey].value.toString()}
                  retailerType = {retailer.retailersList[this.state.selectedKey].offerType.toString()}
                  dataGtmSelectValue = {retailer.retailersList[this.state.selectedKey].dataGtmSelectLabel}
                  retailerSelected = {retailer.retailerSelected}
                  isEnableOffer={()=>this.isEnableOffer(this.state.selectedKey)}
                  isRetailerAvailable =  {retailer.retailersList[this.state.selectedKey].isAvailable}
                  offerActivated={()=>this.offerActivated(this.state.selectedKey,retailer.retailersList[this.state.selectedKey].offerType,retailer.retailersList[this.state.selectedKey].value)}
                  retailerImage={retailer.retailersList[this.state.selectedKey].imgUrl}
                  /> : null 
            }
            <div className="card-offer-wrap row">
                <div className="pwa-offer-container">
                    <div className="pwa-offer-card-left col-9">
                        <div>
                            <h4 className="pwa-offer-card-heading"><span dangerouslySetInnerHTML={{ __html: pwaCardDetails.title ? pwaCardDetails.title : "" }}></span>
                              {pwaCardDetails.Offervalue && pwaCardDetails.OfferTypelabel && (" $" + pwaCardDetails.Offervalue)}{" "}
                            <span className='pwa-offer-card-earnPoints' dangerouslySetInnerHTML={{ __html: pwaCardDetails?.earnPointsText }}></span>
                            </h4>
                        </div>                                                                                                                                                      
                        <div className="pwa-offer-card-para">
                          <span dangerouslySetInnerHTML={{ __html: pwaCardDetails.offerPara }}></span> 
                          <span className="pwa-days">{pwaCardDetails.validDays >= 0 ? " " + pwaCardDetails.validDays : ""} {pwaCardDetails.moredaysLabel ? pwaCardDetails.moredaysLabel : ""}</span>
                        </div>
                    </div>
                    <div className="pwa-offer-card-right">
                      <img src={pwaCardDetails.offerImg} className="product-img w-100" alt={pwaCardDetails.OfferRetailer}/>
                    </div>
                </div>
            </div>
            <div className="pwa-retailer-alert row">
              <div className="pwa-alert-icon"><img src="/content/dam/an/similac/global/icons/retailer/alert-retailer.png" className="icon" /></div>
              <div className="pwa-retailer-alert-text">{retailer.retailerNote}</div>
            </div>
            <div className="pwa-retailer-ask">
              {retailer.title}
            </div>

            <div className="pwa-ret-option container" id="retailer-option">
              {retailerKeys.map(key => (
                <>
                {
                <div data-gtm={retailer.retailersList[key].dataGtmSelectLabel} className={`pwa-ret-option-item row ${retailer.retailersList[key].isAvailable ? "" : "pwa-notactive"} ${
                  retailer.retailersList[key].isActive ? "" : "pwa-applybg"
                }`} onClick={() =>
                  this.selectRetailer(key)
                }>                  
                  <div className="pwa-ret-option-img">
                      <img
                        src={retailer.retailersList[key].imgSMUrl}
                        className="w-100"
                        alt={key}
                      />
                  </div>
                  <div className="pwa-ret-option-content">
                          {retailer.retailersList[key].label}
                  </div>
                </div>
               
                }
                </>
              ))}
            </div> 
            
            </>: null
            }
            {retailerError && (
              <p className="font-roboto-reg text-error">{retailer.error}</p>
            )}
            {nonDOEligibleUser && (
              <p className="font-roboto-reg text-error">
                {this.aemData.errorUpdateProfileNonDOUser}
              </p>
            )}           
            
            {this.state.assignedRetailer ? 
            couponCard 
            : null 
           }
            <div className="container text-center">
              <button onClick={() => this.selectRetailerButton()} className={this.state.selectbtn ? "pwa-select-retailer-btn" : "pwa-select-retailer-btn pwa-inactive-btn"}>{retailer.selectRetailerLabel}</button>
            </div>
            
            <div>
             <div className="do-footer do-footer-padding" dangerouslySetInnerHTML={{ __html: this.aemData.scanModule.offerTabFootnote }}></div>
            </div>
            
          </>
        )}
      </>
    );
  }
}