import React, { useState, useEffect } from 'react';
import cartGraphQLQuery from '../../services/cart.service.js';


const RecentOrder = (props) => {

    const [recentData, setrecentData] = useState([]);
    const [cartData, setcartData] = useState([]);
    const [showRecent, setshowRecent] = useState(false);
    let showAddToCart = false;
    // Renders onload
    useEffect(() => {
        fetchData();
    }, []);

    function cartItems(sku) {

        let newCartData = cartData.map(item => {
            if (item.sku === sku) {
                item.checked = !item.checked;
            }
            return item;
        })
        setcartData(newCartData);

    }
    function addToCart() {

        let newCartData = cartData.filter(item => {
            if (item.checked) {
                return item;

            }
        }).map(item => {
            let newItem = {
                sku: item.sku,
                qty: 1
            }
            if (item.aw_sarp2_subscription_type) {
                newItem.aw_sarp2_subscription_type = item.aw_sarp2_subscription_type;
            }
            return newItem;

        });
        if (newCartData.length > 0) {
            var addEvent = new CustomEvent("addToCart", {
                detail: newCartData
            });
            window.dispatchEvent(addEvent);
            return;
        }
    }
    function fetchData() {
        try {
            let ajaxConfig = {
                url: ABBOTT.config.getEndpointUrl('GRAPH_QL'),
                method: 'POST',
                contentType: "application/json",
                headers: {
                  "Store": ABBOTT.config.storeName
          
                }
            };
            ajaxConfig.data = cartGraphQLQuery.generateRecentOrderQuery();
            if (ABBOTT.utils.isUserLoggedIn()) {
                ajaxConfig.headers.Authorization = 'Bearer ' + ABBOTT.utils.getMagentoSessionToken();
            }
            ABBOTT.http.makeAjaxCall(ajaxConfig).done(results => {

                const { data: { recentlyPurchasedProducts: rPP = [] } = {} } = results;
                setrecentData(rPP || []);
                let newResults = (rPP || []).map(item => {
                    item.checked = false;
                    if (item.is_saleable) {
                        setshowRecent(true);
                    }
                    return item;
                })
                setcartData(newResults);
            });
        }
        catch (e) {
            console.error(e);
        }

    }

    return (
        <>
            {recentData.length > 0 && showRecent && <>
                <div className="recent-order similac-form mb-5">

                    <h5 className="recent-order__title profile__border-grey">
                        {props.aemData.title}
                    </h5>
                    {recentData && recentData.map((item, index) => {
                        if (item.is_saleable) {
                            let inStock = item.is_saleable;
                            let updatedProdName = item.name;
                            let disabledCheck = "";
                            if(inStock === false){
                                disabledCheck = "disabled";
                                updatedProdName = updatedProdName + " - <span class='text-danger'>Out of Stock</span>";
                            } else {
                                showAddToCart = true;
                            }
                            return <fieldset className="form-group similac-form-group" key={index}>
                                <div className="form-check checkbox-container">
                                    <span className="checkbox-wrapper">
                                        <label htmlFor={`form-field${index}`}>
                                            <input type="checkbox" name="product" id={`form-field${index}`} className="form-check-input" value=""
                                                onClick={(e) => { cartItems(item.sku) }} disabled={disabledCheck} />
                                            <span className="checkbox-inner" aria-hidden="true" role="presentation">
                                            </span>
                                        </label>
                                    </span>
                                       <a className="form-check-link" href={ABBOTT.utils.getUrl(item.url)} 
                                       dangerouslySetInnerHTML={{ __html: updatedProdName}}></a> 
                                </div>
                            </fieldset>
                        } else {
                            return <></>
                        }
                    }
                    )}

                    {showAddToCart && 
                        <a className="btn btn-secondary col-12 mt-3" onClick={(e) => { addToCart() }}>{props.aemData.btn}</a>
                    }

                </div>
            </>
            }
        </>
    );

}
export default RecentOrder;