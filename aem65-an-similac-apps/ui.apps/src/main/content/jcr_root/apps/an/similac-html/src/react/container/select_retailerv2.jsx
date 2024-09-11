import React from "react";
import moment from "moment";
import { makeCall, sendFormData, getMessageForReg } from "../common/api";
import OfferCard from "../components/OfferCardV2";
import TargetCoupon from "../components/TargetCouponV2";
import { flattenObject } from "../common/apiToLocal";
import RedeemConfirmation from "../components/RedeemConfirmation";
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
    
    this.setState({...this.state});  
    
  };

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
    this.state.selectedKey = null;    
    this.setState({...this.state});
  }

  offerActivated = (value,retailerOfferType,retailerName) =>{
    $("#template").hide();
    let actionPath = this.aemData.actionPath;
    let offerCode = sessionStorage.getItem("couponCode");   
   
    let formData = {
      offerPreferenceInfo: {        
        retailer: retailerName,        
        offerType: retailerOfferType,
        offerCode:offerCode,
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
          this.setState({ assignedRetailer: success.response,isActiveCode:true });
          if (offerCode.includes('HCP')) {            
            this.setState(prevState => ({
              assignedRetailer: {
                ...prevState.assignedRetailer,isHcpOffer: true
              }
            }))
            
          }
          
        }
        else if(
          (errorCode === 400 &&
            status === true &&
            response.i18nMessageKey === "UP-1007") 
        ){
          
          const dataValue = getMessageForReg("UP-1007");
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
          $("#template.global-error p").html(dataValue);
          $("#template").show();
          window.scrollTo({
            top:0,
            left:0,
            behavior: 'smooth',
            })
        } else {
          const dataValue = getMessageForReg("500");
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
        // console.log(fail);
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
            <p className="heading">{retailer.title}</p>
            <p className="subheading">{retailer.retailerNote}</p>
            <div className="row" id="retailer-option">
              {Object.keys(retailer.retailersList).map(key => (
                
                <>
                {retailer.retailersList[key].isActive?
                <div className="col-12 col-md-6 mb-2_813 retailer-select-card">
                  <div className={retailer.retailersList[key].isAvailable ? 
                  "row bg-alice-blue py-1_875 mx-0 h-100" :
                  "row bg-gray-card py-1_875 mx-0 h-100" }
                  >
                    <div className="col-6 col-md-5 col-lg-4">
                      <img
                        src={retailer.retailersList[key].imgUrl}
                        className="w-100"
                      />
                    </div>
                    <div className="col-6 col-md-7 col-lg-7 pl-0 py-1">
                      {retailer.retailersList[key].isAvailable ?
                        <>
                        <p className="font-roboto-bold text-smalt mb-1_25">
                          {retailer.retailersList[key].label}
                        </p>
                        <p className="font-roboto-regular text-smalt mb-1_25 retailer-desc">
                          {retailer.retailersList[key].retailerDescription} 
                        </p>
                        <a href="javascript:void(0)"
                          className="font-brandon-bold text-tangerine select-retailer"
                          data-gtm={retailer.retailersList[key].dataGtmLabel}
                          onClick={() =>
                            this.selectRetailer(key)
                          }
                        >
                          {retailer.selectRetailerLabel} 
                        </a>
                        </> : 
                        <>
                        <p className="font-roboto-bold text-smalt mb-1_25">
                          {retailer.retailersList[key].lineOneTxt}
                        </p>
                        <p className="font-roboto-bold text-smalt mb-1_25">
                          {retailer.retailersList[key].lineTwoTxt}
                        </p>
                        </>
                        }
                    </div>
                  </div>
                </div>:
                <RedeemConfirmation
                retailer={retailer}
                retailersList ={retailer.retailersList}
                retailerName = {retailer.retailersList[key].value.toString()}
                retailerType = {retailer.retailersList[key].offerType.toString()}
                dataGtmSelectValue = {retailer.retailersList[key].dataGtmSelectLabel}
                retailerSelected = {retailer.retailerSelected}
                isEnableOffer={()=>this.isEnableOffer(key)}
                isRetailerAvailable =  {retailer.retailersList[key].isAvailable}
                offerActivated={()=>this.offerActivated(key,retailer.retailersList[key].offerType,retailer.retailersList[key].value)}
                />
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
            <p>
               <a
             className="font-roboto-reg text-tangerine d-flex mb-2_813 select-paper"
             href={aemData.myOfferPageUrl}
           >
             {aemData.goToOfferPageText}
           </a>
           </p>
          </>
        )}
      </>
    );
  }
}
