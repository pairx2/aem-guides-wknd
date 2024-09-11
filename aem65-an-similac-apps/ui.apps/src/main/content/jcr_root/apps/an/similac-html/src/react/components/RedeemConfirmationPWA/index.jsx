import React from "react";
import moment from 'moment';
const RedeemConfirmation = (props) => {
    let {retailer,retailerSelected,retailerName,retailerType,dataGtmSelectValue,isRetailerAvailable} = props;    
    let retailerSelectedName = retailerName.toLowerCase();
    let selectedRetailername = "";
    let selectedRetailerExtraNote = "";
    if(retailerSelectedName === "amazon"){
        selectedRetailername = retailerSelected.retailerOption.amazon;
        selectedRetailerExtraNote = retailerSelected.amazonNote;
    }else if(retailerSelectedName ==="tpg"){
        selectedRetailername = retailerSelected.retailerOption.tpg;
        selectedRetailerExtraNote = retailerSelected.tpgNote;
    }else if(retailerSelectedName ==="target" && retailerType==="TARGET_CC"){
        selectedRetailername = retailerSelected.retailerOption.targetonline;
        selectedRetailerExtraNote = retailerSelected.targetOnlineNote;
    }else{
        selectedRetailername = retailerSelected.retailerOption.targetoffline;
        selectedRetailerExtraNote = retailerSelected.targetInStoreNote;
    }
    
    let gtmLabelYes = dataGtmSelectValue+"-yes";
    let gtmLabelNo = dataGtmSelectValue+"-no";

    return(
     <>
       {isRetailerAvailable ?  
        <div className="modal fade" id="pwa-confirm-retailer" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <img className="close" data-dismiss="modal" aria-label="Close" src="/content/dam/an/similac/global/icons/retailer/pwa-retailerpopup-close.png" />
            </div>
            <div className="modal-body">
                <div className="pwa-retailer-image"><img alt= {selectedRetailername} src={props.retailerImage}/></div>
                <p className="pwa-popup-body-text mb-2">
                    {retailer.retailerSelected.selectedRetailer} <span className="pwa-retailer-name"> {selectedRetailername}</span> {retailer.retailerSelected.selectedRetailerNote}
                    <br/><br/>{selectedRetailerExtraNote}
                </p>
            </div>
            <div className="modal-footer">
                <button type="button" onClick={props.isEnableOffer} data-gtm={gtmLabelNo} className="btn btn-secondary pwa-popup-no" data-dismiss="modal">{retailer.retailerSelected.cancelButtonLabel}</button>
                <button type="button" onClick={props.offerActivated} data-gtm={gtmLabelYes} className="btn btn-primary pwa-popup-yes">{retailer.retailerSelected.submitButtonLabel}</button>
            </div>
            </div>
        </div>
        </div>: null
        }
        </>
    );
}
export default RedeemConfirmation;