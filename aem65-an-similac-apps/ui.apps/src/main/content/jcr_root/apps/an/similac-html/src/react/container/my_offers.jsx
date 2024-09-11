import React from 'react';
import moment from 'moment';

import { makeCall } from "../common/api";
import OfferCard from "../components/OfferCard";
import TargetCoupon from "../components/TargetCoupon";
import OfferCardHori from "../components/OfferCardHori";
import CompleteProfile from "./offers/CompleteProfile";
import { sendFormData, getMessageForReg } from "../common/api";
import graphQLQuery from '../services/product.service.js';

export default class MyOffers extends React.Component {

    constructor(props) {
        super(props);
        this.aemData = props.aemData;
        const { purchaserOnlyOffer } = this.aemData;
        // Set default state
        this.state = {
            profileInfo: {},
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
            showDisruptor: false,
            openDisruptor:  false

        };
    }

    setCompletePage = (flag) => {
        this.setState({ completeProfilePage: flag });
    }

    /**
   * Call on component load
   */
    componentDidMount() {

        const userType = ABBOTT.utils.getActualUserType();
        if ("similac-ecom" === userType) {

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
            }
            else if (hashValue === "thanksDigital") {
                this.setState({
                    showDigitalMsg: true
                });
            }
        }

        let ajaxConfig = {
            url: `${ABBOTT.config.getEndpointUrl('GRAPH_QL')}?query=${graphQLQuery.generatePersonalizationQuery()}`,
            method: "get",
            contentType: "application/json",
            headers:
            {
                "Store": ABBOTT.config.storeName
            }
        };

        if (ABBOTT.utils.isUserLoggedIn()) {
            ajaxConfig.headers.Authorization = 'Bearer ' + ABBOTT.utils.getMagentoSessionToken();
        }
        ABBOTT.http.makeAjaxCall(ajaxConfig).then((success) => {
            let data = success.data?.personalizedProducts[0];
            if (data.status) {
                let event = new CustomEvent('offer-img-ready', {
                    detail: {
                        img: data.dam_images,
                        redirectURL: data.aem_url
                    }
                });
                document.dispatchEvent(event);
            }
        }, (fail) => {
        });
           
        this.getProfileInfo();
       
    }
   /**
    * Method to get disruptor HTMl from AEM
    */
    getDisruptor = () => {
        let htmlUrl = this.aemData.offerDisruptorFragment;
        if(htmlUrl !== ""  &&  htmlUrl!== undefined){
            let ajaxConfig = {
                url: htmlUrl,
                method: "get",
                dataType: "html"
            };
            ABBOTT.http.makeAjaxCall(ajaxConfig).then((success) => {
                this.setState({
                    disruptorHTML: success
                }, ()=> {
                this.toggleDisruptor();
                });
            });
        }
    }
    /**
     * Method to toggle Disruptor
     */
    toggleDisruptor = () => {
        ABBOTT.main.setSocialIcons();
        const {showCoupons, showDisruptor, openDisruptor} = this.state;
         const { offerPreferenceInfo } = this.state.profileInfo; 
         if(showCoupons && offerPreferenceInfo?.retailer && offerPreferenceInfo?.retailerOptDate && showDisruptor && openDisruptor){
            this.setState({
                openDisruptor: true
            });
         }
     }
     /**
      * 
      * @param {boolean} enableDigital 
      * @param {string} uid 
      * Method to Check the AddDoHome cookie base on user
      */

     setAddDOHomeCookie = (enableDigital, uid) => {
        let lp;
        let lc = ABBOTT.cookie("AddDOHome");
        if (enableDigital) {
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
        }
    }
    /**
     * 
     * @param {string} uid 
     * @param {boolean} isOpenDisruptor 
     * Method to set AddDOHome cookie to open/close collapse
     */
    setOpenDisruptor = (uid, isOpenDisruptor) => {
        let cookieConfig = {
            path: '/',
            domain: 'similac.com',
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
    }
    /**
     *  Method to get user my profile  information from AWS
     */
    getProfileInfo = () => {
        let ajaxConfig = {
            "url": this.aemData.actionPathGetProfile,
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "x-country-code": "US",
                "x-application-id": "similac",
                "x-preferred-language": "en-US",
                "x-id-token": ABBOTT.utils.getSessionInfo()
            }
        }

        makeCall(ajaxConfig).then(results => { 
            if(results.status) {
                this.setState({
                    profileInfo: results.response
                });
                const { response: { userInfo: { userType,uid } = {}, offerPreferenceInfo } = {} } = results;
                const cookieUserType = ABBOTT.utils.getActualUserType();
                if ("similac-ecom" === userType) {

                    this.setState({
                        showSignUp: true
                    });
                }
                else {
                    this.setState({
                        showSignUp: false
                    });
                }

                if (cookieUserType !== userType) {
                    ABBOTT.utils.profileUpdate("userType", userType);
                }
                
                // check for showing enable digital offer and  coupons
                let sortedChildren = results.response.children?.sort(({ birthDate: b1 = "" }, { birthDate: b2 = "" }) => {
                    return new Date(b1) - new Date(b2);
                }).filter(({ deleted = false }) => !deleted);
                let youngChild;
                if (sortedChildren.length) {
                    youngChild = sortedChildren[sortedChildren.length - 1];
                }

                if (youngChild) {
                    let birthDate = moment(youngChild.birthDate).format('MM/DD/YYYY');
                    let currentDate = moment();
                    if (currentDate.diff(birthDate, 'weeks') > 0) {
                        birthDate = moment(birthDate).add(1, 'day');
                    }

                    let childweeks = currentDate.diff(birthDate, 'weeks');
    
                    // show digital offer for the below child weeks
                    if (childweeks >= -7 && childweeks <= 35) {
                        this.setState({
                            showDigital: true,
                            showCoupons: true
                        });
                    }
                }
                let actChild = results.response;
                this.setAddDOHomeCookie(offerPreferenceInfo.retailer?true:false, uid);
                this.setThankOffer(offerPreferenceInfo);
                actChild.children?.map((child) =>{
                    //show offer coupons if offers is present in children node
                    if (child.offers?.length > 0) {
                        child.offers.map((offer) => {
                             this.checkShowDisruptor(offer);
                             this.checkDuplicateOffer(offer,offerPreferenceInfo.offerCode);
                        });

                    } else {
                        if(offerPreferenceInfo.retailer && offerPreferenceInfo.offerCode && offerPreferenceInfo.offerExpiryDate)
                       { this.checkShowDisruptor(offerPreferenceInfo);}
                    }
                });              
                               
            }
            if (results.errorCode === 500) {
                const dataValue = getMessageForReg("GEN_ERR");
                $('#template.global-error p').html(dataValue);
                $('#template').show();

            }
            else {
                this.setState({ formError: getMessageForReg("GEN_ERR") });
            }
        }, (fail) => {

            if (results.errorCode === 500) {
                const dataValue = getMessageForReg("GEN_ERR");
                $('#template.global-error p').html(dataValue);
                $('#template').show();

            }
            else {
                this.setState({ formError: getMessageForReg("GEN_ERR") });
            }
        });
    };
    checkShowDisruptor = (offer) => {
        if(!this.state.showDisruptor){
            // calculate offer validatity
            let endDate = moment(offer.offerExpiryDate);
            let currentDate = moment();
            let validDays = endDate.diff(currentDate, 'days');
            if(validDays >= 0) {
                this.setState({
                    showDisruptor: true
                }, ()=> {
                    this.getDisruptor();
                });
            }
        }
    }

    /*show thank you offer*/
    setThankOffer = (offerPreferenceInfo) =>{
        if(offerPreferenceInfo.offerExpiryDate){
        // calculate offer validity
        let endDate = moment(offerPreferenceInfo.offerExpiryDate);
        let currentDate = moment();
        let validDays = endDate.diff(currentDate, 'days');
       
        if(offerPreferenceInfo.offerRetailer && offerPreferenceInfo.offerCode && validDays >= 0){
            this.setState({
                showCoupons: true
            });
        }
    }
    }

    /** Check duplicate token
     */
    checkDuplicateOffer = (offer, offerPreferenceInfoOfferCoded) => {
        if(!this.state.duplicateOffer){
            if(offer.offerCode && (offer.offerCode === offerPreferenceInfoOfferCoded)){
            this.setState({
                duplicateOffer: true
            });
        };
        }
    }
    /**
     * Method called on selecting update link in retailer section
     */
    updateRetailer = () => {
        const { offerPreferenceInfo } = this.state.profileInfo;
        // if greater than 30 days
        let endDate = moment(offerPreferenceInfo.retailerOptDate);
        let currentDate = moment();
        let retailerDays = currentDate.diff(endDate, 'days');
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
        let formData = {
            "category": "redeemOffer",
            "offerPreferenceInfo": {
                "offerCode": code
            }
        };
        let ajaxConfig = {
            headers: {
                "x-id-token": ABBOTT.utils.getSessionInfo()
            }
        };


        sendFormData(this.aemData.actionPath, formData, ajaxConfig).then(success => {
            this.getProfileInfo();
            let deviceAgent = navigator.platform;
            let ios = deviceAgent.toLowerCase().match(/(mac|iphone|ipod|ipad)/);
            if (ios) {
                window.open(url, '_self');
            } else {
                window.open(url, '_blank');
            }
            return success;
        }, (fail) => {

        })
    };

    updateDigitalOffer = (_values) => {
        var SSM_USER_TYPE = "similac-ssm"; // ecom user similac-ecom
        if (ABBOTT.utils.getActualUserType() !== SSM_USER_TYPE) {
            ABBOTT.utils.profileUpdate("userType", SSM_USER_TYPE);
        }
        this.setState({
            showDigitalMsg: true,
            completeProfilePage: false
        });
        this.getProfileInfo();
    }

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
            showDisruptor,
            duplicateOffer
        } = this.state;
        const { offerPreferenceInfo, children } = this.state.profileInfo;
        const { currentOffers, retailer, purchaserOnlyOffer = {} } = this.aemData;
        const retailer_available = (offerPreferenceInfo !== undefined && offerPreferenceInfo.retailer) ? offerPreferenceInfo.retailer : "";
        const completePageData = {
            ...purchaserOnlyOffer,
            href: ""
        };
        const showComplete = (e) => { e.preventDefault(); this.setCompletePage(true) };
        return (
            <>
                {completeProfilePage ? <CompleteProfile updateDigitalOffer={this.updateDigitalOffer} /> :
                    <>
                        <h1 className="profile__title">{this.aemData.title}</h1>
                        {/* current offers */}
                        <p className="profile__sub-title">{currentOffers.title}</p>
                        {showCoupons && showDisruptor && offerPreferenceInfo?.retailer && <>
                        <div className="disruptor-v2"  dangerouslySetInnerHTML={{__html:disruptorHTML}}></div>
                        </>
                        }
                        <p className={`font-roboto-bold text-smalt ${retailer_available ? "" : "d-none"}`}>
                            {!showPaperMsg && !showDigitalMsg && showCoupons && currentOffers.availableLabel + ' ' + currentOffers.offersLabel}
                            {showDigitalMsg && showCoupons && currentOffers.thanksDigitalLabel}

                        </p>

                        <p className={`font-roboto-reg text-smalt ${retailer_available ? "" : "d-none"}`}>
                            {!showPaperMsg && !showDigitalMsg && showCoupons && currentOffers.redeemOfferMessage}
                            {showDigitalMsg && showCoupons && currentOffers.digitalMessage}
                        </p>
                        {/* Paper offer message shipping address link */}
                        {showPaperMsg && <>
                            <p className="font-roboto-bold text-smalt">{currentOffers.thanksLabel}</p>
                            <p className="font-roboto-reg text-smalt">{currentOffers.paperMessage}</p>
                            <div className="profile__border-bt-grey">
                                <a className="offers__link text-tangerine" href={currentOffers.shippingLink}>
                                    {currentOffers.shippingLabel}</a>
                            </div>
                        </>
                        }
                        {showCoupons && <>
                            <div className="row mx-0 offer-cards-wrapper">
                                { offerPreferenceInfo?.offerRetailer && !duplicateOffer && <>
                                {(offerPreferenceInfo?.offerRetailer.toLowerCase() === "amazon" || offerPreferenceInfo?.offerRetailer.toLowerCase() === "tpg") && offerPreferenceInfo.offerCode && <OfferCard offerData={offerPreferenceInfo} offerLabel={currentOffers}
                                    retailerLabel={retailer} submitRedeem={(url, code) => this.submitRedeem(url, code)} />}
                                {offerPreferenceInfo?.offerRetailer.toLowerCase() === "target" && offerPreferenceInfo?.offerCode && <TargetCoupon offerData={offerPreferenceInfo} offerLabel={currentOffers}
                                    retailerLabel={retailer} aemData={this.aemData.actionPath} barCode={this.aemData.barCodeGenerate} />}
                                </>}
                                {children?.map((child) =>
                                    child.offers?.map((offer) => {
                                        
                                        if (offer.offerRetailer && (offer.offerRetailer.toLowerCase() === "amazon" || offer.offerRetailer.toLowerCase() === "tpg")) {
                                            return <OfferCard offerData={offer} offerLabel={currentOffers}
                                                retailerLabel={retailer} submitRedeem={(url, code) => this.submitRedeem(url, code)} />
                                        }
                                        else if (offer.offerRetailer && (offer.offerRetailer.toLowerCase() === "target")) {
                                            return <TargetCoupon offerData={offer} offerLabel={currentOffers}
                                                retailerLabel={retailer} aemData={this.aemData.actionPath} barCode={this.aemData.barCodeGenerate} />

                                        }
                                    }
                                    )
                                )
                                }
                            </div>
                            <p className={`profile__border-smalt ${(retailer_available && zeroActiveChild) ? "" : "d-none"}`}></p>
                        </>
                        }
                      
                        {/* digital offer */}
                        {
                            showOffer && showSignUp ? <OfferCardHori {...completePageData} onClick={showComplete} /> : null
                        }
                        {currentOffers.offerList.map((offer, index) => {
                            if (index === 0) {
                                if (offerPreferenceInfo?.retailer) {
                                    return <></>

                                }
                                if (showDigital && !showPaperMsg) {
                                    return <OfferCardHori {...offer} />
                                }
                            }
                            else {
                                return <OfferCardHori {...offer} />

                            }
                        }
                        )}

                        {/* selected retailer */}

                        {offerPreferenceInfo?.retailer && offerPreferenceInfo?.retailerOptDate && <>
                            <p className="profile__sub-title pt-2_25">{retailer.title}</p>
                            <p className="font-roboto-reg text-smalt">
                                {retailer.subTitle}
                            </p>
                            <a className="font-brandon-bold text-tangerine" onClick={this.updateRetailer}>
                                {this.aemData.updateLabel}</a>
                            <div className="row retailer-customwrapper py-4 mt-4 mx-0 ">
                                <div className="col-7 col-md-6 retailer-customclass col-lg-3">
                                    <img src={retailer.retailersList[offerPreferenceInfo.retailer.toLowerCase()]?.imgUrl}
                                        className="w-100 h-100 w-160-h-160" />
                                </div>
                                <div className="col-5 col-md-6 col-lg-9 px-0">
                                </div>
                            </div>
                            {retailerError && <p className="font-roboto-reg text-error mb-0">
                                {retailer.error}</p>}
                        </>
                        }
                        <div className="my-3_75">
                        {showSignUp &&<>
                        <p className="footnote font-roboto-reg text-charcoal"
                         dangerouslySetInnerHTML={{__html:this.aemData.signUpNoteLabel}}>
                         </p>
                         </>
                        }
                         <p className="footnote font-roboto-reg text-charcoal"
                          dangerouslySetInnerHTML={{__html:this.aemData.noteLabel}}>
                        </p>
                        </div>
                    </>
                }

            </>
        );
    }
}

