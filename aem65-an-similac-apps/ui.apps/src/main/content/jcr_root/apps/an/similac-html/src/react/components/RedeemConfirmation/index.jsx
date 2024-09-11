import React from "react";
import moment from 'moment';
const RedeemConfirmation = (props) => {
    let {retailer,retailerSelected,retailerName,retailerType,dataGtmSelectValue,isRetailerAvailable} = props;    
    let retailerSelectedName = retailerName.toLowerCase();
    let selectedRetailername =""
    if(retailerSelectedName === "amazon"){
        selectedRetailername = retailerSelected.retailerOption.amazon;
    }else if(retailerSelectedName ==="tpg"){
        selectedRetailername = retailerSelected.retailerOption.tpg;
    }else if(retailerSelectedName ==="target" && retailerType==="TARGET_CC"){
        selectedRetailername = retailerSelected.retailerOption.targetonline;
    }else{
        selectedRetailername = retailerSelected.retailerOption.targetoffline;
    }
    
    let gtmLabelYes = dataGtmSelectValue+"-yes";
    let gtmLabelNo = dataGtmSelectValue+"-no";

    return(
     <>
       {isRetailerAvailable ?   
       <div className="col-12 col-md-6 mb-2_813 retailer-select-card selected-retailer-card">
            <div className="row bg-alice-blue py-1_875 mx-0 h-100">     
                <div className="col-12 col-md-12 col-lg-12 pl-1 py-1">
                    <p className="font-arial text-white mb-1_25">{retailer.retailerSelected.selectedRetailer} {selectedRetailername}</p>
                    <p className="font-arial text-white mb-1_25">{retailer.retailerSelected.selectedRetailerNote}</p>
                                       
                </div>
                <div className="col-12 col-md-6 col-lg-6 selectBtnContainer">
                <a className="col-md-6 col-xs-12 col-lg-6  my-0_938 btnCancelSelection" data-gtm={gtmLabelNo}
                            onClick={ props.isEnableOffer}>
                          {retailer.retailerSelected.cancelButtonLabel}
                        </a>
                    <a className="btn btn-primary col-md-3 col-xs-12 col-lg-3  my-0_938 btnSelect" data-gtm={gtmLabelYes}
                            onClick={props.offerActivated}>
                            {retailer.retailerSelected.submitButtonLabel}
                        </a>
                </div>
            </div>
        </div>: null
        }
        </>
    );
}
export default RedeemConfirmation;