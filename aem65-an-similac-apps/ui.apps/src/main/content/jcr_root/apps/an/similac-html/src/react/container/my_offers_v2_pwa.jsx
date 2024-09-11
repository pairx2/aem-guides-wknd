import React from "react";
import moment from "moment";
import Dropdown from "../components/Dropdown";
import { makeCall } from "../common/api";
import OfferCard from "../components/OfferCardV2PWA";
import TargetCoupon from "../components/TargetCouponV2PWA";
import { sendFormData, getErrorMessage, getMessageForReg } from "../common/api";
import Overlay from "../components/Markredeem";
import UnconvertedNonDo from "../container/unconverted_non_do_pwa";
import UnconvertedNonDoFooter from "../container/unconverted_non_do_footer_pwa";
import ConvertedDo from "../container/converted_do_pwa";
import GetMorePointsCard from "../container/get_more_points_card";


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
      allTypeOffer: {},
      allPreserveOffer: {},
      showNewOffer: false,
      showExpiringOffers: false,
      showCoupons: false,
      showPaperMsg: false,
      zeroActiveChild: false,
      duplicateOffer: false,
      DOShowThanksMessage: "",
      expiringOfferCount: "",
      switchAuto: false,
      isNonDigitalUser: false,
      isGetMoreDisplay: "",
      isNonDoWithNoOffer: false,
      isConvertedDo: false,
      toggleNonDoPopup: false,
      isLoyaltyScanBonusesEarned: false,
      isChildDoEligible: false
    };
  }

  
  navigateToSmsPage = () => {
    const cookieConfig = {
      path: "/",
      domain: "similac.com",
      expires: 1000
    };
    ABBOTT.cookie("pwa_sms", JSON.stringify({ pwa_sms: true }), cookieConfig);
  }

  /**
   * Call on component load
   */
  componentDidMount() {
    let lc = ABBOTT.cookie("profile");
    let lp = JSON.parse(lc);
    
    let secondaryEmail = lp.contactEmail ? lp.contactEmail.toLowerCase() : "";
    if (!lp.oasisBannerClosed && lp.oasisEmail && (lp.oasisEmail.toLowerCase() !== lp.email.toLowerCase() && lp.oasisEmail.toLowerCase() !== secondaryEmail)) {
      $("#template.global-error p").html(this.aemData.currentOffers.hcpInfo.errorText).addClass('error-pr-20');
      $("#template").addClass("oasis-error-box").show();
      $("html, body").animate({ scrollTop: 0 }, "slow");
    }
    const userType = ABBOTT.utils.getActualUserType();
    
    if (window.sessionStorage.getItem('switchToDigital')) {
      this.setState({
        isConvertedDo: true,
      });
      this.setState({
        isNonDoWithNoOffer: false,
      });
    }
    window.sessionStorage.removeItem('assignedRetailer');
    if ("similac-ecom" != lp.userType) {
      let hashValue = window.location.hash.slice(1);
      window.location.hash = "";
      if (hashValue === "thanksPaper") {
        this.setState({
          showPaperMsg: true
        });
      }
    }
    this.getProfileInfo();
    $("#overlay").show();
    setTimeout(() => {
      $("#overlay").css('display', 'none');
    }, 4000);
    //gtm tag
    ABBOTT.gtm.buildAndPush.formTracking(
      "pwa-load",
      "load",
      "pwa_start-url"
    );

    let checkTabNameCookie = window.sessionStorage.getItem("tabName");
    if (checkTabNameCookie == 'rewards') {
      $('.nav-tabs a:eq(1)').tab('show');
      window.sessionStorage.removeItem("tabName");
    }

    $('#locate-qr-code-link').click(function (e) {
      window.sessionStorage.setItem("tabName", "rewards");
    })
  }

  componentWillUnmount() {
    clearTimeout(this.landingToRedirect);
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
    makeCall(ajaxConfig).then(
      results => {
        let lc = ABBOTT.cookie("profile");
        let lp = JSON.parse(lc);
        if (results.status) {
          let activeChildNode = results.response?.children.findIndex(({ activeChild = true }) => activeChild);
          if (typeof activeChildNode !== undefined) {
            if (results?.response?.children[activeChildNode]?.loyaltyScanBonusesEarned > 1) {
              this.setState({
                isLoyaltyScanBonusesEarned: true,
              });
            }
            //Cookie for scan data start
            let loyaltyScanBonusesEarnedState = 0;
            let loyaltyScansSinceLastRewardState = 0;

            loyaltyScanBonusesEarnedState = results.response?.children[activeChildNode]?.loyaltyScanBonusesEarned;
            loyaltyScansSinceLastRewardState = results.response?.children[activeChildNode]?.loyaltyScansSinceLastReward;
            let gpasScansTodayLimit = results.response.userInfo.gpasScansToday;
            let cookieConfig = {
              path: '/',
              domain: "similac.com",
            };
            ABBOTT.cookie(
              "scan",
              JSON.stringify({
                'loyaltyScanBonusesEarnedState': loyaltyScanBonusesEarnedState,
                'loyaltyScansSinceLastRewardState': loyaltyScansSinceLastRewardState,
                'gpasScansTodayLimit': gpasScansTodayLimit,
              }),
              cookieConfig
            );
          //Cookie for scan data ends
          }
          var optinSMSIndex;
          if (results.response && results.response.optPreferences)
            optinSMSIndex = results.response.optPreferences.filter(x => x.channel?.includes("SMS"));
          var optinSMSObj, optinSMSDate;
          if (optinSMSIndex.length > 0) {
            if (optinSMSIndex.length > 1) {
              var sortedObj = optinSMSIndex.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
              });
              optinSMSObj = sortedObj[0];
            } else {
              optinSMSObj = optinSMSIndex[0];
            }
            optinSMSDate = new Date(optinSMSObj['date']);
          }

          var getLegacyOptStatusDate = new Date('2023-01-15');
          if (results.response && results.response.optPreferences && results.response.offerPreferenceInfo?.retailer == 'TBUNIVERSAL') {
            let smsFlag;
            let smsSeenUser = results.response.userInfo && results.response.userInfo.userName ? results.response.userInfo.userName : "";
            let smsCookie = ABBOTT.cookie("pwaNotificationStatus"+ smsSeenUser);
            if (smsCookie) {
              smsFlag = JSON.parse(smsCookie);
            }
            var checkConvertedDo = window.sessionStorage.getItem('convertedToDo');
            
            if ((!smsFlag || smsFlag == undefined) && !checkConvertedDo &&
              ((results.response.contacts?.length == 0) || (results.response.contacts > 0 && results.response.contacts[0].number == "")
                || (results.response.contacts?.length > 0 && results.response.contacts[0].number != "" && optinSMSIndex.length > 0 && optinSMSDate && optinSMSDate.getTime() < getLegacyOptStatusDate.getTime())
                || (results.response.contacts?.length > 0 && results.response.contacts[0].number != "" && optinSMSIndex.length < 1)
              )) {
              this.navigateToSmsPage();
            }
          }
           else if (results.response && results.response.optPreferences && !results.response.offerPreferenceInfo.hasOwnProperty('retailer')) {
            this.setState({
              isNonDigitalUser: true
            });
            this.setState({
              isNonDoWithNoOffer: true
            });
          }
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
            const { lineOne = "", lineTwo = "", country = "", city = "", state = "", zipCode = "" } = this.state.profileInfo && this.state.profileInfo.addresses && this.state.profileInfo.addresses[0];
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
          let childHasOffer = false;
          results.response.children.forEach((item,key) => {
            if(children[key].offers && children[key].offers.length > 0) {
              childHasOffer = true;
            }
          });

          if (cookieUserType !== userType) {
            ABBOTT.utils.profileUpdate("userType", userType);
          }

          if (
            offerPreferenceInfo.retailer &&
            (offerPreferenceInfo.retailer.toLowerCase() === "tbuniversal" || offerPreferenceInfo.retailer.toLowerCase() === "tpg" || offerPreferenceInfo.retailer.toLowerCase() === "amazon" || offerPreferenceInfo.retailer.toLowerCase() === "target")
          ) {
            this.setState({DOShowThanksMessage:(!childHasOffer)?true:false});
          }

          results.response.children.forEach((item, key) => {
            let filteredArr = results.response.children[key].offers &&
              results.response.children[key].offers.filter((offerItem, offerIndex) => {
                return !offerItem.offerUsedDate;

              }).reduce((unique, index) => {
                if (!unique.some(obj => obj.offerCode === index.offerCode)) {
                  unique.push(index);
                }
                return unique;
              }, []);

            results.response.children[key].offers = filteredArr;
          });

          let sortedChildren = results.response.children
            ?.sort(({ birthDate: b1 = "" }, { birthDate: b2 = "" }) => {
              return new Date(b1) - new Date(b2);
            })
            .filter(({ deleted = false }) => !deleted);

          let sortedChildrenNew = [],
            sortedChildrenExpiringSoonAssigned = [],
            sortedChildrenExpiringSoonUnassigned = [],
            sortedChildrenExpiringLater = [];
          let cc_read = window.localStorage.getItem("selectedCouponCode");
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

          this.setState({
            allTypeOffer: ((this.getUniqueOffers(sortedChildrenNew)?.sort(
              ({ offerExpiryDate: b1 = "" }, { offerExpiryDate: b2 = "" }) => {
                return new Date(b1) - new Date(b2);
              }
            ))
              .concat(this.getUniqueOffers(sortedChildrenExpiringLater)?.sort(
                ({ offerExpiryDate: b1 = "" }, { offerExpiryDate: b2 = "" }) => {
                  return new Date(b1) - new Date(b2);
                }
              ))
              .concat(this.getUniqueOffers(sortedChildrenExpiringSoonAssigned)
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
                ))
            )
          })
          //Preserve state
          this.setState({
            allPreserveOffer: ((this.getUniqueOffers(sortedChildrenNew)?.sort(
              ({ offerExpiryDate: b1 = "" }, { offerExpiryDate: b2 = "" }) => {
                return new Date(b1) - new Date(b2);
              }
            ))
              .concat(this.getUniqueOffers(sortedChildrenExpiringLater)?.sort(
                ({ offerExpiryDate: b1 = "" }, { offerExpiryDate: b2 = "" }) => {
                  return new Date(b1) - new Date(b2);
                }
              ))
              .concat(this.getUniqueOffers(sortedChildrenExpiringSoonAssigned)
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
                ))
            )
          })

          if (this.state.expiringSoonOfferSorted.length > 0) {
            this.state.expiringSoonOfferSorted.forEach(element => {
              element["isActiveCode"] = true;
            });
          }

          if (this.state.expiringLaterOfferSorted.length > 0) {
            this.state.expiringLaterOfferSorted.forEach(element => {
              element["isActiveCode"] = true;
            });
          }

          if (
            this.state.newOfferSorted.length > 0 ||
            this.state.expiringLaterOfferSorted.length > 0
          ) {
            this.setState({ showNewOffer: true });
            if (this.state.newOfferSorted.length > 0) {
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
            if (currentDate.diff(birthDate, "weeks") > 0) {
              birthDate = moment(birthDate).add(1, "day");
            }

            let childweeks = currentDate.diff(birthDate, "weeks");
            // show digital offer for the below child weeks
            if (childweeks >= -39 && childweeks <= 64) {
              this.setState({
                showCoupons: true,
                isChildDoEligible: true
              });
            }
          }
          let actChild = results.response;
          this.setThankOffer(offerPreferenceInfo);
          actChild.children?.map(child => {
            //show offer coupons if offers is present in children node
            if (child.offers?.length > 0) {
              showCouponCodes = true;
              child.offers.map(offer => {
                this.checkDuplicateOffer(offer, offerPreferenceInfo.offerCode);
              });
            }
          });
          if (showCouponCodes) {
            this.setState({
              showCoupons: true,
            })
          }
        }
        if (results.errorCode === 500 && lp.oasisEmail && (lp.oasisEmail.toLowerCase() === lp.email.toLowerCase() || (lp.contactEmail && lp.oasisEmail.toLowerCase() === lp.contactEmail.toLowerCase()))) {
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

  getUniqueOffers = (offersData) => {
    let filteredArr = [];
    filteredArr = offersData && offersData.reduce((unique, index) => {
      if (!unique.some(obj => obj.offerCode === index.offerCode)) {
        unique.push(index);
      }
      return unique;
    }, []);

    return filteredArr;
  }

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

  /** 
   * Check duplicate token
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
   * Method called on redeem offer button is selected in offer card
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
        Object.keys(expiringSoonOfferSorted).forEach((item) => {
          if (item == index) {
            expiringSoonOfferSorted[item].isActiveCode = false;
          } else {
            expiringSoonOfferSorted[item].isActiveCode = true;
          }
        })
        Object.keys(expiringLaterOfferSorted).forEach((item) => {
          expiringLaterOfferSorted[item].isActiveCode = true;
        })
        this.setState({ ...this.state });
        break;
      case "expiringLaterOfferSorted":
        Object.keys(expiringLaterOfferSorted).forEach((item) => {
          if (item == index) {
            expiringLaterOfferSorted[item].isActiveCode = false;
          } else {
            expiringLaterOfferSorted[item].isActiveCode = true;
          }
        })
        Object.keys(expiringSoonOfferSorted).forEach((item) => {
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
    sendFormData(this.aemData.actionPath, formData, ajaxConfig).then(result => {

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

  sortingCoupon = (type) => {
    const caseType = type.value.split(":");
    const { allTypeOffer,allPreserveOffer } = this.state;
    switch (caseType[0]) {
      case "offerExpiryDate":
        this.setState({
          allTypeOffer: allPreserveOffer?.sort(
            ({ offerExpiryDate: b1 = "" }, { offerExpiryDate: b2 = "" }) => {
              return new Date(b1) - new Date(b2);
            }
          )
        });
        break;
      case "offerValue":
        this.setState({
          allTypeOffer: allPreserveOffer?.sort(
            ({ offerValue: b1 = "" }, { offerValue: b2 = "" }) => {
              return b2 - b1;
            }
          )
        });
        break;
      case "type":
        this.setState({
          allTypeOffer: allPreserveOffer?.filter(
            ({offerRetailer}) =>{ return (offerRetailer !="TBUNIVERSAL")}
          )
        });
        break;
    }
  }

  render() {
    const {
      showCoupons,
      showPaperMsg,
      zeroActiveChild,
      duplicateOffer,
      showNewOffer,
      showExpiringOffers,
      expiringOfferCount,
      DOShowThanksMessage,
      newOfferSorted,
      expiringSoonOfferSorted,
      expiringLaterOfferSorted,
      allTypeOffer,
      allPreserveOffer,
      switchAuto,
      isNonDigitalUser,
      isGetMoreDisplay,
      isNonDoWithNoOffer,
      isConvertedDo,
      toggleNonDoPopup,
      isLoyaltyScanBonusesEarned,
      isChildDoEligible
    } = this.state;
    const { offerPreferenceInfo, children } = this.state.profileInfo;
    const { currentOffers, retailer, purchaserOnlyOffer = {}, scanModule } = this.aemData;

    const retailer_available =
      offerPreferenceInfo !== undefined && offerPreferenceInfo.retailer
        ? offerPreferenceInfo.retailer
        : "";
    const completePageData = {
      ...purchaserOnlyOffer,
      href: ""
    };

    const switchToDigital = e => {
      if (e) {
        e.preventDefault();
      }
      $('#pwa-confirm-non-do-popup').modal('hide');
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
          const { errorCode, status } = results;
          if (errorCode === 0 && status === true) {
            dataLayer.push({
              event: "ga-custom-events",
              eventCategory: "callout",
              eventAction: "click",
              eventLabel: "offers_convenient-savings_switch-to-digital-offers-promo-offer-page"
            });
            this.setState({
              isNonDigitalUser: false
            });
            window.sessionStorage.removeItem("nonDo");
            window.sessionStorage.setItem("switchToDigital", true);
            window.sessionStorage.setItem("convertedToDo",true);
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
          $('#pwa-confirm-non-do-popup').modal('hide');
        });
    };

    
    let offerWord = this.aemData.newOfferLabel1;
    const showScanModule = this.aemData.scanModule.showScanModule; 
    let scanModuleHeading = this.aemData.scanModule.scanModuleHeading;
    let scanModuleDesc = this.aemData.scanModule.scanModuleDesc;
    let scanModuleImage = this.aemData.scanModule.scanModuleImage;
    let scanButtonLabel = $('#savingsCameraBtnTxt').val();
    let scanButtonClass = 'savingsCameraBtn';
    let scanFacingMode = 'rear';
    let scanGtm = 'camera-scan|click|pwa_open-camera-scan-button_savings-tab';

    let congratsDesc1 = this.aemData.scanModule.congratsDesc1;
    let congratsDesc2 = this.aemData.scanModule.congratsDesc2;
    let congratsTitle = this.aemData.scanModule.congratsTitle;
    let congratsDisclaimer = this.aemData.scanModule.disclaimerTxt2;

    
    let switchToDigitalTitle = this.aemData.scanModule.switchToDigitalTitle;
    let switchToDigitalBtn = this.aemData.scanModule.goDigitalBtnTxt;
    let switchToDigitalDesc = this.aemData.scanModule.switchToDigitalDesc;
    let switchToDigitalDisclaimer = this.aemData.scanModule.disclaimerTxt1;
    let switchToDigitalDisclaimerWithOffer = this.aemData.scanModule.disclaimerTxt3;
    let offerTabFootnote = this.aemData.scanModule.offerTabFootnote;

    let checkswitchToDigitalCookie = window.sessionStorage.getItem('switchToDigital');
    let checkNoDoUserCookie = window.sessionStorage.getItem("nonDo");

    function showRewardsTab() {
      //Savings tab - 0, Rewards tab - 1, Account tab - 2
      $('.nav-tabs a:eq(1)').tab('show');
    }  
    
    confirmCouponPopup = () => {
      this.state.toggleNonDoPopup = true;
      this.setState({...this.state});
      setTimeout(() => {
        $('#pwa-confirm-non-do-popup').modal('show');
      }, 200);
    }

    return (
      <>
        {/**Pop up */}
        {this.state.toggleNonDoPopup ?
          <div className="modal fade" id="pwa-confirm-non-do-popup" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <img className="close" data-dismiss="modal" aria-label="Close" src="/content/dam/an/similac/global/icons/retailer/pwa-retailerpopup-close.png" />
                </div>
                <div className="modal-body">
                  <p className="pwa-popup-body-text">{this.aemData.scanModule.popUpTxt}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary pwa-popup pwa-popup-no" data-gtm="rewards|click|pwa_switch-to-digital_go-digital-confirm-no" data-dismiss="modal">{this.aemData.scanModule.popUpNoBtnTxt}</button>
                  <button type="button" onClick={() => switchToDigital()} className="btn btn-primary pwa-popup pwa-popup-yes" data-gtm="rewards|click|pwa_switch-to-digital_go-digital-confirm-yes">{this.aemData.scanModule.popUpYesBtnTxt}</button>
                </div>
              </div>
            </div>
          </div> : null
        }
        {/* zero offers */}
        {((newOfferSorted.length  < 1)  && (expiringSoonOfferSorted.length < 1)) && (
          <>
            <p className="ribbonZeroOfferPWA"></p>
          </>)}
          
        {/**Ribbon Code */}
        {showCoupons && (newOfferSorted.length > 0) && (
          <>
            <p className="ribbonPWA">
              {(showExpiringOffers || (showNewOffer && expiringOfferCount)) && this.aemData.newOfferLabel + " "}
              {!showPaperMsg &&
                (showNewOffer && expiringOfferCount) &&
                " " +
                newOfferSorted.length +
                " " +
                offerWord}
              {showExpiringOffers && (showNewOffer && expiringOfferCount) && " " + this.aemData.expiringOfferLabel + " "}

              {!showPaperMsg &&
                showExpiringOffers &&
                expiringSoonOfferSorted.length +
                " " +
                this.aemData.expiringOfferLabel1}
            </p>
          </>)}

          {/* current offers */}
          {showCoupons && (newOfferSorted.length  < 1)  && (expiringSoonOfferSorted.length > 0) && (
          <>
            <p className="ribbonPWA">
              {!showPaperMsg &&
                showExpiringOffers &&
                this.aemData.newOfferLabel + " "+
                 expiringSoonOfferSorted.length +
                " " +
                this.aemData.currentOffers.retailerAlreadySelected}
            </p>
          </>)}

          {(newOfferSorted.length  < 1)  && (expiringSoonOfferSorted.length < 1) && !(showScanModule && (!isLoyaltyScanBonusesEarned) &&  !checkNoDoUserCookie && retailer_available && !(checkswitchToDigitalCookie)) && 
          (!(isNonDigitalUser && checkNoDoUserCookie)) &&(
            <>
            <p className="pt-1"></p>
            </>
          )}
          
        {/**Unconverted Do User*/}
        {(isNonDigitalUser && checkNoDoUserCookie && isChildDoEligible ) ?
            <UnconvertedNonDo
            confirmCouponPopup={() => confirmCouponPopup()}
            switchToDigitalTitle={switchToDigitalTitle}
            switchToDigitalDesc={switchToDigitalDesc}
            switchToDigitalBtn={switchToDigitalBtn}/> : null
        }
        {/** Show get more points moudle if user is not eiligble for DO */}
        {(!isChildDoEligible && !retailer_available) ?
        <GetMorePointsCard
            showRewardsTab={() => showRewardsTab()}
            scanModuleHeading={scanModuleHeading}
            scanModuleDesc={scanModuleDesc}
            scanModuleImage={scanModuleImage}
            scanButtonLabel={scanButtonLabel}
            scanButtonClass = {scanButtonClass}
            scanFacingMode = {scanFacingMode}
            scanGtm = {scanGtm}
            /> : null
        }

        {/**Non Do Switch to Digital*/}
        { isConvertedDo?
          <ConvertedDo
            congratsDisclaimer={congratsDisclaimer}
            congratsDesc1={congratsDesc1}
            congratsDesc2={congratsDesc2}
            congratsTitle={congratsTitle}
          /> : null
        }
      
        {/* Get More Points Module */}
        {
          showScanModule && (!isLoyaltyScanBonusesEarned) &&  !checkNoDoUserCookie && retailer_available && !(checkswitchToDigitalCookie) && (
          <>
          <GetMorePointsCard
          showRewardsTab={() => showRewardsTab()}
          scanModuleHeading={scanModuleHeading}
          scanModuleDesc={scanModuleDesc}
          scanModuleImage={scanModuleImage}
          scanButtonLabel={scanButtonLabel}
          scanButtonClass = {scanButtonClass}
          scanFacingMode = {scanFacingMode}
          scanGtm = {scanGtm}
          />
          </>)
        }  
        

        {showCoupons && (newOfferSorted.length > 0 || expiringSoonOfferSorted.length > 0 || expiringLaterOfferSorted.length > 0) && (!checkswitchToDigitalCookie) && (!checkNoDoUserCookie) && (
          <>
            <div className="row mx-0 offer-cards-wrapper">
              <div className="card-offer-wrap col-12 col-lg-4 ">
              <div className="pwa-sort-coupon">
                <Dropdown key={1}
                  label='Sort By'
                  options={[{ label: 'Expiration Date', value: 'offerExpiryDate:DESC' },
                  { label: 'Coupon Value', value: 'offerValue:ASC' },
                  { label: 'My Redeemed', value: 'type:DESC' }]}
                  placeholder={'Sort By'}
                  isSearchable={false}
                  handleChange={this.sortingCoupon}
                />
              </div>
            </div>
          </div>
          </>)
        }
        { (((newOfferSorted.length<1 && expiringSoonOfferSorted.length<1 && expiringLaterOfferSorted.length<1) && DOShowThanksMessage)) && !(checkswitchToDigitalCookie) && (
          <>
            <div className="row mx-0 mt-3 offer-cards-wrapper">
              <div className="card-offer-wrap col-12 col-lg-4 ">
                <div className="pwa-noCoupon">
                  <div className="pwa-noCouponMsgTitle">{this?.aemData?.DOThanksMessage}</div>
                  <div className="pwa-noCouponMsg" dangerouslySetInnerHTML={{ __html: this?.aemData?.goToOfferPageText }}></div>
                </div>
              </div>
            </div>
          </>
        )}

        {showCoupons && (
          <>
            <div className="row mx-0 offer-cards-wrapper">
              {this.state.allTypeOffer.map((offer, index) => {
                if (offer.type == 'NEWOFFER') {
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

                else if (offer.type == 'EXPIRINGLATER') {
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
                }

                else if (offer.type == 'EXPIRINGSOON') {
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
                }

              })}
            </div>
            <p
              className={`profile__border-smalt ${retailer_available && zeroActiveChild ? "" : "d-none"
                }`}
            ></p>
          </>
        )}

        

        {/**Unconverted Footer for Non-Do User with zero offer*/}
        {((isNonDigitalUser && checkNoDoUserCookie && isChildDoEligible) && (!(newOfferSorted.length > 0 || expiringSoonOfferSorted.length > 0 || expiringLaterOfferSorted.length > 0))) ?
          <UnconvertedNonDoFooter
          switchToDigitalDisclaimer={switchToDigitalDisclaimer}/> : null
        }

        {/**Unconverted Footer for Non-Do User with more than zero offer*/}
        {(isNonDigitalUser && checkNoDoUserCookie && isChildDoEligible) && ((newOfferSorted.length > 0 || expiringSoonOfferSorted.length > 0 || expiringLaterOfferSorted.length > 0)) ?
          <UnconvertedNonDoFooter
          switchToDigitalDisclaimer={switchToDigitalDisclaimerWithOffer}/> : null
        }

        {(!(isNonDigitalUser && checkNoDoUserCookie && isChildDoEligible) && (newOfferSorted.length > 0 || expiringSoonOfferSorted.length > 0 || expiringLaterOfferSorted.length > 0)) ? (
          <div>
            <div className="do-footer" dangerouslySetInnerHTML={{ __html: offerTabFootnote }}></div>
          </div>
        ) : null}

      </>
    );
  }
}
