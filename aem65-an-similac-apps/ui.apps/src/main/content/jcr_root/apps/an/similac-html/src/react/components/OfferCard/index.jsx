
import React from "react";
import moment from 'moment';

const OfferCard = (props) => {
    let { offerData, offerLabel, retailerLabel } = props;
    // calculate offer validity
    let endDate = moment(offerData.offerExpiryDate);
    let currentDate = moment();
    let validDays = endDate.diff(currentDate, 'days');
    let cardLabel;
    // check amazon/ tpg offers
    let isAmazon = offerData.offerRetailer.toLowerCase() !== "tpg";
    let amazonImg = offerData.offerValue === 5 ? offerLabel.saveFiveImgUrl : offerLabel.saveTenImgUrl;
    let offerImg = isAmazon ? amazonImg : offerLabel.tpgImgUrl;
    let pageURL = isAmazon ? retailerLabel.retailersList[offerData.offerRetailer.toLowerCase()]?.pageUrl : "https://"+ offerData.offerCode;
    let offerTypeLabel = isAmazon ? offerLabel.amazonOffer : offerLabel.tpgOffers;
    let newOffer, openOffer, redeemedOffer;
    // check if offer opened
    if (offerData.offerRedeemed === false && offerData.offerOpenedDate) {
        cardLabel = offerTypeLabel.openOffer;
        openOffer = true;
    }
    // check offer redeemed 
    else if (offerData.offerRedeemed === true) {
        cardLabel = offerTypeLabel.redeemedOffer;
        redeemedOffer = true;
    } else {
        // check offer is new 
        cardLabel = offerTypeLabel.newOffer;
        newOffer = true;
    }


    return (

        <>
            {validDays >= 0 &&
                <div className="card-offer-wrap col-12 col-md-6 col-lg-4 mb-4">
                    <div className={`card card-offer text-center px-2 h-100 ${newOffer ? "bg-alice-blue" : "dark-shaded-bg"}`}>
                        <div className="card-body">

                            <h4 className={`font-brandon-bold font-title-offer ${newOffer ? "text-smalt" : "text-white"}`}>
                                {cardLabel.title} {!openOffer && '$' + offerData.offerValue}</h4>
                            <p className={`font-brandon-bold font-text-offer ${newOffer ? "text-smalt" : "text-white"}`}>
                                <span dangerouslySetInnerHTML={{ __html: cardLabel.subTitle }}></span>
                                {((openOffer || redeemedOffer) &&
                                    isAmazon) &&
                                    ABBOTT.utils.toCamelCase(offerData.offerRetailer)}{openOffer ? "?" : ""}
                            </p>
                            <img src={offerImg}
                                className={`product-img w-100  ${redeemedOffer ? "mb-2_5" : ""}`} />
                            {!redeemedOffer && <>
                                {isAmazon &&
                                    <p className="font-brandon-bold text-tangerine font-code-offer">
                                        {offerData.offerCode}
                                    </p>
                                }
                                <a className="btn btn-primary col-12  my-0_938" data-gtm={cardLabel.dataGtmLabel}
                                    onClick={() => props.submitRedeem(pageURL, offerData.offerCode)}
                                >
                                    {cardLabel.buttonLabel}
                                </a>
                            </>
                            }
                            <img src={retailerLabel.retailersList[offerData.offerRetailer.toLowerCase()]?.imgSMUrl}
                                className={`${redeemedOffer ? "mb-2" : ""} retailer-img`} />
                            {redeemedOffer &&
                                <p className={`footnote font-roboto-reg mb-2_938 ${newOffer ? "text-smalt" : "text-white"}`}>
                                    {cardLabel.redeemedOnLabel} {moment(offerData.offerRedeemedDate).format('MM/DD/YY')}.</p>
                            }
                            {!redeemedOffer && <p className={`footnote font-roboto-reg ${newOffer ? "text-smalt" : "text-white"}`}>
                                {offerLabel.offerAvailableLabel} {validDays} {offerLabel.moreDaysLabel}
                            </p>
                            }

                        </div>
                    </div>
                </div>
            }
        </>
    );
}
export default OfferCard;