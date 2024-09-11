import React from "react";
import moment from "moment";

import { makeCall } from "../common/api";
import OfferCard from "../components/OfferCardV2";
import TargetCoupon from "../components/TargetCouponV2";
import OfferCardHori from "../components/OfferCardHori";
import CompleteProfile from "./offers/CompleteProfile";
import { sendFormData, getErrorMessage, getMessageForReg } from "../common/api";
import graphQLQuery from "../services/product.service.js";
import Overlay from "../components/Markredeem";

export default class MyOffers extends React.Component {
  constructor(props) {
    super(props);
    this.aemData = props.aemData;
    const { purchaserOnlyOffer } = this.aemData;
    // Set default state
    this.state = {
      profileInfo: {},
      newOfferSorted: {},
      expiringSoonOfferSorted: {},
      expiringLaterOfferSorted: {},
      showNewOffer: false,
      showExpiringOffers: false,
      showOffer: purchaserOnlyOffer ? true : false,
      completeProfilePage: false,
      showCoupons: false,
      showDigital: false,
      retailerError: false,
      showPaperMsg: false,
      showDigitalMsg: false,
      zeroActiveChild: false,
      showSignUp: false,
      duplicateOffer: false,
      disruptorHTML: "",
      hcpDisruptorHTML: "",
      showDisruptor: false,
      openDisruptor: false,
      doOpted: false,
      DOShowThanksMessage:"",
      newOfferCount: "",
      expiringOfferCount: "",
      switchAuto: false,
    };
  }

  setCompletePage = flag => {
    this.setState({ completeProfilePage: flag });
  };

  /**
   * Call on component load
   */
  componentDidMount() {
    let lc = ABBOTT.cookie("profile");
    let lp = JSON.parse(lc);
  
    let secondaryEmail = lp.contactEmail ? lp.contactEmail.toLowerCase() : "";
    if(!lp.oasisBannerClosed && lp.oasisEmail && (lp.oasisEmail.toLowerCase() !== lp.email.toLowerCase() && lp.oasisEmail.toLowerCase() !== secondaryEmail)){
      $("#template.global-error p").html(this.aemData.currentOffers.hcpInfo.errorText).addClass('error-pr-20');
      $("#template").addClass("oasis-error-box").show();
      $("html, body").animate({ scrollTop: 0 }, "slow");
    }
    const userType = ABBOTT.utils.getActualUserType();
    if(window.sessionStorage.getItem('promoOfferSwitchDO')){
      this.setState({
        switchAuto: true,
      });
      window.sessionStorage.removeItem('promoOfferSwitchDO');
      window.sessionStorage.removeItem("MediaTracking");
    }
    if ("similac-ecom" === lp.userType && (window.sessionStorage.getItem("oasisEmail") && window.sessionStorage.getItem("oasisEmail").toLowerCase()===lp.email.toLowerCase())) {
    
      this.setState({
        completeProfilePage: true
      });
    }
    else if ("similac-ecom" === lp.userType && !window.sessionStorage.getItem("oasisEmail")) {
    
      this.setState({
        showSignUp: true
      });
    } 
    else {
      let hashValue = window.location.hash.slice(1);
      this.setState({
        showDigitalMsg: false
      });
      window.location.hash = "";
      if (hashValue === "thanksPaper") {
        this.setState({
          showPaperMsg: true,
          showDigitalMsg: true
        });
      } else if (hashValue === "thanksDigital") {
        this.setState({
          showDigitalMsg: true
        });
      }
    }

    let ajaxConfig = {
      url: `${ABBOTT.config.getEndpointUrl(
        "GRAPH_QL"
      )}?query=${graphQLQuery.generatePersonalizationQuery()}`,
      method: "get",
      contentType: "application/json",
      headers: {
        Store: ABBOTT.config.storeName
      }
    };

    if (ABBOTT.utils.isUserLoggedIn()) {
      ajaxConfig.headers.Authorization =
        "Bearer " + ABBOTT.utils.getMagentoSessionToken();
    }
    ABBOTT.http.makeAjaxCall(ajaxConfig).then(
      success => {
        let data = success.data?.personalizedProducts[0];
        if (data.status) {
          let event = new CustomEvent("offer-img-ready", {
            detail: {
              img: data.dam_images,
              redirectURL: data.aem_url
            }
          });
          document.dispatchEvent(event);
        }
      },
      fail => {
      }
    );

    this.getProfileInfo();

  }
  /**
   * Method to get disruptor HTMl from AEM
   */
   isMobileDevicechk = () => {
    var check;
    if (/SM-T/i.test(navigator.userAgent)) {// false for samsung tablet
      check = false;
    }
    else if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      check = true;
    }
    return check;
  };

  getDisruptor = (urlType = "") => {
    let htmlUrl;
    var isMobileDevice = this.isMobileDevicechk();
    if (isMobileDevice) {
      htmlUrl = this.aemData.pwaDownloadDisruptorFragment;
    } else {
      htmlUrl = this.aemData.offerDisruptorFragment;
    }
    
    let lc = ABBOTT.cookie("profile");
    let lp = JSON.parse(lc);
    
    if(urlType === "HCP"){
      htmlUrl = this.aemData.hcpOfferDisruptorFragment;
    }
    if (htmlUrl !== "" && htmlUrl !== undefined) {
      let ajaxConfig = {
        url: htmlUrl,
        method: "get",
        dataType: "html"
      };
      ABBOTT.http.makeAjaxCall(ajaxConfig).then(success => {
       if(urlType === "HCP"){
        this.setState(
          {
            hcpDisruptorHTML: success
          },
          () => {
            this.toggleDisruptor(urlType);
          }
        );
       } else {
        this.setState(
          {
            disruptorHTML: success
          },
          () => {
            this.toggleDisruptor();
          }
        );
       } 
      });
    }
  };

  
  /**
   * Method to toggle Disruptor
   */
  toggleDisruptor = (HCPOffer = "") => {

    ABBOTT.main.setSocialIcons();
    const { showCoupons, showDisruptor, openDisruptor } = this.state;
    const { offerPreferenceInfo } = this.state.profileInfo;
    const browserName = this.fnBrowserDetect();
        
    // Always show the disruptor in open state if user is DO opted
    if (offerPreferenceInfo?.retailer) { 
      $(".drawer-title-wrapper").removeClass("collapsed");
      $(".drawer-content").addClass("show");
      window.sessionStorage.removeItem("setOpenDisruptor");
    }
    if(HCPOffer === "HCP"){
      $(".hcp-drawer-title-wrapper").removeClass("collapsed");
      $(".hcp-drawer-content").addClass("show");
      $(".hcp-drawer-title-wrapper").css('margin-top', "30px");
      window.sessionStorage.removeItem("setOpenDisruptor");
    }

  };
  /**
   *
   * @param {boolean} enableDigital
   * @param {string} uid
   * Method to Check the AddDoHome cookie base on user
   */

  setAddDOHomeCookie = (enableDigital, uid) => {
    let lp;
    let lc = ABBOTT.cookie("AddDOHome");

      if (lc) {
        lp = JSON.parse(lc);
        if (lp.status) {
          if (lp.UID === uid) {
            this.setOpenDisruptor(uid, false);
          } else {
            this.setOpenDisruptor(uid, true);
          }
        } else {
          if (lp.UID !== uid) {
            this.setOpenDisruptor(uid, true);
          }
        }
      } else {
        this.setOpenDisruptor(uid, true);
      }
  };
  /**
   *
   * @param {string} uid
   * @param {boolean} isOpenDisruptor
   * Method to set AddDOHome cookie to open/close collapse
   */
  setOpenDisruptor = (uid, isOpenDisruptor) => {
    let cookieConfig = {
      path: "/",
      domain: "similac.com",
      expires: 30
    };
    let DOJson = {
      UID: uid,
      status: isOpenDisruptor
    };
    this.setState({
      openDisruptor: isOpenDisruptor
    });
    ABBOTT.cookie("AddDOHome", JSON.stringify(DOJson), cookieConfig);
  };
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

    makeCall(ajaxConfig).then(
      results => {
        let lc = ABBOTT.cookie("profile");
        let lp = JSON.parse(lc);
        if (results.status) {
          this.setState({
            profileInfo: results.response
          });
          const {
            response: {
              userInfo: { userType, uid } = {},
              offerPreferenceInfo,
              children
            } = {}
          } = results;
          const cookieUserType = ABBOTT.utils.getActualUserType();
          if ("similac-ecom" === userType) {
            const { lineOne = "", lineTwo ="", country = "", city = "", state = "", zipCode = "" } = this.state.profileInfo && this.state.profileInfo.addresses && this.state.profileInfo.addresses[0];
            /**set cookie expiry time to one day */
            let cookieConfig = {
              path: '/',
              domain: "similac.com",
            };
            ABBOTT.cookie("profile", JSON.stringify({ ...lp, lineOne, lineTwo, country, city, state, zipCode }), cookieConfig);
            this.setState({
              showSignUp: true
            });


          } else {
            this.setState({
              showSignUp: false
            });
          }

          if (cookieUserType !== userType) {
            ABBOTT.utils.profileUpdate("userType", userType);
          }

          let childHasOffer = false;
          results.response.children.forEach((item,key) => {
            if(children[key].offers && children[key].offers.length > 0) {
              childHasOffer = true;
            }
            let filteredArr = results.response.children[key].offers && 
                results.response.children[key].offers.filter((offerItem, offerIndex) => {
                return !offerItem.offerUsedDate;
              
              }).reduce((unique,index) => {
             if(!unique.some(obj => obj.offerCode === index.offerCode)) {
             unique.push(index);
             }
             return unique;
             },[]);
             
              results.response.children[key].offers = filteredArr; 
            });

          if (
            offerPreferenceInfo.retailer &&
            (offerPreferenceInfo.retailer.toLowerCase() === "tbuniversal" || offerPreferenceInfo.retailer.toLowerCase() === "tpg" || offerPreferenceInfo.retailer.toLowerCase() === "amazon" || offerPreferenceInfo.retailer.toLowerCase() === "target")
          ) {
              this.setState({DOShowThanksMessage:(!childHasOffer)?true:false})
              this.setState({ doOpted: true },  () => {
                this.getDisruptor();
              });
          } 

          let sortedChildren = results.response.children
            ?.sort(({ birthDate: b1 = "" }, { birthDate: b2 = "" }) => {
              return new Date(b1) - new Date(b2);
            })
            .filter(({ deleted = false }) => !deleted);

          let sortedChildrenNew = [],
            sortedChildrenExpiringSoonAssigned = [],
            sortedChildrenExpiringSoonUnassigned = [],
            sortedChildrenExpiringLater = [];
            let cc_read=window.localStorage.getItem("selectedCouponCode");
            let showCouponCodes = false;
          results.response.children?.map(child => {
            child.offers?.map(offer => {
              if (offer.type.toLowerCase() === "newoffer") {
                sortedChildrenNew.push(offer);
              } else if (
                offer.type.toLowerCase() === "expiringsoon" &&
                offer.offerRetailer.toLowerCase() !== "tbuniversal"
              ) {
                sortedChildrenExpiringSoonAssigned.push(offer);
              } else if (
                offer.type.toLowerCase() === "expiringsoon" &&
                offer.offerRetailer.toLowerCase() === "tbuniversal"
              ) {
                sortedChildrenExpiringSoonUnassigned.push(offer);
              } else if (offer.type.toLowerCase() === "expiringlater") {
                sortedChildrenExpiringLater.push(offer);
              }	
            });	
          });

        //Show HCP offers if users do Oasis login OR direct login who have claimed HCP offer 	
        if(lp.oasisEmail && lp.userType !== "similac-ecom" && results.response.hcpInfo && results.response.hcpInfo.offers && results.response.hcpInfo.offers.length > 0){
          this.getDisruptor("HCP");
          showCouponCodes = true;
          results.response.hcpInfo.offers.map(offer => {
            offer.isHcpOffer = true;   
           if (offer.type.toLowerCase() === "newoffer" && offer.offerClaimDate) {
               sortedChildrenNew.push(offer);
             } else if (
               offer.type.toLowerCase() === "expiringsoon" &&
               offer.offerRetailer.toLowerCase() !== "tbuniversal" && offer.offerClaimDate
             ) {
               sortedChildrenExpiringSoonAssigned.push(offer);
             } else if (
               offer.type.toLowerCase() === "expiringsoon" &&
               offer.offerRetailer.toLowerCase() === "tbuniversal" && offer.offerClaimDate
             ) {
               sortedChildrenExpiringSoonUnassigned.push(offer);
             } else if (offer.type.toLowerCase() === "expiringlater" && offer.offerClaimDate) {
               sortedChildrenExpiringLater.push(offer);
             }
           });
         } 
           
           this.setState({
             newOfferSorted: this.getUniqueOffers(sortedChildrenNew)?.sort(
               ({ offerExpiryDate: b1 = "" }, { offerExpiryDate: b2 = "" }) => {
                 return new Date(b1) - new Date(b2);
               }
             )
           });
           this.setState({
             expiringSoonOfferSorted: this.getUniqueOffers(sortedChildrenExpiringSoonAssigned)
               ?.sort(
                 (
                   { offerExpiryDate: b1 = "" },
                   { offerExpiryDate: b2 = "" }
                 ) => {
                   return new Date(b1) - new Date(b2);
                 }
               )
               .concat(
                this.getUniqueOffers(sortedChildrenExpiringSoonUnassigned)?.sort(
                   (
                     { offerExpiryDate: b1 = "" },
                     { offerExpiryDate: b2 = "" }
                   ) => {
                     return new Date(b1) - new Date(b2);
                   }
                 )
               )
           });
           this.setState({
             expiringLaterOfferSorted: this.getUniqueOffers(sortedChildrenExpiringLater)?.sort(
               ({ offerExpiryDate: b1 = "" }, { offerExpiryDate: b2 = "" }) => {
                 return new Date(b1) - new Date(b2);
               }
             )
           });

           this.state.expiringSoonOfferSorted.forEach(element => {
             element["isActiveCode"] = true;
           });
 
           this.state.expiringLaterOfferSorted.forEach(element => {
             element["isActiveCode"] = true;
           });
 
           if (
             this.state.newOfferSorted.length > 0 ||
             this.state.expiringLaterOfferSorted.length > 0
           ) {
             this.setState({ showNewOffer: true });
             if(this.state.newOfferSorted.length > 0)
           {
             this.setState({ expiringOfferCount: true });
             
           }
           }
           
           if (this.state.expiringSoonOfferSorted.length > 0) {
             this.setState({ showExpiringOffers: true });
           }

          let youngChild;
          if (sortedChildren.length) {
            youngChild = sortedChildren[sortedChildren.length - 1];
          }

          if (youngChild) {
            let birthDate = moment(youngChild.birthDate).format("MM/DD/YYYY");
            let currentDate = moment();
            let childweeks = currentDate.diff(birthDate, "weeks");
            // show digital offer for the below child weeks
            if (childweeks >= -39 && childweeks <= 64) {
              this.setState({
                showDigital: true,
                showCoupons: true
              });
            }
          }
          let actChild = results.response;
          this.setAddDOHomeCookie(
            offerPreferenceInfo.retailer ? true : false,
            uid
          );
          this.setThankOffer(offerPreferenceInfo);
          actChild.children?.map(child => {
            //show offer coupons if offers is present in children node
            if (child.offers?.length > 0) {
                showCouponCodes = true;
              child.offers.map(offer => {
                this.checkShowDisruptor(offer);
                this.checkDuplicateOffer(offer, offerPreferenceInfo.offerCode);
              });
            } else {
              if (
                offerPreferenceInfo.retailer &&
                offerPreferenceInfo.offerCode &&
                offerPreferenceInfo.offerExpiryDate
              ) {
                this.checkShowDisruptor(offerPreferenceInfo);
              }
            }
          });
          if(showCouponCodes){
            this.setState({
              showCoupons: true,
            })
          }
        }
         if(results.errorCode === 500 && lp.oasisEmail && (lp.oasisEmail.toLowerCase() === lp.email.toLowerCase() || (lp.contactEmail && lp.oasisEmail.toLowerCase() ===lp.contactEmail.toLowerCase() ))){
          const dataValue = getMessageForReg("OASIS-500");
          $("#template.global-error p").html(dataValue);
          $("#template").show();
          $("html, body").animate({ scrollTop: 0 }, "slow");
        } else if (results.errorCode === 500) {
          const dataValue = getMessageForReg("GEN_ERR");
          $("#template.global-error p").html(dataValue);
          $("#template").show();
        } 
        else {
          this.setState({ formError: getMessageForReg("GEN_ERR") });
        }
      },
      fail => {
        if (results.errorCode === 500) {
          const dataValue = getMessageForReg("GEN_ERR");
          $("#template.global-error p").html(dataValue);

          $("#template").show();
        } else {
          this.setState({ formError: getMessageForReg("GEN_ERR") });
        }
      
      });
    
  };

  fnBrowserDetect = () => {
    let userAgent = navigator.userAgent;
    let browserName;
    if (userAgent.match(/chrome|chromium|crios/i)) {
      browserName = "chrome";
    } else {
      browserName = "safari";
    }
    return browserName;
  }

  getUniqueOffers = (offersData) =>{
    let filteredArr = [];
    filteredArr =  offersData && offersData.reduce((unique,index) => {
      if(!unique.some(obj => obj.offerCode === index.offerCode)) {
        unique.push(index);
      }
      return unique;
    },[]);

    return filteredArr;
  }

  checkShowDisruptor = offer => {
    if (!this.state.showDisruptor) {
      // calculate offer validity
      let endDate = moment(offer.offerExpiryDate);
      let currentDate = moment();
      let validDays = endDate.diff(currentDate, "days");
      if (validDays >= 0) {
        this.setState(
          {
            showDisruptor: true
          },
          () => {
            this.getDisruptor();
          }
        );
      }
    }
  };

  /*show thank you offer*/
  setThankOffer = offerPreferenceInfo => {
    if (offerPreferenceInfo.offerExpiryDate) {
      // calculate offer validity
      let endDate = moment(offerPreferenceInfo.offerExpiryDate);
      let currentDate = moment();
      let validDays = endDate.diff(currentDate, "days");

      if (
        offerPreferenceInfo.offerRetailer &&
        offerPreferenceInfo.offerCode &&
        validDays >= 0
      ) {
        this.setState({
          showCoupons: true
        });
      }
    }
  };

  /** Check duplicate token
   */
  checkDuplicateOffer = (offer, offerPreferenceInfoOfferCoded) => {
    if (!this.state.duplicateOffer) {
      if (
        offer.offerCode &&
        offer.offerCode === offerPreferenceInfoOfferCoded
      ) {
        this.setState({
          duplicateOffer: true
        });
      }
    }
  };

  /**
   * Method called on selecting update link in retailer section
   */
  updateRetailer = () => {
    const { offerPreferenceInfo } = this.state.profileInfo;
    // if greater than 30 days
    let endDate = moment(offerPreferenceInfo.retailerOptDate);
    let currentDate = moment();
    let retailerDays = currentDate.diff(endDate, "days");
    if (retailerDays > 30) {
      window.location.href = this.aemData.retailer.retailerPageUrl;
    } else {
      // else show error
      this.setState({
        retailerError: true
      });
    }
  };

  

  /**
   * Method called on redeem offer button is selcted in offer card
   * @param {string} url
   * @param {string} code
   */
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
  
  submitMarkRedeem = (newOfferExpiryOffer, url, code, offer, index) => {
    const { expiringSoonOfferSorted, expiringLaterOfferSorted, newOfferSorted } = this.state;
    switch (newOfferExpiryOffer) {
      case "expiringSoonOfferSorted":
        Object.keys(expiringSoonOfferSorted).forEach((item) =>{
          if(item == index){
            expiringSoonOfferSorted[item].isActiveCode = false;
          } else {
            expiringSoonOfferSorted[item].isActiveCode = true;
          }
        })
        Object.keys(expiringLaterOfferSorted).forEach((item) =>{
            expiringLaterOfferSorted[item].isActiveCode = true;
        })
        this.setState({ ...this.state });
        break;
      case "expiringLaterOfferSorted":
        Object.keys(expiringLaterOfferSorted).forEach((item) =>{
          if(item == index){
            expiringLaterOfferSorted[item].isActiveCode = false;
          } else {
            expiringLaterOfferSorted[item].isActiveCode = true;
          }
        })
        Object.keys(expiringSoonOfferSorted).forEach((item) =>{
          expiringSoonOfferSorted[item].isActiveCode = true;
      })
        this.setState({ ...this.state });
        break;
    }
  };

  isEnableOffer = (newOfferExpiryOffer, offer, index) => {
    switch (newOfferExpiryOffer) {
      case "expiringSoonOfferSorted":
        this.state.expiringSoonOfferSorted[index][
          "isActiveCode"
        ] = !offer.isActiveCode;
        this.setState({ ...this.state });
        break;
      case "expiringLaterOfferSorted":
        this.state.expiringLaterOfferSorted[index][
          "isActiveCode"
        ] = !offer.isActiveCode;
        this.setState({ ...this.state });
        break;
    }
  };

  offerActivated = offers => {
    let formData = {
      category: "markRedeem",
      offerPreferenceInfo: {
        offerCode: offers.offerCode
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
        
        window.location.reload();
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

  updateDigitalOffer = _values => {
    var SSM_USER_TYPE = "similac-ssm"; // ecom user similac-ecom
    if (ABBOTT.utils.getActualUserType() !== SSM_USER_TYPE) {
      ABBOTT.utils.profileUpdate("userType", SSM_USER_TYPE);
    }
    this.setState({
      showDigitalMsg: true,
      completeProfilePage: false
    });
  };

  render() {
    const {
      retailerError,
      showCoupons,
      showDigital,
      showDigitalMsg,

      showPaperMsg,
      zeroActiveChild,
      showOffer,
      completeProfilePage,
      showSignUp,
      disruptorHTML,
      hcpDisruptorHTML,
      showDisruptor,
      duplicateOffer,
      showNewOffer,
      showExpiringOffers,
      doOpted,
      newOfferCount,
      expiringOfferCount,
      DOShowThanksMessage,
      newOfferSorted,
      expiringSoonOfferSorted,
      expiringLaterOfferSorted,
      switchAuto
    } = this.state;
    const { offerPreferenceInfo, children } = this.state.profileInfo;
    const { currentOffers, retailer, purchaserOnlyOffer = {} } = this.aemData;
    const retailer_available =
      offerPreferenceInfo !== undefined && offerPreferenceInfo.retailer
        ? offerPreferenceInfo.retailer
        : "";
    const completePageData = {
      ...purchaserOnlyOffer,
      href: ""
    };
    const showComplete = e => {
      e.preventDefault();
      this.setCompletePage(true);
    };
    const switchToDigital = e => {
      if(e){
      e.preventDefault();
      }

      let formData = {
        category: "digitalOffer",
        offerPreferenceInfo: {
          retailer: "TBUNIVERSAL",
          enableDigital: true,
          channel: "website"
        }
      };
      let ajaxConfig = {
        headers: {
          "x-id-token": ABBOTT.utils.getSessionInfo()
        }
      };
      sendFormData(this.aemData.actionPath, formData, ajaxConfig)
        .then(async results => {
          const {errorCode, status } = results;
          if (errorCode === 0 && status === true) {
            dataLayer.push({ 
              event: "ga-custom-events", 
              eventCategory: "callout", 
              eventAction: "click",  
              eventLabel: "offers_convenient-savings_switch-to-digital-offers-promo-offer-page" 
            });
            window.sessionStorage.setItem("setOpenDisruptor",true);
            window.location.reload();
          } else {
            const dataValue = getMessageForReg(errorCode);
            $("#template.global-error p").html(dataValue);
            $("#template").show();
            $("html, body").animate({ scrollTop: 0 }, "slow");
          }
        })
        .catch(([jqXHR = {}]) => {
          const dataValue = getMessageForReg("GEN_ERR");
          $("#template.global-error p").html(dataValue);
          $("#template").show();
        });
    };

let offerWord = newOfferSorted.length > 1 ? this.aemData.newOfferLabel1 +"s " : this.aemData.newOfferLabel1 + " ";

    return (
      <>
        {completeProfilePage? (
          <CompleteProfile updateDigitalOffer={this.updateDigitalOffer} />
        ) : (
          <>
            <h1 className="profile__title">{this.aemData.title}</h1>
            {showCoupons && doOpted && (
              <>
                <div
                  className="disruptor-v2"
                  dangerouslySetInnerHTML={{ __html: disruptorHTML }}
                ></div>
              </>
            )}
             {hcpDisruptorHTML !== "" && !showSignUp && (
              <>
                <div
                  className="disruptor-v2"
                  dangerouslySetInnerHTML={{ __html: hcpDisruptorHTML }}
                ></div>
              </>
            )}
            {doOpted && DOShowThanksMessage && (
              <>
                <p className="font-roboto-reg">
                  {this.aemData.DOThanksMessage}
                </p>
                <hr class="text-smalt-hr"/>
              </>
            )}
            {/* current offers */}
          
            {showCoupons && (
              <>
                <p className="font-roboto-reg text-smalt">
                {(showExpiringOffers || (showNewOffer && expiringOfferCount)) && this.aemData.newOfferLabel + " "}
                
                  {!showPaperMsg &&
                    (showNewOffer && expiringOfferCount) &&
                    
                    " " +
                      newOfferSorted.length +
                      " " +
                      offerWord}
                  {showExpiringOffers && (showNewOffer && expiringOfferCount) && this.aemData.expiringOfferLabel + " "}
                  <span className="color-tangerline">
                    {!showPaperMsg &&
                      showExpiringOffers &&
                      
                      expiringSoonOfferSorted.length +
                        " " +
                        this.aemData.expiringOfferLabel1}
                  </span>
                </p>
                </>)}
                {showCoupons && showNewOffer &&(
              <>
                <p className="profile__sub-title">{currentOffers.title}</p>

                <p className="font-roboto-reg text-smalt">
                  {!showPaperMsg &&
                    showCoupons &&
                    currentOffers.redeemOfferMessage}
                </p>
              </>
            )}
            {/* Paper offer message shipping address link */}
            {showPaperMsg && (
              <>
                <p className="font-roboto-reg text-smalt">
                  {currentOffers.thanksLabel}
                </p>
                <p className="font-roboto-reg text-smalt">
                  {currentOffers.paperMessage}
                </p>
                <div className="profile__border-bt-grey">
                  <a
                    className="offers__link text-tangerine"
                    href={currentOffers.shippingLink}
                  >
                    {currentOffers.shippingLabel}
                  </a>
                </div>
              </>
            )}
            {showCoupons && (
              <>
                <div className="row mx-0 offer-cards-wrapper">
                  {this.state.newOfferSorted.map((offer,index) => {
                    
                    if(window.localStorage.getItem("selectedCouponCode") !== offer.offerCode){
                    return (
                      <>
                      <OfferCard
                        offerData={offer}
                        offerLabel={currentOffers}
                        retailerLabel={retailer}
                        storeCoupon={(url, code) =>
                          this.storeCoupon(url, code)
                        }
                        submitMarkRedeem={(url, code) =>
                          this.submitMarkRedeem(
                            "newOfferSorted",
                            url,
                            code,
                            offer,
                            index
                          )
                        }
                        />
                      </>
                    );
                  }
                    
                  })}
                </div>
                <p
                  className={`profile__border-smalt ${
                    retailer_available && zeroActiveChild ? "" : "d-none"
                  }`}
                ></p>
              </>
            )}
            {showCoupons && (
              <>
                <div className="row mx-0 offer-cards-wrapper">
                  {this.state.expiringLaterOfferSorted.map((offer, index) => {
                    if (offer.offerRetailer.toLowerCase() === "target") {
                      return (
                        <>
                          {offer.isActiveCode ? (
                            <TargetCoupon
                              offerData={offer}
                              offerLabel={currentOffers}
                              retailerLabel={retailer}
                              aemData={this.aemData.actionPath}
                              barCode={this.aemData.barCodeGenerate}
                              submitMarkRedeem={(url, code) =>
                                this.submitMarkRedeem(
                                  "expiringLaterOfferSorted",
                                  url,
                                  code,
                                  offer,
                                  index
                                )
                              }
                              showMark={true}
                            />
                          ) : (
                            <Overlay
                              currentOffers={currentOffers}
                              isEnableOffer={() =>
                                this.isEnableOffer(
                                  "expiringLaterOfferSorted",
                                  offer,
                                  index
                                )
                              }
                              offerActivated={() => this.offerActivated(offer)}
                            />
                          )}
                        </>
                      );
                    } else if (
                      offer.offerRetailer.toLowerCase() === "amazon" ||
                      offer.offerRetailer.toLowerCase() === "tpg"
                    ) {
                      return (
                        <>
                          {offer.isActiveCode ? (
                            <OfferCard
                              offerData={offer}
                              offerLabel={currentOffers}
                              retailerLabel={retailer}
                              submitRedeem={(url, code) =>
                                this.submitRedeem(url, code)
                              }
                              submitMarkRedeem={(url, code) =>
                                this.submitMarkRedeem(
                                  "expiringLaterOfferSorted",
                                  url,
                                  code,
                                  offer,
                                  index
                                )
                              }
                              showMark={true}
                            />
                          ) : (
                            <Overlay
                              currentOffers={currentOffers}
                              isEnableOffer={() =>
                                this.isEnableOffer(
                                  "expiringLaterOfferSorted",
                                  offer,
                                  index
                                )
                              }
                              offerActivated={() => this.offerActivated(offer)}
                            />
                          )}
                        </>
                      );
                    }
                  })}
                </div>
                <p
                  className={`profile__border-smalt ${
                    retailer_available && zeroActiveChild ? "" : "d-none"
                  }`}
                ></p>
              </>
            )}
            {showCoupons && showExpiringOffers && (
              <>
                <p className="profile__sub-title">
                  {currentOffers.titleExpire}
                </p>

                <p className="font-roboto-reg text-smalt">
                  {!showPaperMsg &&                     
                    showCoupons &&
                    currentOffers.redeemExpireOfferMessage}
                </p>
              </>
            )}
            {showCoupons && (
              <>
                <div className="row mx-0 offer-cards-wrapper">
                  {this.state.expiringSoonOfferSorted.map((offer, index) => {
                    if (offer.offerRetailer.toLowerCase() === "target") {
                      return (
                        <>
                          {offer.isActiveCode ? (
                            <TargetCoupon
                              offerData={offer}
                              offerLabel={currentOffers}
                              retailerLabel={retailer}
                              aemData={this.aemData.actionPath}
                              barCode={this.aemData.barCodeGenerate}
                              submitMarkRedeem={(url, code) =>
                                this.submitMarkRedeem(
                                  "expiringSoonOfferSorted",
                                  url,
                                  code,
                                  offer,
                                  index
                                )
                              }
                              showMark={true}
                            />
                          ) : (
                            <Overlay
                              currentOffers={currentOffers}
                              isEnableOffer={() =>
                                this.isEnableOffer(
                                  "expiringSoonOfferSorted",
                                  offer,
                                  index
                                )
                              }
                              offerActivated={() => this.offerActivated(offer)}
                            />
                          )}
                        </>
                      );
                    } else {
                      return (
                        <>
                          {offer.isActiveCode ? (
                            <OfferCard
                              offerData={offer}
                              offerLabel={currentOffers}
                              retailerLabel={retailer}
                              submitRedeem={(url, code) =>
                                this.submitRedeem(url, code)
                              }
                              submitMarkRedeem={(url, code) =>
                                this.submitMarkRedeem(
                                  "expiringSoonOfferSorted",
                                  url,
                                  code,
                                  offer,
                                  index
                                )
                              }
                              showMark={true}
                            />
                          ) : (
                            <Overlay
                              currentOffers={currentOffers}
                              isEnableOffer={() =>
                                this.isEnableOffer(
                                  "expiringSoonOfferSorted",
                                  offer,
                                  index
                                )
                              }
                              offerActivated={() => this.offerActivated(offer)}
                            />
                          )}
                        </>
                      );
                    }
                  })}
                </div>
                <p
                  className={`profile__border-smalt ${
                    retailer_available && zeroActiveChild ? "" : "d-none"
                  }`}
                ></p>
              </>
            )}
            {/* digital offer */}
            {showOffer && showSignUp ? (
              <OfferCardHori {...completePageData} onClick={showComplete} />
            ) : null}
            {currentOffers.offerList.map((offer, index) => {
           
              if (index === 0) {
                if (offerPreferenceInfo?.retailer) {
                  return <></>;
                }
                if (showDigital && !doOpted && !showPaperMsg ) {
                   if(switchAuto){
                    this.setState({
                      "switchAuto":false
                    }, switchToDigital());
                  }
                  else{
                  return <OfferCardHori {...offer} onClick={switchToDigital} />;
                  }

                }
              } else {
                return <OfferCardHori {...offer} />;
              }
            })}
            
            <div className="my-3_75">
              {showSignUp && (
                <>
                  <p
                    className="footnote font-roboto-reg text-charcoal"
                    dangerouslySetInnerHTML={{
                      __html: this.aemData.signUpNoteLabel
                    }}
                  ></p>
                </>
              )}
              <p
                className="footnote font-roboto-reg text-charcoal"
                dangerouslySetInnerHTML={{ __html: this.aemData.noteLabel }}
              ></p>
            </div>
          </>
        )}
      </>
    );
  }
}
