import React, { useState, useEffect, useRef } from "react";
import graphQLQuery from '../../services/product.service.js';

const SubscriptionPopUp = (props) => {
    const { product, aemData, profileId, oldSku, rpath } = props;
    const [quantity, setquantity] = useState(1);
    const [popUpError, setpopUpError] = useState("");
    const defaultImageUrl = jQuery('#aem-default-image-url').val();

    const decreaseCount = () => {
        if (quantity <= product.cans_y_min_update) {
            setpopUpError(`${aemData.requiredMin} ${product.cans_y_min_update} ${aemData.requiredMax} ${product.cans_x_max_update}`);
        } else {
            setquantity(quantity - 1);
            setpopUpError("");
        }
    };
    const cancelCount = () => {
        setpopUpError("");
        props.cancelPopUp();
       
    }
    const sumbitPopUp = (product, qty)=>{
        ABBOTT.gtm.buildAndPush.formTracking('pop-up', 'click', 'change-subscription_yes');
       var timeOut=window.setTimeout(function(){ $("#overlay").show();}, 2000);
		let sku = product.sku;
		let ajaxObj = {
			url: ABBOTT.config.getEndpointUrl('GRAPH_QL'),
			method: 'POST',
			contentType: "application/json",
			headers:
			{
				"Store": ABBOTT.config.storeName,
			},
			data: graphQLQuery.generateChangeSubscriptionQuery({ profileId, oldSku, sku, qty })
		};
		if (ABBOTT.utils.isUserLoggedIn()) {
			ajaxObj.headers.Authorization = 'Bearer ' + ABBOTT.utils.getMagentoSessionToken();
		}
		ABBOTT.http.makeAjaxCall(ajaxObj).then((success) => {
            window.clearTimeout(timeOut);
			if(success.data.changeProduct.status){
				window.location = ABBOTT.config.storeSecureUrl +"/" + rpath;
			} else {
				setpopUpError(success.data.changeProduct.message);
			}
		}, (fail) => {
		});
    }   
     const sumbitCount = () => {
        if (quantity >= product.cans_y_min_update && quantity <= product.cans_x_max_update) {
            sumbitPopUp(product, quantity);
        } else {
            setpopUpError(`${aemData.requiredMin} ${product.cans_y_min_update} ${aemData.requiredMax} ${product.cans_x_max_update}`);
        }

    }

    const increaseCount = () => {
        if (quantity >= product.cans_x_max_update) {
            setpopUpError(`${aemData.requiredMin} ${product.cans_y_min_update} ${aemData.requiredMax} ${product.cans_x_max_update}`);
        } else {
            setquantity(quantity + 1);
            setpopUpError("");
        }

    };
    return (
        <>

            <div className="row justify-content-center">
               
                <div className="col-12 col-md-4 col-lg-3 text-center">
                    <img className="w-100" src={ABBOTT.utils.getUrl(product.dam_images ? product.dam_images + aemData.imgRendition_319 : defaultImageUrl)} />
                </div>
                <div className="col-12 col-md-7 col-lg-5 mt-lg-3">
                <p className={`${popUpError !== "" ? "" :"d-none"} error`}>{popUpError}</p>
                <p><b>{product.name}</b></p>
                    <div className="product-quantity">
                        <div className="input-group mb-3 mt-3 stepper-control">
                            <span className="sim-icons" data-icon="minus"
                                onClick={(e) => decreaseCount()}>
                            </span>
                            <input type="number" className="form-control text-center"
                                value={quantity} />
                            <span className="sim-icons" data-icon="add"
                                onClick={(e) => increaseCount()}>
                            </span>
                        </div>
                    </div>
                   
    <p className="text-center text-md-left"><b>${product.price}<sub className="d-block d-md-inline">/{aemData.popUp.eachPrice}</sub></b></p>
    <p className="note mt-4 mt-md-0">{aemData.popUp.priceHelperText}</p>

                </div>
                <div className="col-12 col-md-8 d-md-flex align-items-center align-items-md-start justify-content-end flex-row mt-1_875">
                    <button className="d-md-flex swal-button swal-button--cancel col-sm-12  col-md-3 d-lg-inline-block" 
                    onClick={(e) => cancelCount()}>{aemData.popUp.cancel}</button>
                    <button className="d-md-flex swal-button swal-button--confirm col-sm-12  col-md-3 d-lg-inline-block"
                     onClick={(e) => sumbitCount()}>{aemData.popUp.confirm} </button>
                </div>
            </div>


        </>
    )
}
export default SubscriptionPopUp;